# Data Structures

概念编号：`concept:data-structures` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/data-structures/)

## 第一层：概念入门 · 知其然

### 定义

数据结构规定数据怎样组织、关联与访问，以支持一组操作。抽象数据类型先定义操作含义，例如集合的插入、查询和删除；具体结构决定它们如何实现以及成本。数组、链表、树、哈希表等选择对应不同访问需求，没有脱离工作负载的普遍最佳结构。

### 概念边界与常见混淆

算法成本包含维护、存储和遍历，不只是单次查询。逻辑上同一集合可有多种实现，操作语义相同不意味着性能相同。

### 先看一个例子

维护学生记录，若经常按位置读第100项，数组支持直接定位；若经常按学号查找，可增建哈希映射；若需要按学号范围顺序输出，有序结构更合适。可以同时维护多个结构，但每次更新都需保持它们一致。

### 理解练习

#### 1. 抽象

集合一定用哈希表实现吗？

<details><summary>答案与解释</summary>

不是，也可用树或其他表示，选择改变成本但不改变集合判重语义。

</details>

#### 2. 工作负载

最快查一次的结构就最适合大量更新吗？

<details><summary>答案与解释</summary>

不一定，维护成本可能更高，应按操作比例比较。

</details>

#### 3. 多索引

数组删掉学生却忘记删学号映射会怎样？

<details><summary>答案与解释</summary>

结构间不一致，查询可能返回已不存在记录，正确性需覆盖所有表示。

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
