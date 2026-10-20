# Logit

概念编号：`concept:logit` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/logit/)

## 第一层：概念入门 · 知其然

### 定义

二分类概率 p 位于 0 与 1 之间时，其 logit 是对数赔率 ln(p/(1−p))；反向变换是 sigmoid。模型常直接输出任意实数分数，把它作为 logit 后转换成概率。互斥多分类中常把 softmax 之前的一组原始分数也称 logits，但每个分数不是单独类别概率的二元对数赔率。

### 概念边界与常见混淆

二分类分数的绝对零点有明确概率含义；多分类 softmax 则对所有分数加同一常数保持概率不变，因此主要由分数差决定。不要把两种语境的定义混为一谈。

### 先看一个例子

p=0.8 的赔率为 4，logit 为 ln4≈1.386；p=0.5 的 logit 为 0，p=0.2 的为 −ln4。因而负 logit 仍对应合法正概率，只是低于 0.5。端点概率 0 和 1 需要无限极限，不对应有限二元 logit。

### 理解练习

#### 1. 零与负值

logit 为 −2，概率是否非法或为负？

<details><summary>答案与解释</summary>

不是，sigmoid(−2)≈0.119，是合法概率。分数范围不同于概率范围。

</details>

#### 2. 概率转换

概率 0.8 是否就是 logit 0.8？

<details><summary>答案与解释</summary>

不是，其 logit 约 1.386。直接把 0.8 当分数再转换会得到另一概率。

</details>

#### 3. 多类平移

softmax 分数 [1,2] 改为 [11,12]，类别概率改变吗？

<details><summary>答案与解释</summary>

不变，两项都加十，公共倍数在归一化时抵消。不能把单项 11 直接当独立二元 logit 解读。

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
