# Hash Table

概念编号：`concept:hash-table` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/hash-table/)

## 第一层：概念入门 · 知其然

### 它是什么

哈希表把键映射到桶中，通过少量候选比较快速查找。

### 先看一个例子

哈希函数h(k)=k mod 5，插入7与12。

### 用一个小故事建立直觉

图书管理员用书号决定把借书卡放进哪个抽屉。知道书号后，就能直奔一个抽屉。抽屉里可能有多张卡，所以仍要核对书号；如果规则让大多数卡都挤进同一个抽屉，查找就会变慢。抽屉定位像哈希函数，核对卡片像冲突处理。

### 理解练习

两个键落同桶就代表相同吗？

<details><summary>答案与解释</summary>

不代表，还需比较原键。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 哈希把大键空间压到有限桶，碰撞不可避免。
2. 链表或开放寻址解决碰撞；平均常数时间依赖负载和哈希质量。

### 具体输入与计算步骤

哈希函数h(k)=k mod 5，插入7与12。

1. h(7)=2，h(12)=2，桶2存两个候选。
2. 查12时先定位桶2，再比较键；最坏需2次键比较。

计算结果：查12时先定位桶2，再比较键；最坏需2次键比较。

### 换到实际问题中应用

查找数组中和为9的两个数。

1. 扫描[2,7,11]，先检查目标减当前值是否已在表中。
2. 2入表后遇7查到2，返回两个不同位置；先查后插避免复用自身。

应用结论：2入表后遇7查到2，返回两个不同位置；先查后插避免复用自身。

### 举一反三：改变条件后的完整解答

若插入17到同一表呢？

<details><summary>变式的推演与答案</summary>

1. h(17)=2，同桶候选变3个。
2. 桶内查找成本上升，说明碰撞过多会破坏预期常数表现。

桶内查找成本上升，说明碰撞过多会破坏预期常数表现。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/d3e4d64266d481c74c9e7c15e09999fe_MIT6_006F11_lec08.pdf)

[返回分层目录](00-learning-index.md)
