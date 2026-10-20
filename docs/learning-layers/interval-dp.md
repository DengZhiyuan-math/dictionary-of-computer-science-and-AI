# Interval DP

概念编号：`concept:interval-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/interval-dp/)

## 第一层：概念入门 · 知其然

### 它是什么

Interval dynamic programming stores an answer for a contiguous range and builds larger ranges from smaller ones. The state must specify exactly which endpoints belong to the interval.

### 先看一个例子

For matrices 10×30, 30×5 and 5×60, multiplying the first two first costs 1,500+3,000=4,500. Multiplying the last two first costs 9,000+18,000=27,000. The interval state compares both parenthesizations.

### 理解练习

用自己的话解释：上面的情景为什么是“Interval DP”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Interval dynamic programming stores an answer for a contiguous range and builds larger ranges from smaller ones. The state must specify exactly which endpoints belong to the interval.

情景依据：For matrices 10×30, 30×5 and 5×60, multiplying the first two first costs 1,500+3,000=4,500. Multiplying the last two first costs 9,000+18,000=27,000. The interval state compares both parenthesizations.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

In matrix-chain multiplication, DP[l,r] is the minimum scalar multiplication count for matrices l through r. Its recurrence is \(DP[l,r]=\min_{l\le k<r}(DP[l,k]+DP[k+1,r]+d_{l-1}d_kd_r)\). Matrix i has dimensions \(d_{i-1}\times d_i\); a single matrix needs zero multiplications.


### 适用边界与常见误解

The task determines the merge cost; one interval template does not fit every problem.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
