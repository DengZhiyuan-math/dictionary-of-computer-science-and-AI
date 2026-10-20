# Idempotency / Safe Retries

概念编号：`concept:idempotency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/idempotency/)

## 第一层：概念入门 · 知其然

### 它是什么

幂等让同一操作重试多次仍只产生一次预期效果，解决“已完成但回复丢失”的不确定。

### 先看一个例子

库存10，订单键K扣3件成功，但客户端没收到回复。

### 理解练习

单次扣库存是原子的，就能安全无限重试吗？

<details><summary>答案与解释</summary>

不能，多次原子扣减仍会扣多次。

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
