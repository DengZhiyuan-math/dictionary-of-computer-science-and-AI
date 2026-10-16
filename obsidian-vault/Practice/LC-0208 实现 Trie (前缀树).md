---
title: "LC 208 · 实现 Trie (前缀树)"
aliases: []
tags: ["practice","area/hot100"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# LC 208 · 实现 Trie (前缀树)

[[Areas/Hot 100 算法实践|Hot 100 算法实践]] · [官方题目](https://leetcode.cn/problems/implement-trie-prefix-tree/)

## 识别思想

字符路径共享前缀，终止标记区分单词与前缀。

- [[Concepts/前缀树|前缀树]]

## 对应讲解

[[Chapters/第 89 讲 Hot 100 · 图与前缀树：访问状态、传播层次与依赖关系|第 89 讲]] · [[Chapters/第 89 讲 Hot 100 · 图与前缀树：访问状态、传播层次与依赖关系#Trie：共享前缀与完整单词标记【重点】|直达算法思想]]

## 指定解法的复杂度

时间：单次 O(L)。

辅助空间：总 O(插入字符数)，固定字母表。

## 前提与易错点

search 与 startsWith 的结束条件不同。

## 自测

说明状态与不变式，给出一个边界例子，再说明改变哪个输入约束会使当前论证失效。
