# SQL Aggregation / Join Cardinality

概念编号：`concept:sql-aggregation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sql-aggregation/)

## 第一层：概念入门 · 知其然

### 它是什么

SQL聚合把行归成组计算数量或总量；先认清连接后每行代表什么，避免重复计数。

### 先看一个例子

客户A有2笔订单，客户B无订单，对客户左连接订单。

### 理解练习

COUNT(*)一定等于订单数吗？

<details><summary>答案与解释</summary>

不一定，左连接为无订单客户也保留一行。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. COUNT(*)数全部行，COUNT(order_id)忽略NULL；一对多连接会复制客户字段。
2. 按稳定客户ID分组，计算百分比时明确分母并用非整数除法。

### 具体输入与计算步骤

客户A有2笔订单，客户B无订单，对客户左连接订单。

1. 连接生成A的两行和B的一行，共3行。
2. COUNT(*)=3、COUNT(order_id)=2；分客户订单数分别2、0。

计算结果：COUNT(*)=3、COUNT(order_id)=2；分客户订单数分别2、0。

### 换到实际问题中应用

统计每位客户订单额并保留未下单客户。

1. 从客户表左连接订单，按客户ID聚合，用COALESCE处理无订单时的空和。
2. 若再连订单明细，应先聚合到正确粒度，避免同一订单总额被重复累加。

应用结论：若再连订单明细，应先聚合到正确粒度，避免同一订单总额被重复累加。

### 举一反三：改变条件后的完整解答

A两笔订单金额10、20，每笔各2条明细，再直接求订单金额和会多少？

<details><summary>变式的推演与答案</summary>

1. 两笔金额都重复两遍，得到10+10+20+20=60。
2. 真实订单和30，应先按订单去除连接重复或分层聚合，不能用错误粒度的60。

真实订单和30，应先按订单去除连接重复或分层聚合，不能用错误粒度的60。

</details>

### 原有解释与进一步例题


### 原理与推演

COUNT(*) counts rows, COUNT(expression) ignores NULL values, and COUNT(DISTINCT expression) counts distinct nonnull values. A left join creates a NULL-filled row for an unmatched parent; a one-to-many join can repeat each parent's values.

Group by stable identifiers when different entities can share a name. To return every maximum, compare each result with the maximum aggregate rather than selecting one arbitrary row. Compute percentages with the intended denominator and real-valued division; use ORDER BY when output order matters.


### 例子

例子：左表两个用户，右表只有用户 A 的两条订单。LEFT JOIN 后有三行，COUNT(*)=3，而 COUNT(order_id)=2。若业务要求用户数，应按用户标识计数；不能把联接后的行数直接解释成用户数。


### 适用边界与常见误解

SQL does not promise row order without ORDER BY. Empty groups, NULL, duplicate join matches, and tied maxima need explicit contracts. Logical query semantics do not determine whether an engine uses hashing, sorting, or an index.

### 推导与方法参考

- [一手资料](https://www.postgresql.org/docs/current/functions-aggregate.html)

[返回分层目录](00-learning-index.md)
