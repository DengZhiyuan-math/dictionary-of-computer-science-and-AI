# Squared-distance Sums / Coordinate Moments

概念编号：`concept:squared-distance-moments` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/squared-distance-moments/)

## 第一层：概念入门 · 知其然

### 平方距离与重复查询

给定一组固定的二维点，要反复评价不同查询点到它们的平方距离总和。平方距离把横向差与纵向差分别平方后相加，不是再开平方得到的普通距离。这里每个点权重相同，且点集非空。


### 定义

平方距离矩方法把固定点集概括为数量、横纵坐标各自的总和，以及各点坐标平方和的总和。展开平方后，每次查询只需这些摘要和查询坐标，就能得到平方距离总成本，而不必重新遍历所有点。

### 理解定义中的术语与关系

#### 保存的摘要为什么有用

设查询点为 (a,b)，摘要为点数 n、横坐标和 Sx、纵坐标和 Sy、坐标平方总和 Q，则总成本是 $n(a^2+b^2)-2aSx-2bSy+Q$。这些量分别对应展开后的二次项、一次项和与查询无关的部分。公式在这里直接说明需要保存什么；完整展开与计算安排在第二层。

### 概念边界与常见混淆

普通距离中的平方根不能被同一个多项式摘要直接替代。改变点集后要更新摘要；机器实现还要检查整数溢出或浮点误差，而不能仅凭代数等式宣称数值逐位准确。

### 先看一个例子

固定点为 (0,0)、(2,0)，查询为 (1,1)。两段平方距离各为二，总和四。摘要是数量二、横坐标和二、纵坐标和零、平方总和四；代入公式得到四减四加四，仍为四。换一个查询时不必重新读取两个原始点。

### 理解练习

#### 1. 平方距离不能冒充距离

例子的平方距离总和四，是否表示普通距离总和也为四？

<details><summary>答案与解释</summary>

不是。每个普通距离为二的平方根，总和是两个二的平方根，约二点八二八。改变成本定义就改变了问题。

</details>

#### 2. 查询变化与数据变化

查询点改变，需要重新累计 Sx、Sy 和 Q 吗？若新增一个固定点呢？

<details><summary>答案与解释</summary>

新查询不改变点集摘要，只代入新坐标；新增点则改变点数、坐标和与平方总和，必须更新。摘要对应固定数据，不对应某一个查询。

</details>

#### 3. 保留均值是否足够

两组点有相同均值，能否只靠均值判断它们对任意查询的平方距离总成本相同？

<details><summary>答案与解释</summary>

不能。点数和分散程度也可能不同，特别是 Q 不能从均值恢复。围绕相同中心分散更开的点，平方距离成本通常不同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 展开(x−a)²+(y−b)²为x²+y²−2ax−2by+a²+b²。
2. 求和后只需n、Sx、Sy、Q，结果n(a²+b²)−2aSx−2bSy+Q。

### 具体输入与计算步骤

两点(0,0)、(2,0)，查询点(1,1)。

1. 本例n=2、Sx=2、Sy=0、Q=4。
2. 代入2×2−2×1×2+4=4，与逐点平方距离2+2=4一致。

计算结果：代入2×2−2×1×2+4=4，与逐点平方距离2+2=4一致。

### 换到实际问题中应用

对固定站点反复评价候选服务中心的平方距离总成本。

1. 一次扫描累计四个统计量，此后每个二维候选只需常数次算术。
2. 使用足够宽的整数或明确精度，取模题需在整个展开中一致处理。

应用结论：使用足够宽的整数或明确精度，取模题需在整个展开中一致处理。

### 举一反三：改变条件后的完整解答

查询点改成(0,0)，平方距离和多少？

<details><summary>变式的推演与答案</summary>

1. a=b=0，含查询坐标的项全消失。
2. 结果Q=4；普通距离和却为0+2=2，不能混用。

结果Q=4；普通距离和却为0+2=2，不能混用。

</details>

### 原有解释与进一步例题


### 原理与推演

For n points (x_i, y_i), retain Sx = Σx_i, Sy = Σy_i, and Q = Σ(x_i² + y_i²). At query (a, b), the total squared distance is n(a² + b²) − 2aSx − 2bSy + Q.

Build these moments in O(n) time and evaluate q two-dimensional queries in O(q) time, using O(1) aggregate state. With modular output, reduce the expanded expression consistently and use arithmetic wide enough for every product.


### 例子

例子：两点为 (0,0)、(2,0)，有 n=2、Sx=2、Sy=0、Q=4。查询 (1,1)，平方距离总和为 2×2−2×1×2+4=4，和逐点算出的 2+2 一致。若改问普通距离，不能再套用这个平方展开。


### 适用边界与常见误解

The expansion is for squared distances. It does not give the sum of ordinary Euclidean distances. Coordinates and aggregate products can exceed safe integer ranges even when each coordinate fits individually.

### 推导与方法参考

- [一手资料](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2022/round1/watering_well_ch1.md)

[返回分层目录](00-learning-index.md)
