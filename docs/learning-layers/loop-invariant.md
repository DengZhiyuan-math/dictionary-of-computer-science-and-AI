# Loop Invariant

概念编号：`concept:loop-invariant` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/loop-invariant/)

## 第一层：概念入门 · 知其然

### 它是什么

循环不变量是在每次循环边界都成立的事实，用它解释程序为何不会越算越错。

### 先看一个例子

扫描[2,3,5]求和，处理前i项后s等于这i项之和。

### 理解练习

只证明最后一次循环对就够吗？

<details><summary>答案与解释</summary>

不够，还需证明初始化与每次保持。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 初始i=0、s=0等于空前缀之和，性质成立。
2. 每次加a[i]并增加i，性质保持；终止i=n时得到全数组和。

### 具体输入与计算步骤

扫描[2,3,5]求和，处理前i项后s等于这i项之和。

1. 第1次后i=1、s=2；第2次后i=2、s=5。
2. 第3次后i=3、s=10，不变量给出这是完整和。

计算结果：第3次后i=3、s=10，不变量给出这是完整和。

### 换到实际问题中应用

审查二分查找边界。

1. 明确未排除答案始终位于半开区间[l,r)，再逐分支验证保持。
2. 区间长度严格缩小保证终止，退出后再按目标语义解释l。

应用结论：区间长度严格缩小保证终止，退出后再按目标语义解释l。

### 举一反三：改变条件后的完整解答

若求和循环先令i加1再读a[i]，原证明还成立吗？

<details><summary>变式的推演与答案</summary>

1. 会跳过a[0]并在尾部访问a[n]。
2. 保持步骤被破坏，必须调整读取下标或更新顺序。

保持步骤被破坏，必须调整读取下标或更新顺序。

</details>

### 原有解释与进一步例题


### Definition

A loop invariant is a statement true at a particular point of every iteration. Correctness reasoning checks initialization, preservation and the consequence when the loop terminates.


### Parameters and mechanism

For summing an array, before iteration i the accumulator can satisfy s=Σ_{j<i} a_j. Start with i=0 and s=0; adding a_i preserves the statement for i+1; at i=n it states that s is the entire sum.


### Example

For [2,4,1], the accumulator before indices 0,1,2,3 is 0,2,6,7. The invariant explains what the partial result means, rather than only checking that this example happened to finish with 7.


### 适用边界与常见误解

Examples alone do not prove it; explain why every move preserves possible answers.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
