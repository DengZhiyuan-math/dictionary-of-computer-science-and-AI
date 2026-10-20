# Neural Network

概念编号：`concept:neural-network` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/neural-network/)

## 第一层：概念入门 · 知其然

### 它是什么

神经网络用多层带参数的变换把输入映射为输出，通过训练目标调整权重。非线性激活让多层网络可以表示超过单一线性模型的关系；层数更多不保证预测更准确。

### 先看一个例子

若真实值为 10，平方误差为 0.25。用于深度对冲时，输出可以改为持仓数量，损失也应改为包含负债与成本的终端目标。

### 理解练习

用自己的话解释：上面的情景为什么是“Neural Network”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：神经网络用多层带参数的变换把输入映射为输出，通过训练目标调整权重。非线性激活让多层网络可以表示超过单一线性模型的关系；层数更多不保证预测更准确。

情景依据：若真实值为 10，平方误差为 0.25。用于深度对冲时，输出可以改为持仓数量，损失也应改为包含负债与成本的终端目标。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数与公式

一层可写为 $h=\phi(Wx+b)$，输出为 $\hat y=Uh+c$。x 为输入向量，W、U 为权重矩阵，b、c 为偏置，φ 为逐元素激活。训练最小化样本损失 L，并由反向传播计算参数梯度；网络输出的单位取决于任务。


### 例子

单个隐单元 h=max(0,2x−1)，输出 ŷ=3h+0.5。x=2 时 h=3、ŷ=9.5；若真实值为 10，平方误差为 0.25。用于深度对冲时，输出可以改为持仓数量，损失也应改为包含负债与成本的终端目标。


### 适用边界与常见误解

Network structure, loss function, optimization method and evaluation criteria are at different levels.

### 领域应用

- [Deep Hedging · 深度对冲](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/ml-deep-hedging.md)：先理解神经网络如何表示和训练函数，再把输出解释成有成本和约束的动态对冲持仓。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
