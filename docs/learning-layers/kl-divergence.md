# KL Divergence

概念编号：`concept:kl-divergence` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kl-divergence/)

## 第一层：概念入门 · 知其然

### 它是什么

KL divergence measures a discrepancy between probability distributions. It can train a student model to match a teacher’s distribution or constrain a new policy from moving too far from a reference policy. KL divergence is generally asymmetric, so the direction of comparison matters. It is not a geometric distance or a direct measure of semantic similarity between answers. Cross-entropy, KL divergence and entropy are related, but explain which distributions are being compared rather than treating them as interchangeable losses.

### 先看一个例子

例子：P=(0.5,0.5)，Q=(0.25,0.75)，KL(P∥Q)=0.5log(2)+0.5log(2/3)≈0.1438。交换 P、Q 得约 0.1308，因此 KL 不对称。若 P 在某处有正概率而 Q 为零，该方向的 KL 可以无穷大。

### 理解练习

用自己的话解释：上面的情景为什么是“KL Divergence”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：KL divergence measures a discrepancy between probability distributions. It can train a student model to match a teacher’s distribution or constrain a new policy from moving too far from a reference policy. KL divergence is generally asymmetric, so the direction of comparison matters. It is not a geometric distance or a direct measure of semantic similarity between answers. Cross-entropy, KL divergence and entropy are related, but explain which distributions are being compared rather than treating them as interchangeable losses.

情景依据：例子：P=(0.5,0.5)，Q=(0.25,0.75)，KL(P∥Q)=0.5log(2)+0.5log(2/3)≈0.1438。交换 P、Q 得约 0.1308，因此 KL 不对称。若 P 在某处有正概率而 Q 为零，该方向的 KL 可以无穷大。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

KL divergence measures a discrepancy between probability distributions. It can train a student model to match a teacher’s distribution or constrain a new policy from moving too far from a reference policy. KL divergence is generally asymmetric, so the direction of comparison matters. It is not a geometric distance or a direct measure of semantic similarity between answers. Cross-entropy, KL divergence and entropy are related, but explain which distributions are being compared rather than treating them as interchangeable losses.


### 例子

例子：P=(0.5,0.5)，Q=(0.25,0.75)，KL(P∥Q)=0.5log(2)+0.5log(2/3)≈0.1438。交换 P、Q 得约 0.1308，因此 KL 不对称。若 P 在某处有正概率而 Q 为零，该方向的 KL 可以无穷大。


### 适用边界与常见误解

KL divergence is not a symmetric distance, and input conventions depend on the implementation.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
