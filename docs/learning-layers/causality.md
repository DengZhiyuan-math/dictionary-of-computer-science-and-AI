# Causality

概念编号：`concept:causality` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/causality/)

## 第一层：概念入门 · 知其然

### 它是什么

因果推断问主动改变某个因素会怎样影响结果，区别于只观察二者一起变化。

### 先看一个例子

冰淇淋销量与溺水一起上升，气温可能同时影响二者。

### 理解练习

冰淇淋和溺水同增说明冰淇淋导致溺水吗？

<details><summary>答案与解释</summary>

不说明；气温可能同时影响两者，是混杂因素。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 定义处理A和潜在结果Y(1)、Y(0)，平均效应为E[Y(1)−Y(0)]。
2. 随机分配或可信识别假设才可用观测组差估计，混杂会破坏直接比较。

### 具体输入与计算步骤

随机教学实验，两组各10人，处理组均分80，对照75。

1. 均值差80−75=5。
2. 在随机化、无干扰等假设下这是平均效应的估计。

计算结果：5是有抽样误差的估计，不是每人必增5。

### 换到实际问题中应用

评估网页新按钮。

1. 随机分流用户，预先定义转化和实验期。
2. 比较组均值与不确定性，检查串组和流失。

应用结论：给出可识别的干预效果而非仅历史相关。

### 举一反三：改变条件后的完整解答

如果主动报名者都进处理组呢？

<details><summary>变式的推演与答案</summary>

1. 主动性可能同时提高成绩，形成混杂。
2. 80−75仍可算，但不能直接归因处理。

需随机化或更强的识别设计。

</details>

### 原有解释与进一步例题


### Definition

Causality asks how an outcome would change under an intervention, rather than only how observed variables co-vary. A confounder influences both the treatment and the outcome and can create a misleading association.


### Parameters and mechanism

Using potential outcomes, the average treatment effect is E[Y(1)-Y(0)]. Y(1) is the outcome under treatment and Y(0) under control. For one individual only one is observed, so identification needs a design or assumptions such as valid random assignment.


### Example

People carrying umbrellas are more often wet. Rain influences both umbrella use and wetness, so the association does not show that umbrellas cause wetness. Randomly assigning an intervention addresses a different question from fitting a predictor to observational correlations.


### 适用边界与常见误解

Feature importance and quality of fit alone do not prove causality.

### 推导与方法参考

- [一手资料](https://miguelhernan.org/whatifbook)

[返回分层目录](00-learning-index.md)
