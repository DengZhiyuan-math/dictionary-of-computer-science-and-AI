# Initialization / Residual Connection

概念编号：`concept:initialization-residual-connection` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/initialization-residual-connection/)

## 第一层：概念入门 · 知其然

### 定义

初始化为模型参数指定训练开始时的值；它影响不同单元能否学到不同功能，以及层间数值和梯度的尺度。残差连接则改变计算结构：把输入直接加到一个可训练变换的输出上，常写成 y=x+F(x)。这样该变换可以学习相对输入的改变量，而不必重新构造全部输出；相加要求两部分形状兼容。

### 概念边界与常见混淆

残差不是训练稳定的绝对保证，分支导数可能与直接通路抵消。初始化也不是随便用更大随机数；应配合层宽、激活及网络结构，必要时使用投影对齐尺寸。

### 先看一个例子

一层想把特征 x=10 轻微修正到 10.3。普通结构需直接产生 10.3；残差分支只需给出 0.3，再加回输入。若分支输出为零，整个块保持输入不变。若两组隐藏单元完全同样初始化、接收同样数据并按同样规则更新，它们还可能一直相同，因此初始化需考虑对称性。

### 理解练习

#### 1. 恒等映射

残差分支 F(x)=0，块输出是否为 0？

<details><summary>答案与解释</summary>

不是，输出为 x，直接通路仍存在。这是只学改变量的关键。

</details>

#### 2. 形状条件

输入有 8 个特征、分支有 4 个，能不作说明直接相加吗？

<details><summary>答案与解释</summary>

不能，应定义如何对齐，常用学习的投影或改变结构；否则不是所声明的逐项残差相加。

</details>

#### 3. 初始化作用

所有隐藏单元完全同值初始化，是否总能靠同一训练过程自行打破对称？

<details><summary>答案与解释</summary>

不能保证。相同计算和梯度可能保持相同，降低有效表达能力；需要有依据的初始化而非只要一个起点。

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
