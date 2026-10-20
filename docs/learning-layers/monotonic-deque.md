# Monotonic Deque

概念编号：`concept:monotonic-deque` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/monotonic-deque/)

## 第一层：概念入门 · 知其然

### 它是什么

For a sliding-window maximum, a deque stores indices in nonincreasing order of their values. When a new value arrives, remove indices from the back while their values are no greater: the new value is at least as large and expires later. Remove the front index when it leaves the window. The remaining front gives the current maximum.

### 先看一个例子

For example, the window sweeps through one, three, and two. When three enters, one can be eliminated, but two cannot eliminate three. Each index can enter and exit the queue once at most, so the amortized time is linear. Use a queue that supports constant-time operations on both ends; deleting the head of an ordinary array in some languages will move elements, and it cannot be claimed that the implementation is still linear.

### 理解练习

用自己的话解释：上面的情景为什么是“Monotonic Deque”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：For a sliding-window maximum, a deque stores indices in nonincreasing order of their values. When a new value arrives, remove indices from the back while their values are no greater: the new value is at least as large and expires later. Remove the front index when it leaves the window. The remaining front gives the current maximum.

情景依据：For example, the window sweeps through one, three, and two. When three enters, one can be eliminated, but two cannot eliminate three. Each index can enter and exit the queue once at most, so the amortized time is linear. Use a queue that supports constant-time operations on both ends; deleting the head of an ordinary array in some languages will move elements, and it cannot be claimed that the implementation is still linear.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

For a sliding-window maximum, a deque stores indices in nonincreasing order of their values. When a new value arrives, remove indices from the back while their values are no greater: the new value is at least as large and expires later. Remove the front index when it leaves the window. The remaining front gives the current maximum.

For example, the window sweeps through one, three, and two. When three enters, one can be eliminated, but two cannot eliminate three. Each index can enter and exit the queue once at most, so the amortized time is linear. Use a queue that supports constant-time operations on both ends; deleting the head of an ordinary array in some languages will move elements, and it cannot be claimed that the implementation is still linear.


### 适用边界与常见误解

This differs from a monotonic stack. Linear-time array-front deletion can degrade the implementation.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
