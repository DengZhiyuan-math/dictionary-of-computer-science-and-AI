# Token Bucket / Rate Limiting

概念编号：`concept:token-bucket` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/token-bucket/)

## 第一层：概念入门 · 知其然

### 它是什么

For capacity C, rate r, elapsed time Δt, and previous credit b, refill to min(C, b + rΔt). Admit a unit-cost request only when this balance is at least one, then subtract one.

### 先看一个例子

例子：容量 5、补充速率每秒 2、当前余额 1，经过 2 秒后补到 min(5,1+4)=5。连续六个单位成本请求中可立即放行五个，第六个应按规则等待或拒绝；这不是对同时在途请求数的限制。

### 理解练习

用自己的话解释：上面的情景为什么是“Token Bucket / Rate Limiting”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：For capacity C, rate r, elapsed time Δt, and previous credit b, refill to min(C, b + rΔt). Admit a unit-cost request only when this balance is at least one, then subtract one.

情景依据：例子：容量 5、补充速率每秒 2、当前余额 1，经过 2 秒后补到 min(5,1+4)=5。连续六个单位成本请求中可立即放行五个，第六个应按规则等待或拒绝；这不是对同时在途请求数的限制。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Retain fractional credit and update the timestamp on each refill. Shared buckets need atomic refill-and-consume decisions; independent replica buckets do not enforce one global quota.


### 适用边界与常见误解

Rate, concurrent in-flight work, and queue size are different limits. A token bucket is not a guarantee of uniform spacing between requests.

### 概念辨析

- [Adaptive Concurrency · 服务并发上限的反馈控制](adaptive-concurrency.md)：令牌桶控制准入速率与突发额度；并发限制控制同时在途数量。相同请求速率可对应不同并发。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
