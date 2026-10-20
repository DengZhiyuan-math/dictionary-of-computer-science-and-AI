# CNN — Convolutional Neural Network

概念编号：`concept:cnn` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cnn/)

## 第一层：概念入门 · 知其然

### 它是什么

卷积网络用小窗口在网格数据上重复同一组权重，学习局部图案并节省参数。

### 先看一个例子

像同一只放大镜扫过图片，寻找各处的边缘，而非每个位置单独造检测器。

### 理解练习

扫描各处边缘为什么能共享一个核？

<details><summary>答案与解释</summary>

相同局部图案可在不同位置出现，重复权重编码这种位置共享假设。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 步长1、无填充时，一维长度n、核长k得到n−k+1个输出。
2. 深度学习常用互相关形式Σwjx(i+j)，权重跨位置共享。

### 具体输入与计算步骤

输入[1,2,4]，核[1,−1]，无偏置。

1. 首窗口1−2=−1。
2. 次窗口2−4=−2。

计算结果：输出[−1,−2]，刻画局部变化。

### 换到实际问题中应用

检测工业图片边缘。

1. 先以卷积提取局部特征，再由后续层组合成缺陷表示。
2. 在新批次和不同光照下测试，避免只记拍摄条件。

应用结论：平移共享有帮助，但不保证对旋转或域变化鲁棒。

### 举一反三：改变条件后的完整解答

输入整体加10，当前核输出怎样？

<details><summary>变式的推演与答案</summary>

1. [11,12,14]的窗口差仍−1与−2。
2. 因为核系数和为0，常数项抵消。

该核对整体亮度平移不敏感，但一般卷积核未必如此。

</details>

### 原有解释与进一步例题


### 原理与推演

Neural architectures encode different design preferences for different data structures. A CNN, or convolutional neural network, uses local convolution kernels to process grid-structured data such as images. It reuses local patterns and has long been important for image recognition, object detection and many other vision tasks. ResNet uses residual connections to make deep networks easier to train.

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

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/tutorials/beginner/blitz/neural_networks_tutorial.html)

[返回分层目录](00-learning-index.md)
