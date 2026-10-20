# Bellman-Ford

概念编号：`concept:bellman-ford` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bellman-ford/)

## 第一层：概念入门 · 知其然

### 它是什么

Bellman–Ford computes single-source shortest-path distances with possibly negative edge weights and can detect a reachable negative cycle. A reachable negative cycle can make some minimum path costs unbounded below.

### 先看一个例子

For A→B cost 4, A→C cost 5 and B→C cost -2, the best cost to C is 2 via B. Negative weights invalidate Dijkstra’s usual nonnegative-weight assumption, but are allowed by Bellman–Ford.

### 理解练习

用自己的话解释：上面的情景为什么是“Bellman-Ford”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Bellman–Ford computes single-source shortest-path distances with possibly negative edge weights and can detect a reachable negative cycle. A reachable negative cycle can make some minimum path costs unbounded below.

情景依据：For A→B cost 4, A→C cost 5 and B→C cost -2, the best cost to C is 2 via B. Negative weights invalidate Dijkstra’s usual nonnegative-weight assumption, but are allowed by Bellman–Ford.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

Relax an edge u→v of weight w using dist[v]=min(dist[v],dist[u]+w). After at most V-1 full passes, shortest simple paths are covered. An additional reachable improvement signals a reachable negative cycle. The usual complexity is O(VE).


### 适用边界与常见误解

A negative cycle unreachable from the source does not invalidate all that source’s results.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
