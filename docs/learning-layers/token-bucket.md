# Token Bucket / Rate Limiting

概念编号：`concept:token-bucket` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/token-bucket/)

## 第一层：概念入门 · 知其然

### 它是什么

令牌桶按固定速率补充额度，积累到上限后停止，既限制长期速率又允许有限突发。

### 先看一个例子

容量5，现有1个令牌，每秒补2个，过去1.5秒后收到3个单位请求。

### 理解练习

空闲很久后能无限突发吗？

<details><summary>答案与解释</summary>

不能，余额被桶容量限制。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 先补充b新=min(C,b+rΔt)，每获准一个请求扣1，额度不足则按策略拒绝或排队。
2. 保留小数额度并更新时间，多线程或多副本共享限额需原子补充与扣减。

### 具体输入与计算步骤

容量5，现有1个令牌，每秒补2个，过去1.5秒后收到3个单位请求。

1. 补充min(5,1+2×1.5)=4个令牌。
2. 依次批准3个请求后剩1，不能每次都用旧时间重复补充。

计算结果：依次批准3个请求后剩1，不能每次都用旧时间重复补充。

### 换到实际问题中应用

对外部接口设置每秒2次、最多突发5次的限流。

1. 将令牌检查放在实际调用入口，用单调时钟计算经过时间。
2. 拒绝时返回可重试信息或受控排队，避免无界积压。

应用结论：拒绝时返回可重试信息或受控排队，避免无界积压。

### 举一反三：改变条件后的完整解答

若桶已满后瞬间来6个单位请求，无补充时间，能放行多少？

<details><summary>变式的推演与答案</summary>

1. 初始只有5个令牌，前5个依次扣到0。
2. 第6个不能放行；多个独立副本各一桶不等于全局只放5个。

第6个不能放行；多个独立副本各一桶不等于全局只放5个。

</details>

### 原有解释与进一步例题


### 原理与推演

For capacity C, rate r, elapsed time Δt, and previous credit b, refill to min(C, b + rΔt). Admit a unit-cost request only when this balance is at least one, then subtract one.

Retain fractional credit and update the timestamp on each refill. Shared buckets need atomic refill-and-consume decisions; independent replica buckets do not enforce one global quota.


### 例子

例子：容量 5、补充速率每秒 2、当前余额 1，经过 2 秒后补到 min(5,1+4)=5。连续六个单位成本请求中可立即放行五个，第六个应按规则等待或拒绝；这不是对同时在途请求数的限制。


### 适用边界与常见误解

Rate, concurrent in-flight work, and queue size are different limits. A token bucket is not a guarantee of uniform spacing between requests.

### 概念辨析

- [Adaptive Concurrency · 服务并发上限的反馈控制](adaptive-concurrency.md)：令牌桶控制准入速率与突发额度；并发限制控制同时在途数量。相同请求速率可对应不同并发。

### 推导与方法参考

- [一手资料](https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling)

[返回分层目录](00-learning-index.md)
