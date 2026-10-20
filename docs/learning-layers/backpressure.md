# Backpressure / Subscriber Demand

概念编号：`concept:backpressure` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/backpressure/)

## 第一层：概念入门 · 知其然

### 它是什么

With finite demand, each delivered element consumes one credit. Explicit requests and the additional demand returned by receive add credits; returning none adds zero and does not cancel existing demand.

### 先看一个例子

例子：订阅者先请求 3 个元素，生产者依次交付后，需求余额为 2、1、0。在余额为零时继续交付，违反这份需求契约；缓冲、暂停上游或拒绝请求属于另行明确的处理策略。

### 理解练习

用自己的话解释：上面的情景为什么是“Backpressure / Subscriber Demand”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：With finite demand, each delivered element consumes one credit. Explicit requests and the additional demand returned by receive add credits; returning none adds zero and does not cancel existing demand.

情景依据：例子：订阅者先请求 3 个元素，生产者依次交付后，需求余额为 2、1、0。在余额为零时继续交付，违反这份需求契约；缓冲、暂停上游或拒绝请求属于另行明确的处理策略。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A PassthroughSubject does not buffer values for later demand. With one subscriber and zero demand, a sent value is dropped for that subscriber. Other publishers and buffering operators can have different policies.


### 适用边界与常见误解

Demand limits deliveries rather than elapsed-time request rate. Unlimited demand, cancellation, reentrant sends, multiple subscribers, and completion require their own protocol rules.

### 领域应用

- [Adaptive Concurrency · 服务并发上限的反馈控制](adaptive-concurrency.md)：复用背压的供需关系，单独解释服务如何根据延迟反馈调整在途请求上限。
- [Backpressure · 行情与交易消息的拥塞控制](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-backpressure.md)：将一般背压用于行情新鲜度、交易回报完整性和拥塞时的风险降级。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
