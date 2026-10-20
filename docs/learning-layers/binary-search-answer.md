# Binary Search on the Answer

概念编号：`concept:binary-search-answer` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/binary-search-answer/)

## 第一层：概念入门 · 知其然

### 定义

答案二分用于优化问题：先把“求最好阈值”改成“给定阈值是否可行”，再利用可行性随阈值的单调变化排除一半候选。阈值更宽松时不能反而从可行变不可行，才能使用这种分界搜索。还需要能正确判断每个给定阈值，并给出包含最优答案的初始范围；单调性本身不提供判定方法。

### 概念边界与常见混淆

单调的是经过证明的可行性谓词，不是任意程序的输出。如果目标允许负工作量、非连续分配或其他限制，原判定策略可能失效，必须重新核对模型。

### 先看一个例子

工作量 [4,2,3] 按原次序交给两名工人，每人负责一段连续任务，求最大个人工作量的最小值。阈值 5 时，分工 {4}|{2,3} 的每段和都至多 5，因此可行；阈值 4 需要 {4}|{2}|{3} 三段，不可行。允许阈值更大不会破坏原有分工，所以最小可行阈值是 5。

### 理解练习

#### 1. 单调方向

阈值 5 可行，阈值 6 会因为更大而不可行吗？

<details><summary>答案与解释</summary>

在本例不会，同一分工的每段工作量仍至多 6。这就是搜索最小可行值所需的单调性。

</details>

#### 2. 初始范围

能把上界设为 3 吗？

<details><summary>答案与解释</summary>

不能，单个任务就有工作量 4，上界 3 排除了全部可行解。总和 9 是一个安全可行上界，前提是允许一人负责全部任务。

</details>

#### 3. 判定与求解

知道阈值具有单调性，是否可以不实现可行性检查？

<details><summary>答案与解释</summary>

不可以。每次缩小范围都依赖一次正确判定；错误判定可能永久删掉最优值，二分并不能修复它。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 维护不可行下界与可行上界，每次检查中点。
2. 最小可行问题：中点可行缩上界，否则升下界，直到整数边界相邻。

### 具体输入与计算步骤

按顺序包裹[2,3,4]，两天运完，每天容量相同。

1. 容量4需3天；容量5可分[2,3]与[4]，需2天。
2. 容量越大所需天数不增，故最小容量5。

计算结果：先证明判定单调，再谈二分复杂度。

### 换到实际问题中应用

求任务工期上限。

1. 给定工期用独立判定器检查是否能排完。
2. 验证极端上下界和整数溢出，以lo+(hi−lo)/2取中点。

应用结论：若判定器本身错，二分再快也无效。

### 举一反三：改变条件后的完整解答

若改为一天运完，最小容量多少？

<details><summary>变式的推演与答案</summary>

1. 必须把2+3+4全部放入一天。
2. 所需容量9，8不可行。

条件改变后答案为9，单调性仍成立。

</details>

### 原有解释与进一步例题


### Exchange Arguments: Show How to Replace an Optimal Solution’s First Choice

An exchange argument shows that some optimal solution can be transformed into an equally good one beginning with the greedy choice. To maximize the number of compatible unweighted intervals, choose an interval with the earliest finish. Replacing an optimal solution’s first interval with this one leaves at least as much room for later intervals.

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

### 推导与方法参考

- [一手资料](https://docs.python.org/3/library/bisect.html)

[返回分层目录](00-learning-index.md)
