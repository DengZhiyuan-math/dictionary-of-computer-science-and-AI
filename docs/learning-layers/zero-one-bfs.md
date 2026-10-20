# 0-1 BFS

概念编号：`concept:zero-one-bfs` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/zero-one-bfs/)

## 第一层：概念入门 · 知其然

### 它是什么

0–1 BFS在边权只有0和1时，用双端队列求单源最短路，让免费边优先处理。

### 先看一个例子

走普通路花1，传送门花0，不能按边数少就认定费用低。

### 理解练习

两条免费边为何能胜过一条收费边？

<details><summary>答案与解释</summary>

最短路最小化权重和而非边数，0+0<1。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 成功松弛0边，把目标放队首；1边放队尾。
2. 队列按当前距离相邻层组织，使较小距离优先；复杂度O(V+E)。

### 具体输入与计算步骤

边s→a权1、s→b权0、b→a权0。

1. 处理s后dist(a)=1、dist(b)=0，队列[b,a]。
2. 先处理b，将a改为0并放队首。

计算结果：a的最短费用0，虽需两条边。

### 换到实际问题中应用

网格中最少修改方向。

1. 沿格子原箭头移动设0，改方向设1。
2. 在网格节点运行0–1 BFS，目标距离就是修改次数。

应用结论：状态和边权必须准确反映一次修改的成本。

### 举一反三：改变条件后的完整解答

若加一条权重2的边还能照搬吗？

<details><summary>变式的推演与答案</summary>

1. 队首/队尾只区分0与1，距离层不再由该规则保证。
2. 需改用Dijkstra或合适的整数桶。

0–1约束是正确性的条件。

</details>

### 原有解释与进一步例题


### Definition

0–1 BFS finds shortest paths when every edge weight is either zero or one. It uses a deque to process zero-cost relaxations before cost-one relaxations.


### Parameters and mechanism

When improving dist[v] through an edge from u, push v to the front for weight 0 and to the back for weight 1. With a proper adjacency-list implementation, complexity is O(V+E). Other weights require a different algorithm or transformation.


### Example

If A→B costs 1, A→C costs 0 and C→B costs 0, the shortest distance to B is 0 through C. Plain unweighted BFS would prefer the one-edge path, while the deque respects actual zero-one cost.


### 适用边界与常见误解

Relax whenever distance improves; first enqueueing does not make a distance final.

### 推导与方法参考

- [一手资料](https://cp-algorithms.com/graph/01_bfs.html)

[返回分层目录](00-learning-index.md)
