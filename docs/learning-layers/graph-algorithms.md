# Graph Algorithms

概念编号：`concept:graph-algorithms` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/graph-algorithms/)

## 第一层：概念入门 · 知其然

### 它是什么

A graph consists of vertices and edges. Graph algorithms solve tasks such as reachability, traversal, shortest paths and dependency ordering. Directed edges distinguish source and destination; weighted edges attach a cost.

### 先看一个例子

For edges A→B, A→C and B→D, BFS from A reaches B and C after one edge and D after two. Replacing edge counts by arbitrary travel costs does not preserve this BFS distance result.

### 理解练习

用自己的话解释：上面的情景为什么是“Graph Algorithms”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A graph consists of vertices and edges. Graph algorithms solve tasks such as reachability, traversal, shortest paths and dependency ordering. Directed edges distinguish source and destination; weighted edges attach a cost.

情景依据：For edges A→B, A→C and B→D, BFS from A reaches B and C after one edge and D after two. Replacing edge counts by arbitrary travel costs does not preserve this BFS distance result.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For V vertices and E edges in an adjacency-list representation, BFS and DFS take O(V+E). BFS gives shortest edge counts in an unweighted graph. Weighted shortest paths require an algorithm whose weight assumptions match the data.


### 适用边界与常见误解

Whether the graph is directed, whether the edge weights are non-negative, and whether the weights are equal will change the applicable algorithm.

### 领域应用

- [Motion Planning · 图搜索在机器人路径中的应用](motion-planning.md)：复用节点、边和路径成本的定义，机器人页面补充构型、碰撞与轨迹可行性。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
