# Weight Decay

概念编号：`concept:weight-decay` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/weight-decay/)

## 第一层：概念入门 · 知其然

### 它是什么

Weight decay discourages excessively large weights. AdamW decouples it from Adam’s adaptive gradient scaling instead of treating it as an ordinary gradient term. For basic SGD, L2 regularization and weight decay can be equivalent under common conditions; that equivalence does not carry over directly to adaptive optimizers. In an interview, explain that the W in AdamW refers to decoupled weight decay, rather than describing it simply as faster Adam.

### 先看一个例子

Use the simplified decoupled update θ_next=(1-ηλ)θ-ηg for shrinkage and gradient updates, with θ=2, η=0.1, λ=0.01 and g=0.4.
Weight decay shrinks parameters during an update; learning-rate decay describes how η changes over time. Their numerical effects interact because shrinkage contains ηλ.

### 理解练习

If g=0, can weight decay still update the parameter?

<details><summary>答案与解释</summary>

Yes. If ηλ is nonzero and decay applies to that parameter, the equation still performs θ←(1-ηλ)θ.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
