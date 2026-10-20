# Initialization / Residual Connection

概念编号：`concept:initialization-residual-connection` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/initialization-residual-connection/)

## 第一层：概念入门 · 知其然

### 它是什么

初始化设定训练起点；残差连接让一层输出在变换结果上加回输入，改善深层信息传递。

### 先看一个例子

残差块y=x+f(x)，x=2，f(x)=0.1x。

### 理解练习

残差块必须学习完整恒等映射吗？

<details><summary>答案与解释</summary>

不用，令f接近0就能保留输入。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 普通链式梯度连续相乘，过大或过小会引发爆炸或消失。
2. 残差导数dy/dx=1+f′(x)，增加直接通路，但不保证任何网络都稳定。

### 具体输入与计算步骤

残差块y=x+f(x)，x=2，f(x)=0.1x。

1. 前向y=2+0.2=2.2。
2. 局部导数1+0.1=1.1，对比无残差的0.1，梯度有直接通道。

计算结果：局部导数1+0.1=1.1，对比无残差的0.1，梯度有直接通道。

### 换到实际问题中应用

训练较深视觉网络。

1. 采用与激活相匹配的初始化，检查各层激活与梯度尺度。
2. 尺寸不同时用投影对齐再相加，不能把不兼容形状直接残差相加。

应用结论：尺寸不同时用投影对齐再相加，不能把不兼容形状直接残差相加。

### 举一反三：改变条件后的完整解答

若f′=−1，残差导数是多少？

<details><summary>变式的推演与答案</summary>

1. dy/dx=1−1=0。
2. 仍可梯度抵消，残差连接改善通路却不是绝对防消失保证。

仍可梯度抵消，残差连接改善通路却不是绝对防消失保证。

</details>

### 原有解释与进一步例题


### 原理与推演

Initialization determines the starting point of training. Using the same weights for all neurons may not break the symmetry; the scale may be too large or too small, making it difficult to propagate information and gradients. Xavier and He initialization are common methods for selecting initial scales based on layer structure and activation properties. They help get started with training and do not directly impart knowledge to the model. The weights of the pre-trained model have come from learning, which is not the same thing as random initialization.


### 例子

例子：残差层输出 y=x+F(x)，若某次 F(x)=0，输入 x=3 会直接传为 3。其导数包含恒等路径的 1，有助于梯度传播；这不意味着任意深度、初始化和学习率组合都稳定。对称初始化仍可能让不同单元学到相同东西。


### 适用边界与常见误解

Residual connections are covered in Chapter 49; neither mechanism represents knowledge already learned by the model.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/1512.03385)

[返回分层目录](00-learning-index.md)
