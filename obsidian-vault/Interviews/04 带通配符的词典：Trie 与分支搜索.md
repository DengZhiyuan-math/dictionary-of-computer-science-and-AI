---
title: "带通配符的词典：Trie 与分支搜索"
aliases: []
tags: ["interview","area/practice"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/口述、复习与表达|口述、复习与表达]]

## 04 · 带通配符的词典：Trie 与分支搜索

**算法 · 算法原站公开练习**

**来源：** [211. Design Add and Search Words Data Structure](https://leetcode.com/problems/design-add-and-search-words-data-structure/)，LeetCode，核对 2026-10-16。原站公开题面可核验输入约束与任务；不证明任何公司问过此题。例子和解法由本仓库重新组织。

### 问题

支持插入小写单词和查询；查询中的点恰好匹配一个字母。

### 答题思路

1. Trie 节点保存子节点及结束标记，插入长度 L 单词需 O(L)。
2. 普通字符走唯一边，点枚举已有子边，搜索状态为节点与查询位置。
3. 只有耗尽查询且结束标记为真才成功；最坏搜索可能遍历大量分支，不能一概称 O(L)。

### 手算例子

输入：插入 ["cat","car","dog"]；查询 "ca." 与 "ca"

1. "ca." 到 c→a 后枚举 t、r，至少一个结束节点。
2. "ca" 到 a 时没有结束标记。

结果：true、false

### 追问与答案

点能否匹配零个或多个字母？

<details>
<summary>查看参考答案</summary>

本题不能；那是另一种模式语言，需要重新定义状态转移，避免将正则星号语义带入。

</details>

**易错点：** 只判断路径存在，不检查单词结束；或把通配分支复杂度省略。

## 关联概念与章节

- [[Concepts/前缀树|前缀树]]
- [[Concepts/回溯／剪枝|回溯／剪枝]]
- [[Chapters/第 106 讲 来源面试题：官方样题、算法练习与技术追问|第 106 讲]]
- [[Chapters/第 89 讲 Hot 100 · 图与前缀树：访问状态、传播层次与依赖关系|第 89 讲]]
