# Replication / Sharding

概念编号：`concept:replication-sharding` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/replication-sharding/)

## 第一层：概念入门 · 知其然

### 定义

复制把同一逻辑数据保存为多个副本，用于容错、读扩展等；分片把不同数据划分到不同节点，扩展总容量和部分处理能力。一套系统可以每个分片又有多个副本。副本如何同步、读到什么版本，与数据怎样分片是两个不同设计问题。

### 概念边界与常见混淆

复制延迟可能造成旧读，分片键不均可能造成热点。跨分片查询和事务需要额外协调，不能把节点数直接当性能倍数。

### 先看一个例子

100万条用户记录按编号分成两个50万条分片，每片再复制三份，共保存六份分片数据。某分片主节点故障可由其副本接替，但另一个分片不因存着不同用户就天然能替代它。副本数增多不等于业务记录变成三百万个不同用户。

### 理解练习

#### 1. 容量

同一份数据复制三次，逻辑可容纳用户数就三倍吗？

<details><summary>答案与解释</summary>

不直接，复制消耗额外空间，容量扩展通常需要分配不同数据。

</details>

#### 2. 旧读

主副本更新后，所有异步副本立刻都有新值吗？

<details><summary>答案与解释</summary>

不保证，传播需要时间，读取语义需明确。

</details>

#### 3. 热点

大客户全在一个分片，加另一空分片就必然解压吗？

<details><summary>答案与解释</summary>

不一定，需重新分配负载或改变分片策略；空节点不会自动分担请求。

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
