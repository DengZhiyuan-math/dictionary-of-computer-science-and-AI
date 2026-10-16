---
title: "Weight decay 与学习率衰减：两个不同的旋钮"
aliases: []
tags: ["example","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/损失、训练与优化|损失、训练与优化]]

### 24 · Weight decay 与学习率衰减：两个不同的旋钮

**场景与输入：** 用简化的解耦更新 θ下一步=(1-ηλ)θ-ηg 表示参数收缩与梯度更新，取 θ=2、η=0.1、λ=0.01、g=0.4。

1. 收缩系数为 0.999，收缩后的参数为 1.998。
2. 梯度项为 0.04，更新得到 1.958；λ=0 时同一步为 1.96。
3. 若下一步把学习率降至 0.01，这是改变 η 的 schedule；λ 仍是参数收缩强度设置。

**结果：** Weight decay 是参数更新中的收缩机制；learning-rate decay 是 η 随时间的变化规则。示例两者数值作用也有关联，因为收缩含 ηλ。

**易错点与边界：** 上式的 g 是用于更新的方向；真实 AdamW 的梯度方向经过动量与二阶矩调整，不可直接等同于原始梯度。

**改变条件再想一想：** 当前 g=0 时，设置 weight decay 会不会更新参数？

<details>
<summary>查看参考答案</summary>

会，只要 ηλ 非零且该参数适用衰减，本式仍执行 θ←(1-ηλ)θ。

</details>



## 关联概念与章节

- [[Concepts/自适应矩估计／解耦权重衰减|自适应矩估计／解耦权重衰减]]
- [[Concepts/权重衰减|权重衰减]]
- [[Concepts/学习率|学习率]]
- [[Chapters/第 45 讲 优化器家族：SGD、Momentum、Adam 与 AdamW|第 45 讲]]
- [[Chapters/第 46 讲 正则化与归一化：Dropout、BatchNorm、LayerNorm、RMSNorm|第 46 讲]]
