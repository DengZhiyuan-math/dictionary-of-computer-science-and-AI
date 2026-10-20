# Macro / Micro

概念编号：`concept:macro-micro` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/macro-micro/)

## 第一层：概念入门 · 知其然

### 它是什么

For multiclass or multilabel tasks, metrics can be calculated separately for each class and then averaged. Macro averaging gives every class equal weight, making problems in small classes easier to see. Weighted averaging uses weights such as class sample counts, so large classes can dominate. Micro averaging pools the counts first, then calculates the metric, emphasizing overall sample-level performance. All three scores may be called F1 but differ, so comparisons must specify the averaging method.

### 先看一个例子

例子：两类 F1 分别为 0.9、0.5，macro F1 为 0.7。若汇总计数 TP=8、FP=2、FN=4，则 micro F1=2TP/(2TP+FP+FN)=16/22≈0.7273。宏平均先算各类指标，微平均先汇总计数，不能只改变显示名称。

### 理解练习

用自己的话解释：上面的情景为什么是“Macro / Micro”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：For multiclass or multilabel tasks, metrics can be calculated separately for each class and then averaged. Macro averaging gives every class equal weight, making problems in small classes easier to see. Weighted averaging uses weights such as class sample counts, so large classes can dominate. Micro averaging pools the counts first, then calculates the metric, emphasizing overall sample-level performance. All three scores may be called F1 but differ, so comparisons must specify the averaging method.

情景依据：例子：两类 F1 分别为 0.9、0.5，macro F1 为 0.7。若汇总计数 TP=8、FP=2、FN=4，则 micro F1=2TP/(2TP+FP+FN)=16/22≈0.7273。宏平均先算各类指标，微平均先汇总计数，不能只改变显示名称。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

For multiclass or multilabel tasks, metrics can be calculated separately for each class and then averaged. Macro averaging gives every class equal weight, making problems in small classes easier to see. Weighted averaging uses weights such as class sample counts, so large classes can dominate. Micro averaging pools the counts first, then calculates the metric, emphasizing overall sample-level performance. All three scores may be called F1 but differ, so comparisons must specify the averaging method.


### 例子

例子：两类 F1 分别为 0.9、0.5，macro F1 为 0.7。若汇总计数 TP=8、FP=2、FN=4，则 micro F1=2TP/(2TP+FP+FN)=16/22≈0.7273。宏平均先算各类指标，微平均先汇总计数，不能只改变显示名称。


### 适用边界与常见误解

Class-frequency-weighted averaging is a separate convention affected by class sample counts.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
