# BCEWithLogitsLoss

概念编号：`concept:bcewithlogitsloss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bcewithlogitsloss/)

## 第一层：概念入门 · 知其然

### 它是什么

BCELoss expects probabilities as input. BCEWithLogitsLoss accepts raw logits and combines sigmoid with BCE internally. This fused computation improves numerical stability by avoiding problems caused by first forming extreme probabilities. Do not apply sigmoid separately before BCEWithLogitsLoss. You need not memorize the API for an interview, but should understand that WithLogits means scores before the probability transformation.

### 先看一个例子

The true label is y=1 and the model assigns positive-class probability p. At a fixed threshold of 0.5, compare p=0.49 with p=0.01.
Loss scores probability predictions, not the number of 0/1 errors. The demo restricts probabilities to (0,1); logarithmic divergence at the endpoints is separate.

### 理解练习

At p=0.5, do both labels give the same loss?

<details><summary>答案与解释</summary>

Yes: both give ln(2)≈0.69315.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
