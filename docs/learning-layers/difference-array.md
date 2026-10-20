# Difference Array

概念编号：`concept:difference-array` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/difference-array/)

## 第一层：概念入门 · 知其然

### 它是什么

A difference array may use zero-based or one-based indices, but reserve the position after the right endpoint. To add x over a closed range [l,r], add x to d[l] and subtract x from d[r+1]. Prefix accumulation then reconstructs the updated array.

### 先看一个例子

Start with a zero-based, length-5 array of zeros. Add 2 to inclusive [1,3], then add -1 to [2,4], reconstructing the array afterward.
The final array is [0,2,1,1,-1]. Each range update changes two endpoints; final reconstruction takes O(n).

### 理解练习

For a half-open range [l,r), where is the cancellation?

<details><summary>答案与解释</summary>

At d[r], because r is already outside the updated range.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Step 1: Allocate a length-6 difference array. The first update adds 2 to d[1] and subtracts 2 from d[4].


### 适用边界与常见误解

Basic difference arrays suit offline reconstruction; online queries usually require another structure.

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
