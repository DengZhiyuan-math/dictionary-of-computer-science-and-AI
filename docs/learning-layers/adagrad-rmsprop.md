# Adagrad / RMSProp

概念编号：`concept:adagrad-rmsprop` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/adagrad-rmsprop/)

## 第一层：概念入门 · 知其然

### 它是什么

AdaGrad scales each parameter’s update using its past gradients. This is useful for sparse features, but cumulative statistics can make effective step sizes increasingly small. RMSProp uses moving averages of recent squared gradients to limit that continual decay. These are adaptive step-size methods: parameters can receive different effective update scales. Adaptive does not mean that the learning rate needs no tuning or that validation is unnecessary.

### 先看一个例子

例子：当前梯度为 2，AdaGrad 既有平方梯度和为 5，学习率 0.1，忽略 ε 时本次更新幅度为 0.2/√9≈0.0667。若 RMSProp 的衰减为 0.9、旧均方为 1，则新均方为 0.9×1+0.1×4=1.3。两种方法保存历史的方式不同。

### 理解练习

用自己的话解释：上面的情景为什么是“Adagrad / RMSProp”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：AdaGrad scales each parameter’s update using its past gradients. This is useful for sparse features, but cumulative statistics can make effective step sizes increasingly small. RMSProp uses moving averages of recent squared gradients to limit that continual decay. These are adaptive step-size methods: parameters can receive different effective update scales. Adaptive does not mean that the learning rate needs no tuning or that validation is unnecessary.

情景依据：例子：当前梯度为 2，AdaGrad 既有平方梯度和为 5，学习率 0.1，忽略 ε 时本次更新幅度为 0.2/√9≈0.0667。若 RMSProp 的衰减为 0.9、旧均方为 1，则新均方为 0.9×1+0.1×4=1.3。两种方法保存历史的方式不同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

AdaGrad scales each parameter’s update using its past gradients. This is useful for sparse features, but cumulative statistics can make effective step sizes increasingly small. RMSProp uses moving averages of recent squared gradients to limit that continual decay. These are adaptive step-size methods: parameters can receive different effective update scales. Adaptive does not mean that the learning rate needs no tuning or that validation is unnecessary.


### 例子

例子：当前梯度为 2，AdaGrad 既有平方梯度和为 5，学习率 0.1，忽略 ε 时本次更新幅度为 0.2/√9≈0.0667。若 RMSProp 的衰减为 0.9、旧均方为 1，则新均方为 0.9×1+0.1×4=1.3。两种方法保存历史的方式不同。


### 适用边界与常见误解

Adaptation still requires setting and validating the learning rate.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
