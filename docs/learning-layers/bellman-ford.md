# Bellman-Ford

概念编号：`concept:bellman-ford` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bellman-ford/)

## 第一层：概念入门 · 知其然

### 定义

Bellman–Ford 是允许负边权的单源最短路算法。边权表示经过该边增加的代价；负值可表示返还或收益。算法反复扫描边：若到起点的已知距离加该边代价更小，就改善终点距离，这个操作称为松弛。没有从起点可达的负权环时，最优有限路线可以不重复节点，至多包含“节点数减一”条边，因此有限轮扫描足以传播最优距离。

### 概念边界与常见混淆

负边不等于负环。负环只影响从起点能到该环、再从环能到的节点；另一个与起点断开的负环不破坏此起点的有限距离。不可达节点也不能参与有效松弛。

### 先看一个例子

有向边 S→A 为 4，S→B 为 5，B→A 为 −3。从 S 到 A 直接为 4，经 B 则为 5−3=2，后者更好。若另有 A→B 为 1，则 A→B→A 的总代价为 −2；从 S 可达它，重复绕圈可把到 A、B 的代价不断降低，不存在最小的有限值。

### 理解练习

#### 1. 负边与负环

只有 S→B=5、B→A=−3，没有回边，是否必定无最短路？

<details><summary>答案与解释</summary>

不是。没有可重复的负环，到 A 的代价为 2，是有限最小值。允许负边正是该算法的重要用途。

</details>

#### 2. 环的影响范围

负环无法从 S 到达，会让从 S 的全部距离失效吗？

<details><summary>答案与解释</summary>

不会。从 S 出发走不到该环，不能利用它降低路线代价。检测时必须区分可达与不可达。

</details>

#### 3. 再次改善的含义

足够轮数后仍可从可达节点松弛，提示什么？

<details><summary>答案与解释</summary>

提示存在从起点可达的负环，而不仅是距离算得还不够久；相关节点的有限最优值需要标记为不存在。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 初始化源距离0、其他无穷，每轮用d[v]=min(d[v],d[u]+w)。
2. 无负环时最短简单路至多V−1条边；第V轮仍可改进说明存在可达负环。

### 具体输入与计算步骤

边s→a=4、s→b=5、a→b=−2。

1. 直接到b成本5。
2. 经a为4−2=2，松弛将b改成2。

计算结果：最终dist(a)=4、dist(b)=2。

### 换到实际问题中应用

检测兑换图负环。

1. 把汇率r映射为−ln(r)，考虑方向和费用。
2. 负环意味着模型内循环乘积大于1，再核对报价可成交性。

应用结论：静态图信号不保证真实同时套利。

### 举一反三：改变条件后的完整解答

加入b→a=1会怎样？

<details><summary>变式的推演与答案</summary>

1. a→b→a总权−2+1=−1。
2. 该环从s可达，可反复降低a、b距离。

两点没有有限最短路，需报告负环影响。

</details>

### 原有解释与进一步例题


### Definition

Bellman–Ford computes single-source shortest-path distances with possibly negative edge weights and can detect a reachable negative cycle. A reachable negative cycle can make some minimum path costs unbounded below.


### Parameters and mechanism

Relax an edge u→v of weight w using dist[v]=min(dist[v],dist[u]+w). After at most V-1 full passes, shortest simple paths are covered. An additional reachable improvement signals a reachable negative cycle. The usual complexity is O(VE).


### Example

For A→B cost 4, A→C cost 5 and B→C cost -2, the best cost to C is 2 via B. Negative weights invalidate Dijkstra’s usual nonnegative-weight assumption, but are allowed by Bellman–Ford.


### 适用边界与常见误解

A negative cycle unreachable from the source does not invalidate all that source’s results.

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-spring-2020/resources/lecture-12-bellman-ford/)

[返回分层目录](00-learning-index.md)
