# DPO / GRPO

概念编号：`concept:dpo-grpo` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dpo-grpo/)

## 第一层：概念入门 · 知其然

### 定义

DPO 和 GRPO 都用于依据评价信号调整生成模型，但训练数据与比较方式不同。DPO 使用同一输入下更受偏好与较不受偏好的回答对，通过与固定参考模型比较的相对概率训练，通常无需在更新时在线采样奖励。GRPO 为同一输入采样一组回答，用组内奖励比较形成相对优势，再调整生成这些回答的概率。策略在这里指给定上下文时生成内容的概率规则。

### 概念边界与常见混淆

偏好和奖励只是训练目标的代理，可能错标或遗漏正确性。组内奖励全相同时，相对比较缺少区分信号；不能因此证明所有回答都正确。具体归一化、参考约束和裁剪规则应按实现说明。

### 先看一个例子

同一道题有回答 A、B。离线标注者认为 A 优于 B，可作为 DPO 的偏好对。若当前模型另外生成四个答案，验证器给分 [0,1,1,0]，GRPO 会利用这组相对好坏来构造更新信号。分数都来自同一道题，避免把困难题的低原始分直接与容易题的高分混为同一种优势。

### 理解练习

#### 1. 数据要求

只有一批固定偏好对，没有在线奖励采样，是否仍可训练 DPO？

<details><summary>答案与解释</summary>

可以，这是它常见的使用方式；仍需要模型概率与参考比较，而非把偏好文字直接当普通正确答案。

</details>

#### 2. 组内相同

四个回答都得 0，归一化后没有差异，能否说模型已收敛到正确答案？

<details><summary>答案与解释</summary>

不能。可能全部错误，也可能奖励器失效。没有区分信号与目标已达成不同。

</details>

#### 3. 评价可靠性

奖励器喜欢长回答，优化后回答变长，能直接说明推理更准确吗？

<details><summary>答案与解释</summary>

不能。模型可能优化代理偏好而非正确性，需要独立检查任务质量与奖励设计。

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
