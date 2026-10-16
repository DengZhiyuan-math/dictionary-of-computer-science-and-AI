---
title: "BCE输入审计：先检查logit与shape"
aliases: []
tags: ["interview","area/practice"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/口述、复习与表达|口述、复习与表达]]

## 28 · BCE输入审计：先检查logit与shape

**机器学习与 AI · 官方文档派生自测**

**来源：** [PyTorch 2.14：BCEWithLogitsLoss](https://docs.pytorch.org/docs/2.14/generated/torch.nn.BCEWithLogitsLoss.html)，PyTorch，核对 2026-10-16。支持原始 logits 输入、稳定融合计算和逐标签二元损失；题目数字独立计算。

### 问题

二元标签y=1，模型输出logit z=0。说明BCEWithLogitsLoss接收什么、损失多少、为何不应先Sigmoid。

### 答题思路

1. 输入是未做Sigmoid的原始分数，目标形状须与输入匹配。
2. z=0对应概率0.5，损失-log(0.5)=ln2。
3. 融合计算改善数值稳定性；外部再做Sigmoid会把概率误当logit，改变优化目标。

### 手算例子

输入：z=[0]；y=[1]；均无权重

1. Sigmoid(0)=0.5。
2. L=-ln(0.5)≈0.6931；对z梯度为0.5-1=-0.5。

结果：loss≈0.6931，梯度-0.5

### 追问与答案

多标签任务能用它吗？

<details>
<summary>查看参考答案</summary>

能，对每个标签做独立二元目标；互斥类别的归一化竞争则通常使用多类别交叉熵。

</details>

**易错点：** 损失前重复Sigmoid；把[B]与[B,1]当成可无条件混用；不核对目标dtype和shape。

## 关联概念与章节

- [[Concepts/融合 Sigmoid 的二元交叉熵|融合 Sigmoid 的二元交叉熵]]
- [[Concepts/概率变换前的分数|概率变换前的分数]]
- [[Concepts/张量／形状／轴|张量／形状／轴]]
- [[Chapters/第 106 讲 来源面试题：官方样题、算法练习与技术追问|第 106 讲]]
- [[Chapters/第 22 讲 训练词汇起点：样本、张量、标签、Logit 与概率|第 22 讲]]
- [[Chapters/第 41 讲 损失函数第一讲：BCE、交叉熵、MSE 为什么不同|第 41 讲]]
