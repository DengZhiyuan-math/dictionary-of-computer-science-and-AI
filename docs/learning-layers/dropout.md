# Dropout

概念编号：`concept:dropout` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dropout/)

## 第一层：概念入门 · 知其然

### 它是什么

Dropout训练时随机屏蔽部分数值，减少对固定通路的依赖。

### 先看一个例子

输入2，丢弃概率0.5，采用保留时放大的实现。

### 理解练习

通常推理也随机丢弃吗？

<details><summary>答案与解释</summary>

通常不，需切换eval模式。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 保留概率q=1−p，输出mx/q，其中m以概率q为1。
2. 期望E[mx/q]=x，使随机训练均值与推理尺度一致。

### 具体输入与计算步骤

输入2，丢弃概率0.5，采用保留时放大的实现。

1. 输出以各0.5概率为0或2/0.5=4。
2. 均值0.5×0+0.5×4=2；普通推理直接输出2。

计算结果：均值0.5×0+0.5×4=2；普通推理直接输出2。

### 换到实际问题中应用

小数据分类器发生过拟合。

1. 在隐藏层加入适度dropout，用验证集选择丢弃率。
2. 评估时禁用dropout，避免随机变化混入模型比较。

应用结论：评估时禁用dropout，避免随机变化混入模型比较。

### 举一反三：改变条件后的完整解答

丢弃率升为0.75，保留的2变成多少？

<details><summary>变式的推演与答案</summary>

1. q=0.25，保留值2/0.25=8。
2. 均值仍0.25×8=2，但方差增加，不保证泛化更好。

均值仍0.25×8=2，但方差增加，不保证泛化更好。

</details>

### 原有解释与进一步例题


### 原理与推演

Dropout randomly masks activations during training to reduce reliance on particular information pathways. Inference normally disables this masking, with scaling handled according to the implementation. Dropout does not permanently delete neurons after training. Drop path and stochastic depth randomly skip paths or residual branches in suitable architectures, providing more structured stochastic regularization. Their benefit depends on the architecture and data; adding more does not always help.


### 例子

例子：训练时保留概率为 0.5，输入激活为 4，采用 inverted dropout 后输出以各半概率为 0 或 8，期望仍为 4。推理时通常直接使用 4。一次被保留的输出翻倍，不代表模型在推理时还应再乘一次 0.5。


### 适用边界与常见误解

Standard inference does not permanently delete neurons.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html)

[返回分层目录](00-learning-index.md)
