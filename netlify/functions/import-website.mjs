import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import { request as httpsRequest } from "node:https";

const MAX_RESPONSE_BYTES = 750_000;
const MAX_REDIRECTS = 3;
const FETCH_TIMEOUT_MS = 8_000;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    }
  });
}

function isPrivateIpv4(address) {
  const parts = address.split(".").map(part => Number(part));
  if (parts.length !== 4 || parts.some(part => !Number.isInteger(part) || part < 0 || part > 255)) return true;
  const [first, second] = parts;
  return first === 0 || first === 10 || first === 127 || first >= 224 ||
    (first === 100 && second >= 64 && second <= 127) ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && (second === 0 || second === 168)) ||
    (first === 198 && (second === 18 || second === 19));
}

function isPrivateIpv6(address) {
  const normalized = address.toLowerCase();
  if (normalized === "::" || normalized === "::1") return true;
  if (normalized.startsWith("fc") || normalized.startsWith("fd")) return true;
  if (/^fe[89ab]/.test(normalized)) return true;
  const ipv4Mapped = normalized.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
  return Boolean(ipv4Mapped && isPrivateIpv4(ipv4Mapped[1]));
}

function isPrivateAddress(address) {
  const version = isIP(address);
  if (version === 4) return isPrivateIpv4(address);
  if (version === 6) return isPrivateIpv6(address);
  return true;
}

async function validatePublicUrl(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error("ホームページのURLを https:// から入力してください。");
  }

  if (url.protocol !== "https:") throw new Error("安全のため、https のホームページURLだけを読み込めます。");
  if (url.username || url.password) throw new Error("IDやパスワードを含むURLは読み込めません。");
  if (url.port && url.port !== "443") {
    throw new Error("標準のWebポート以外のURLは読み込めません。");
  }

  const hostname = url.hostname.toLowerCase();
  if (!hostname || hostname === "localhost" || hostname.endsWith(".localhost") || hostname.endsWith(".local")) {
    throw new Error("ローカル環境や社内ネットワークのURLは読み込めません。");
  }

  const literalVersion = isIP(hostname);
  if (literalVersion && isPrivateAddress(hostname)) {
    throw new Error("ローカル環境や社内ネットワークのURLは読み込めません。");
  }

  let addresses;
  try {
    addresses = literalVersion ? [{ address: hostname }] : await lookup(hostname, { all: true, verbatim: true });
  } catch {
    throw new Error("このURLの公開先を確認できませんでした。");
  }

  if (!addresses.length || addresses.some(record => isPrivateAddress(record.address))) {
    throw new Error("ローカル環境や社内ネットワークのURLは読み込めません。");
  }

  return { url, addresses };
}

function requestPinnedHttpsPage({ url, addresses }) {
  const selected = addresses.find(record => record.family === 4) || addresses[0];
  return new Promise((resolve, reject) => {
    const request = httpsRequest(url, {
      method: "GET",
      timeout: FETCH_TIMEOUT_MS,
      headers: {
        "Accept": "text/html,application/xhtml+xml;q=0.9,text/plain;q=0.2",
        "Accept-Encoding": "identity",
        "User-Agent": "ErabareruRiyuAI-WebsiteImport/1.0 (+https://chosenai.netlify.app/)"
      },
      // DNS 検証で得た公開IPへ固定して接続する。接続時に再度DNSを引かないため、DNS rebinding を避ける。
      lookup: (_hostname, _options, callback) => callback(null, selected.address, selected.family)
    }, response => {
      const chunks = [];
      let total = 0;
      response.on("data", chunk => {
        total += chunk.length;
        if (total > MAX_RESPONSE_BYTES) {
          request.destroy(new Error("ページの容量が大きすぎるため、読み込めませんでした。"));
          return;
        }
        chunks.push(chunk);
      });
      response.on("end", () => resolve({
        status: response.statusCode || 0,
        headers: response.headers,
        body: Buffer.concat(chunks).toString("utf8")
      }));
      response.on("error", reject);
    });
    request.on("timeout", () => request.destroy(new Error("ページの読み込みに時間がかかりすぎました。")));
    request.on("error", reject);
    request.end();
  });
}

async function fetchPublicPage(initialUrl) {
  let currentUrl = initialUrl;
  for (let redirectCount = 0; redirectCount <= MAX_REDIRECTS; redirectCount += 1) {
    const target = await validatePublicUrl(currentUrl.toString());
    let response;
    try {
      response = await requestPinnedHttpsPage(target);
    } catch (error) {
      if (error instanceof Error && /時間|容量/.test(error.message)) throw error;
      throw new Error("ホームページを読み込めませんでした。公開されているhttps URLか確認してください。");
    }

    if (response.status >= 300 && response.status < 400) {
      const location = response.headers.location;
      if (!location) throw new Error("リダイレクト先を確認できませんでした。");
      currentUrl = new URL(Array.isArray(location) ? location[0] : location, target.url);
      continue;
    }

    if (response.status < 200 || response.status >= 300) throw new Error("ホームページを読み込めませんでした。公開状態を確認してください。");
    const contentType = String(response.headers["content-type"] || "").toLowerCase();
    if (!contentType.includes("text/html") && !contentType.includes("application/xhtml+xml") && !contentType.includes("text/plain")) {
      throw new Error("HTMLのホームページだけを読み込めます。");
    }
    const declaredLength = Number(response.headers["content-length"] || 0);
    if (declaredLength > MAX_RESPONSE_BYTES) throw new Error("ページの容量が大きすぎるため、読み込めませんでした。");
    return { url: target.url, html: response.body };
  }
  throw new Error("リダイレクトが多すぎるため、読み込めませんでした。");
}

function decodeEntities(value) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return String(value || "").replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, entity) => {
    const lower = entity.toLowerCase();
    if (lower.startsWith("#x")) return String.fromCodePoint(Number.parseInt(lower.slice(2), 16));
    if (lower.startsWith("#")) return String.fromCodePoint(Number.parseInt(lower.slice(1), 10));
    return named[lower] || match;
  });
}

function plainText(fragment) {
  return decodeEntities(String(fragment || "")
    .replace(/<!--[\s\S]*?-->/g, " ")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractAttribute(tag, attribute) {
  const quoted = new RegExp(`\\b${attribute}\\s*=\\s*(["'])([\\s\\S]*?)\\1`, "i").exec(tag);
  const unquoted = new RegExp(`\\b${attribute}\\s*=\\s*([^\\s>]+)`, "i").exec(tag);
  return decodeEntities(quoted?.[2] || unquoted?.[1] || "").trim();
}

function extractMetaDescription(html) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metaTags) {
    const name = extractAttribute(tag, "name").toLowerCase();
    const property = extractAttribute(tag, "property").toLowerCase();
    if (name === "description" || property === "og:description") {
      const content = extractAttribute(tag, "content");
      if (content) return content;
    }
  }
  return "";
}

function firstTagText(html, tagName) {
  const match = new RegExp(`<${tagName}\\b[^>]*>([\\s\\S]*?)<\\/${tagName}>`, "i").exec(html);
  return plainText(match?.[1] || "");
}

function collectHeadings(html) {
  const headings = [];
  for (const match of html.matchAll(/<h[1-2]\b[^>]*>([\s\S]*?)<\/h[1-2]>/gi)) {
    const text = plainText(match[1]);
    if (text && !headings.includes(text)) headings.push(text);
    if (headings.length === 5) break;
  }
  return headings;
}

function makeImport(html, url) {
  const title = firstTagText(html, "title");
  const description = extractMetaDescription(html);
  const headings = collectHeadings(html);
  const bodyText = plainText(html).slice(0, 900);
  const businessDraft = description || headings[0] || title || bodyText.slice(0, 360);
  return {
    url: url.toString(),
    host: url.hostname,
    title: title || url.hostname,
    description,
    headings,
    excerpt: bodyText,
    businessDraft: businessDraft.slice(0, 600)
  };
}

export default async function importWebsite(request) {
  if (request.method !== "GET") return json({ error: "GETリクエストだけを受け付けます。" }, 405);

  const origin = request.headers.get("origin");
  const ownOrigin = new URL(request.url).origin;
  if (origin && origin !== ownOrigin) return json({ error: "このサイトからだけ利用できます。" }, 403);

  const source = new URL(request.url).searchParams.get("url")?.trim();
  if (!source) return json({ error: "ホームページURLを入力してください。" }, 400);

  try {
    const page = await fetchPublicPage(source);
    return json({ page: makeImport(page.html, page.url) });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "ホームページを読み込めませんでした。" }, 400);
  }
}
