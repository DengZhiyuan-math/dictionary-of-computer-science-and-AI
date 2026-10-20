# Logit

概念编号：`concept:logit` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/logit/)

## 第一层：概念入门 · 知其然

### 它是什么

In neural classification, a logit usually means an unnormalized real-valued output score before conversion to probabilities. In binary statistical terminology, the logit of a probability is its log odds.

### 先看一个例子

Probability p=0.8 has odds 4 and log odds about 1.386. A raw score z=2 is valid even though probability 2 would be invalid. Calibration still needs checking after score conversion.

### 理解练习

用自己的话解释：上面的情景为什么是“Logit”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：In neural classification, a logit usually means an unnormalized real-valued output score before conversion to probabilities. In binary statistical terminology, the logit of a probability is its log odds.

情景依据：Probability p=0.8 has odds 4 and log odds about 1.386. A raw score z=2 is valid even though probability 2 would be invalid. Calibration still needs checking after score conversion.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For 0<p<1, z=log(p/(1-p)); its inverse is p=1/(1+exp(-z)). A multiclass model has one raw score per class, usually followed by a joint normalization. Raw scores are not probabilities.


### 适用边界与常见误解

Scores may be negative or exceed one; they are not probabilities.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
