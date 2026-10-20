# BCEWithLogitsLoss

概念编号：`concept:bcewithlogitsloss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bcewithlogitsloss/)

## 第一层：概念入门 · 知其然

### 它是什么

BCEWithLogitsLoss直接接收未压成概率的分数，并把概率转换与二元交叉熵稳定地合算。

### 先看一个例子

分数z=0、标签y=1，预测概率为0.5。

### 理解练习

传入前还要做一次sigmoid吗？

<details><summary>答案与解释</summary>

不需要，否则会把概率误当作原始分数再次变换。

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
