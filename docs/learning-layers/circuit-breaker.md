# Circuit Breaker

概念编号：`concept:circuit-breaker` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/circuit-breaker/)

## 第一层：概念入门 · 知其然

### 它是什么

Closed allows calls and records outcomes. Open rejects locally until the recovery policy permits a transition. Half-open allows limited trial calls before restoring normal traffic or reopening.

### 先看一个例子

例子：约定连续 3 次失败后打开熔断，之后本地拒绝调用；过 10 秒允许一个 half-open 探测。探测成功才按约定恢复流量，失败则回到 open。探测规则应固定，不能让所有请求同时变成试探而压垮恢复中的服务。

### 理解练习

用自己的话解释：上面的情景为什么是“Circuit Breaker”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Closed allows calls and records outcomes. Open rejects locally until the recovery policy permits a transition. Half-open allows limited trial calls before restoring normal traffic or reopening.

情景依据：例子：约定连续 3 次失败后打开熔断，之后本地拒绝调用；过 10 秒允许一个 half-open 探测。探测成功才按约定恢复流量，失败则回到 open。探测规则应固定，不能让所有请求同时变成试探而压垮恢复中的服务。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Choose explicit failure thresholds, observation windows, timeout behavior, and recovery criteria. Concurrent callers must coordinate probe admission to avoid releasing a new burst into a failing service.


### 适用边界与常见误解

A circuit breaker does not make retries safe, replace a timeout, or enforce a request-rate quota. Local rejections are not downstream failures.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
