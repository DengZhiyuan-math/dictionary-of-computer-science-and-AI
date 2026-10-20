# Learning Rate

概念编号：`concept:learning-rate` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/learning-rate/)

## 第一层：概念入门 · 知其然

### 它是什么

The learning rate controls the overall step size of optimizer updates. It measures neither how much knowledge has been learned nor how many epochs training has run. Imagine searching for low ground: the update direction tells you where to move, and the learning rate influences how far to move. Optimizers can also use historical gradients to scale individual parameter updates, so the learning rate is not the absolute change applied to every parameter.

### 先看一个例子

If the stride length is too large, it may cross the favorable area at once, oscillate back and forth, and even cause numerical instability in training. Steps that are too small may result in slow improvement within a given budget. There is no single value that is best for all models, batch sizes, and optimizers. A smaller learning rate does not guarantee that the final generalization will be better, because the training budget, data, and other settings jointly affect the results.

### 理解练习

用自己的话解释：上面的情景为什么是“Learning Rate”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：The learning rate controls the overall step size of optimizer updates. It measures neither how much knowledge has been learned nor how many epochs training has run. Imagine searching for low ground: the update direction tells you where to move, and the learning rate influences how far to move. Optimizers can also use historical gradients to scale individual parameter updates, so the learning rate is not the absolute change applied to every parameter.

情景依据：If the stride length is too large, it may cross the favorable area at once, oscillate back and forth, and even cause numerical instability in training. Steps that are too small may result in slow improvement within a given budget. There is no single value that is best for all models, batch sizes, and optimizers. A smaller learning rate does not guarantee that the final generalization will be better, because the training budget, data, and other settings jointly affect the results.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Suppose two runs each train for ten epochs. With a learning rate that is too small, one may learn little in that time, while a suitable learning rate gives the other good validation performance. Equal epoch counts do not imply equal optimization progress. Conversely, unstable loss is not always caused by the learning rate: labels, the loss implementation or numerical precision may also be responsible.


### 适用边界与常见误解

The learning rate is neither the epoch count nor a fixed change to every weight.

### 例题：Learning Rate: Convergence, Oscillation and Divergence

Use the simplified objective L(θ)=θ²/2, with gradient θ, initial θ=4 and fixed learning rate η.

1. The update is θ_next=(1-η)θ. At η=0.1, 4→3.6→3.24 approaches 0 slowly.
2. At η=1.8, 4→-3.2→2.56 alternates sign but shrinks in magnitude, so still converges.
3. At η=2.2, 4→-4.8→5.76 alternates sign and grows in magnitude, so diverges.

结果：For this quadratic with curvature exactly 1, 0<η<2 converges; η=2 gives constant-amplitude oscillation; η=1 reaches 0 in one step.

易错点：(0,2) is not a universally safe learning-rate range for neural networks. Curvature, noise and the optimizer change stability conditions.

变式：For L=5θ²/2, what is the stable range of fixed learning rates?

参考答案：The gradient is 5θ and the update factor is 1-5η. Requiring its absolute value to be below 1 gives 0<η<0.4.

### 例题：Weight Decay and Learning-Rate Decay: Different Controls

Use the simplified decoupled update θ_next=(1-ηλ)θ-ηg for shrinkage and gradient updates, with θ=2, η=0.1, λ=0.01 and g=0.4.

1. The shrinkage factor is 0.999, giving the shrunk parameter 1.998.
2. The gradient term is 0.04, giving 1.958 after the update. With λ=0, the same step gives 1.96.
3. Reducing the next step’s learning rate to 0.01 changes the schedule for η. λ still sets parameter shrinkage strength.

结果：Weight decay shrinks parameters during an update; learning-rate decay describes how η changes over time. Their numerical effects interact because shrinkage contains ηλ.

易错点：Here g denotes the update direction. Actual AdamW adjusts gradients using momentum and second-moment statistics, so this direction is not simply the raw gradient.

变式：If g=0, can weight decay still update the parameter?

参考答案：Yes. If ηλ is nonzero and decay applies to that parameter, the equation still performs θ←(1-ηλ)θ.

### 领域应用

- [Learning Rate · 金融模型中的学习率选择](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-learning-rate.md)：把一般更新幅度用于收益模型的历史选参，区分训练更新、样本外评价和实际仓位。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
