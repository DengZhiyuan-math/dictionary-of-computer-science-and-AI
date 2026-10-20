# Forward / Backward

概念编号：`concept:forward-backward` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/forward-backward/)

## 第一层：概念入门 · 知其然

### 它是什么

The forward pass computes outputs and a loss from inputs and current parameters. The backward pass propagates loss derivatives through the computation graph. An optimizer step then uses derivatives to update parameters.

### 先看一个例子

For w=2, x=3 and y=5, prediction is 6 and loss is 1. The parameter derivative is 6. With learning rate 0.1, an ordinary gradient-descent step would change w to 1.4; that final action belongs to the optimizer.

### 理解练习

用自己的话解释：上面的情景为什么是“Forward / Backward”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：The forward pass computes outputs and a loss from inputs and current parameters. The backward pass propagates loss derivatives through the computation graph. An optimizer step then uses derivatives to update parameters.

情景依据：For w=2, x=3 and y=5, prediction is 6 and loss is 1. The parameter derivative is 6. With learning rate 0.1, an ordinary gradient-descent step would change w to 1.4; that final action belongs to the optimizer.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For prediction y_hat=wx and loss L=(y_hat-y)^2, the forward pass evaluates wx and L; the backward pass gives dL/dw=2(wx-y)x. Gradient computation does not itself require an optimizer update.


### 适用边界与常见误解

Backpropagation does not itself update parameters.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
