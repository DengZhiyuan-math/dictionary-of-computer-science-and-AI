# Bellman-Ford

概念编号：`concept:bellman-ford` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bellman-ford/)

## 第一层：概念入门 · 知其然

### 它是什么

Bellman–Ford反复松弛所有边，允许负权；还能发现从起点可达的负环。

### 先看一个例子

优惠路段可让某条边费用为负，但绕一圈不断返现会使最低费用无下界。

### 理解练习

绕一圈总费−1为什么不能给有限最低价？

<details><summary>答案与解释</summary>

可反复绕环，每次再减1，使可达相关终点的费用无下界。

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
