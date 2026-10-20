# DPO / GRPO

概念编号：`concept:dpo-grpo` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dpo-grpo/)

## 第一层：概念入门 · 知其然

### 它是什么

DPO用偏好对调整回答相对概率；GRPO用同题一组回答的相对奖励更新策略。

### 先看一个例子

一组奖励为1与3，组均值2。

### 理解练习

奖励更高一定代表回答质量更好吗？

<details><summary>答案与解释</summary>

不一定，奖励可能有漏洞，需独立质量评估。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. DPO把相对参考模型的对数概率差代入偏好分类似然。
2. GRPO常把组奖励中心化、标准化成优势，再执行带约束的策略更新。

### 具体输入与计算步骤

一组奖励为1与3，组均值2。

1. 使用总体标准差，σ=√((1²+1²)/2)=1。
2. 忽略稳定项，优势分别(1−2)/1=−1、(3−2)/1=1；实现需核对标准差约定。

计算结果：忽略稳定项，优势分别(1−2)/1=−1、(3−2)/1=1；实现需核对标准差约定。

### 换到实际问题中应用

提升数学回答偏好。

1. 有成对人工偏好则构造DPO对；有可靠验证器可采样多答案做组奖励。
2. 保留参考约束，并用未参与奖励设计的题目核查正确性。

应用结论：保留参考约束，并用未参与奖励设计的题目核查正确性。

### 举一反三：改变条件后的完整解答

若组内奖励全为2呢？

<details><summary>变式的推演与答案</summary>

1. 均值2、标准差0，直接标准化会除0。
2. 用稳定项后优势均为0，这组不提供区分优劣的奖励信号。

用稳定项后优势均为0，这组不提供区分优劣的奖励信号。

</details>

### 原有解释与进一步例题


### 原理与推演

DPO directly optimizes relative response preferences from preference data. Its classic form uses a reference model, without first fitting a separate reward network and then running online policy optimization. IPO, KTO and ORPO are other preference optimization approaches, differing in objectives, feedback formats or dependence on reference models. You need not memorize every objective here. These are methods for training existing models from preferences, rather than new Transformer architectures. Choose according to the available data.


### 例子

例子：同一提示有一个偏好回答和一个被拒绝回答，DPO 使用两者相对参考模型的对数概率差。若该差为 2、β=0.1，则损失 −log(sigmoid(0.2))≈0.598。GRPO 则可对同一提示采样一组回答并按组内奖励构造优势，不是同一个训练目标。


### 适用边界与常见误解

Their feedback formats and sampling/training procedures differ.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/2305.18290)
- [一手资料](https://arxiv.org/abs/2402.03300)

[返回分层目录](00-learning-index.md)
