# Adaptive Concurrency · 服务并发上限的反馈控制

概念编号：`concept:adaptive-concurrency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/adaptive-concurrency/)

## 第一层：概念入门 · 知其然

### 它是什么

自适应并发限制根据服务实际延迟与拥塞反馈，调整同时在途的请求上限。

### 先看一个例子

上限L=10，空载延迟R₀=10毫秒，观察R=20毫秒，教学规则为估算排队大于3则上限减1。

### 理解练习

延迟变大就证明服务器一定需要更多并发吗？

<details><summary>答案与解释</summary>

不是，可能已经排队，增加并发反而更慢。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. Vegas式估算q=ceil(L(1−R₀/R))，用相对基线的额外耗时近似排队。
2. 示例固定基线并规定q>3减1、q=0加1、其余保持；真实实现还有利用率、丢弃、边界和平滑。

### 具体输入与计算步骤

上限L=10，空载延迟R₀=10毫秒，观察R=20毫秒，教学规则为估算排队大于3则上限减1。

1. q=ceil(10×(1−10/20))=5。
2. 5大于3，按教学规则上限从10降到9；不是Netflix全部策略的精确复刻。

计算结果：5大于3，按教学规则上限从10降到9；不是Netflix全部策略的精确复刻。

### 换到实际问题中应用

保护负载变化大的远程服务。

1. 从保守上限开始测延迟，过滤错误样本并周期探测无拥塞基线。
2. 统一管理在途许可并设最小最大值，用真实错误率检验稳定性。

应用结论：统一管理在途许可并设最小最大值，用真实错误率检验稳定性。

### 举一反三：改变条件后的完整解答

仍L=10，若R降到10毫秒，示例如何更新？

<details><summary>变式的推演与答案</summary>

1. q=ceil(10×(1−1))=0。
2. 按q=0加1规则升到11，但仍须服从配置上限及实际利用率条件。

按q=0加1规则升到11，但仍须服从配置上限及实际利用率条件。

</details>

### 原有解释与进一步例题


### 定义与应用范围

自适应并发限制器根据已经观察到的服务延迟、利用率或丢弃等反馈，调整同时在途的请求数。它把背压落到请求入口，目的是控制排队；并发上限是请求数，不能当作每秒请求速率。


### 参数、公式与边界

在本页讨论的固定基线教学口径中，上限为 L、无排队基线延迟为 R₀、当前延迟为 R，且 R≥R₀>0，排队量估计为 \(\widehat q=\lceil L(1-R_0/R)\rceil\)。这只是反馈信号，不能单凭它推断真实队列。实际更新还要声明阈值、平滑、上下界和基线探测规则，不能凭公式臆造完整控制策略。


### 例子

L=20、R₀=10 毫秒、R=20 毫秒时，估计排队量为 10。控制器可以按事先设定的策略降低后续准入，但已经进入系统的请求不会因此消失。若 R₀ 失真，估计也会失真；处理时间较长与排队较多需要额外观测来区分。


### 适用边界与常见误解

The queue estimate is a model, not a measured count of waiting requests. A concurrency cap is distinct from a request-rate quota. This pinned open-source implementation does not establish Netflix's current production configuration.

### 概念辨析

- [Token Bucket / Rate Limiting](token-bucket.md)：令牌桶控制准入速率与突发额度；并发限制控制同时在途数量。相同请求速率可对应不同并发。

### 推导与方法参考

- [一手资料](https://github.com/Netflix/concurrency-limits/blob/78a74b9878d38c4c048b0304ce12a162ab7b7222/concurrency-limits-core/src/main/java/com/netflix/concurrency/limits/limit/VegasLimit.java)

[返回分层目录](00-learning-index.md)
