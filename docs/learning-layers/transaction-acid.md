# Transaction / ACID

概念编号：`concept:transaction-acid` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/transaction-acid/)

## 第一层：概念入门 · 知其然

### 它是什么

事务把多步数据库修改作为一个整体；ACID约束其原子性、一致性、隔离性与持久性。

### 先看一个例子

A余额100、B余额20，从A转给B30。

### 理解练习

只保证两次写入最终都执行就等于原子事务吗？

<details><summary>答案与解释</summary>

不等于，失败时不能留下只扣未加的部分结果。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 事务内先扣后加，提交使整体生效，失败回滚使整体撤销。
2. 隔离级别影响并发可观察结果，约束和应用逻辑共同维护业务不变量。

### 具体输入与计算步骤

A余额100、B余额20，从A转给B30。

1. 转前总额100+20=120，转后A=70、B=50。
2. 转后总额70+50=120；第二步失败须回滚A到100。

计算结果：转后总额70+50=120；第二步失败须回滚A到100。

### 换到实际问题中应用

实现账户内部转账。

1. 在同一事务校验余额、按固定顺序锁定或条件更新账户。
2. 两次写入均成功才提交，死锁或冲突按明确策略重试整个事务。

应用结论：两次写入均成功才提交，死锁或冲突按明确策略重试整个事务。

### 举一反三：改变条件后的完整解答

若扣款事务提交后才在另一事务加款，会怎样？

<details><summary>变式的推演与答案</summary>

1. 两者之间故障会永久留下A=70、B=20。
2. 总额90违反守恒，单库场景应将两步纳入同一事务。

总额90违反守恒，单库场景应将两步纳入同一事务。

</details>

### 原有解释与进一步例题


### 原理与推演

A transaction treats several data operations as one logical unit. ACID names four classic properties: atomicity, consistency, isolation, and durability. A bank transfer is a familiar example: the debit and credit should succeed or fail together. Transactional consistency here should not be casually conflated with consistency models in distributed systems.

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

### 推导与方法参考

- [一手资料](https://www.postgresql.org/docs/current/tutorial-transactions.html)

[返回分层目录](00-learning-index.md)
