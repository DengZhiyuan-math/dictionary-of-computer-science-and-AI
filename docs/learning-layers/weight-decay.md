# Weight Decay

概念编号：`concept:weight-decay` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/weight-decay/)

## 第一层：概念入门 · 知其然

### 它是什么

权重衰减每次按比例缩小参数，限制权重持续增长。

### 先看一个例子

参数w=2，学习率0.1，衰减系数0.2，无数据梯度。

### 理解练习

Adam中L2惩罚总与AdamW衰减等价吗？

<details><summary>答案与解释</summary>

不等价，自适应缩放会改变耦合惩罚的作用。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 解耦衰减写成w新=(1−ηλ)w，再独立执行数据梯度更新。
2. 普通无动量SGD加L2可得到相同形式，不能将该等价性无条件推广到自适应优化器。

### 具体输入与计算步骤

参数w=2，学习率0.1，衰减系数0.2，无数据梯度。

1. 缩放因子1−0.1×0.2=0.98。
2. w新=2×0.98=1.96，即便数据梯度0也会变化。

计算结果：w新=2×0.98=1.96，即便数据梯度0也会变化。

### 换到实际问题中应用

微调时对不同参数设置衰减策略。

1. 显式分组权重、偏置及归一化参数，决定每组是否衰减。
2. 在验证集调λ，并记录学习率，因为每步缩小量依赖ηλ。

应用结论：在验证集调λ，并记录学习率，因为每步缩小量依赖ηλ。

### 举一反三：改变条件后的完整解答

连续两步无梯度，w变多少？

<details><summary>变式的推演与答案</summary>

1. 第一步1.96，第二步1.96×0.98。
2. 结果1.9208，按乘法衰减而不是每次固定减0.04。

结果1.9208，按乘法衰减而不是每次固定减0.04。

</details>

### 原有解释与进一步例题


### 原理与推演

Weight decay discourages excessively large weights. AdamW decouples it from Adam’s adaptive gradient scaling instead of treating it as an ordinary gradient term. For basic SGD, L2 regularization and weight decay can be equivalent under common conditions; that equivalence does not carry over directly to adaptive optimizers. In an interview, explain that the W in AdamW refers to decoupled weight decay, rather than describing it simply as faster Adam.


### 适用边界与常见误解

Weight decay differs from learning-rate decay; equivalence to an L2 penalty depends on the optimizer.

### 例题：Weight Decay and Learning-Rate Decay: Different Controls

Use the simplified decoupled update θ_next=(1-ηλ)θ-ηg for shrinkage and gradient updates, with θ=2, η=0.1, λ=0.01 and g=0.4.

1. The shrinkage factor is 0.999, giving the shrunk parameter 1.998.
2. The gradient term is 0.04, giving 1.958 after the update. With λ=0, the same step gives 1.96.
3. Reducing the next step’s learning rate to 0.01 changes the schedule for η. λ still sets parameter shrinkage strength.

结果：Weight decay shrinks parameters during an update; learning-rate decay describes how η changes over time. Their numerical effects interact because shrinkage contains ηλ.

易错点：Here g denotes the update direction. Actual AdamW adjusts gradients using momentum and second-moment statistics, so this direction is not simply the raw gradient.

变式：If g=0, can weight decay still update the parameter?

参考答案：Yes. If ηλ is nonzero and decay applies to that parameter, the equation still performs θ←(1-ηλ)θ.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/optim.html)

[返回分层目录](00-learning-index.md)
