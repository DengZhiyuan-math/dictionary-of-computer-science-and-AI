# NaN / Inf / OOM

概念编号：`concept:nan-inf-oom` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/nan-inf-oom/)

## 第一层：概念入门 · 知其然

### 它是什么

Loss scaling amplifies the loss in some mixed-precision training so that small gradients remain representable, then compensates before updating. NaN denotes an invalid numeric value; Inf denotes infinity, for example after overflow. These can arise from division by zero, extreme scores or unstable operations. OOM means out of memory, not exploding gradients. For OOM, inspect batch size, sequence length, saved activations and model size. For NaN, inspect numerical values and data first.

### 先看一个例子

for example after overflow. These can arise from division by zero, extreme scores or unstable operations. OOM means out of memory, not exploding gradients. For OOM, inspect batch size, sequence length, saved activations and model size. For NaN, inspect numerical values and data first.

### 理解练习

用自己的话解释：上面的情景为什么是“NaN / Inf / OOM”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Loss scaling amplifies the loss in some mixed-precision training so that small gradients remain representable, then compensates before updating. NaN denotes an invalid numeric value; Inf denotes infinity, for example after overflow. These can arise from division by zero, extreme scores or unstable operations. OOM means out of memory, not exploding gradients. For OOM, inspect batch size, sequence length, saved activations and model size. For NaN, inspect numerical values and data first.

情景依据：for example after overflow. These can arise from division by zero, extreme scores or unstable operations. OOM means out of memory, not exploding gradients. For OOM, inspect batch size, sequence length, saved activations and model size. For NaN, inspect numerical values and data first.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Loss scaling amplifies the loss in some mixed-precision training so that small gradients remain representable, then compensates before updating. NaN denotes an invalid numeric value; Inf denotes infinity, for example after overflow. These can arise from division by zero, extreme scores or unstable operations. OOM means out of memory, not exploding gradients. For OOM, inspect batch size, sequence length, saved activations and model size. For NaN, inspect numerical values and data first.


### 适用边界与常见误解

Separate numerical diagnosis from memory diagnosis first.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
