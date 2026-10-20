# BFS / DFS

概念编号：`concept:bfs-dfs` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bfs-dfs/)

## 第一层：概念入门 · 知其然

### 定义

广度优先搜索（BFS）与深度优先搜索（DFS）都是系统探索图中可达节点的方法。图的节点表示对象，边表示可直接转移的关系。BFS 用先进先出的队列，先处理较早发现的节点，形成按边数的距离层；DFS 先继续探索当前分支，走不下去再返回，常用后进先出的栈或递归实现。两者都需要记录已发现状态来避免环中反复访问。

### 概念边界与常见混淆

BFS 的最短路结论按边数成立，或适用于所有边代价相同的情形。带不同权重时，边数更少不一定代价更低；DFS 的发现顺序还取决于邻接顺序。

### 先看一个例子

边为 S→A、S→B、A→C、C→D、B→D，按 A 在 B 前的邻接顺序探索。BFS 从 S 后先看 A、B，因此两条边的 S→B→D 比三条边的 S→A→C→D 更早确定距离。DFS 可能先走 S→A→C→D；它先找到 D，并不说明这条路线最短。

### 理解练习

#### 1. 距离含义

上例从 S 到 D 的 BFS 距离是 2 还是 3？

<details><summary>答案与解释</summary>

是 2，经 S→B→D；虽然存在三边路径，最短距离取所有可行路线的最小边数。

</details>

#### 2. 避免循环

若增加 D→S，搜索不记录已发现节点会怎样？

<details><summary>答案与解释</summary>

可能不断沿环重复处理而不结束。记录状态用于区分新节点与已探索节点，不只是性能装饰。

</details>

#### 3. 权重条件

直接边 S→D 代价 10，经 B 两条边总代价 2，普通 BFS 会保证最便宜吗？

<details><summary>答案与解释</summary>

不保证。它优先一条边，优化的是边数；需要适合权重的最短路算法。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. BFS队列先入先出，先处理距离d的点再发现距离d+1的点。
2. 首次发现时标记可防重复入队；DFS用栈或递归维护当前探索路径。

### 具体输入与计算步骤

无向图边为A—B、A—C、B—D。

1. BFS从队列[A]开始，取A后队列[B,C]，距离都为1。
2. 取B发现D并设距离2；全部处理结束，得到A:0、B:1、C:1、D:2。

计算结果：取B发现D并设距离2；全部处理结束，得到A:0、B:1、C:1、D:2。

### 换到实际问题中应用

计算迷宫中从入口到出口的最少步数。

1. 将可走格子视为点、相邻移动视为单位边，BFS保存前驱。
2. 首次到达出口时沿前驱倒推，得到一条最短路线。

应用结论：首次到达出口时沿前驱倒推，得到一条最短路线。

### 举一反三：改变条件后的完整解答

若A—D权重10、A—B与B—D权重1，BFS还保证最低费用吗？

<details><summary>变式的推演与答案</summary>

1. BFS可能先找到一条边的A—D，但费用10。
2. 两条边A—B—D费用2更低；非负加权图应使用Dijkstra等方法。

两条边A—B—D费用2更低；非负加权图应使用Dijkstra等方法。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/1208e162775f6f5cedfbb9f2b694ede0_MIT6_006F11_lec13.pdf)
- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/mit6_006f11_lec14/)

[返回分层目录](00-learning-index.md)
