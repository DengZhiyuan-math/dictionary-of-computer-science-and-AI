# Activation Checkpointing

概念编号：`concept:activation-checkpointing` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/activation-checkpointing/)

## 第一层：概念入门 · 知其然

### 定义

训练神经网络时，前向计算把输入逐层变成预测；反向求导需要其中一些中间数值来计算参数对误差的影响，这些数值常称激活。激活重计算只保存选定边界上的中间数值，在反向阶段重新执行部分前向计算，重建当时需要的激活。它用额外运算换取较少的激活存储，并没有取消求导。

### 概念边界与常见混淆

它主要减少激活占用，不直接减少参数、梯度或优化器状态。重新执行必须与原前向在相关数值上保持一致；随机屏蔽或修改外部状态的代码需要相应的随机状态管理和副作用处理。

### 先看一个例子

把连续的三段计算记为 A、B、C。若只保存进入 B 的输入，反向处理 C 和 B 时可以从这个边界重做 B、C，得到所需中间值，用完后释放。若全部保存，则少做重复运算但占更多空间；实际峰值还包括当前正在重算的激活，不能简单认为只剩一个边界的大小。

### 理解练习

#### 1. 节省哪一部分

内存大部分被参数和优化器状态占用，重计算一定能省一半总内存吗？

<details><summary>答案与解释</summary>

不能保证。它只针对其中的激活部分，整体收益受各类占用比例限制；应比较实际峰值而非单类数值。

</details>

#### 2. 额外计算

保存更少的边界是否一定训练更快？

<details><summary>答案与解释</summary>

不一定，可能需要重算更长片段。省下内存可以让任务运行或改变批量，但固定配置下重算会增加工作量。

</details>

#### 3. 随机计算

重算时随机屏蔽位置与原前向不同，有什么风险？

<details><summary>答案与解释</summary>

反向用到的中间值可能不属于原来那次计算，破坏预期梯度。应使用能保持相关随机状态一致的实现并核对结果。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 反向求导需要某些前向结果，直接删除会缺少计算依据。
2. 保存边界输入后可重新运行内部层，恢复这些结果，代价是额外计算。

### 具体输入与计算步骤

三层链各产生10 MB中间结果，只保存第一层边界。

1. 简化模型中原先保存3×10=30 MB激活，改为保存10 MB边界。
2. 反向阶段重做后两层共2次前向；实际峰值还包括临时张量，不能据此承诺总显存降至三分之一。

计算结果：反向阶段重做后两层共2次前向；实际峰值还包括临时张量，不能据此承诺总显存降至三分之一。

### 换到实际问题中应用

训练长序列时激活占显存大头。

1. 对连续 Transformer 块设置检查点，固定输入并比较梯度与未重计算基准。
2. 测量峰值显存与每步耗时，确认节省足以抵消重算开销。

应用结论：测量峰值显存与每步耗时，确认节省足以抵消重算开销。

### 举一反三：改变条件后的完整解答

若主要内存是80 MB优化器状态和20 MB激活，激活减半能省多少？

<details><summary>变式的推演与答案</summary>

1. 激活变为10 MB，优化器仍80 MB。
2. 简化总量从100降至90 MB，仅省10%，应另考虑优化器分片。

简化总量从100降至90 MB，仅省10%，应另考虑优化器分片。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/checkpoint.html)

[返回分层目录](00-learning-index.md)
