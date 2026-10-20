# Loss / Objective / Metric

概念编号：`concept:loss-objective-metric` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/loss-objective-metric/)

## 第一层：概念入门 · 知其然

### 它是什么

损失给训练提供信号，目标可再加约束与正则，指标用于解释任务表现。

### 先看一个例子

数据损失0.4，正则项0.1，正确8例共10例。

### 理解练习

训练目标0.5意味着准确率50%吗？

<details><summary>答案与解释</summary>

不意味着，两者含义和单位不同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 优化目标J=L数据+λR可能包含业务指标没有计算的参数惩罚。
2. 准确率用离散决策计数，不反映同一正确预测的概率置信度。

### 具体输入与计算步骤

数据损失0.4，正则项0.1，正确8例共10例。

1. 目标0.4+0.1=0.5。
2. 准确率8/10=0.8，不能从0.5反推得到。

计算结果：准确率8/10=0.8，不能从0.5反推得到。

### 换到实际问题中应用

比较两个分类模型。

1. 同时报告数据损失、正则后目标及选定指标，明确降低或升高方向。
2. 按独立验证的业务指标选模型，再检查概率质量和成本。

应用结论：按独立验证的业务指标选模型，再检查概率质量和成本。

### 举一反三：改变条件后的完整解答

若只把正则系数加倍、预测不变，准确率变吗？

<details><summary>变式的推演与答案</summary>

1. 目标会从0.5变为0.4+0.2=0.6。
2. 准确率仍8/10=0.8，说明目标数值变化不一定意味着预测变差。

准确率仍8/10=0.8，说明目标数值变化不一定意味着预测变差。

</details>

### 原有解释与进一步例题


### 原理与推演

A loss scores model errors and is what training aims to improve. An objective function may also include requirements such as regularization. An evaluation metric indicates whether performance meets the task’s needs. The training objective and reported metric can differ: for example, train a purchase-probability predictor with BCE but assess precision or actual conversion outcomes after deployment. An optimizable loss gives training a direction, without guaranteeing complete alignment with the final business objective.


### 适用边界与常见误解

Reducing the training objective does not guarantee better business metrics.

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/model_evaluation.html)

[返回分层目录](00-learning-index.md)
