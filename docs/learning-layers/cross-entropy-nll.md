# Cross-Entropy / NLL

概念编号：`concept:cross-entropy-nll` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cross-entropy-nll/)

## 第一层：概念入门 · 知其然

### 它是什么

Cross-entropy is not an alternative to BCE: BCE is cross-entropy for the binary case. In training code, CrossEntropyLoss commonly accepts raw scores for multiple classes and performs the appropriate normalization internally. A typical task has one correct class per sample. Next-token prediction uses the same kind of classification objective over the vocabulary. Negative log-likelihood, or NLL, penalizes a model for assigning low likelihood to observed data. Cross-entropy for discrete classification is closely related to NLL, but likelihood-based objectives are not limited to classification.

### 先看一个例子

Logits are [1000,1001,999], with the second class correct. Calculate probabilities and multiclass cross-entropy.
Stable computation uses an algebraically equivalent transformation rather than arbitrary logit clipping. Training code commonly uses a cross-entropy interface accepting raw scores.

### 理解练习

What if 500 is added to every logit?

<details><summary>答案与解释</summary>

Mathematically, nothing changes. A stable implementation still subtracts the maximum first to avoid unnecessarily large intermediate values.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Cross-entropy is not an alternative to BCE: BCE is cross-entropy for the binary case. In training code, CrossEntropyLoss commonly accepts raw scores for multiple classes and performs the appropriate normalization internally. A typical task has one correct class per sample. Next-token prediction uses the same kind of classification objective over the vocabulary. Negative log-likelihood, or NLL, penalizes a model for assigning low likelihood to observed data. Cross-entropy for discrete classification is closely related to NLL, but likelihood-based objectives are not limited to classification.


### 适用边界与常见误解

PyTorch CrossEntropyLoss expects raw scores, while NLLLoss expects log probabilities.

### 例题：Softmax: Shift Before Exponentiating

Logits are [1000,1001,999], with the second class correct. Calculate probabilities and multiclass cross-entropy.

1. Direct exponentiation can overflow. Subtract the maximum 1001 to obtain [-1,0,-2], without changing Softmax.
2. Exponentials are approximately [.367879,1,.135335]. Normalization gives probabilities [.244728,.665241,.090031].
3. Cross-entropy for the true class is -ln(.665241)≈.407606. Adding a constant to all logits preserves relative scores and these probabilities.

结果：Stable computation uses an algebraically equivalent transformation rather than arbitrary logit clipping. Training code commonly uses a cross-entropy interface accepting raw scores.

易错点：Do not apply Softmax before passing inputs to CrossEntropyLoss as logits. Do not mix an inference threshold into the loss formula.

变式：What if 500 is added to every logit?

参考答案：Mathematically, nothing changes. A stable implementation still subtracts the maximum first to avoid unnecessarily large intermediate values.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
