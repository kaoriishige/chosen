import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const archive = process.argv[2] || 'C:\\Users\\user\\Desktop\\選ばれる理由AI\\原本データ_非公開';
const ocrDirectory = join(archive, 'OCR');
const sourceManifest = JSON.parse(readFileSync(join(archive, 'source-manifest.json'), 'utf8'));
const ocrIndex = JSON.parse(readFileSync(join(ocrDirectory, 'ocr-index.json'), 'utf8'));

function uniqueRecords(records) {
  const items = new Map();
  for (const record of records) {
    if (!record.archiveFile || items.has(record.archiveFile)) continue;
    items.set(record.archiveFile, record);
  }
  return items;
}

function selectHeadingCandidates(text) {
  return text
    .split(/\r?\n/)
    .map(line => line.replace(/\s+/g, ' ').trim())
    .filter(line => line.length >= 5 && line.length <= 56)
    .filter(line => /[ぁ-んァ-ヶ一-龠]/.test(line))
    .filter(line => !/[。！？]$/.test(line))
    .slice(0, 8);
}

function pageCandidates(text) {
  const values = [...text.matchAll(/(?:^|\n)\s*(\d{1,3})\s*(?:$|\n)/g)]
    .map(match => Number(match[1]))
    .filter(value => value > 0 && value < 1000);
  return [...new Set(values)];
}

const originalByFile = uniqueRecords(sourceManifest.images || []);
const catalog = Object.values(ocrIndex.images || {})
  .sort((left, right) => left.archiveFile.localeCompare(right.archiveFile, 'en'))
  .map(record => {
    const source = originalByFile.get(record.archiveFile) || {};
    const textPath = join(ocrDirectory, record.textFile || '');
    const text = record.status === 'complete' ? readFileSync(textPath, 'utf8') : '';
    return {
      archiveFile: record.archiveFile,
      sha256: record.sha256 || source.sha256 || null,
      confidence: record.confidence ?? null,
      status: record.status,
      requiresOriginalReview: Number(record.confidence ?? 0) < 60,
      characterCount: record.characterCount ?? text.length,
      pageCandidates: pageCandidates(text),
      headingCandidates: selectHeadingCandidates(text),
      sourceOccurrences: source.sourceOrdinal ? 1 : null,
      textFile: record.textFile || null,
    };
  });

const output = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  sourceImageCount: sourceManifest.uniqueImages,
  ocr: {
    complete: catalog.filter(item => item.status === 'complete').length,
    failed: catalog.filter(item => item.status === 'failed').length,
    requiresOriginalReview: catalog.filter(item => item.requiresOriginalReview).length,
  },
  items: catalog,
};

const outputPath = join(ocrDirectory, 'source-catalog.json');
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ outputPath, sourceImageCount: output.sourceImageCount, ocr: output.ocr }, null, 2));
