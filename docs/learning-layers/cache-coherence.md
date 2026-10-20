# Distributed Cache Coherence / Leases

概念编号：`concept:cache-coherence` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cache-coherence/)

## 第一层：概念入门 · 知其然

### 它是什么

分布式缓存一致性处理缓存怎样跟随源数据更新，填充租约可阻止迟到读者把旧值写回。

### 先看一个例子

读者拿到旧值1后暂停，写者提交2并删缓存，读者随后恢复。

### 理解练习

先写数据库再删缓存就彻底没有旧值回填吗？

<details><summary>答案与解释</summary>

没有，暂停的旧读者仍可能在删除后把1写回来。

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
