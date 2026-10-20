# Adam / AdamW

概念编号：`concept:adam-adamw` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/adam-adamw/)

## 第一层：概念入门 · 知其然

### 定义

Adam 是把梯度的指数平均与平方梯度的指数平均结合起来的优化器：前者平滑更新方向，后者按参数调整尺度，起始阶段还修正平均量从零开始造成的偏差。AdamW 在此基础上把权重衰减单独应用：参数按一定比例缩小，再进行由梯度统计决定的更新，而不是把衰减项混进损失梯度的自适应缩放。

### 概念边界与常见混淆

Adam 的自适应尺度不等于无需设置学习率；AdamW 的权重衰减也不保证所有参数都应使用同一系数。二者名称接近，但含正则项的训练目标和实际更新规则需要分别说明。

### 先看一个例子

参数当前为 10，学习率为 0.1、衰减系数为 0.2；单独看 AdamW 的衰减部分，会减去 0.1×0.2×10=0.2，得到 9.8。实际还要加上 Adam 的梯度更新。若把正则梯度先混入 Adam，历史平均和分母也会受它影响，通常得不到相同结果。

### 理解练习

#### 1. 两种平均

梯度平均与平方梯度平均是否都只记录更新方向？

<details><summary>答案与解释</summary>

不是。梯度平均保留符号以提供方向，平方梯度平均记录尺度，不保留正负；两者在更新中承担不同角色。

</details>

#### 2. 衰减贡献

例子中参数若为 −10，单独衰减后是多少？

<details><summary>答案与解释</summary>

为 −9.8，按比例向零缩小，不是无论符号都减去 0.2。

</details>

#### 3. 等价性

AdamW 与给 Adam 损失加二次惩罚是否一般等价？

<details><summary>答案与解释</summary>

不等价。后者的惩罚梯度进入自适应统计，前者独立缩小参数；只有在额外特殊条件下才可能重合。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 一阶动量 m=β₁m+(1−β₁)g，二阶动量 v=β₂v+(1−β₂)g²。
2. 初期除以1−βᵗ修正零初始化偏差，再用 ηm̂/(√v̂+ε) 更新。

### 具体输入与计算步骤

参数1，梯度2，学习率0.1，初始两种动量均为0。

1. 首步偏差修正后 m̂=2、v̂=4，忽略ε，Adam得到1−0.1=0.9。
2. AdamW若λ=0.1，额外减去0.1×0.1×1=0.01，得到0.89。

计算结果：AdamW若λ=0.1，额外减去0.1×0.1×1=0.01，得到0.89。

### 换到实际问题中应用

微调语言模型时需要抑制参数过度增长。

1. 给需要衰减的权重设置AdamW参数组，并明确偏置及归一化参数是否排除。
2. 比较验证损失后选择衰减强度，不能把Adam中的L2系数直接视为等效值。

应用结论：比较验证损失后选择衰减强度，不能把Adam中的L2系数直接视为等效值。

### 举一反三：改变条件后的完整解答

若梯度为0、参数1、η=0.1、λ=0.1，且历史动量为0呢？

<details><summary>变式的推演与答案</summary>

1. 梯度更新量为0，AdamW仍乘以1−ηλ=0.99。
2. 参数变0.99；无衰减的Adam仍为1。

参数变0.99；无衰减的Adam仍为1。

</details>

### 原有解释与进一步例题


### 原理与推演

Adam combines a moving average of gradients with statistics of squared gradients, giving both momentum and per-parameter scaling. Its beta parameters control how long past information is retained. Epsilon is a small numerical stabilizer, not an exploration probability. Check the context when the same parameter name appears in different algorithms. Adam is convenient for many deep learning tasks but is not universally the best optimizer in theory or practice.


### 适用边界与常见误解

AdamW changes how weight decay is applied; it is not simply a faster version of Adam.

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

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.optim.Adam.html)
- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.optim.AdamW.html)

[返回分层目录](00-learning-index.md)
