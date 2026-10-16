---
title: "Bellman-Ford 与负环"
aliases: ["Bellman-Ford"]
tags: ["concept","area/algorithms"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# Bellman-Ford 与负环

**Bellman-Ford** · [[Areas/数据结构与算法|数据结构与算法]]

## 定义

重复松弛处理负边，并区分源点可达负环的影响。

## 易混点与边界

不可达负环不会自动使该源点的全部结果失效。

## 推荐先修

可先结合下面的章节读定义与例子；没有额外指定的先修关系。

## 继续学习

可沿下方的应用、对照与章节继续阅读。

## 应用、关联与对照

- **需要区分** [[Concepts/非负权最短路算法|非负权最短路算法]]：非负权的确认规则与允许负边的重复松弛不同。

## 章节依据

- [[Chapters/第 99 讲 算法进阶 · 有权最短路：松弛、优先队列与负环|第 99 讲 · 算法进阶 · 有权最短路：松弛、优先队列与负环]]

## 具体案例与可视化

- [[Examples/34 负环：先问它是否可达|案例 34 · 负环：先问它是否可达]]
