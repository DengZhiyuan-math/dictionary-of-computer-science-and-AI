---
title: "LLM 训练与推理"
aliases: []
tags: ["area","area/llm"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# LLM 训练与推理

[[00-知识地图|知识地图]]

**核心问题：** 语言模型怎样表示、训练、对齐并高效生成？

沿 Token、Embedding、Transformer、SFT、偏好优化、KV cache 与推理加速展开。

## 概念入口

- [[Concepts/注意力／Transformer 架构|注意力／Transformer 架构]]：注意力按相关性聚合信息，Transformer 以相关模块组织序列计算。
- [[Concepts/直接偏好优化／组相对策略优化|直接偏好优化／组相对策略优化]]：DPO 常使用偏好对；GRPO 通过一组采样输出的相对奖励构造更新信号。
- [[Concepts/键值缓存／高效注意力计算|键值缓存／高效注意力计算]]：KV Cache 复用已生成前缀的键值；FlashAttention 优化注意力的数据搬运与存储。
- [[Concepts/监督微调／低秩适配／量化低秩适配|监督微调／低秩适配／量化低秩适配]]：SFT 是训练目标与数据阶段；LoRA 和 QLoRA 是参数适配及内存相关方法。
- [[Concepts/词元／向量表示|词元／向量表示]]：Token 是离散处理单位，Embedding 把单位映射到可学习的向量。

## 章节原文

- [[Chapters/第 52 讲 LLM 入门：Token、Embedding、Transformer 与生成机制|第 52 讲 · LLM 入门：Token、Embedding、Transformer 与生成机制]]
- [[Chapters/第 53 讲 Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE|第 53 讲 · Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE]]
- [[Chapters/第 54 讲 LLM 是怎样训练成聊天助手的|第 54 讲 · LLM 是怎样训练成聊天助手的]]
- [[Chapters/第 55 讲 LLM 训练词汇：预训练、SFT、LoRA、QLoRA、Packing、蒸馏|第 55 讲 · LLM 训练词汇：预训练、SFT、LoRA、QLoRA、Packing、蒸馏]]
- [[Chapters/第 56 讲 偏好与推理训练：RLHF、DPO、PPO、GRPO、KL 与 Reward|第 56 讲 · 偏好与推理训练：RLHF、DPO、PPO、GRPO、KL 与 Reward]]
- [[Chapters/第 57 讲 LLM 推理：为什么有的模型又快又便宜|第 57 讲 · LLM 推理：为什么有的模型又快又便宜]]
- [[Chapters/第 58 讲 推理加速算法：KV Cache、FlashAttention、量化、推测解码|第 58 讲 · 推理加速算法：KV Cache、FlashAttention、量化、推测解码]]

## 跨领域连接

模型内部的注意力计算、系统中的检索与外部工具执行有不同职责。

- 可从这里进入：[[Areas/损失、训练与优化|损失、训练与优化]]。
- 可从这里进入：[[Areas/网络架构与 AI 工程|网络架构与 AI 工程]]。
- 推荐继续：[[Areas/检索、RAG 与 Agent|检索、RAG 与 Agent]]。
- 推荐继续：[[Areas/生成模型与多模态|生成模型与多模态]]。

## 概念间的连接

- [[Concepts/缓存与复用|缓存与复用]] → [[Concepts/键值缓存／高效注意力计算|键值缓存／高效注意力计算]]：复用模型前缀是缓存的一种专门场景。
- [[Concepts/神经网络与可微建模|神经网络与可微建模]] → [[Concepts/注意力／Transformer 架构|注意力／Transformer 架构]]：注意力模块构成可训练架构。
- [[Concepts/词元／向量表示|词元／向量表示]] → [[Concepts/注意力／Transformer 架构|注意力／Transformer 架构]]：先理解序列单位与向量输入。
- [[Concepts/注意力／Transformer 架构|注意力／Transformer 架构]] → [[Concepts/监督微调／低秩适配／量化低秩适配|监督微调／低秩适配／量化低秩适配]]：区分网络结构、训练阶段与适配方式。
- [[Concepts/监督微调／低秩适配／量化低秩适配|监督微调／低秩适配／量化低秩适配]] → [[Concepts/直接偏好优化／组相对策略优化|直接偏好优化／组相对策略优化]]：监督适配与偏好优化使用不同反馈。
- [[Concepts/注意力／Transformer 架构|注意力／Transformer 架构]] → [[Concepts/键值缓存／高效注意力计算|键值缓存／高效注意力计算]]：先理解注意力信息流再理解加速。
- [[Concepts/词元／向量表示|词元／向量表示]] → [[Concepts/词项检索评分／近似近邻图索引|词项检索评分／近似近邻图索引]]：向量表示与近邻索引承担不同职责。
- [[Concepts/策略与价值学习方法|策略与价值学习方法]] → [[Concepts/直接偏好优化／组相对策略优化|直接偏好优化／组相对策略优化]]：部分偏好训练借用策略优化思想。
