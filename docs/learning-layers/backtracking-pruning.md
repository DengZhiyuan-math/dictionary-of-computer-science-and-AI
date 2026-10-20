# Backtracking / Pruning

概念编号：`concept:backtracking-pruning` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/backtracking-pruning/)

## 第一层：概念入门 · 知其然

### 它是什么

回溯逐个尝试选择，不合适就撤销；剪枝提前排除不可能成功的分支。

### 先看一个例子

从正数1、2、3中选若干个，使和为3。

### 理解练习

当前和已为4，还需要继续加正数吗？

<details><summary>答案与解释</summary>

不需要，正数只会使和更大，可安全剪枝。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 状态记录当前位置、当前和与选择列表，每个数有选和不选两条分支。
2. 加入、递归、撤销保持兄弟分支独立；只有证明后续无解时才剪枝。

### 具体输入与计算步骤

从正数1、2、3中选若干个，使和为3。

1. 先选1再选2得到3，记录{1,2}；撤销后尝试跳过1、2而选3。
2. 得到两组解{1,2}、{3}；分支1+3=4超过目标，立即停止。

计算结果：得到两组解{1,2}、{3}；分支1+3=4超过目标，立即停止。

### 换到实际问题中应用

安排4门课程到4个时段，部分课程冲突。

1. 逐门分配时段，一旦与已安排课程冲突便撤销。
2. 优先处理冲突最多的课程，可更早发现不可行分支，同时仍需保留所有合法选择。

应用结论：优先处理冲突最多的课程，可更早发现不可行分支，同时仍需保留所有合法选择。

### 举一反三：改变条件后的完整解答

若候选数含−2，当前和4还能按超目标剪枝吗？

<details><summary>变式的推演与答案</summary>

1. 不能，4+(−2)+1=3仍可能回到目标。
2. 必须用剩余数可达范围等更强界限判断，不能沿用正数剪枝。

必须用剩余数可达范围等更强界限判断，不能沿用正数剪枝。

</details>

### 原有解释与进一步例题


### 原理与推演

Backtracking expands choices into a search tree: choose, explore recursively, then undo the choice on return. Permutations use a used marker so each element is chosen once. Subsets use an increasing start index so different selection orders do not enumerate the same set repeatedly. Define the state first, then choose used markers, a starting index, or a remaining target.

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

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
