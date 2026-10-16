---
title: "第 46 讲 · 正则化与归一化：Dropout、BatchNorm、LayerNorm、RMSNorm"
aliases: []
tags: ["chapter","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/损失、训练与优化|损失、训练与优化]]

## 本讲概念

- [[Concepts/批归一化／层归一化／均方根归一化|批归一化／层归一化／均方根归一化]]
- [[Concepts/随机屏蔽激活|随机屏蔽激活]]
- [[Concepts/正则化|正则化]]

## 具体案例与可视化

- [[Examples/24 Weight decay 与学习率衰减：两个不同的旋钮|案例 24 · Weight decay 与学习率衰减：两个不同的旋钮]]

<a id="chapter-46"></a>

## 第 46 讲｜正则化与归一化：Dropout、BatchNorm、LayerNorm、RMSNorm

领域：训练微知识点 · 细讲

<a id="chapter-46-section-01"></a>

### Overfitting、Capacity 与 Inductive Bias【重点】

容量描述模型能表达多复杂的关系。归纳偏置是模型或训练对哪些规律更容易学习的偏好，例如卷积假定局部模式可以重复出现。过拟合不是参数多的同义词，而是对训练数据中的特殊细节依赖过强，导致新数据效果差。增加数据、改进数据代表性、限制容量和采用正则化都是可能途径，但没有一种单独措施保证解决所有泛化问题。

<a id="chapter-46-section-02"></a>

### L1、L2、Weight Decay【重点】

L1 惩罚常能使部分系数变成零，带来稀疏性。L2 倾向于把系数整体压小，通常不会自动把大量系数精确清零。它们影响模型偏好：宁可接受一点训练误差，也避免某些过度复杂的解。神经网络里的 weight decay 与 L2 要结合优化器理解。正则化太弱可能过拟合，太强则可能连真实信号也压掉。

<a id="chapter-46-section-03"></a>

### Dropout、Drop Path、Stochastic Depth【重点】

Dropout 在训练时随机屏蔽部分激活，让模型不至于过度依赖某几条特定信息通路。推理时通常不再这样随机屏蔽，并使用相应的尺度处理。它不是训练完永久删除一批神经元。Drop path 或 stochastic depth 在相关架构中随机跳过某些路径或残差分支，是更结构化的随机正则化。它们的价值取决于架构和数据，不是所有网络都越加越好。

<a id="chapter-46-section-04"></a>

### BatchNorm【重点】

Batch normalization 利用小批量数据中的统计来调整中间激活的尺度，再通过可学习参数保留表达能力。它常用于卷积网络。训练批量很小或各设备批次差异很大时，统计可能不稳定。推理时通常利用训练累积的运行统计，而不是简单照搬当前单个样本的统计。因此训练与评估模式设置错误，可能让输出意外变化。

<a id="chapter-46-section-05"></a>

### LayerNorm、RMSNorm、GroupNorm【重点】

LayerNorm 通常在单个样本或 token 的特征维度上处理，不依赖其他样本组成怎样的 batch，在 Transformer 中常见。RMSNorm 采用均方根尺度归一化，一般不做 LayerNorm 那样的均值中心化。GroupNorm 在一组通道内处理统计，适合某些小批量视觉任务。它们都与训练稳定性有关，但不应笼统地说“所有归一化都是把所有值缩放到零到一”。

<a id="chapter-46-section-06"></a>

### Feature Scaling 不等于 Normalization Layer【重点】

训练前把年龄、收入等输入特征标准化，与网络内部的归一化层不是同一件事。Standardization 常使各特征具有可比较的中心和尺度；min-max scaling 把观察范围映射到指定区间。距离模型和一些优化过程受尺度影响较大，树模型通常不那么依赖单调尺度变换。任何依赖数据估计的预处理统计，都应从训练部分获得，避免将验证分布偷偷引入拟合。

<a id="chapter-46-section-07"></a>

### Data Augmentation、Mixup、CutMix【认识】

数据增强使用合理变换生成训练变体，例如图像裁剪、颜色扰动。Mixup 混合样本及其标签，CutMix 拼接部分图像并相应组合标签。它们希望模型对某类变化更稳健，但变换必须保留任务所需含义。例如识别数字时随意翻转可能改变答案，时间序列任意打乱更可能破坏因果顺序。增强不是无条件“数据越多越好”，而是在加入合理的不变性假设。

参考资料（不朗读）：[S071 · PyTorch — 神经网络层及归一化](https://docs.pytorch.org/docs/stable/nn.html)；[S087 · PyTorch — torch.nn.Dropout](https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html)；[S028 · scikit-learn — 预处理](https://scikit-learn.org/stable/modules/preprocessing.html)；[S084 · Decoupled Weight Decay Regularization](https://arxiv.org/abs/1711.05101)
