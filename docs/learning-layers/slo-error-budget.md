# SLI / SLO / Error Budget

概念编号：`concept:slo-error-budget` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/slo-error-budget/)

## 第一层：概念入门 · 知其然

### 服务指标与统计窗口

先约定哪些请求进入统计、什么算成功，以及观察多长时间。成功率是这个窗口内成功请求数除以有效请求总数。若按可用分钟数衡量，则分母已经变成时间，不能与按请求计数的指标混用。


### 定义

服务水平目标（SLO）是对选定服务指标在规定窗口内应达到水平的目标。错误预算是同一口径下目标允许的坏事件份额或数量。它用于判断可靠性余量和制定变更政策，不是鼓励制造故障的额度。

### 理解定义中的术语与关系

#### 预算必须和目标使用同一分母

请求成功目标为 99.9% 时，坏请求允许占 0.1%。要计算数量，还需要窗口内有效请求数；流量变化时，同一比例对应的次数会变化。预算消耗要与预先规定的发布和故障处理政策联系起来，不能凭一个百分比自动决定所有发布。

### 概念边界与常见混淆

均匀分散的失败与集中爆发可有相同窗口成功率，用户感受却不同。还需观察延迟、影响范围和预算消耗速度；SLO 目标也不自动等于带赔偿条款的合同承诺。

### 先看一个例子

某个完整窗口内有一百万个有效请求，目标成功率 99.9%。允许坏请求一千个。若实际四百个失败，消耗预算 40%，实际成功率 99.96%。这些数字只评价这个窗口和已约定的成功定义，并没有给出每分钟服务状态。

### 理解练习

#### 1. 请求比例与停机分钟

99.9% 请求成功率能直接换成每月固定几分钟允许停机吗？

<details><summary>答案与解释</summary>

不能。高峰一分钟与低谷一分钟的请求量可能不同。只有另行定义按时间的指标，才能用对应时间分母计算。

</details>

#### 2. 超出预算

例子中失败变成一千二百个，目标仍满足吗？

<details><summary>答案与解释</summary>

不满足。坏请求超过允许的一千个，预算消耗为 120%，成功率为 99.88%。这应按事先政策触发相应处理，不代表服务会自动停止。

</details>

#### 3. 降低分母的风险

为了让报告更好看，临时把失败请求排除出有效请求，能与旧窗口比较吗？

<details><summary>答案与解释</summary>

不能。指标口径被改变了。需要稳定、事先明确的纳入规则，否则预算和成功率不再描述同一个服务目标。

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
