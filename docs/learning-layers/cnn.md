# CNN — Convolutional Neural Network

概念编号：`concept:cnn` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cnn/)

## 第一层：概念入门 · 知其然

### 定义

卷积神经网络是使用卷积类操作处理有网格结构数据的神经网络。图像中的网格位置是像素；卷积层用一小组权重检查局部窗口，并把同一组权重用于不同位置，生成表示某类局部响应的新网格。实践中的卷积层常采用不翻转权重的互相关运算，也统称卷积层。后续层可以组合这些局部响应，而不是一开始就为每个位置学习完全独立的规则。

### 概念边界与常见混淆

共享权重使规则对位置具有一致性，但不保证整张图像平移后最终分类永远不变。边界处理、下采样和最后的输出结构都可能影响这一性质。

### 先看一个例子

用一维信号说明共享规则：输入 [1,3,2,5]，窗口宽度为二，权重为 [1,−1]，每次移动一格、不补边界。依次计算 1−3、3−2、2−5，输出 [−2,1,−3]。同一组权重在三个位置检测局部下降或上升；输出变短是因为这里只保留窗口完全落在输入内的位置。

### 理解练习

#### 1. 共享了什么

上例三个输出用了三组独立权重吗？

<details><summary>答案与解释</summary>

没有，三个窗口都使用 [1,−1]，只换所读取的输入。共享的是参数，而不是要求每个窗口的数据或输出相同。

</details>

#### 2. 输出范围

保持窗口宽度为二、不补边界，长度五的输入产生多少个输出？

<details><summary>答案与解释</summary>

步长为一时是四个，起点为第一至第四位置。第五位置无法容纳完整窗口；补边界或改步长后答案会变化。

</details>

#### 3. 适用结构

任意打乱图像像素顺序，再当作原网格卷积，会保留相同的局部含义吗？

<details><summary>答案与解释</summary>

通常不会。卷积利用相邻位置的关系，打乱会把原本遥远的像素放在一起。相同数值集合并不能保证相同空间结构。

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
