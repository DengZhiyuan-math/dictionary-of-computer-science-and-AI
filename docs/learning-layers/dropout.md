# Dropout

概念编号：`concept:dropout` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dropout/)

## 第一层：概念入门 · 知其然

### 它是什么

Dropout randomly masks activations during training to reduce reliance on particular information pathways. Inference normally disables this masking, with scaling handled according to the implementation. Dropout does not permanently delete neurons after training. Drop path and stochastic depth randomly skip paths or residual branches in suitable architectures, providing more structured stochastic regularization. Their benefit depends on the architecture and data; adding more does not always help.

### 先看一个例子

例子：训练时保留概率为 0.5，输入激活为 4，采用 inverted dropout 后输出以各半概率为 0 或 8，期望仍为 4。推理时通常直接使用 4。一次被保留的输出翻倍，不代表模型在推理时还应再乘一次 0.5。

### 理解练习

用自己的话解释：上面的情景为什么是“Dropout”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Dropout randomly masks activations during training to reduce reliance on particular information pathways. Inference normally disables this masking, with scaling handled according to the implementation. Dropout does not permanently delete neurons after training. Drop path and stochastic depth randomly skip paths or residual branches in suitable architectures, providing more structured stochastic regularization. Their benefit depends on the architecture and data; adding more does not always help.

情景依据：例子：训练时保留概率为 0.5，输入激活为 4，采用 inverted dropout 后输出以各半概率为 0 或 8，期望仍为 4。推理时通常直接使用 4。一次被保留的输出翻倍，不代表模型在推理时还应再乘一次 0.5。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Dropout randomly masks activations during training to reduce reliance on particular information pathways. Inference normally disables this masking, with scaling handled according to the implementation. Dropout does not permanently delete neurons after training. Drop path and stochastic depth randomly skip paths or residual branches in suitable architectures, providing more structured stochastic regularization. Their benefit depends on the architecture and data; adding more does not always help.


### 例子

例子：训练时保留概率为 0.5，输入激活为 4，采用 inverted dropout 后输出以各半概率为 0 或 8，期望仍为 4。推理时通常直接使用 4。一次被保留的输出翻倍，不代表模型在推理时还应再乘一次 0.5。


### 适用边界与常见误解

Standard inference does not permanently delete neurons.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
