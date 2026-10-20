# External Consistency

概念编号：`concept:external-consistency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/external-consistency/)

## 第一层：概念入门 · 知其然

### 它是什么

外部一致性让事务像依次执行，还尊重客户端已经观察到的先后关系。

### 先看一个例子

T1在时刻10完成，T2在20开始、30完成，40发起当前强读。

### 理解练习

仅能排成某个串行顺序就必然尊重真实时间吗？

<details><summary>答案与解释</summary>

不必，外部一致性额外约束已完成事务必须先于后来开始者。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. T1完成后T2才开始，故合法串行顺序必须T1在前、T2在后。
2. 一致快照对应序列的某个前缀，不能只包含后来的T2却遗漏T1。

### 具体输入与计算步骤

T1在时刻10完成，T2在20开始、30完成，40发起当前强读。

1. 初始a=b=0，T1写a=1，T2写b=1。
2. 40发起的当前强读应见(a,b)=(1,1)；只见(0,1)不符合该顺序。

计算结果：40发起的当前强读应见(a,b)=(1,1)；只见(0,1)不符合该顺序。

### 换到实际问题中应用

客户提交配置更新后立即查询依赖该配置的事务结果。

1. 等待更新提交后再启动后续事务，并使用相应强读语义。
2. 若明确请求历史时间戳，则按历史快照解释，不把旧快照误判为当前强读故障。

应用结论：若明确请求历史时间戳，则按历史快照解释，不把旧快照误判为当前强读故障。

### 举一反三：改变条件后的完整解答

若明确读取时刻15的历史快照，可以只见T1吗？

<details><summary>变式的推演与答案</summary>

1. 15晚于T1提交10，早于T2开始20。
2. 可以见(1,0)，这是合法历史前缀；不代表当前读允许漏掉已提交T2。

可以见(1,0)，这是合法历史前缀；不代表当前读允许漏掉已提交T2。

</details>

### 原有解释与进一步例题


### 原理与推演

Serializability requires equivalence to a serial transaction order. External consistency adds the order that clients can observe between non-overlapping transactions.

If T1 commits before T2 begins, a consistent snapshot cannot include T2's effects while omitting T1's. Strong reads started after both commits must reflect both; an explicitly historical snapshot can precede them.


### 例子

例子：客户端已收到事务 T1 提交成功，随后才发起 T2，则外部一致的序列必须把 T1 放在 T2 前。两事务若实际重叠，未必有由客户端先后强制的顺序；不能把“可串行化”自动解释成遵守所有墙钟印象。


### 适用边界与常见误解

Two independent reads are not automatically one snapshot. Clock timestamps alone do not establish a transaction consistency guarantee.

### 推导与方法参考

- [一手资料](https://docs.cloud.google.com/spanner/docs/true-time-external-consistency)

[返回分层目录](00-learning-index.md)
