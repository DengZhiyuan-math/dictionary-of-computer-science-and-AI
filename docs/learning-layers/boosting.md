# Boosting

概念编号：`concept:boosting` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/boosting/)

## 第一层：概念入门 · 知其然

### 定义

提升方法把多个预测器按顺序构造成一个组合模型，新一轮利用已有组合的不足决定怎样训练下一预测器。不同提升方法对“不足”的定义不同：AdaBoost 增加部分错分样本的权重，梯度提升则让新模型拟合当前损失对预测的负梯度。最终输出是各模型按规则组合的结果，而不是只保留最后一个模型。

### 概念边界与常见混淆

训练误差持续下降不保证验证误差下降；轮数、成员复杂度与加入系数需要控制。不能把所有提升方法都说成“只训练错分样本”，回归也没有简单的错分集合。

### 先看一个例子

平方误差回归中，三项真实值为 [3,5,7]，当前都预测 5，残差为 [−2,0,2]。假设新模型完全拟合该残差，以 0.5 的系数加入后，组合预测变为 [4,5,6]。下一轮针对新组合再计算残差，而不是每轮从原始目标独立训练一棵树。

### 理解练习

#### 1. 顺序依赖

第二个模型的训练目标通常与第一个模型结果无关吗？

<details><summary>答案与解释</summary>

不是。提升的核心是依据已有组合调整下一轮训练，这与独立训练后再投票不同。

</details>

#### 2. 组合输出

上例加入残差模型后，直接输出 [−2,0,2] 正确吗？

<details><summary>答案与解释</summary>

不正确。它预测的是校正量，应按 0.5 系数加到原预测上，得到 [4,5,6]。

</details>

#### 3. 更多轮数

训练误差降低，就必须继续增加模型吗？

<details><summary>答案与解释</summary>

不能这样决定。验证效果可能已变差，训练成本也会增加；需要按照独立验证目标选择停止点。

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
