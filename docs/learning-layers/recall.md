# Recall

概念编号：`concept:recall` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/recall/)

## 第一层：概念入门 · 知其然

### 它是什么

Recall is the fraction of actual positive cases identified by a classifier. It measures coverage of positives at a specified decision threshold.

### 先看一个例子

If a dataset contains 20 true cases and the detector finds 8, recall is 40%. The number of false alarms can change precision without changing this recall value.

### 理解练习

用自己的话解释：上面的情景为什么是“Recall”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Recall is the fraction of actual positive cases identified by a classifier. It measures coverage of positives at a specified decision threshold.

情景依据：If a dataset contains 20 true cases and the detector finds 8, recall is 40%. The number of false alarms can change precision without changing this recall value.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

Recall=TP/(TP+FN), where FN counts positive examples missed by the classifier. If there are no actual positives, this ratio is undefined without an explicit reporting convention.


### 适用边界与常见误解

Improving recall does not mean false positives are necessarily acceptable.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
