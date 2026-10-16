---
title: "第 36 讲 · 时间序列：ARIMA、ETS、GARCH、Kalman 与深度预测"
aliases: []
tags: ["chapter","area/ml-methods"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/机器学习与统计模型|机器学习与统计模型]]

## 本讲概念

- [[Concepts/时间序列与状态估计|时间序列与状态估计]]

<a id="chapter-36"></a>

## 第 36 讲｜时间序列：ARIMA、ETS、GARCH、Kalman 与深度预测

领域：机器学习算法 · 细讲

<a id="chapter-36-section-01"></a>

### Trend、Seasonality、Lag 与 Stationarity【重点】

Trend 是长期变化，seasonality 是周期性模式，lag 是过去若干时刻的观测。平稳性关注某些统计性质是否随时间保持稳定。它不是说数据永远不波动。预测未来首先要决定可用信息的截止时刻、预测多远，以及在每个时点如何更新模型。时间序列与普通表格的关键差别，是顺序与依赖不能随便打乱。

<a id="chapter-36-section-02"></a>

### Naive Baseline、Moving Average、ETS【重点】

朴素基线可以直接使用最近值，季节性基线使用上个对应周期的值。移动平均平滑短期噪声。指数平滑给近期观察较大权重，ETS 家族进一步组合误差、趋势与季节结构。它们简单，却能成为非常必要的比较对象。一个复杂模型若连季节性朴素基线都没稳定超过，应先审查数据和评价。

<a id="chapter-36-section-03"></a>

### AR、MA、ARIMA、SARIMA、SARIMAX【重点】

AR 用过去数值预测当前，MA 在这里指用过去预测误差建模，不是日常所说的滚动均线。ARIMA 结合自回归、误差结构与差分，SARIMA 加入季节结构，SARIMAX 等扩展允许外生变量。差分帮助处理某些非平稳趋势，不保证所有变化都被解决。未来的外生变量若预测时拿不到，就必须先预测它或明确使用情景，而不能直接偷看真实未来值。

<a id="chapter-36-section-04"></a>

### VAR 与 GARCH【认识】

VAR 让多个时间序列共同利用彼此历史，描述多变量动态。GARCH 则主要建模条件波动或方差随时间如何变化，常用于波动聚集现象。预测波动不是直接预测价格一定上涨或下跌。变量多时 VAR 参数迅速增多，GARCH 的假设也不适合所有环境。模型名称与真正的预测目标必须对应。

<a id="chapter-36-section-05"></a>

### Kalman Filter、EKF、UKF、Particle Filter【重点】

卡尔曼滤波在模型预测与带噪观测之间反复融合，估计看不到的系统状态。在线性高斯等假设下有明确最优性质。EKF 通过局部线性化处理非线性；UKF 用精心选取的代表点传播不确定性；粒子滤波用多个带权候选状态近似复杂分布。滤波使用到当前的信息，平滑还可以利用之后观察来回看过去，两者在在线预测中不能混用。

<a id="chapter-36-section-06"></a>

### TCN、N-BEATS、Patch-Based Transformer【认识】

TCN 用因果卷积及不同跨度获取历史模式。N-BEATS 用一系列预测与残差分解模块处理时间序列。基于 patch 的 Transformer 把一段连续时间点打包成单元，再学习片段之间关系。它们提供不同归纳偏置和计算方式，不是只要加上 Transformer 就自动最好。数据长度、跨序列共享、季节性和预测范围共同决定效果。

<a id="chapter-36-section-07"></a>

### Change Point、Forecast Horizon 与 Rolling Validation【重点】

变点检测寻找统计结构开始变化的时刻。Forecast horizon 是预测多远；多步预测可以逐步递推，也可以一次输出多个未来时刻。滚动或扩展窗口验证反复模拟在历史某时点训练、预测随后一段。归一化、特征和模型选择都必须遵守当时可用信息边界，否则高分只是未来泄露。

参考资料（不朗读）：[S050 · statsmodels — Time Series Analysis](https://www.statsmodels.org/stable/tsa.html)；[S059 · arch — Univariate Volatility Models](https://arch.readthedocs.io/en/latest/univariate/univariate_volatility_modeling.html)；[S060 · N-BEATS: Neural basis expansion analysis for interpretable time series forecasting](https://arxiv.org/abs/1905.10437)；[S061 · A Time Series is Worth 64 Words: Long-term Forecasting with Transformers](https://arxiv.org/abs/2211.14730)
