# Contrastive Loss

概念编号：`concept:contrastive-loss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/contrastive-loss/)

## 第一层：概念入门 · 知其然

### 定义

对比损失通过比较匹配与不匹配样本的表示，训练模型保留某种任务相关的相似关系。表示是模型产生的向量；正对是按规则应相似的一对，负对是需要区分的一对。不同损失可以直接限制距离，也可以让正对在一组候选中得到更高相对概率。正负关系来自数据和任务定义，不是向量本身天然携带的真理。

### 概念边界与常见混淆

负样本可能误包含实际同类对象，称为假负例；提高区分程度不一定提高真实任务效果。对比学习也不能仅凭训练损失低证明表示已覆盖所有下游需求。

### 先看一个例子

学习商品图片表示时，同一件商品的两种拍摄角度可作正对，不同商品可作负对。模型训练后希望同一商品角度变化不影响检索。但若把“颜色变化”也当作应忽略的增强，而业务需要区分红款与蓝款，就可能主动删除了业务需要的信息。

### 理解练习

#### 1. 谁定义相似

同一商品不同角度应相似，是否意味着不同颜色也必须相似？

<details><summary>答案与解释</summary>

不意味着。是否保留颜色取决于检索目标，应在正对和增强设计中明确。

</details>

#### 2. 假负例

另一用户上传了同一商品，却被当负样本，会产生什么训练压力？

<details><summary>答案与解释</summary>

损失会要求把本应匹配的表示拉开，和任务目标冲突；应检查采样和标签定义。

</details>

#### 3. 相对比较

负样本都极易区分，训练分数好能保证区分相近商品吗？

<details><summary>答案与解释</summary>

不能。训练比较可能未包含实际难点，需要在包含近似商品且独立的检索数据上评估。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. InfoNCE正样本概率为exp(s正/τ)/Σexp(s候选/τ)。
2. 最小化负对数使正样本相对候选负样本更占优势。

### 具体输入与计算步骤

正样本分数ln3，负样本0，温度1。

1. 指数为3与1，正样本概率3/4=0.75。
2. 损失−ln0.75≈0.2877。

计算结果：损失−ln0.75≈0.2877。

### 换到实际问题中应用

学习图文共同检索空间。

1. 配对图文为正对，其他文本为负候选，核查重复语义造成的假负对。
2. 训练后以保留查询评估检索召回，而非只看训练损失。

应用结论：训练后以保留查询评估检索召回，而非只看训练损失。

### 举一反三：改变条件后的完整解答

再加入一个分数0的负样本呢？

<details><summary>变式的推演与答案</summary>

1. 正样本概率变3/(3+1+1)=0.6。
2. 损失升为−ln0.6≈0.5108，候选竞争更强。

损失升为−ln0.6≈0.5108，候选竞争更强。

</details>

### 原有解释与进一步例题


### 原理与推演

Metric learning studies similarity in a representation space. Contrastive loss brings related representations closer while separating unrelated ones. Triplet loss uses an anchor, a positive sample and a negative sample, aiming to place the positive closer to the anchor than the negative. InfoNCE often frames learning as finding the correct match among a batch of candidates. These ideas support image–text alignment, semantic retrieval and face verification. Negative samples may actually be related to the anchor; such false negatives create misleading training pressure.


### 例子

例子：同一图片的两种增强是正对，另一图片为负对。若使用 triplet 形式 max(0,d(a,p)−d(a,n)+m)，距离分别为 0.2、0.5，间隔 m=0.4，则损失为 0.1。这里 d 是规定的距离，减小正对距离或增加负对距离都可能降低损失。


### 适用边界与常见误解

The definition of positive and negative pairs is itself a key assumption.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/2002.05709)

[返回分层目录](00-learning-index.md)
