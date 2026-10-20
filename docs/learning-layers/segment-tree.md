# Segment Tree

概念编号：`concept:segment-tree` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/segment-tree/)

## 第一层：概念入门 · 知其然

### 它是什么

The segment tree recursively splits the interval in half, with the parent node holding a mergeable summary of both sides, such as sum, min, max, or count. The query interval is divided into a small number of completely covered nodes, and then the answers are merged; point modification only recalculates a path from the root to the leaf.

### 先看一个例子

For [2,1,3,4,2,6], query the maximum in the zero-based half-open interval [1,5).
The query determines what each node stores. Sums, maxima and more complex summaries have different merge rules.

### 理解练习

If every value is negative, is 0 a valid initial merge value?

<details><summary>答案与解释</summary>

No. It may exceed every real value. Use a suitable identity or handle empty results explicitly.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
