---
title: "Dropout：缩放守住期望，评估切换行为"
aliases: []
tags: ["interview","area/practice"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/口述、复习与表达|口述、复习与表达]]

## 31 · Dropout：缩放守住期望，评估切换行为

**机器学习与 AI · 官方文档派生自测**

**来源：** [PyTorch 2.14：Dropout](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Dropout.html)，PyTorch，核对 2026-10-16。支持训练时随机屏蔽及保留值缩放、评估时恒等映射；具体掩码为人工示例。

### 问题

训练时丢弃概率p=0.5，对激活2应用inverted dropout；输出可能是什么？评估时呢？

### 答题思路

1. 训练时以概率p置0，保留值除以1-p。
2. 激活2因此有一半为0、一半为4，期望仍2。
3. 评估模式Dropout变为恒等；eval改变模块行为，no_grad改变梯度记录，职责不同。

### 手算例子

输入：激活[2,2]；人工选保留掩码[1,0]；p=0.5

1. 保留第一个并缩放为2/0.5=4。
2. 第二个屏蔽为0；评估模式两个都输出2。

结果：训练该次[4,0]；评估[2,2]

### 追问与答案

推理加no_grad就自动关闭Dropout吗？

<details>
<summary>查看参考答案</summary>

不会；通常还要model.eval()。关闭梯度记录不会把模块的training标志改为False。

</details>

**易错点：** 忘记保留值缩放；把train/eval与是否构建计算图混成同一开关。

## 关联概念与章节

- [[Concepts/随机屏蔽激活|随机屏蔽激活]]
- [[Concepts/训练模式／评估模式／关闭梯度记录|训练模式／评估模式／关闭梯度记录]]
- [[Chapters/第 106 讲 来源面试题：官方样题、算法练习与技术追问|第 106 讲]]
- [[Chapters/第 46 讲 正则化与归一化：Dropout、BatchNorm、LayerNorm、RMSNorm|第 46 讲]]
