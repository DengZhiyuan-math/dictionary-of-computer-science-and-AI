# Checkpoint / Resume / Seed

概念编号：`concept:checkpoint-resume-seed` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/checkpoint-resume-seed/)

## 第一层：概念入门 · 知其然

### 定义

训练检查点是为恢复计算而保存的一组状态。通常不仅有模型参数，还包括优化器的历史量、学习率调度进度、已完成步数，以及需要复现时的随机数状态和数据读取位置。随机种子只指定随机序列的起点；中途恢复还需要知道已走到哪里。恢复训练与只加载参数用于预测，是不同目的的保存方式。

### 概念边界与常见混淆

完整状态也不保证跨硬件与软件版本逐位一致，某些运算顺序存在非确定性。应明确需要的是同一训练轨迹、数值近似一致还是统计性能相近，并按目标验证。

### 先看一个例子

训练到第 100 步时保存参数，但忘记动量优化器的历史方向。重新启动后参数虽然相同，下一步却可能与原训练不同，因为优化器把过去方向当成零。若只重新设置初始种子，随机抽样也可能从开头重来，而不是从第 101 步接续。

### 理解练习

#### 1. 推理与恢复

只想用已训练模型预测，还一定需要优化器状态吗？

<details><summary>答案与解释</summary>

通常不需要；预测需要参数与一致的模型和输入处理规则。继续训练则还依赖优化器及其他进度状态。

</details>

#### 2. 种子与位置

记录种子 7，是否已经记录随机序列消耗了多少次？

<details><summary>答案与解释</summary>

没有。种子标识起点，生成器当前状态才表示进展；不同执行路径还可能消耗不同数量的随机数。

</details>

#### 3. 恢复核验

怎样具体检查恢复状态是否足够？

<details><summary>答案与解释</summary>

在固定环境和同一后续批次下，比较不中断与保存恢复后的下一步参数、损失及进度；这比只检查文件能否加载更有意义。

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
