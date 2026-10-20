# Floyd–Warshall / All-pairs Shortest Paths

概念编号：`concept:floyd-warshall` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/floyd-warshall/)

## 第一层：概念入门 · 知其然

### 它是什么

Floyd–Warshall逐步允许更多中转点，一次求出所有点对的最短路费用。

### 先看一个例子

A→B为3，B→C为4，A→C为10。

### 理解练习

没有直接边就可以把距离设0吗？

<details><summary>答案与解释</summary>

不可以，应为无穷，只有自己到自己初始为0。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 允许中间点k时，最优路要么不经过k，要么由i到k与k到j拼接。
2. 递推d[i][j]=min(d[i][j],d[i][k]+d[k][j])，k必须在外层以维持阶段含义。

### 具体输入与计算步骤

A→B为3，B→C为4，A→C为10。

1. 初始d[A][C]=10，经过B的候选为3+4=7。
2. 更新为min(10,7)=7；三点完整三重循环共27个状态更新尝试。

计算结果：更新为min(10,7)=7；三点完整三重循环共27个状态更新尝试。

### 换到实际问题中应用

小字母表中计算任意字符转换的最低代价。

1. 初始化有向转换边，重复边取最小，运行全点对递推。
2. 对每个字符串位置查询转换费用并相加，不可达位置须报告无法转换。

应用结论：对每个字符串位置查询转换费用并相加，不可达位置须报告无法转换。

### 举一反三：改变条件后的完整解答

若增加C→B为−5，有限最短路还成立吗？

<details><summary>变式的推演与答案</summary>

1. B→C→B费用4−5=−1，是可达负环。
2. 受影响路径可反复绕环降低费用，无有限最短值，应检测负对角并标记影响范围。

受影响路径可反复绕环降低费用，无有限最短值，应检测负对角并标记影响范围。

</details>

### 原有解释与进一步例题


### 原理与推演

Initialize d[i][i] = 0, direct edges to their minimum weight, and missing edges to infinity. For each intermediate vertex k, update d[i][j] = min(d[i][j], d[i][k] + d[k][j]) for every i and j.

Keep k as the outer loop so each stage has a complete intermediate-vertex meaning. The algorithm uses O(V³) time and O(V²) storage for V vertices. A small alphabet of directed character conversions is a natural application.


### 例子

例子：有 A→B=3、B→C=4、A→C=10。当中间点为 B 时，A 到 C 更新为 min(10,3+4)=7。初始化对角线为 0，缺边为无穷；发现可达负环时，不能把受影响路径当作有限最短路。


### 适用边界与常见误解

Unreachable pairs remain infinite and must not be treated as free conversions. Negative cycles can make finite shortest-path costs undefined for affected pairs.

### 推导与方法参考

- [一手资料](https://dl.acm.org/doi/10.1145/367766.368168)

[返回分层目录](00-learning-index.md)
