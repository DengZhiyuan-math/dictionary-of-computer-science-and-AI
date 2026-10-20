# Distributed Cache Coherence / Leases

概念编号：`concept:cache-coherence` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cache-coherence/)

## 第一层：概念入门 · 知其然

### 它是什么

In cache-aside, a reader can miss, read an old database value, pause, and refill after a writer commits and deletes the cache entry. Deleting after the database write does not eliminate that interleaving.

### 先看一个例子

例子：读者从数据库拿到旧值 1 后暂停；写者提交新值 2 并删除缓存；随后读者恢复，把旧值 1 填回缓存。仅仅“先写库再删缓存”仍可能产生这个交错，需要按版本、租约或明确失效协议处理。

### 理解练习

用自己的话解释：上面的情景为什么是“Distributed Cache Coherence / Leases”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：In cache-aside, a reader can miss, read an old database value, pause, and refill after a writer commits and deletes the cache entry. Deleting after the database write does not eliminate that interleaving.

情景依据：例子：读者从数据库拿到旧值 1 后暂停；写者提交新值 2 并删除缓存；随后读者恢复，把旧值 1 填回缓存。仅仅“先写库再删缓存”仍可能产生这个交错，需要按版本、租约或明确失效协议处理。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Grant a per-key fill token and invalidate it on deletion. Check the token atomically when accepting a fill. A delayed reader with an invalid token cannot repopulate that entry with its old value.


### 适用边界与常见误解

This lease protects the illustrated stale-fill race. It is not a CPU cache-coherence protocol, a normal TTL, or a proof of globally serializable database and cache reads.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
