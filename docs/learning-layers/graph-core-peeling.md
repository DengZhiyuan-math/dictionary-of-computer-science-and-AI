# Graph Core / Degree Peeling

概念编号：`concept:graph-core-peeling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/graph-core-peeling/)

## 第一层：概念入门 · 知其然

### 它是什么

Initialize degrees and enqueue every vertex below the threshold. Removing a vertex reduces each surviving neighbor's degree; enqueue a neighbor when it becomes ineligible. Queue processing with adjacency lists takes O(V + E) time and O(V + E) total storage.

### 先看一个例子

例子：三角形 A、B、C 加一条 B→D 的无向尾边，求 2-core 时先删除度为 1 的 D，留下三角形。阈值升到 3 时，删除 A、C 后会连锁使 B 也不合格；必须递归更新剩余度数。

### 理解练习

用自己的话解释：上面的情景为什么是“Graph Core / Degree Peeling”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Initialize degrees and enqueue every vertex below the threshold. Removing a vertex reduces each surviving neighbor's degree; enqueue a neighbor when it becomes ineligible. Queue processing with adjacency lists takes O(V + E) time and O(V + E) total storage.

情景依据：例子：三角形 A、B、C 加一条 B→D 的无向尾边，求 2-core 时先删除度为 1 的 D，留下三角形。阈值升到 3 时，删除 A、C 后会连锁使 B 也不合格；必须递归更新剩余度数。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Any feasible induced subgraph with minimum degree at least k survives every removal: a vertex currently below k cannot belong to such a subgraph. This invariant proves both the pruning rule and the maximality of the remainder. A required vertex removed during peeling makes a constrained planting problem impossible.


### 适用边界与常见误解

Use current degrees after removals. Core membership differs from connected-component membership; even a 2-core can contain a bridge joining two cyclic regions.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
