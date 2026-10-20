# Topological Sort

概念编号：`concept:topological-sort` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/topological-sort/)

## 第一层：概念入门 · 知其然

### 它是什么

For Course Schedule, encode prerequisites as directed edges. Enqueue every zero-in-degree vertex, process it, and decrement its successors’ in-degrees. Enqueue a successor when its in-degree reaches zero. All courses are feasible exactly when all vertices are processed; otherwise the remaining graph contains a directed cycle. Include isolated courses in the total.

### 先看一个例子

Dependencies are A→C, B→C, C→D and D→E; F has none. An edge means its source must finish before its destination.
Without the cycle, one topological order contains all 6 nodes. With it, only 3 nodes are processed, proving no topological order covers the whole graph. Time O(V+E).

### 理解练习

Is checking only the subgraph reachable from one starting node enough?

<details><summary>答案与解释</summary>

No. Another component may contain a cycle. Count processed nodes across all V nodes.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A DFS alternative uses visitation colors. Encountering a vertex that is still on the active recursion path reveals a directed cycle; encountering a fully processed vertex does not. A topological order exists only for a DAG. Ordinary BFS without dependency bookkeeping does not provide this test.


### 适用边界与常见误解

If the in-degree algorithm cannot process every vertex, a directed cycle exists. Encountering a previously visited vertex alone is insufficient evidence.

### 例题：Topological Sorting: An Empty Queue Can Reveal a Cycle

Dependencies are A→C, B→C, C→D and D→E; F has none. An edge means its source must finish before its destination.

1. Compute indegrees. A, B and F have indegree 0 and enter the queue. Removing A and B decreases C’s indegree; enqueue C only when it reaches 0.
2. C then releases D, and D releases E. F must also appear in the output despite being isolated.
3. Adding E→C leaves the queue empty after processing A, B and F, while C, D and E remain unprocessed in a directed cycle.

结果：Without the cycle, one topological order contains all 6 nodes. With it, only 3 nodes are processed, proving no topological order covers the whole graph. Time O(V+E).

易错点：Topological orders are usually not unique. Processing some nodes does not establish that the entire dependency graph is executable.

变式：Is checking only the subgraph reachable from one starting node enough?

参考答案：No. Another component may contain a cycle. Count processed nodes across all V nodes.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
