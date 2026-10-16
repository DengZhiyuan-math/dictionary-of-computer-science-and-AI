// One-time, idempotent editorial migration from the supplied v2 book data.
import fs from 'node:fs';
const file = new URL('../data/book.json', import.meta.url);
const book = JSON.parse(fs.readFileSync(file, 'utf8'));
const add = (num, title, ...paragraphs) => {
  const c = book.chapters[num - 1];
  if (c.blocks.some(b => b.text === title)) return;
  c.blocks.push({kind: 'heading', text: title}, ...paragraphs.map(text => ({kind: 'text', text})));
};
add(41, 'BCE 数值例题：同样判错，损失为什么不同【重点】',
  '沿用垃圾邮件例子，真实标签为一。使用自然对数时，单个样本的 BCE 就是预测正类概率的负对数。概率为零点四九，损失约为零点七一三；概率为零点零一，损失约为四点六零五。两者在百分之五十阈值下都判错，但后者损失约为前者的六点五倍。这个倍数来自损失数值，不代表业务损失必然也是六点五倍。',
  '真实标签为零时，评分的是负类概率，也就是一减去预测正类概率。概率恰为零或一时，直接取对数可能遇到数值问题；实际训练优先采用接收 logits 的稳定实现。BCE 也允许零到一之间的软目标，不能把接口要求简化成标签只能是整数。');
add(41, '输入契约：先看任务，再对齐 Shape 与 Dtype【重点精学】',
  '以普通批量分类为例，单 logit 二分类的输出可以是批量大小乘一，目标也应采用相同形状的浮点张量；逐标签多标签任务则常是批量大小乘标签数，两者都可使用 BCEWithLogitsLoss。不要把形状为批量大小的目标，无意广播成批量大小乘一。',
  '互斥多分类使用类别编号目标时，CrossEntropyLoss 通常接收批量大小乘类别数的原始分数，目标是形状为批量大小的长整型类别编号。它也支持与输出同形状的浮点类别分布目标，但需要满足有效分布要求。二分类同样能建模成两个互斥 logits 配合交叉熵；一个 logit 配合 BCE 只是另一种常用参数化。接口形状还会随分割等任务增加空间维度，不能把这里的普通分类示例当成唯一合法形式。');
add(43, '学习率数值例题：SGD 的一步更新【重点】',
  '暂时只看没有动量、没有权重衰减的 SGD。假设某个参数为二，当前梯度为零点四，学习率为零点一。这一步把参数减去零点一乘零点四，得到一点九六。如果学习率改成零点零一，同样梯度下得到一点九九六。梯度为负时，减去负值会让参数增大。这里是在展示更新规则，不是在说所有权重都应越来越小。',
  'Adam 等优化器会加入历史统计，因此不能把这个数值计算原样套到所有优化器上。调度日志也要标明记录的是当前更新使用的学习率，还是调度后下一步将使用的值，避免把图表平移一格后误判设置。');
add(44, '梯度累积的尾批：十个小批为什么更新三次【重点精学】',
  '假设一轮恰有十个等大小的小批，每四个小批累积后更新一次，并决定保留尾部数据。那么前四批更新一次，中间四批再更新一次，最后两批仍应更新一次，总计三次。若代码只在批次编号能被四整除时更新，又在下一轮开始清空梯度，最后两批就白算了。也可以有意丢弃或跨轮累积，但必须明确记录这个选择。',
  '若希望每组更新使用该组样本的平均损失，前两组各按四个等大小小批平均，尾组应按两个平均。全程机械地除以四，会让尾组梯度变小。小批大小不等时，还应按实际样本数加权；语言模型中有效 token 数不等时，常应按有效 token 数处理。只有各设备和小批等大小、损失归一化一致时，才可以直接用小批大小乘累积次数乘数据并行设备数，估算有效批量。');
add(47, '混合精度与裁剪：先还原梯度尺度【重点】',
  '使用梯度缩放时，反向传播得到的梯度也被放大。如果要按真实梯度范数裁剪，应该在一次累积结束后，先还原梯度尺度，再裁剪，然后执行缩放器管理的优化器更新。一个更新组内不要混入不同的缩放尺度，也不要每处理一个小批就提前还原；否则累计的量不再具有统一含义。',
  '混合精度检测到非有限梯度时，缩放器可能跳过实际参数更新。按参数更新次数管理的学习率调度和日志，应与实际更新保持一致，不能只数循环执行了几次。具体调用顺序应以使用的框架与训练封装为准。');
add(38, '混淆矩阵例题：Precision、Recall、F1 各在数什么【重点】',
  '假设一千封邮件中有一百封垃圾邮件。模型报出八十封，其中六十封确实是垃圾邮件。于是，真阳性为六十，假阳性为二十，假阴性为四十，真阴性为八百八十。精确率为六十除以八十，也就是百分之七十五；召回率为六十除以一百，也就是百分之六十；F1 约为百分之六十六点七；准确率为百分之九十四。',
  '同一数据上，把所有邮件都判为正常，也能得到百分之九十的准确率，却一封垃圾邮件都找不回来。这个例子说明指标选择要对应任务。阈值需要在验证数据上结合误报、漏报成本选择；不能在测试集上挑出最好的阈值，再把同一分数称为独立测试效果。');
// These references cover the new mixed precision and update-order explanations.
if (!book.sources.some(s => s.url.endsWith('/notes/amp_examples.html'))) {
  book.sources.push({id: Math.max(...book.sources.map(s => s.id)) + 1, title: 'PyTorch — Automatic Mixed Precision examples', url: 'https://docs.pytorch.org/docs/stable/notes/amp_examples.html'});
}
const ampId = book.sources.find(s => s.url.endsWith('/notes/amp_examples.html')).id;
for (const num of [44, 47]) if (!book.chapters[num-1].source_ids.includes(ampId)) book.chapters[num-1].source_ids.push(ampId);
book.metadata = {
  title: 'dictionary of computer science and AI',
  version: '2.1.0', date: '2026-10-16', language: 'zh-CN',
  originalVersion: 'v2 · 2026-10-14',
  baseline: {chapters: 80, newChapters: 52, detailedSubsections: 343, quizQuestions: 90},
  description: '中英术语解释、80 讲通识讲稿、训练数值例题与口述练习。'
};
// Give the original 50 inline questions the same section/pause structure as the 40 additions.
for (const c of book.chapters.filter(c => c.quiz)) {
  c.blocks = c.blocks.flatMap(b => {
    if (b.kind !== 'text' || !/^问题/.test(b.text) || !b.text.includes('参考回答：')) return [b];
    const cut = b.text.indexOf('参考回答：');
    return [{kind: 'heading', text: b.text.slice(0, cut).trim()}, {kind: 'text', text: '【答题停顿】' + b.text.slice(cut)}];
  });
}
// Derived navigation and counts are regenerated, never edited separately.
delete book.stats;
for (const c of book.chapters) { delete c.toc; delete c.textchars; }
fs.writeFileSync(file, JSON.stringify(book, null, 2) + '\n');
console.log('Editorial additions applied.');
