# Monotonic Deque

概念编号：`concept:monotonic-deque` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/monotonic-deque/)

## 第一层：概念入门 · 知其然

### 定义

单调双端队列维护一组按值单调排列的候选索引，常用于滑动窗口最值。求最大值时，新值到来会从队尾移走不大于它的旧候选：它更晚过期、值又不小，旧候选此后不会胜过它。队首移走已离开窗口的索引，剩余队首就是当前最大值。保存索引才能同时判断位置和数值。

### 概念边界与常见混淆

每项至多入队和出队一次，所以整段处理为线性工作量，不代表每个时刻严格只做一次操作。它不直接给出中位数或所有排序结果。

### 先看一个例子

数组[4,2,3,1]、窗口宽度3。读3时，2被队尾删除，因为3更大且更晚进入；首窗最大4。滑到[2,3,1]时，4过期离队，队首3给出新最大。被删除的2仍在原数组，只是不再是最大候选。

### 理解练习

#### 1. 支配

为什么3能永久取代更早的2？

<details><summary>答案与解释</summary>

它值更大且不会比2更早过期；任何未来同时含两者的窗口都不需2作为最大值。

</details>

#### 2. 过期

4虽最大，离开窗口后还能保留在队首吗？

<details><summary>答案与解释</summary>

不能，结果必须只来自当前窗口，需按索引删除过期项。

</details>

#### 3. 信息

队列删了2，是否还能直接回答窗口所有元素的排序？

<details><summary>答案与解释</summary>

不能，它只保留最值候选，故意丢弃了其他查询需要的信息。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 队列存下标，值从头到尾不增；队头过期时删除。
2. 每个下标最多入队一次、出队一次，全部操作O(n)。

### 具体输入与计算步骤

数组[1,3,2,5]，窗口长度3。

1. 读1后候选[1]；读3删除1得到[3]；读2得到[3,2]，首窗最大3。
2. 读5删2和3得[5]，第二窗最大5，输出[3,5]。

计算结果：读5删2和3得[5]，第二窗最大5，输出[3,5]。

### 换到实际问题中应用

监测最近60秒请求延迟的最大值。

1. 按时间戳删除过期队头，按延迟删除被新值支配的队尾。
2. 队头始终给出当前时间窗口最大值，不需重扫全部请求。

应用结论：队头始终给出当前时间窗口最大值，不需重扫全部请求。

### 举一反三：改变条件后的完整解答

窗口长度改1，输出如何？

<details><summary>变式的推演与答案</summary>

1. 每个旧下标在下一个到来时立即过期。
2. 每窗只有自身，输出[1,3,2,5]。

每窗只有自身，输出[1,3,2,5]。

</details>

### 原有解释与进一步例题


### 原理与推演

For a sliding-window maximum, a deque stores indices in nonincreasing order of their values. When a new value arrives, remove indices from the back while their values are no greater: the new value is at least as large and expires later. Remove the front index when it leaves the window. The remaining front gives the current maximum.

For example, the window sweeps through one, three, and two. When three enters, one can be eliminated, but two cannot eliminate three. Each index can enter and exit the queue once at most, so the amortized time is linear. Use a queue that supports constant-time operations on both ends; deleting the head of an ordinary array in some languages will move elements, and it cannot be claimed that the implementation is still linear.


### 适用边界与常见误解

This differs from a monotonic stack. Linear-time array-front deletion can degrade the implementation.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
