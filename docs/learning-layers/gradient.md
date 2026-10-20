# Gradient

概念编号：`concept:gradient` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/gradient/)

## 第一层：概念入门 · 知其然

### 它是什么

A gradient is the vector of partial derivatives of a scalar function with respect to its inputs or parameters. It describes local change, not the value of the function itself.

### 先看一个例子

For L(w)=w^2, the gradient at w=3 is 6. A step w_new=w-0.1×6 gives 2.4. The local approximation helps choose a direction, but a large step can still increase a nonlinear objective.

### 理解练习

用自己的话解释：上面的情景为什么是“Gradient”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A gradient is the vector of partial derivatives of a scalar function with respect to its inputs or parameters. It describes local change, not the value of the function itself.

情景依据：For L(w)=w^2, the gradient at w=3 is 6. A step w_new=w-0.1×6 gives 2.4. The local approximation helps choose a direction, but a large step can still increase a nonlinear objective.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For parameter vector θ and small displacement δ, L(θ+δ)≈L(θ)+∇L(θ)^Tδ. The gradient points toward steepest local increase under the Euclidean norm; gradient descent uses the negative direction.


### 适用边界与常见误解

Gradient direction and the eventual update size are different quantities.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
