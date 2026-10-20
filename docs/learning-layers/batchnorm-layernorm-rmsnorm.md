# BatchNorm / LayerNorm / RMSNorm

概念编号：`concept:batchnorm-layernorm-rmsnorm` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/batchnorm-layernorm-rmsnorm/)

## 第一层：概念入门 · 知其然

### 它是什么

Batch normalization uses minibatch statistics to normalize intermediate activations, then applies learnable parameters to preserve expressive capacity. It is common in convolutional networks. Very small training batches or large differences between devices’ batches can make the statistics unstable. Inference usually uses running statistics accumulated during training, rather than statistics from the current individual sample. Incorrect training or evaluation modes can therefore change outputs unexpectedly.

### 先看一个例子

例子：一条记录的特征为 (1,3)，按这两个特征计算的均值是 2、方差是 1，忽略 ε 和仿射变换时 LayerNorm 输出 (−1,1)；RMSNorm 用均方根 √5 缩放，输出 (1/√5,3/√5)。BatchNorm 则沿批次等规定轴取统计量，不能直接沿同一轴替换。

### 理解练习

用自己的话解释：上面的情景为什么是“BatchNorm / LayerNorm / RMSNorm”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Batch normalization uses minibatch statistics to normalize intermediate activations, then applies learnable parameters to preserve expressive capacity. It is common in convolutional networks. Very small training batches or large differences between devices’ batches can make the statistics unstable. Inference usually uses running statistics accumulated during training, rather than statistics from the current individual sample. Incorrect training or evaluation modes can therefore change outputs unexpectedly.

情景依据：例子：一条记录的特征为 (1,3)，按这两个特征计算的均值是 2、方差是 1，忽略 ε 和仿射变换时 LayerNorm 输出 (−1,1)；RMSNorm 用均方根 √5 缩放，输出 (1/√5,3/√5)。BatchNorm 则沿批次等规定轴取统计量，不能直接沿同一轴替换。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Batch normalization uses minibatch statistics to normalize intermediate activations, then applies learnable parameters to preserve expressive capacity. It is common in convolutional networks. Very small training batches or large differences between devices’ batches can make the statistics unstable. Inference usually uses running statistics accumulated during training, rather than statistics from the current individual sample. Incorrect training or evaluation modes can therefore change outputs unexpectedly.


### 例子

例子：一条记录的特征为 (1,3)，按这两个特征计算的均值是 2、方差是 1，忽略 ε 和仿射变换时 LayerNorm 输出 (−1,1)；RMSNorm 用均方根 √5 缩放，输出 (1/√5,3/√5)。BatchNorm 则沿批次等规定轴取统计量，不能直接沿同一轴替换。


### 适用边界与常见误解

During training, BatchNorm typically uses minibatch statistics. LayerNorm normalizes features within each sample; RMSNorm does not subtract the mean.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
