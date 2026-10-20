# Weight Decay

概念编号：`concept:weight-decay` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/weight-decay/)

## 第一层：概念入门 · 知其然

### 定义

权重衰减在参数更新中把指定权重按比例向零缩小，以限制其持续增大。独立衰减常写为先乘(1−学习率×衰减系数)，再结合数据梯度更新。它与损失中加平方权重惩罚在普通梯度下降下可对应，但在自适应优化器中不一般等价，因为惩罚梯度还会进入历史统计。

### 概念边界与常见混淆

是否衰减偏置或归一化参数是具体训练选择。改变学习率计划也会改变累计衰减效果，不能只报衰减系数而忽略更新规则。

### 先看一个例子

学习率0.1、衰减系数0.2、权重5，单看衰减会变成5×0.98=4.9；权重−5则变成−4.9。若数据梯度把它增大，完整一步后的权重仍可能更大，所以“有衰减”不等于参数每步必减小。

### 理解练习

#### 1. 向零

负权重衰减是否应变得更负？

<details><summary>答案与解释</summary>

通常不是，应向零缩小；减固定正数不是比例衰减。

</details>

#### 2. 整体

衰减后4.9，数据更新加0.3，最终比5大吗？

<details><summary>答案与解释</summary>

是5.2，衰减贡献存在但被其他贡献超过。

</details>

#### 3. 等价

Adam加L2与AdamW能仅凭系数相同视为等价吗？

<details><summary>答案与解释</summary>

不能，惩罚是否进入自适应统计不同，应核对公式。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 解耦衰减写成w新=(1−ηλ)w，再独立执行数据梯度更新。
2. 普通无动量SGD加L2可得到相同形式，不能将该等价性无条件推广到自适应优化器。

### 具体输入与计算步骤

参数w=2，学习率0.1，衰减系数0.2，无数据梯度。

1. 缩放因子1−0.1×0.2=0.98。
2. w新=2×0.98=1.96，即便数据梯度0也会变化。

计算结果：w新=2×0.98=1.96，即便数据梯度0也会变化。

### 换到实际问题中应用

微调时对不同参数设置衰减策略。

1. 显式分组权重、偏置及归一化参数，决定每组是否衰减。
2. 在验证集调λ，并记录学习率，因为每步缩小量依赖ηλ。

应用结论：在验证集调λ，并记录学习率，因为每步缩小量依赖ηλ。

### 举一反三：改变条件后的完整解答

连续两步无梯度，w变多少？

<details><summary>变式的推演与答案</summary>

1. 第一步1.96，第二步1.96×0.98。
2. 结果1.9208，按乘法衰减而不是每次固定减0.04。

结果1.9208，按乘法衰减而不是每次固定减0.04。

</details>

### 原有解释与进一步例题


### 原理与推演

Weight decay discourages excessively large weights. AdamW decouples it from Adam’s adaptive gradient scaling instead of treating it as an ordinary gradient term. For basic SGD, L2 regularization and weight decay can be equivalent under common conditions; that equivalence does not carry over directly to adaptive optimizers. In an interview, explain that the W in AdamW refers to decoupled weight decay, rather than describing it simply as faster Adam.


### 适用边界与常见误解

Weight decay differs from learning-rate decay; equivalence to an L2 penalty depends on the optimizer.

### 例题：Weight Decay and Learning-Rate Decay: Different Controls

Use the simplified decoupled update θ_next=(1-ηλ)θ-ηg for shrinkage and gradient updates, with θ=2, η=0.1, λ=0.01 and g=0.4.

1. The shrinkage factor is 0.999, giving the shrunk parameter 1.998.
2. The gradient term is 0.04, giving 1.958 after the update. With λ=0, the same step gives 1.96.
3. Reducing the next step’s learning rate to 0.01 changes the schedule for η. λ still sets parameter shrinkage strength.

结果：Weight decay shrinks parameters during an update; learning-rate decay describes how η changes over time. Their numerical effects interact because shrinkage contains ηλ.

易错点：Here g denotes the update direction. Actual AdamW adjusts gradients using momentum and second-moment statistics, so this direction is not simply the raw gradient.

变式：If g=0, can weight decay still update the parameter?

参考答案：Yes. If ηλ is nonzero and decay applies to that parameter, the equation still performs θ←(1-ηλ)θ.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/optim.html)

[返回分层目录](00-learning-index.md)
