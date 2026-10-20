# Monotonic Stack

概念编号：`concept:monotonic-stack` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/monotonic-stack/)

## 第一层：概念入门 · 知其然

### 定义

单调栈用后进先出的结构保存值单调排列的候选位置，常用来找每项右侧第一个更大值。扫描新值时，弹出所有更小的栈顶，它就是这些位置首次遇到的更大值；仍留在栈中的位置尚未找到答案。相同值是否弹出，取决于问题要求严格更大还是不小于。

### 概念边界与常见混淆

栈并没有对全部输入排序，弹出元素是已解决或被支配候选。各项至多进出一次带来线性总工作量，前提是每次弹出与记录答案为常数工作。

### 先看一个例子

扫描[2,1,3]：先放2，再放1；读3时依次弹1和2，两者右侧第一个更大值都是3。3最后仍在栈中，表示没有右侧更大值，而不是答案为自身。保存位置可把答案写回原对应项。

### 理解练习

#### 1. 最近

[2,4,3]中2的下一个更大值是4还是3？

<details><summary>答案与解释</summary>

是4，要求按位置最近的更大值，不是值最接近的更大数。

</details>

#### 2. 严格

[2,2]第一个2的严格更大值是第二个2吗？

<details><summary>答案与解释</summary>

不是，相等不满足严格更大；若任务改为不小于，比较规则才改变。

</details>

#### 3. 结束

扫描完仍在栈中的项如何处理？

<details><summary>答案与解释</summary>

按任务返回不存在标记，不能虚构右侧值或把自身当答案。

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
