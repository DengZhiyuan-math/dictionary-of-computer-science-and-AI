# Segment Tree

概念编号：`concept:segment-tree` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/segment-tree/)

## 第一层：概念入门 · 知其然

### 定义

线段树是按连续区间分解数组、并为每个区间保存汇总信息的数据结构。根节点代表全数组，子节点代表左右两段，继续分解直到单个元素。查询一个区间时，用少数完整节点区间拼出答案；单点改变后，只重算从对应叶子到根的汇总。汇总操作必须能把相邻区间的答案正确组合，例如和、最小值或最大值。

### 概念边界与常见混淆

只存子区间均值不足以正确合并不同长度区间的均值；应同时存总和与长度。整段更新若每次都逐个访问叶子，会失去优势；延迟标记是另需设计的机制，并非任意更新都自动高效。

### 先看一个例子

数组 [5,2,7,1] 建最小值树。左半 [5,2] 存 2，右半 [7,1] 存 1，根存 1。把第四项从 1 改为 9，则右半最小值改为 7、根改为 2，左半不用改。查询第二至第三项时，合并值 2 和 7，答案为 2。

### 理解练习

#### 1. 更新传播

第四项改为 9 后，左半最小值为什么不变？

<details><summary>答案与解释</summary>

第四项不在左半覆盖区间，左半所依据的数据没有改变；只重算包含更新位置的祖先节点。

</details>

#### 2. 正确汇总

一段一项、均值 10，另一段三项、均值 2，整体均值是 6 吗？

<details><summary>答案与解释</summary>

不是，整体和为 10+3×2=16，长度 4，均值为 4。直接平均两个均值错误地给两段相同权重。

</details>

#### 3. 与静态表比较

数组永不更新、只求区间和，是否必须使用线段树？

<details><summary>答案与解释</summary>

不必须。预存前缀和后两次读取和相减即可查询，通常更简单；线段树的价值应结合更新需求与汇总类型判断。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 父摘要由左右子摘要合并，合并需满足结合律并有空段单位元。
2. 单点修改只重算一条祖先链，区间查询分解为O(log n)个覆盖节点。

### 具体输入与计算步骤

数组[2,1,3,4]，求零基半开[1,4)和。

1. 可分成[1,2)值1与[2,4)和7。
2. 合计1+7=8。

计算结果：区间端点约定决定是否包含第4项。

### 换到实际问题中应用

维护区间最小值。

1. 叶子存数值，父节点取min，空段单位元设正无穷。
2. 修改某值后沿父链重算，查询不必扫描全部元素。

应用结论：同一结构可换摘要，但合并规则须合法。

### 举一反三：改变条件后的完整解答

要把区间平均数直接相加作为摘要可行吗？

<details><summary>变式的推演与答案</summary>

1. 左右长度不同会导致错误权重。
2. 改存(sum,count)，合并分别相加，最后sum/count。

摘要必须保留正确合并所需的信息。

</details>

### 原有解释与进一步例题


### 原理与推演

The segment tree recursively splits the interval in half, with the parent node holding a mergeable summary of both sides, such as sum, min, max, or count. The query interval is divided into a small number of completely covered nodes, and then the answers are merged; point modification only recalculates a path from the root to the leaf.


### 适用边界与常见误解

Lazy-tag composition order and summary updates must match the operation.

### 例题：Segment Trees: Range Maxima Cannot Be Subtracted

For [2,1,3,4,2,6], query the maximum in the zero-based half-open interval [1,5).

1. The selected values are [1,3,4,2], with maximum 4. Index 5 containing 6 is excluded.
2. Decompose the range into segment-tree nodes and merge their summaries with max. Negative infinity can serve as the merge identity.
3. Changing index 2 from 3 to 9 updates only the relevant leaf and ancestors. Querying [1,5) now returns 9.

结果：The query determines what each node stores. Sums, maxima and more complex summaries have different merge rules.

易错点：prefixMax(5)-prefixMax(1) does not give the range maximum. Define the result for an empty interval explicitly.

变式：If every value is negative, is 0 a valid initial merge value?

参考答案：No. It may exceed every real value. Use a suitable identity or handle empty results explicitly.

### 推导与方法参考

- [一手资料](https://atcoder.github.io/ac-library/production/document_en/segtree.html)

[返回分层目录](00-learning-index.md)
