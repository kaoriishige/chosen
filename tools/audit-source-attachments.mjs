import { createReadStream, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { createInterface } from "node:readline";
import { createHash } from "node:crypto";

function takeOption(args, name) {
  const index = args.indexOf(name);
  if (index < 0) return null;
  const value = args[index + 1];
  args.splice(index, value === undefined ? 1 : 2);
  return value || null;
}

function imageMetadata(imageUrl) {
  const match = String(imageUrl || "").match(/^data:([^;]+);base64,([\s\S]+)$/);
  if (!match) return null;
  const bytes = Buffer.from(match[2], "base64");
  return {
    mimeType: match[1],
    bytes,
    sha256: createHash("sha256").update(bytes).digest("hex")
  };
}

function extensionFor(mimeType, originalPath) {
  const originalExtension = extname(originalPath || "");
  if (originalExtension) return originalExtension.toLowerCase();
  if (mimeType === "image/png") return ".png";
  if (mimeType === "image/webp") return ".webp";
  return ".jpg";
}

function imagePathFromText(text) {
  const match = String(text || "").match(/<image name=\[Image #\d+\] path="([^"]+)"/);
  return match?.[1] || null;
}

const args = process.argv.slice(2);
const manifestPath = takeOption(args, "--manifest");
const extractDirectory = takeOption(args, "--extract");
if (!args.length) {
  console.error("Usage: node tools/audit-source-attachments.mjs [--manifest FILE] [--extract DIR] SESSION.jsonl [...]");
  process.exit(1);
}

const records = [];
for (const sessionPath of args) {
  const input = createReadStream(sessionPath, { encoding: "utf8" });
  const lines = createInterface({ input, crlfDelay: Infinity });
  for await (const line of lines) {
    let event;
    try { event = JSON.parse(line); } catch { continue; }
    const payload = event?.payload;
    if (payload?.type !== "message" || payload?.role !== "user") continue;
    let currentImagePath = null;
    for (const content of payload.content || []) {
      if (content?.type === "input_text") {
        currentImagePath = imagePathFromText(content.text) || currentImagePath;
        continue;
      }
      if (content?.type !== "input_image") continue;
      const image = imageMetadata(content.image_url);
      if (!image) continue;
      records.push({
        sourceSession: basename(sessionPath),
        sourceOrdinal: event.ordinal ?? null,
        declaredPath: currentImagePath,
        declaredFileName: currentImagePath ? basename(currentImagePath) : null,
        mimeType: image.mimeType,
        bytes: image.bytes.length,
        sha256: image.sha256,
        _bytes: image.bytes
      });
    }
  }
}

const unique = new Map();
for (const record of records) {
  if (!unique.has(record.sha256)) unique.set(record.sha256, record);
}

if (extractDirectory) {
  mkdirSync(extractDirectory, { recursive: true });
  let number = 1;
  for (const record of unique.values()) {
    const extension = extensionFor(record.mimeType, record.declaredPath);
    const stem = record.declaredFileName?.replace(/[^\p{L}\p{N}._-]+/gu, "_").replace(/\.[^.]+$/, "") || "attachment";
    const archiveFile = `${String(number).padStart(4, "0")}-${stem}-${record.sha256.slice(0, 12)}${extension}`;
    const archivePath = join(extractDirectory, archiveFile);
    if (!existsSync(archivePath)) writeFileSync(archivePath, record._bytes);
    record.archiveFile = archiveFile;
    number += 1;
  }
}

const manifest = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  inputSessionFiles: args.map(sessionPath => basename(sessionPath)),
  attachmentOccurrences: records.length,
  uniqueImages: unique.size,
  images: records.map(({ _bytes, ...record }) => record)
};

if (manifestPath) {
  mkdirSync(join(manifestPath, ".."), { recursive: true });
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
}
console.log(JSON.stringify({ attachmentOccurrences: manifest.attachmentOccurrences, uniqueImages: manifest.uniqueImages, manifestPath, extractDirectory }, null, 2));
