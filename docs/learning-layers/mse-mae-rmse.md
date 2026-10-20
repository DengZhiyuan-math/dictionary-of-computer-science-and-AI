# MSE / MAE / RMSE

概念编号：`concept:mse-mae-rmse` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mse-mae-rmse/)

## 第一层：概念入门 · 知其然

### 它是什么

MSE, mean squared error, is common in continuous-value prediction and penalizes large errors strongly. MAE, mean absolute error, measures the magnitude of deviations from the true value and is less sensitive to extreme errors. RMSE is the square root of MSE and has the same units as the target. For temperature predictions, an error in degrees is easier to interpret than one in squared degrees. These losses and metrics can be used with other suitable models, not only linear regression.

### 先看一个例子

例子：两笔预测误差为 1、−3，MSE=(1²+3²)/2=5，MAE=(1+3)/2=2，RMSE=√5≈2.236。RMSE 与目标同单位，MSE 的单位是目标单位的平方；不能跨不同目标尺度直接比较它们的数值。

### 理解练习

用自己的话解释：上面的情景为什么是“MSE / MAE / RMSE”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：MSE, mean squared error, is common in continuous-value prediction and penalizes large errors strongly. MAE, mean absolute error, measures the magnitude of deviations from the true value and is less sensitive to extreme errors. RMSE is the square root of MSE and has the same units as the target. For temperature predictions, an error in degrees is easier to interpret than one in squared degrees. These losses and metrics can be used with other suitable models, not only linear regression.

情景依据：例子：两笔预测误差为 1、−3，MSE=(1²+3²)/2=5，MAE=(1+3)/2=2，RMSE=√5≈2.236。RMSE 与目标同单位，MSE 的单位是目标单位的平方；不能跨不同目标尺度直接比较它们的数值。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

MSE, mean squared error, is common in continuous-value prediction and penalizes large errors strongly. MAE, mean absolute error, measures the magnitude of deviations from the true value and is less sensitive to extreme errors. RMSE is the square root of MSE and has the same units as the target. For temperature predictions, an error in degrees is easier to interpret than one in squared degrees. These losses and metrics can be used with other suitable models, not only linear regression.


### 例子

例子：两笔预测误差为 1、−3，MSE=(1²+3²)/2=5，MAE=(1+3)/2=2，RMSE=√5≈2.236。RMSE 与目标同单位，MSE 的单位是目标单位的平方；不能跨不同目标尺度直接比较它们的数值。


### 适用边界与常见误解

Account for the target’s units and the different penalties on large errors when choosing or comparing these measures.

### 领域应用

- [Brier Score · 金融二元概率的平方评分](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-brier-score.md)：均方误差的定义复用共同基础；这里规定概率预测与二元金融标签的评分对象。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
