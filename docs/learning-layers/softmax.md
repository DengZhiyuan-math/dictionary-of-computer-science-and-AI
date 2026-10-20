# Softmax

概念编号：`concept:softmax` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/softmax/)

## 第一层：概念入门 · 知其然

### 定义

Softmax把一组实数分数转为正数且和为1的向量：第i项为exp(z_i)/Σexp(z_j)。它常用于表示互斥且穷尽类别的概率，把某类分数提高会同时影响其他类别的归一化概率。为数值稳定，通常先减去最大分数再指数化，结果在精确算术下不变。

### 概念边界与常见混淆

输出和为1不保证校准；真实类别可能不在预设集合内。多标签同时成立时，强制总和1往往不符合任务。

### 先看一个例子

分数[0,ln2]的指数为[1,2]，概率为[1/3,2/3]。两项同时加100，比例不变；只提高第一项则改变相对概率。它表示竞争归一化，不是分别对各项做sigmoid。

### 理解练习

#### 1. 平移

[0,1]与[10,11]的softmax不同吗？

<details><summary>答案与解释</summary>

不变，公共指数因子在归一化时抵消；只有相对分数改变才会影响结果。

</details>

#### 2. 独立

一类概率升高，其他都完全不变还能保持总和1吗？

<details><summary>答案与解释</summary>

不能，归一化耦合各类；不能按独立事件解释。

</details>

#### 3. 未知类

模型总能输出最高类，就说明输入必属于某已知类吗？

<details><summary>答案与解释</summary>

不说明，softmax必须在给定类中分配数值，未知情况需另行处理。

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
