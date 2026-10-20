# Softmax

概念编号：`concept:softmax` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/softmax/)

## 第一层：概念入门 · 知其然

### 它是什么

Softmax把一组分数变成和为1的概率，常用于互斥类别。

### 先看一个例子

分数[0,ln3]。

### 理解练习

给所有分数加同一个数会改变概率吗？

<details><summary>答案与解释</summary>

不会，分子分母同乘一个指数因子而抵消。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. pᵢ=exp(zᵢ)/Σexp(zⱼ)，所有输出为正且和为1。
2. 先减最大分数不改变结果，并避免对巨大正数取指数。

### 具体输入与计算步骤

分数[0,ln3]。

1. 指数为[1,3]，总和4。
2. 概率[0.25,0.75]。

计算结果：概率[0.25,0.75]。

### 换到实际问题中应用

给3类图像模型输出概率。

1. 沿类别轴softmax，核对每个样本概率和约为1。
2. 训练交叉熵通常直接接分数，展示或推理时再转换。

应用结论：训练交叉熵通常直接接分数，展示或推理时再转换。

### 举一反三：改变条件后的完整解答

分数改为[1000,1000+ln3]如何稳定计算？

<details><summary>变式的推演与答案</summary>

1. 减最大值得[−ln3,0]，指数[1/3,1]。
2. 归一化仍[0.25,0.75]，无需计算exp(1000)。

归一化仍[0.25,0.75]，无需计算exp(1000)。

</details>

### 原有解释与进一步例题


### Definition

Softmax converts a vector of real class scores into nonnegative values summing to one. It is commonly used for a choice among mutually exclusive classes.


### Parameters and mechanism

For K scores z_j, p_i=exp(z_i)/Σ_j exp(z_j). Subtracting the same constant from every score leaves the result unchanged; subtracting the maximum before exponentiation improves numerical stability.


### Example

Scores [0,log(2)] produce probabilities [1/3,2/3]. Adding 100 to both scores gives the same probabilities. Increasing one class score changes the other probabilities through the shared denominator.


### 适用边界与常见误解

Independent multilabel outputs do not require mutually exclusive softmax merely because many labels exist.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/nn.html)

[返回分层目录](00-learning-index.md)
