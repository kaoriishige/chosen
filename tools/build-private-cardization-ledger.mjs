import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const archive = process.argv[2] || 'C:\\Users\\user\\Desktop\\選ばれる理由AI\\原本データ_非公開';
const candidatesDirectory = process.argv[3] || 'work/knowledge-candidates';
const ocrDirectory = join(archive, 'OCR');
const catalogPath = join(ocrDirectory, 'source-catalog.json');

if (!existsSync(catalogPath)) throw new Error(`Source catalog not found: ${catalogPath}`);

function normalizeSourceFile(fileName) {
  return String(fileName || '').replace(/\.txt$/i, '.jpg');
}

const catalog = JSON.parse(readFileSync(catalogPath, 'utf8'));
const candidateFiles = existsSync(candidatesDirectory)
  ? readdirSync(candidatesDirectory).filter(name => name.endsWith('.json')).sort()
  : [];
const sourceToCards = new Map();

for (const candidateFile of candidateFiles) {
  const parsed = JSON.parse(readFileSync(join(candidatesDirectory, candidateFile), 'utf8'));
  const cards = Array.isArray(parsed) ? parsed : parsed.cards;
  if (!Array.isArray(cards)) continue;
  for (const card of cards) {
    for (const rawFile of card.sourceArchiveFiles || []) {
      const file = normalizeSourceFile(rawFile);
      const records = sourceToCards.get(file) || [];
      records.push({
        id: card.id || null,
        title: card.title || null,
        status: card.status || 'needs-review',
        candidateFile,
      });
      sourceToCards.set(file, records);
    }
  }
}

const items = (catalog.items || []).map(source => {
  const cards = sourceToCards.get(source.archiveFile) || [];
  const verified = cards.filter(card => card.status === 'verified');
  const needsReview = cards.filter(card => card.status !== 'verified');
  return {
    archiveFile: source.archiveFile,
    ocrConfidence: source.confidence,
    requiresOriginalReview: source.requiresOriginalReview,
    ocrStatus: source.status,
    cardizationStatus: verified.length ? 'verified' : needsReview.length ? 'needs-review' : 'pending',
    cards,
  };
});

const summary = {
  originalImages: items.length,
  ocrComplete: items.filter(item => item.ocrStatus === 'complete').length,
  originalReviewNeeded: items.filter(item => item.requiresOriginalReview).length,
  cardizedVerified: items.filter(item => item.cardizationStatus === 'verified').length,
  cardizationNeedsReview: items.filter(item => item.cardizationStatus === 'needs-review').length,
  cardizationPending: items.filter(item => item.cardizationStatus === 'pending').length,
};

const output = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  summary,
  candidateFiles,
  items,
};
const outputPath = join(ocrDirectory, 'cardization-ledger.json');
writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ outputPath, summary, candidateFiles }, null, 2));
