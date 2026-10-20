# Backtracking / Pruning

概念编号：`concept:backtracking-pruning` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/backtracking-pruning/)

## 第一层：概念入门 · 知其然

### 它是什么

Backtracking expands choices into a search tree: choose, explore recursively, then undo the choice on return. Permutations use a used marker so each element is chosen once. Subsets use an increasing start index so different selection orders do not enumerate the same set repeatedly. Define the state first, then choose used markers, a starting index, or a remaining target.

### 先看一个例子

If you only save a reference to the same mutable list, undoing it later will change all answers together. Backtracking is not an antonym of dynamic programming; memoization is also possible when different search paths have the same subsequent state.

### 理解练习

用自己的话解释：上面的情景为什么是“Backtracking / Pruning”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Backtracking expands choices into a search tree: choose, explore recursively, then undo the choice on return. Permutations use a used marker so each element is chosen once. Subsets use an increasing start index so different selection orders do not enumerate the same set repeatedly. Define the state first, then choose used markers, a starting index, or a remaining target.

情景依据：If you only save a reference to the same mutable list, undoing it later will change all answers together. Backtracking is not an antonym of dynamic programming; memoization is also possible when different search paths have the same subsequent state.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Copying the current path is usually required when adding it to an answer. If you only save a reference to the same mutable list, undoing it later will change all answers together. Backtracking is not an antonym of dynamic programming; memoization is also possible when different search paths have the same subsequent state.


### 适用边界与常见误解

Pruning depends on the problem constraints, and enumeration cost is also bounded below by the output size.

### 例题：Backtracking: Choose, Recurse and Undo

Enumerate permutations of [1,2,3]. path stores the current sequence; used marks selected positions.

1. Choose 1, then 2 and 3, obtaining [1,2,3]. Save a copy of the path.
2. Undo 3 and then 2; choose 3 followed by 2 to obtain [1,3,2]. Undo these choices and continue with other starting elements.
3. At depth 3, save the result and return. Every choice needs a matching undo so sibling branches start from the same state.

结果：There are 6 permutations. The output itself requires Θ(n×n!) time and space. Recursion and marks use O(n) auxiliary space, excluding output.

易错点：Saving the mutable path reference can make every final result identical. With duplicate input values, marking positions still produces repeated value permutations, requiring deduplication.

变式：Does an empty array have 0 permutations or 1?

参考答案：By combinatorial convention it has 1: the empty permutation, represented by [[]]. This is also the natural recursion base case.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
