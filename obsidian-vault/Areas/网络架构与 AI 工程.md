---
title: "网络架构与 AI 工程"
aliases: []
tags: ["area","area/architectures"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# 网络架构与 AI 工程

[[00-知识地图|知识地图]]

**核心问题：** 不同结构怎样表达数据，又怎样部署成可维护系统？

比较 CNN、序列网络、图网络、Transformer 等归纳偏置，并联系部署和 MLOps。

## 概念入口

- [[Concepts/卷积与视觉归纳偏置|卷积与视觉归纳偏置]]：利用局部连接与权重共享学习视觉模式，并通过残差等结构组织深层计算。
- [[Concepts/循环、状态与序列|循环、状态与序列]]：通过随序列更新的隐藏状态汇总历史，门控结构调节信息保留。
- [[Concepts/部署、监控与 MLOps|部署、监控与 MLOps]]：将模型训练、版本、部署和线上监控连接成可维护的工程流程。

## 章节原文

- [[Chapters/第 48 讲 深度学习架构：CNN、RNN、Transformer 与视觉模型|第 48 讲 · 深度学习架构：CNN、RNN、Transformer 与视觉模型]]
- [[Chapters/第 49 讲 视觉网络细节：卷积、Pooling、ResNet、U-Net、YOLO、DETR|第 49 讲 · 视觉网络细节：卷积、Pooling、ResNet、U-Net、YOLO、DETR]]
- [[Chapters/第 50 讲 序列与图网络：RNN、LSTM、GRU、GCN、GAT、Mamba|第 50 讲 · 序列与图网络：RNN、LSTM、GRU、GCN、GAT、Mamba]]
- [[Chapters/第 51 讲 真实 AI 项目：数据、部署、监控与 MLOps|第 51 讲 · 真实 AI 项目：数据、部署、监控与 MLOps]]

## 跨领域连接

架构改变信息流；数据、损失与验证决定学什么、如何检验。

- 可从这里进入：[[Areas/数据库、网络与分布式|数据库、网络与分布式]]。
- 可从这里进入：[[Areas/损失、训练与优化|损失、训练与优化]]。
- 推荐继续：[[Areas/LLM 训练与推理|LLM 训练与推理]]。
- 推荐继续：[[Areas/生成模型与多模态|生成模型与多模态]]。

## 概念间的连接

- [[Concepts/神经网络与可微建模|神经网络与可微建模]] → [[Concepts/卷积与视觉归纳偏置|卷积与视觉归纳偏置]]：卷积以结构偏好组织可学习变换。
- [[Concepts/神经网络与可微建模|神经网络与可微建模]] → [[Concepts/循环、状态与序列|循环、状态与序列]]：循环结构引入序列状态。
- [[Concepts/智能体|智能体]] → [[Concepts/部署、监控与 MLOps|部署、监控与 MLOps]]：状态、失败恢复与监控需要工程支撑。
