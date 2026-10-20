# Batch Size

概念编号：`concept:batch-size` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/batch-size/)

## 第一层：概念入门 · 知其然

### 定义

批大小是一次批次计算所包含的样本数量。训练通常把数据分成批次，用批内损失的平均值估计当前参数的梯度，再更新参数。批大小影响估计的随机波动、每次计算量、存储需求和遍历一遍数据所需的更新次数。若使用梯度累积，还要区分一次装入设备的微批大小与一次更新实际汇总的有效批大小。

### 概念边界与常见混淆

更大批次不保证更快完成训练或泛化更好。设备并行效率、每批耗时和达到目标误差需要的更新数都影响结论；存在批内交互的层时，改变批次还可能改变所计算的模型行为。

### 先看一个例子

有 100 个样本、不丢弃最后不足一批的数据，也不做累积。批大小 20 时一轮有 5 次更新；批大小 40 时批次为 40、40、20，共 3 次更新。最后一批仍需按实际样本数正确平均。两种设置都看过 100 个样本，但参数更新的时点和次数不同。

### 理解练习

#### 1. 批次数

100 个样本、批大小 40，如果丢弃最后不足一批的数据，一轮看了多少样本、更新几次？

<details><summary>答案与解释</summary>

看了 80 个、更新 2 次。不能仍把本轮称为每个样本都已参与训练，应说明丢弃规则。

</details>

#### 2. 平均与求和

批损失用总和，批大小翻倍而学习率不变，能否认为与用平均完全相同？

<details><summary>答案与解释</summary>

不能。总和梯度通常随样本数缩放，而平均保持每样本归一口径；优化器和学习率必须结合损失归约方式理解。

</details>

#### 3. 有效批次

每次处理 8 个样本、累积 4 次再更新，有效批大小是什么？

<details><summary>答案与解释</summary>

是 32，但设备一次只装入的微批仍为 8。与直接大批等价还需要正确平均并核对模型是否有批次相关行为。

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
