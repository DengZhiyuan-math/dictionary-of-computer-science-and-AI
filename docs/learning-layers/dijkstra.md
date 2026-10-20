# Dijkstra’s Algorithm

概念编号：`concept:dijkstra` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dijkstra/)

## 第一层：概念入门 · 知其然

### 它是什么

Dijkstra在非负边图中，反复确定当前暂定距离最小的节点。

### 先看一个例子

A→B为2、A→C为5、B→C为1。

### 理解练习

到C直接走费用5一定最好吗？

<details><summary>答案与解释</summary>

不是，经B费用2+1=3。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 非负性保证经更远未确定节点不能反过来降低当前最近节点。
2. 取最小节点u后松弛邻边，令d[v]=min(d[v],d[u]+w)。

### 具体输入与计算步骤

A→B为2、A→C为5、B→C为1。

1. 处理A后暂定B=2、C=5。
2. 取B更新C=min(5,2+1)=3，最终距离0、2、3。

计算结果：取B更新C=min(5,2+1)=3，最终距离0、2、3。

### 换到实际问题中应用

求非负路费的配送路线。

1. 用邻接表及最小堆记录距离，跳过已过期候选。
2. 保存前驱还原路线，不可达终点明确报告无路线。

应用结论：保存前驱还原路线，不可达终点明确报告无路线。

### 举一反三：改变条件后的完整解答

若增加C→B费用−10呢？

<details><summary>变式的推演与答案</summary>

1. B→C→B总费用1−10=−9，形成可达负环。
2. 相关最短费用无有限下界，应检测负环而不能继续声称Dijkstra正确。

相关最短费用无有限下界，应检测负环而不能继续声称Dijkstra正确。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/6277a1f06100c26a7ff21031af6757b5_MIT6_006F11_lec16.pdf)

[返回分层目录](00-learning-index.md)
