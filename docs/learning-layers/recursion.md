# Recursion

概念编号：`concept:recursion` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/recursion/)

## 第一层：概念入门 · 知其然

### 它是什么

递归是把一个问题交给同样的方法处理更小的子问题，再把子问题的结果接回来。必须有能直接回答的终止情形，而且每次调用都要向它靠近。

### 先看一个例子

计算 3! 时，先等 2! 的结果；计算 2! 时，先等 1!；约定 $0! = 1$ 后，逐层返回得到 1、1、2、6。每一层都要记住返回后还要乘的数。

### 用一个小故事建立直觉

一队人排好队，每个人只看得见后一个人。队首问“从我开始有几个人？”每个人都问后一个人，再把答案加一。队尾直接回答“一人”，答案沿队伍传回来。队尾对应终止条件，每个人记住“还要加一”对应调用栈；如果没有人能认出队尾，这个问法就无法结束。

### 理解练习

函数调用了自己，就一定是正确的递归吗？

<details><summary>答案与解释</summary>

不一定。还要有终止条件，并保证子问题在合法输入下能到达它。例如计算 F(n) 时仍调用 F(n)，问题没有缩小，会持续调用而不能得到结果。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Definition

Recursion is a procedure solving a problem by calling itself on smaller or simpler instances. It requires a base case and progress toward that case. The call stack stores the suspended work of each invocation.


### Parameters and mechanism

For factorial, F(0)=1 and F(n)=nF(n-1) for nonnegative integers n. The base case stops the calls. This implementation takes O(n) multiplications and O(n) stack depth without a transformation that removes those frames.


### Example

F(3) calls F(2), then F(1), then F(0); returning upward gives 1, 1, 2, 6. A missing base case or calling F(n) again instead of a smaller instance does not make progress and can exhaust the stack.


### 适用边界与常见误解

Tree return values, search-path state, and backtracking undo have different semantics.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
