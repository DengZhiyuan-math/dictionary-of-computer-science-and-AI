# Scheduler

概念编号：`concept:scheduler` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/scheduler/)

## 第一层：概念入门 · 知其然

### 定义

学习率调度器按明确规则改变优化器的学习率，规则可依赖更新次数、轮数或验证指标。它不是另一个直接计算参数梯度的模型，而是控制训练过程中步长。固定计划和依据验证平台期调整的计划不同，调用时点及计数单位都影响实际训练。

### 概念边界与常见混淆

训练恢复要恢复调度进度。依据验证指标调整时，还需说明指标方向、耐心与频率；不能把同一“step”名称当作相同计划。

### 先看一个例子

初始学习率0.1，每完成两次参数更新减半，则前两次用0.1、接下两次用0.05，再两次用0.025。若有四个微批才更新一次，却每微批推进调度，衰减会比设计快四倍。

### 理解练习

#### 1. 计步

每轮批次数变化，按轮衰减与按更新衰减还等价吗？

<details><summary>答案与解释</summary>

不再必然等价，经历的更新次数不同，需按设计选单位。

</details>

#### 2. 恢复

只恢复模型，把调度器重置到初始，会完全接续吗？

<details><summary>答案与解释</summary>

不会，后续步长不同，需保存并恢复相关状态。

</details>

#### 3. 效果

学习率按计划下降，验证误差就一定下降吗？

<details><summary>答案与解释</summary>

不保证，它只是更新规则，效果需实证核验。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 分段衰减ηₜ=η₀γ^floor(t/s)，先明确t对应已完成的更新数。
2. 平台调度则根据验证信号触发，不能混用训练批次作为验证事件。

### 具体输入与计算步骤

初始学习率0.1，每2次优化器更新乘0.5。

1. t=0时0.1，完成2步后0.05。
2. 完成4步后0.025，恢复训练需还原调度计数。

计算结果：完成4步后0.025，恢复训练需还原调度计数。

### 换到实际问题中应用

长训练后期需要更细小更新。

1. 选择衰减计划并记录每次优化器更新的实际学习率。
2. 保存调度器状态，验证恢复前后学习率连续。

应用结论：保存调度器状态，验证恢复前后学习率连续。

### 举一反三：改变条件后的完整解答

累计4微批才更新一次，却每微批推进会怎样？

<details><summary>变式的推演与答案</summary>

1. 2个微批就触发原定2步衰减，而此时还没更新参数。
2. 计划加快4倍，学习率过早变小，应按真正更新计步。

计划加快4倍，学习率过早变小，应按真正更新计步。

</details>

### 原有解释与进一步例题


### 原理与推演

A learning-rate scheduler specifies how the learning rate changes. Step decay reduces it at specified points; exponential decay reduces it proportionally; cosine annealing follows a smooth cosine curve. ReduceLROnPlateau monitors a metric and lowers the rate when improvement stalls. These rules respond to either a fixed schedule or observed performance. Choose with the total training duration and the need for finer updates near the end in mind.


### 例子

例子：初始学习率 0.1，每完成两轮乘 0.5，则第 1–2 轮用 0.1、第 3–4 轮用 0.05。若调度器按优化器更新步数推进，梯度累积会改变每轮更新次数；需记录调用时点，不能把 epoch 与 step 混用。


### 适用边界与常见误解

Specify whether the schedule advances with optimizer updates, iterations, epochs, or validation checks.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/optim.html)

[返回分层目录](00-learning-index.md)
