# Weighted Interval Scheduling

概念编号：`concept:weighted-interval-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/weighted-interval-dp/)

## 第一层：概念入门 · 知其然

### 它是什么

带权区间调度选互不冲突的任务使总收益最大；收益不同，最早结束贪心可能失效。

### 先看一个例子

两小时赚100的任务，可能优于先接一小时赚1导致后面不能接的大单。

### 理解练习

带权任务为何不能只选最早结束？

<details><summary>答案与解释</summary>

早结束可能收益很低且阻挡高收益任务，需要比较总权重而非任务数。

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
