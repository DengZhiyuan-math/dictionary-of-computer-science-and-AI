---
title: "第 47 讲 · 训练稳定性与显存词汇：NaN、梯度裁剪、混合精度、Checkpointing"
aliases: []
tags: ["chapter","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/损失、训练与优化|损失、训练与优化]]

## 本讲概念

- [[Concepts/激活重计算|激活重计算]]
- [[Concepts/梯度裁剪|梯度裁剪]]
- [[Concepts/初始化／残差连接|初始化／残差连接]]
- [[Concepts/混合精度／损失缩放|混合精度／损失缩放]]
- [[Concepts/无效数值／无穷／内存不足|无效数值／无穷／内存不足]]

<a id="chapter-47"></a>

## 第 47 讲｜训练稳定性与显存词汇：NaN、梯度裁剪、混合精度、Checkpointing

领域：训练微知识点 · 细讲

<a id="chapter-47-section-01"></a>

### Initialization、Xavier 与 He【认识】

初始化决定训练起点。所有神经元用完全相同权重可能无法打破对称；尺度太大或太小也可能让信息与梯度难以传播。Xavier 和 He 初始化是依据层结构及激活特性选择初始尺度的常见方法。它们帮助训练起步，不直接赋予模型知识。预训练模型的权重则已经来自学习，和随机初始化不是一回事。

<a id="chapter-47-section-02"></a>

### Vanishing Gradient 与 Exploding Gradient【重点】

梯度消失是反传到某些早期层的信号非常弱，更新难以有效推进。梯度爆炸是梯度特别大，导致不稳定更新。序列长度、网络深度、初始化和运算结构都可能影响它们。残差连接、合适归一化、门控结构等可缓解部分问题，但不能把所有训练失败都归为梯度消失。

<a id="chapter-47-section-03"></a>

### Gradient Clipping【重点】

梯度裁剪限制一次更新依据的梯度幅度。按范数裁剪常是在梯度整体过大时缩小它，尽量保留总体方向；逐值裁剪则限制每个分量。它与降低学习率不同：裁剪特别针对异常大的梯度，而学习率影响所有更新的总体尺度。裁剪过强也会让训练迟缓，不能依靠它掩盖错误标签或错误损失实现。

<a id="chapter-47-section-04"></a>

### FP32、FP16、BF16 与 Mixed Precision【重点】

这些名称表示不同浮点数格式。低精度通常节省内存，并可能在支持的硬件上加速计算，但数值范围和精细程度有所不同。BF16 保留与 FP32 相近的指数范围，但有效精度更低；FP16 的可表示范围更窄。Mixed precision 在不同运算中选不同精度，常让敏感步骤保持较高精度。它不是把所有数字一律变小，也不保证每种设备都能获得同样速度。

<a id="chapter-47-section-05"></a>

### Loss Scaling、NaN、Inf 与 OOM【重点】

Loss scaling 在某些混合精度训练中放大损失以帮助小梯度保持可表示，再在更新前作对应处理。NaN 表示无效数值，Inf 表示溢出到无穷；它们可能来自除零、极端分数或不稳定运算。OOM 是内存不足，不是梯度爆炸的另一种写法。遇到 OOM 应检查批量、序列长度、激活保存和模型大小；遇到 NaN 则优先检查数值与数据。

<a id="chapter-47-section-06"></a>

### Activation Checkpointing 与 Model Checkpoint【重点】

Activation checkpointing 不保存全部中间激活，而在反向传播时重算一部分，用额外计算换显存。Model checkpoint 则是把模型或训练状态保存下来，用于恢复或部署。它们都叫 checkpoint，却解决不同问题。减少显存还可考虑梯度累积、参数分片、冻结部分参数等，但每一种都有各自的计算与能力代价。

<a id="chapter-47-section-07"></a>

### Gradient Norm、Loss Curve 与 Debugging【重点】

训练曲线是诊断线索，而不是自动诊断结论。损失完全不变，可能是学习率太小、参数没加入优化器、梯度被切断，或数据与标签没有有效关系。训练很好而验证差，可能是过拟合、划分错误或分布差异。一个有用的小检查是让模型先拟合很小的训练子集；如果连这个也做不到，应先检查流程，而不是立即增加网络规模。

<a id="chapter-47-section-08"></a>

### 混合精度与裁剪：先还原梯度尺度【重点】

使用梯度缩放时，反向传播得到的梯度也被放大。如果要按真实梯度范数裁剪，应该在一次累积结束后，先还原梯度尺度，再裁剪，然后执行缩放器管理的优化器更新。一个更新组内不要混入不同的缩放尺度，也不要每处理一个小批就提前还原；否则累计的量不再具有统一含义。

混合精度检测到非有限梯度时，缩放器可能跳过实际参数更新。按参数更新次数管理的学习率调度和日志，应与实际更新保持一致，不能只数循环执行了几次。具体调用顺序应以使用的框架与训练封装为准。

参考资料（不朗读）：[S083 · PyTorch — 混合精度与梯度累积](https://docs.pytorch.org/docs/stable/notes/amp_examples.html)；[S088 · PyTorch — 参数初始化](https://docs.pytorch.org/docs/stable/nn.init.html)；[S089 · PyTorch — torch.nn.utils.clip_grad_norm_](https://docs.pytorch.org/docs/stable/generated/torch.nn.utils.clip_grad_norm_.html)；[S090 · PyTorch — 激活检查点](https://docs.pytorch.org/docs/stable/checkpoint.html)；[S081 · PyTorch — 自动求导机制](https://docs.pytorch.org/docs/stable/notes/autograd.html)
