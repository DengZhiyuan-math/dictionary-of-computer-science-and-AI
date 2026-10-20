# Transaction / ACID

概念编号：`concept:transaction-acid` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/transaction-acid/)

## 第一层：概念入门 · 知其然

### 它是什么

A transaction treats several data operations as one logical unit. ACID names four classic properties: atomicity, consistency, isolation, and durability. A bank transfer is a familiar example: the debit and credit should succeed or fail together. Transactional consistency here should not be casually conflated with consistency models in distributed systems.

### 先看一个例子

Account A holds 100 and B holds 20. Transfer 30, expecting A=70 and B=50.
Atomicity makes grouped operations succeed or fail together. Isolation handles concurrent interleavings. Durability relies on commit and recovery mechanisms.

### 理解练习

The database committed, but the client received no response. Is an immediate retry always safe?

<details><summary>答案与解释</summary>

No. It may repeat the transfer. Use a business idempotency key or queryable operation status.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

OLTP, online transaction processing, emphasizes many short read/write transactions, such as orders and transfers. OLAP, online analytical processing, emphasizes aggregation, statistics, and complex analysis, such as business reports. Data warehouses favor structured analytics; data lakes hold varied raw data; lakehouses try to combine their advantages. Row stores suit operations on individual records, while column stores often suit scanning a few columns for large-scale statistics.


### 适用边界与常见误解

Different isolation levels have different observable behaviors during concurrency.

### 例题：Transactions: What If a Transfer Fails Halfway?

Account A holds 100 and B holds 20. Transfer 30, expecting A=70 and B=50.

1. If A is debited before B is credited and the process crashes between them, unprotected writes may leave only the debit.
2. Place both updates in one transaction. Failure before commit should roll them back; a successful commit includes both updates.
3. Use conditional updates or appropriate concurrency control to check balances, preventing two transfers from both being approved against stale balances.

结果：Atomicity makes grouped operations succeed or fail together. Isolation handles concurrent interleavings. Durability relies on commit and recovery mechanisms.

易错点：Placing two statements next to each other does not create a transaction. Cross-database or external-payment operations also need suitable protocols and idempotency.

变式：The database committed, but the client received no response. Is an immediate retry always safe?

参考答案：No. It may repeat the transfer. Use a business idempotency key or queryable operation status.

### 领域应用

- [Non Atomic Execution · 多腿交易的部分成功处理](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-non-atomic-execution.md)：共用事务原子性的定义，交易应用明确本地原子提交不能保证跨场所的全部腿同时成交。
- [Transactional Outbox · 交易指令的事务发件箱](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-transactional-outbox.md)：将数据库事务原子性用于风险预留与待发送订单，说明本地一致性和外部成交保证的边界。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
