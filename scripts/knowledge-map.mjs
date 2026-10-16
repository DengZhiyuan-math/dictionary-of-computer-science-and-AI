import {book, glossary, hot100, clean, markdown} from './model.mjs';
import {areas, extraConcepts, relations, routes} from '../data/knowledge-map.mjs';

export const slug = text => text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const github = 'https://github.com/DengZhiyuan-math/dictionary-of-computer-science-and-AI/blob/main/';
const areaFor = num => areas.find(a=>a.chapters.includes(num));
const safeName = text => text.replace(/[<>:"/\\|?*#^]/g,' ').replace(/\s+/g,' ').trim();
const chapterFile = num => `Chapters/第 ${String(num).padStart(2,'0')} 讲 ${safeName(book.chapters[num-1].title)}.md`;
const wiki = (file,label) => `[[${file.replace(/\.md$/,'')}|${label.replace(/\|/g,'／')}]]`;
const front = (title,type,area,aliases=[]) => `---\ntitle: ${JSON.stringify(title)}\naliases: ${JSON.stringify([...new Set(aliases)].filter(a=>a!==title))}\ntags: ${JSON.stringify([type,...(area?['area/'+area]:[])])}\n---\n\n<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->\n\n`;
const chapterLink = (num,label) => wiki(chapterFile(num),label||`第 ${String(num).padStart(2,'0')} 讲`);
const chapterSource = num => `../chapters/${String(num).padStart(2,'0')}.md`;
export function makeKnowledgeGraph() {
  const nodes=[], edges=[];
  const add = node => nodes.push(node);
  const edge = (from,to,type,label) => edges.push({id:`e${edges.length+1}`,from,to,type,label});
  add({id:'home',type:'home',label:'CS 与 AI 知识地图',note:'00-知识地图.md',description:'计算基础、统计学习、深度模型、系统与行动、理解与实践。'});
  for(const a of areas) {
    add({id:`area:${a.id}`,type:'area',label:a.name,area:a.id,layer:a.layer,note:`Areas/${safeName(a.name)}.md`,description:a.summary,question:a.question});
    edge('home',`area:${a.id}`,'contains','领域入口');
  }
  for(const a of areas) for(const next of a.next) edge(`area:${a.id}`,`area:${next}`,'learning-path','推荐衔接');
  for(const [en,zh,num,category,definition,boundary] of glossary) {
    const id=slug(en), area=areaFor(num).id;
    const c=book.chapters[num-1];
    const match=c.toc.find(s=>en.split(' / ').some(t=>clean(s.title).toLowerCase().includes(t.toLowerCase())));
    add({id:`concept:${id}`,key:id,type:'concept',label:zh,en,area,note:`Concepts/${safeName(zh)}.md`,description:definition,boundary,chapters:[num],heading:match?.title||null,category});
  }
  for(const [id,label,en,area,chapters,description,boundary] of extraConcepts) add({id:`concept:${id}`,key:id,type:'concept',label,en,area,note:`Concepts/${safeName(label)}.md`,description,boundary,chapters});
  const concepts=nodes.filter(n=>n.type==='concept');
  for(const n of concepts) edge(`area:${n.area}`,n.id,'contains','核心概念');
  for(const c of book.chapters) {
    const area=areaFor(Number(c.num)).id;
    add({id:`chapter:${c.num}`,type:'chapter',label:`第 ${c.num} 讲 · ${c.title}`,area,note:chapterFile(Number(c.num)),description:c.blocks.find(b=>b.kind==='text')?.text||c.title,chapter:Number(c.num),source:`chapters/${c.num}.md`});
    edge(`area:${area}`,`chapter:${c.num}`,'contains','章节');
    for(const n of concepts.filter(n=>n.chapters.includes(Number(c.num)))) edge(`chapter:${c.num}`,n.id,'explains','章节解释');
  }
  for(const [from,to,type,label] of relations) edge(`concept:${from}`,`concept:${to}`,type,label);
  const sectionConcepts = {
    81:['hash-table','canonical-key','hash-table','hash-table'],
    82:['loop-invariant','two-pointers','two-pointers','two-pointers','loop-invariant'],
    83:['sliding-window','sliding-window','complexity','sliding-window'],
    84:['prefix-sum','monotonic-deque','sliding-window','loop-invariant'],
    85:['kadane','data-structures','two-pointers','data-structures','in-place-marking'],
    86:['in-place-marking','loop-invariant','in-place-marking','two-pointers'],
    87:['dummy-node','data-structures','fast-and-slow-pointers','two-pointers','hash-table','recursion','cache'],
    88:['bfs-dfs','postorder-dp','data-structures','recursion','recursion','prefix-sum','complexity'],
    89:['bfs-dfs','multi-source-bfs','topological-sort','trie'],
    90:['backtracking-pruning','backtracking-pruning','backtracking-pruning','backtracking-pruning','backtracking-pruning','backtracking-pruning'],
    91:['lower-bound-upper-bound','lower-bound-upper-bound','lower-bound-upper-bound','lower-bound-upper-bound','lower-bound-upper-bound','loop-invariant'],
    92:['stack','stack','stack','monotonic-stack','monotonic-stack'],
    93:['heap','quickselect-top-k','heap'],
    94:['greedy','greedy','greedy','greedy'],
    95:['dynamic-programming','0-1-knapsack-unbounded-knapsack','dynamic-programming','dynamic-programming','dynamic-programming','0-1-knapsack-unbounded-knapsack','dynamic-programming','dynamic-programming'],
    96:['dynamic-programming','dynamic-programming','dynamic-programming','dynamic-programming','dynamic-programming'],
    97:['loop-invariant','loop-invariant','loop-invariant','two-pointers','fast-and-slow-pointers']
  };
  const extraPractice = {23:['heap'],146:['hash-table'],215:['quickselect-top-k'],300:['lower-bound-upper-bound'],131:['dynamic-programming'],287:['graph-algorithms']};
  for(const category of hot100.categories) for(const p of category.problems) {
    const id=`problem:${p.id}`;
    add({id,type:'problem',label:`LC ${p.id} · ${p.title}`,area:'hot100',note:`Practice/LC-${String(p.id).padStart(4,'0')} ${safeName(p.title)}.md`,description:p.idea,problem:p.id,chapter:category.chapter,section:p.section,source:`chapters/${category.chapter}.md#chapter-${category.chapter}-section-${String(p.section).padStart(2,'0')}`,url:`https://leetcode.cn/problems/${p.slug}/`,time:p.time,space:p.space,boundary:p.pitfall});
    edge(id,`chapter:${category.chapter}`,'practice','对应讲解');
    for(const key of new Set([sectionConcepts[category.chapter][p.section-1],...(extraPractice[p.id]||[])])) edge(id,`concept:${key}`,'practice','练习这一思想');
  }
  for(const r of routes) {
    const id=`route:${r.id}`;
    add({id,type:'route',label:r.name,note:`Routes/${safeName(r.name)}.md`,description:r.summary,steps:r.steps});
    edge('home',id,'contains','专题路线');
    for(const key of r.steps) edge(id,`concept:${key}`,'route-step','路线中的概念');
  }
  return {metadata:{version:book.metadata.version,date:book.metadata.date,title:'CS 与 AI 知识地图',semantics:{contains:'目录归属',explains:'章节解释',prerequisite:'推荐的理解先修',supports:'用于或帮助实现',related:'有解释的关联',contrast:'需要区分',practice:'题目练习', 'learning-path':'推荐领域衔接','route-step':'专题学习顺序'}},nodes,edges};
}

export const graph = makeKnowledgeGraph();
graph.stats={areas:areas.length,concepts:graph.nodes.filter(n=>n.type==='concept').length,chapters:book.chapters.length,problems:100,routes:routes.length,nodes:graph.nodes.length,edges:graph.edges.length};
const byId = new Map(graph.nodes.map(n=>[n.id,n]));
const link = id => {const n=byId.get(id);if(!n) throw new Error(`Unknown knowledge node ${id}`);return wiki(n.note,n.label)};

export function buildKnowledgeMap(emit) {
  const core=graph.nodes.filter(n=>n.type==='concept');
  const typed=graph.edges.filter(e=>['prerequisite','supports','related','contrast'].includes(e.type));
  const root='00-知识地图.md';
  let home=front('CS 与 AI 知识地图','map',null,['dictionary of computer science and AI'])+'# CS 与 AI 知识地图\n\n'+
    `从问题进入领域，从概念进入章节，再通过练习检查理解。当前覆盖 ${book.chapters.length} 讲、${core.length} 个概念词条组、100 道 Hot 100 练习。\n\n`+
    '## 打开方式\n\n将本文件所在的 `obsidian-vault` 文件夹作为 Obsidian 仓库打开。先读本页，再打开关系图谱或任一专题路线。所有双链目标都已生成，章节笔记内保留完整原文。\n\n'+
    '概念页的“先修”是推荐理解顺序；“用于”“关联”“对照”各有说明。目录归属不等于算法分类或逻辑依赖。图谱线条由真实笔记链接形成；有向类型请看笔记中的关系说明。\n\n';
  for(const layer of [...new Set(areas.map(a=>a.layer))]) {
    home+=`## ${layer}\n\n`;
    for(const a of areas.filter(a=>a.layer===layer)) home+=`- ${link('area:'+a.id)}：${a.question}\n`;
    home+='\n';
  }
  home+='## 专题路线\n\n'+routes.map(r=>`- ${link('route:'+r.id)}：${r.summary}`).join('\n')+'\n\n'+
    '## 画布与关系说明\n\n'+wiki('Maps/总览.canvas','打开总览画布')+' · '+wiki('Maps/训练流程.canvas','打开训练流程画布')+'\n\n'+
    'Obsidian 的全局图适合发现聚类，局部图适合追踪一到两层关联；按 `path:Concepts`、`path:Areas` 或 `tag:area/training` 筛选可减少章节和题目节点的视觉干扰。导航关系、概念关系与学习路线的含义不同。\n\n'+
    '[GitHub 可点击知识地图]('+github+'docs/KNOWLEDGE_MAP.md) · [Obsidian 双链说明](https://help.obsidian.md/links) · [关系图谱说明](https://help.obsidian.md/plugins/graph)\n';
  emit('obsidian-vault/'+root,home);
  for(const a of areas) {
    const concepts=core.filter(n=>n.area===a.id);
    let text=front(a.name,'area',a.id)+`# ${a.name}\n\n${wiki(root,'知识地图')}\n\n**核心问题：** ${a.question}\n\n${a.summary}\n\n## 概念入口\n\n`;
    text+=concepts.map(n=>`- ${link(n.id)}：${n.description}`).join('\n')+'\n\n## 章节原文\n\n';
    text+=a.chapters.map(num=>chapterLink(num,`第 ${String(num).padStart(2,'0')} 讲 · ${book.chapters[num-1].title}`)).map(l=>'- '+l).join('\n');
    text+='\n\n## 跨领域连接\n\n'+a.bridges+'\n\n';
    const neighbors=graph.edges.filter(e=>e.type==='learning-path'&&(e.from==='area:'+a.id||e.to==='area:'+a.id));
    for(const e of neighbors) text+=`- ${e.from==='area:'+a.id?'推荐继续':'可从这里进入'}：${link(e.from==='area:'+a.id?e.to:e.from)}。\n`;
    text+='\n## 概念间的连接\n\n';
    const local=typed.filter(e=>byId.get(e.from).area===a.id||byId.get(e.to).area===a.id);
    text+=local.map(e=>`- ${link(e.from)} → ${link(e.to)}：${e.label}。`).join('\n')+'\n';
    if(a.id==='hot100') text+='\n## 练习题\n\n'+graph.nodes.filter(n=>n.type==='problem').map(n=>'- '+link(n.id)).join('\n')+'\n';
    emit('obsidian-vault/'+byId.get('area:'+a.id).note,text);
  }
  for(const n of core) {
    let text=front(n.label,'concept',n.area,[n.en])+`# ${n.label}\n\n**${n.en}** · ${link('area:'+n.area)}\n\n## 定义\n\n${n.description}\n\n## 易混点与边界\n\n${n.boundary}\n\n`;
    const incoming=typed.filter(e=>e.type==='prerequisite'&&e.to===n.id);
    const outgoing=typed.filter(e=>e.type==='prerequisite'&&e.from===n.id);
    text+='## 推荐先修\n\n'+(incoming.length?incoming.map(e=>`- ${link(e.from)}：${e.label}。`).join('\n'):'可先结合下面的章节读定义与例子；没有额外指定的先修关系。')+'\n\n';
    text+='## 继续学习\n\n'+(outgoing.length?outgoing.map(e=>`- ${link(e.to)}：${e.label}。`).join('\n'):'可沿下方的应用、对照与章节继续阅读。')+'\n\n';
    text+='## 应用、关联与对照\n\n';
    const other=typed.filter(e=>e.type!=='prerequisite'&&(e.from===n.id||e.to===n.id));
    text+=other.length?other.map(e=>`- **${graph.metadata.semantics[e.type]}** ${link(e.from===n.id?e.to:e.from)}：${e.label}。`).join('\n'):'结合领域入口中的概念与章节继续扩展。';
    text+='\n\n## 章节依据\n\n';
    for(const num of n.chapters) {
      text+='- '+chapterLink(num,`第 ${String(num).padStart(2,'0')} 讲 · ${book.chapters[num-1].title}`);
      if(n.heading&&num===n.chapters[0]) text+=' · '+wiki(chapterFile(num).replace(/\.md$/,'')+'#'+n.heading,'直达解释小节');
      text+='\n';
    }
    const practice=graph.edges.filter(e=>e.type==='practice'&&e.to===n.id);
    if(practice.length) text+='\n## 关联练习\n\n'+practice.map(e=>'- '+link(e.from)).join('\n')+'\n';
    const rr=graph.edges.filter(e=>e.type==='route-step'&&e.to===n.id);
    if(rr.length) text+='\n## 所在路线\n\n'+rr.map(e=>'- '+link(e.from)).join('\n')+'\n';
    emit('obsidian-vault/'+n.note,text);
  }
  for(const c of book.chapters) {
    const n=byId.get('chapter:'+c.num);
    const concepts=graph.edges.filter(e=>e.type==='explains'&&e.from===n.id);
    let text=front(`第 ${c.num} 讲 · ${c.title}`,'chapter',n.area)+link('area:'+n.area)+'\n\n';
    if(concepts.length) text+='## 本讲概念\n\n'+concepts.map(e=>'- '+link(e.to)).join('\n')+'\n\n';
    if(c.hot100) text+='## 配套练习\n\n'+graph.edges.filter(e=>e.type==='practice'&&e.to===n.id).map(e=>'- '+link(e.from)).join('\n')+'\n\n';
    text+=markdown(c);
    emit('obsidian-vault/'+n.note,text);
  }
  for(const n of graph.nodes.filter(n=>n.type==='problem')) {
    const p=hot100.categories.flatMap(c=>c.problems).find(p=>p.id===n.problem);
    const concepts=graph.edges.filter(e=>e.type==='practice'&&e.from===n.id&&e.to.startsWith('concept:'));
    let text=front(n.label,'practice','hot100')+`# ${n.label}\n\n${link('area:hot100')} · [官方题目](${n.url})\n\n## 识别思想\n\n${n.description}\n\n`;
    text+=concepts.map(e=>'- '+link(e.to)).join('\n')+`\n\n## 对应讲解\n\n${chapterLink(n.chapter)} · `+wiki(chapterFile(n.chapter).replace(/\.md$/,'')+'#'+book.chapters[n.chapter-1].toc[n.section-1].title,'直达算法思想')+'\n\n';
    text+=`## 指定解法的复杂度\n\n时间：${p.time}。\n\n辅助空间：${p.space}。\n\n## 前提与易错点\n\n${p.pitfall}\n\n## 自测\n\n说明状态与不变式，给出一个边界例子，再说明改变哪个输入约束会使当前论证失效。\n`;
    emit('obsidian-vault/'+n.note,text);
  }
  for(const r of routes) {
    let text=front(r.name,'route')+`# ${r.name}\n\n${wiki(root,'知识地图')}\n\n${r.summary}\n\n这些步骤是推荐阅读次序，概念间的具体依赖或对照以各概念页说明为准。\n\n## 路线\n\n`;
    text+=r.steps.map((key,i)=>`${i+1}. ${link('concept:'+key)}：${byId.get('concept:'+key).description}`).join('\n');
    emit('obsidian-vault/'+byId.get('route:'+r.id).note,text+'\n');
  }
  const canvasNodes=[{id:'home',type:'file',file:root,x:1100,y:-420,width:420,height:260}];
  const layers=[...new Set(areas.map(a=>a.layer))];
  for(const [li,layer] of layers.entries()) {
    const members=areas.filter(a=>a.layer===layer);
    canvasNodes.push({id:`group-${li}`,type:'group',label:layer,x:li*620-20,y:-20,width:580,height:members.length*340+40});
    for(const [i,a] of members.entries()) canvasNodes.push({id:a.id,type:'file',file:byId.get('area:'+a.id).note,x:li*620,y:i*340,width:540,height:300});
  }
  const canvasEdges=areas.map(a=>({id:'home-'+a.id,fromNode:'home',fromSide:'bottom',toNode:a.id,toSide:'top',label:'领域',toEnd:'arrow'}));
  emit('obsidian-vault/Maps/总览.canvas',JSON.stringify({nodes:canvasNodes,edges:canvasEdges},null,2));
  const train=routes[0];
  emit('obsidian-vault/Maps/训练流程.canvas',JSON.stringify({nodes:train.steps.map((key,i)=>({id:key,type:'file',file:byId.get('concept:'+key).note,x:(i%4)*560,y:Math.floor(i/4)*420,width:500,height:320})),edges:train.steps.slice(1).map((key,i)=>({id:`step-${i}`,fromNode:train.steps[i],toNode:key,fromSide:i%4===3?'bottom':'right',toSide:i%4===3?'top':'left',label:'推荐阅读下一步',toEnd:'arrow'}))},null,2));

  let doc='<!-- Generated from data/knowledge-map.mjs and canonical content. -->\n\n# CS 与 AI 知识地图\n\n'+
    `将 ${book.chapters.length} 讲整理为 **${areas.length} 个领域、${core.length} 个概念词条组、100 道练习与 ${routes.length} 条专题路线**。概念关系经过编辑组织，目录归属与推荐学习次序单独标注。\n\n`+
    '[交互知识图](knowledge-map.html) · [Obsidian 笔记库首页](../obsidian-vault/00-知识地图.md) · [下载整套资料](https://github.com/DengZhiyuan-math/dictionary-of-computer-science-and-AI/releases/latest)\n\n'+
    '下载并解压后，用 Obsidian“打开文件夹为仓库”选择 `obsidian-vault`，从 `00-知识地图.md` 开始。笔记库内使用真实双链、别名与章节标题链接，不依赖社区插件；GitHub 阅读请用本页的普通 Markdown 链接。\n\n## 整体结构\n\n```mermaid\nflowchart TD\n  ROOT[CS 与 AI 知识地图]\n';
  const layersIds=['BASE','STAT','DEEP','ACT','PRACT'];
  for(const [i,l] of layers.entries()) {
    doc+=`  ROOT --> ${layersIds[i]}[${l}]\n`;
    for(const a of areas.filter(a=>a.layer===l)) doc+=`  ${layersIds[i]} --> ${a.id.replaceAll('-','_')}[${a.name}]\n`;
  }
  doc+='```\n\n## 领域入口与关键问题\n\n| 领域 | 核心问题 | 阅读原文 |\n| --- | --- | --- |\n';
  for(const a of areas) doc+=`| [${a.name}](#area-${a.id}) | ${a.question} | ${a.chapters.map(num=>`[${String(num).padStart(2,'0')}](${chapterSource(num)})`).join('、')} |\n`;
  doc+='\n## 怎样读关系\n\n| 关系 | 意义 |\n| --- | --- |\n| 先修 | 推荐先理解的概念，用于解释后续概念 |\n| 用于 | 一种结构或方法帮助实现另一任务 |\n| 关联 | 有共同机制或跨领域连接，需要阅读边上的解释 |\n| 对照 | 容易混淆而需要区分的目标、结构或机制 |\n| 章节解释／练习 | 概念的阅读依据或实践入口 |\n\n';
  doc+='## 四条专题地图\n\n';
  for(const r of routes) doc+=`### ${r.name}\n\n${r.summary}\n\n`+r.steps.map(key=>{const n=byId.get('concept:'+key);return`[${n.label}](${chapterSource(n.chapters[0])})`}).join(' → ')+'\n\n';
  doc+='## 领域中的概念与连接\n\n';
  for(const a of areas) {
    doc+=`<a id="area-${a.id}"></a>\n\n### ${a.name}\n\n${a.summary}\n\n${a.bridges}\n\n| 概念 | 核心含义 | 阅读依据 |\n| --- | --- | --- |\n`;
    for(const n of core.filter(n=>n.area===a.id)) doc+=`| ${n.label}（${n.en}） | ${n.description} | ${n.chapters.map(num=>`[第 ${String(num).padStart(2,'0')} 讲](${chapterSource(num)})`).join('、')} |\n`;
    doc+='\n';
    for(const e of typed.filter(e=>byId.get(e.from).area===a.id)) {
      const f=byId.get(e.from), t=byId.get(e.to);
      doc+=`- **${graph.metadata.semantics[e.type]}**：[${f.label}](${chapterSource(f.chapters[0])}) → [${t.label}](${chapterSource(t.chapters[0])})：${e.label}。\n`;
    }
    doc+='\n';
  }
  doc+='## 笔记库结构与维护\n\n`Areas` 是领域入口，`Concepts` 是概念，`Chapters` 保存原文，`Practice` 对应 100 道 Hot 100，`Routes` 保存专题路线，`Maps` 提供原生 Canvas。按目录或 `area/...` 标签筛选局部图，可以逐层检查关联。\n\n'+
    '地图由 `data/knowledge-map.mjs` 与原讲稿统一生成。新增或调整关系时请注明理由，重新执行构建和校验；不要只修改生成后的双链。原章节编号与内容保持稳定。\n\n'+
    '格式依据：[Obsidian 内部链接](https://help.obsidian.md/links)、[关系图谱](https://help.obsidian.md/plugins/graph)、[JSON Canvas 1.0](https://jsoncanvas.org/spec/1.0/)。\n';
  emit('docs/KNOWLEDGE_MAP.md',doc);
  emit('data/knowledge-graph.json',JSON.stringify(graph,null,2));
  return graph;
}
