# Interval DP

概念编号：`concept:interval-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/interval-dp/)

## 第一层：概念入门 · 知其然

### 它是什么

区间动态规划给连续一段定义答案，把大区间按分割点组合成小区间答案；端点和合并费用必须明确。

### 先看一个例子

先合并相邻小堆，再合成大堆，合并顺序不同会产生不同总费用。

### 理解练习

三堆合并为何要比较第一步顺序？

<details><summary>答案与解释</summary>

每次费用按当前合并重量计，不同顺序重复计入的重量不同。

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
