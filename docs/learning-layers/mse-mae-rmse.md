# MSE / MAE / RMSE

概念编号：`concept:mse-mae-rmse` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mse-mae-rmse/)

## 第一层：概念入门 · 知其然

### 它是什么

MSE平均平方误差，MAE平均绝对误差，RMSE把MSE开方恢复目标单位。

### 先看一个例子

两个预测误差为1和3。

### 理解练习

RMSE一定等于MAE吗？

<details><summary>答案与解释</summary>

不等，此例分别约2.236和2。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 平方误差放大大误差影响，绝对误差线性增长。
2. MSE最优常对应条件均值，MAE最优常对应条件中位数。

### 具体输入与计算步骤

两个预测误差为1和3。

1. MAE=(1+3)/2=2，MSE=(1+9)/2=5。
2. RMSE=√5≈2.236，单位与原目标相同。

计算结果：RMSE=√5≈2.236，单位与原目标相同。

### 换到实际问题中应用

比较房价回归模型。

1. 同时报告MAE与RMSE，并明确价格单位、异常值及是否在对数尺度计算。
2. RMSE偏高提示大误差影响强，可进一步检查尾部样本。

应用结论：RMSE偏高提示大误差影响强，可进一步检查尾部样本。

### 举一反三：改变条件后的完整解答

若把误差3改30，变化怎样？

<details><summary>变式的推演与答案</summary>

1. MAE=(1+30)/2=15.5，MSE=(1+900)/2=450.5。
2. RMSE≈21.225，大误差使平方指标上升更明显。

RMSE≈21.225，大误差使平方指标上升更明显。

</details>

### 原有解释与进一步例题


### 原理与推演

MSE, mean squared error, is common in continuous-value prediction and penalizes large errors strongly. MAE, mean absolute error, measures the magnitude of deviations from the true value and is less sensitive to extreme errors. RMSE is the square root of MSE and has the same units as the target. For temperature predictions, an error in degrees is easier to interpret than one in squared degrees. These losses and metrics can be used with other suitable models, not only linear regression.


### 例子

例子：两笔预测误差为 1、−3，MSE=(1²+3²)/2=5，MAE=(1+3)/2=2，RMSE=√5≈2.236。RMSE 与目标同单位，MSE 的单位是目标单位的平方；不能跨不同目标尺度直接比较它们的数值。


### 适用边界与常见误解

Account for the target’s units and the different penalties on large errors when choosing or comparing these measures.

### 领域应用

- [Brier Score · 金融二元概率的平方评分](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-brier-score.md)：均方误差的定义复用共同基础；这里规定概率预测与二元金融标签的评分对象。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/model_evaluation.html)

[返回分层目录](00-learning-index.md)
