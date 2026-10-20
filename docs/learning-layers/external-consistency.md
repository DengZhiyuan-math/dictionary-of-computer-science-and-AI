# External Consistency

概念编号：`concept:external-consistency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/external-consistency/)

## 第一层：概念入门 · 知其然

### 事务与真实时间顺序

事务把一组读取和写入作为一个受数据库规则约束的操作单元。可串行化要求并发事务的结果能解释为某个逐个执行的顺序；这个顺序是否尊重客户端已经看到的完成与开始，还需要额外条件。


### 定义

外部一致性要求事务可按一个串行顺序解释，而且该顺序尊重真实时间先后：如果一个事务已经完成后另一个才开始，前者必须排在后者之前。对于这里讨论的事务语义，它对应严格可串行化的要求。

### 理解定义中的术语与关系

#### 重叠事务与已完成事务不同

两个事务时间重叠时，真实时间本身通常不足以唯一决定它们的串行顺序；还要满足读取和写入的约束。若前一个已经返回成功，之后才发起当前强读，则不能把这个已完成更新随意排在读取之后。明确请求过去时刻的历史快照，是另一种读取约定。

### 概念边界与常见混淆

这不是说所有副本每一瞬间都具有完全相同的物理内容，也不是说历史快照必须显示当前最新值。保证适用于所选事务与读取接口的语义。

### 先看一个例子

初始两个配置字段都是零。事务一把第一个改为一并完成；收到成功后，客户端才发起事务二，把第二个改为一。二也完成后再发起当前强读，且没有其他写入时，应看到两个一。只见第二个一而遗漏第一个已完成更新，不符合这条先后约束。

### 理解练习

#### 1. 串行顺序是否足够

若一个系统能给事务排出某个串行顺序，但把已完成更新排在后来开始的读取之后，是否满足外部一致性？

<details><summary>答案与解释</summary>

不满足。它可能满足较弱的可串行化条件，却违反已完成更新必须先于后来开始事务的真实时间约束。

</details>

#### 2. 重叠不自动定序

两个写入事务的执行时间重叠，能否只凭谁先开始就断言谁必须排在前面？

<details><summary>答案与解释</summary>

不能。开始先后不同于前一个完成后另一个才开始。合法顺序还须结合读写结果与事务规则判断。

</details>

#### 3. 历史读取不是当前读取

明确要求更新前的历史快照，读到零是否必然是外部一致性故障？

<details><summary>答案与解释</summary>

不是。该请求选择了过去的可见状态。应核对快照时点与接口承诺，不能把当前强读的要求直接套到历史查询。

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
