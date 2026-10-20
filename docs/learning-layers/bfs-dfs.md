# BFS / DFS

概念编号：`concept:bfs-dfs` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bfs-dfs/)

## 第一层：概念入门 · 知其然

### 它是什么

Breadth-first search uses a queue to explore nodes one step away before those two steps away. When every edge has the same cost, it therefore finds a path with the fewest steps. Depth-first search uses recursion or an explicit stack to follow a path deeply and backtrack when needed. It suits dependency analysis, connectivity structure, and backtracking. Finding a path with DFS does not mean finding a shortest path. Both searches must track visited states to avoid looping indefinitely around cycles.

### 先看一个例子

A directed graph has equal-cost edges A→B, A→C, B→D, C→D and D→E. F is isolated. Find the fewest edges from A.
One shortest path from A to E is A-B-D-E, of length 3. F is unreachable. With adjacency lists, time is O(V+E) and space is O(V).

### 理解练习

If A→C has cost 10, does BFS still guarantee minimum total cost?

<details><summary>答案与解释</summary>

No. Minimizing edge count and total cost are different objectives. Dijkstra is an option for nonnegative weights.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Breadth-first search uses a queue to explore nodes one step away before those two steps away. When every edge has the same cost, it therefore finds a path with the fewest steps. Depth-first search uses recursion or an explicit stack to follow a path deeply and backtrack when needed. It suits dependency analysis, connectivity structure, and backtracking. Finding a path with DFS does not mean finding a shortest path. Both searches must track visited states to avoid looping indefinitely around cycles.


### 适用边界与常见误解

BFS finds paths with the fewest edges. These need not have minimum total cost when edge weights differ.

### 例题：BFS: Mark on Enqueue to Find Shortest Paths

A directed graph has equal-cost edges A→B, A→C, B→D, C→D and D→E. F is isolated. Find the fewest edges from A.

1. Set A’s distance to 0. When it is dequeued, mark and enqueue B and C, both at distance 1.
2. B discovers D at distance 2 with parent B. When C encounters D, its existing mark prevents a duplicate enqueue.
3. D discovers E at distance 3. The queue eventually empties; F never receives a distance. Reverse the parent chain E→D→B→A to recover a path.

结果：One shortest path from A to E is A-B-D-E, of length 3. F is unreachable. With adjacency lists, time is O(V+E) and space is O(V).

易错点：The conclusion requires equal edge costs. General weighted paths cannot be compared by layer count alone. Marking only on dequeue allows duplicate enqueues.

变式：If A→C has cost 10, does BFS still guarantee minimum total cost?

参考答案：No. Minimizing edge count and total cost are different objectives. Dijkstra is an option for nonnegative weights.

### 例题：0–1 BFS: First Discovery Need Not Be Shortest

Directed edges are A→B=1, A→C=0 and C→B=0. Find the minimum cost from A to B.

1. Processing A tentatively sets B=1 and pushes it to the back, then sets C=0 and pushes it to the front.
2. Process C first. Edge C→B gives cost 0, improving on 1. Update B and push it to the front.
3. B’s final distance is 0 along A-C-B. Its two edges cost less than the direct one-edge route.

结果：0–1 BFS relaxes edges whenever distance improves. Ordinary equal-weight BFS marking rules cannot be copied unchanged.

易错点：Treating “already enqueued” as “never update” incorrectly leaves B=1. The deque rule also does not extend unchanged to weight 2.

变式：If all three edges have weight 1, what is the minimum cost?

参考答案：1. Direct A→B is shortest, and ordinary BFS is sufficient.

### 领域应用

- [Multi-source BFS · 等时传播与最近源距离](multi-source-bfs.md)：BFS 的队列和分层原理只保留基础入口；这里补充多起点初始化和传播时间。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
