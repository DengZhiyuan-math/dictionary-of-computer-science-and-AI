# Scheduler

概念编号：`concept:scheduler` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/scheduler/)

## 第一层：概念入门 · 知其然

### 它是什么

学习率调度器按步数、轮数或验证结果改变学习率。

### 先看一个例子

初始学习率0.1，每2次优化器更新乘0.5。

### 理解练习

每处理一个微批都应推进调度器吗？

<details><summary>答案与解释</summary>

只在计划以微批为单位时；按更新计划需与优化器步对齐。

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
