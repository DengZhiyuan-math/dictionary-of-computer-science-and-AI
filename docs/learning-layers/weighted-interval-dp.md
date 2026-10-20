# Weighted Interval Scheduling

概念编号：`concept:weighted-interval-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/weighted-interval-dp/)

## 第一层：概念入门 · 知其然

### 它是什么

Weighted interval scheduling selects nonoverlapping intervals to maximize total weight. Sorting by finish time makes the final selected interval support a useful recurrence.

### 先看一个例子

Suppose A=[0,2] has weight 4, B=[2,4] weight 5 and C=[0,4] weight 8, allowing touching endpoints. A+B earns 9 and beats C. Choosing the highest individual weight first would miss this result.

### 理解练习

用自己的话解释：上面的情景为什么是“Weighted Interval Scheduling”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Weighted interval scheduling selects nonoverlapping intervals to maximize total weight. Sorting by finish time makes the final selected interval support a useful recurrence.

情景依据：Suppose A=[0,2] has weight 4, B=[2,4] weight 5 and C=[0,4] weight 8, allowing touching endpoints. A+B earns 9 and beats C. Choosing the highest individual weight first would miss this result.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

Let p(i) be the last earlier interval compatible with interval i, and w_i its weight. Then DP[i]=max(DP[i-1],w_i+DP[p(i)]), with DP[0]=0. Define endpoint compatibility explicitly; binary search can compute predecessor indices.


### 适用边界与常见误解

Maximizing task count differs from maximizing reward; earliest-finish greedy does not apply unconditionally.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
