# Iteration / Optimizer Step / Epoch

概念编号：`concept:iteration-optimizer-step-epoch` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/iteration-optimizer-step-epoch/)

## 第一层：概念入门 · 知其然

### 它是什么

An iteration is one defined training-loop cycle; an optimizer step actually updates parameters; an epoch traverses a finite training dataset once. Code and streaming-data conventions must be stated.

### 先看一个例子

if one iteration is one batch. With accumulation over 2 batches, that epoch has 5 optimizer steps. Ten iterations are not ten epochs.

### 理解练习

用自己的话解释：上面的情景为什么是“Iteration / Optimizer Step / Epoch”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：An iteration is one defined training-loop cycle; an optimizer step actually updates parameters; an epoch traverses a finite training dataset once. Code and streaming-data conventions must be stated.

情景依据：if one iteration is one batch. With accumulation over 2 batches, that epoch has 5 optimizer steps. Ten iterations are not ten epochs.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

With N samples and batch size B, keeping the final partial batch gives ceil(N/B) batches per epoch. Updating every A batches reduces the update count, with the final incomplete accumulation handled by an explicit rule.


### Example

For 1,000 samples and batches of 100, one epoch has 10 iterations if one iteration is one batch. With accumulation over 2 batches, that epoch has 5 optimizer steps. Ten iterations are not ten epochs.


### 适用边界与常见误解

Gradient accumulation or skipped updates means these counts are not interchangeable.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
