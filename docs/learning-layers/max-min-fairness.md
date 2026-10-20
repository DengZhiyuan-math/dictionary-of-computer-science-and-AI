# Max-min Fairness / Water Filling

概念编号：`concept:max-min-fairness` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/max-min-fairness/)

## 第一层：概念入门 · 知其然

### 它是什么

最大最小公平分配优先改善最小且尚未满足的分配额。需求已满足的对象退出继续均分，让其余对象分享剩余资源。

### 先看一个例子

有 10 份资源，三人的需求分别为 2、6、8。先每人分到 2 份，用掉 6 份；第一人已满足，余下 4 份由另外两人平分，结果为 2、4、4。

### 理解练习

为什么不让第一人也继续参与剩余资源的均分？

<details><summary>答案与解释</summary>

他的需求上限是 2，继续分配超过了需求。需求封顶后退出，剩余资源应给尚未满足的对象。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

For capacity C >= 0 and demands d_i >= 0, allocate x_i = min(d_i, lambda), choosing a common water level so the total is min(C, sum d_i). A demand-capped consumer leaves the sharing set when its cap is reached.

Sort demands, satisfy the smallest cap when it is no greater than the remaining equal share, then divide the remaining capacity equally among active consumers. Sorting costs O(n log(n + 1)) time; the subsequent scan is linear.


### 适用边界与常见误解

This formula assumes equal weights and one divisible resource, without reservations, placement constraints, or indivisible jobs. Peloton's hierarchical, weighted, multi-resource scheduler has additional policies.

### 概念辨析

- [Risk Parity · 风险平价](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-risk-parity.md)：最大最小公平分配保护较小的未满足分配；风险平价约束组合风险贡献。目标、单位与约束不同。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
