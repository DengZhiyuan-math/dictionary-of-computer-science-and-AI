# Index

概念编号：`concept:index` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/index/)

## 第一层：概念入门 · 知其然

### 它是什么

An inverted index maps a word or feature back to documents containing it, supporting keyword search. A bitmap index represents records with a particular value as bits, turning multiple-condition filtering into fast bitwise operations for certain analytical workloads. These are not more advanced B+ trees; they target different query structures. A database may maintain several indexes and let its planner choose among them. Ask about query conditions before choosing an index.

### 先看一个例子

例子：倒排索引记录“风险”出现在文档 2、5，“对冲”出现在文档 5、8，两词交集只需得到文档 5。普通数据库的树索引则按键排序支持范围查询。不同索引解决不同访问模式，不能把建索引理解成所有操作都会加速。

### 理解练习

用自己的话解释：上面的情景为什么是“Index”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：An inverted index maps a word or feature back to documents containing it, supporting keyword search. A bitmap index represents records with a particular value as bits, turning multiple-condition filtering into fast bitwise operations for certain analytical workloads. These are not more advanced B+ trees; they target different query structures. A database may maintain several indexes and let its planner choose among them. Ask about query conditions before choosing an index.

情景依据：例子：倒排索引记录“风险”出现在文档 2、5，“对冲”出现在文档 5、8，两词交集只需得到文档 5。普通数据库的树索引则按键排序支持范围查询。不同索引解决不同访问模式，不能把建索引理解成所有操作都会加速。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

An inverted index maps a word or feature back to documents containing it, supporting keyword search. A bitmap index represents records with a particular value as bits, turning multiple-condition filtering into fast bitwise operations for certain analytical workloads. These are not more advanced B+ trees; they target different query structures. A database may maintain several indexes and let its planner choose among them. Ask about query conditions before choosing an index.


### 例子

例子：倒排索引记录“风险”出现在文档 2、5，“对冲”出现在文档 5、8，两词交集只需得到文档 5。普通数据库的树索引则按键排序支持范围查询。不同索引解决不同访问模式，不能把建索引理解成所有操作都会加速。


### 适用边界与常见误解

Query benefits come with write and storage maintenance costs.

### 领域应用

- [BM25 / HNSW · 文本与向量检索的索引应用](bm25-hnsw.md)：索引的通用入口保持唯一；这里比较关键词打分和近似向量邻居搜索的用途。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
