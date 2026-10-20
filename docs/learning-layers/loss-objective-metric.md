# Loss / Objective / Metric

概念编号：`concept:loss-objective-metric` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/loss-objective-metric/)

## 第一层：概念入门 · 知其然

### 定义

损失函数量化预测与训练目标的差异，为参数学习提供信号；优化目标是实际被最小化或最大化的表达式，可以包含平均损失、正则项和约束；评价指标则回答业务或研究关心的表现问题，不一定可求导。三者可以一致，也可以不同，但关系应明确，不能把训练代理改善直接当作任务成功。

### 概念边界与常见混淆

报告“loss 下降”必须说明数据集、归约和是否含惩罚。用测试指标反复选择目标会让测试集变成调参依据。

### 先看一个例子

邮件分类用交叉熵训练，目标再加权重平方惩罚；上线关心每千封邮件误拦多少及垃圾邮件找回率。降低交叉熵可能改善概率，却不保证固定阈值下误拦数下降；增加惩罚也可能降低总目标但提高数据损失。

### 理解练习

#### 1. 目标组成

数据损失升高、惩罚下降更多，总目标能下降吗？

<details><summary>答案与解释</summary>

可以，两项总和决定结果；必须分别报告才能解释代价。

</details>

#### 2. 代理

准确率不方便求导，能否用交叉熵训练再报准确率？

<details><summary>答案与解释</summary>

可以，但需验证代理与实际目标是否一致，不能把两者数值混用。

</details>

#### 3. 口径

两个模型loss分别1和2，未说明求和或平均，能否比较？

<details><summary>答案与解释</summary>

不能直接比较，样本数和归约可造成尺度差异，应先统一口径。

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
