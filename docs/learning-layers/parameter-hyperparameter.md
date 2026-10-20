# Parameter / Hyperparameter

概念编号：`concept:parameter-hyperparameter` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/parameter-hyperparameter/)

## 第一层：概念入门 · 知其然

### 定义

模型参数是训练过程要估计的内部数值，如线性模型的系数；超参数规定模型族或训练流程，如层数、学习率和正则强度，通常通过验证或先验规则选择。区别是它们在当前学习流程中的角色，而不是一个永远“自动”、另一个永远“手工”。自动搜索超参数仍然是模型选择。

### 概念边界与常见混淆

同一个数值在另一种算法中可能改变角色，例如可学习的步长。报告应说明谁由什么数据、按什么目标选择，不能仅靠名称判断泄漏。

### 先看一个例子

拟合房价模型“价格=系数×面积+截距”，系数和截距由训练数据估计；比较正则强度0.1、1、10时，用验证数据选择，再锁定流程。若反复看测试误差选强度，测试集便参与了超参数选择。

### 理解练习

#### 1. 自动调参

搜索程序自动选学习率，学习率就变普通模型权重了吗？

<details><summary>答案与解释</summary>

没有，仍在外层选择训练流程，自动化没有改变评价边界。

</details>

#### 2. 数据用途

用测试集选正则强度后还能报它为独立最终评价吗？

<details><summary>答案与解释</summary>

不能，选择已利用测试信息，应另有独立评价或合适嵌套设计。

</details>

#### 3. 角色

所有叫“系数”的量都是训练参数吗？

<details><summary>答案与解释</summary>

不是，正则系数可能是超参数；必须看实际更新与选择方式。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 损失对模型参数求导，优化器使用超参数决定如何应用梯度。
2. 超参数选择也会过拟合验证集，因此最终测试仍需独立。

### 具体输入与计算步骤

线性模型y=wx+b，当前w=2、b=1，学习率0.1。

1. 若dw=3，则w新=2−0.1×3=1.7。
2. 若学习率改0.01，同一梯度得到1.97，超参数改变了更新幅度。

计算结果：若学习率改0.01，同一梯度得到1.97，超参数改变了更新幅度。

### 换到实际问题中应用

选择神经网络隐藏层宽度。

1. 宽度作为候选超参数，各自完整训练权重。
2. 按验证表现与资源成本选配置，再锁定并测试。

应用结论：按验证表现与资源成本选配置，再锁定并测试。

### 举一反三：改变条件后的完整解答

调度器让学习率每步变化，它就成为模型参数了吗？

<details><summary>变式的推演与答案</summary>

1. 不一定，变化本身不是区分标准。
2. 若由预设规则决定，仍是训练控制量；元学习可另行把它设成可学习量。

若由预设规则决定，仍是训练控制量；元学习可另行把它设成可学习量。

</details>

### 原有解释与进一步例题


### 原理与推演

Weights and biases are learnable model values; “parameter” is the general category. Learning rate, batch size, and maximum tree depth are usually hyperparameters controlling the model or training, rather than weights directly fitted by ordinary training. A bias term is not the statistical bias in the bias–variance tradeoff or social bias. The same word has different meanings: first determine whether the discussion concerns model structure, statistical error, or fairness.


### 例子

例子：回归模型 ŷ=wx+b，拟合得到 w=2、b=1，这是参数。学习率 0.01、正则强度 0.1 是选择训练程序的超参数，应在验证流程中选择；不能反复看最终测试误差调到最好，再把它当独立测试成绩。


### 适用边界与常见误解

Learning rate and batch size are usually hyperparameters.

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/user_guide.html)

[返回分层目录](00-learning-index.md)
