# Squared-distance Sums / Coordinate Moments

概念编号：`concept:squared-distance-moments` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/squared-distance-moments/)

## 第一层：概念入门 · 知其然

### 它是什么

For n points (x_i, y_i), retain Sx = Σx_i, Sy = Σy_i, and Q = Σ(x_i² + y_i²). At query (a, b), the total squared distance is n(a² + b²) − 2aSx − 2bSy + Q.

### 先看一个例子

例子：两点为 (0,0)、(2,0)，有 n=2、Sx=2、Sy=0、Q=4。查询 (1,1)，平方距离总和为 2×2−2×1×2+4=4，和逐点算出的 2+2 一致。若改问普通距离，不能再套用这个平方展开。

### 理解练习

用自己的话解释：上面的情景为什么是“Squared-distance Sums / Coordinate Moments”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：For n points (x_i, y_i), retain Sx = Σx_i, Sy = Σy_i, and Q = Σ(x_i² + y_i²). At query (a, b), the total squared distance is n(a² + b²) − 2aSx − 2bSy + Q.

情景依据：例子：两点为 (0,0)、(2,0)，有 n=2、Sx=2、Sy=0、Q=4。查询 (1,1)，平方距离总和为 2×2−2×1×2+4=4，和逐点算出的 2+2 一致。若改问普通距离，不能再套用这个平方展开。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Build these moments in O(n) time and evaluate q two-dimensional queries in O(q) time, using O(1) aggregate state. With modular output, reduce the expanded expression consistently and use arithmetic wide enough for every product.


### 适用边界与常见误解

The expansion is for squared distances. It does not give the sum of ordinary Euclidean distances. Coordinates and aggregate products can exceed safe integer ranges even when each coordinate fits individually.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
