# Monotonic Stack

概念编号：`concept:monotonic-stack` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/monotonic-stack/)

## 第一层：概念入门 · 知其然

### 它是什么

单调栈保存尚未找到答案的元素，用新元素一次解决一批“下一个更大值”问题。

### 先看一个例子

数组[2,1,3]，找右侧第一个更大元素。

### 理解练习

为2找到更大值3后还要继续搜索吗？

<details><summary>答案与解释</summary>

不用，按顺序扫描保证这是第一个。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 栈内值保持不增，新值更大时不断弹出并赋答案。
2. 每个下标只入出一次，总时间O(n)，未弹出的元素无更大后继。

### 具体输入与计算步骤

数组[2,1,3]，找右侧第一个更大元素。

1. 先压2、1，栈为[2,1]。
2. 遇3依次弹1、2并赋3，最终答案[3,3,无]。

计算结果：遇3依次弹1、2并赋3，最终答案[3,3,无]。

### 换到实际问题中应用

计算每天要等多久才遇到更暖天气。

1. 栈存天数下标，遇更高温时用当前下标减被弹下标。
2. 得等待天数，留栈者按约定填0。

应用结论：得等待天数，留栈者按约定填0。

### 举一反三：改变条件后的完整解答

若数组为[2,2,3]，比较符号用大于还是大于等于？

<details><summary>变式的推演与答案</summary>

1. 题目要求严格更大，第二个2不能解决第一个2。
2. 只在新值严格大于栈顶时弹，两个2都由3解决。

只在新值严格大于栈顶时弹，两个2都由3解决。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
