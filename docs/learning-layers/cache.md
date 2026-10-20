# Cache

概念编号：`concept:cache` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cache/)

## 第一层：概念入门 · 知其然

### 它是什么

Round robin distributes requests among instances in turn with little overhead. Least connections sends new work to instances with fewer connections, which can help when request durations vary, although connection count is not a perfect load measure. Consistent hashing maps objects and nodes into a stable assignment structure, reducing key movement when nodes join or leave; it commonly supports sharding and cache placement. All allocate work or data, but consistent hashing specifically preserves mapping stability under membership changes.

### 先看一个例子

Cache capacity is 2. Display most recently used entries on the left. Execute put(1), put(2), get(1), put(3), get(2).
Accessing 1 changes the later eviction choice. A hash table plus doubly linked list gives typical operations expected O(1) time and uses O(capacity) space.

### 理解练习

At capacity 3, would get(2) still miss?

<details><summary>答案与解释</summary>

No. Inserting 3 would not exceed capacity, so 2 would remain cached.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

LRU evicts the least recently accessed data, exploiting temporal locality. LFU evicts less frequently accessed data and can suit stable long-term popularity, but may retain formerly popular items too long. When a hot cache entry expires, many requests may hit the database simultaneously. Request coalescing, mutually exclusive rebuilding, early refresh, and expiration jitter address different bursts. Caching policy includes both what to evict and how to recover after expiration or failure.

Scenario and inputs: Cache capacity is 2. Display most recently used entries on the left. Execute put(1), put(2), get(1), put(3), get(2).


### 适用边界与常见误解

LRU decides which entry to evict; a KV cache reuses attention keys and values. They operate on different data and constraints.

### 例题：LRU: One Access Changes the Eviction Choice

Cache capacity is 2. Display most recently used entries on the left. Execute put(1), put(2), get(1), put(3), get(2).

1. The first two writes give [2,1]. get(1) hits and moves 1 to the front, giving [1,2].
2. put(3) exceeds capacity, evicts least recently used 2, and leaves [3,1].
3. get(2) misses, leaving [3,1]. A hash table locates nodes; a doubly linked list moves them to the front and removes the tail.

结果：Accessing 1 changes the later eviction choice. A hash table plus doubly linked list gives typical operations expected O(1) time and uses O(capacity) space.

易错点：The demo displays order with a short array; that array implementation is not O(1). LRU does not evict by insertion time or guarantee the optimal hit rate.

变式：At capacity 3, would get(2) still miss?

参考答案：No. Inserting 3 would not exceed capacity, so 2 would remain cached.

### 领域应用

- [KV Cache / FlashAttention · 注意力推理的缓存与访存](kv-cache-flashattention.md)：共享缓存的复用与失效概念；注意力页面只保留 KV 状态、显存成本和访存优化。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
