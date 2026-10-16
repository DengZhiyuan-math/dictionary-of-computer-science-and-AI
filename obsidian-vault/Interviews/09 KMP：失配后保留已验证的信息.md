---
title: "KMP：失配后保留已验证的信息"
aliases: []
tags: ["interview","area/practice"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/口述、复习与表达|口述、复习与表达]]

## 09 · KMP：失配后保留已验证的信息

**算法 · 算法原站公开练习**

**来源：** [28. Find the Index of the First Occurrence in a String](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/)，LeetCode，核对 2026-10-16。原站公开题面可核验输入约束与任务；不证明任何公司问过此题。例子和解法由本仓库重新组织。

### 问题

找模式串在文本中的首次出现位置；要求解释如何避免反复比较重叠前缀。

### 答题思路

1. 预处理前缀函数，记录每个前缀的最长真前后缀长度。
2. 失配时模式指针退到前缀函数给出的长度，文本指针不回退。
3. 总复杂度 O(n+m)、空间 O(m)；说明字符串单位是代码点还是字节。

### 手算例子

输入：文本 "aaab"；模式 "aab"；下标从0

1. 模式前缀函数为[0,1,0]；匹配两个 a 后，文本第三个 a 与 b 失配。
2. 模式指针退回1，保留一个 a，再匹配 a、b。

结果：首次位置1

### 追问与答案

哈希匹配能不能完全替代 KMP？

<details>
<summary>查看参考答案</summary>

滚动哈希可先筛候选，但哈希碰撞使单哈希比较不是确定性证明；需验证原文或接受并说明概率保证。

</details>

**易错点：** 把真前缀包含整个字符串；或回退文本指针导致复杂度分析失效。

## 关联概念与章节

- [[Concepts/KMP 与前缀函数|KMP 与前缀函数]]
- [[Concepts/循环不变式|循环不变式]]
- [[Chapters/第 106 讲 来源面试题：官方样题、算法练习与技术追问|第 106 讲]]
- [[Chapters/第 101 讲 算法进阶 · 字符串匹配：KMP、Trie 与多模式|第 101 讲]]
- [[Chapters/第 12 讲 字符串、压缩与流式算法：海量文本怎样处理|第 12 讲]]
