# Causality

概念编号：`concept:causality` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/causality/)

## 第一层：概念入门 · 知其然

### 它是什么

Causality asks how an outcome would change under an intervention, rather than only how observed variables co-vary. A confounder influences both the treatment and the outcome and can create a misleading association.

### 先看一个例子

People carrying umbrellas are more often wet. Rain influences both umbrella use and wetness, so the association does not show that umbrellas cause wetness. Randomly assigning an intervention addresses a different question from fitting a predictor to observational correlations.

### 理解练习

用自己的话解释：上面的情景为什么是“Causality”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Causality asks how an outcome would change under an intervention, rather than only how observed variables co-vary. A confounder influences both the treatment and the outcome and can create a misleading association.

情景依据：People carrying umbrellas are more often wet. Rain influences both umbrella use and wetness, so the association does not show that umbrellas cause wetness. Randomly assigning an intervention addresses a different question from fitting a predictor to observational correlations.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

Using potential outcomes, the average treatment effect is E[Y(1)-Y(0)]. Y(1) is the outcome under treatment and Y(0) under control. For one individual only one is observed, so identification needs a design or assumptions such as valid random assignment.


### 适用边界与常见误解

Feature importance and quality of fit alone do not prove causality.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
