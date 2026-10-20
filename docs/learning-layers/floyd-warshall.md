# Floyd–Warshall / All-pairs Shortest Paths

概念编号：`concept:floyd-warshall` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/floyd-warshall/)

## 第一层：概念入门 · 知其然

### 路径费用与所有点对

有向图的边给出从一个点直接到另一个点的费用，路径费用是沿途边费用之和。所有点对最短路要回答任意起点到任意终点的最低费用，不只是固定一个起点。不可达与零费用必须分开表示。


### 定义

Floyd–Warshall 是通过逐步扩大允许中转点集合，计算所有点对最短路径费用的动态规划算法。每个阶段比较不使用新中转点的已有路径，与经由该点拼接的路径。有限最短值的讨论需要相关路径不受可达负环影响。

### 理解定义中的术语与关系

#### 中转点是阶段条件

初始时记录直接边、自己到自己的零费用和不可达标记。允许某点作中转后，就为每一对起终点检查“先到中转点、再到终点”是否更便宜。实现中的循环顺序必须保留这种阶段含义，不能任意换序后仍把它当作同一证明下的算法。

### 概念边界与常见混淆

负边本身不一定有问题，负环则能让相关路径反复绕行、费用无限降低。算法还要避免把不可达标记与有限费用直接相加导致溢出。

### 先看一个例子

A 到 B 费用三，B 到 C 费用四，A 到 C 直接费用十。允许 B 中转后，A 经 B 到 C 只需七，因此更新为七。若 C 到 A 完全不可达，不能为了填满矩阵把它写成零，否则就虚构了一条免费路径。

### 理解练习

#### 1. 方向不能省略

已知 A 到 C 的最低费用七，能否直接认定 C 到 A 也是七？

<details><summary>答案与解释</summary>

不能。有向边只保证声明方向的通行。除非图的规则另有对称性，反向可能更贵或完全不可达。

</details>

#### 2. 负边与负环不同

再增加 C 到 B 费用负五，为什么 B 到 C 的有限最短值会出问题？

<details><summary>答案与解释</summary>

B 到 C 再回 B 总费用四减五为负一，可以不断重复降低费用。问题来自可反复利用的负环，不仅是出现了负数边。

</details>

#### 3. 何时值得计算所有点对

只需一次 A 到 C 查询，是否必须先求整个图所有点对？

<details><summary>答案与解释</summary>

不必。所有点对提供可复用的完整查询表，但也付出相应时间与存储成本。应按图规模、边条件和查询需求选择算法。

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
