# SFT / LoRA / QLoRA

概念编号：`concept:sft-lora-qlora` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sft-lora-qlora/)

## 第一层：概念入门 · 知其然

### 它是什么

Pretraining learns general patterns from large-scale data. Continued pretraining applies similar objectives to an existing model, often with additional domain data. SFT uses input–expected-response pairs to shape task behavior. These stages can all update parameters but differ in data format and objective. Adding documents does not always require fine-tuning: retrieval can also supply frequently updated knowledge with citations.

### 先看一个例子

例子：一个 1000×1000 的权重矩阵有一百万参数。秩 r=4 的 LoRA 增量用 1000×4 与 4×1000 两个因子，共 8000 个参数，不含其他可训练项。QLoRA 还量化冻结基座，SFT 则描述监督训练任务；三者不是同一分类维度。

### 理解练习

用自己的话解释：上面的情景为什么是“SFT / LoRA / QLoRA”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Pretraining learns general patterns from large-scale data. Continued pretraining applies similar objectives to an existing model, often with additional domain data. SFT uses input–expected-response pairs to shape task behavior. These stages can all update parameters but differ in data format and objective. Adding documents does not always require fine-tuning: retrieval can also supply frequently updated knowledge with citations.

情景依据：例子：一个 1000×1000 的权重矩阵有一百万参数。秩 r=4 的 LoRA 增量用 1000×4 与 4×1000 两个因子，共 8000 个参数，不含其他可训练项。QLoRA 还量化冻结基座，SFT 则描述监督训练任务；三者不是同一分类维度。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Pretraining learns general patterns from large-scale data. Continued pretraining applies similar objectives to an existing model, often with additional domain data. SFT uses input–expected-response pairs to shape task behavior. These stages can all update parameters but differ in data format and objective. Adding documents does not always require fine-tuning: retrieval can also supply frequently updated knowledge with citations.


### 例子

例子：一个 1000×1000 的权重矩阵有一百万参数。秩 r=4 的 LoRA 增量用 1000×4 与 4×1000 两个因子，共 8000 个参数，不含其他可训练项。QLoRA 还量化冻结基座，SFT 则描述监督训练任务；三者不是同一分类维度。


### 适用边界与常见误解

A training stage and a parameter-efficient adaptation method describe different aspects.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
