# Squared-distance Sums / Coordinate Moments

概念编号：`concept:squared-distance-moments` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/squared-distance-moments/)

## 第一层：概念入门 · 知其然

### 它是什么

平方距离和可以先保存点集的坐标统计量，再对每次查询做固定次数计算。

### 先看一个例子

两点(0,0)、(2,0)，查询点(1,1)。

### 理解练习

这个展开也直接给出普通欧氏距离之和吗？

<details><summary>答案与解释</summary>

不能，平方根破坏了同一多项式展开。

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
