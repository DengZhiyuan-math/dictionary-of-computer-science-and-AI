# Token Bucket / Rate Limiting

概念编号：`concept:token-bucket` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/token-bucket/)

## 第一层：概念入门 · 知其然

### 速率限制与突发额度

限流决定哪些请求可以进入服务。按每秒平均数量限制，并不一定要求请求均匀间隔到达；系统可能允许短时间多来一些，但要求这种突发不能无限延续。令牌是一份获准工作所需的额度，不是实际要传送的物品。


### 定义

令牌桶维护一个有上限的额度余额，以规定速率补充；请求获准时消耗相应额度。余额不足时按策略拒绝或等待。桶容量限制可积累的突发能力，补充速率限制长期获准工作的增长。

### 理解定义中的术语与关系

#### 先补充再扣减

检查请求时，根据距上次更新时间补充额度，但不能超过容量，然后判断是否足够扣减。经过的时间不能在每个请求里重复计入。多个调用者共享同一限额时，检查与扣减需要协调，不能让每个人都同时看到同一份余额可用。

### 概念边界与常见混淆

令牌桶不直接限制一个请求要执行多久，也不等于并发上限。独立部署的多个桶只有在明确协调后才能形成同一个全局限额。

### 先看一个例子

容量五，当前余额一，每秒补充两个。经过一点五秒后，余额变成四；立即来三个各消耗一个额度的请求，都可获准，剩一。若此后空闲很久，余额最多仍为五，不会积累成无限信用。

### 理解练习

#### 1. 平均速率不禁止短突发

每秒补两个、容量五，桶已满时能否瞬间批准五个请求？

<details><summary>答案与解释</summary>

可以，只要每个消耗一个额度且扣减正确。这使用了已有突发余额，不意味着之后还能无限按这个瞬时速度批准。

</details>

#### 2. 额度与并发不同

五个请求已经获准但都没结束，过一秒又有两个额度，是否仅凭令牌桶就禁止新请求？

<details><summary>答案与解释</summary>

不会仅因前五个未完成而禁止。桶按额度约束接纳；若还要限制同时在途数量，需另外设置并发控制。

</details>

#### 3. 多个副本的总限额

两个服务副本各有容量五的独立满桶，是否保证全局瞬时只批准五个？

<details><summary>答案与解释</summary>

不保证，各自批准五个可能合计十个。全局限制需要共享或分配额度并处理并发，不能只在每个副本复制相同配置。

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
