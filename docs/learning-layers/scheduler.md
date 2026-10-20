# Scheduler

概念编号：`concept:scheduler` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/scheduler/)

## 第一层：概念入门 · 知其然

### 它是什么

A learning-rate scheduler specifies how the learning rate changes. Step decay reduces it at specified points; exponential decay reduces it proportionally; cosine annealing follows a smooth cosine curve. ReduceLROnPlateau monitors a metric and lowers the rate when improvement stalls. These rules respond to either a fixed schedule or observed performance. Choose with the total training duration and the need for finer updates near the end in mind.

### 先看一个例子

例子：初始学习率 0.1，每完成两轮乘 0.5，则第 1–2 轮用 0.1、第 3–4 轮用 0.05。若调度器按优化器更新步数推进，梯度累积会改变每轮更新次数；需记录调用时点，不能把 epoch 与 step 混用。

### 理解练习

用自己的话解释：上面的情景为什么是“Scheduler”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A learning-rate scheduler specifies how the learning rate changes. Step decay reduces it at specified points; exponential decay reduces it proportionally; cosine annealing follows a smooth cosine curve. ReduceLROnPlateau monitors a metric and lowers the rate when improvement stalls. These rules respond to either a fixed schedule or observed performance. Choose with the total training duration and the need for finer updates near the end in mind.

情景依据：例子：初始学习率 0.1，每完成两轮乘 0.5，则第 1–2 轮用 0.1、第 3–4 轮用 0.05。若调度器按优化器更新步数推进，梯度累积会改变每轮更新次数；需记录调用时点，不能把 epoch 与 step 混用。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A learning-rate scheduler specifies how the learning rate changes. Step decay reduces it at specified points; exponential decay reduces it proportionally; cosine annealing follows a smooth cosine curve. ReduceLROnPlateau monitors a metric and lowers the rate when improvement stalls. These rules respond to either a fixed schedule or observed performance. Choose with the total training duration and the need for finer updates near the end in mind.


### 例子

例子：初始学习率 0.1，每完成两轮乘 0.5，则第 1–2 轮用 0.1、第 3–4 轮用 0.05。若调度器按优化器更新步数推进，梯度累积会改变每轮更新次数；需记录调用时点，不能把 epoch 与 step 混用。


### 适用边界与常见误解

Specify whether the schedule advances with optimizer updates, iterations, epochs, or validation checks.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
