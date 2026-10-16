---
title: "注意力／Transformer 架构"
aliases: ["Attention / Transformer"]
tags: ["concept","area/llm"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# 注意力／Transformer 架构

**Attention / Transformer** · [[Areas/LLM 训练与推理|LLM 训练与推理]]

## 定义

注意力按相关性聚合信息，Transformer 以相关模块组织序列计算。

## 易混点与边界

注意力权重不自动等同于因果解释。

## 推荐先修

- [[Concepts/神经网络与可微建模|神经网络与可微建模]]：注意力模块构成可训练架构。
- [[Concepts/词元／向量表示|词元／向量表示]]：先理解序列单位与向量输入。

## 继续学习

- [[Concepts/监督微调／低秩适配／量化低秩适配|监督微调／低秩适配／量化低秩适配]]：区分网络结构、训练阶段与适配方式。
- [[Concepts/键值缓存／高效注意力计算|键值缓存／高效注意力计算]]：先理解注意力信息流再理解加速。

## 应用、关联与对照

结合领域入口中的概念与章节继续扩展。

## 章节依据

- [[Chapters/第 53 讲 Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE|第 53 讲 · Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE]] · [[Chapters/第 53 讲 Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE#Query、Key、Value、Attention Score【重点精学】|直达解释小节]]

## 所在路线

- [[Routes/LLM 系统地图|LLM 系统地图]]

## 具体案例与可视化

- [[Examples/15 注意力：分数、归一化与加权求和|案例 15 · 注意力：分数、归一化与加权求和]]
- [[Examples/29 KV cache：复用的是哪些计算|案例 29 · KV cache：复用的是哪些计算]]

## 面试准备题

- [[Interviews/32 注意力mask：先归一化还是先屏蔽|面试 32 · 注意力mask：先归一化还是先屏蔽]]
