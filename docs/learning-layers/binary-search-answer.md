# Binary Search on the Answer

概念编号：`concept:binary-search-answer` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/binary-search-answer/)

## 第一层：概念入门 · 知其然

### 它是什么

An exchange argument shows that some optimal solution can be transformed into an equally good one beginning with the greedy choice. To maximize the number of compatible unweighted intervals, choose an interval with the earliest finish. Replacing an optimal solution’s first interval with this one leaves at least as much room for later intervals.

### 先看一个例子

suppose you can test whether any solution satisfies it, and feasibility changes monotonically with B. Then search for the boundary between infeasible and feasible candidates.

### 理解练习

用自己的话解释：上面的情景为什么是“Binary Search on the Answer”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：An exchange argument shows that some optimal solution can be transformed into an equally good one beginning with the greedy choice. To maximize the number of compatible unweighted intervals, choose an interval with the earliest finish. Replacing an optimal solution’s first interval with this one leaves at least as much room for later intervals.

情景依据：suppose you can test whether any solution satisfies it, and feasibility changes monotonically with B. Then search for the boundary between infeasible and feasible candidates.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Exchange Arguments: Show How to Replace an Optimal Solution’s First Choice

Once tasks have different benefits, machines have multiple resource constraints, or preemption methods are allowed to change, the original proof may no longer hold. Giving counterexamples during the interview can better demonstrate your understanding of the goals and constraints than just memorizing a "common greedy rule".


### Binary Search on the Answer: Feasibility Is Monotonic

Binary search applies beyond sorted arrays. Given a candidate bound B, suppose you can test whether any solution satisfies it, and feasibility changes monotonically with B. Then search for the boundary between infeasible and feasible candidates.

For example, split nonnegative tasks into at most k groups in their original order to minimize the maximum group sum. The lower bound is the largest individual value and the upper bound is the total sum. A larger B relaxes the constraint. Maintain explicit search boundaries rather than returning the first feasible candidate encountered.


### Feasibility check: Applicable prerequisites for grouped greedy

Given the upper limit, try to put the next item into the current group from left to right, and only open a new group if it cannot be placed. Non-negative numbers make "adding later does not reduce the current group sum" true, so this check can calculate the minimum number of groups required.

If negative numbers are allowed, the current overrun may be offset by subsequent negative terms, and the argument for early group cutting becomes invalid. If exactly k non-empty groups are required, non-negative and k does not exceed n, the larger group can be continued to be split without increasing the maximum sum; other constraints need to be re-argued.


### Numerical Search and Expression of Complexity

For an integer search interval of width U, O(n) work per feasibility check gives O(n log(U+1)) time and potentially O(1) auxiliary space. Here the logarithmic parameter is the answer range, not the number of input elements.

Floating-point answers require error or iteration number conventions; midpoint calculations must consider overflow, and termination conditions must be consistent with interval conventions. Don't write a fixed-precision decimal search directly as left=mid+1, and don't ignore the integer precision determined by the input range.


### 适用边界与常见误解

Prove any greedy feasibility test independently; constraints such as negative values can change the argument.

### 例题：Binary Search on the Answer: Test a Candidate Limit

Keep nonnegative tasks [7,2,5,10,8] in order. Split them into at most 2 nonempty contiguous groups, minimizing the largest group sum.

1. The answer is at least the largest item, 10, and at most the total, 32.
2. Limit 17 permits [7,2,5] with sum 14, then [10], but the final 8 requires a third group. It is infeasible.
3. Limit 18 permits [7,2,5] and [10,8]. Binary search finds the smallest feasible limit, 18.

结果：The optimal largest group sum is 18, splitting between 5 and 10. Each check costs O(n); integer search takes about O(n log U).

易错点：The greedy check requires nonnegative values. With negatives, a later item can reduce a temporarily excessive sum, so the same check is invalid.

变式：What is the answer if at most one group is allowed?

参考答案：32. All tasks must remain together.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
