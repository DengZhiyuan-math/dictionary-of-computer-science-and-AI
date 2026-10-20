# Lower Bound / Upper Bound

概念编号：`concept:lower-bound-upper-bound` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/lower-bound-upper-bound/)

## 第一层：概念入门 · 知其然

### 它是什么

下界查找找第一个不小于目标的位置，上界查找找第一个大于目标的位置。

### 先看一个例子

有序数组[1,2,2,4]，目标2。

### 理解练习

两个边界都指向第一个2吗？

<details><summary>答案与解释</summary>

不是，下界为下标1，上界为下标3。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 对单调谓词a[i]≥t找第一次为真即可得下界。
2. 上界把谓词换成a[i]>t，重复元素数量等于上界减下界。

### 具体输入与计算步骤

有序数组[1,2,2,4]，目标2。

1. 下界排除1，遇到第一个2在下标1。
2. 上界跳过两个2到下标3，出现次数3−1=2。

计算结果：上界跳过两个2到下标3，出现次数3−1=2。

### 换到实际问题中应用

统计某一天的已排序时间戳。

1. 用下界查日初，再查次日日初，使用半开时间区间。
2. 两个位置相减得到记录数，不必逐条扫描该日。

应用结论：两个位置相减得到记录数，不必逐条扫描该日。

### 举一反三：改变条件后的完整解答

目标改为3，边界是多少？

<details><summary>变式的推演与答案</summary>

1. 第一个≥3和第一个>3都是4所在下标3。
2. 两界差0，说明3没有出现；插入位置仍明确为3。

两界差0，说明3没有出现；插入位置仍明确为3。

</details>

### 原有解释与进一步例题


### 原理与推演

Binary search relies on a monotonic true/false condition, rather than merely a sorted array. To find an insertion position, search for the first value greater than or equal to the target. With a half-open interval [left,right), initialize right to the array length. If the midpoint satisfies the condition, keep the left part including that midpoint; otherwise move left just past it. The search ends when left equals right, giving the boundary.

The invariant must preserve the desired boundary, which may equal the array length. Keep the termination and update rules consistent with either a half-open or a closed search interval. For fixed-width integers, computing the midpoint as left plus half of right-left can avoid the overflow of left+right.


### 适用边界与常见误解

Interval conventions and updates must agree. A boundary position does not itself prove the target exists.

### 例题：Binary Search: Half-Open Intervals and Lower Bound

In sorted [1,2,2,4,7], find the first position not less than 2. Use [left,right), initially [0,5).

1. Midpoint 2 contains 2 and satisfies the condition. Move right to 2, retaining possible earlier answers.
2. Midpoint 1 also contains 2, so move right to 1. Midpoint 0 contains 1 and fails the condition, so move left to 1.
3. Stop at left=right=1. A boundary may equal the array length. It is an insertion position, not a guarantee that the target exists.

结果：The lower bound of 2 is 1; of 3 it is 3; of 8 it is 5. Time O(log n).

易错点：right is excluded, so it can start at n. Do not index the array directly when the returned boundary equals n.

变式：Which other boundary gives the number of occurrences of 2?

参考答案：The upper bound, the first position greater than 2, is 3. The count is 3-1=2.

### 例题：LIS: Equal Values Replace Rather Than Extend

For [3,1,2,2,5,4], find the longest strictly increasing subsequence length.

1. After 3, tails=[3]. Value 1 replaces the first entry not less than 1, giving [1].
2. The first 2 extends tails to [1,2]. The second 2 replaces the same position without increasing length, preserving strict increase.
3. Value 5 gives [1,2,5]; 4 then gives [1,2,4]. Length is 3.

结果：The answer is 3. Here tails happens to form an actual subsequence, but this is not guaranteed for every input.

易错点：For [2,3,1], final tails=[1,3] violates the input order and is not a reconstructed subsequence.

变式：For a longest nondecreasing subsequence, how should the repeated 2 be handled?

参考答案：Update the first entry strictly greater than the value, allowing equality to extend the sequence. This input’s nondecreasing length is 4.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
