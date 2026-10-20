# Cross-Entropy / NLL

概念编号：`concept:cross-entropy-nll` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cross-entropy-nll/)

## 第一层：概念入门 · 知其然

### 定义

互斥多分类中，模型为每个类别给出概率，总和为 1；真实类别的负对数概率称为负对数似然（NLL）。标签是单一类别时，交叉熵损失数值就是该 NLL。常见软件接口的区别在输入约定：CrossEntropyLoss 接收未经概率转换的分数，内部稳定地计算对数概率；NLLLoss 接收已经计算好的对数概率，不能把普通概率直接当作对数概率传入。

### 概念边界与常见混淆

分类标签若是软分布，交叉熵是按目标分布对各类负对数概率加权，而非只取一个类别。互不排斥的多标签也不能直接套用单一互斥类别模型。

### 先看一个例子

三类预测概率为 [0.1,0.7,0.2]，真实类别是第二类，损失为 −ln(0.7)≈0.357。若把概率 0.7 直接当“对数概率”送给 NLL 接口，会得到 −0.7，而不是正确的 0.357；负值暴露了输入语义错误。

### 理解练习

#### 1. 正确输入

NLLLoss 需要概率还是对数概率？

<details><summary>答案与解释</summary>

需要对数概率，应由稳定的对数概率转换得到；仅保证输入和为 1 不符合接口约定。

</details>

#### 2. 类别顺序

标签编码把第二类记为整数 1，能把它误当成第一类吗？

<details><summary>答案与解释</summary>

不能。类别编号与概率列的映射必须一致；数组从零编号是实现约定，不是类别含义。

</details>

#### 3. 损失与准确率

真实类别概率从 0.7 降到 0.6，仍最高，准确率和损失分别怎样？

<details><summary>答案与解释</summary>

分类对错不变，损失从约 0.357 增至 0.511。概率损失能区分准确率未反映的变化。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 独热目标下−Σyᵢlnpᵢ只保留真实类别项。
2. 于是损失为−lnp真实，等价于log-softmax后接NLL。

### 具体输入与计算步骤

三类概率[0.2,0.5,0.3]，真实类别为第二类。

1. 真实概率0.5，损失−ln0.5≈0.6931。
2. 若概率降到0.1，损失升到−ln0.1≈2.3026。

计算结果：若概率降到0.1，损失升到−ln0.1≈2.3026。

### 换到实际问题中应用

训练10类手写数字识别。

1. 输出(B,10)分数与(B,)整数类别标签，直接计算交叉熵。
2. 预测用argmax，再另外统计准确率，不把损失当准确率。

应用结论：预测用argmax，再另外统计准确率，不把损失当准确率。

### 举一反三：改变条件后的完整解答

两个样本真实概率0.5与0.25，平均损失多少？

<details><summary>变式的推演与答案</summary>

1. 负对数分别ln2与ln4。
2. 平均(ln2+ln4)/2≈1.0397。

平均(ln2+ln4)/2≈1.0397。

</details>

### 原有解释与进一步例题


### 原理与推演

Cross-entropy is not an alternative to BCE: BCE is cross-entropy for the binary case. In training code, CrossEntropyLoss commonly accepts raw scores for multiple classes and performs the appropriate normalization internally. A typical task has one correct class per sample. Next-token prediction uses the same kind of classification objective over the vocabulary. Negative log-likelihood, or NLL, penalizes a model for assigning low likelihood to observed data. Cross-entropy for discrete classification is closely related to NLL, but likelihood-based objectives are not limited to classification.


### 适用边界与常见误解

PyTorch CrossEntropyLoss expects raw scores, while NLLLoss expects log probabilities.

### 例题：Softmax: Shift Before Exponentiating

Logits are [1000,1001,999], with the second class correct. Calculate probabilities and multiclass cross-entropy.

1. Direct exponentiation can overflow. Subtract the maximum 1001 to obtain [-1,0,-2], without changing Softmax.
2. Exponentials are approximately [.367879,1,.135335]. Normalization gives probabilities [.244728,.665241,.090031].
3. Cross-entropy for the true class is -ln(.665241)≈.407606. Adding a constant to all logits preserves relative scores and these probabilities.

结果：Stable computation uses an algebraically equivalent transformation rather than arbitrary logit clipping. Training code commonly uses a cross-entropy interface accepting raw scores.

易错点：Do not apply Softmax before passing inputs to CrossEntropyLoss as logits. Do not mix an inference threshold into the loss formula.

变式：What if 500 is added to every logit?

参考答案：Mathematically, nothing changes. A stable implementation still subtracts the maximum first to avoid unnecessarily large intermediate values.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html)
- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.NLLLoss.html)

[返回分层目录](00-learning-index.md)
