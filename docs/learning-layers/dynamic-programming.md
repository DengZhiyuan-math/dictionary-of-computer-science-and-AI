# Dynamic Programming

概念编号：`concept:dynamic-programming` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dynamic-programming/)

## 第一层：概念入门 · 知其然

### 它是什么

动态规划保存重复子问题答案，再由小问题构成大问题。

### 先看一个例子

每次上1或2阶，求到第4阶的走法数。

### 用一个小故事建立直觉

几位同学分别询问“到第三层有多少种走法”。值班同学把每层算好的结果写在白板上，后来的同学直接查表。白板省去了重复计算，但前提是问题规则相同；若有人增加“不能连续走两级”的限制，只记录层数就不足以回答，白板还得区分上一步怎么走。

### 理解练习

为何不能只看最后一步长度？

<details><summary>答案与解释</summary>

还需知道到达前面各阶的走法数。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 最后一步来自i−1或i−2，两类互斥，dp[i]=dp[i−1]+dp[i−2]。
2. dp[0]=1表示空走法，dp[1]=1，按阶数递增避免读未算状态。

### 具体输入与计算步骤

每次上1或2阶，求到第4阶的走法数。

1. dp[2]=1+1=2，dp[3]=2+1=3。
2. dp[4]=3+2=5，可只保留前两个数。

计算结果：dp[4]=3+2=5，可只保留前两个数。

### 换到实际问题中应用

面额1、3、4，凑6元最少硬币。

1. f[0]=0，其他不可达，按金额尝试f[a−coin]+1取最小。
2. f[6]=f[3]+1=2，对应3+3，优于贪心4+1+1。

应用结论：f[6]=f[3]+1=2，对应3+3，优于贪心4+1+1。

### 举一反三：改变条件后的完整解答

禁止落在第2阶后，到第4阶有几种？

<details><summary>变式的推演与答案</summary>

1. 设dp[2]=0，dp[3]=0+1=1。
2. dp[4]=1+0=1，唯一动作序列为1、2、1。

dp[4]=1+0=1，唯一动作序列为1、2、1。

</details>

### 原有解释与进一步例题


### 原理与推演

The central question in dynamic programming is not how to fill a table, but how to define the state. A state should retain information needed for future decisions without carrying irrelevant history. In a knapsack problem, for example, the current item and remaining capacity define the state; given these, the order in which earlier items were considered usually no longer matters.

If different choice sequences reach the same state, its best result can be computed once and reused: this is an overlapping subproblem. Optimization also requires that the current optimum can be constructed from suitable subproblem optima, usually called optimal substructure. Top-down memoization solves and caches states when encountered; bottom-up computation evaluates them in dependency order.

Examples include knapsack, longest common subsequence, edit distance, and certain path problems. The number of states can be enormous; adding several dimensions can cause state explosion. Dynamic programming does not make every combinatorial problem cheap. In an interview, explain that a suitable state definition merges subproblems that recur along different paths, using stored intermediate results to avoid repeated search.


### 适用边界与常见误解

Memoization alone is insufficient; state meanings and boundaries must also be clear.

### 领域应用

- [Postorder DP · 树上动态规划的返回值与全局答案](postorder-dp.md)：动态规划的状态与递推统一解释；这里专门区分树节点向父节点返回什么、怎样更新全局答案。
- [Knapsack · 物品使用次数与一维状态更新](0-1-knapsack-unbounded-knapsack.md)：复用动态规划的状态定义，背包页面聚焦每件物品能否重复以及循环方向为何不同。

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/mit6_006f11_lec19/)

[返回分层目录](00-learning-index.md)
