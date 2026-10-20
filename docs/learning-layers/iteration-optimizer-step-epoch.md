# Iteration / Optimizer Step / Epoch

概念编号：`concept:iteration-optimizer-step-epoch` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/iteration-optimizer-step-epoch/)

## 第一层：概念入门 · 知其然

### 定义

一次迭代通常指处理一个训练批次，但具体软件可能另作定义；优化器步是实际执行一次参数更新；epoch 是按约定完成一次训练数据遍历。没有梯度累积且每批都更新时，迭代与更新数相同；累积多个微批后更新时便不同。学习率、日志与检查点都必须说明用哪一种计数。

### 概念边界与常见混淆

无限数据流不一定有自然 epoch，应人为规定数据量或时间范围。名称不能代替实际执行记录，“训练 1000 步”需明确指批计算还是参数更新。

### 先看一个例子

数据 120 项、微批 10 项，每三批更新一次，一轮共有 12 次批迭代、4 次优化器更新。两轮是 24 次批迭代、8 次更新，不是 24 次更新。这里不丢样本、无跳过更新，且每轮都遍历同样数量的数据；若发生非有限梯度跳过更新，计数还会不同。

### 理解练习

#### 1. 更新次数

上例把累积次数从 3 改成 1，一轮更新几次？

<details><summary>答案与解释</summary>

12 次，数据量仍为 120，但参数更新频率变了。

</details>

#### 2. 调度单位

预热 100 步按微批推进和按更新推进是否相同？

<details><summary>答案与解释</summary>

有累积时不同。上例前者只约跨过 33 次更新，后者跨过 100 次；需与调度设计一致。

</details>

#### 3. 遍历与训练

遍历完一轮就能说明每个样本都带来一次参数更新吗？

<details><summary>答案与解释</summary>

不能。样本通常批量共同贡献梯度，累积时多个批次也共同形成一次更新。

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
