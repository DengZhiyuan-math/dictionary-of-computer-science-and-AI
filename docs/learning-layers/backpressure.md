# Backpressure / Subscriber Demand

概念编号：`concept:backpressure` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/backpressure/)

## 第一层：概念入门 · 知其然

### 生产速度与处理能力

生产方产生数据，消费方接收并处理数据。如果到达速度长期超过处理速度，而系统把每项都排队保存，待处理数量就会持续增长。队列只提供临时存放，不能凭空提高处理能力。


### 定义

背压是下游把接收能力或处理压力反馈给上游，并由双方协议约束继续发送或接纳工作的机制。它的目标是让工作进入系统的方式与可处理能力相协调。反馈可以是请求额度、暂停读取等形式，不等于任意一个缓冲队列。

### 理解定义中的术语与关系

#### 需求额度与缓冲策略分开

以按条请求的协议为例，下游先声明还能接收几项，每交付一项就消耗一个额度。额度为零时，上游应遵循协议停止交付；数据是暂存、丢弃还是让源头减速，由具体机制决定。消费方表达容量，并不保证外部传感器或不遵守协议的发送者真的能够暂停。

### 概念边界与常见混淆

背压不保证无数据丢失，也不自动决定重试、持久化或公平性。必须检查整条链路的协议和容量，否则压力可能只是被移到另一个无限队列。

### 先看一个例子

消费者只允许两项在处理，先请求两项。A、B 交付后额度用尽；完成 A 后再申请一项，才允许下一次交付。若源头仍产生 C，系统必须明确它应在哪里等待或是否被丢弃。某些发布器会丢弃零需求时的值，不能把“后来又请求”当作一定补发。

### 理解练习

#### 1. 增大队列是否解决持续超载

每秒持续到来一百项，只能处理六十项，把队列增大就能长期稳定吗？

<details><summary>答案与解释</summary>

不能。每秒仍净增加四十项，有限队列迟早填满。需要减小接纳速度、提高处理能力或明确舍弃政策，而不是仅延后满队列时刻。

</details>

#### 2. 暂停交付不等于补发

额度为零时没收到 C，后来申请一项，是否必然收到 C？

<details><summary>答案与解释</summary>

不必然。是否保留 C 取决于发布器和缓冲协议。丢弃型源可能只在下次产生 D 时交付 D；持久化队列则可以另有承诺。

</details>

#### 3. 整条链路的容量

下游限制一次接收一项，但中间层先无限缓存全部数据，是否已经控制了系统内存？

<details><summary>答案与解释</summary>

没有。下游交付受限，但中间层仍可能持续增长。应把压力传回真正的接纳边界，并为各段声明容量与满载策略。

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
