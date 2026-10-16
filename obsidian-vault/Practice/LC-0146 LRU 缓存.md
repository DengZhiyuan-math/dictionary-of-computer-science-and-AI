---
title: "LC 146 · LRU 缓存"
aliases: []
tags: ["practice","area/hot100"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# LC 146 · LRU 缓存

[[Areas/Hot 100 算法实践|Hot 100 算法实践]] · [官方题目](https://leetcode.cn/problems/lru-cache/)

## 识别思想

哈希表定位节点，双向链表维护最近使用顺序。

- [[Concepts/缓存与复用|缓存与复用]]
- [[Concepts/哈希表|哈希表]]

## 对应讲解

[[Chapters/第 87 讲 Hot 100 · 链表：连接关系、指针距离与组合数据结构|第 87 讲]] · [[Chapters/第 87 讲 Hot 100 · 链表：连接关系、指针距离与组合数据结构#LRU：哈希表管定位，双向链表管最近使用顺序【重点精学】|直达算法思想]]

## 指定解法的复杂度

时间：get/put 期望 O(1)。

辅助空间：O(capacity)。

## 前提与易错点

读取和更新都刷新顺序，淘汰时同步删映射。

## 自测

说明状态与不变式，给出一个边界例子，再说明改变哪个输入约束会使当前论证失效。
