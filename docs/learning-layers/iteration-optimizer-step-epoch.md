# Iteration / Optimizer Step / Epoch

概念编号：`concept:iteration-optimizer-step-epoch` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/iteration-optimizer-step-epoch/)

## 第一层：概念入门 · 知其然

### 它是什么

迭代通常指处理一个批次，优化器步指更新一次参数，epoch指完整遍历一次数据。

### 先看一个例子

100样本、每批10、累计2批更新一次。

### 理解练习

10次迭代一定对应10次更新吗？

<details><summary>答案与解释</summary>

不一定，此例只有5次优化器步。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 每轮微批数为ceil(N/b)，是否丢弃尾批会改变计数。
2. 梯度累计k个微批才更新，调度器若按更新计步就不应每个微批推进。

### 具体输入与计算步骤

100样本、每批10、累计2批更新一次。

1. 一轮100/10=10次迭代。
2. 累计2次更新，共10/2=5步，训练3轮则30次迭代、15步。

计算结果：累计2次更新，共10/2=5步，训练3轮则30次迭代、15步。

### 换到实际问题中应用

对齐两次训练的学习率计划。

1. 记录样本数、微批大小、累积次数和优化器步数。
2. 按计划声明的单位触发调度，避免改变批大小后无意改变预热长度。

应用结论：按计划声明的单位触发调度，避免改变批大小后无意改变预热长度。

### 举一反三：改变条件后的完整解答

若100样本改105、不丢尾批，累计2批且尾部也更新呢？

<details><summary>变式的推演与答案</summary>

1. 每轮ceil(105/10)=11次迭代。
2. 5次完整累计加1次尾更新，共6步；尾组损失缩放需按实际样本数处理。

5次完整累计加1次尾更新，共6步；尾组损失缩放需按实际样本数处理。

</details>

### 原有解释与进一步例题


### Definition

An iteration is one defined training-loop cycle; an optimizer step actually updates parameters; an epoch traverses a finite training dataset once. Code and streaming-data conventions must be stated.


### Parameters and mechanism

With N samples and batch size B, keeping the final partial batch gives ceil(N/B) batches per epoch. Updating every A batches reduces the update count, with the final incomplete accumulation handled by an explicit rule.


### Example

For 1,000 samples and batches of 100, one epoch has 10 iterations if one iteration is one batch. With accumulation over 2 batches, that epoch has 5 optimizer steps. Ten iterations are not ten epochs.


### 适用边界与常见误解

Gradient accumulation or skipped updates means these counts are not interchangeable.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/optim.html)

[返回分层目录](00-learning-index.md)
