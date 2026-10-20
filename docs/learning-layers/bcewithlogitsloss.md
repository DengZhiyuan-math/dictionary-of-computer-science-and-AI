# BCEWithLogitsLoss

概念编号：`concept:bcewithlogitsloss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bcewithlogitsloss/)

## 第一层：概念入门 · 知其然

### 定义

BCEWithLogitsLoss 是把二元分类分数转换成概率、再计算二元交叉熵的一种数值稳定组合。输入是任意实数分数 z，称为 logit；对应的标签 1 概率为 1/(1+exp(−z))。组合实现直接从分数求损失，避免先把极端分数转换成浮点概率 0 或 1，再取对数导致溢出或无穷。它仍在优化同一概率损失，不是另一种分类任务。

### 概念边界与常见混淆

输入前不要再做一次 sigmoid，否则接口会把已经是概率的数再次当成分数，改变预测含义。预测时若需要概率，仍可以单独转换；训练输入与展示输出是两个步骤。

### 先看一个例子

分数 z=0 对应概率 0.5，无论真实标签是 0 还是 1，损失都是 ln(2)≈0.693。分数 z=100、标签 0 时，自信地预测错误，损失约 100；稳定组合能得到有限值，而直接算概率可能被舍入成 1，再对 1−p 取对数出错。

### 理解练习

#### 1. 输入类型

模型输出 0.8，已明确是概率，能不转换直接交给该接口并保持原含义吗？

<details><summary>答案与解释</summary>

不能。接口会把 0.8 当 logit，对应概率约 0.690。应使用原始分数，或选择接收概率的 BCE。

</details>

#### 2. 零分数

z=0 是否意味着模型认为事件概率为零？

<details><summary>答案与解释</summary>

不是，概率为 0.5。分数的零点表示两类等概率，而不是事件不可能。

</details>

#### 3. 稳定与正确

数值稳定接口能否修复错误标签或数据泄漏？

<details><summary>答案与解释</summary>

不能。它解决特定算术问题，不改变监督数据与评估过程是否正确；有限损失不证明实验可靠。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 把p=σ(z)代入BCE并整理，得L=max(z,0)−zy+ln(1+exp(−abs(z)))。
2. 该形式只对非正数取指数，避免先得到接近0或1的概率再取对数导致不稳定。

### 具体输入与计算步骤

分数z=0、标签y=1，预测概率为0.5。

1. z=0时L=0−0+ln2≈0.6931。
2. 其对z的梯度σ(z)−y=0.5−1=−0.5，梯度下降会提高z。

计算结果：其对z的梯度σ(z)−y=0.5−1=−0.5，梯度下降会提高z。

### 换到实际问题中应用

训练垃圾邮件二分类器，最后一层输出一个分数。

1. 把分数直接传给损失；标签转为同形浮点0/1张量。
2. 推理时才将分数转成概率并按验证集选定阈值。

应用结论：推理时才将分数转成概率并按验证集选定阈值。

### 举一反三：改变条件后的完整解答

若z=100、y=0，损失是否接近0？

<details><summary>变式的推演与答案</summary>

1. 稳定式为100+ln(1+exp(−100))。
2. 损失约100，说明极其自信地猜错；无需计算log(1−1)。

损失约100，说明极其自信地猜错；无需计算log(1−1)。

</details>

### 原有解释与进一步例题


### 原理与推演

BCELoss expects probabilities as input. BCEWithLogitsLoss accepts raw logits and combines sigmoid with BCE internally. This fused computation improves numerical stability by avoiding problems caused by first forming extreme probabilities. Do not apply sigmoid separately before BCEWithLogitsLoss. You need not memorize the API for an interview, but should understand that WithLogits means scores before the probability transformation.


### 适用边界与常见误解

Targets should be floating-point tensors with matching shape. Do not apply sigmoid to the input again.

### 例题：BCE: Same Classification Error, Different Loss

The true label is y=1 and the model assigns positive-class probability p. At a fixed threshold of 0.5, compare p=0.49 with p=0.01.

1. For y=1, BCE=-ln(p). p=0.49 gives about 0.71335; p=0.01 gives about 4.60517.
2. Both hard predictions are negative, but the latter assigns less probability to the true class and incurs about 6.46 times the loss.
3. For y=0, loss becomes -ln(1-p). The same probability 0.01 is now a correct, confident prediction.

结果：Loss scores probability predictions, not the number of 0/1 errors. The demo restricts probabilities to (0,1); logarithmic divergence at the endpoints is separate.

易错点：BCEWithLogitsLoss accepts raw logits: do not apply Sigmoid first. The demo displays probability and its corresponding logit, and computes the equivalent single-sample BCE.

变式：At p=0.5, do both labels give the same loss?

参考答案：Yes: both give ln(2)≈0.69315.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html)

[返回分层目录](00-learning-index.md)
