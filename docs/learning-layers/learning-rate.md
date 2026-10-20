# Learning Rate

概念编号：`concept:learning-rate` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/learning-rate/)

## 第一层：概念入门 · 知其然

### 它是什么

学习率控制沿梯度更新参数时迈多大一步。

### 先看一个例子

损失L=θ²/2，θ=2，学习率0.1。

### 理解练习

学习率越大一定学得越快吗？

<details><summary>答案与解释</summary>

不一定，可能越过低谷甚至发散。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 梯度为θ，更新θ新=θ−ηθ=(1−η)θ。
2. 此二次函数中abs(1−η)<1即0<η<2时收敛，实际网络不能直接照搬该界。

### 具体输入与计算步骤

损失L=θ²/2，θ=2，学习率0.1。

1. θ新=2−0.1×2=1.8。
2. 损失从2降到1.8²/2=1.62。

计算结果：损失从2降到1.8²/2=1.62。

### 换到实际问题中应用

新模型训练初期损失振荡。

1. 固定数据与优化器，比较较小学习率是否降低振荡，并记录梯度尺度。
2. 用验证表现选计划，不能仅凭前几步训练下降确定最佳学习率。

应用结论：用验证表现选计划，不能仅凭前几步训练下降确定最佳学习率。

### 举一反三：改变条件后的完整解答

若η=3，此例会怎样？

<details><summary>变式的推演与答案</summary>

1. θ新=(1−3)×2=−4。
2. 损失8大于原2，后续绝对值每步翻倍并发散。

损失8大于原2，后续绝对值每步翻倍并发散。

</details>

### 原有解释与进一步例题


### 原理与推演

The learning rate controls the overall step size of optimizer updates. It measures neither how much knowledge has been learned nor how many epochs training has run. Imagine searching for low ground: the update direction tells you where to move, and the learning rate influences how far to move. Optimizers can also use historical gradients to scale individual parameter updates, so the learning rate is not the absolute change applied to every parameter.

If the stride length is too large, it may cross the favorable area at once, oscillate back and forth, and even cause numerical instability in training. Steps that are too small may result in slow improvement within a given budget. There is no single value that is best for all models, batch sizes, and optimizers. A smaller learning rate does not guarantee that the final generalization will be better, because the training budget, data, and other settings jointly affect the results.

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

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/optim.html)

[返回分层目录](00-learning-index.md)
