# Time Series

概念编号：`concept:time-series` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/time-series/)

## 第一层：概念入门 · 知其然

### 它是什么

时间序列是按时间排列的数据，先后和间隔可能影响预测，不能任意打乱。

### 先看一个例子

今天用水量通常与昨天有关，不像随机抽到的两户人家。

### 理解练习

今天用水与昨天相关，为何不能随机打乱验证？

<details><summary>答案与解释</summary>

打乱可把未来状态送入训练，破坏真实的过去预测未来流程。

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
