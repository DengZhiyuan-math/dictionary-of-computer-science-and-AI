import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {buildEnglishInterviews, companySlug, loadEnglishInterviews, sourceKindNames} from './english-interviews.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const {manifest, batches, questions, graph} = loadEnglishInterviews();
const english = (value, label) => {
  assert.equal(typeof value, 'string', `${label}: expected text`);
  assert(value.trim(), `${label}: empty text`);
  assert(!/\p{Script=Han}/u.test(value), `${label}: untranslated prose`);
};
const https = (value, label) => {
  assert.equal(new URL(value).protocol, 'https:', `${label}: expected HTTPS`);
};
const filename = value => assert(/^[a-z0-9-]+\.(?:json|md)$/.test(value), `Unsafe content filename: ${value}`);
const chapterReferences = (values, label) => {
  assert(Array.isArray(values) && values.length, `${label}: missing chapter references`);
  assert.equal(new Set(values).size, values.length, `${label}: repeated chapter`);
  for (const chapter of values) assert(Number.isInteger(chapter) && chapter >= 1 && chapter <= 106, `${label}: unknown original chapter ${chapter}`);
};
const textList = (values, label) => {
  assert(Array.isArray(values) && values.length, `${label}: missing items`);
  for (const value of values) english(value, label);
};

assert.equal(manifest.language, 'en');
assert.equal(manifest.reviewedAt, '2026-10-17');
assert.equal(manifest.sourceRepository, 'https://github.com/DengZhiyuan-math/personal_website');
assert.equal(manifest.sourceRevision, '712e22faf590e1eb44df2da355d4ce9074511e5e');
assert.equal(manifest.baseDictionaryRevision, 'af1103f0bd3f152d48a9d445c2756025059d1df3');
assert.equal(batches.length, 13);
assert.equal(new Set(batches.map(batch => batch.file)).size, batches.length);
filename(manifest.knowledgeMap);
for (const batch of batches) {
  filename(batch.file);
  english(batch.title, batch.file);
  assert(Array.isArray(batch.questions) && batch.questions.length, `${batch.file}: empty batch`);
}
assert.equal(manifest.sourceNotes.length, 14);
assert.equal(new Set(manifest.sourceNotes).size, 14);
for (const note of manifest.sourceNotes) {
  filename(note);
  assert(fs.existsSync(path.join(root, 'docs/en/sources', note)), `Missing source note: ${note}`);
  const text = fs.readFileSync(path.join(root, 'docs/en/sources', note), 'utf8');
  english(text, note);
  assert(/https:\/\//.test(text), `Source note has no reference URL: ${note}`);
}

assert.equal(questions.length, 100);
assert.equal(new Set(questions.map(question => question.id)).size, 100);
assert.equal(questions.reduce((sum, question) => sum + question.examples.length, 0), 210);
assert.deepEqual(Object.fromEntries(Object.keys(sourceKindNames).map(kind => [kind, questions.filter(question => question.sourceKind === kind).length])), {
  'company-sample': 9, 'official-practice': 41, 'documentation-derived': 50
});
const companies = [...new Set(questions.map(question => question.company))];
assert.equal(new Set(companies.map(companySlug)).size, companies.length);

// The original 36 are translated into the same schema without changing identities,
// source categories, prerequisites, or background chapter references.
const originalBank = JSON.parse(fs.readFileSync(path.join(root, 'data/interview-bank.json'), 'utf8'));
const translated = batches.find(batch => batch.file === 'interviews-original.json').questions;
assert.equal(translated.length, 36);
for (const [index, original] of originalBank.questions.entries()) {
  const question = translated[index];
  const source = originalBank.sources.find(item => item.id === original.sourceId);
  assert.equal(question.id, original.id);
  assert.equal(question.originalNumber, original.number);
  assert.equal(question.originalSourceId, original.sourceId);
  assert.equal(question.number, index + 1);
  assert.equal(question.sourceKind, original.sourceKind);
  assert.equal(question.url, source.url);
  assert.deepEqual(question.topics, original.concepts);
  assert.deepEqual(question.chapters, original.chapters);
  english(question.followUpAnswer, `${question.id}.followUpAnswer`);
  assert.equal(question.contentReviewed, manifest.reviewedAt);
}

const nodes = new Map(graph.nodes.map(node => [node.id, node]));
const areas = graph.nodes.filter(node => node.type === 'area');
const concepts = graph.nodes.filter(node => node.type === 'concept');
assert.equal(areas.length, 14);
assert.equal(concepts.length, 169);
assert.equal(graph.nodes.length, 183);
assert.equal(nodes.size, 183);
assert.equal(new Set(concepts.map(concept => concept.key)).size, 169);

for (const question of questions) {
  assert(!/\p{Script=Han}/u.test(JSON.stringify(question)), `${question.id}: untranslated data`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(question.id), `Invalid question ID: ${question.id}`);
  for (const field of ['title', 'company', 'sourceTitle', 'prompt', 'complexity', 'answer', 'followUp']) english(question[field], `${question.id}.${field}`);
  assert(Object.hasOwn(sourceKindNames, question.sourceKind), `${question.id}: unknown source kind`);
  https(question.url, question.id);
  assert(/^\d{4}-\d{2}-\d{2}$/.test(question.checked) && question.checked <= manifest.reviewedAt, `${question.id}: invalid source review date`);
  if (question.followUpAnswer !== undefined) english(question.followUpAnswer, `${question.id}.followUpAnswer`);
  if (question.sourceNote !== undefined) english(question.sourceNote, `${question.id}.sourceNote`);
  for (const field of ['approach', 'pitfalls', 'topics']) textList(question[field], `${question.id}.${field}`);
  assert(question.approach.length >= 3, `${question.id}: incomplete approach`);
  assert.equal(new Set(question.topics).size, question.topics.length, `${question.id}: repeated topic`);
  for (const key of question.topics) assert.equal(nodes.get(`concept:${key}`)?.type, 'concept', `${question.id}: unknown concept ${key}`);
  chapterReferences(question.chapters, question.id);
  assert(question.examples.length >= 1, `${question.id}: missing worked examples`);
  for (const [i, example] of question.examples.entries()) {
    assert(Object.hasOwn(example, 'input') && Object.hasOwn(example, 'output'), `${question.id} example ${i}: missing input/output`);
    assert.doesNotThrow(() => JSON.stringify(example.input));
    assert.doesNotThrow(() => JSON.stringify(example.output));
    english(example.explanation, `${question.id}.examples[${i}]`);
  }
  if (question.additionalSources !== undefined) {
    assert(Array.isArray(question.additionalSources));
    for (const source of question.additionalSources) {
      english(source.title, `${question.id}.additionalSources`);
      https(source.url, `${question.id}.additionalSources`);
    }
  }
}
for (const area of areas) {
  assert.equal(area.id, `area:${area.area}`);
  for (const field of ['label', 'layer', 'description', 'question']) english(area[field], `${area.id}.${field}`);
}
for (const concept of concepts) {
  assert.equal(concept.id, `concept:${concept.key}`);
  for (const field of ['key', 'label', 'description', 'boundary']) english(concept[field], `${concept.id}.${field}`);
  assert.equal(nodes.get(`area:${concept.area}`)?.type, 'area', `${concept.id}: unknown area`);
  chapterReferences(concept.chapters, concept.id);
  if (concept.explanation !== undefined) textList(concept.explanation, `${concept.id}.explanation`);
  if (concept.url !== undefined) https(concept.url, concept.id);
}
const edgeKeys = new Set();
const edgeIds = new Set();
for (const edge of graph.edges) {
  assert(nodes.has(edge.from) && nodes.has(edge.to), `Invalid English map edge: ${edge.id}`);
  assert.notEqual(edge.from, edge.to, `Self edge: ${edge.id}`);
  english(edge.label, edge.id);
  english(edge.type, edge.id);
  assert(!edgeIds.has(edge.id), `Repeated edge ID: ${edge.id}`);
  edgeIds.add(edge.id);
  const key = JSON.stringify([edge.from, edge.to, edge.type]);
  assert(!edgeKeys.has(key), `Repeated edge: ${key}`);
  edgeKeys.add(key);
  if (edge.type === 'prerequisite') assert(nodes.get(edge.from).type === 'concept' && nodes.get(edge.to).type === 'concept', `Invalid prerequisite: ${edge.id}`);
}
for (const concept of concepts) assert(graph.edges.some(edge => edge.from === `area:${concept.area}` && edge.to === concept.id && edge.type === 'contains'), `${concept.id}: missing area membership`);
const visiting = new Set(), visited = new Set();
function visit(id) {
  assert(!visiting.has(id), `Cyclic English prerequisite: ${id}`);
  if (visited.has(id)) return;
  visiting.add(id);
  for (const edge of graph.edges.filter(edge => edge.type === 'prerequisite' && edge.from === id)) visit(edge.to);
  visiting.delete(id);
  visited.add(id);
}
for (const concept of concepts) visit(concept.id);

const output = new Map();
buildEnglishInterviews((name, text) => { assert(!output.has(name)); output.set(name, text); });
assert.equal(output.size, companies.length + 3);
const overview = output.get('docs/en/README.md');
assert(overview.includes('100 English preparation questions'));
assert(overview.includes('original 36 entries') && overview.includes('64 later additions'));
assert.deepEqual(questions.map(question => question.number), Array.from({length: 100}, (_, index) => index + 1));
for (const [kind, count] of Object.entries({'company-sample': 9, 'official-practice': 41, 'documentation-derived': 50})) assert(overview.includes(`| ${sourceKindNames[kind]} | ${count} |`), `Missing source-kind table row: ${kind}`);
const map = output.get('docs/en/KNOWLEDGE_MAP.md');
const index = output.get('docs/en/INTERVIEW_QUESTIONS.md');
assert.equal([...map.matchAll(/<a id="concept-[^"]+"><\/a>/g)].length, 169);
assert.equal([...map.matchAll(/<a id="area-[^"]+"><\/a>/g)].length, 14);
assert(map.indexOf('## Complete area overview') < map.indexOf('## Concept explanations'));
for (const [name, text] of output) {
  english(text, name);
  assert.equal((text.match(/^```/gm) || []).length % 2, 0, `${name}: unclosed code fence`);
}
for (const question of questions) {
  const slug = companySlug(question.company);
  const page = output.get(`docs/en/questions/${slug}.md`);
  assert(page.includes(`<a id="question-${question.id}"></a>`));
  assert(page.includes(`## ${String(question.number).padStart(2, '0')} · ${question.title}`));
  if (question.followUpAnswer) assert(page.includes(`**Reference answer:** ${question.followUpAnswer}`));
  assert(index.includes(`questions/${slug}.md#question-${question.id}`));
  for (const topic of question.topics) {
    assert(page.includes(`../KNOWLEDGE_MAP.md#concept-${topic}`), `${question.id}: missing map link`);
    const start = map.indexOf(`<a id="concept-${topic}"></a>`);
    const end = map.indexOf('\n---\n', start);
    assert(map.slice(start, end).includes(`questions/${slug}.md#question-${question.id}`), `${question.id}: missing reverse map link`);
  }
  for (const chapter of question.chapters) assert(page.includes(`../../../chapters/${String(chapter).padStart(2, '0')}.md`));
}
console.log(`Unified English collection passed: ${questions.length} questions, 210 examples, ${companies.length} organizations, ${concepts.length} concepts, ${areas.length} areas, source provenance, chapter references, acyclic prerequisites and bidirectional links.`);
