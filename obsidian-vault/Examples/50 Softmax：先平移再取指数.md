---
title: "Softmax：先平移再取指数"
aliases: []
tags: ["example","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/损失、训练与优化|损失、训练与优化]]

### 50 · Softmax：先平移再取指数

**场景与输入：** 三个 logits 为 [1000,1001,999]，真实类别是第二类，计算概率与多类交叉熵。

1. 直接取指数容易溢出。先减去最大值 1001，得到 [-1,0,-2]，Softmax 结果不变。
2. 指数约为 [.367879,1,.135335]，归一化后概率约 [.244728,.665241,.090031]。
3. 真实类别交叉熵为 -ln(.665241)≈.407606；一次加常数不改变相对分数，因此也不改变这些概率。

**结果：** 稳定计算依赖代数等价变形，而不是任意截断 logits；训练代码通常使用接收原始分数的交叉熵接口。

**易错点与边界：** 不要对 CrossEntropyLoss 先做 Softmax 再当作 logits 输入；也不要把推理阈值混进损失公式。

**改变条件再想一想：** 全部 logits 再加 500，结果会变吗？

<details>
<summary>查看参考答案</summary>

数学上不变；稳定实现仍先减最大值，避免中间值无必要地变大。

</details>



## 关联概念与章节

- [[Concepts/类别概率归一化|类别概率归一化]]
- [[Concepts/交叉熵／负对数似然|交叉熵／负对数似然]]
- [[Chapters/第 41 讲 损失函数第一讲：BCE、交叉熵、MSE 为什么不同|第 41 讲]]
- [[Chapters/第 53 讲 Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE|第 53 讲]]
