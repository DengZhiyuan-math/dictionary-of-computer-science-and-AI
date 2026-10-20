# Sigmoid

概念编号：`concept:sigmoid` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sigmoid/)

## 第一层：概念入门 · 知其然

### 它是什么

Sigmoid把任意实数压到0与1之间，常将二分类分数解释为概率。

### 先看一个例子

输入z=ln3。

### 理解练习

sigmoid(0)是0吗？

<details><summary>答案与解释</summary>

不是，是0.5。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. σ(z)=1/(1+exp(−z))，正分数越大越接近1。
2. 导数σ(z)(1−σ(z))，两端饱和时很小。

### 具体输入与计算步骤

输入z=ln3。

1. exp(−ln3)=1/3，因此σ=1/(1+1/3)=0.75。
2. 导数0.75×0.25=0.1875。

计算结果：导数0.75×0.25=0.1875。

### 换到实际问题中应用

为二分类推理输出概率。

1. 从模型取得分数，用稳定sigmoid转换，再用预先验证的阈值分类。
2. 训练若用BCEWithLogitsLoss则直接传分数，避免重复sigmoid。

应用结论：训练若用BCEWithLogitsLoss则直接传分数，避免重复sigmoid。

### 举一反三：改变条件后的完整解答

输入改为−ln3会怎样？

<details><summary>变式的推演与答案</summary>

1. exp(ln3)=3，概率1/(1+3)=0.25。
2. σ(−z)=1−σ(z)，导数仍0.1875。

σ(−z)=1−σ(z)，导数仍0.1875。

</details>

### 原有解释与进一步例题


### Definition

The sigmoid is a scalar function mapping any finite real score to a value strictly between zero and one. It is often used for binary labels or independently modeled multiple labels.


### Parameters and mechanism

σ(z)=1/(1+exp(-z)), with derivative σ(z)(1-σ(z)). z is a raw score. Large positive or negative scores saturate the output near an endpoint; the transformation alone does not ensure well-calibrated probabilities.


### Example

At z=0, the output is 0.5. At z=log(3), it is 0.75. Applying sigmoid separately to two scores does not require their outputs to sum to one.


### 适用边界与常见误解

Do not usually apply sigmoid before BCEWithLogitsLoss.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/nn.html)

[返回分层目录](00-learning-index.md)
