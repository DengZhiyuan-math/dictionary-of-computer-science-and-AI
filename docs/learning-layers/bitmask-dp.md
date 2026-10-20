# Bitmask DP

概念编号：`concept:bitmask-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bitmask-dp/)

## 第一层：概念入门 · 知其然

### 定义

位掩码动态规划用一个整数的二进制位编码有限对象集合，再把这个集合放进子问题状态。例如最低三位分别对应 A、B、C，某位为 1 表示该对象已选。集合并非所有问题都需要的充分状态；如果后续代价依赖最后到达的位置，就还要记录这个位置。它适合对象数量较少、需要区分大量子集的问题，因为 n 个对象有 2 的 n 次方个子集。

### 概念边界与常见混淆

位掩码只是集合的紧凑表示，不会把指数数量的集合变成线性数量。状态能否合并取决于未来决策所需信息，而不是编码写得多短。

### 先看一个例子

给三项任务 A、B、C 分配执行顺序，暂且只跟踪已完成集合。二进制 101 表示完成 A、C，下一项只能选 B；完成后变为 111。若求访问城市的最短路线，走过 {A,C} 后停在 A 与停在 C，下一步去 B 的费用可能不同，所以不能把这两个情况合为同一个数值答案。

### 理解练习

#### 1. 位的含义

最低位对应 A，三位二进制 010 表示哪些任务完成？

<details><summary>答案与解释</summary>

只有 B。它是状态编码，不是完成数量 10 或任务编号 2 的字面清单；位与对象的对应必须固定。

</details>

#### 2. 足够状态

城市路线只记录已访问集合，为什么可能漏掉最优解？

<details><summary>答案与解释</summary>

同一集合的不同终点有不同继续成本。若只留下当前总费用最低的一条，可能删掉更适合下一步的终点，需同时记录终点。

</details>

#### 3. 规模增长

对象从 10 个增至 20 个，子集数量只翻倍吗？

<details><summary>答案与解释</summary>

不是，从 1024 变为 1048576，增加 1024 倍。每个对象只用一位并不意味着算法只需与位数成比例的工作。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 路径状态dp[mask][v]表示恰访问mask内节点并结束于v的最小成本。
2. 转移到未访问u：新mask=mask或(1左移u)，成本加边(v,u)；约O(n²2^n)。

### 具体输入与计算步骤

3节点从0出发需访问1、2再回0，边01=1、02=4、12=2，对称。

1. 路径0→1→2→0成本1+2+4=7。
2. 路径0→2→1→0成本4+2+1=7。

计算结果：最优7，最终需加回起点边，不仅看访问完的状态。

### 换到实际问题中应用

小规模任务分配。

1. mask记录已占任务，当前工人数由位数得到。
2. 向每个未占任务转移，加当前工人的相应费用。

应用结论：共享重复子问题，但没有把指数复杂度变成多项式。

### 举一反三：改变条件后的完整解答

n从10变20，mask数量增多少？

<details><summary>变式的推演与答案</summary>

1. 从2^10=1024变2^20=1048576。
2. 比例2^10=1024。

还未计每状态转移，规模限制必须提前估算。

</details>

### 原有解释与进一步例题


### 原理与推演

Result and explanation: The optimal tour costs 21. Bitmask DP shares subproblems in O(n²2ⁿ) time; it does not make the problem polynomial in size.


### 适用边界与常见误解

Bitmasks do not remove the exponential state count, and language integer widths are limited.

### 例题：Bitmask DP: Remember the Last Node Too

Four nodes 0…3 have directed distance matrix [[0,2,9,10],[1,0,6,4],[15,7,0,8],[6,3,12,0]]. Start at 0, visit every other node once, then return to 0.

1. A state needs both the visited set and the last node: the next edge’s cost depends on the endpoint, even for the same visited set.
2. For example, 0→2→3 costs 9+8=17. Continuing to 1 and then 0 adds 3+1.
3. The full tour 0→2→3→1→0 costs 21. Checking the other five visitation orders confirms none is cheaper.

结果：The optimal tour costs 21. Bitmask DP shares subproblems in O(n²2ⁿ) time; it does not make the problem polynomial in size.

易错点：Omitting the return edge solves a different path problem. With asymmetric distances, reversing a tour need not give an equivalent route.

变式：Is one minimum value per visited set sufficient, without its endpoint?

参考答案：No. Different endpoints have different continuation costs. A locally cheaper state may not yield the globally optimal tour.

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/pages/lecture-notes/)

[返回分层目录](00-learning-index.md)
