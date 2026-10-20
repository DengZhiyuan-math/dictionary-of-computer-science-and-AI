# Bloom Filter

概念编号：`concept:bloom-filter` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bloom-filter/)

## 第一层：概念入门 · 知其然

### 它是什么

Bloom filter records bits with multiple hash positions. If the query finds that any bit is 0, it can be determined that it has not been inserted; if all are 1, it can only be said that it may exist, because different elements may set these bits together.

### 先看一个例子

If the query finds that any bit is 0, it can be determined that it has not been inserted; if all are 1, it can only be said that it may exist, because different elements may set these bits together.

### 理解练习

用自己的话解释：上面的情景为什么是“Bloom Filter”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Bloom filter records bits with multiple hash positions. If the query finds that any bit is 0, it can be determined that it has not been inserted; if all are 1, it can only be said that it may exist, because different elements may set these bits together.

情景依据：If the query finds that any bit is 0, it can be determined that it has not been inserted; if all are 1, it can only be said that it may exist, because different elements may set these bits together.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
