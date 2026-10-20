# Mixed Precision / Loss Scaling

概念编号：`concept:mixed-precision-loss-scaling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mixed-precision-loss-scaling/)

## 第一层：概念入门 · 知其然

### 它是什么

混合精度用低精度加速合适运算，并保留关键计算的精度；损失缩放防止小梯度下溢。

### 先看一个例子

真实梯度0.00001，损失缩放系数1024。

### 理解练习

缩放后的大梯度可以直接更新吗？

<details><summary>答案与解释</summary>

不行，更新前需反缩放回真实梯度。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 损失乘S会把所有链式梯度也乘S，使小数较易被表示。
2. 优化器前除回S并检查非有限数，必要时跳过更新并调整尺度。

### 具体输入与计算步骤

真实梯度0.00001，损失缩放系数1024。

1. 缩放梯度0.00001×1024=0.01024。
2. 反缩放0.01024/1024=0.00001，恢复正确更新幅度。

计算结果：反缩放0.01024/1024=0.00001，恢复正确更新幅度。

### 换到实际问题中应用

在GPU上训练大模型。

1. 用自动混合精度选择算子类型，配合适用的梯度缩放器。
2. 先反缩放再做梯度裁剪，监控溢出和峰值显存。

应用结论：先反缩放再做梯度裁剪，监控溢出和峰值显存。

### 举一反三：改变条件后的完整解答

若缩放后出现Inf，继续除1024能修好吗？

<details><summary>变式的推演与答案</summary>

1. Inf除以有限数仍为Inf，信息已经丢失。
2. 跳过该更新、降低尺度并排查数值来源，不能照常应用。

跳过该更新、降低尺度并排查数值来源，不能照常应用。

</details>

### 原有解释与进一步例题


### 原理与推演

These names denote floating-point formats. Lower precision generally saves memory and can accelerate computation on supported hardware, but the numerical range and resolution differ. BF16 has an exponent range similar to FP32 but lower precision; FP16 has a narrower representable range. Mixed precision uses different formats for different operations, often retaining higher precision for sensitive calculations. It does not simply make all numbers smaller, and does not guarantee equal speedups on every device.


### 例子

例子：一个梯度为 10⁻⁸，在常见 FP16 范围内可能下溢。若损失先乘 1024，梯度也乘同一倍数；反传后再除 1024，才恢复原更新尺度。缩放不能修复中间激活溢出，溢出时还需跳过更新并调整策略。


### 适用边界与常见误解

Unscaling and optimizer updates must occur at the correct accumulation boundaries.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/amp.html)

[返回分层目录](00-learning-index.md)
