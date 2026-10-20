# SLI / SLO / Error Budget

概念编号：`concept:slo-error-budget` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/slo-error-budget/)

## 第一层：概念入门 · 知其然

### 它是什么

服务目标规定可接受成功率，错误预算是同一窗口内允许发生的失败额度。

### 先看一个例子

窗口内100万有效请求，成功目标99.9%，已失败400次。

### 理解练习

99.9%请求成功目标等同每月允许固定几分钟宕机吗？

<details><summary>答案与解释</summary>

不等，按请求和按时间计算的分母不同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 允许失败N(1−S)，实际成功率1−B/N，预算用量为B/[N(1−S)]。
2. 先固定有效事件、时间窗与测量位置，再计算；零请求或零预算须单独处理。

### 具体输入与计算步骤

窗口内100万有效请求，成功目标99.9%，已失败400次。

1. 预算1000000×0.001=1000次，400/1000=40%已用。
2. 剩600次，实际成功率1−400/1000000=99.96%。

计算结果：剩600次，实际成功率1−400/1000000=99.96%。

### 换到实际问题中应用

为API服务决定近期发布节奏。

1. 持续计算同口径坏事件与预算消耗，配合预定错误预算政策。
2. 快速消耗时先控制故障与验证变更，不把预算当主动制造失败的额度。

应用结论：快速消耗时先控制故障与验证变更，不把预算当主动制造失败的额度。

### 举一反三：改变条件后的完整解答

同一窗口失败变1200次，目标还满足吗？

<details><summary>变式的推演与答案</summary>

1. 预算消耗1200/1000=120%，超出200次。
2. 实际成功99.88%，低于99.9%，该窗口违约。

实际成功99.88%，低于99.9%，该窗口违约。

</details>

### 原有解释与进一步例题


### 原理与推演

For N > 0 eligible requests, B bad requests, and success target S, observed success is 1 − B/N and the allowed bad-event count is N(1 − S). Budget consumption is B/[N(1 − S)] when the denominator is positive.

Define eligible events, observation window, and measurement location before calculating the ratio. A request-based budget and a time-based availability budget have different denominators.


### 例子

例子：窗口有 10000 个合格请求，成功目标 99.9%，允许坏事件数为 10。实际失败 6 次，预算消费 60%。若把超时请求从分母中删掉会改变指标契约，不能只为了让结果达标而排除它们。


### 适用边界与常见误解

A request error fraction cannot be converted directly into outage duration. An SLO target alone is not an SLA with contractual consequences.

### 概念辨析

- [Latency Budget · 延迟预算](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-latency-budget.md)：错误预算是目标窗口内允许的失败额度；延迟预算分配一次链路的耗时，不能混用预算单位。

### 推导与方法参考

- [一手资料](https://sre.google/workbook/implementing-slos/)

[返回分层目录](00-learning-index.md)
