# Adaptive Concurrency · 服务并发上限的反馈控制

概念编号：`concept:adaptive-concurrency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/adaptive-concurrency/)

## 第一层：概念入门 · 知其然

### 它是什么

自适应并发限制器根据已经观察到的服务延迟、利用率或丢弃等反馈，调整同时在途的请求数。它把背压落到请求入口，目的是控制排队；并发上限是请求数，不能当作每秒请求速率。

### 先看一个例子

若 R₀ 失真，估计也会失真；处理时间较长与排队较多需要额外观测来区分。

### 理解练习

用自己的话解释：上面的情景为什么是“Adaptive Concurrency · 服务并发上限的反馈控制”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：自适应并发限制器根据已经观察到的服务延迟、利用率或丢弃等反馈，调整同时在途的请求数。它把背压落到请求入口，目的是控制排队；并发上限是请求数，不能当作每秒请求速率。

情景依据：若 R₀ 失真，估计也会失真；处理时间较长与排队较多需要额外观测来区分。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数、公式与边界

在本页讨论的固定基线教学口径中，上限为 L、无排队基线延迟为 R₀、当前延迟为 R，且 R≥R₀>0，排队量估计为 \(\widehat q=\lceil L(1-R_0/R)\rceil\)。这只是反馈信号，不能单凭它推断真实队列。实际更新还要声明阈值、平滑、上下界和基线探测规则，不能凭公式臆造完整控制策略。


### 例子

L=20、R₀=10 毫秒、R=20 毫秒时，估计排队量为 10。控制器可以按事先设定的策略降低后续准入，但已经进入系统的请求不会因此消失。若 R₀ 失真，估计也会失真；处理时间较长与排队较多需要额外观测来区分。


### 适用边界与常见误解

The queue estimate is a model, not a measured count of waiting requests. A concurrency cap is distinct from a request-rate quota. This pinned open-source implementation does not establish Netflix's current production configuration.

### 概念辨析

- [Token Bucket / Rate Limiting](token-bucket.md)：令牌桶控制准入速率与突发额度；并发限制控制同时在途数量。相同请求速率可对应不同并发。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
