# Circuit Breaker

概念编号：`concept:circuit-breaker` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/circuit-breaker/)

## 第一层：概念入门 · 知其然

### 它是什么

熔断器在依赖持续失败时暂时停止调用，过一段时间用少量试探确认是否恢复。

### 先看一个例子

教学规则为连续3次失败就打开，等待10秒后半开，只允许1个探测请求。

### 理解练习

打开熔断器等于修复了远程服务吗？

<details><summary>答案与解释</summary>

不是，它只阻止本地继续施压。

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
