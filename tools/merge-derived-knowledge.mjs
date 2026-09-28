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
    stages: Array.isArray(card.stages) && card.stages.length
      ? card.stages
      : ['customer', 'insight', 'outcome', 'evidence', 'media', 'execution'],
    sourcePages: [],
    sourceType: '非公開原本アーカイブからの独自要約',
  }));

const next = {
  ...knowledge,
  source: {
    ...knowledge.source,
    derivedKnowledgeCardCount: derived.length,
    derivedKnowledgeStatus: `非公開原本アーカイブから検証済みの独自要約カードを${derived.length}枚反映`,
  },
  cards: [...existing, ...derived],
};

console.log(JSON.stringify({
  candidateFiles: sourceFiles.map(basename),
  totalCandidates: candidates.length,
  verifiedCandidates: usable.length,
  needsReview: candidates.filter(card => card.status !== 'verified').length,
  addedToPublicKnowledge: derived.length,
  dryRun,
}, null, 2));

if (!dryRun) {
  writeFileSync(knowledgeFile, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
}
