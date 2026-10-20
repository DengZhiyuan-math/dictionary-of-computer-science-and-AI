# Backpressure / Subscriber Demand

概念编号：`concept:backpressure` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/backpressure/)

## 第一层：概念入门 · 知其然

### 它是什么

背压让消费者表达还接得下多少数据，生产方按约定限制发送，避免处理队列无限增长。

### 先看一个例子

Combine订阅者先请求2项，PassthroughSubject依次发送A、B、C。

### 理解练习

receive返回none会取消剩余需求吗？

<details><summary>答案与解释</summary>

不会，它只是不增加额外需求。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 有限需求每交付一项消耗一个额度，显式请求与receive返回的需求都增加额度。
2. PassthroughSubject不为未来需求保存值，零需求时该订阅者会错过当前发送值。

### 具体输入与计算步骤

Combine订阅者先请求2项，PassthroughSubject依次发送A、B、C。

1. A消耗一个额度，剩1；B再消耗一个，剩0。
2. C在零需求时被该订阅者丢弃，共交付2项，不是排队等以后补发。

计算结果：C在零需求时被该订阅者丢弃，共交付2项，不是排队等以后补发。

### 换到实际问题中应用

订阅者每次只能处理一个昂贵图像任务。

1. 先请求1项，完成处理后再追加需求，并选择明确的缓冲或丢弃策略。
2. 确认上游真实遵守需求；任意外部设备不一定能被背压暂停。

应用结论：确认上游真实遵守需求；任意外部设备不一定能被背压暂停。

### 举一反三：改变条件后的完整解答

后来再请求1项，会补交刚才C吗？

<details><summary>变式的推演与答案</summary>

1. PassthroughSubject没有缓存C。
2. 不会；之后发送D才可消耗新增额度并交付D。

不会；之后发送D才可消耗新增额度并交付D。

</details>

### 原有解释与进一步例题


### 原理与推演

With finite demand, each delivered element consumes one credit. Explicit requests and the additional demand returned by receive add credits; returning none adds zero and does not cancel existing demand.

A PassthroughSubject does not buffer values for later demand. With one subscriber and zero demand, a sent value is dropped for that subscriber. Other publishers and buffering operators can have different policies.


### 例子

例子：订阅者先请求 3 个元素，生产者依次交付后，需求余额为 2、1、0。在余额为零时继续交付，违反这份需求契约；缓冲、暂停上游或拒绝请求属于另行明确的处理策略。


### 适用边界与常见误解

Demand limits deliveries rather than elapsed-time request rate. Unlimited demand, cancellation, reentrant sends, multiple subscribers, and completion require their own protocol rules.

### 领域应用

- [Adaptive Concurrency · 服务并发上限的反馈控制](adaptive-concurrency.md)：复用背压的供需关系，单独解释服务如何根据延迟反馈调整在途请求上限。
- [Backpressure · 行情与交易消息的拥塞控制](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-backpressure.md)：将一般背压用于行情新鲜度、交易回报完整性和拥塞时的风险降级。

### 推导与方法参考

- [一手资料](https://developer.apple.com/documentation/combine/processing-published-elements-with-subscribers)

[返回分层目录](00-learning-index.md)
