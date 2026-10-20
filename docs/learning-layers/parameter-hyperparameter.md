# Parameter / Hyperparameter

概念编号：`concept:parameter-hyperparameter` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/parameter-hyperparameter/)

## 第一层：概念入门 · 知其然

### 它是什么

Weights and biases are learnable model values; “parameter” is the general category. Learning rate, batch size, and maximum tree depth are usually hyperparameters controlling the model or training, rather than weights directly fitted by ordinary training. A bias term is not the statistical bias in the bias–variance tradeoff or social bias. The same word has different meanings: first determine whether the discussion concerns model structure, statistical error, or fairness.

### 先看一个例子

例子：回归模型 ŷ=wx+b，拟合得到 w=2、b=1，这是参数。学习率 0.01、正则强度 0.1 是选择训练程序的超参数，应在验证流程中选择；不能反复看最终测试误差调到最好，再把它当独立测试成绩。

### 理解练习

用自己的话解释：上面的情景为什么是“Parameter / Hyperparameter”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Weights and biases are learnable model values; “parameter” is the general category. Learning rate, batch size, and maximum tree depth are usually hyperparameters controlling the model or training, rather than weights directly fitted by ordinary training. A bias term is not the statistical bias in the bias–variance tradeoff or social bias. The same word has different meanings: first determine whether the discussion concerns model structure, statistical error, or fairness.

情景依据：例子：回归模型 ŷ=wx+b，拟合得到 w=2、b=1，这是参数。学习率 0.01、正则强度 0.1 是选择训练程序的超参数，应在验证流程中选择；不能反复看最终测试误差调到最好，再把它当独立测试成绩。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Weights and biases are learnable model values; “parameter” is the general category. Learning rate, batch size, and maximum tree depth are usually hyperparameters controlling the model or training, rather than weights directly fitted by ordinary training. A bias term is not the statistical bias in the bias–variance tradeoff or social bias. The same word has different meanings: first determine whether the discussion concerns model structure, statistical error, or fairness.


### 例子

例子：回归模型 ŷ=wx+b，拟合得到 w=2、b=1，这是参数。学习率 0.01、正则强度 0.1 是选择训练程序的超参数，应在验证流程中选择；不能反复看最终测试误差调到最好，再把它当独立测试成绩。


### 适用边界与常见误解

Learning rate and batch size are usually hyperparameters.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
