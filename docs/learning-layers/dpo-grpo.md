# DPO / GRPO

概念编号：`concept:dpo-grpo` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dpo-grpo/)

## 第一层：概念入门 · 知其然

### 它是什么

DPO directly optimizes relative response preferences from preference data. Its classic form uses a reference model, without first fitting a separate reward network and then running online policy optimization. IPO, KTO and ORPO are other preference optimization approaches, differing in objectives, feedback formats or dependence on reference models. You need not memorize every objective here. These are methods for training existing models from preferences, rather than new Transformer architectures. Choose according to the available data.

### 先看一个例子

例子：同一提示有一个偏好回答和一个被拒绝回答，DPO 使用两者相对参考模型的对数概率差。若该差为 2、β=0.1，则损失 −log(sigmoid(0.2))≈0.598。GRPO 则可对同一提示采样一组回答并按组内奖励构造优势，不是同一个训练目标。

### 理解练习

用自己的话解释：上面的情景为什么是“DPO / GRPO”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：DPO directly optimizes relative response preferences from preference data. Its classic form uses a reference model, without first fitting a separate reward network and then running online policy optimization. IPO, KTO and ORPO are other preference optimization approaches, differing in objectives, feedback formats or dependence on reference models. You need not memorize every objective here. These are methods for training existing models from preferences, rather than new Transformer architectures. Choose according to the available data.

情景依据：例子：同一提示有一个偏好回答和一个被拒绝回答，DPO 使用两者相对参考模型的对数概率差。若该差为 2、β=0.1，则损失 −log(sigmoid(0.2))≈0.598。GRPO 则可对同一提示采样一组回答并按组内奖励构造优势，不是同一个训练目标。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

DPO directly optimizes relative response preferences from preference data. Its classic form uses a reference model, without first fitting a separate reward network and then running online policy optimization. IPO, KTO and ORPO are other preference optimization approaches, differing in objectives, feedback formats or dependence on reference models. You need not memorize every objective here. These are methods for training existing models from preferences, rather than new Transformer architectures. Choose according to the available data.


### 例子

例子：同一提示有一个偏好回答和一个被拒绝回答，DPO 使用两者相对参考模型的对数概率差。若该差为 2、β=0.1，则损失 −log(sigmoid(0.2))≈0.598。GRPO 则可对同一提示采样一组回答并按组内奖励构造优势，不是同一个训练目标。


### 适用边界与常见误解

Their feedback formats and sampling/training procedures differ.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
