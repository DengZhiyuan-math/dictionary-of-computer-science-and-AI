# Graph Core / Degree Peeling

概念编号：`concept:graph-core-peeling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/graph-core-peeling/)

## 第一层：概念入门 · 知其然

### 它是什么

图的k核是每个点在剩余图中至少有k个邻居的最大诱导子图，像不断淘汰支撑不足的成员。

### 先看一个例子

三角形A、B、C，另接无向尾边B—D，求2核。

### 理解练习

只检查一开始的度数够吗？

<details><summary>答案与解释</summary>

不够，删点会减少邻居度数，必须连锁更新。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 度数低于k的点不可能属于任何最小度至少k的子图，可安全删除。
2. 每删一点就更新仍存邻居，所有不合格点入队；最终剩余满足条件且包含所有可行子图。

### 具体输入与计算步骤

三角形A、B、C，另接无向尾边B—D，求2核。

1. 初始度A=2、B=3、C=2、D=1，D先入队删除。
2. B降为2，三角形各度2，2核留下3点A、B、C。

计算结果：B降为2，三角形各度2，2核留下3点A、B、C。

### 换到实际问题中应用

寻找每位成员至少有两个内部联系的社群候选。

1. 用当前度数与邻接表迭代剥离，记录被移除的必选成员。
2. 若必选点被删则约束不可行；剩余k核未必连通，也不等于强凝聚或无桥证明。

应用结论：若必选点被删则约束不可行；剩余k核未必连通，也不等于强凝聚或无桥证明。

### 举一反三：改变条件后的完整解答

同一图把k提高到3，结果怎样？

<details><summary>变式的推演与答案</summary>

1. A、C、D初始都低于3，删除后B失去邻居也低于3。
2. 全部剥离，3核为空，不能只保留初始度3的B。

全部剥离，3核为空，不能只保留初始度3的B。

</details>

### 原有解释与进一步例题


### 原理与推演

Initialize degrees and enqueue every vertex below the threshold. Removing a vertex reduces each surviving neighbor's degree; enqueue a neighbor when it becomes ineligible. Queue processing with adjacency lists takes O(V + E) time and O(V + E) total storage.

Any feasible induced subgraph with minimum degree at least k survives every removal: a vertex currently below k cannot belong to such a subgraph. This invariant proves both the pruning rule and the maximality of the remainder. A required vertex removed during peeling makes a constrained planting problem impossible.


### 例子

例子：三角形 A、B、C 加一条 B→D 的无向尾边，求 2-core 时先删除度为 1 的 D，留下三角形。阈值升到 3 时，删除 A、C 后会连锁使 B 也不合格；必须递归更新剩余度数。


### 适用边界与常见误解

Use current degrees after removals. Core membership differs from connected-component membership; even a 2-core can contain a bridge joining two cyclic regions.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/cs/0310049)

[返回分层目录](00-learning-index.md)
