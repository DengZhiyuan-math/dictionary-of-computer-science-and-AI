# BCE — Binary Cross-Entropy

概念编号：`concept:bce` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bce/)

## 第一层：概念入门 · 知其然

### 它是什么

BCE is commonly used for binary classification and for each label in multilabel learning. It compares predicted probabilities with target labels, rather than merely counting correct class decisions. Think of it as scoring probability predictions: the less probability assigned to the true answer, the greater the penalty.

### 先看一个例子

Consider an email that is actually spam. Model A assigns a 49% probability of spam; model B assigns only 1%. With a 50% classification threshold, both are wrong, so accuracy cannot distinguish these errors. But model B almost rules out the true answer and is more confidently wrong, so BCE penalizes it more. Probability prediction quality and the final hard classification are different things.

### 理解练习

用自己的话解释：上面的情景为什么是“BCE — Binary Cross-Entropy”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：BCE is commonly used for binary classification and for each label in multilabel learning. It compares predicted probabilities with target labels, rather than merely counting correct class decisions. Think of it as scoring probability predictions: the less probability assigned to the true answer, the greater the penalty.

情景依据：Consider an email that is actually spam. Model A assigns a 49% probability of spam; model B assigns only 1%. With a 50% classification threshold, both are wrong, so accuracy cannot distinguish these errors. But model B almost rules out the true answer and is more confidently wrong, so BCE penalizes it more. Probability prediction quality and the final hard classification are different things.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

In multilabel image recognition, the model can separately predict whether an image contains a cat, a dog or a car, then combine the BCE losses for those labels. Separate loss terms do not imply that the labels are independent in the real world; a shared network can still use their correlations. If exactly one of cat, dog or bird must be chosen, model the classes as mutually exclusive instead.


### 适用边界与常见误解

Used for binary classification and per-label multilabel tasks; it measures more than thresholded correctness.

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
