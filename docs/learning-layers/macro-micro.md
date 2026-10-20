# Macro / Micro

概念编号：`concept:macro-micro` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/macro-micro/)

## 第一层：概念入门 · 知其然

### 它是什么

宏平均先逐类计算再等权平均；微平均先合并各类计数再计算。

### 先看一个例子

两类召回率分别9/10与1/2。

### 理解练习

宏平均会按大类样本多而额外加权吗？

<details><summary>答案与解释</summary>

不会，每类权重相同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 宏召回=(R₁+R₂)/2，保留小类影响力。
2. 微召回=(ΣTP)/(ΣTP+ΣFN)，样本多的类贡献更多计数。

### 具体输入与计算步骤

两类召回率分别9/10与1/2。

1. 宏召回=(0.9+0.5)/2=0.7。
2. 微召回=(9+1)/(10+2)=10/12≈0.8333。

计算结果：微召回=(9+1)/(10+2)=10/12≈0.8333。

### 换到实际问题中应用

评估类别不均衡的文档识别。

1. 同时报告每类样本数和逐类分数，再提供宏与微平均。
2. 少数类重要时优先检查宏与逐类失败，不能被总体高分掩盖。

应用结论：少数类重要时优先检查宏与逐类失败，不能被总体高分掩盖。

### 举一反三：改变条件后的完整解答

若两类各有10例，召回仍0.9、0.5，微平均多少？

<details><summary>变式的推演与答案</summary>

1. 总TP=9+5=14，总正例20。
2. 微召回14/20=0.7，与宏平均相同；原差异来自支持数不等。

微召回14/20=0.7，与宏平均相同；原差异来自支持数不等。

</details>

### 原有解释与进一步例题


### 原理与推演

For multiclass or multilabel tasks, metrics can be calculated separately for each class and then averaged. Macro averaging gives every class equal weight, making problems in small classes easier to see. Weighted averaging uses weights such as class sample counts, so large classes can dominate. Micro averaging pools the counts first, then calculates the metric, emphasizing overall sample-level performance. All three scores may be called F1 but differ, so comparisons must specify the averaging method.


### 例子

例子：两类 F1 分别为 0.9、0.5，macro F1 为 0.7。若汇总计数 TP=8、FP=2、FN=4，则 micro F1=2TP/(2TP+FP+FN)=16/22≈0.7273。宏平均先算各类指标，微平均先汇总计数，不能只改变显示名称。


### 适用边界与常见误解

Class-frequency-weighted averaging is a separate convention affected by class sample counts.

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/model_evaluation.html)

[返回分层目录](00-learning-index.md)
