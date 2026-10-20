# 0-1 BFS

概念编号：`concept:zero-one-bfs` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/zero-one-bfs/)

## 第一层：概念入门 · 知其然

### 它是什么

0–1 BFS finds shortest paths when every edge weight is either zero or one. It uses a deque to process zero-cost relaxations before cost-one relaxations.

### 先看一个例子

If A→B costs 1, A→C costs 0 and C→B costs 0, the shortest distance to B is 0 through C. Plain unweighted BFS would prefer the one-edge path, while the deque respects actual zero-one cost.

### 理解练习

用自己的话解释：上面的情景为什么是“0-1 BFS”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：0–1 BFS finds shortest paths when every edge weight is either zero or one. It uses a deque to process zero-cost relaxations before cost-one relaxations.

情景依据：If A→B costs 1, A→C costs 0 and C→B costs 0, the shortest distance to B is 0 through C. Plain unweighted BFS would prefer the one-edge path, while the deque respects actual zero-one cost.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

When improving dist[v] through an edge from u, push v to the front for weight 0 and to the back for weight 1. With a proper adjacency-list implementation, complexity is O(V+E). Other weights require a different algorithm or transformation.


### 适用边界与常见误解

Relax whenever distance improves; first enqueueing does not make a distance final.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
