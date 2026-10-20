# Greedy

概念编号：`concept:greedy` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/greedy/)

## 第一层：概念入门 · 知其然

### 它是什么

贪心算法每一步根据当前规则作出一个选择，并希望这些局部选择能组成全局解。是否正确需要证明，不能只凭“这一步看起来最好”。

### 先看一个例子

面额只有 1 元和 3 元时，凑 6 元可连续选两枚 3 元。但换成 1、3、4 元，先选 4 元会用三枚硬币，而两枚 3 元更少。

### 理解练习

“每次选最大面额”在一套硬币上成功，能否保证它对所有面额都正确？

<details><summary>答案与解释</summary>

不能。1、3、4 元凑 6 元就是反例。正确性依赖问题结构，需要交换论证或其他证明。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Divide and conquer splits a large problem into smaller ones, solves them separately, and combines their results; merge sort is a classic example. Dynamic programming handles overlapping subproblems by recording intermediate results to avoid recomputation. A greedy algorithm makes the locally best choice at each step and guarantees a global optimum only when the problem has the required properties. Backtracking systematically tries alternatives and undoes earlier choices when they fail, as in Sudoku and combinatorial search. Branch and bound uses upper and lower bounds to discard branches that cannot improve the current solution.


### 适用边界与常见误解

A locally attractive choice need not be globally correct; justify it through elimination or exchange.

### 例题：Binary Search on the Answer: Test a Candidate Limit

Keep nonnegative tasks [7,2,5,10,8] in order. Split them into at most 2 nonempty contiguous groups, minimizing the largest group sum.

1. The answer is at least the largest item, 10, and at most the total, 32.
2. Limit 17 permits [7,2,5] with sum 14, then [10], but the final 8 requires a third group. It is infeasible.
3. Limit 18 permits [7,2,5] and [10,8]. Binary search finds the smallest feasible limit, 18.

结果：The optimal largest group sum is 18, splitting between 5 and 10. Each check costs O(n); integer search takes about O(n log U).

易错点：The greedy check requires nonnegative values. With negatives, a later item can reduce a temporarily excessive sum, so the same check is invalid.

变式：What is the answer if at most one group is allowed?

参考答案：32. All tasks must remain together.

### 例题：A Greedy Counterexample: Most Jobs Versus Greatest Reward

Use A=(1,3,5), B=(2,5,100), C=(3,6,5), D=(6,7,4). Touching endpoints do not conflict.

1. For maximum job count, earliest-finish selection chooses A,C,D: 3 jobs.
2. For maximum reward, that selection earns only 14, while B,D earn 104.
3. Changing only the objective requires a new proof that a choice is safe. Weighted interval DP can solve the reward version.

结果：A familiar rule does not automatically apply to every superficially similar scheduling problem.

易错点：Do not automatically sort intervals by start or finish and apply greedy selection. Clarify the objective, compatibility conditions and resource limits first.

变式：If every reward is 1, do the objectives still conflict?

参考答案：No. Maximizing reward becomes maximizing count, recovering the unweighted conclusion.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
