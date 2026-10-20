# Message Ordering / FIFO Groups

概念编号：`concept:message-ordering` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/message-ordering/)

## 第一层：概念入门 · 知其然

### 消息的不同顺序

消息从发送、排队、交付到处理完成，可能有不同的时间顺序。声明“有序”时必须指出哪个环节、按什么对象分组，以及失败重试怎样处理。发送顺序不会自动变成所有副作用的完成顺序。


### 定义

消息顺序保证是对一组消息之间先后关系的约束。例如，按订单分组并保持组内顺序，意味着同订单事件需尊重所声明的先后，而不同订单可以交错处理。组内有序不等于所有消息存在唯一的全局顺序。

### 理解定义中的术语与关系

#### 顺序保证与重复处理分开

即使交付按顺序，消费者把不同事件交给并发任务后，完成顺序仍可能改变。若要保护业务先后，必须让处理安排也符合契约。回复或确认丢失还可能导致重复交付；对副作用去重与保持顺序是两项不同职责。

### 概念边界与常见混淆

需要跨组共享不变量时，不能只依赖组内顺序。具体队列的可见性、批量交付和失败恢复规则还须按其契约确认，不能把“FIFO”当作所有性质的总称。

### 先看一个例子

A 订单有 A1 创建、A2 取消，B 订单有 B1 创建、B2 取消。仅要求各订单创建先于取消，则 A1、B1、A2、B2 与 B1、B2、A1、A2 都允许。A2 先于 A1 不允许。这个例子没有额外要求 A 与 B 之间的因果关系。

### 理解练习

#### 1. 哪些交错合法

A1、B1、B2、A2 是否符合例子的组内先后？

<details><summary>答案与解释</summary>

符合。A1 仍在 A2 前，B1 仍在 B2 前。两个组的交错不影响这两条已声明约束。

</details>

#### 2. 交付与完成不同

按 A1、A2 收到后，立即让两个任务并行执行，是否自然保证先创建后取消的效果？

<details><summary>答案与解释</summary>

不能。A2 可能更早完成或读到创建尚未完成的状态。若业务要求该先后，必须让组内处理完成关系也符合要求。

</details>

#### 3. 有序不等于只处理一次

消费者处理 A1 后没能发出确认，A1 被重新交付，原有序承诺是否已经消失？

<details><summary>答案与解释</summary>

不一定，重试可与声明的交付协议相容。但如果副作用不能重复，就需按事件身份做可靠去重，不能只靠有序来避免重复创建。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 各组只约束本组先后，四个位置中任取两个放A，A内部顺序固定。
2. 其余位置放B，因此交错数为组合数C(4,2)，跨组没有额外因果假设。

### 具体输入与计算步骤

A组A1先于A2，B组B1先于B2。

1. C(4,2)=4×3/(2×1)=6种。
2. 例如A1B1A2B2和B1B2A1A2均合法，A2A1B1B2不合法。

计算结果：例如A1B1A2B2和B1B2A1A2均合法，A2A1B1B2不合法。

### 换到实际问题中应用

按订单处理创建、成交、取消事件。

1. 以订单身份分组，在组内完成必要副作用后再推进下一事件。
2. 跨订单并行提升吞吐，但跨订单风控不变量需另有协调。

应用结论：跨订单并行提升吞吐，但跨订单风控不变量需另有协调。

### 举一反三：改变条件后的完整解答

A增加A3，B仍2条，合法交错多少？

<details><summary>变式的推演与答案</summary>

1. 从5个位置选3个放固定顺序A1、A2、A3。
2. C(5,3)=10，增加消息不意味着需要全局串行处理。

C(5,3)=10，增加消息不意味着需要全局串行处理。

</details>

### 原有解释与进一步例题


### 原理与推演

If A1 precedes A2 and B1 precedes B2, six complete interleavings respect these two constraints: choose the two A positions from four slots.

Choose grouping keys that match the business invariant, then process effects in group order. Delivery, handler completion, visibility timeouts, and duplicate effects require separate reasoning.


### 例子

例子：A 组顺序 A1→A2，B 组顺序 B1→B2，则 A1、B1、B2、A2 是合法交错，A2、A1、B1、B2 则违反 A 组顺序。每组 FIFO 没有定义跨组的唯一全局次序，去重又是独立要求。


### 适用边界与常见误解

FIFO delivery does not serialize arbitrary asynchronous side effects. A mathematical set of valid schedules does not promise that a queue implements every schedule.

### 推导与方法参考

- [一手资料](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-understanding-logic.html)

[返回分层目录](00-learning-index.md)
