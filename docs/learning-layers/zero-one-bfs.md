# 0-1 BFS

概念编号：`concept:zero-one-bfs` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/zero-one-bfs/)

## 第一层：概念入门 · 知其然

### 定义

0–1 BFS 是求图中一个起点到各点最小路径代价的算法，限定每条边的代价为 0 或 1。图的节点表示位置或状态，边表示允许的一步转移。算法维护目前找到的距离，遇到更短路线就更新；新距离不增加的 0 边放入双端队列前端，增加一的边放入后端，使较小距离优先处理。双端队列是两端都可加入和取出的有序容器。

### 概念边界与常见混淆

不能把首次发现节点就永久标为最优：后来可能经 0 边改善。若有代价 2 或负边，前后端安排不再具有所需的距离顺序，应改用适合该权重范围的算法。

### 先看一个例子

有向边 S→A 代价 1，S→B 代价 0，B→A 代价 0。处理 S 后 A 暂为 1、B 为 0；B 放在前面，先处理 B 后发现 A 可经 B 以总代价 0 到达，把 A 改为 0。边数更多的路线反而更便宜，说明这里最小化的不是经过几条边。

### 理解练习

#### 1. 目标区别

上例普通按边数的 BFS 会偏好 S→A，这是否也是最便宜路线？

<details><summary>答案与解释</summary>

不是，直接边代价 1，而经 B 两条边总代价 0。只有所有边代价相同时，边数与总代价的排序才一致。

</details>

#### 2. 何时更新

A 首次距离为 1，后来得到候选 0，能否因访问过而忽略？

<details><summary>答案与解释</summary>

不能。需要比较并接受更短距离；一次被发现与最优距离被确定是不同事件。

</details>

#### 3. 权重范围

把一条边代价改为 5，仍仅按“零放前、非零放后”就足够吗？

<details><summary>答案与解释</summary>

不够。后端可能混入相差多层的距离，失去 0–1 权重带来的特殊顺序；应采用一般非负权最短路方法等。

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
