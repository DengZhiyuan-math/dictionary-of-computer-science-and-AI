# Cache

概念编号：`concept:cache` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cache/)

## 第一层：概念入门 · 知其然

### 定义

缓存保存可复用的数据或计算结果，使后续请求不必重复访问较慢来源或重新计算。查找先检查缓存，命中则复用，未命中才访问来源并可能写回。正确性取决于键是否完整表达计算条件，以及数据变化后何时失效；淘汰解决容量问题，失效解决旧结果问题，两者不同。

### 概念边界与常见混淆

高命中率不等于结果正确；缓存还占空间并增加一致性设计。缓存冷启动、热门项集中失效等会让源服务瞬时负载升高。

### 先看一个例子

房价服务把“地址→估价”缓存。如果模型版本更新或面积记录改变，同一地址旧估价可能无效；键可包含版本，或更新时主动失效。只设置一小时过期意味着期间可能读旧值，不是即时一致保证。

### 理解练习

#### 1. 键

不同币种结果只按地址共用键合理吗？

<details><summary>答案与解释</summary>

若结果依赖币种就不合理，键缺失条件会返回错误复用。

</details>

#### 2. 过期

一小时TTL保证这小时内与源数据一样新吗？

<details><summary>答案与解释</summary>

不保证，只限制缓存保留时间，源可在中途改变。

</details>

#### 3. 淘汰

容量满删除最少使用项就修复所有旧值吗？

<details><summary>答案与解释</summary>

不能，容量策略与失效规则不同，未淘汰项仍可能旧。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 命中直接返回缓存，未命中访问源数据并填充，需防重复加载与旧值回填。
2. LRU淘汰最久未用项，只管容量顺序，不证明内容与源数据一致。

### 具体输入与计算步骤

10次读取8次命中，命中耗1毫秒，未命中总耗11毫秒。

1. 命中率8/10=0.8。
2. 平均耗时(8×1+2×11)/10=3毫秒，前提是这里未命中时间已含查缓存。

计算结果：平均耗时(8×1+2×11)/10=3毫秒，前提是这里未命中时间已含查缓存。

### 换到实际问题中应用

缓存热门商品详情。

1. 为价格与描述分别选择可接受的新鲜度，更新后按明确协议失效。
2. 监控命中、延迟与旧数据事件，热点失效时合并并发回源。

应用结论：监控命中、延迟与旧数据事件，热点失效时合并并发回源。

### 举一反三：改变条件后的完整解答

容量2的LRU依次读A、B、A、C，最后淘汰谁？

<details><summary>变式的推演与答案</summary>

1. 第三次读A把A变为最近使用，B最久未用。
2. 加入C时淘汰B，缓存保留A、C；不按首次插入顺序淘汰A。

加入C时淘汰B，缓存保留A、C；不按首次插入顺序淘汰A。

</details>

### 原有解释与进一步例题


### 原理与推演

Round robin distributes requests among instances in turn with little overhead. Least connections sends new work to instances with fewer connections, which can help when request durations vary, although connection count is not a perfect load measure. Consistent hashing maps objects and nodes into a stable assignment structure, reducing key movement when nodes join or leave; it commonly supports sharding and cache placement. All allocate work or data, but consistent hashing specifically preserves mapping stability under membership changes.

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

### 推导与方法参考

- [一手资料](https://www.rfc-editor.org/rfc/rfc9111)

[返回分层目录](00-learning-index.md)
