# Gradient

概念编号：`concept:gradient` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/gradient/)

## 第一层：概念入门 · 知其然

### 它是什么

梯度收集函数对各输入方向的变化率，指出局部上升最快的方向。

### 先看一个例子

f(x,y)=x²+2y²，在(1,2)求梯度。

### 理解练习

沿负梯度走很大一步一定下降吗？

<details><summary>答案与解释</summary>

不一定，梯度只描述局部变化。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 分别求偏导得到∇f=(2x,4y)。
2. 一阶近似Δf≈∇f·Δθ，取Δθ=−η∇f时约为−η‖∇f‖²。

### 具体输入与计算步骤

f(x,y)=x²+2y²，在(1,2)求梯度。

1. 在(1,2)梯度为(2,8)，η=0.1更新到(0.8,1.2)。
2. 函数从1+8=9降至0.64+2×1.44=3.52。

计算结果：函数从1+8=9降至0.64+2×1.44=3.52。

### 换到实际问题中应用

优化带多个参数的损失。

1. 自动求导取得梯度，先检查量纲、有限性与是否意外断图。
2. 用合适学习率沿负梯度更新，并观察实际损失变化。

应用结论：用合适学习率沿负梯度更新，并观察实际损失变化。

### 举一反三：改变条件后的完整解答

同一点若η=1呢？

<details><summary>变式的推演与答案</summary>

1. 更新为(−1,−6)。
2. 函数为1+72=73，大于9，说明过大步长会越过低谷。

函数为1+72=73，大于9，说明过大步长会越过低谷。

</details>

### 原有解释与进一步例题


### Definition

A gradient is the vector of partial derivatives of a scalar function with respect to its inputs or parameters. It describes local change, not the value of the function itself.


### Parameters and mechanism

For parameter vector θ and small displacement δ, L(θ+δ)≈L(θ)+∇L(θ)^Tδ. The gradient points toward steepest local increase under the Euclidean norm; gradient descent uses the negative direction.


### Example

For L(w)=w^2, the gradient at w=3 is 6. A step w_new=w-0.1×6 gives 2.4. The local approximation helps choose a direction, but a large step can still increase a nonlinear objective.


### 适用边界与常见误解

Gradient direction and the eventual update size are different quantities.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html)

[返回分层目录](00-learning-index.md)
