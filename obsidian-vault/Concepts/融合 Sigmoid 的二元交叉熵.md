---
title: "融合 Sigmoid 的二元交叉熵"
aliases: ["BCEWithLogitsLoss"]
tags: ["concept","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# 融合 Sigmoid 的二元交叉熵

**BCEWithLogitsLoss** · [[Areas/损失、训练与优化|损失、训练与优化]]

## 定义

直接接收 logits，在内部稳定地合并 Sigmoid 与 BCE。

## 易混点与边界

目标应为同形状浮点张量；不要在输入端重复 Sigmoid。

## 推荐先修

- [[Concepts/概率变换前的分数|概率变换前的分数]]：融合损失直接接收原始分数。

## 继续学习

可沿下方的应用、对照与章节继续阅读。

## 应用、关联与对照

- **有解释的关联** [[Concepts/二元交叉熵|二元交叉熵]]：相同目标的稳定融合实现。

## 章节依据

- [[Chapters/第 41 讲 损失函数第一讲：BCE、交叉熵、MSE 为什么不同|第 41 讲 · 损失函数第一讲：BCE、交叉熵、MSE 为什么不同]] · [[Chapters/第 41 讲 损失函数第一讲：BCE、交叉熵、MSE 为什么不同#BCELoss 与 BCEWithLogitsLoss【重点】|直达解释小节]]

## 所在路线

- [[Routes/训练流程地图|训练流程地图]]

## 具体案例与可视化

- [[Examples/12 BCE：同样判错，损失差多少|案例 12 · BCE：同样判错，损失差多少]]
