# Index

概念编号：`concept:index` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/index/)

## 第一层：概念入门 · 知其然

### 定义

数据库索引是为加快特定访问方式而维护的辅助结构，把索引键关联到记录或记录位置。B 树类索引按键组织层次以支持有序查找和范围扫描；哈希类索引主要按等值查找定位。查询能否利用索引，还取决于条件、排序、数据分布和数据库优化器。索引不是把整张表自动变成任何查询都快。

### 概念边界与常见混淆

低选择性条件可能命中大量记录，顺序扫描反而合理。复合索引的列顺序会影响可用访问方式；不能仅因条件出现某列就保证索引被采用。

### 先看一个例子

订单表按订单号建立索引，查订单 123 可以先定位索引项再读取记录，而不必逐行比较。若条件改为“备注中含某个任意片段”，订单号索引通常不能直接定位。新增一条订单时，不仅要写表，还要维护相关索引，所以索引提升读取并非免费。

### 理解练习

#### 1. 辅助结构

删除索引是否在逻辑上必须删除表中订单？

<details><summary>答案与解释</summary>

通常不会，索引是访问辅助结构；应区分删除索引与删除业务记录，并以数据库具体约定为准。

</details>

#### 2. 命中比例

条件命中 99% 记录，逐条走索引必然更快吗？

<details><summary>答案与解释</summary>

不必，额外定位与随机读取可能比顺序扫描更贵。应看执行计划与实际成本，而非只看有没有索引。

</details>

#### 3. 写入代价

给每一列都加索引是否无代价？

<details><summary>答案与解释</summary>

不是，会增加存储及插入、删除、更新维护成本。应围绕实际查询选择索引。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 树索引沿键范围定位候选，再读取相应记录。
2. 写入时也必须更新索引，索引越多并非免费。

### 具体输入与计算步骤

1000行订单按user_id建立索引，某用户有5行。

1. 全表筛选要检查1000行；若定位后只取5行，候选读取降至5行。
2. 候选行数减少1000/5=200倍，但树查找和随机读取仍有成本，不能承诺时间快200倍。

计算结果：候选行数减少1000/5=200倍，但树查找和随机读取仍有成本，不能承诺时间快200倍。

### 换到实际问题中应用

优化按用户和时间查询最近订单。

1. 建立匹配谓词和排序的复合索引，如(user_id,created_at)。
2. 用执行计划验证访问路径及扫描行数，再测真实延迟与写入成本。

应用结论：用执行计划验证访问路径及扫描行数，再测真实延迟与写入成本。

### 举一反三：改变条件后的完整解答

若查询返回900行，还应强制索引吗？

<details><summary>变式的推演与答案</summary>

1. 选择性只有10%排除，大部分记录仍需读取。
2. 顺序扫描可能更便宜，应让成本与实测决定而非一律强制。

顺序扫描可能更便宜，应让成本与实测决定而非一律强制。

</details>

### 原有解释与进一步例题


### 原理与推演

An inverted index maps a word or feature back to documents containing it, supporting keyword search. A bitmap index represents records with a particular value as bits, turning multiple-condition filtering into fast bitwise operations for certain analytical workloads. These are not more advanced B+ trees; they target different query structures. A database may maintain several indexes and let its planner choose among them. Ask about query conditions before choosing an index.


### 例子

例子：倒排索引记录“风险”出现在文档 2、5，“对冲”出现在文档 5、8，两词交集只需得到文档 5。普通数据库的树索引则按键排序支持范围查询。不同索引解决不同访问模式，不能把建索引理解成所有操作都会加速。


### 适用边界与常见误解

Query benefits come with write and storage maintenance costs.

### 领域应用

- [BM25 / HNSW · 文本与向量检索的索引应用](bm25-hnsw.md)：索引的通用入口保持唯一；这里比较关键词打分和近似向量邻居搜索的用途。

### 推导与方法参考

- [一手资料](https://www.postgresql.org/docs/current/indexes.html)

[返回分层目录](00-learning-index.md)
