---
title: "注意力mask：先归一化还是先屏蔽"
aliases: []
tags: ["interview","area/practice"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/口述、复习与表达|口述、复习与表达]]

## 32 · 注意力mask：先归一化还是先屏蔽

**机器学习与 AI · 官方文档派生自测**

**来源：** [PyTorch 2.14：Scaled dot product attention](https://docs.pytorch.org/docs/2.14/generated/torch.nn.functional.scaled_dot_product_attention.html)，PyTorch，核对 2026-10-16。支持缩放点积、mask 与布尔 mask True 表示可参与注意力的接口含义。不能混同所有注意力 API 的 mask 约定。

### 问题

一个query对三个key的缩放后分数均为0；第三个key不可见。计算权重并说明布尔mask约定。

### 答题思路

1. 不可见位置在Softmax前置负无穷，剩余可见项重新归一化。
2. 权重为[0.5,0.5,0]，不能先得均匀权重再简单置零。
3. PyTorch functional SDPA布尔mask中True表示可参与；其他API可能反向，必须查具体接口；至少保留一个可见key。

### 手算例子

输入：scores=[0,0,0]；可见=[true,true,false]；V=[2,6,100]

1. mask后分数[0,0,-∞]，Softmax为[0.5,0.5,0]。
2. 输出0.5×2+0.5×6=4。

结果：4

### 追问与答案

先Softmax再乘mask为什么不同？

<details>
<summary>查看参考答案</summary>

得到[1/3,1/3,0]，和为2/3，输出8/3；若不再次归一化则不等价。

</details>

**易错点：** 混用mask的True含义；把全被屏蔽行的数值行为当作所有实现都一致。

## 关联概念与章节

- [[Concepts/注意力／Transformer 架构|注意力／Transformer 架构]]
- [[Concepts/类别概率归一化|类别概率归一化]]
- [[Chapters/第 106 讲 来源面试题：官方样题、算法练习与技术追问|第 106 讲]]
- [[Chapters/第 53 讲 Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE|第 53 讲]]
