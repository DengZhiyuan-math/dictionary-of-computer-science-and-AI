# Graph Core / Degree Peeling

概念编号：`concept:graph-core-peeling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/graph-core-peeling/)

## 第一层：概念入门 · 知其然

### 当前子图中的邻居数

本节用无向简单图表示点与邻接关系。度数是一个点在所讨论图内的邻居数量；删掉某些点后，剩余点的度数也会改变。诱导子图保留所选点之间原来存在的全部边，不能随意增添新边来补足度数。


### 定义

图的 k 核是所有顶点在内部度数至少为 k 的最大诱导子图；它可以为空或不连通。核剥离反复删除当前度数不足 k 的点，直到所有剩余点都满足条件，得到这个结构。这里的度数始终是剩余图内的度数。

### 理解定义中的术语与关系

#### 删除会触发连锁变化

度数不足的点不可能靠之后继续删点变合格，因此可以删除。删它时要同时减少邻居的当前度数，可能产生新的不合格点。只检查最初度数，会漏掉这种连锁反应。得到的核保证最低内部度数，不保证所有点彼此直接相连。

### 概念边界与常见混淆

核不等于连通分量、完全子图或没有桥的证明。若应用还有必选成员、连通性或边权条件，需要在核条件之外另行检查。

### 先看一个例子

A、B、C 构成三角形，另外 B 与 D 相连。求二核时，D 只有一个邻居而被删；B 的度数从三降为二，三角形三个点仍各有两个邻居，全部保留。若要求三核，A、C、D 先不足，B 随后也失去足够邻居，结果为空。

### 理解练习

#### 1. 初始度数为什么不足

例子里 B 最初度数三，能否据此单独保留它作为三核？

<details><summary>答案与解释</summary>

不能。其他点移除后，它在剩余图里的邻居数下降。只有一个点且没有自环时，内部度数为零。

</details>

#### 2. 最低度数与全连接

四个点组成一圈，每点有两个邻居，是二核吗？是否每两点都相连？

<details><summary>答案与解释</summary>

整圈满足最低度数二，因此是其二核；但对角的两个点并不相连。最低度数要求不能替代完全子图条件。

</details>

#### 3. 删除顺序与结果

有多个当前度数不足的点时，先删其中任意一个，会漏掉另一种合法核吗？

<details><summary>答案与解释</summary>

不会。每个当前不合格点都不可能属于满足门槛的最终子图。只要持续更新并删尽不合格点，先后顺序不改变最大核的顶点集合。

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
