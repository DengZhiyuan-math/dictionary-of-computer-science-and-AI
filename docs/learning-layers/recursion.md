# Recursion

概念编号：`concept:recursion` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/recursion/)

## 第一层：概念入门 · 知其然

### 定义

递归是函数在解决问题时调用自身或间接回到自身的方法。它需要能直接处理的基本情况，以及把其他情况化成更小或按某个良序更接近结束的子问题。每次调用拥有自己的参数和局部状态，返回后继续调用者未完成的工作；递归结构与最终运行成本是两个问题。

### 概念边界与常见混淆

尾递归是否优化取决于语言实现，不能默认深递归不占栈。重复子问题可能指数增长，需要记忆化等额外设计。

### 先看一个例子

定义非负整数阶乘：0!=1，n>0时求n×(n−1)!。算3!时先等待2!，再等待1!和0!；到0!返回1后，依次回传1、2、6。递减n保证到达基本情况；若输入−1却仍不断减一，就不会到0。

### 用一个小故事建立直觉

一队人排好队，每个人只看得见后一个人。队首问“从我开始有几个人？”每个人都问后一个人，再把答案加一。队尾直接回答“一人”，答案沿队伍传回来。队尾对应终止条件，每个人记住“还要加一”对应调用栈；如果没有人能认出队尾，这个问法就无法结束。

### 理解练习

#### 1. 基本情况

只写n!=n×(n−1)!而无0!定义完整吗？

<details><summary>答案与解释</summary>

不完整，缺少停止和返回起点，会持续调用。

</details>

#### 2. 终止

只要参数改变就一定终止吗？

<details><summary>答案与解释</summary>

不一定，必须朝基本情况推进并有良序界，负数递减反例不会到0。

</details>

#### 3. 成本

同子问题被重复调用，递归就自动复用吗？

<details><summary>答案与解释</summary>

不，普通调用重新计算，需要显式存储或其他机制。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 每次调用承诺返回当前n的阶乘，调用n−1后只需乘n。
2. 非负整数n严格下降至0，证明终止；调用栈深度O(n)。

### 具体输入与计算步骤

定义阶乘f(0)=1，f(n)=n×f(n−1)。

1. f(3)=3f(2)=3×2f(1)=3×2×1f(0)。
2. 从f(0)=1回传得到f(1)=1、f(2)=2、f(3)=6，共4次调用。

计算结果：从f(0)=1回传得到f(1)=1、f(2)=2、f(3)=6，共4次调用。

### 换到实际问题中应用

计算目录树的文件总数。

1. 为每次调用定义“返回此目录全部文件数”，对子目录递归后相加。
2. 处理符号链接或循环引用时增加访问控制，不能假设任意文件关系都是树。

应用结论：处理符号链接或循环引用时增加访问控制，不能假设任意文件关系都是树。

### 举一反三：改变条件后的完整解答

若对负数−1调用该阶乘定义，会停止吗？

<details><summary>变式的推演与答案</summary>

1. 每次n−1会离0越来越远。
2. 不会触达基例，应入口拒绝负数，而非等待栈溢出。

不会触达基例，应入口拒绝负数，而非等待栈溢出。

</details>

### 原有解释与进一步例题


### Definition

Recursion is a procedure solving a problem by calling itself on smaller or simpler instances. It requires a base case and progress toward that case. The call stack stores the suspended work of each invocation.


### Parameters and mechanism

For factorial, F(0)=1 and F(n)=nF(n-1) for nonnegative integers n. The base case stops the calls. This implementation takes O(n) multiplications and O(n) stack depth without a transformation that removes those frames.


### Example

F(3) calls F(2), then F(1), then F(0); returning upward gives 1, 1, 2, 6. A missing base case or calling F(n) again instead of a smaller instance does not make progress and can exhaust the stack.


### 适用边界与常见误解

Tree return values, search-path state, and backtracking undo have different semantics.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
