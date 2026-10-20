# Idempotency / Safe Retries

概念编号：`concept:idempotency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/idempotency/)

## 第一层：概念入门 · 知其然

### 重试与同一业务意图

远程请求可能已经执行，但回复在网络中丢失。客户端看到超时，不能仅凭没有回复判断操作没有发生。如果重试被当作另一笔业务，扣款或扣库存就可能重复。需要区分请求发送次数与逻辑操作次数。


### 定义

幂等指重复施加同一操作后，在所讨论的目标状态上与施加一次具有相同效果。可安全重试的接口常用幂等键标识同一业务意图，保存处理结果以识别重复请求；这不要求网络只发送一次，也不要求所有内部记录或响应字节完全相同。

### 理解定义中的术语与关系

#### 识别重复与完成操作要协调

服务端不能只先查“这个键不存在”，然后不受保护地修改业务状态，因为两个重试可能同时通过查询。识别键、业务修改及可靠保存结果要按明确协议协调。相同键携带不同参数、键的作用范围和保留时间，也必须事先约定。

### 概念边界与常见混淆

幂等不是所有操作天然具有的性质，“扣三件”本身就不是幂等。一次写入是原子的，也不意味着重复多次只生效一次；超出服务声明的键保留期还需重新判断协议。

### 先看一个例子

库存十，订单意图 K 要扣三件。首次成功后库存七，系统保存 K 的结果；回复丢失后，同 K、同参数重试返回原业务结果，不再扣三件。若改用新键，服务端可能合理地认为这是另一笔购买，库存便再次减少。

### 理解练习

#### 1. 原子性与重复效果

每次扣三件都能原子完成，就能放心把同一购买重复提交吗？

<details><summary>答案与解释</summary>

不能。两次完整的原子扣减仍可能扣六件。原子性处理一次操作的不可分割性，幂等协议处理同一意图的重复请求。

</details>

#### 2. 哪些参数属于同一意图

键 K 原来扣三件，重试改成扣五件，应不加检查地返回原成功吗？

<details><summary>答案与解释</summary>

不应。参数改变已不是同一个请求意图。应按接口契约拒绝冲突或要求新操作，不能静默把不同购买合并。

</details>

#### 3. 相同效果的范围

两次“把状态设为已取消”留下两条审计记录，是否必然违反状态更新的幂等性？

<details><summary>答案与解释</summary>

不必然。若讨论的目标状态始终是已取消，状态效果可以幂等。日志是否允许重复是另一项约定，需明确幂等承诺覆盖的业务效果。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 将键绑定请求意图，并把去重记录、业务修改和结果保存协调在可靠原子边界中。
2. 重复键返回已有结果；键的作用域、保留期及参数冲突必须明确。

### 具体输入与计算步骤

库存10，订单键K扣3件成功，但客户端没收到回复。

1. 首次K使库存10−3=7，并保存K成功的结果。
2. 同K重试读取旧结果，库存仍7；若当新操作再扣会错成4。

计算结果：同K重试读取旧结果，库存仍7；若当新操作再扣会错成4。

### 换到实际问题中应用

实现可安全重试的创建订单接口。

1. 客户端为同一意图保留同一键，服务端校验请求内容并执行去重事务。
2. 返回相同业务结果，超出保留期的重试按声明协议处理。

应用结论：返回相同业务结果，超出保留期的重试按声明协议处理。

### 举一反三：改变条件后的完整解答

同键K这次要求扣5，能直接返回原扣3成功吗？

<details><summary>变式的推演与答案</summary>

1. 请求内容与原意图不同。
2. 应报键冲突或按契约拒绝，不能静默把不同操作当作相同请求。

应报键冲突或按契约拒绝，不能静默把不同操作当作相同请求。

</details>

### 原有解释与进一步例题


### 原理与推演

A lost response leaves the caller uncertain whether an operation committed. Retrying a decrement can apply the change twice even if every individual decrement is atomic.

Bind an idempotency key to the request intent. Coordinate recording that key, applying the mutation, and retaining its result so duplicate submissions return the earlier outcome. Define key scope, retention, and behavior for the same key with different parameters.


### 例子

例子：操作 K 要扣减 10，服务器已扣但响应丢失。客户端用同一 K 和相同内容重试，应返回同一次操作结果，不能再扣 10；若复用 K 却把金额改为 20，应报告冲突，而不是静默当作同一请求。


### 适用边界与常见误解

A timeout does not prove failure. A stock predicate, transport retry, FIFO delivery, or expiring cache entry alone does not guarantee one business effect.

### 领域应用

- [Idempotent Processing · 成交与订单的幂等处理](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-idempotent-processing.md)：把安全重试应用于重复执行回报，协调成交身份、现金持仓更新、持久化和崩溃恢复。

### 推导与方法参考

- [一手资料](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)

[返回分层目录](00-learning-index.md)
