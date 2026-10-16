import {interviewQuestions,interviewSources} from '../data/interviews.mjs';
import {advancedAlgorithms} from '../data/advanced-algorithms.mjs';
import {book,markdown,literalMarkdown} from './model.mjs';
export const kindNames={'company-sample':'公司官方公开样题','official-practice':'算法原站公开练习','documentation-derived':'官方文档派生自测'};
const sources=new Map(interviewSources.map(s=>[s.id,s]));
export function questionMarkdown(q){
 const s=sources.get(q.sourceId);
 return literalMarkdown(`## ${String(q.number).padStart(2,'0')} · ${q.title}\n\n**${q.category} · ${kindNames[q.sourceKind]}**\n\n`+
 `**来源：** [${s.title}](${s.url})，${s.publisher}，核对 ${s.checkedAt}。${s.evidence}\n\n`+
 `### 问题\n\n${q.prompt}\n\n### 答题思路\n\n`+q.outline.map((p,i)=>`${i+1}. ${p}`).join('\n')+
 `\n\n### 手算例子\n\n输入：${q.example.input}\n\n`+q.example.steps.map((p,i)=>`${i+1}. ${p}`).join('\n')+
 `\n\n结果：${q.example.output}\n\n### 追问与答案\n\n${q.followup.question}\n\n<details>\n<summary>查看参考答案</summary>\n\n${q.followup.answer}\n\n</details>\n\n**易错点：** ${q.pitfall}\n`);
}
export function buildInterviews(emit){
 let text='<!-- Generated from data/interviews.mjs. -->\n\n# 有来源的面试准备题\n\n'+
 `共 ${interviewQuestions.length} 题：算法 18、系统与工程 9、机器学习与 AI 9。原有 90 道口述题继续保留。每题另有具体输入、手算、追问答案和易错点。部分原站练习与 Hot 100 重叠，36 按本页整理条目计，不宣称全部是新增独立原题。\n\n`+
 '**来源说明：** 3 道公司官方公开样题、16 道算法原站公开练习、17 道官方文档派生原创自测。本轮没有足够依据确认某公司某次真实面试记录，因此不把这些题统一称作“公司真题”，也不编造公司、年份或出现频次。\n\n'+
 '[来源核对记录](INTERVIEW_SOURCES.md) · [算法进阶](ADVANCED_ALGORITHMS.md) · [更多完整案例](EXAMPLES.md) · [第 106 讲](../chapters/106.md) · [知识地图](KNOWLEDGE_MAP.md)\n\n';
 for(const category of ['算法','系统与工程','机器学习与 AI']){
  text+=`## ${category}导航\n\n| 题目 | 来源类型 | 配套章节 |\n| --- | --- | --- |\n`;
  for(const q of interviewQuestions.filter(q=>q.category===category))text+=`| [${q.title}](#question-${q.id}) | ${kindNames[q.sourceKind]} | ${q.chapters.map(n=>`[${n}](../chapters/${String(n).padStart(2,'0')}.md)`).join('、')} |\n`;
  text+='\n';
 }
 for(const q of interviewQuestions)text+=`<a id="question-${q.id}"></a>\n\n`+questionMarkdown(q)+'\n配套章节：'+q.chapters.map(n=>`[第 ${n} 讲](../chapters/${String(n).padStart(2,'0')}.md)`).join(' · ')+'\n\n---\n\n';
 emit('docs/INTERVIEW_QUESTIONS.md',text);
 emit('data/interview-bank.json',JSON.stringify({checkedAt:'2026-10-16',sourceKinds:kindNames,sources:interviewSources,questions:interviewQuestions},null,2));
 let algorithms='<!-- Generated from data/advanced-algorithms.mjs. -->\n\n# 算法进阶：从正确性到可核对的实现\n\n'+
 '新增第 98–105 讲，共 8 讲、32 个算法细讲小节，并配手算案例。适合在 Hot 100 基础上继续学习；原有章节编号与小节顺序稳定。\n\n'+
 '[面试准备题](INTERVIEW_QUESTIONS.md) · [完整案例](EXAMPLES.md) · [交互演示](visual-demos.html) · [知识地图](KNOWLEDGE_MAP.md)\n\n'+
 advancedAlgorithms.map(c=>`- [第 ${c.chapter} 讲 · ${c.title}](../chapters/${c.chapter}.md)`).join('\n')+'\n\n';
 algorithms+=advancedAlgorithms.map(c=>markdown(book.chapters[c.chapter-1])).join('\n\n---\n\n');
 emit('docs/ADVANCED_ALGORITHMS.md',algorithms);
}
