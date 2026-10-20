# Dijkstra’s Algorithm

概念编号：`concept:dijkstra` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dijkstra/)

## 第一层：概念入门 · 知其然

### 它是什么

Dijkstra's algorithm maintains the best distances discovered so far, repeatedly selects the nearest unfinalized node, and uses it to improve its neighbors' distances. With nonnegative edge weights, this nearest node can be finalized safely: extending a path cannot suddenly make it cheaper through a negative edge. Navigation and nonnegative-cost networks are typical uses. A priority queue accelerates selecting the next node. Dijkstra is not a universal shortest-path algorithm for arbitrary weighted graphs.

### 先看一个例子

Directed edges are A→B=5, A→C=1, C→B=1, B→D=2 and C→D=7. Start from A.
Distances are A=0, C=1, B=2, D=4. The shortest route to D is A-C-B-D.

### 理解练习

If C→B=-4 is allowed, does the same nonnegative-weight proof apply?

<details><summary>答案与解释</summary>

No. Negative edges may lower a finalized distance. Choose another method according to the constraints.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Dijkstra's algorithm maintains the best distances discovered so far, repeatedly selects the nearest unfinalized node, and uses it to improve its neighbors' distances. With nonnegative edge weights, this nearest node can be finalized safely: extending a path cannot suddenly make it cheaper through a negative edge. Navigation and nonnegative-cost networks are typical uses. A priority queue accelerates selecting the next node. Dijkstra is not a universal shortest-path algorithm for arbitrary weighted graphs.


### 适用边界与常见误解

The standard algorithm is not generally valid when edges may have negative weights.

### 例题：Dijkstra: Why Old Distances Remain in the Queue

Directed edges are A→B=5, A→C=1, C→B=1, B→D=2 and C→D=7. Start from A.

1. After A, candidates are B=5 and C=1. Processing C first improves B to 2 and D to 8.
2. Processing the new B=2 improves D to 4. Old entries B=5 and D=8 may still be queued.
3. Next process D=4. When B=5 is popped, skip it because it differs from current dist[B]=2. Likewise skip D=8.

结果：Distances are A=0, C=1, B=2, D=4. The shortest route to D is A-C-B-D.

易错点：The demo sorts a small list to display candidates; it is not an efficient heap implementation. Heap complexity bounds do not describe that display container.

变式：If C→B=-4 is allowed, does the same nonnegative-weight proof apply?

参考答案：No. Negative edges may lower a finalized distance. Choose another method according to the constraints.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
