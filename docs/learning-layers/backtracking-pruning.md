# Backtracking / Pruning

概念编号：`concept:backtracking-pruning` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/backtracking-pruning/)

## 第一层：概念入门 · 知其然

### 定义

回溯是在有限选择空间中逐步构造候选解的搜索方法：作出一个选择，继续扩展；当前分支完成或不可行时，撤销该选择并尝试其他选择。剪枝是有依据地提前停止分支，例如某条约束已被违反，或即使最理想地补全也不能改善现有答案。正确剪枝必须说明被丢弃的分支不会含有需要的解。

### 概念边界与常见混淆

搜索顺序与正确性是不同问题。先尝试看起来有希望的选择可能更快找到解，但不能只凭“似乎不理想”删去分支；若任务要求全部解，找到一个解也不能直接结束整个搜索。

### 先看一个例子

从正整数 [2,3,5] 中每项最多选一次，找和为 5 的子集。选择 2、再选 3 得到 {2,3}；撤销 3 再试 5，会得到 7。因以后只能继续加正数，已经超过 5 的分支可以剪掉。另一个根分支可选 {5}。如果允许负数，超过目标就停止的理由便不成立。

### 理解练习

#### 1. 撤销什么

探索 {2,3} 后改试 {2,5}，若没有撤销 3，会怎样？

<details><summary>答案与解释</summary>

状态会错误地变成 {2,3,5}，当前和及可用项都可能错误。回溯必须恢复到作出该选择之前的状态。

</details>

#### 2. 剪枝条件

允许数字 −2 后，当前和 7、目标 5，还能只凭超过目标剪枝吗？

<details><summary>答案与解释</summary>

不能。继续选 −2 可回到 5；先前剪枝依赖所有未来增量为正这一条件。

</details>

#### 3. 任务范围

已找到 {2,3} 后，若要求全部子集，能否不再检查 {5}？

<details><summary>答案与解释</summary>

不能。找到一个证明有解，但未完成枚举全部解；停止条件必须与输出要求一致。

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
