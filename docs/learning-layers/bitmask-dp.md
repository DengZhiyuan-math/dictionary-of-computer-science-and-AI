# Bitmask DP

概念编号：`concept:bitmask-dp` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bitmask-dp/)

## 第一层：概念入门 · 知其然

### 它是什么

Result and explanation: The optimal tour costs 21. Bitmask DP shares subproblems in O(n²2ⁿ) time; it does not make the problem polynomial in size.

### 先看一个例子

Four nodes 0…3 have directed distance matrix [[0,2,9,10],[1,0,6,4],[15,7,0,8],[6,3,12,0]]. Start at 0, visit every other node once, then return to 0.
The optimal tour costs 21. Bitmask DP shares subproblems in O(n²2ⁿ) time; it does not make the problem polynomial in size.

### 理解练习

Is one minimum value per visited set sufficient, without its endpoint?

<details><summary>答案与解释</summary>

No. Different endpoints have different continuation costs. A locally cheaper state may not yield the globally optimal tour.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
