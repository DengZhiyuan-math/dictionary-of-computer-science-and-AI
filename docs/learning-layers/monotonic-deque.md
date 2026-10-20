# Monotonic Deque

概念编号：`concept:monotonic-deque` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/monotonic-deque/)

## 第一层：概念入门 · 知其然

### 它是什么

单调队列保留窗口内可能成为最大值的候选，让滑动窗口最大值可线性计算。

### 先看一个例子

数组[1,3,2,5]，窗口长度3。

### 理解练习

队尾更小元素为什么可以删？

<details><summary>答案与解释</summary>

新元素更大且更晚过期，小元素再也不能成为未来窗口最大值。

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
