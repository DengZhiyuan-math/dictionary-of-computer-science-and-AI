# Monotonic Stack

概念编号：`concept:monotonic-stack` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/monotonic-stack/)

## 第一层：概念入门 · 知其然

### 它是什么

Daily Temperatures maintains a stack of indices with nonincreasing temperatures. When a warmer temperature arrives, repeatedly pop indices; the difference between the current index and the popped index is the waiting time. The stack contains positions whose answers are unresolved, and popped positions need no further work. Each index is pushed and popped once, giving linear total work by amortized analysis. Equal temperature is not warmer, so it must not resolve an earlier position.

### 先看一个例子

For temperatures [20,24,22,27,21], find how many days each position waits for a warmer day. The stack stores indices whose answers are unresolved.
Waiting times are [1,2,1,0,0]. Each index is pushed and popped at most once: time O(n), auxiliary space O(n).

### 理解练习

What changes for [20,20,21]?

<details><summary>答案与解释</summary>

The result is [2,1,0]. The second 20 does not pop the first 20.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Daily Temperatures maintains a stack of indices with nonincreasing temperatures. When a warmer temperature arrives, repeatedly pop indices; the difference between the current index and the popped index is the waiting time. The stack contains positions whose answers are unresolved, and popped positions need no further work. Each index is pushed and popped once, giving linear total work by amortized analysis. Equal temperature is not warmer, so it must not resolve an earlier position.


### 适用边界与常见误解

Linear total work follows because each item enters and leaves at most once. Specify comparisons for equal values.

### 例题：Monotonic Stack: Resolve Waiting Time When Popping

For temperatures [20,24,22,27,21], find how many days each position waits for a warmer day. The stack stores indices whose answers are unresolved.

1. Day 1 has temperature 24, warmer than day 0 at 20. Pop index 0 and set its answer to 1.
2. Day 2 at 22 is not warmer than 24, so push it. Day 3 at 27 first pops index 2 and records 1, then pops index 1 and records 2.
3. Indices 3 and 4 have no later warmer day, so their answers remain 0.

结果：Waiting times are [1,2,1,0,0]. Each index is pushed and popped at most once: time O(n), auxiliary space O(n).

易错点：The task requires a strictly warmer day, so equal temperatures do not resolve an answer. Store indices, not only values, to calculate distances.

变式：What changes for [20,20,21]?

参考答案：The result is [2,1,0]. The second 20 does not pop the first 20.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
