# Logit

概念编号：`concept:logit` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/logit/)

## 第一层：概念入门 · 知其然

### 它是什么

Logit是概率的对数赔率，也是二分类模型转换成概率前的原始分数。

### 先看一个例子

正类概率0.8。

### 理解练习

logit必须在0与1之间吗？

<details><summary>答案与解释</summary>

不用，logit可取任意实数。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 赔率为p/(1−p)，取对数得z=ln(p/(1−p))。
2. 反解p=1/(1+exp(−z))，因此z=0对应p=0.5。

### 具体输入与计算步骤

正类概率0.8。

1. 赔率0.8/0.2=4。
2. logit=ln4≈1.3863，代回sigmoid恢复0.8。

计算结果：logit=ln4≈1.3863，代回sigmoid恢复0.8。

### 换到实际问题中应用

实现稳定二分类训练。

1. 保留网络原始分数，直接交给BCEWithLogitsLoss。
2. 推理才转概率；概率阈值0.8等价于logit阈值ln4。

应用结论：推理才转概率；概率阈值0.8等价于logit阈值ln4。

### 举一反三：改变条件后的完整解答

若概率为0.2，logit是多少？

<details><summary>变式的推演与答案</summary>

1. 赔率0.2/0.8=1/4。
2. logit=−ln4≈−1.3863，与0.8的logit互为相反数。

logit=−ln4≈−1.3863，与0.8的logit互为相反数。

</details>

### 原有解释与进一步例题


### Definition

In neural classification, a logit usually means an unnormalized real-valued output score before conversion to probabilities. In binary statistical terminology, the logit of a probability is its log odds.


### Parameters and mechanism

For 0<p<1, z=log(p/(1-p)); its inverse is p=1/(1+exp(-z)). A multiclass model has one raw score per class, usually followed by a joint normalization. Raw scores are not probabilities.


### Example

Probability p=0.8 has odds 4 and log odds about 1.386. A raw score z=2 is valid even though probability 2 would be invalid. Calibration still needs checking after score conversion.


### 适用边界与常见误解

Scores may be negative or exceed one; they are not probabilities.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/nn.html)

[返回分层目录](00-learning-index.md)
