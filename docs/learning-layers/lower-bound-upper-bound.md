# Lower Bound / Upper Bound

概念编号：`concept:lower-bound-upper-bound` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/lower-bound-upper-bound/)

## 第一层：概念入门 · 知其然

### 它是什么

Binary search relies on a monotonic true/false condition, rather than merely a sorted array. To find an insertion position, search for the first value greater than or equal to the target. With a half-open interval [left,right), initialize right to the array length. If the midpoint satisfies the condition, keep the left part including that midpoint; otherwise move left just past it. The search ends when left equals right, giving the boundary.

### 先看一个例子

If the midpoint satisfies the condition, keep the left part including that midpoint; otherwise move left just past it. The search ends when left equals right, giving the boundary.

### 理解练习

用自己的话解释：上面的情景为什么是“Lower Bound / Upper Bound”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Binary search relies on a monotonic true/false condition, rather than merely a sorted array. To find an insertion position, search for the first value greater than or equal to the target. With a half-open interval [left,right), initialize right to the array length. If the midpoint satisfies the condition, keep the left part including that midpoint; otherwise move left just past it. The search ends when left equals right, giving the boundary.

情景依据：If the midpoint satisfies the condition, keep the left part including that midpoint; otherwise move left just past it. The search ends when left equals right, giving the boundary.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
