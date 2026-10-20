# Batch Size

概念编号：`concept:batch-size` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/batch-size/)

## 第一层：概念入门 · 知其然

### 它是什么

Batch size is the number of samples processed together in a forward pass. Microbatch size can differ from the total number contributing to one parameter update.

### 先看一个例子

A microbatch of 8, accumulated over 4 passes on 2 workers, contributes 64 sample presentations to an update. Memory use for one forward pass is still tied mainly to the microbatch, not to storing all 64 activations at once.

### 理解练习

用自己的话解释：上面的情景为什么是“Batch Size”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Batch size is the number of samples processed together in a forward pass. Microbatch size can differ from the total number contributing to one parameter update.

情景依据：A microbatch of 8, accumulated over 4 passes on 2 workers, contributes 64 sample presentations to an update. Memory use for one forward pass is still tied mainly to the microbatch, not to storing all 64 activations at once.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

With equal-sized microbatches of size B, accumulation over A steps and D data-parallel workers gives effective batch size BAD when gradients are combined consistently and workers see the intended samples. This identity does not make all optimization dynamics equivalent.


### 适用边界与常见误解

Distinguish between per-device micro-batches and global effective batches.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
