# Hash Table

概念编号：`concept:hash-table` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/hash-table/)

## 第一层：概念入门 · 知其然

### 它是什么

哈希表用哈希函数把键映射到存储位置，支持按键查找、插入和删除。不同键可能映射到同一位置，这叫冲突，需要另外处理。

### 先看一个例子

把编号按除以 10 的余数分到十个桶，编号 23 和 43 都进入 3 号桶。查找 43 时先去 3 号桶，再比较完整编号，不能把余数相同当作键相同。

### 用一个小故事建立直觉

图书管理员用书号决定把借书卡放进哪个抽屉。知道书号后，就能直奔一个抽屉。抽屉里可能有多张卡，所以仍要核对书号；如果规则让大多数卡都挤进同一个抽屉，查找就会变慢。抽屉定位像哈希函数，核对卡片像冲突处理。

### 理解练习

两个键的哈希值相同，是否说明它们是同一个键？

<details><summary>答案与解释</summary>

不能。哈希映射允许冲突，必须继续比较键。查找的平均效率还依赖哈希分布、负载和冲突处理，不能由“按键定位”直接推出每次都只做一步。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A hash table is a key concept to understand. A hash function maps a key to a storage location for fast lookup. Python dictionaries and sets use hash-based ideas. Average lookup is usually fast, but collisions, memory costs, and worst cases still exist. A hash map stores keys and values; a hash set primarily tests whether an element is present.


### 适用边界与常见误解

Expected constant-time lookup is not an unconditional worst-case guarantee.

### 例题：Two Sum: Look Up Before Inserting

Array [4,1,5,3], target sum 8. Return two distinct positions. The hash table stores previously read values and their indices.

1. At index 0, the value is 4 and its complement is another 4. It is absent, so insert 4→0. At index 1, the value is 1 and the required 7 is also absent.
2. At index 2, the value is 5 and the required complement is 3. After the failed lookup, insert 5→2.
3. At index 3, the value is 3 and the required 5 is found at index 2, giving positions (2,3). Each lookup considers only elements before the current position.

结果：5+3=8, so return zero-based indices [2,3]. With expected constant-time hash lookup, total expected time is O(n) and auxiliary space is O(n).

易错点：Inserting the current position before looking up its complement can use one element twice. With duplicate values, distinguish values from positions.

变式：For [3,3] with target 6, why may both equal numbers be used?

参考答案：The first lookup finds no 3, then saves position 0. The second lookup finds position 0. The two positions are distinct.

### 例题：Prefix Sums: Counting Still Works with Negative Numbers

For [1,-1,1], count contiguous subarrays whose sum is 1. Let s be the prefix sum and initialize its frequency table to {0:1}.

1. After the first element, s=1. Look up s-1=0 and find one prior prefix. Add 1 to the count, then record prefix sum 1.
2. After the second element, s=0. Looking up -1 finds no prefix. Increase the frequency of prefix sum 0 to 2.
3. After the third element, s=1. Looking up 0 finds two prior prefixes, raising the total count to 3. Then record the current prefix.

结果：The three index intervals are [0,0], [0,2] and [2,2]. Expected time O(n), auxiliary space O(n).

易错点：Query before recording the current prefix; otherwise a target of 0 counts an empty interval. With negative values, window sums need not change monotonically as the window grows.

变式：How many nonempty zero-sum intervals does [0,0,0] contain?

参考答案：6: three of length 1, two of length 2 and one of length 3. Prefix frequencies contribute 1+2+3.

### 例题：LRU: One Access Changes the Eviction Choice

Cache capacity is 2. Display most recently used entries on the left. Execute put(1), put(2), get(1), put(3), get(2).

1. The first two writes give [2,1]. get(1) hits and moves 1 to the front, giving [1,2].
2. put(3) exceeds capacity, evicts least recently used 2, and leaves [3,1].
3. get(2) misses, leaving [3,1]. A hash table locates nodes; a doubly linked list moves them to the front and removes the tail.

结果：Accessing 1 changes the later eviction choice. A hash table plus doubly linked list gives typical operations expected O(1) time and uses O(capacity) space.

易错点：The demo displays order with a short array; that array implementation is not O(1). LRU does not evict by insertion time or guarantee the optimal hit rate.

变式：At capacity 3, would get(2) still miss?

参考答案：No. Inserting 3 would not exceed capacity, so 2 would remain cached.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
