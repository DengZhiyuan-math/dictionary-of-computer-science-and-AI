# Fenwick Tree

概念编号：`concept:fenwick-tree` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/fenwick-tree/)

## 第一层：概念入门 · 知其然

### 它是什么

In a one-based Fenwick tree, tree[i] stores the sum of an interval of length lowbit(i). In the appropriate integer representation, lowbit(i)=i & (-i) extracts the least significant set bit.

### 先看一个例子

Use the one-based array a=[2,1,3,4,2]. The tree stores interval sums, initially tree[1…5]=[2,3,3,10,2].
A Fenwick update touches only binary interval blocks containing the position. Each query or update path takes at most O(log n) steps.

### 理解练习

If the increment at position 3 were -2 instead, what would the sum of the first five elements be?

<details><summary>答案与解释</summary>

10: original total 12 minus 2. The structure supports negative increments too.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
