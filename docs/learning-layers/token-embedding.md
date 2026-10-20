# Token / Embedding

概念编号：`concept:token-embedding` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/token-embedding/)

## 第一层：概念入门 · 知其然

### 它是什么

词元（token）是分词器处理文本的离散单位，可以是一段字节、字符或子词。嵌入（embedding）把离散词元编号映射为可学习向量；编号本身的大小不代表语义距离。

### 先看一个例子

玩具词表中编号 7 的向量为 (0.2,−0.4)，编号 9 为 (0.1,0.6)，序列 [7,9,7] 得到三行二维向量。相同编号查到相同初始向量，但经上下文网络后，两个位置的表示可以不同。金融文本还需检查文本实际到达时间。

### 理解练习

用自己的话解释：上面的情景为什么是“Token / Embedding”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：词元（token）是分词器处理文本的离散单位，可以是一段字节、字符或子词。嵌入（embedding）把离散词元编号映射为可学习向量；编号本身的大小不代表语义距离。

情景依据：玩具词表中编号 7 的向量为 (0.2,−0.4)，编号 9 为 (0.1,0.6)，序列 [7,9,7] 得到三行二维向量。相同编号查到相同初始向量，但经上下文网络后，两个位置的表示可以不同。金融文本还需检查文本实际到达时间。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数与公式

词表大小为 V、向量维度为 d 时，嵌入矩阵 $E\in\mathbb R^{V\times d}$；编号 i 的向量为第 i 行 Eᵢ。长度 L 的序列查表后形状为 L×d。分词器版本决定文本怎样转成编号，后续注意力处理上下文，这两步不能混成一个定义。


### 适用边界与常见误解

A token need not correspond to one character or one word.

### 领域应用

- [NLP and LLMs in Finance · 金融文本与大语言模型](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/ml-financial-nlp.md)：先理解词元和文本向量表示，再构建遵守金融信息可见时间的文本信号与证据流程。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
