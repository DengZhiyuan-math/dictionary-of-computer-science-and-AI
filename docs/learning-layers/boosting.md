# Boosting

概念编号：`concept:boosting` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/boosting/)

## 第一层：概念入门 · 知其然

### 它是什么

提升方法把多个较弱模型按顺序组合，后来的模型修正已有组合的不足。

### 先看一个例子

回归标签为[2,4]，当前预测[1,3]，误差都为1。

### 理解练习

下一棵树必须重学整个标签吗？

<details><summary>答案与解释</summary>

不必，梯度提升可让它拟合当前损失的负梯度。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 平方损失取一半时，负梯度y−F就是残差。
2. 拟合残差树h后按F←F+ηh累加，学习率η控制每次修正力度。

### 具体输入与计算步骤

回归标签为[2,4]，当前预测[1,3]，误差都为1。

1. 树预测h=[1,1]，η=0.5，则新预测[1.5,3.5]。
2. 两样本均方误差从(1²+1²)/2=1降至(0.5²+0.5²)/2=0.25。

计算结果：两样本均方误差从(1²+1²)/2=1降至(0.5²+0.5²)/2=0.25。

### 换到实际问题中应用

使用表格特征预测房租。

1. 先训练常数基线，再逐轮拟合残差，并在独立验证集记录误差。
2. 验证误差不再改善时停止，限制树深与学习率以控制过拟合。

应用结论：验证误差不再改善时停止，限制树深与学习率以控制过拟合。

### 举一反三：改变条件后的完整解答

若η改成1，该轮预测和训练误差怎样？

<details><summary>变式的推演与答案</summary>

1. [1,3]+[1,1]=[2,4]。
2. 该两点训练误差为0，但不能据此推断新房源误差也为0。

该两点训练误差为0，但不能据此推断新房源误差也为0。

</details>

### 原有解释与进一步例题


### 原理与推演

Gradient boosting adds models sequentially to improve the current ensemble. With squared error, a new tree can be understood as predicting unexplained residuals; with other losses, fitting negative loss gradients is more accurate. GBDT uses decision trees as gradient-boosting base learners. Each round adds a correction rather than training a wholly independent complete model.

The learning rate controls each new tree's contribution; tree count controls the number of rounds. Smaller contributions often require more rounds to reach a given training error, so consider both together. Maximum depth and leaf count constrain each correction's complexity. Training corrections do not guarantee improvement on validation every round, so early stopping is common.


### 适用边界与常见误解

Boosting methods cannot all be described as fitting the same type of residual.

### 领域应用

- [Gradient Boosted Trees · 梯度提升树的金融应用](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-gradient-boosted-trees.md)：将提升法连接到金融标签的逐轮拟合，强调损失、学习率、时间验证和交易映射。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/ensemble.html)

[返回分层目录](00-learning-index.md)
