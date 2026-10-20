# Bloom Filter

概念编号：`concept:bloom-filter` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bloom-filter/)

## 第一层：概念入门 · 知其然

### 成员查询与哈希位置

成员查询问一个键是否已经加入集合。哈希函数按固定规则把键映射到数组中的位置；不同键可能映到相同位置，这叫碰撞。布隆过滤器中的位只有 0 和 1 两种状态，不保存键的完整内容。


### 定义

布隆过滤器是一种节省空间的近似成员查询结构。普通只插入、不删除的版本，用若干哈希位置的位记录插入信息；查询输出“肯定没有插入”或“可能插入过”。它不用于取回原始数据，也不能把可能存在当作存在的证明。

### 理解定义中的术语与关系

#### 为什么两种查询结果不对称

插入一个键时，把它对应的所有位置设为 1。查询时只要其中一个位置仍为 0，就能排除它；若全部为 1，这些位也可能分别由其他键设置。无漏报的说法依赖查询与插入使用相同规则、已插入键的信息没有丢失或被错误清除。

### 概念边界与常见混淆

过滤器通常用于先排除不存在的键，阳性结果仍交给数据库等权威来源核查。数据新增却未更新过滤器、重建中丢失记录或随意清位，都可能破坏预期保证。

### 先看一个例子

有八个位，初始全为 0。约定 A 使用位置 1、3，B 使用 2、3，C 使用 1、2。只插入 A、B 后，位置 1、2、3 都是 1。查询 C 会得到“可能存在”，但我们知道 C 没有插入；这就是一次误报。

### 理解练习

#### 1. 误报的含义

例子中 C 的查询通过，是否说明哈希函数每次随机改变了位置？

<details><summary>答案与解释</summary>

不是。映射规则一直固定；不同键共用位，使其他键的插入留下了与 C 相容的标记。碰撞与每次映射随机变化不是一回事。

</details>

#### 2. 删除与共享标记

删除 A 时直接把位置 1、3 清零，会影响 B 吗？

<details><summary>答案与解释</summary>

会。B 也需要位置 3，清零后会被错误排除。普通版本不能按这种方式删除；需要支持删除的变体或重新构建。

</details>

#### 3. 何时可以省掉数据库查询

若过滤器维护完整，哪些查询可以仅凭过滤器排除？哪些仍需查数据库？

<details><summary>答案与解释</summary>

发现任一所需位为 0 的查询可以排除。全部为 1 的查询只得到可能存在，仍需查库。必须先保证过滤器覆盖应当查询的已插入键。

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
