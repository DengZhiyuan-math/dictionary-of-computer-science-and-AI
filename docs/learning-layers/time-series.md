# Time Series

概念编号：`concept:time-series` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/time-series/)

## 第一层：概念入门 · 知其然

### 它是什么

A time series is a sequence indexed by time. Its order and spacing matter because adjacent observations can be dependent. Forecasting uses information available up to a cutoff to predict later values.

### 先看一个例子

For c=2, φ=0.8 and the latest observation 10, the next prediction is 10. Splitting early dates for training and later dates for evaluation preserves the forecasting direction; random row shuffling can mix overlapping past and future windows.

### 理解练习

用自己的话解释：上面的情景为什么是“Time Series”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A time series is a sequence indexed by time. Its order and spacing matter because adjacent observations can be dependent. Forecasting uses information available up to a cutoff to predict later values.

情景依据：For c=2, φ=0.8 and the latest observation 10, the next prediction is 10. Splitting early dates for training and later dates for evaluation preserves the forecasting direction; random row shuffling can mix overlapping past and future windows.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

A simple autoregressive baseline is y_hat(t+1)=c+φy(t), where c is an intercept and φ controls dependence on the previous value. Lag means a backward offset. Evaluation must respect when inputs and target outcomes become available.


### 适用边界与常见误解

Validation must respect time order; future information cannot enter past predictions.

### 领域应用

- [ARIMA · 金融序列的差分与多步预测](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-arima.md)：从一般时间序列扩展到 ARIMA 的金融目标、阶数、差分还原和向前预测约束。
- [LSTM · 金融序列中的门控记忆](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-lstm.md)：金融序列的时间顺序、重叠窗口和资产身份，决定门控网络的合法输入与状态边界。
- [Temporal Convolution · 金融时间轴上的因果卷积](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-temporal-convolution.md)：先识别金融时间轴和预测起点，再确定卷积感受野、历史间隔与因果填充。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
