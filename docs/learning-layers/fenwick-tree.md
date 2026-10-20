# Fenwick Tree

概念编号：`concept:fenwick-tree` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/fenwick-tree/)

## 第一层：概念入门 · 知其然

### 定义

树状数组是在数组值会改变时维护前缀汇总的数据结构，经典版本支持单点加上一个增量，以及查询开头到某位置的和。它不把每个前缀完整重存一遍，而把前缀拆成预先安排的若干区间块。每个块保存区间和；更新只修改包含该位置的相关块，查询只合并覆盖目标前缀的块，两者都只需对数数量的操作。

### 概念边界与常见混淆

它不是每个位置只存该位置数值的普通数组，也不是一张静态前缀和表。区间和可由两个前缀相减，但最小值等操作不能不加条件地照搬这种相减方法。

### 先看一个例子

数组 [2,1,3,4]，按从 1 开始的编号，四个块分别覆盖 [1]、[1,2]、[3]、[1,4]，存 2、3、3、10。查前三项，合并块 [3] 与 [1,2] 得 6。把第二项增加 5，覆盖它的 [1,2] 和 [1,4] 改为 8、15；前三项新和为 11。

### 理解练习

#### 1. 前缀组合

原数组第二至第四项的和如何由前缀求出？

<details><summary>答案与解释</summary>

前四项和 10 减去第一项前缀和 2，得到 8；减去的是区间左端之前的前缀，避免漏掉第二项。

</details>

#### 2. 更新范围

第二项增加 5，覆盖 [3] 的块是否也增加 5？

<details><summary>答案与解释</summary>

不应。该块不包含第二项；只修改实际覆盖更新位置的块，否则查询将重复或错误计入增量。

</details>

#### 3. 赋值与增量

第二项原为 1，现在要赋值为 5，传给增量更新的数应为 5 吗？

<details><summary>答案与解释</summary>

应传 4，因为接口执行加法。赋值通常要先知道旧值，再用新值减旧值得到增量。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 一基下tree[i]存[i−lowbit(i)+1,i]的和，lowbit(i)=i&−i。
2. 查询反复减lowbit，更新反复加lowbit，均O(log n)。

### 具体输入与计算步骤

数组[1,2,3,4,5,6]，求前6项和。

1. tree[6]=5+6=11，6−lowbit(6)=4。
2. tree[4]=1+2+3+4=10，总21。

计算结果：只读两个区间块。

### 换到实际问题中应用

动态统计排名前缀次数。

1. 把值离散化为有序索引，每出现一次在该索引加1。
2. 查询前缀得到不大于某值的数量，区间用两前缀相减。

应用结论：离散化要保留顺序而非原数值间距。

### 举一反三：改变条件后的完整解答

第3项增加2后，prefix(6)多少？

<details><summary>变式的推演与答案</summary>

1. 更新tree[3]、tree[4]，索引8越界停止。
2. tree[6]仍11、tree[4]变12。

前缀和23，不能直接把赋值当增量。

</details>

### 原有解释与进一步例题


### 原理与推演

In a one-based Fenwick tree, tree[i] stores the sum of an interval of length lowbit(i). In the appropriate integer representation, lowbit(i)=i & (-i) extracts the least significant set bit.


### 适用边界与常见误解

The one-based update interface excludes index 0; obtain range sums by subtracting prefixes.

### 例题：Fenwick Trees: Queries and Updates Move Differently

Use the one-based array a=[2,1,3,4,2]. The tree stores interval sums, initially tree[1…5]=[2,3,3,10,2].

1. For the first 5 elements, read tree[5]=2, subtract lowbit(5)=1 to reach index 4, then read tree[4]=10. The total is 12.
2. Add 2 at position 3: tree[3] changes from 3 to 5, then tree[4] from 10 to 12. The next index 8 exceeds n, so stop.
3. The new total is 14. The sum over positions 2…4 is prefix(4)-prefix(1)=12-2=10.

结果：A Fenwick update touches only binary interval blocks containing the position. Each query or update path takes at most O(log n) steps.

易错点：Index 0 is unsuitable as a starting point for this one-based update interface because lowbit(0)=0.

变式：If the increment at position 3 were -2 instead, what would the sum of the first five elements be?

参考答案：10: original total 12 minus 2. The structure supports negative increments too.

### 推导与方法参考

- [一手资料](https://atcoder.github.io/ac-library/production/document_en/fenwicktree.html)

[返回分层目录](00-learning-index.md)
