# Greedy

概念编号：`concept:greedy` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/greedy/)

## 第一层：概念入门 · 知其然

### 它是什么

贪心每次做一个局部选择，只有证明这种选择不会损失全局最优时才可靠。

### 先看一个例子

选择最多互不重叠的活动：(1,3)、(2,4)、(3,5)，允许首尾相接。

### 理解练习

先选持续时间最短的一定对吗？

<details><summary>答案与解释</summary>

不一定，活动选择常用最早结束，并需交换论证。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 把任意最优解的首活动替换为最早结束者，不会减少后续可用时间。
2. 固定该选择后对剩余兼容活动重复，因此最优活动数不减。

### 具体输入与计算步骤

选择最多互不重叠的活动：(1,3)、(2,4)、(3,5)，允许首尾相接。

1. 按结束时间选(1,3)，排除与它重叠的(2,4)。
2. 再选(3,5)，共2个；3个全选不兼容，所以2最优。

计算结果：再选(3,5)，共2个；3个全选不兼容，所以2最优。

### 换到实际问题中应用

安排尽可能多的单会议室预约。

1. 按结束时间排序，依次接受开始时间不早于上次结束的预约。
2. O(n log n)排序后线性扫描，明确首尾相接是否允许。

应用结论：O(n log n)排序后线性扫描，明确首尾相接是否允许。

### 举一反三：改变条件后的完整解答

若每场收益不同，最早结束仍保证最大收益吗？

<details><summary>变式的推演与答案</summary>

1. 不保证，例如短场(1,2)收益1，长场(1,5)收益100。
2. 应改用带权区间动态规划等方法，目标改变后原交换证明失效。

应改用带权区间动态规划等方法，目标改变后原交换证明失效。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
