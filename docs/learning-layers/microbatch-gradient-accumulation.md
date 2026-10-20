# Microbatch / Gradient Accumulation

概念编号：`concept:microbatch-gradient-accumulation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/microbatch-gradient-accumulation/)

## 第一层：概念入门 · 知其然

### 它是什么

梯度累积把多个小批的梯度合在一起，再进行一次参数更新。

### 先看一个例子

两个等大微批的平均梯度分别2和4。

### 理解练习

累计两次就等于更新两次吗？

<details><summary>答案与解释</summary>

不等于，中途不更新参数才对应同一批梯度的组合。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 等大微批要把每批平均损失除以微批数k，累计后得到全批均值梯度。
2. 不等大微批应按样本数加权；BatchNorm等依赖批统计的操作未必等价。

### 具体输入与计算步骤

两个等大微批的平均梯度分别2和4。

1. 每批损失除2后，累计梯度2/2+4/2=3。
2. 学习率0.1，参数1更新为1−0.1×3=0.7。

计算结果：学习率0.1，参数1更新为1−0.1×3=0.7。

### 换到实际问题中应用

显存只够每次8张图片，需要有效批32。

1. 每批损失除4，反传4次，期间不清梯度也不更新。
2. 随后执行一次更新并清梯度，调度器也按更新计步。

应用结论：随后执行一次更新并清梯度，调度器也按更新计步。

### 举一反三：改变条件后的完整解答

若微批大小分别1和3，均值梯度2和4呢？

<details><summary>变式的推演与答案</summary>

1. 全批应按样本数加权：(1×2+3×4)/4。
2. 正确梯度3.5，简单平均3会错误改变每个样本权重。

正确梯度3.5，简单平均3会错误改变每个样本权重。

</details>

### 原有解释与进一步例题


### 原理与推演

When GPU memory cannot fit many samples at once, split them into microbatches, run forward and backward passes separately, accumulate their gradients and then update. For example, compute gradients after each microbatch but update parameters only after four microbatches: four iterations correspond to one optimizer step. This gives a larger effective batch, but is not always exactly equivalent to one large batch. BatchNorm statistics, for example, can differ. Gradient accumulation does not mean parameters change after every microbatch.


### 适用边界与常见误解

Partial final batches, loss normalization, and BatchNorm can affect equivalence to a large batch.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/optim.html)

[返回分层目录](00-learning-index.md)
