# Consistent Hashing

概念编号：`concept:consistent-hashing` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/consistent-hashing/)

## 第一层：概念入门 · 知其然

### 它是什么

一致性哈希把键与节点放在同一圆环，成员变化时只迁移相关区间，避免全部重分配。

### 先看一个例子

环取0至99，节点令牌20、60、90，键哈希为10、30、70、95。

### 理解练习

键95找不到更大令牌就无主了吗？

<details><summary>答案与解释</summary>

不会，顺时针绕回令牌20。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 键归属于第一个不小于其哈希的令牌，无则绕回。
2. 新增令牌v接管前一令牌之后至v的区间，其他归属不变；虚拟令牌可改善平衡。

### 具体输入与计算步骤

环取0至99，节点令牌20、60、90，键哈希为10、30、70、95。

1. 原归属10→20、30→60、70→90、95→20。
2. 插入40只转移区间(20,40]，键30改归40，其余三键不变。

计算结果：插入40只转移区间(20,40]，键30改归40，其余三键不变。

### 换到实际问题中应用

给缓存集群扩容。

1. 用固定哈希、排序令牌表及二分查找路由，成员变更按受影响区间迁移。
2. 复制时选择不同物理节点，避免多个虚拟令牌误算为多个容错副本。

应用结论：复制时选择不同物理节点，避免多个虚拟令牌误算为多个容错副本。

### 举一反三：改变条件后的完整解答

若移除令牌60，原归60的键30去哪里？

<details><summary>变式的推演与答案</summary>

1. 在未插入40的原环中，下一个顺时针令牌为90。
2. 键30转到90，令牌20和90原有键无需重算归属。

键30转到90，令牌20和90原有键无需重算归属。

</details>

### 原有解释与进一步例题


### 原理与推演

In a clockwise ring, a key belongs to the first token at or after its hash, with wraparound. A sorted token array supports this lookup with binary search.

Inserting a token transfers the interval from the previous token, exclusive, to the new token, inclusive. Virtual tokens can improve balance; replication must select distinct physical owners when required.


### 例子

例子：环上的节点令牌为 20、60、90，键哈希 50 归到顺时针首个令牌 60。加入令牌 40 后，哈希 30 的键从 60 转到 40，哈希 50 仍归 60。迁移范围由环区间决定，并非所有键重新分配。


### 适用边界与常见误解

Limited remapping does not imply equal load, automatic data migration, or consistency during reconfiguration. One hot key can remain a bottleneck.

### 推导与方法参考

- [一手资料](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/consistent-hashing.html)

[返回分层目录](00-learning-index.md)
