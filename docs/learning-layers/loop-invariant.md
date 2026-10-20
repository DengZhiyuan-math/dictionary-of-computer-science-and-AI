# Loop Invariant

概念编号：`concept:loop-invariant` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/loop-invariant/)

## 第一层：概念入门 · 知其然

### 它是什么

A loop invariant is a statement true at a particular point of every iteration. Correctness reasoning checks initialization, preservation and the consequence when the loop terminates.

### 先看一个例子

For [2,4,1], the accumulator before indices 0,1,2,3 is 0,2,6,7. The invariant explains what the partial result means, rather than only checking that this example happened to finish with 7.

### 理解练习

用自己的话解释：上面的情景为什么是“Loop Invariant”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A loop invariant is a statement true at a particular point of every iteration. Correctness reasoning checks initialization, preservation and the consequence when the loop terminates.

情景依据：For [2,4,1], the accumulator before indices 0,1,2,3 is 0,2,6,7. The invariant explains what the partial result means, rather than only checking that this example happened to finish with 7.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For summing an array, before iteration i the accumulator can satisfy s=Σ_{j<i} a_j. Start with i=0 and s=0; adding a_i preserves the statement for i+1; at i=n it states that s is the entire sum.


### 适用边界与常见误解

Examples alone do not prove it; explain why every move preserves possible answers.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
