# Precision

概念编号：`concept:precision` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/precision/)

## 第一层：概念入门 · 知其然

### 它是什么

Precision is the fraction of predicted positives that are actually positive. It answers whether positive predictions are trustworthy at a specified decision threshold.

### 先看一个例子

A detector raises 10 alarms and 8 are true cases: precision is 80%. This does not tell how many true cases it missed; recall addresses that separate denominator.

### 理解练习

用自己的话解释：上面的情景为什么是“Precision”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Precision is the fraction of predicted positives that are actually positive. It answers whether positive predictions are trustworthy at a specified decision threshold.

情景依据：A detector raises 10 alarms and 8 are true cases: precision is 80%. This does not tell how many true cases it missed; recall addresses that separate denominator.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

Precision=TP/(TP+FP), where TP counts correctly predicted positives and FP counts negative examples predicted positive. If no positive predictions exist, the denominator is zero and the evaluation convention must be stated.


### 适用边界与常见误解

The denominator counts predicted positives, not actual positives. Precision is undefined when no examples are predicted positive unless a reporting convention is specified.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
