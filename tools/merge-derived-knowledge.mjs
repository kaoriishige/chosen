import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const defaults = {
  inputDirectory: 'work/knowledge-candidates',
  knowledgeFile: 'dist/data/selected-reason-knowledge.json',
  dryRun: false,
};

function takeOption(args, name) {
  const index = args.indexOf(name);
  if (index < 0) return null;
  const value = args[index + 1];
  args.splice(index, value === undefined ? 1 : 2);
  return value ?? null;
}

const args = process.argv.slice(2);
const inputDirectory = takeOption(args, '--input') || defaults.inputDirectory;
const knowledgeFile = takeOption(args, '--knowledge') || defaults.knowledgeFile;
const dryRun = args.includes('--dry-run');

if (!existsSync(inputDirectory)) {
  console.error(`Candidate directory does not exist: ${inputDirectory}`);
  process.exit(1);
}

const knowledge = JSON.parse(readFileSync(knowledgeFile, 'utf8'));
const sourceFiles = readdirSync(inputDirectory)
  .filter(name => name.endsWith('.json'))
  .sort();

const candidates = sourceFiles.flatMap(name => {
  const parsed = JSON.parse(readFileSync(join(inputDirectory, name), 'utf8'));
  const cards = Array.isArray(parsed) ? parsed : parsed.cards;
  if (!Array.isArray(cards)) throw new Error(`${name}: cards array is required`);
  return cards.map((card, index) => ({ ...card, _candidateFile: name, _candidateIndex: index }));
});

const usable = candidates.filter(card => card.status === 'verified');
const invalid = usable.filter(card => !card.title || !card.principle || !card.action || !card.guardrail);
if (invalid.length) {
  throw new Error(`Verified candidate cards need title, principle, action, and guardrail (${invalid.map(card => `${card._candidateFile}#${card._candidateIndex + 1}`).join(', ')})`);
}

const existing = Array.isArray(knowledge.cards) ? knowledge.cards : [];
const existingKeys = new Set(existing.map(card => `${card.title}\u0000${card.principle}`));
const derivedSourceType = '非公開原本アーカイブからの独自要約';

function inferStages(card) {
  if (Array.isArray(card.stages) && card.stages.length) return card.stages;
  const text = `${card.title ?? ''}\n${card.principle ?? ''}\n${card.action ?? ''}`;
  const stages = new Set();
  if (/対象|顧客|選択|見つけ|専門化/.test(text)) stages.add('customer');
  if (/洞察|調査|失注|不安|体験|顧客の声|対話|観察/.test(text)) stages.add('insight');
  if (/成果|約束|到達|機能/.test(text)) stages.add('outcome');
  if (/根拠|証拠|検証|比較|実績|確認/.test(text)) stages.add('evidence');
  if (/改善|差別化|価値設計|模倣|専門化/.test(text)) stages.add('innovation');
  if (/媒体|検索|発信|AI/.test(text)) stages.add('media');
  if (/実行|現場|組織|販売後|継続|学習|運用|フォロー/.test(text)) stages.add('execution');
  return stages.size ? [...stages] : ['customer', 'insight'];
}

const derived = usable
  .filter(card => !existingKeys.has(`${card.title}\u0000${card.principle}`))
  .map((card, index) => ({
    id: card.id || `derived-${String(index + 1).padStart(3, '0')}`,
    title: card.title,
    principle: card.principle,
    action: card.action,
    guardrail: card.guardrail,
    decisionCriteria: Array.isArray(card.decisionCriteria) ? card.decisionCriteria : [],
    questions: Array.isArray(card.questions) ? card.questions : [],
    stages: inferStages(card),
    sourcePages: [],
    sourceType: derivedSourceType,
  }));

const existingDerived = existing.filter(card => card.sourceType === derivedSourceType);
const totalDerived = existingDerived.length + derived.length;
const normalizedSourceFiles = candidates
  .flatMap(card => Array.isArray(card.sourceArchiveFiles) ? card.sourceArchiveFiles : [])
  .map(file => String(file).replace(/\.txt$/i, '.jpg'));
const cardizedSourceImageCount = new Set(normalizedSourceFiles).size;
const reviewSourceImageCount = new Set(
  candidates
    .filter(card => card.status !== 'verified')
    .flatMap(card => Array.isArray(card.sourceArchiveFiles) ? card.sourceArchiveFiles : [])
    .map(file => String(file).replace(/\.txt$/i, '.jpg'))
).size;
const archiveCount = Number(knowledge.source?.archivedSourceImageCount || 0);
const remainingSourceImageCount = archiveCount > 0
  ? Math.max(archiveCount - cardizedSourceImageCount, 0)
  : null;
const cardizationStatus = `非公開原本アーカイブから検証済みの独自要約カードを${totalDerived}枚反映。原本${cardizedSourceImageCount}枚をカード化済み${reviewSourceImageCount ? `（うち${reviewSourceImageCount}枚は原本照合待ち）` : ''}${remainingSourceImageCount !== null ? `、残り${remainingSourceImageCount}枚を知識化中` : ''}。`;

const next = {
  ...knowledge,
  source: {
    ...knowledge.source,
    derivedKnowledgeCardCount: totalDerived,
    cardizedSourceImageCount,
    cardizationNeedsReviewSourceImageCount: reviewSourceImageCount,
    derivedKnowledgeStatus: cardizationStatus,
    ingestionStatus: `原本${archiveCount || '全'}枚を非公開で保管し、OCRは完了しています。${cardizationStatus}書籍の画像や原文は公開せず、確認済みの独自要約だけを助言に使います。`,
  },
  cards: [...existing, ...derived],
};

console.log(JSON.stringify({
  candidateFiles: sourceFiles.map(name => basename(name)),
  totalCandidates: candidates.length,
  verifiedCandidates: usable.length,
  needsReview: candidates.filter(card => card.status !== 'verified').length,
  addedToPublicKnowledge: derived.length,
  dryRun,
}, null, 2));

if (!dryRun) {
  writeFileSync(knowledgeFile, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
}
