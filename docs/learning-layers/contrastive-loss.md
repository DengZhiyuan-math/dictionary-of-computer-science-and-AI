# Contrastive Loss

概念编号：`concept:contrastive-loss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/contrastive-loss/)

## 第一层：概念入门 · 知其然

### 它是什么

Metric learning studies similarity in a representation space. Contrastive loss brings related representations closer while separating unrelated ones. Triplet loss uses an anchor, a positive sample and a negative sample, aiming to place the positive closer to the anchor than the negative. InfoNCE often frames learning as finding the correct match among a batch of candidates. These ideas support image–text alignment, semantic retrieval and face verification. Negative samples may actually be related to the anchor; such false negatives create misleading training pressure.

### 先看一个例子

例子：同一图片的两种增强是正对，另一图片为负对。若使用 triplet 形式 max(0,d(a,p)−d(a,n)+m)，距离分别为 0.2、0.5，间隔 m=0.4，则损失为 0.1。这里 d 是规定的距离，减小正对距离或增加负对距离都可能降低损失。

### 理解练习

用自己的话解释：上面的情景为什么是“Contrastive Loss”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Metric learning studies similarity in a representation space. Contrastive loss brings related representations closer while separating unrelated ones. Triplet loss uses an anchor, a positive sample and a negative sample, aiming to place the positive closer to the anchor than the negative. InfoNCE often frames learning as finding the correct match among a batch of candidates. These ideas support image–text alignment, semantic retrieval and face verification. Negative samples may actually be related to the anchor; such false negatives create misleading training pressure.

情景依据：例子：同一图片的两种增强是正对，另一图片为负对。若使用 triplet 形式 max(0,d(a,p)−d(a,n)+m)，距离分别为 0.2、0.5，间隔 m=0.4，则损失为 0.1。这里 d 是规定的距离，减小正对距离或增加负对距离都可能降低损失。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Metric learning studies similarity in a representation space. Contrastive loss brings related representations closer while separating unrelated ones. Triplet loss uses an anchor, a positive sample and a negative sample, aiming to place the positive closer to the anchor than the negative. InfoNCE often frames learning as finding the correct match among a batch of candidates. These ideas support image–text alignment, semantic retrieval and face verification. Negative samples may actually be related to the anchor; such false negatives create misleading training pressure.


### 例子

例子：同一图片的两种增强是正对，另一图片为负对。若使用 triplet 形式 max(0,d(a,p)−d(a,n)+m)，距离分别为 0.2、0.5，间隔 m=0.4，则损失为 0.1。这里 d 是规定的距离，减小正对距离或增加负对距离都可能降低损失。


### 适用边界与常见误解

The definition of positive and negative pairs is itself a key assumption.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
