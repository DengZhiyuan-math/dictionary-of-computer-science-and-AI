# Microbatch / Gradient Accumulation

概念编号：`concept:microbatch-gradient-accumulation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/microbatch-gradient-accumulation/)

## 第一层：概念入门 · 知其然

### 它是什么

梯度累积把一批数据拆成几小批，分别计算梯度并积累，到约定的边界再更新一次参数，以减少单次前向、反向的显存需求。

### 先看一个例子

GPU 一次只能放两条记录，但希望每八条更新一次，就分四小批处理，在这四次反向计算后才进行一次优化器更新。

### 理解练习

四小批累积，是不是四次参数更新？

<details><summary>答案与解释</summary>

不是。按这个约定，四小批对应一次更新。损失归一化与批统计等细节，还会影响它与真正大批次是否等价。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

When GPU memory cannot fit many samples at once, split them into microbatches, run forward and backward passes separately, accumulate their gradients and then update. For example, compute gradients after each microbatch but update parameters only after four microbatches: four iterations correspond to one optimizer step. This gives a larger effective batch, but is not always exactly equivalent to one large batch. BatchNorm statistics, for example, can differ. Gradient accumulation does not mean parameters change after every microbatch.


### 适用边界与常见误解

Partial final batches, loss normalization, and BatchNorm can affect equivalence to a large batch.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
