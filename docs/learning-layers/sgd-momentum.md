# SGD / Momentum

概念编号：`concept:sgd-momentum` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sgd-momentum/)

## 第一层：概念入门 · 知其然

### 它是什么

SGD沿批梯度下降；动量把历史方向保留下来，使持续一致的梯度累积作用。

### 先看一个例子

v初始0，连续梯度2、2，β=0.9，学习率0.1，采用v←βv+g。

### 理解练习

动量一定减少每次更新幅度吗？

<details><summary>答案与解释</summary>

不一定，同方向梯度会使速度累积。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 递推vₜ=βvₜ₋₁+gₜ使旧梯度按β的幂逐渐衰减。
2. 参数θ←θ−ηv；不同库可能采用归一化或其他约定，需核对公式。

### 具体输入与计算步骤

v初始0，连续梯度2、2，β=0.9，学习率0.1，采用v←βv+g。

1. 首步v=2，更新幅度0.2。
2. 第二步v=0.9×2+2=3.8，更新幅度0.38；普通SGD仍0.2。

计算结果：第二步v=0.9×2+2=3.8，更新幅度0.38；普通SGD仍0.2。

### 换到实际问题中应用

训练损失谷底方向连续、横向振荡。

1. 用动量保留长期方向，配合学习率选择控制过冲。
2. 记录训练与验证曲线，并在恢复时保存速度状态。

应用结论：记录训练与验证曲线，并在恢复时保存速度状态。

### 举一反三：改变条件后的完整解答

若第二个梯度改为−2呢？

<details><summary>变式的推演与答案</summary>

1. v=0.9×2−2=−0.2。
2. 参数更新为增加0.02，反向梯度先抵消旧速度而非立刻产生0.2幅度。

参数更新为增加0.02，反向梯度先抵消旧速度而非立刻产生0.2幅度。

</details>

### 原有解释与进一步例题


### 原理与推演

Full-batch gradient descent uses all training samples to compute an update direction. This gives a less noisy direction but is expensive for large datasets. Strictly, stochastic gradient descent can mean using one sample per update, although modern training commonly uses SGD to mean minibatch training. Minibatches give noisier directions but allow more frequent updates and hardware parallelism. Stochastic gradients are estimates from sampled data, not arbitrary changes to parameters.


### 例子

例子：采用 v_t=0.9v_{t−1}+g_t，w_t=w_{t−1}−0.1v_t，初始 v=0、连续梯度都为 2，则 v 先为 2、再为 3.8，两次参数变化为 −0.2、−0.38。其他库可能把学习率纳入速度定义，比较公式时应核对约定。


### 适用边界与常见误解

In modern use, SGD often means the minibatch version.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.optim.SGD.html)

[返回分层目录](00-learning-index.md)
