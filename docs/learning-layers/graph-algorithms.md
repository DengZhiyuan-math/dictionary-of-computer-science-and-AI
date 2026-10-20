# Graph Algorithms

概念编号：`concept:graph-algorithms` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/graph-algorithms/)

## 第一层：概念入门 · 知其然

### 定义

图用节点表示对象、边表示对象间关系。边可有方向和权重，节点、边的语义先由问题定义，再选择遍历、连通性、最短路或依赖排序算法。图算法不是看图形形状猜答案；同一组节点用不同方向和代价建模，会形成不同问题。

### 概念边界与常见混淆

连通、可达、最短边数与最小代价不同。图可以含环、重复边或孤立节点，算法前提须匹配，不能把无权或无环结论随意推广。

### 先看一个例子

三个城市A、B、C，A→B单行耗时2，B→C耗时3，A→C耗时10。最快A到C经B为5；从C回A可能不可达，因为箭头不代表双向路。若目标是转乘最少，则直接A→C只走一条边，即使更慢。

### 理解练习

#### 1. 方向

A能到C就说明C能到A吗？

<details><summary>答案与解释</summary>

有向图不保证，需另查反向路线。

</details>

#### 2. 目标

最快路线一定边最少吗？

<details><summary>答案与解释</summary>

不一定，例中两条边更快，一条边转乘更少。

</details>

#### 3. 建模

同一条路权重用距离和时间，最优路线一定相同吗？

<details><summary>答案与解释</summary>

不一定，速度差异会改变权重比例，应按目标建模。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 先确认有向性、权重与负边，再选择BFS、最短路或拓扑等算法。
2. 邻接表遍历每点和边有限次，连通搜索工作O(V+E)。

### 具体输入与计算步骤

无向图A—B、B—C，另有孤立点D。

1. 从A遍历访问A、B、C，无法到D。
2. 再以D起新搜索，共2个连通分量，A到C无权距离2。

计算结果：再以D起新搜索，共2个连通分量，A到C无权距离2。

### 换到实际问题中应用

分析地铁站之间的换乘。

1. 站点为点、线路相邻为边，按目标决定边权是站数、时间还是票价。
2. 站数用BFS，非负时间用Dijkstra，算法随问题模型而定。

应用结论：站数用BFS，非负时间用Dijkstra，算法随问题模型而定。

### 举一反三：改变条件后的完整解答

若改成有向边A→B、C→B，从A能到C吗？

<details><summary>变式的推演与答案</summary>

1. A可到B，但B没有指向C的出边。
2. 不能到C；把图误当无向会错误给出A—B—C路线。

不能到C；把图误当无向会错误给出A—B—C路线。

</details>

### 原有解释与进一步例题


### Definition

A graph consists of vertices and edges. Graph algorithms solve tasks such as reachability, traversal, shortest paths and dependency ordering. Directed edges distinguish source and destination; weighted edges attach a cost.


### Parameters and mechanism

For V vertices and E edges in an adjacency-list representation, BFS and DFS take O(V+E). BFS gives shortest edge counts in an unweighted graph. Weighted shortest paths require an algorithm whose weight assumptions match the data.


### Example

For edges A→B, A→C and B→D, BFS from A reaches B and C after one edge and D after two. Replacing edge counts by arbitrary travel costs does not preserve this BFS distance result.


### 适用边界与常见误解

Whether the graph is directed, whether the edge weights are non-negative, and whether the weights are equal will change the applicable algorithm.

### 领域应用

- [Motion Planning · 图搜索在机器人路径中的应用](motion-planning.md)：复用节点、边和路径成本的定义，机器人页面补充构型、碰撞与轨迹可行性。

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
