# LIS Tails

概念编号：`concept:lis-tails` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/lis-tails/)

## 第一层：概念入门 · 知其然

### 它是什么

The tails method finds the length of a longest strictly increasing subsequence. tails[k] is the smallest achievable ending value of an increasing subsequence of length k+1 among processed inputs.

### 先看一个例子

Processing [3,1,2] changes tails from [3] to [1] to [1,2], so the length is 2. The strict version uses the first value ≥x; choosing the first value >x instead addresses a nondecreasing variant.

### 理解练习

用自己的话解释：上面的情景为什么是“LIS Tails”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：The tails method finds the length of a longest strictly increasing subsequence. tails[k] is the smallest achievable ending value of an increasing subsequence of length k+1 among processed inputs.

情景依据：Processing [3,1,2] changes tails from [3] to [1] to [1,2], so the length is 2. The strict version uses the first value ≥x; choosing the first value >x instead addresses a nondecreasing variant.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For each x, replace the first tails value greater than or equal to x, or append if none exists. Binary search gives O(n log n). tails is a summary of best endpoints, not necessarily one actual subsequence; reconstruction needs predecessor information.


### 适用边界与常见误解

tails need not itself be a subsequence of the input. Reconstruction requires additional predecessor information.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
