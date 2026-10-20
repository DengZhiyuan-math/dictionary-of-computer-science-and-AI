# Checkpoint / Resume / Seed

概念编号：`concept:checkpoint-resume-seed` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/checkpoint-resume-seed/)

## 第一层：概念入门 · 知其然

### 它是什么

恢复检查点保存训练进度；种子控制随机序列，但不能单独恢复中途训练状态。

### 先看一个例子

动量v=0.8，梯度2，β=0.9，学习率0.1。

### 理解练习

只存权重够完整续训吗？

<details><summary>答案与解释</summary>

不够，还需优化器、调度器、随机状态及数据进度等。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 下一步更新依赖权重和优化器历史，丢失历史会改变轨迹。
2. 种子只确定随机流起点，恢复中途还须还原流的位置及数据顺序。

### 具体输入与计算步骤

动量v=0.8，梯度2，β=0.9，学习率0.1。

1. 恢复动量后新v=0.9×0.8+2=2.72，更新幅度0.272。
2. 若v重置0，更新幅度0.2，两者相差0.072。

计算结果：若v重置0，更新幅度0.2，两者相差0.072。

### 换到实际问题中应用

长训练需要支持机器中断。

1. 定期原子保存模型、优化器、步数、调度器及随机与数据状态。
2. 人为中断后恢复并比较后续批次与损失，确认恢复行为。

应用结论：人为中断后恢复并比较后续批次与损失，确认恢复行为。

### 举一反三：改变条件后的完整解答

仅部署推理时还需动量吗？

<details><summary>变式的推演与答案</summary>

1. 推理不执行参数更新，因此不读取优化器历史。
2. 通常只需权重、结构、预处理与版本；训练恢复需要更多状态。

通常只需权重、结构、预处理与版本；训练恢复需要更多状态。

</details>

### 原有解释与进一步例题


### 原理与推演

A checkpoint saves training state. Model weights alone are usually sufficient for inference. Resuming training faithfully may also require optimizer state, scheduler progress, random-number-generator state and the data-loading position. A random seed helps control initialization and data shuffling, but hardware differences and nondeterministic operations can still change results. Reproducibility concerns the whole process, not just recording a seed.


### 适用边界与常见误解

Weights alone usually do not support exact continuation, and seeds do not guarantee identical results across environments.

### 例题：Two Checkpoints: Saving State and Recomputing Activations

A network has four segments, each needing about 100 MB of saved intermediate activations. Training may face interruption or insufficient GPU memory.

1. A recovery checkpoint saves model, optimizer, scheduler and training step count, plus random state and data progress when needed. It writes mainly to persistent storage.
2. Activation checkpointing retains selected boundary activations and recomputes some forward operations during backpropagation, trading time for activation memory.
3. Retaining two segment boundaries may reduce intermediate storage, but boundary tensors, inputs, temporary tensors and other states still count. An exact 50% memory reduction cannot be assumed.

结果：Disk snapshots support recovery. Activation recomputation reduces part of training memory use. Both can be used together.

易错点：Model weights alone usually do not support an exact training resume. Activation checkpointing does not automatically save a resumable run.

变式：If optimizer state is large, does activation checkpointing remove it?

参考答案：No. It targets intermediate activations; optimizer state needs a separate storage or sharding strategy.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/tutorials/beginner/saving_loading_models.html)

[返回分层目录](00-learning-index.md)
