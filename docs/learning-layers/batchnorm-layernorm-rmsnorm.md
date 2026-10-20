# BatchNorm / LayerNorm / RMSNorm

概念编号：`concept:batchnorm-layernorm-rmsnorm` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/batchnorm-layernorm-rmsnorm/)

## 第一层：概念入门 · 知其然

### 定义

归一化层根据一组数值计算尺度，再用它重新表达这些数值，通常还带可学习的缩放参数。通道可理解为一种特征分量，例如图像的红、绿、蓝；空间位置则对应像素等网格位置。BatchNorm 对指定通道汇集批次及适用空间位置的统计量，训练与推理通常采用不同统计来源；LayerNorm 对每个样本的指定特征维度减均值、按标准差缩放；RMSNorm 不减均值，按均方根缩放。三者区别在于统计对象与变换规则，不是名称不同的同一操作。

### 概念边界与常见混淆

归一化不保证输出一定落在 0 到 1。统计轴必须写清楚；BatchNorm 用小批统计时会受其他同批样本影响，LayerNorm 对每个样本自身维度归一化则没有这种直接的批内依赖。

### 先看一个例子

只看一条特征向量 [3,4]，忽略防除零项、设可学习缩放为 1、平移为 0。LayerNorm 的均值 3.5、方差 0.25，输出 [−1,1]；RMSNorm 的均方根为 √12.5，输出约 [0.849,1.131]。后者没有减均值，所以输出均值不为零。

### 理解练习

#### 1. 是否居中

RMSNorm 输出均值一定为零吗？

<details><summary>答案与解释</summary>

不一定，它不减均值；[3,4] 的例子中输出都为正，均值也为正。

</details>

#### 2. 同批影响

在训练 BatchNorm 时把另一个样本替换为极大值，原样本结果可能改变吗？

<details><summary>答案与解释</summary>

可能，因为共同计算的批统计量改变。逐样本 LayerNorm 在输入自身不变且没有其他交互时不会仅因这项替换改变。

</details>

#### 3. 训练与推理

模型评估时为什么要核对 BatchNorm 模式？

<details><summary>答案与解释</summary>

训练通常使用当前批统计，推理通常使用累计统计。模式错误可能让输出依赖评估批组成；实际行为还要核对具体层配置。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. LayerNorm均值μ=2，方差为((1−2)²+(3−2)²)/2=1。
2. RMSNorm不减均值，用√((1²+3²)/2)=√5缩放，保留均值方向。

### 具体输入与计算步骤

一个样本的两个特征为1、3，暂忽略稳定项与可学习缩放。

1. LayerNorm输出(1−2)/1=−1、(3−2)/1=1。
2. RMSNorm输出1/√5≈0.447、3/√5≈1.342。

计算结果：RMSNorm输出1/√5≈0.447、3/√5≈1.342。

### 换到实际问题中应用

部署使用BatchNorm的图像模型。

1. 训练时估计批统计并更新运行统计，部署前切换eval模式。
2. 部署用运行统计，避免单张图片的输出随临时搭配的其他图片改变。

应用结论：部署用运行统计，避免单张图片的输出随临时搭配的其他图片改变。

### 举一反三：改变条件后的完整解答

若输入整体加10，LayerNorm与RMSNorm都不变吗？

<details><summary>变式的推演与答案</summary>

1. LayerNorm新均值12，中心化仍为−1、1，因此输出不变。
2. RMSNorm变为(11,13)/√145，不等于原输出；它不具备相同的平移不变性。

RMSNorm变为(11,13)/√145，不等于原输出；它不具备相同的平移不变性。

</details>

### 原有解释与进一步例题


### 原理与推演

Batch normalization uses minibatch statistics to normalize intermediate activations, then applies learnable parameters to preserve expressive capacity. It is common in convolutional networks. Very small training batches or large differences between devices’ batches can make the statistics unstable. Inference usually uses running statistics accumulated during training, rather than statistics from the current individual sample. Incorrect training or evaluation modes can therefore change outputs unexpectedly.


### 例子

例子：一条记录的特征为 (1,3)，按这两个特征计算的均值是 2、方差是 1，忽略 ε 和仿射变换时 LayerNorm 输出 (−1,1)；RMSNorm 用均方根 √5 缩放，输出 (1/√5,3/√5)。BatchNorm 则沿批次等规定轴取统计量，不能直接沿同一轴替换。


### 适用边界与常见误解

During training, BatchNorm typically uses minibatch statistics. LayerNorm normalizes features within each sample; RMSNorm does not subtract the mean.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.BatchNorm1d.html)
- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.LayerNorm.html)
- [一手资料](https://arxiv.org/abs/1910.07467)

[返回分层目录](00-learning-index.md)
