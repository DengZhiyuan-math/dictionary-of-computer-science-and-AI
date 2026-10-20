# SQL Aggregation / Join Cardinality

概念编号：`concept:sql-aggregation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sql-aggregation/)

## 第一层：概念入门 · 知其然

### 它是什么

COUNT(*) counts rows, COUNT(expression) ignores NULL values, and COUNT(DISTINCT expression) counts distinct nonnull values. A left join creates a NULL-filled row for an unmatched parent; a one-to-many join can repeat each parent's values.

### 先看一个例子

例子：左表两个用户，右表只有用户 A 的两条订单。LEFT JOIN 后有三行，COUNT(*)=3，而 COUNT(order_id)=2。若业务要求用户数，应按用户标识计数；不能把联接后的行数直接解释成用户数。

### 理解练习

用自己的话解释：上面的情景为什么是“SQL Aggregation / Join Cardinality”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：COUNT(*) counts rows, COUNT(expression) ignores NULL values, and COUNT(DISTINCT expression) counts distinct nonnull values. A left join creates a NULL-filled row for an unmatched parent; a one-to-many join can repeat each parent's values.

情景依据：例子：左表两个用户，右表只有用户 A 的两条订单。LEFT JOIN 后有三行，COUNT(*)=3，而 COUNT(order_id)=2。若业务要求用户数，应按用户标识计数；不能把联接后的行数直接解释成用户数。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Group by stable identifiers when different entities can share a name. To return every maximum, compare each result with the maximum aggregate rather than selecting one arbitrary row. Compute percentages with the intended denominator and real-valued division; use ORDER BY when output order matters.


### 适用边界与常见误解

SQL does not promise row order without ORDER BY. Empty groups, NULL, duplicate join matches, and tied maxima need explicit contracts. Logical query semantics do not determine whether an engine uses hashing, sorting, or an index.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
