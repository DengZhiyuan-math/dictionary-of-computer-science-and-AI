# Graph Algorithms

概念编号：`concept:graph-algorithms` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/graph-algorithms/)

## 第一层：概念入门 · 知其然

### 它是什么

图用点表达对象、边表达关系，再按连通、路径或依赖目标选择算法。

### 先看一个例子

无向图A—B、B—C，另有孤立点D。

### 理解练习

图里有路就代表可以忽略边方向吗？

<details><summary>答案与解释</summary>

不能，有向关系和无向关系的可达性不同。

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
