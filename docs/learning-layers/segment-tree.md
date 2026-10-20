# Segment Tree

概念编号：`concept:segment-tree` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/segment-tree/)

## 第一层：概念入门 · 知其然

### 它是什么

线段树把数组递归分段，每个节点保存可结合的摘要，支持区间查询和更新。

### 先看一个例子

像分层账本，先按半本合计，再用少量整段合计回答任意区间。

### 理解练习

分层账本为何不必每次重扫整段？

<details><summary>答案与解释</summary>

预存完整子段摘要，查询只合并覆盖目标的少量节点。

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
