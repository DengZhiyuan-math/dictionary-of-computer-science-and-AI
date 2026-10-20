# Prefix Sum

概念编号：`concept:prefix-sum` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/prefix-sum/)

## 第一层：概念入门 · 知其然

### 它是什么

前缀和记录序列从起点到各个边界的累计总和。一个区间的总和可以由两个累计值相减得到。

### 先看一个例子

每天记累计存款：前两天累计 8 元，前五天累计 20 元，那么第三到第五天共存入 12 元。不必重新把那三天逐一相加。

### 理解练习

为什么求第三到第五天的存款要减去“前两天”，而不是“前三天”？

<details><summary>答案与解释</summary>

前三天已经包含第三天的存款，减掉它会少算一天。区间左端点之前的累计值才是要排除的部分。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Define the prefix sum P such that the sum of the first zero elements is zero. The sum of a segment is k, which is equivalent to the current prefix sum minus an earlier prefix sum equal to k. Therefore, when scanning the current prefix P, check how many times P minus k has appeared before, then accumulate the answer, and finally record the current P. The occurrence of the zero prefix must be recorded once at the beginning to count the interval starting from the beginning of the array.

For example, one, negative one, one, the target is one. The three legal intervals come from two single elements and the entire array; the prefix frequency can count the contribution of repeated prefixes. The hash table must save the number of times, not just whether it exists. Recording the current prefix first and then querying will incorrectly include empty intervals when k is zero.


### 适用边界与常见误解

Counting often needs prefix frequencies and an initial zero prefix. Tree paths also need state undo on return.

### 例题：Prefix Sums: Counting Still Works with Negative Numbers

For [1,-1,1], count contiguous subarrays whose sum is 1. Let s be the prefix sum and initialize its frequency table to {0:1}.

1. After the first element, s=1. Look up s-1=0 and find one prior prefix. Add 1 to the count, then record prefix sum 1.
2. After the second element, s=0. Looking up -1 finds no prefix. Increase the frequency of prefix sum 0 to 2.
3. After the third element, s=1. Looking up 0 finds two prior prefixes, raising the total count to 3. Then record the current prefix.

结果：The three index intervals are [0,0], [0,2] and [2,2]. Expected time O(n), auxiliary space O(n).

易错点：Query before recording the current prefix; otherwise a target of 0 counts an empty interval. With negative values, window sums need not change monotonically as the window grows.

变式：How many nonempty zero-sum intervals does [0,0,0] contain?

参考答案：6: three of length 1, two of length 2 and one of length 3. Prefix frequencies contribute 1+2+3.

### 例题：Difference Arrays: Undo the Increment After the Range

Start with a zero-based, length-5 array of zeros. Add 2 to inclusive [1,3], then add -1 to [2,4], reconstructing the array afterward.

1. Allocate a length-6 difference array. The first update adds 2 to d[1] and subtracts 2 from d[4].
2. The second subtracts 1 from d[2] and adds 1 to d[5]. Position d[5] is a sentinel canceling the update after the array ends.
3. Prefix-sum the first five differences to obtain values 0,2,1,1,-1 at positions 0…4.

结果：The final array is [0,2,1,1,-1]. Each range update changes two endpoints; final reconstruction takes O(n).

易错点：For an inclusive range, cancel at r+1 rather than r. Allocate the sentinel but do not return it as a sixth array value.

变式：For a half-open range [l,r), where is the cancellation?

参考答案：At d[r], because r is already outside the updated range.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
