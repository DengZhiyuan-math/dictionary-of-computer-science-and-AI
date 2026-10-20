# Causality

概念编号：`concept:causality` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/causality/)

## 第一层：概念入门 · 知其然

### 定义

因果推断研究：若主动改变某个因素，结果会怎样改变。它把观察到的共同变化，与干预造成的变化区分开。例如，治疗效果比较的是接受与不接受治疗两种情形下的结果，而同一个人在同一时刻通常只能经历其中一种，因此必须借助研究设计或明确假设进行比较。

### 概念边界与常见混淆

调整观察到的混杂因素需要适当的测量和模型，也不能自动排除未观察混杂。先发生、预测准确、样本量大，都不能各自代替因果识别所需的假设。

### 先看一个例子

一家医院中接受治疗的人死亡率更高，不能立即断言治疗有害：病情更重的人可能更容易接受治疗，而病情本身也提高死亡率。病情是同时影响治疗选择与结果的混杂因素。随机分配治疗的目的是让分组不由这些病情因素决定；它在重复研究意义上平衡因素，不保证每次小样本都完全相同。

### 理解练习

#### 1. 关联与干预

雨天雨伞销量与交通事故都增加，减少卖伞是否会减少事故？

<details><summary>答案与解释</summary>

不能从这个关联推出。降雨可能同时影响两者；减少卖伞是改变一个因素，其效果需要另行识别，而不是沿关联直接推断。

</details>

#### 2. 混杂来源

医院例子中，只比较治疗组和未治疗组的总死亡率缺少什么？

<details><summary>答案与解释</summary>

缺少对治疗选择机制和基线病情可比性的说明。总差异混合了病情差异与治疗效果，不能直接解释成治疗的作用。

</details>

#### 3. 随机分配的边界

一次随机试验中两组平均年龄有差异，是否证明没有随机分配？

<details><summary>答案与解释</summary>

不证明。有限样本有随机波动；应核查分配过程和预先设定的分析，不能要求每项基线统计量逐次完全相等。

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
