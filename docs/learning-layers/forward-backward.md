# Forward / Backward

概念编号：`concept:forward-backward` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/forward-backward/)

## 第一层：概念入门 · 知其然

### 定义

前向计算按模型的计算规则，把输入与当前参数变成预测，再计算相对目标的损失。反向传播沿这些运算的依赖关系，用链式法则计算损失对需要求导的参数或输入的导数。反向传播提供如何改变参数的局部敏感度；真正修改参数的是优化器，前向、求导和参数更新是三个不同步骤。

### 概念边界与常见混淆

自动求导只对实际记录的运算求导，不自动知道代码之外的真实目标。不可导点需要实现约定；累积梯度、清空梯度和停止记录也要明确管理。

### 先看一个例子

模型输出 y=wx，取 x=2、w=3、目标 t=5，损失为 (y−t)²/2。前向得到 y=6、损失 0.5；反向得到对 w 的导数 (6−5)×2=2。若学习率 0.1，随后普通梯度下降把 w 改为 2.8；导数计算本身并没有把 w 改掉。

### 理解练习

#### 1. 求导与更新

只执行反向传播、不调用更新，w 会从 3 变为 2.8 吗？

<details><summary>答案与解释</summary>

通常不会，它得到梯度 2；参数改变需要另行更新操作，不能把 backward 当作训练全部步骤。

</details>

#### 2. 导数方向

当前对 w 的导数为正，普通梯度下降应增大还是减小 w？

<details><summary>答案与解释</summary>

减小。正导数表示局部增大 w 会增大损失，故沿负方向尝试下降；有限步仍需合适步长。

</details>

#### 3. 标签依赖

同一 x、w 换成目标 7，前向预测与反向梯度分别怎样？

<details><summary>答案与解释</summary>

预测仍为 6，损失仍 0.5，但梯度变为 (6−7)×2=−2。相同损失数值不等于相同更新方向。

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
