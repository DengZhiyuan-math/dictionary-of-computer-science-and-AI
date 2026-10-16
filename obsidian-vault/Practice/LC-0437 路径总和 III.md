---
title: "LC 437 · 路径总和 III"
aliases: []
tags: ["practice","area/hot100"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# LC 437 · 路径总和 III

[[Areas/Hot 100 算法实践|Hot 100 算法实践]] · [官方题目](https://leetcode.cn/problems/path-sum-iii/)

## 识别思想

沿祖先链维护前缀和频次，进入增加、退出撤销。

- [[Concepts/前缀和|前缀和]]

## 对应讲解

[[Chapters/第 88 讲 Hot 100 · 二叉树：返回给父节点什么，在哪里更新答案|第 88 讲]] · [[Chapters/第 88 讲 Hot 100 · 二叉树：返回给父节点什么，在哪里更新答案#Tree Prefix Sum：路径状态必须回溯撤销【重点精学】|直达算法思想]]

## 指定解法的复杂度

时间：期望 O(n)。

辅助空间：O(h)，归零时删键。

## 前提与易错点

不要把兄弟分支的前缀留在表里。

## 自测

说明状态与不变式，给出一个边界例子，再说明改变哪个输入约束会使当前论证失效。
