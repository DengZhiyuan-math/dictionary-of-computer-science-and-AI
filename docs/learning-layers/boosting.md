# Boosting

概念编号：`concept:boosting` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/boosting/)

## 第一层：概念入门 · 知其然

### 它是什么

Boosting 把多个较简单的模型逐步组合起来。后续模型针对当前组合尚未处理好的部分作修正，而不是每个模型都独立完成全部任务。

### 先看一个例子

真实数值是 10，当前模型预测 7。平方误差情形下，新模型可以学习剩余差值 3；若只加入一半修正，组合预测变成 8.5。

### 理解练习

每增加一棵树都能降低训练误差，是否就一定改善新数据上的预测？

<details><summary>答案与解释</summary>

不一定。模型也可能开始拟合训练噪声，应查看独立验证表现；训练目标改善和泛化改善是两个问题。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Gradient boosting adds models sequentially to improve the current ensemble. With squared error, a new tree can be understood as predicting unexplained residuals; with other losses, fitting negative loss gradients is more accurate. GBDT uses decision trees as gradient-boosting base learners. Each round adds a correction rather than training a wholly independent complete model.

The learning rate controls each new tree's contribution; tree count controls the number of rounds. Smaller contributions often require more rounds to reach a given training error, so consider both together. Maximum depth and leaf count constrain each correction's complexity. Training corrections do not guarantee improvement on validation every round, so early stopping is common.


### 适用边界与常见误解

Boosting methods cannot all be described as fitting the same type of residual.

### 领域应用

- [Gradient Boosted Trees · 梯度提升树的金融应用](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-gradient-boosted-trees.md)：将提升法连接到金融标签的逐轮拟合，强调损失、学习率、时间验证和交易映射。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
