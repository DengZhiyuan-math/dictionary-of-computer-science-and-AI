# BCE — Binary Cross-Entropy

概念编号：`concept:bce` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bce/)

## 第一层：概念入门 · 知其然

### 它是什么

二元交叉熵衡量一个概率对“是或否”标签的匹配程度，越自信地猜错惩罚越大。

### 先看一个例子

真实标签为1，预测概率0.8。

### 理解练习

概率从0.8提高到0.9，损失变大吗？

<details><summary>答案与解释</summary>

变小，因为真实事件得到更大概率。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 伯努利似然为pʸ(1−p)¹⁻ʸ，最大化似然等价于最小化负对数。
2. 因此 L=−y ln p−(1−y)ln(1−p)，输入必须是有效概率。

### 具体输入与计算步骤

真实标签为1，预测概率0.8。

1. 代入y=1，L=−ln0.8≈0.2231。
2. 若y=0而p仍0.8，则L=−ln0.2≈1.6094。

计算结果：若y=0而p仍0.8，则L=−ln0.2≈1.6094。

### 换到实际问题中应用

训练独立判断“猫”和“狗”是否出现的图像标签。

1. 每个标签输出独立概率，分别计算BCE后按声明的轴求平均。
2. 猫狗可同时为真，不能用互斥类别概率总和为1的假设。

应用结论：猫狗可同时为真，不能用互斥类别概率总和为1的假设。

### 举一反三：改变条件后的完整解答

两样本概率0.8、0.2，标签都为1，平均损失多少？

<details><summary>变式的推演与答案</summary>

1. 分别为−ln0.8≈0.2231、−ln0.2≈1.6094。
2. 平均(0.2231+1.6094)/2≈0.9163，先平均概率再取对数不等价。

平均(0.2231+1.6094)/2≈0.9163，先平均概率再取对数不等价。

</details>

### 原有解释与进一步例题


### 原理与推演

BCE is commonly used for binary classification and for each label in multilabel learning. It compares predicted probabilities with target labels, rather than merely counting correct class decisions. Think of it as scoring probability predictions: the less probability assigned to the true answer, the greater the penalty.

Consider an email that is actually spam. Model A assigns a 49% probability of spam; model B assigns only 1%. With a 50% classification threshold, both are wrong, so accuracy cannot distinguish these errors. But model B almost rules out the true answer and is more confidently wrong, so BCE penalizes it more. Probability prediction quality and the final hard classification are different things.

In multilabel image recognition, the model can separately predict whether an image contains a cat, a dog or a car, then combine the BCE losses for those labels. Separate loss terms do not imply that the labels are independent in the real world; a shared network can still use their correlations. If exactly one of cat, dog or bird must be chosen, model the classes as mutually exclusive instead.


### 适用边界与常见误解

Used for binary classification and per-label multilabel tasks; it measures more than thresholded correctness.

### 例题：BCE: Same Classification Error, Different Loss

The true label is y=1 and the model assigns positive-class probability p. At a fixed threshold of 0.5, compare p=0.49 with p=0.01.

1. For y=1, BCE=-ln(p). p=0.49 gives about 0.71335; p=0.01 gives about 4.60517.
2. Both hard predictions are negative, but the latter assigns less probability to the true class and incurs about 6.46 times the loss.
3. For y=0, loss becomes -ln(1-p). The same probability 0.01 is now a correct, confident prediction.

结果：Loss scores probability predictions, not the number of 0/1 errors. The demo restricts probabilities to (0,1); logarithmic divergence at the endpoints is separate.

易错点：BCEWithLogitsLoss accepts raw logits: do not apply Sigmoid first. The demo displays probability and its corresponding logit, and computes the equivalent single-sample BCE.

变式：At p=0.5, do both labels give the same loss?

参考答案：Yes: both give ln(2)≈0.69315.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.BCELoss.html)

[返回分层目录](00-learning-index.md)
