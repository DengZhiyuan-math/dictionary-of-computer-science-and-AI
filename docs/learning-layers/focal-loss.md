# Focal Loss

概念编号：`concept:focal-loss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/focal-loss/)

## 第一层：概念入门 · 知其然

### 定义

Focal Loss 在交叉熵上乘以根据当前预测难度变化的因子，降低已经容易正确分类样本的贡献。以二分类为例，令 p_t 为模型给真实类别的概率，常见形式是 −(1−p_t)^γ ln(p_t)，γ 为非负聚焦参数；还可以另加类别权重。γ=0 时恢复普通交叉熵，γ 越大，对高 p_t 样本的抑制越明显。

### 概念边界与常见混淆

“难”由当前模型概率定义，不等于该样本更重要或标签更可靠。错标样本也可能持续难分类，因此聚焦难例可能放大标签噪声。聚焦参数与类别权重是两种不同控制。

### 先看一个例子

γ=2 时，真实类别概率 0.9 的因子是 0.01，概率 0.2 的因子是 0.64；相应损失约为 0.00105 与 1.030。难样本仍贡献较多，不是把易样本从数据里删除。这个设计常用于大量容易背景样本主导训练的场景，但是否改善效果仍需验证。

### 理解练习

#### 1. 退化情形

γ=0 时还会特别抑制易样本吗？

<details><summary>答案与解释</summary>

不会，因子为 1，恢复交叉熵；若另有类别权重，则仍保留该权重。

</details>

#### 2. 真实类别概率

标签为 0、模型报正类概率 0.9，p_t 应取 0.9 还是 0.1？

<details><summary>答案与解释</summary>

取 0.1，因为真实类别是负类。这是难错分，不能把高正类概率误解成容易正确。

</details>

#### 3. 标签噪声

损失持续关注一个难例，就说明它比其他样本更有学习价值吗？

<details><summary>答案与解释</summary>

不说明。可能标签错误或输入不包含足够信息，需检查数据，而不是无限提高其影响。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 原交叉熵为−lnpₜ，乘调制因子(1−pₜ)ᵞ。
2. pₜ接近1时因子很小，γ=0时退化为普通交叉熵。

### 具体输入与计算步骤

真实类别概率pₜ=0.9，γ=2，忽略类别权重。

1. 因子(1−0.9)²=0.01。
2. 损失−0.01ln0.9≈0.001054，低于交叉熵0.10536。

计算结果：损失−0.01ln0.9≈0.001054，低于交叉熵0.10536。

### 换到实际问题中应用

目标检测中背景样本远多于目标。

1. 在分类分支引入focal调制，明确γ和类别权重。
2. 比较目标召回与误报，而非只看变小的损失数值。

应用结论：比较目标召回与误报，而非只看变小的损失数值。

### 举一反三：改变条件后的完整解答

若pₜ降到0.1，γ仍2呢？

<details><summary>变式的推演与答案</summary>

1. 因子0.9²=0.81。
2. 损失−0.81ln0.1≈1.8651，困难样本保留较大惩罚。

损失−0.81ln0.1≈1.8651，困难样本保留较大惩罚。

</details>

### 原有解释与进一步例题


### 原理与推演

Focal loss reduces the relative loss contribution of easy, correctly classified samples so that training focuses more on difficult ones. This is useful in object detection, where easy background locations can greatly outnumber objects. Rather than assigning a fixed minority-class weight, it adjusts a sample’s contribution according to the model’s current prediction. Difficult samples may also be mislabeled, so focal loss is not a universal remedy for class imbalance. Assess it alongside label quality, sampling and evaluation metrics.


### 例子

例子：二元正标签的预测正确类概率为 p_t=0.9，γ=2，忽略 α 时 focal loss=−(1−0.9)²log(0.9)≈0.00105；普通交叉熵约为 0.105。调制项降低容易样本权重，γ 是聚焦强度，不能保证提高所有任务的准确率。


### 适用边界与常见误解

Difficult examples may be mislabeled. Emphasizing them does not guarantee better performance.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/1708.02002)

[返回分层目录](00-learning-index.md)
