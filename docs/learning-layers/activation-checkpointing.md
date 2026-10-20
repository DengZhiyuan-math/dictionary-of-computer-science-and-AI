# Activation Checkpointing

概念编号：`concept:activation-checkpointing` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/activation-checkpointing/)

## 第一层：概念入门 · 知其然

### 它是什么

Activation checkpointing avoids saving every intermediate activation and recomputes some during backpropagation, trading extra computation for GPU memory. A model checkpoint instead saves model or training state for recovery or deployment. Both use the word checkpoint, but solve different problems. Gradient accumulation, parameter sharding and freezing some parameters can also reduce GPU memory use, each with computational or capability tradeoffs.

### 先看一个例子

A network has four segments, each needing about 100 MB of saved intermediate activations. Training may face interruption or insufficient GPU memory.
Disk snapshots support recovery. Activation recomputation reduces part of training memory use. Both can be used together.

### 理解练习

If optimizer state is large, does activation checkpointing remove it?

<details><summary>答案与解释</summary>

No. It targets intermediate activations; optimizer state needs a separate storage or sharding strategy.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Activation checkpointing avoids saving every intermediate activation and recomputes some during backpropagation, trading extra computation for GPU memory. A model checkpoint instead saves model or training state for recovery or deployment. Both use the word checkpoint, but solve different problems. Gradient accumulation, parameter sharding and freezing some parameters can also reduce GPU memory use, each with computational or capability tradeoffs.


### 适用边界与常见误解

This differs from saving a model checkpoint for recovery.

### 例题：Two Checkpoints: Saving State and Recomputing Activations

A network has four segments, each needing about 100 MB of saved intermediate activations. Training may face interruption or insufficient GPU memory.

1. A recovery checkpoint saves model, optimizer, scheduler and training step count, plus random state and data progress when needed. It writes mainly to persistent storage.
2. Activation checkpointing retains selected boundary activations and recomputes some forward operations during backpropagation, trading time for activation memory.
3. Retaining two segment boundaries may reduce intermediate storage, but boundary tensors, inputs, temporary tensors and other states still count. An exact 50% memory reduction cannot be assumed.

结果：Disk snapshots support recovery. Activation recomputation reduces part of training memory use. Both can be used together.

易错点：Model weights alone usually do not support an exact training resume. Activation checkpointing does not automatically save a resumable run.

变式：If optimizer state is large, does activation checkpointing remove it?

参考答案：No. It targets intermediate activations; optimizer state needs a separate storage or sharding strategy.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
