# Interval DP

概念编号：`concept:interval-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/interval-dp/)

## 第一层：概念入门 · 知其然

### 定义

区间动态规划以序列的一段连续区间为子问题，保存这段区间完成任务的最优代价或方案数，再由较短区间构成较长区间的答案。关键不是出现左右端点就能用它，而是较大区间的方案能够按最后一次分割或合并归纳为完整的较小区间问题。区间包含哪些端点、允许怎样分割、合并代价如何计算，都属于问题定义。

### 概念边界与常见混淆

如果允许直接合并任意不相邻两堆，连续区间不再充分描述所有中间状态。也不能一律给区间答案加上整个区间和：那是本例的费用定义，不是区间动态规划的通用公式。

### 先看一个例子

三堆石子重量为 2、3、4，每次只能合并相邻两堆，代价是合并后的总重量。先合并 2 与 3，代价 5，再合并成 9，总代价 14；先合并 3 与 4，则为 7+9=16。最终合并的两部分分别是一段前缀和一段后缀，因此比较分割点可得到最小值 14。

### 理解练习

#### 1. 初始子问题

单独一堆石子、不需要合并时，代价应是重量还是 0？

<details><summary>答案与解释</summary>

是 0。费用只在执行合并时产生，不能把已有石子的重量当成一次操作费用。

</details>

#### 2. 分割范围

三堆最后一次合并可把第一、第三堆作为一组，第二堆作为另一组吗？

<details><summary>答案与解释</summary>

按相邻合并规则不可以。每个中间堆都对应原序列连续一段，第一与第三不能绕过第二先合成一堆。

</details>

#### 3. 费用定义

若每次合并固定收费 1，而非重量和，上例两种顺序总代价各是多少？

<details><summary>答案与解释</summary>

都为 2，因为三堆变一堆需要两次合并。说明费用规则改变时必须重写组合代价，而不能机械套用区间和。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 相邻合并代价为该段总重量，dp[l,r]存闭区间合并最小成本。
2. dp[l,r]=min_k(dp[l,k]+dp[k+1,r])+sum(l,r)，单项成本0，按长度递增。

### 具体输入与计算步骤

三堆[1,2,3]。

1. 先合1与2成本3，再合总6，总9。
2. 先合2与3成本5，再合6，总11。

计算结果：最小9，分割点枚举覆盖两种最后切分。

### 换到实际问题中应用

优化矩阵连乘括号。

1. dp保存子链最少标量乘法，分割k后加两侧结果相乘的维度成本。
2. 记录最优k回溯括号，不实际改变乘积次序。

应用结论：只改变结合顺序，不能交换矩阵。

### 举一反三：改变条件后的完整解答

把重量改为[3,2,1]，最优多少？

<details><summary>变式的推演与答案</summary>

1. 先合2与1成本3，再合6，总9。
2. 另一顺序5+6=11。

最优值仍9，但最优第一步位置反转。

</details>

### 原有解释与进一步例题


### Definition

Interval dynamic programming stores an answer for a contiguous range and builds larger ranges from smaller ones. The state must specify exactly which endpoints belong to the interval.


### Parameters and mechanism

In matrix-chain multiplication, DP[l,r] is the minimum scalar multiplication count for matrices l through r. Its recurrence is \(DP[l,r]=\min_{l\le k<r}(DP[l,k]+DP[k+1,r]+d_{l-1}d_kd_r)\). Matrix i has dimensions \(d_{i-1}\times d_i\); a single matrix needs zero multiplications.


### Example

For matrices 10×30, 30×5 and 5×60, multiplying the first two first costs 1,500+3,000=4,500. Multiplying the last two first costs 9,000+18,000=27,000. The interval state compares both parenthesizations.


### 适用边界与常见误解

The task determines the merge cost; one interval template does not fit every problem.

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/665523227a175e9e9ce26ea8d3e5b51c_MIT6_006S20_lec17.pdf)

[返回分层目录](00-learning-index.md)
