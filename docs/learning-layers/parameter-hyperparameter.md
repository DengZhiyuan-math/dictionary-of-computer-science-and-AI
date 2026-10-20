# Parameter / Hyperparameter

概念编号：`concept:parameter-hyperparameter` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/parameter-hyperparameter/)

## 第一层：概念入门 · 知其然

### 它是什么

参数由训练数据学出；超参数控制模型结构与训练过程，通常通过验证选择。

### 先看一个例子

线性模型y=wx+b，当前w=2、b=1，学习率0.1。

### 理解练习

学习率与w都由普通梯度更新自动改变吗？

<details><summary>答案与解释</summary>

通常只更新w、b；学习率由配置或调度决定。

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
