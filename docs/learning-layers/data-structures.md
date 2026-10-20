# Data Structures

概念编号：`concept:data-structures` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/data-structures/)

## 第一层：概念入门 · 知其然

### 它是什么

A data structure organizes values and their relationships so operations have defined costs. Arrays store indexed sequences, linked lists connect nodes, hash tables support key lookup, and trees or graphs represent structured relationships.

### 先看一个例子

If a task repeatedly reads the i-th measurement, an array is a natural fit. If it repeatedly asks whether an identifier has been seen, a hash set avoids scanning the whole sequence for each query. Neither choice is universally faster for every workload.

### 理解练习

用自己的话解释：上面的情景为什么是“Data Structures”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A data structure organizes values and their relationships so operations have defined costs. Arrays store indexed sequences, linked lists connect nodes, hash tables support key lookup, and trees or graphs represent structured relationships.

情景依据：If a task repeatedly reads the i-th measurement, an array is a natural fit. If it repeatedly asks whether an identifier has been seen, a hash set avoids scanning the whole sequence for each query. Neither choice is universally faster for every workload.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

Choose by operations, not only by element count n. Array indexing is O(1); inserting into its middle can require O(n) moves. Hash-table lookup is expected O(1) under suitable hashing and load assumptions, while worst cases and resizing differ.


### 适用边界与常见误解

A data structure supplies operations rather than determining the entire task’s algorithm.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
