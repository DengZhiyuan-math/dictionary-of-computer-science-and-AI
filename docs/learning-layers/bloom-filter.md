# Bloom Filter

概念编号：`concept:bloom-filter` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bloom-filter/)

## 第一层：概念入门 · 知其然

### 它是什么

布隆过滤器用位标记快速判断“可能存在”或“肯定不存在”，允许误报但标准插入查询不漏报。

### 先看一个例子

8个位全为0，两个哈希把A映到1、3，把B映到2、3。

### 理解练习

两个查询位都为1就证明插入过吗？

<details><summary>答案与解释</summary>

不能，它们可能分别由别的键置位。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 插入把各哈希位置设1；查询若有一位0，该键不可能按相同规则插入过。
2. 所有位1只说明未排除，哈希碰撞会误报，仍需查权威数据。

### 具体输入与计算步骤

8个位全为0，两个哈希把A映到1、3，把B映到2、3。

1. 插入A、B后位1、2、3为1，其余0。
2. 未插入的C若映到1、2，查询仍通过，形成一次误报。

计算结果：未插入的C若映到1、2，查询仍通过，形成一次误报。

### 换到实际问题中应用

减少不存在键对数据库的无效读取。

1. 先查询过滤器，否定时直接返回不存在，肯定时继续查询数据库。
2. 新增数据同步更新过滤器并明确恢复规则，防止陈旧副本违反无漏报前提。

应用结论：新增数据同步更新过滤器并明确恢复规则，防止陈旧副本违反无漏报前提。

### 举一反三：改变条件后的完整解答

删除A时直接清位1和3安全吗？

<details><summary>变式的推演与答案</summary>

1. 位3也由B使用，清掉后B查询看到0。
2. 会产生漏报；普通布隆过滤器不能这样删除，应重建或使用计数变体。

会产生漏报；普通布隆过滤器不能这样删除，应重建或使用计数变体。

</details>

### 原有解释与进一步例题


### 原理与推演

Bloom filter records bits with multiple hash positions. If the query finds that any bit is 0, it can be determined that it has not been inserted; if all are 1, it can only be said that it may exist, because different elements may set these bits together.


### 适用边界与常见误解

Standard insert-only use has no false negatives. Directly clearing shared bits is not safe deletion.

### 例题：Bloom Filters: Two Inserted Items Combine into a False Positive

Start with 8 zero bits and two hash positions per item. A maps to [1,4], B to [4,6], and uninserted C to [1,6].

1. Insert A by setting bits 1 and 4. Insert B by setting bits 4 and 6.
2. Both C positions are now 1, returning “possibly present,” although C was never inserted. This is a false positive.
3. Clearing shared bit 4 to delete A would make B encounter 0 and incorrectly appear absent.

结果：Shared bits provide compact storage, but cause false positives and prevent ordinary deletion. An exact record lookup can confirm membership.

易错点：This fixed, tiny bitmap illustrates the mechanism. It cannot establish a production system’s false-positive rate.

变式：If D maps to [0,6], what can be concluded?

参考答案：Bit 0 remains 0. Under standard insertion-only operation with consistent hashes, D was definitely not inserted.

### 推导与方法参考

- [一手资料](https://dl.acm.org/doi/10.1145/362686.362692)

[返回分层目录](00-learning-index.md)
