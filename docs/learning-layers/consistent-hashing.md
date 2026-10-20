# Consistent Hashing

概念编号：`concept:consistent-hashing` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/consistent-hashing/)

## 第一层：概念入门 · 知其然

### 它是什么

In a clockwise ring, a key belongs to the first token at or after its hash, with wraparound. A sorted token array supports this lookup with binary search.

### 先看一个例子

例子：环上的节点令牌为 20、60、90，键哈希 50 归到顺时针首个令牌 60。加入令牌 40 后，哈希 30 的键从 60 转到 40，哈希 50 仍归 60。迁移范围由环区间决定，并非所有键重新分配。

### 理解练习

用自己的话解释：上面的情景为什么是“Consistent Hashing”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：In a clockwise ring, a key belongs to the first token at or after its hash, with wraparound. A sorted token array supports this lookup with binary search.

情景依据：例子：环上的节点令牌为 20、60、90，键哈希 50 归到顺时针首个令牌 60。加入令牌 40 后，哈希 30 的键从 60 转到 40，哈希 50 仍归 60。迁移范围由环区间决定，并非所有键重新分配。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Inserting a token transfers the interval from the previous token, exclusive, to the new token, inclusive. Virtual tokens can improve balance; replication must select distinct physical owners when required.


### 适用边界与常见误解

Limited remapping does not imply equal load, automatic data migration, or consistency during reconfiguration. One hot key can remain a bottleneck.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
