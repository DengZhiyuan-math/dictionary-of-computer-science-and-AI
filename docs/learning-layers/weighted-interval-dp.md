# Weighted Interval Scheduling

概念编号：`concept:weighted-interval-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/weighted-interval-dp/)

## 第一层：概念入门 · 知其然

### 定义

带权区间调度是在一组有开始时间、结束时间和收益的任务中，选择互不重叠的子集，使总收益最大。这里约定结束时刻等于另一个任务的开始时刻可衔接，任务不可拆分，收益相加。按结束时间排序后，每个任务只需比较两类方案：不选它，或选它并加上与它兼容的早期任务最优解；这就是该问题的动态规划分解。

### 概念边界与常见混淆

兼容前驱是结束时间不晚于当前开始时间的最靠后位置，不是排序后紧挨着的任务。若还有限制机器数量、切换费用或任务间收益相互影响，原分解可能不再充分。

### 先看一个例子

任务 A 为 9–10 点、收益 3，B 为 10–11 点、收益 3，C 为 9–11 点、收益 10。选结束最早的 A 后再选 B，收益是 6；只选 C 则是 10。在结束时间相同时约定先处理 B 再处理 C；处理 C 时比较“此前 A+B 的 6”与“选 C 的 10”，应取后者。这与最多安排场次是不同目标。

### 理解练习

#### 1. 目标差别

例子中若所有收益都改为 1，最优选法是否改变？

<details><summary>答案与解释</summary>

改变，A+B 收益为 2，而 C 为 1，此时与最多场次相同。收益条件决定目标，不能沿用先前结论。

</details>

#### 2. 边界衔接

A 恰好在 B 开始时结束，按本节规则能同时选吗？

<details><summary>答案与解释</summary>

可以，因为约定端点相接不冲突。若实际任务需要清场时间，应把它计入区间或兼容规则，不能暗中忽略。

</details>

#### 3. 两个分支

选当前任务时，能否直接加上所有更早结束任务的总收益？

<details><summary>答案与解释</summary>

不能，早期任务之间也可能冲突。需要的是兼容时间范围内已算出的最优可行收益，不是无条件求和。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 按结束时间排序，p(i)为与i兼容的最后任务，约定结束≤开始可兼容。
2. dp[i]=max(dp[i−1],w[i]+dp[p(i)])，分别不选或选i。

### 具体输入与计算步骤

任务A[0,2)值5、B[2,4)值6、C[0,4)值12。

1. 只选A和B得11。
2. C收益12，dp最优max(11,12)=12。

计算结果：不能用任务数量最多替代权重最优。

### 换到实际问题中应用

安排收费会议室。

1. 按清场时间修正每项实际结束，再二分兼容前驱。
2. 计算dp并保存选择，逆向恢复预约列表。

应用结论：收益和时间约束共同决定安排。

### 举一反三：改变条件后的完整解答

若C收益改为10呢？

<details><summary>变式的推演与答案</summary>

1. A+B仍11。
2. max(11,10)=11。

最优变为A和B；状态转移无需改变。

</details>

### 原有解释与进一步例题


### Definition

Weighted interval scheduling selects nonoverlapping intervals to maximize total weight. Sorting by finish time makes the final selected interval support a useful recurrence.


### Parameters and mechanism

Let p(i) be the last earlier interval compatible with interval i, and w_i its weight. Then DP[i]=max(DP[i-1],w_i+DP[p(i)]), with DP[0]=0. Define endpoint compatibility explicitly; binary search can compute predecessor indices.


### Example

Suppose A=[0,2] has weight 4, B=[2,4] weight 5 and C=[0,4] weight 8, allowing touching endpoints. A+B earns 9 and beats C. Choosing the highest individual weight first would miss this result.


### 适用边界与常见误解

Maximizing task count differs from maximizing reward; earliest-finish greedy does not apply unconditionally.

### 推导与方法参考

- [一手资料](https://www.cs.princeton.edu/courses/archive/spring13/cos423/lectures/06DynamicProgrammingI.pdf)

[返回分层目录](00-learning-index.md)
