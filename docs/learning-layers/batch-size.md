# Batch Size

概念编号：`concept:batch-size` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/batch-size/)

## 第一层：概念入门 · 知其然

### 它是什么

批大小是一次估计梯度所使用的样本数，决定更新有多频繁以及显存需求。

### 先看一个例子

100个样本，批大小20，完整训练一遍。

### 理解练习

这一遍一定只有一次参数更新吗？

<details><summary>答案与解释</summary>

不是，无梯度累积时共5次更新。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 批梯度通常是样本梯度平均，独立同分布时平均可降低估计方差。
2. 增大批大小使每轮更新次数减少，不能只比较轮数来判断优化进度。

### 具体输入与计算步骤

100个样本，批大小20，完整训练一遍。

1. 100/20=5个完整批，每批一次更新得到5次。
2. 若批大小改为25，更新次数100/25=4，单批张量规模增为原来的1.25倍。

计算结果：若批大小改为25，更新次数100/25=4，单批张量规模增为原来的1.25倍。

### 换到实际问题中应用

显存只能容纳8张图，但希望梯度覆盖32张图。

1. 每个8样本微批反传损失除以4，累计4次后更新。
2. 有效批大小为8×4=32，但批归一化仍看到8个样本。

应用结论：有效批大小为8×4=32，但批归一化仍看到8个样本。

### 举一反三：改变条件后的完整解答

103个样本、批大小20、不丢尾批，有几次更新？

<details><summary>变式的推演与答案</summary>

1. 前5批处理100个，尾批剩3个。
2. 共ceil(103/20)=6次；丢尾批才是5次。

共ceil(103/20)=6次；丢尾批才是5次。

</details>

### 原有解释与进一步例题


### Definition

Batch size is the number of samples processed together in a forward pass. Microbatch size can differ from the total number contributing to one parameter update.


### Parameters and mechanism

With equal-sized microbatches of size B, accumulation over A steps and D data-parallel workers gives effective batch size BAD when gradients are combined consistently and workers see the intended samples. This identity does not make all optimization dynamics equivalent.


### Example

A microbatch of 8, accumulated over 4 passes on 2 workers, contributes 64 sample presentations to an update. Memory use for one forward pass is still tied mainly to the microbatch, not to storing all 64 activations at once.


### 适用边界与常见误解

Distinguish between per-device micro-batches and global effective batches.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/optim.html)

[返回分层目录](00-learning-index.md)
