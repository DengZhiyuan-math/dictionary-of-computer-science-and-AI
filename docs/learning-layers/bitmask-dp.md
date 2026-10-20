# Bitmask DP

概念编号：`concept:bitmask-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bitmask-dp/)

## 第一层：概念入门 · 知其然

### 它是什么

位掩码动态规划用二进制位表示已选集合，把“已处理哪些对象”纳入状态，适合对象数较少的指数问题。

### 先看一个例子

三盏灯用三位0/1表示开关状态，101代表第0和第2盏开着。

### 理解练习

101表示三盏灯中哪几盏？

<details><summary>答案与解释</summary>

按第0位为最低位约定，第0和第2盏开，第1盏关。

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
