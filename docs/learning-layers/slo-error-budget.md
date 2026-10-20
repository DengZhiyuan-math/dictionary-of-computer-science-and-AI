# SLI / SLO / Error Budget

概念编号：`concept:slo-error-budget` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/slo-error-budget/)

## 第一层：概念入门 · 知其然

### 它是什么

For N > 0 eligible requests, B bad requests, and success target S, observed success is 1 − B/N and the allowed bad-event count is N(1 − S). Budget consumption is B/[N(1 − S)] when the denominator is positive.

### 先看一个例子

例子：窗口有 10000 个合格请求，成功目标 99.9%，允许坏事件数为 10。实际失败 6 次，预算消费 60%。若把超时请求从分母中删掉会改变指标契约，不能只为了让结果达标而排除它们。

### 理解练习

用自己的话解释：上面的情景为什么是“SLI / SLO / Error Budget”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：For N > 0 eligible requests, B bad requests, and success target S, observed success is 1 − B/N and the allowed bad-event count is N(1 − S). Budget consumption is B/[N(1 − S)] when the denominator is positive.

情景依据：例子：窗口有 10000 个合格请求，成功目标 99.9%，允许坏事件数为 10。实际失败 6 次，预算消费 60%。若把超时请求从分母中删掉会改变指标契约，不能只为了让结果达标而排除它们。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Define eligible events, observation window, and measurement location before calculating the ratio. A request-based budget and a time-based availability budget have different denominators.


### 适用边界与常见误解

A request error fraction cannot be converted directly into outage duration. An SLO target alone is not an SLA with contractual consequences.

### 概念辨析

- [Latency Budget · 延迟预算](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-latency-budget.md)：错误预算是目标窗口内允许的失败额度；延迟预算分配一次链路的耗时，不能混用预算单位。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
