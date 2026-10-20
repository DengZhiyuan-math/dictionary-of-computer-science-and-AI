# Neural Network

概念编号：`concept:neural-network` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/neural-network/)

## 第一层：概念入门 · 知其然

### 它是什么

神经网络把多层可训练变换连接起来；非线性激活让它能表达弯曲关系。

### 先看一个例子

像多道筛子依次提取信息，每层调整自己的参数以减少预测误差。

### 理解练习

多层筛子若全部线性，会比一个线性层表达更多吗？

<details><summary>答案与解释</summary>

不会；线性变换复合仍是线性，额外表达力需要非线性等结构。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 一层算z=Wx+b，再经非线性f得到输出。
2. 损失经链式法则反传得到参数梯度，再按优化器更新；多层纯线性仍等于单层线性。

### 具体输入与计算步骤

单神经元y=ReLU(wx+b)，x=2、w=1、b=−1，目标3，损失0.5(y−3)²。

1. z=1、y=1，损失2，梯度dw=(1−3)×2=−4。
2. 固定b，学习率0.1使w变1.4，新y=1.8。

计算结果：新损失0.5×1.2²=0.72，单步改善。

### 换到实际问题中应用

做图片分类模型。

1. 将输出转成类别分数，训练集优化交叉熵。
2. 用独立验证集选模型，测试集只评价最终泛化。

应用结论：训练误差低不证明能识别新图片。

### 举一反三：改变条件后的完整解答

若z为负且用ReLU，局部梯度如何？

<details><summary>变式的推演与答案</summary>

1. ReLU输出0，负半轴导数0。
2. 该样本对w的梯度为0。

可能出现停滞，应检查初始化、学习率或激活选择。

</details>

### 原有解释与进一步例题


### 定义

神经网络用多层带参数的变换把输入映射为输出，通过训练目标调整权重。非线性激活让多层网络可以表示超过单一线性模型的关系；层数更多不保证预测更准确。


### 参数与公式

一层可写为 $h=\phi(Wx+b)$，输出为 $\hat y=Uh+c$。x 为输入向量，W、U 为权重矩阵，b、c 为偏置，φ 为逐元素激活。训练最小化样本损失 L，并由反向传播计算参数梯度；网络输出的单位取决于任务。


### 例子

单个隐单元 h=max(0,2x−1)，输出 ŷ=3h+0.5。x=2 时 h=3、ŷ=9.5；若真实值为 10，平方误差为 0.25。用于深度对冲时，输出可以改为持仓数量，损失也应改为包含负债与成本的终端目标。


### 适用边界与常见误解

Network structure, loss function, optimization method and evaluation criteria are at different levels.

### 领域应用

- [Deep Hedging · 深度对冲](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/ml-deep-hedging.md)：先理解神经网络如何表示和训练函数，再把输出解释成有成本和约束的动态对冲持仓。

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/tutorials/recipes/recipes/defining_a_neural_network.html)

[返回分层目录](00-learning-index.md)
