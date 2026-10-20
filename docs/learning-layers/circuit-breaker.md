# Circuit Breaker

概念编号：`concept:circuit-breaker` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/circuit-breaker/)

## 第一层：概念入门 · 知其然

### 远程依赖与失败反馈

服务调用另一个服务时，可能成功、明确失败，或等待到超时仍不知道结果。不断重试一个正在故障的依赖，会继续占用本地连接和处理资源。保护调用方与修复远程故障是不同问题。


### 定义

熔断器根据一段调用的失败情况，暂时阻止后续调用继续到达某个依赖，并按规则用有限探测判断是否恢复。它是一种有状态的保护机制，作用于后续调用的接纳，不保证撤销已经执行的远程操作。

### 理解定义中的术语与关系

#### 关闭、打开与半开

关闭态允许调用并记录结果；打开态快速拒绝或走预先安排的替代路径；半开态只放少量探测调用。探测结果再决定恢复或重新等待。状态名来自电路比喻：关闭态是正常通行，打开态才是断开，不应按日常“开服务”的直觉误读。

### 概念边界与常见混淆

熔断器、超时、重试和限流各有不同职责。对支付等结果可能未知的操作，本地超时或熔断拒绝不能被解释成远程操作必然没有发生。

### 先看一个例子

教学规则规定连续三次失败就打开，十秒后只允许一个探测调用。前三次实际失败后，第四次在本地被拒绝，不再打到依赖。十秒后探测成功才按规则恢复；探测失败则继续保护。十秒是等待安排，不是断言故障十秒必定修好。

### 理解练习

#### 1. 打开不是修复

熔断器打开后，本地响应变快，是否证明远程服务已经恢复？

<details><summary>答案与解释</summary>

不能。可能只是本地快速拒绝，根本没有进行远程调用。应区分拒绝延迟、成功处理量和依赖真实状态。

</details>

#### 2. 为什么只允许少量探测

等待结束后，让全部积压请求一起冲入依赖，是否等同于半开探测？

<details><summary>答案与解释</summary>

不是。半开通过有限请求获取恢复证据，避免在尚未确认恢复时重新压垮依赖。积压如何处理也需要另外的容量规则。

</details>

#### 3. 失败与结果未知

第一次支付请求超时，随后熔断器拒绝重试，能否据此宣布第一次支付没有发生？

<details><summary>答案与解释</summary>

不能。第一次可能已执行但回复丢失。需要查询或使用相应的幂等协议确认；熔断器只控制后来是否继续调用。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 关闭态允许调用并记录失败，打开态本地拒绝，半开态限制探测。
2. 探测成功按规则关闭，失败重新打开；并发调用必须协调探测许可。

### 具体输入与计算步骤

教学规则为连续3次失败就打开，等待10秒后半开，只允许1个探测请求。

1. 连续失败1、2、3次后进入打开态，第4次调用被本地拒绝。
2. 等待10秒进入半开，只发送1个探测，其余请求仍受限。

计算结果：等待10秒进入半开，只发送1个探测，其余请求仍受限。

### 换到实际问题中应用

保护支付服务不被故障下游拖垮。

1. 按依赖分别配置失败窗口、超时与恢复规则，记录熔断状态。
2. 返回明确降级结果，支付结果未知时仍需查单，不能把本地拒绝当退款成功。

应用结论：返回明确降级结果，支付结果未知时仍需查单，不能把本地拒绝当退款成功。

### 举一反三：改变条件后的完整解答

半开探测再次失败会怎样？

<details><summary>变式的推演与答案</summary>

1. 按示例恢复规则立即重新打开，并重置等待计时。
2. 继续限制流量而非恢复全部调用，避免一拥而上放大故障。

继续限制流量而非恢复全部调用，避免一拥而上放大故障。

</details>

### 原有解释与进一步例题


### 原理与推演

Closed allows calls and records outcomes. Open rejects locally until the recovery policy permits a transition. Half-open allows limited trial calls before restoring normal traffic or reopening.

Choose explicit failure thresholds, observation windows, timeout behavior, and recovery criteria. Concurrent callers must coordinate probe admission to avoid releasing a new burst into a failing service.


### 例子

例子：约定连续 3 次失败后打开熔断，之后本地拒绝调用；过 10 秒允许一个 half-open 探测。探测成功才按约定恢复流量，失败则回到 open。探测规则应固定，不能让所有请求同时变成试探而压垮恢复中的服务。


### 适用边界与常见误解

A circuit breaker does not make retries safe, replace a timeout, or enforce a request-rate quota. Local rejections are not downstream failures.

### 推导与方法参考

- [一手资料](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker)

[返回分层目录](00-learning-index.md)
