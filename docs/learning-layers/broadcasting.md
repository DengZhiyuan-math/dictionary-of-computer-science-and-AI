# Broadcasting

概念编号：`concept:broadcasting` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/broadcasting/)

## 第一层：概念入门 · 知其然

### 它是什么

Broadcasting aligns tensor dimensions so an elementwise operation can apply to compatible shapes without explicitly copying a smaller input along every dimension.

### 先看一个例子

Adding shapes [3,1] and [1,4] produces [3,4]. Adding [3] and [4] fails because the trailing dimensions are unequal and neither is 1. An unintended but valid broadcast can silently produce the wrong computation.

### 理解练习

用自己的话解释：上面的情景为什么是“Broadcasting”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Broadcasting aligns tensor dimensions so an elementwise operation can apply to compatible shapes without explicitly copying a smaller input along every dimension.

情景依据：Adding shapes [3,1] and [1,4] produces [3,4]. Adding [3] and [4] fails because the trailing dimensions are unequal and neither is 1. An unintended but valid broadcast can silently produce the wrong computation.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

Compare dimensions from the trailing axis: they must be equal or one must be 1; missing leading dimensions act as 1. The output uses the larger size on each aligned dimension. Broadcasting is a shape rule, independent of arithmetic precision.


### 适用边界与常见误解

A valid broadcast can still compute the wrong quantity.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
