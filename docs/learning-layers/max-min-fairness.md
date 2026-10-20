# Max-min Fairness / Water Filling

概念编号：`concept:max-min-fairness` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/max-min-fairness/)

## 第一层：概念入门 · 知其然

### 它是什么

最大最小公平先照顾较小且未满足的分配，不能靠压低更小者来增加更大者。

### 先看一个例子

单一可分资源容量12，三个等权需求上限2、8、8。

### 理解练习

公平意味着三者必须都分4吗？

<details><summary>答案与解释</summary>

不是，第一位只需2，多余应分给仍有需求者。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 同水位λ分配xᵢ=min(dᵢ,λ)，总分配为min(C,Σd)。
2. 逐步注水，碰到小需求上限就移出共享集合，再均分剩余容量。

### 具体输入与计算步骤

单一可分资源容量12，三个等权需求上限2、8、8。

1. 初始均分12/3=4，需求2先满足，剩容量10。
2. 剩两者各10/2=5，分配[2,5,5]，合计12。

计算结果：剩两者各10/2=5，分配[2,5,5]，合计12。

### 换到实际问题中应用

给三个租户分配可分CPU配额。

1. 按需求上限排序，用剩余容量除活跃租户数决定水位。
2. 验证不超过需求、总量不超容量；多资源或带权公平需要扩展模型。

应用结论：验证不超过需求、总量不超容量；多资源或带权公平需要扩展模型。

### 举一反三：改变条件后的完整解答

容量改20，需求仍2、8、8呢？

<details><summary>变式的推演与答案</summary>

1. 总需求只有18，所有人需求均可满足。
2. 分配[2,8,8]，剩2空闲，不强塞超过需求的资源。

分配[2,8,8]，剩2空闲，不强塞超过需求的资源。

</details>

### 原有解释与进一步例题


### 原理与推演

For capacity C >= 0 and demands d_i >= 0, allocate x_i = min(d_i, lambda), choosing a common water level so the total is min(C, sum d_i). A demand-capped consumer leaves the sharing set when its cap is reached.

Sort demands, satisfy the smallest cap when it is no greater than the remaining equal share, then divide the remaining capacity equally among active consumers. Sorting costs O(n log(n + 1)) time; the subsequent scan is linear.


### 适用边界与常见误解

This formula assumes equal weights and one divisible resource, without reservations, placement constraints, or indivisible jobs. Peloton's hierarchical, weighted, multi-resource scheduler has additional policies.

### 概念辨析

- [Risk Parity · 风险平价](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-risk-parity.md)：最大最小公平分配保护较小的未满足分配；风险平价约束组合风险贡献。目标、单位与约束不同。

### 推导与方法参考

- [一手资料](https://www.uber.com/us/en/blog/resource-scheduler-cluster-management-peloton/)

[返回分层目录](00-learning-index.md)
