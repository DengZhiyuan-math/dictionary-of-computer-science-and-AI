# Idempotency / Safe Retries

概念编号：`concept:idempotency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/idempotency/)

## 第一层：概念入门 · 知其然

### 它是什么

A lost response leaves the caller uncertain whether an operation committed. Retrying a decrement can apply the change twice even if every individual decrement is atomic.

### 先看一个例子

例子：操作 K 要扣减 10，服务器已扣但响应丢失。客户端用同一 K 和相同内容重试，应返回同一次操作结果，不能再扣 10；若复用 K 却把金额改为 20，应报告冲突，而不是静默当作同一请求。

### 理解练习

用自己的话解释：上面的情景为什么是“Idempotency / Safe Retries”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A lost response leaves the caller uncertain whether an operation committed. Retrying a decrement can apply the change twice even if every individual decrement is atomic.

情景依据：例子：操作 K 要扣减 10，服务器已扣但响应丢失。客户端用同一 K 和相同内容重试，应返回同一次操作结果，不能再扣 10；若复用 K 却把金额改为 20，应报告冲突，而不是静默当作同一请求。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Bind an idempotency key to the request intent. Coordinate recording that key, applying the mutation, and retaining its result so duplicate submissions return the earlier outcome. Define key scope, retention, and behavior for the same key with different parameters.


### 适用边界与常见误解

A timeout does not prove failure. A stock predicate, transport retry, FIFO delivery, or expiring cache entry alone does not guarantee one business effect.

### 领域应用

- [Idempotent Processing · 成交与订单的幂等处理](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-idempotent-processing.md)：把安全重试应用于重复执行回报，协调成交身份、现金持仓更新、持久化和崩溃恢复。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
