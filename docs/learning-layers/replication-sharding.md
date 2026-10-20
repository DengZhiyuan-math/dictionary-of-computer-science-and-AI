# Replication / Sharding

概念编号：`concept:replication-sharding` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/replication-sharding/)

## 第一层：概念入门 · 知其然

### 它是什么

复制把相同数据保存多份以提高可用性；分片把不同数据分到不同节点以扩容。

### 先看一个例子

100 GB数据均匀分2片，每片保留3份副本。

### 理解练习

分2片且复制3份，总数据只剩50 GB吗？

<details><summary>答案与解释</summary>

不是，50 GB是每片逻辑数据，总物理数据约300 GB。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 分片键决定归属，均匀性影响负载；复制协议决定副本如何跟随更新。
2. 复制不自动解决跨片事务，分片也不自动提供副本容错。

### 具体输入与计算步骤

100 GB数据均匀分2片，每片保留3份副本。

1. 每片100/2=50 GB。
2. 每片物理150 GB，两片共300 GB，不含索引与日志。

计算结果：每片物理150 GB，两片共300 GB，不含索引与日志。

### 换到实际问题中应用

订单数据量超过单机容量。

1. 按合适键分片，检查热点和跨片查询，再为每片配置副本。
2. 演练节点故障和重平衡，验证读写一致性约定。

应用结论：演练节点故障和重平衡，验证读写一致性约定。

### 举一反三：改变条件后的完整解答

若90%请求落同一用户，按用户分片能均匀吗？

<details><summary>变式的推演与答案</summary>

1. 该用户始终路由到一个分片。
2. 热点仍存在，需重新设计键、缓存或拆分该用户数据，不能只增加空闲分片。

热点仍存在，需重新设计键、缓存或拆分该用户数据，不能只增加空闲分片。

</details>

### 原有解释与进一步例题


### Definition

Replication stores copies of the same data on multiple nodes; sharding partitions different data across nodes. They solve different problems and can be used together. Replication supports availability and read capacity; sharding distributes storage and work.


### Parameters and mechanism

With D bytes of logical data, S evenly sized shards and R copies of each shard, each shard contains about D/S logical bytes and total replicated storage is about RD, before indexes and overhead. A partition key decides which shard owns a record; replica consistency and failure recovery require separate rules.


### Example

A 900 GB dataset split into 3 shards has about 300 GB per shard. Keeping 2 copies of each shard uses about 1,800 GB in total. Adding replicas does not divide the logical dataset into smaller shards; adding shards does not by itself create failover copies.


### 适用边界与常见误解

The number of copies and the way data is divided solve different problems.

### 推导与方法参考

- [一手资料](https://www.mongodb.com/docs/manual/sharding/)

[返回分层目录](00-learning-index.md)
