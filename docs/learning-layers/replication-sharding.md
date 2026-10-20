# Replication / Sharding

概念编号：`concept:replication-sharding` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/replication-sharding/)

## 第一层：概念入门 · 知其然

### 它是什么

Replication stores copies of the same data on multiple nodes; sharding partitions different data across nodes. They solve different problems and can be used together. Replication supports availability and read capacity; sharding distributes storage and work.

### 先看一个例子

A 900 GB dataset split into 3 shards has about 300 GB per shard. Keeping 2 copies of each shard uses about 1,800 GB in total. Adding replicas does not divide the logical dataset into smaller shards; adding shards does not by itself create failover copies.

### 理解练习

用自己的话解释：上面的情景为什么是“Replication / Sharding”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Replication stores copies of the same data on multiple nodes; sharding partitions different data across nodes. They solve different problems and can be used together. Replication supports availability and read capacity; sharding distributes storage and work.

情景依据：A 900 GB dataset split into 3 shards has about 300 GB per shard. Keeping 2 copies of each shard uses about 1,800 GB in total. Adding replicas does not divide the logical dataset into smaller shards; adding shards does not by itself create failover copies.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

With D bytes of logical data, S evenly sized shards and R copies of each shard, each shard contains about D/S logical bytes and total replicated storage is about RD, before indexes and overhead. A partition key decides which shard owns a record; replica consistency and failure recovery require separate rules.


### 适用边界与常见误解

The number of copies and the way data is divided solve different problems.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
