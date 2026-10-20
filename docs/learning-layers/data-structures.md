# Data Structures

概念编号：`concept:data-structures` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/data-structures/)

## 第一层：概念入门 · 知其然

### 它是什么

数据结构是组织数据的方式，应按主要查找、更新、排序和连接操作选择。

### 先看一个例子

有序数组[1,3,5,7]中插入4。

### 理解练习

数组有序就代表插入也只需对数时间吗？

<details><summary>答案与解释</summary>

不是，找位置可对数，但移动元素通常线性。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 结构约束决定各操作代价：数组支持连续下标访问，链表擅长已知位置的链接修改。
2. 哈希擅长精确查找，树支持有序查询，堆支持极值而非任意排序。

### 具体输入与计算步骤

有序数组[1,3,5,7]中插入4。

1. 4应放下标2，先将7后移，再将5后移，共移动2项。
2. 写入4后得到[1,3,4,5,7]，总存储增加一个元素。

计算结果：写入4后得到[1,3,4,5,7]，总存储增加一个元素。

### 换到实际问题中应用

实现任务优先级调度。

1. 需要反复取最小截止时间时选最小堆，另用映射定位任务编号。
2. 明确取消任务的实现，如惰性删除，避免误以为堆能常数时间删任意任务。

应用结论：明确取消任务的实现，如惰性删除，避免误以为堆能常数时间删任意任务。

### 举一反三：改变条件后的完整解答

若只需按ID查找、不关心顺序呢？

<details><summary>变式的推演与答案</summary>

1. 有序数组的维护排序成本可能没有收益。
2. 哈希表通常更合适，但仍需考虑碰撞、内存与最坏界。

哈希表通常更合适，但仍需考虑碰撞、内存与最坏界。

</details>

### 原有解释与进一步例题


### Definition

A data structure organizes values and their relationships so operations have defined costs. Arrays store indexed sequences, linked lists connect nodes, hash tables support key lookup, and trees or graphs represent structured relationships.


### Parameters and mechanism

Choose by operations, not only by element count n. Array indexing is O(1); inserting into its middle can require O(n) moves. Hash-table lookup is expected O(1) under suitable hashing and load assumptions, while worst cases and resizing differ.


### Example

If a task repeatedly reads the i-th measurement, an array is a natural fit. If it repeatedly asks whether an identifier has been seen, a hash set avoids scanning the whole sequence for each query. Neither choice is universally faster for every workload.


### 适用边界与常见误解

A data structure supplies operations rather than determining the entire task’s algorithm.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
