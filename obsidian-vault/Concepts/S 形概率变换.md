---
title: "S 形概率变换"
aliases: ["Sigmoid"]
tags: ["concept","area/data-evaluation"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# S 形概率变换

**Sigmoid** · [[Areas/数据、任务与评估|数据、任务与评估]]

## 定义

把一个实数分数映射到零和一之间，常用于二元标签的概率。

## 易混点与边界

BCEWithLogitsLoss 前通常不要重复调用它。

## 推荐先修

可先结合下面的章节读定义与例子；没有额外指定的先修关系。

## 继续学习

可沿下方的应用、对照与章节继续阅读。

## 应用、关联与对照

- **用于或帮助实现** [[Concepts/概率变换前的分数|概率变换前的分数]]：单分数可变为二元概率。
- **有解释的关联** [[Concepts/二元交叉熵|二元交叉熵]]：概率形式 BCE 常接收二元概率。

## 章节依据

- [[Chapters/第 22 讲 训练词汇起点：样本、张量、标签、Logit 与概率|第 22 讲 · 训练词汇起点：样本、张量、标签、Logit 与概率]] · [[Chapters/第 22 讲 训练词汇起点：样本、张量、标签、Logit 与概率#Logit、Sigmoid、Softmax【重点精学】|直达解释小节]]
