# Time Series

概念编号：`concept:time-series` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/time-series/)

## 第一层：概念入门 · 知其然

### 定义

时间序列是把观测与其发生时间对应起来、并保留时间次序的数据。时间间隔可以固定，也可以不规则。分析时不仅关注数值分布，还关注过去与未来的联系、随时间的变化和可用信息的时点。预测是其中一种任务：在指定时刻，只用当时已知信息，估计之后指定范围的结果。

### 概念边界与常见混淆

相同数值换一个顺序可能代表完全不同的过程。先后关系也不自动证明因果关系。模型若假定固定日间隔，遇到缺失日期不能把相邻记录直接当成相邻自然日。

### 先看一个例子

商店周一至周三的销量是 10、12、11 件。若周三关店后预测周四，用“最近两日均值”这个示意规则得到 (12+11)/2=11.5 件；这可以作为期望销量，不要求预测值本身是整数。预测周三时则不能使用周三最终销量 11，因为它当时尚未完整出现。

### 理解练习

#### 1. 信息时点

周二关店后用周三销量来预测周三，为什么不是正常预测？

<details><summary>答案与解释</summary>

输入包含预测时刻尚未出现的结果。即使预测误差很小，也不能代表真实使用时的能力；必须按实际可用时间截断信息。

</details>

#### 2. 缺失日期

记录只有周一 10 件和周三 11 件，能把两条记录的差 1 称为日增长量吗？

<details><summary>答案与解释</summary>

不能直接这样说。它跨越两天，且周二销量未知；即使平均分摊为每天 0.5，也是假定变化均匀的摘要，不是观察到的每日变化。

</details>

#### 3. 验证顺序

随机打乱日期后分训练和测试，是否总能检验未来预测？

<details><summary>答案与解释</summary>

不能。训练可能包含测试日期之后的信息，而未来部署没有这种信息。应让验证过程复现先训练、后预测的时间关系，并处理信息公布延迟。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 用过去窗口构造预测，如移动平均。
2. 评估时训练早于测试，标准化等参数也只由过去估计。

### 具体输入与计算步骤

三天销量10、14、12，用最近两天均值预测第4天。

1. 窗口取第2、3天，而非全部三天。
2. 预测=(14+12)/2=13。

计算结果：若真实第4天16，预测误差为16−13=3。

### 换到实际问题中应用

预测店铺库存需求。

1. 用滚动验证比较均值、季节性基线与复杂模型。
2. 按实际补货提前期评估误差并保留缺货成本。

应用结论：模型优劣依预测期限和业务损失判断。

### 举一反三：改变条件后的完整解答

第4天观测到16后预测第5天呢？

<details><summary>变式的推演与答案</summary>

1. 最新两日为12和16。
2. 均值14。

窗口随时间移动，只在新数据可见后更新。

</details>

### 原有解释与进一步例题


### Definition

A time series is a sequence indexed by time. Its order and spacing matter because adjacent observations can be dependent. Forecasting uses information available up to a cutoff to predict later values.


### Parameters and mechanism

A simple autoregressive baseline is y_hat(t+1)=c+φy(t), where c is an intercept and φ controls dependence on the previous value. Lag means a backward offset. Evaluation must respect when inputs and target outcomes become available.


### Example

For c=2, φ=0.8 and the latest observation 10, the next prediction is 10. Splitting early dates for training and later dates for evaluation preserves the forecasting direction; random row shuffling can mix overlapping past and future windows.


### 适用边界与常见误解

Validation must respect time order; future information cannot enter past predictions.

### 领域应用

- [ARIMA · 金融序列的差分与多步预测](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-arima.md)：从一般时间序列扩展到 ARIMA 的金融目标、阶数、差分还原和向前预测约束。
- [LSTM · 金融序列中的门控记忆](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-lstm.md)：金融序列的时间顺序、重叠窗口和资产身份，决定门控网络的合法输入与状态边界。
- [Temporal Convolution · 金融时间轴上的因果卷积](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-temporal-convolution.md)：先识别金融时间轴和预测起点，再确定卷积感受野、历史间隔与因果填充。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/generated/sklearn.model_selection.TimeSeriesSplit.html)

[返回分层目录](00-learning-index.md)
