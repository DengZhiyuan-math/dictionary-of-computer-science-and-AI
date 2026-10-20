# Forward / Backward

概念编号：`concept:forward-backward` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/forward-backward/)

## 第一层：概念入门 · 知其然

### 它是什么

前向把输入算成输出与损失，反向按链式法则计算参数如何影响损失。

### 先看一个例子

y=wx，x=2、w=3，目标4，损失L=(y−4)²/2。

### 理解练习

反向求导本身会更新权重吗？

<details><summary>答案与解释</summary>

不会，它计算梯度，参数更新由优化器执行。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 链式法则dL/dw=(dL/dy)(dy/dw)。
2. 此处dL/dy=y−4、dy/dw=x，乘起来得到权重梯度。

### 具体输入与计算步骤

y=wx，x=2、w=3，目标4，损失L=(y−4)²/2。

1. 前向y=3×2=6，损失(6−4)²/2=2。
2. 反向梯度(6−4)×2=4；学习率0.1更新后w=2.6。

计算结果：反向梯度(6−4)×2=4；学习率0.1更新后w=2.6。

### 换到实际问题中应用

训练一个小回归模型。

1. 每批先清梯度、算预测与损失，再执行反向。
2. 确认梯度有限后执行优化器更新，避免把梯度累积当成自动覆盖。

应用结论：确认梯度有限后执行优化器更新，避免把梯度累积当成自动覆盖。

### 举一反三：改变条件后的完整解答

若x=0，目标仍4，梯度是多少？

<details><summary>变式的推演与答案</summary>

1. 输出0，损失8，但dy/dw=0。
2. 权重梯度(0−4)×0=0，损失大不代表该参数有非零梯度。

权重梯度(0−4)×0=0，损失大不代表该参数有非零梯度。

</details>

### 原有解释与进一步例题


### Definition

The forward pass computes outputs and a loss from inputs and current parameters. The backward pass propagates loss derivatives through the computation graph. An optimizer step then uses derivatives to update parameters.


### Parameters and mechanism

For prediction y_hat=wx and loss L=(y_hat-y)^2, the forward pass evaluates wx and L; the backward pass gives dL/dw=2(wx-y)x. Gradient computation does not itself require an optimizer update.


### Example

For w=2, x=3 and y=5, prediction is 6 and loss is 1. The parameter derivative is 6. With learning rate 0.1, an ordinary gradient-descent step would change w to 1.4; that final action belongs to the optimizer.


### 适用边界与常见误解

Backpropagation does not itself update parameters.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html)

[返回分层目录](00-learning-index.md)
