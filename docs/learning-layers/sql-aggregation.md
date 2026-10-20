# SQL Aggregation / Join Cardinality

概念编号：`concept:sql-aggregation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sql-aggregation/)

## 第一层：概念入门 · 知其然

### 行、分组和缺失值

关系表由行与列组成，一行代表什么由查询决定。聚合前要说明行的单位：客户、订单，还是订单明细。SQL 的 NULL 表示缺失或不适用，不是数值零；聚合函数对它有专门规则。


### 定义

SQL 聚合把多行按指定分组键归为一组，再计算每组的计数、总和或均值等摘要。没有分组键时可以对整个输入汇总。结果描述查询实际产生的行，而不是自动识别业务上想数的对象。

### 理解定义中的术语与关系

#### 连接会改变计数的单位

连接把相关表中的行组合起来。一位客户对应两笔订单时，客户信息可能出现两次。左连接还会为没有订单的客户保留一行，订单字段是 NULL。COUNT(*) 数输入行；COUNT(订单编号) 只数该字段非 NULL 的行，因此两者不一定相同。

### 概念边界与常见混淆

聚合正确性依赖行的粒度、NULL 处理、重复值和分母约定。把字段名字写成“订单总额”不会阻止连接使同一金额重复出现。

### 先看一个例子

客户 A 有金额十与二十的两笔订单，客户 B 没有订单。客户左连接订单后共三行：A 两行、B 一行。按客户分组后，COUNT(*) 分别为二和一，COUNT(订单编号) 分别为二和零。B 那一行的存在是保留客户信息，不是一笔零元订单。

### 理解练习

#### 1. 数行还是数订单

B 没有订单，COUNT(*) 为什么仍可能是一个？

<details><summary>答案与解释</summary>

因为左连接保留了客户 B 的一行。若要数实际订单，应按订单的非空唯一标识计数，并确认连接没有再次复制订单。

</details>

#### 2. 再次连接带来的重复

A 的每笔订单又连接两条明细，直接相加订单金额会得到多少？

<details><summary>答案与解释</summary>

十与二十各出现两次，得到六十，而实际两笔订单合计三十。应先在正确层级聚合或避免订单金额被重复计入；不能盲目用 DISTINCT，因为两笔不同订单也可能金额相同。

</details>

#### 3. 按什么键分组

两个不同客户姓名相同，按姓名分组能保证得到每客户一行吗？

<details><summary>答案与解释</summary>

不能，二者会被合在一起。应使用能区分客户的稳定标识，展示姓名可以是另一列。分组键决定了结果中的对象。

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
