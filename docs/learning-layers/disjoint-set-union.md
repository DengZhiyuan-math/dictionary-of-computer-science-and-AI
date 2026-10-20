# Disjoint-set Union

概念编号：`concept:disjoint-set-union` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/disjoint-set-union/)

## 第一层：概念入门 · 知其然

### 它是什么

Disjoint-set union (DSU) maintains disjoint sets. find returns a set representative, and union merges two sets. Two nodes are connected exactly when their representatives match. Representatives may change after unions, so do not treat a root’s label as a permanent application ID.

### 先看一个例子

Six nodes 0…5 receive undirected connections (0,1), (2,3), (1,2), (0,3), (4,5), in that order.
The final partition is {0,1,2,3} and {4,5}. Representatives depend on the union strategy, but membership does not.

### 理解练习

Remove (1,2) but still add (0,3). How many final sets remain?

<details><summary>答案与解释</summary>

Still 2. Connection (0,3) merges the previously separate {0,1} and {2,3}.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Ordinary disjoint-set union is good at online queries that only add connections, and cannot directly reverse a union to process arbitrary deletions. Offline dynamic connectivity, rollback structures, etc. require additional design; when rolling back, it is usually avoided to directly use path compression that is difficult to recover.


### 适用边界与常见误解

Ordinary DSU mainly handles added connections. Path compression changes tree shape without changing set membership.

### 例题：Union-Find: Repeated Connections Do Not Reduce Set Count

Six nodes 0…5 receive undirected connections (0,1), (2,3), (1,2), (0,3), (4,5), in that order.

1. Start with 6 sets. The first two connections each merge a pair, leaving 4 sets.
2. After merging (1,2), nodes 0,1,2,3 share one set. The count becomes 3.
3. For (0,3), both roots already match, so no merge occurs. Finally (4,5) reduces the count to 2.

结果：The final partition is {0,1,2,3} and {4,5}. Representatives depend on the union strategy, but membership does not.

易错点：Do not subtract one for every edge. Repeated edges or edges closing a cycle may cause no new union.

变式：Remove (1,2) but still add (0,3). How many final sets remain?

参考答案：Still 2. Connection (0,3) merges the previously separate {0,1} and {2,3}.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
