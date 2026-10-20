# CNN — Convolutional Neural Network

概念编号：`concept:cnn` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cnn/)

## 第一层：概念入门 · 知其然

### 它是什么

Neural architectures encode different design preferences for different data structures. A CNN, or convolutional neural network, uses local convolution kernels to process grid-structured data such as images. It reuses local patterns and has long been important for image recognition, object detection and many other vision tasks. ResNet uses residual connections to make deep networks easier to train.

### 先看一个例子

Input is the 3×3 matrix [[1,2,3],[4,5,6],[7,8,9]], kernel [[1,0],[0,1]], stride 1, no padding and bias 0.
Output is [[6,8],[12,14]]. This uses the cross-correlation convention common in deep learning libraries, without flipping the kernel.

### 理解练习

What changes with kernel [[1,-1],[1,-1]]?

<details><summary>答案与解释</summary>

All four outputs are -2: each window computes its left-column sum minus its right-column sum.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

At this point, you can already explain why "deep learning" is not just one model. CNN utilizes spatial locality; RNN emphasizes sequential states; Transformer emphasizes dynamic information association; GNN utilizes graph structure; different designs reflect the inductive bias of different tasks.


### 适用边界与常见误解

Local connectivity and weight sharing are inductive biases. They do not guarantee invariance to transformations or better performance on every task.

### 例题：Convolution Windows: Which Pixels Produce One Output?

Input is the 3×3 matrix [[1,2,3],[4,5,6],[7,8,9]], kernel [[1,0],[0,1]], stride 1, no padding and bias 0.

1. Multiply the upper-left window [[1,2],[4,5]] elementwise by the kernel and sum: 1×1+2×0+4×0+5×1=6.
2. Move one position right to obtain 2+6=8. The two windows in the next row give 4+8=12 and 5+9=14.
3. Output spatial size is (3-2)/1+1=2, giving a 2×2 output. The same sliding kernel shares weights across positions.

结果：Output is [[6,8],[12,14]]. This uses the cross-correlation convention common in deep learning libraries, without flipping the kernel.

易错点：Mathematical convolution often flips the kernel; state the convention rather than mixing them. Channels, padding, dilation and multiple kernels are omitted here.

变式：What changes with kernel [[1,-1],[1,-1]]?

参考答案：All four outputs are -2: each window computes its left-column sum minus its right-column sum.

### 领域应用

- [Temporal Convolution · 金融时间轴上的因果卷积](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-temporal-convolution.md)：把一般卷积用于金融时间轴，明确感受野、扩张、填充和预测时点的信息范围。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
