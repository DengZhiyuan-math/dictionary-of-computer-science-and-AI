# Distributed Cache Coherence / Leases

概念编号：`concept:cache-coherence` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cache-coherence/)

## 第一层：概念入门 · 知其然

### 权威数据与缓存副本

应用缓存保存经常读取数据的副本，用来减少访问数据库等权威来源的成本。缓存缺失时，应用回源读取并尝试把结果填回缓存。副本提高读取效率，但数据更新后需要明确哪些旧值仍可被看见。


### 定义

这里的分布式缓存一致性，讨论应用缓存与权威数据在并发读取、更新和填充时如何保持声明的可见性约定。它不同于 CPU 多级缓存的硬件一致性协议。本节关注失效后旧读结果迟到回填的一种竞争，而非承诺所有时刻全局最新。

### 理解定义中的术语与关系

#### 删除缓存之后仍可能回填旧值

“写数据库后删缓存”不能阻止一个更早开始、尚未填缓存的读者。填充许可给一次合法回源操作一个可核验标识；更新使旧许可失效，缓存接收填充时同时检查许可。检查与写入若分成两步，竞争窗口仍然存在。

### 概念边界与常见混淆

填充许可只解决所声明协议覆盖的竞争，不等于分布式事务或全局强读。过期时间限制条目寿命，也不能单独阻止过期前或失效后的旧值回填。

### 先看一个例子

读者取得旧值一后暂停；写者把数据库改成二并删除缓存；旧读者恢复，把一填回去。之后读者又会命中旧一。若旧读者同时持有许可七，而更新使七作废，那么它的迟到填充会被拒绝，后续合法读取才能重新填入新值。

### 理解练习

#### 1. 删除为什么不够

写数据库再删缓存已经完成，为什么例子还会重新出现旧一？

<details><summary>答案与解释</summary>

旧读者的回源开始得更早，但回填发生得更晚。删除只去掉当时的条目，没有自动取消所有正在进行的旧读。

</details>

#### 2. 校验与接收要原子进行

先看到许可七有效，暂停后再写入，此间七被撤销，是否安全？

<details><summary>答案与解释</summary>

不安全。旧值仍能越过已经发生的失效。必须让有效性校验与接受填充在同一不可被插入更新的步骤中完成。

</details>

#### 3. 缓存一致性的范围

这一机制防住迟到回填，是否就能断言任意客户端随时读到全局最新数据？

<details><summary>答案与解释</summary>

不能。还要考虑副本、网络故障、更新传播及读取接口。应针对完整协议声明保证，不能从一个局部竞争的修复推导全部一致性。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 缓存缺失时发放该键填充令牌，失效时撤销令牌。
2. 接收回填时原子检查令牌，旧令牌无效则拒绝，阻断所示交错；不等同全局串行化。

### 具体输入与计算步骤

读者拿到旧值1后暂停，写者提交2并删缓存，读者随后恢复。

1. 读者取得令牌7与数据库值1；写者提交2，缓存失效使7作废。
2. 读者用7填1被拒，下一次合法读可获取2，避免把旧1重新变成缓存命中。

计算结果：读者用7填1被拒，下一次合法读可获取2，避免把旧1重新变成缓存命中。

### 换到实际问题中应用

处理热门资料被更新时的缓存回源竞争。

1. 将填充令牌与按键失效绑定，并让校验与写缓存不可分开。
2. 监控令牌拒绝与失败恢复，TTL仍可限制寿命，但不能代替该竞争控制。

应用结论：监控令牌拒绝与失败恢复，TTL仍可限制寿命，但不能代替该竞争控制。

### 举一反三：改变条件后的完整解答

若先检查7有效，再暂停，写者使其失效，随后不再检查直接写呢？

<details><summary>变式的推演与答案</summary>

1. 检查和写入之间仍有竞争窗口。
2. 旧值仍可回填；必须原子校验并接收填充，而不是两个独立步骤。

旧值仍可回填；必须原子校验并接收填充，而不是两个独立步骤。

</details>

### 原有解释与进一步例题


### 原理与推演

In cache-aside, a reader can miss, read an old database value, pause, and refill after a writer commits and deletes the cache entry. Deleting after the database write does not eliminate that interleaving.

Grant a per-key fill token and invalidate it on deletion. Check the token atomically when accepting a fill. A delayed reader with an invalid token cannot repopulate that entry with its old value.


### 例子

例子：读者从数据库拿到旧值 1 后暂停；写者提交新值 2 并删除缓存；随后读者恢复，把旧值 1 填回缓存。仅仅“先写库再删缓存”仍可能产生这个交错，需要按版本、租约或明确失效协议处理。


### 适用边界与常见误解

This lease protects the illustrated stale-fill race. It is not a CPU cache-coherence protocol, a normal TTL, or a proof of globally serializable database and cache reads.

### 推导与方法参考

- [一手资料](https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf)

[返回分层目录](00-learning-index.md)
