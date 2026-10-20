# Adam / AdamW

概念编号：`concept:adam-adamw` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/adam-adamw/)

## 第一层：概念入门 · 知其然

### 它是什么

Adam结合梯度平均方向与平方梯度缩放；AdamW额外把权重衰减与梯度更新分开。

### 先看一个例子

参数1，梯度2，学习率0.1，初始两种动量均为0。

### 理解练习

AdamW的衰减会经过自适应除法吗？

<details><summary>答案与解释</summary>

不会，衰减直接作用于参数。

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
