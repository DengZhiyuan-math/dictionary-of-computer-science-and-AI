# SGD / Momentum

概念编号：`concept:sgd-momentum` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sgd-momentum/)

## 第一层：概念入门 · 知其然

### 它是什么

Full-batch gradient descent uses all training samples to compute an update direction. This gives a less noisy direction but is expensive for large datasets. Strictly, stochastic gradient descent can mean using one sample per update, although modern training commonly uses SGD to mean minibatch training. Minibatches give noisier directions but allow more frequent updates and hardware parallelism. Stochastic gradients are estimates from sampled data, not arbitrary changes to parameters.

### 先看一个例子

例子：采用 v_t=0.9v_{t−1}+g_t，w_t=w_{t−1}−0.1v_t，初始 v=0、连续梯度都为 2，则 v 先为 2、再为 3.8，两次参数变化为 −0.2、−0.38。其他库可能把学习率纳入速度定义，比较公式时应核对约定。

### 理解练习

用自己的话解释：上面的情景为什么是“SGD / Momentum”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Full-batch gradient descent uses all training samples to compute an update direction. This gives a less noisy direction but is expensive for large datasets. Strictly, stochastic gradient descent can mean using one sample per update, although modern training commonly uses SGD to mean minibatch training. Minibatches give noisier directions but allow more frequent updates and hardware parallelism. Stochastic gradients are estimates from sampled data, not arbitrary changes to parameters.

情景依据：例子：采用 v_t=0.9v_{t−1}+g_t，w_t=w_{t−1}−0.1v_t，初始 v=0、连续梯度都为 2，则 v 先为 2、再为 3.8，两次参数变化为 −0.2、−0.38。其他库可能把学习率纳入速度定义，比较公式时应核对约定。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Full-batch gradient descent uses all training samples to compute an update direction. This gives a less noisy direction but is expensive for large datasets. Strictly, stochastic gradient descent can mean using one sample per update, although modern training commonly uses SGD to mean minibatch training. Minibatches give noisier directions but allow more frequent updates and hardware parallelism. Stochastic gradients are estimates from sampled data, not arbitrary changes to parameters.


### 例子

例子：采用 v_t=0.9v_{t−1}+g_t，w_t=w_{t−1}−0.1v_t，初始 v=0、连续梯度都为 2，则 v 先为 2、再为 3.8，两次参数变化为 −0.2、−0.38。其他库可能把学习率纳入速度定义，比较公式时应核对约定。


### 适用边界与常见误解

In modern use, SGD often means the minibatch version.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
