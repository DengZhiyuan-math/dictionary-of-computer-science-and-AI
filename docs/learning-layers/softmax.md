# Softmax

概念编号：`concept:softmax` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/softmax/)

## 第一层：概念入门 · 知其然

### 它是什么

Softmax converts a vector of real class scores into nonnegative values summing to one. It is commonly used for a choice among mutually exclusive classes.

### 先看一个例子

Scores [0,log(2)] produce probabilities [1/3,2/3]. Adding 100 to both scores gives the same probabilities. Increasing one class score changes the other probabilities through the shared denominator.

### 理解练习

用自己的话解释：上面的情景为什么是“Softmax”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Softmax converts a vector of real class scores into nonnegative values summing to one. It is commonly used for a choice among mutually exclusive classes.

情景依据：Scores [0,log(2)] produce probabilities [1/3,2/3]. Adding 100 to both scores gives the same probabilities. Increasing one class score changes the other probabilities through the shared denominator.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For K scores z_j, p_i=exp(z_i)/Σ_j exp(z_j). Subtracting the same constant from every score leaves the result unchanged; subtracting the maximum before exponentiation improves numerical stability.


### 适用边界与常见误解

Independent multilabel outputs do not require mutually exclusive softmax merely because many labels exist.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
