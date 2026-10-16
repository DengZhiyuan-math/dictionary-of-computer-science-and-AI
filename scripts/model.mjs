import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const read = name => fs.readFileSync(path.join(root, name), 'utf8');
export const book = JSON.parse(read('data/book.json'));
export const glossary = JSON.parse(read('data/glossary.json')).sort((a, b) => a[0].localeCompare(b[0], 'en'));
export const clean = text => text.replace(/【[^】]+】/g, '').trim();
export const sectionId = (c, ordinal) => `chapter-${c.num}-section-${String(ordinal).padStart(2, '0')}`;
for (const c of book.chapters) {
  let ordinal = 0;
  c.toc = c.blocks.flatMap((b, index) => b.kind === 'heading' ? [{index, title: b.text, anchor: sectionId(c, ++ordinal)}] : []);
  c.textchars = c.blocks.reduce((sum, b) => sum + b.text.length, 0);
}
const text = book.chapters.flatMap(c => c.blocks.map(b => b.text)).join('\n\n');
book.stats = {
  chapters: book.chapters.length,
  new_chapters: book.chapters.filter(c => c.new).length,
  new_subsections: book.chapters.filter(c => c.new && !c.quiz).reduce((n, c) => n + c.toc.length, 0),
  quiz_questions: book.chapters.filter(c => c.quiz).reduce((n, c) => n + c.toc.length, 0),
  training_chapters: book.chapters.filter(c => c.micro).length,
  body_characters_including_whitespace: text.length,
  body_characters_no_whitespace: text.replace(/\s/g, '').length,
  chinese_characters: (text.match(/\p{Script=Han}/gu) || []).length,
  sources: book.sources.length,
  glossary_entries: glossary.length,
  groups: Object.fromEntries([...new Set(book.chapters.map(c => c.group))].map(g => [g, book.chapters.filter(c => c.group === g).length]))
};
export const refs = c => c.source_ids.map(id => {
  const s = book.sources.find(s => s.id === id);
  if (!s) throw new Error(`Unknown source ${id} in chapter ${c.num}`);
  return `[S${String(id).padStart(3, '0')} · ${s.title}](${s.url})`;
}).join('；');
export function markdown(c) {
  const headings = new Map(c.toc.map(s => [s.index, s.anchor]));
  return `<a id="chapter-${c.num}"></a>\n\n## 第 ${c.num} 讲｜${c.title}\n\n领域：${c.group} · ${c.new ? '细讲' : '导览 / 复习'}\n\n` +
    c.blocks.map((b, i) => b.kind === 'heading' ? `<a id="${headings.get(i)}"></a>\n\n### ${b.text}` : b.text).join('\n\n') +
    `\n\n参考资料（不朗读）：${refs(c)}\n`;
}
export const chapterText = c => `第 ${c.num} 讲。${c.title}。\n\n` + c.blocks.map(b => clean(b.text.replace(/【答题停顿】/g, '（请暂停，先尝试回答。）'))).join('\n\n') + '\n';
