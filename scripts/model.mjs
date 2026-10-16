import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {hot100} from '../data/hot100.mjs';
import {examples, exampleParagraphs} from '../data/examples.mjs';
import {demos} from '../data/demo-engines.mjs';

export const root = fileURLToPath(new URL('../', import.meta.url));
export const read = name => fs.readFileSync(path.join(root, name), 'utf8');
export const book = JSON.parse(read('data/book.json'));
export {hot100};
// The original 80 chapter IDs remain stable. The supplement has its own single content source.
if (book.chapters.length !== hot100.firstChapter - 1) throw new Error('Hot 100 must follow the original chapters');
const studyPlanId = Math.max(...book.sources.map(s => s.id)) + 1;
book.sources.push({id: studyPlanId, title: 'LeetCode — 热题 100 官方学习计划（2026-10-16 核对）', url: hot100.source});
const checkedProblems = new Set([560, 239, 287, 4]);
for (const category of hot100.categories) {
  const sourceIds = [studyPlanId];
  for (const p of category.problems.filter(p => checkedProblems.has(p.id))) {
    const id = Math.max(...book.sources.map(s => s.id)) + 1;
    book.sources.push({id, title: `LeetCode ${p.id} — ${p.title}`, url: `https://leetcode.com/problems/${p.slug}/`});
    sourceIds.push(id);
  }
  book.chapters.push({
    id: category.chapter-1, num: String(category.chapter), title: category.title,
    group: 'LeetCode Hot 100 算法思想', new: true, micro: false, quiz: false, focus: true, hot100: true,
    source_ids: sourceIds,
    blocks: [
      {kind: 'text', text: `本讲对应 Hot 100 官方“${category.name}”分组，共 ${category.problems.length} 题。先理解状态与不变式，再用题目检查自己能否解释移动、转移或剪枝为什么成立。题单核对日期：${hot100.checkedAt}。`},
      ...category.sections.flatMap(s => [{kind: 'heading', text: s.title}, ...s.paragraphs.map(text => ({kind: 'text', text}))]),
      {kind: 'heading', text: '本讲逐题映射：思路、复杂度与易错点【重点】'},
      ...category.problems.map(p => ({kind: 'text', text: `第 ${p.id} 题，${p.title}。核心思路：${p.idea} 时间：${p.time}；辅助空间：${p.space}。易错点：${p.pitfall}`}))
    ]
  });
}
export const glossary = JSON.parse(read('data/glossary.json')).sort((a, b) => a[0].localeCompare(b[0], 'en'));
for(const [title,url,chapters] of [
  ['PyTorch 2.14 — Conv2d：二维互相关','https://docs.pytorch.org/docs/2.14/generated/torch.nn.Conv2d.html',[48,49]],
  ['PyTorch 2.14 — Scaled Dot Product Attention','https://docs.pytorch.org/docs/2.14/generated/torch.nn.functional.scaled_dot_product_attention.html',[52,53]],
  ['scikit-learn — KMeans：Lloyd 更新与局部最优','https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html',[31]],
  ['Cormack, Clarke, Buettcher — Reciprocal Rank Fusion','https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf',[59,60]]
]){
  const id=Math.max(...book.sources.map(s=>s.id))+1;
  book.sources.push({id,title,url});for(const num of chapters)book.chapters[num-1].source_ids.push(id);
}
for(const x of examples){
  const c=book.chapters[x.chapters[0]-1];
  c.blocks.push({kind:'heading',text:`案例 ${String(x.number).padStart(2,'0')}：${x.title}`,example:x.id},...exampleParagraphs(x).map(text=>({kind:'text',text,example:x.id})));
}
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
  new_subsections: book.chapters.filter(c => !c.quiz).reduce((n, c) => n + (c.new?c.toc.length:c.blocks.filter(b=>b.kind==='heading'&&b.example).length), 0),
  quiz_questions: book.chapters.filter(c => c.quiz).reduce((n, c) => n + c.toc.length, 0),
  training_chapters: book.chapters.filter(c => c.micro).length,
  body_characters_including_whitespace: text.length,
  body_characters_no_whitespace: text.replace(/\s/g, '').length,
  chinese_characters: (text.match(/\p{Script=Han}/gu) || []).length,
  sources: book.sources.length,
  glossary_entries: glossary.length,
  worked_examples: examples.length,
  visual_demos: demos.length,
  hot100_chapters: hot100.categories.length,
  hot100_problems: hot100.categories.reduce((sum, c) => sum + c.problems.length, 0),
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
