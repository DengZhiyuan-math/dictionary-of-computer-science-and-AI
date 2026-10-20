# Topological Sort

概念编号：`concept:topological-sort` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/topological-sort/)

## 第一层：概念入门 · 知其然

### 定义

拓扑排序为有向图的全部节点安排线性顺序，使每条边的起点都先于终点。边在这里表示先决依赖；存在有向环就不能给出满足要求的全序。常见方法反复取入度为零的节点，移除它及出边；入度是尚未处理的直接前驱数量。排序结果可能不唯一。

### 概念边界与常见混淆

拓扑序只保证依赖，不保证最短耗时或最佳资源安排。孤立节点也应纳入全图排序；只处理完可达部分不能证明全图无环。

### 先看一个例子

A、B都必须在C之前，边为A→C、B→C。初始A、B入度0，任取其一，再处理另一项，最后C，所以A,B,C与B,A,C都合法。若再加C→A，就形成A→C→A环，不可能同时满足先后。

### 理解练习

#### 1. 非唯一

A与B没有依赖，能否两种顺序都对？

<details><summary>答案与解释</summary>

可以，拓扑排序只限制边规定的先后，不额外排序独立节点。

</details>

#### 2. 环

队列空但仍有未处理节点说明什么？

<details><summary>答案与解释</summary>

对全图正确维护时说明剩余部分有环，无法完成拓扑序。

</details>

#### 3. 调度

给出合法序就保证多机器执行最快吗？

<details><summary>答案与解释</summary>

不保证，还涉及任务时长和资源约束，是额外调度问题。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 入度为0的点没有未完成前置，可加入队列。
2. 删除它的出边并更新入度；若未能输出全部节点，剩余依赖含环。

### 具体输入与计算步骤

边A→C、B→C，A与B互不依赖。

1. 初始入度A=0、B=0、C=2。
2. 输出A、B后C入度降0，再输出C，总3点。

计算结果：输出A、B后C入度降0，再输出C，总3点。

### 换到实际问题中应用

编译有依赖关系的模块。

1. 把依赖先后关系建成有向边，以入度0模块启动任务。
2. 任务完成才释放下游依赖，同时限制可并行运行的任务数。

应用结论：任务完成才释放下游依赖，同时限制可并行运行的任务数。

### 举一反三：改变条件后的完整解答

若再加C→A呢？

<details><summary>变式的推演与答案</summary>

1. A与C形成环，初始只有B入度0。
2. 输出B后A、C仍互等，输出数1<3，检测到不可完成依赖。

输出B后A、C仍互等，输出数1<3，检测到不可完成依赖。

</details>

### 原有解释与进一步例题


### 原理与推演

For Course Schedule, encode prerequisites as directed edges. Enqueue every zero-in-degree vertex, process it, and decrement its successors’ in-degrees. Enqueue a successor when its in-degree reaches zero. All courses are feasible exactly when all vertices are processed; otherwise the remaining graph contains a directed cycle. Include isolated courses in the total.

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

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/mit6_006f11_lec14/)

[返回分层目录](00-learning-index.md)
