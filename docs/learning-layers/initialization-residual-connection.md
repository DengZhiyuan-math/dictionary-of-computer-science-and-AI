# Initialization / Residual Connection

概念编号：`concept:initialization-residual-connection` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/initialization-residual-connection/)

## 第一层：概念入门 · 知其然

### 它是什么

Initialization determines the starting point of training. Using the same weights for all neurons may not break the symmetry; the scale may be too large or too small, making it difficult to propagate information and gradients. Xavier and He initialization are common methods for selecting initial scales based on layer structure and activation properties. They help get started with training and do not directly impart knowledge to the model. The weights of the pre-trained model have come from learning, which is not the same thing as random initialization.

### 先看一个例子

例子：残差层输出 y=x+F(x)，若某次 F(x)=0，输入 x=3 会直接传为 3。其导数包含恒等路径的 1，有助于梯度传播；这不意味着任意深度、初始化和学习率组合都稳定。对称初始化仍可能让不同单元学到相同东西。

### 理解练习

用自己的话解释：上面的情景为什么是“Initialization / Residual Connection”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Initialization determines the starting point of training. Using the same weights for all neurons may not break the symmetry; the scale may be too large or too small, making it difficult to propagate information and gradients. Xavier and He initialization are common methods for selecting initial scales based on layer structure and activation properties. They help get started with training and do not directly impart knowledge to the model. The weights of the pre-trained model have come from learning, which is not the same thing as random initialization.

情景依据：例子：残差层输出 y=x+F(x)，若某次 F(x)=0，输入 x=3 会直接传为 3。其导数包含恒等路径的 1，有助于梯度传播；这不意味着任意深度、初始化和学习率组合都稳定。对称初始化仍可能让不同单元学到相同东西。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Initialization determines the starting point of training. Using the same weights for all neurons may not break the symmetry; the scale may be too large or too small, making it difficult to propagate information and gradients. Xavier and He initialization are common methods for selecting initial scales based on layer structure and activation properties. They help get started with training and do not directly impart knowledge to the model. The weights of the pre-trained model have come from learning, which is not the same thing as random initialization.


### 例子

例子：残差层输出 y=x+F(x)，若某次 F(x)=0，输入 x=3 会直接传为 3。其导数包含恒等路径的 1，有助于梯度传播；这不意味着任意深度、初始化和学习率组合都稳定。对称初始化仍可能让不同单元学到相同东西。


### 适用边界与常见误解

Residual connections are covered in Chapter 49; neither mechanism represents knowledge already learned by the model.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
