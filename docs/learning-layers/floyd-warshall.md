# Floyd–Warshall / All-pairs Shortest Paths

概念编号：`concept:floyd-warshall` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/floyd-warshall/)

## 第一层：概念入门 · 知其然

### 它是什么

Initialize d[i][i] = 0, direct edges to their minimum weight, and missing edges to infinity. For each intermediate vertex k, update d[i][j] = min(d[i][j], d[i][k] + d[k][j]) for every i and j.

### 先看一个例子

例子：有 A→B=3、B→C=4、A→C=10。当中间点为 B 时，A 到 C 更新为 min(10,3+4)=7。初始化对角线为 0，缺边为无穷；发现可达负环时，不能把受影响路径当作有限最短路。

### 理解练习

用自己的话解释：上面的情景为什么是“Floyd–Warshall / All-pairs Shortest Paths”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Initialize d[i][i] = 0, direct edges to their minimum weight, and missing edges to infinity. For each intermediate vertex k, update d[i][j] = min(d[i][j], d[i][k] + d[k][j]) for every i and j.

情景依据：例子：有 A→B=3、B→C=4、A→C=10。当中间点为 B 时，A 到 C 更新为 min(10,3+4)=7。初始化对角线为 0，缺边为无穷；发现可达负环时，不能把受影响路径当作有限最短路。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Keep k as the outer loop so each stage has a complete intermediate-vertex meaning. The algorithm uses O(V³) time and O(V²) storage for V vertices. A small alphabet of directed character conversions is a natural application.


### 适用边界与常见误解

Unreachable pairs remain infinite and must not be treated as free conversions. Negative cycles can make finite shortest-path costs undefined for affected pairs.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
