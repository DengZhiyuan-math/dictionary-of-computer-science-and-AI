import {read} from './model.mjs';
import {examples} from '../data/examples.mjs';
import {demos} from '../data/demo-engines.mjs';

export function exampleMarkdown(x,prefix=''){
 return `### ${String(x.number).padStart(2,'0')} · ${x.title}\n\n**场景与输入：** ${x.scenario}\n\n`+
 x.steps.map((s,i)=>`${i+1}. ${s}`).join('\n')+`\n\n**结果：** ${x.result}\n\n**易错点与边界：** ${x.pitfall}\n\n`+
 `**改变条件再想一想：** ${x.question}\n\n<details>\n<summary>查看参考答案</summary>\n\n${x.answer}\n\n</details>\n\n`+
 (x.demo?`[打开交互演示](${prefix}visual-demos.html#${x.demo}) · `:'')+x.chapters.map(n=>`[第 ${n} 讲](${prefix}../chapters/${String(n).padStart(2,'0')}.md)`).join(' · ')+'\n';
}
export function buildExamples(emit){
 const data=JSON.stringify(examples).replace(/</g,'\\u003c');
 const engine=read('data/demo-engines.mjs').replace(/^export /gm,'');
 let html=read('src/demos.html').replaceAll('__EXAMPLE_COUNT__',String(examples.length)).replaceAll('__DEMO_COUNT__',String(demos.length)).replace('__EXAMPLE_DATA__',()=>data).replace('__DEMO_ENGINES__',()=>engine).replace('__DEMO_ANCHORS__',()=>demos.map(d=>`<span id="${d.id}" class="anchor"></span>`).join(''));
 emit('docs/visual-demos.html',html);
 // A vault-only download must also work offline. Resolve navigation outside the vault to GitHub.
 const base='https://github.com/DengZhiyuan-math/dictionary-of-computer-science-and-AI/blob/main/';
 html=html.replaceAll('href="EXAMPLES.md"',`href="${base}docs/EXAMPLES.md"`).replaceAll('href="KNOWLEDGE_MAP.md"','href="../00-知识地图.md"').replaceAll('href="../cs_ai_v2_audiobook.html"',`href="${base}cs_ai_v2_audiobook.html"`).replace('href:`../chapters/${String(num).padStart(2,\'0\')}.md`',`href:\`${base}chapters/\${String(num).padStart(2,'0')}.md\``).replaceAll('EXAMPLES.md#example-',base+'docs/EXAMPLES.md#example-');
 emit('obsidian-vault/Demos/交互演示.html',html);
 let doc='<!-- Generated from data/examples.mjs. -->\n\n# 例子与可视化演示\n\n'+
 `${examples.length} 个完整案例，其中 ${demos.length} 个配套交互演示。按“场景 → 手算 → 结果 → 易错点 → 改变条件”阅读；计算采用刻意缩小的输入，便于核对每一步。\n\n`+
 '[打开演示文件](visual-demos.html)（下载后在浏览器打开，无外部依赖） · [知识地图](KNOWLEDGE_MAP.md) · [完整索引](../cs_ai_v2_index.md)\n\n'+
 '算法演示可以逐步查看状态；数值演示可调整概率、学习率、阈值、温度或扰动。手算过程同步进入对应章节、TXT、听书播放器和 Obsidian。原 97 讲编号稳定。\n\n'+
 '| 案例 | 阅读 | 交互 |\n| --- | --- | --- |\n'+examples.map(x=>`| ${String(x.number).padStart(2,'0')} | [${x.title}](#example-${x.id}) | ${x.demo?`[演示](visual-demos.html#${x.demo})`:'手算与自测'} |`).join('\n')+'\n\n';
 for(const x of examples)doc+=`<a id="example-${x.id}"></a>\n\n`+exampleMarkdown(x)+'\n---\n\n';
 doc+='## 公式与接口的参考依据\n\n'+
 '- BCE 与输入形状：[PyTorch BCEWithLogitsLoss](https://docs.pytorch.org/docs/2.14/generated/torch.nn.BCEWithLogitsLoss.html)。\n'+
 '- 不翻核的二维互相关：[PyTorch Conv2d](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Conv2d.html)。\n'+
 '- 缩放、掩码与 Softmax：[PyTorch scaled dot product attention](https://docs.pytorch.org/docs/2.14/generated/torch.nn.functional.scaled_dot_product_attention.html)。\n'+
 '- Lloyd 交替更新与局部最优：[scikit-learn KMeans](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html)。\n'+
 '- 排名融合：[Cormack、Clarke、Buettcher：Reciprocal Rank Fusion](https://plg.uwaterloo.ca/~gvcormac/cormacksigir09-rrf.pdf)。\n'+
 '- 时序差分与价值更新：[Sutton 与 Barto：Reinforcement Learning](http://incompleteideas.net/book/the-book-2nd.html)。\n\n'+
 '核对日期：2026-10-16。案例与演示为本仓库原创简化计算，未调用这些库运行训练。单个例子不能代替对所有输入的正确性论证。\n';
 emit('docs/EXAMPLES.md',doc);
}
