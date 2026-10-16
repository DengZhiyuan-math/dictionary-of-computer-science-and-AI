---
title: "BCE：同样判错，损失差多少"
aliases: []
tags: ["example","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/损失、训练与优化|损失、训练与优化]]

### 12 · BCE：同样判错，损失差多少

**场景与输入：** 真实标签 y=1；模型给正类概率 p。阈值固定为 0.5，比较 p=0.49 与 p=0.01。

1. y=1 时，BCE=-ln(p)。p=0.49 得到约 0.71335；p=0.01 得到约 4.60517。
2. 两次硬分类都为负类，但后者给真实类别的概率更低，损失约为前者的 6.46 倍。
3. 切换 y=0 时，损失改为 -ln(1-p)；同一个 0.01 此时是正确且较自信的预测。

**结果：** 损失衡量概率预测，不等于 0/1 错误数。演示概率限制在 (0,1)，端点的对数发散另行讨论。

**易错点与边界：** BCEWithLogitsLoss 输入是原始 logit；不要对它的输入再先做 Sigmoid。演示显示概率和对应 logit，计算的是等价的单样本 BCE。

**改变条件再想一想：** p=0.5 时，两个标签的损失一样吗？

<details>
<summary>查看参考答案</summary>

一样，均为 ln(2)≈0.69315。

</details>

[打开交互演示](../Demos/交互演示.html#bce)

## 关联概念与章节

- [[Concepts/二元交叉熵|二元交叉熵]]
- [[Concepts/融合 Sigmoid 的二元交叉熵|融合 Sigmoid 的二元交叉熵]]
- [[Chapters/第 41 讲 损失函数第一讲：BCE、交叉熵、MSE 为什么不同|第 41 讲]]
