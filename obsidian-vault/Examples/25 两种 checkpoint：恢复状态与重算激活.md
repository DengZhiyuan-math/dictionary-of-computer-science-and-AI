---
title: "两种 checkpoint：恢复状态与重算激活"
aliases: []
tags: ["example","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/损失、训练与优化|损失、训练与优化]]

### 25 · 两种 checkpoint：恢复状态与重算激活

**场景与输入：** 网络有四段，每段需保存约 100 MB 中间激活。机器可能中断，也可能训练显存不足。

1. 为中断恢复而保存 checkpoint：需要模型、优化器、调度器、训练步数，必要时还包括随机状态和数据进度。它主要写到持久存储。
2. Activation checkpointing：只保留选定边界的激活，在反向时重新执行某些前向计算，以计算时间换激活显存。
3. 假设保留两段边界能减少部分中间保存量，但还要计入边界、输入、临时张量与其他状态，不能简单承诺显存精确减半。

**结果：** 磁盘快照解决恢复问题；激活重计算解决训练时部分内存开销。两个机制可以同时使用。

**易错点与边界：** 只保存模型权重通常不能精确续训；激活 checkpoint 不会自动保存一个可恢复的训练任务。

**改变条件再想一想：** 优化器状态很大，开启激活 checkpoint 就能把它省掉吗？

<details>
<summary>查看参考答案</summary>

不能；它针对中间激活，优化器状态需采用另外的存储或分片方案。

</details>



## 关联概念与章节

- [[Concepts/激活重计算|激活重计算]]
- [[Concepts/检查点／恢复／随机种子|检查点／恢复／随机种子]]
- [[Chapters/第 47 讲 训练稳定性与显存词汇：NaN、梯度裁剪、混合精度、Checkpointing|第 47 讲]]
