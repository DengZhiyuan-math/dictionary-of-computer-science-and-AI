# Loop Invariant

概念编号：`concept:loop-invariant` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/loop-invariant/)

## 第一层：概念入门 · 知其然

### 定义

循环不变量是在每次循环的指定边界都成立的陈述，用来连接初始状态、一次迭代和最终目标。证明需要三部分：开始前成立；若本轮开始成立，执行一轮后仍成立；退出条件与该陈述共同推出结论。它不要求每条指令之间都成立，也不单独证明循环一定结束。

### 概念边界与常见混淆

不变量必须足够强才能推出任务目标，也必须真实保持。另需有界计数等理由保证终止，不能把部分正确性当作必定返回。

### 先看一个例子

依次累加数组，约定 i 表示尚未处理的首位置，sum 是前 i 项之和。开始 i=0、sum=0；每轮加第 i 项再把 i 加一，这个关系恢复成立；退出 i 等于长度时，sum 就是全数组和。

### 理解练习

#### 1. 边界

加完一项但 i 尚未增加时，关系暂时不成立就说明证明失败吗？

<details><summary>答案与解释</summary>

不必，只要求声明的循环边界成立，必须明确检查时点。

</details>

#### 2. 初始

把 sum 初始为 1，原不变量成立吗？

<details><summary>答案与解释</summary>

不成立，前零项之和为零；除非任务和不变量一起改变。

</details>

#### 3. 终止

循环永远不增加 i，能否仅靠不变量证明完成求和？

<details><summary>答案与解释</summary>

不能，关系可能一直成立但永不退出；还需进展与终止论证。

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
