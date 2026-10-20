# Dynamic Programming

概念编号：`concept:dynamic-programming` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dynamic-programming/)

## 第一层：概念入门 · 知其然

### 它是什么

动态规划把问题表达成状态和状态之间的递推关系，保存重复子问题的结果，避免反复求解。求最优值时，状态还必须包含后续决策所需的信息。

### 先看一个例子

每次爬一级或两级台阶。到第 n 级的走法，可按最后一步来自 n−1 级还是 n−2 级分成两类，所以 f(n)=f(n−1)+f(n−2)。设 f(0)=1、f(1)=1，就有 f(2)=2、f(3)=3。

### 用一个小故事建立直觉

几位同学分别询问“到第三层有多少种走法”。值班同学把每层算好的结果写在白板上，后来的同学直接查表。白板省去了重复计算，但前提是问题规则相同；若有人增加“不能连续走两级”的限制，只记录层数就不足以回答，白板还得区分上一步怎么走。

### 理解练习

给递归加一个缓存，是否就能保证动态规划的状态设计正确？

<details><summary>答案与解释</summary>

不能。缓存只保存已有状态的答案。若把影响未来的条件遗漏，例如遗漏上一步是否走了两级，不同子问题会被误当成同一个问题，保存得再快也会算错。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

The central question in dynamic programming is not how to fill a table, but how to define the state. A state should retain information needed for future decisions without carrying irrelevant history. In a knapsack problem, for example, the current item and remaining capacity define the state; given these, the order in which earlier items were considered usually no longer matters.

If different choice sequences reach the same state, its best result can be computed once and reused: this is an overlapping subproblem. Optimization also requires that the current optimum can be constructed from suitable subproblem optima, usually called optimal substructure. Top-down memoization solves and caches states when encountered; bottom-up computation evaluates them in dependency order.

Examples include knapsack, longest common subsequence, edit distance, and certain path problems. The number of states can be enormous; adding several dimensions can cause state explosion. Dynamic programming does not make every combinatorial problem cheap. In an interview, explain that a suitable state definition merges subproblems that recur along different paths, using stored intermediate results to avoid repeated search.


### 适用边界与常见误解

Memoization alone is insufficient; state meanings and boundaries must also be clear.

### 领域应用

- [Postorder DP · 树上动态规划的返回值与全局答案](postorder-dp.md)：动态规划的状态与递推统一解释；这里专门区分树节点向父节点返回什么、怎样更新全局答案。
- [Knapsack · 物品使用次数与一维状态更新](0-1-knapsack-unbounded-knapsack.md)：复用动态规划的状态定义，背包页面聚焦每件物品能否重复以及循环方向为何不同。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
