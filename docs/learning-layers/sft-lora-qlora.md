# SFT / LoRA / QLoRA

概念编号：`concept:sft-lora-qlora` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sft-lora-qlora/)

## 第一层：概念入门 · 知其然

### 它是什么

SFT用示范答案监督微调；LoRA只训练低秩增量；QLoRA把冻结底座量化并训练适配器。

### 先看一个例子

一个100×100权重矩阵，LoRA秩r=4。

### 理解练习

LoRA等于只训练前4行原权重吗？

<details><summary>答案与解释</summary>

不是，它训练两个低秩因子，形成作用于整个矩阵的增量。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 令ΔW=BA，B形状(100,4)，A形状(4,100)。
2. 可训练参数从10000变为r(100+100)，表达能力受秩限制。

### 具体输入与计算步骤

一个100×100权重矩阵，LoRA秩r=4。

1. 因子参数400+400=800。
2. 相对10000减少92%，但显存还包含冻结权重、激活与优化器，不能同样声称减少92%。

计算结果：相对10000减少92%，但显存还包含冻结权重、激活与优化器，不能同样声称减少92%。

### 换到实际问题中应用

为客服模型学习特定回复风格。

1. 清洗示范对并做SFT，可用LoRA缩小可训练部分，显存紧张再评估QLoRA。
2. 验证事实正确性和通用能力，量化误差及秩选择都需实测。

应用结论：验证事实正确性和通用能力，量化误差及秩选择都需实测。

### 举一反三：改变条件后的完整解答

若秩从4改8，可训练参数多少？

<details><summary>变式的推演与答案</summary>

1. B与A各800参数。
2. 总1600，是原800的2倍，仍小于全量10000。

总1600，是原800的2倍，仍小于全量10000。

</details>

### 原有解释与进一步例题


### 原理与推演

Pretraining learns general patterns from large-scale data. Continued pretraining applies similar objectives to an existing model, often with additional domain data. SFT uses input–expected-response pairs to shape task behavior. These stages can all update parameters but differ in data format and objective. Adding documents does not always require fine-tuning: retrieval can also supply frequently updated knowledge with citations.


### 例子

例子：一个 1000×1000 的权重矩阵有一百万参数。秩 r=4 的 LoRA 增量用 1000×4 与 4×1000 两个因子，共 8000 个参数，不含其他可训练项。QLoRA 还量化冻结基座，SFT 则描述监督训练任务；三者不是同一分类维度。


### 适用边界与常见误解

A training stage and a parameter-efficient adaptation method describe different aspects.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/2106.09685)
- [一手资料](https://arxiv.org/abs/2305.14314)

[返回分层目录](00-learning-index.md)
