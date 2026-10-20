# Mixed Precision / Loss Scaling

概念编号：`concept:mixed-precision-loss-scaling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mixed-precision-loss-scaling/)

## 第一层：概念入门 · 知其然

### 定义

混合精度训练按运算性质使用不同浮点格式：适合的运算用低精度提高效率，敏感运算保留较高精度。损失缩放是其中可选配合机制，把损失乘正数使反向梯度同比变大，减少低精度中小梯度被舍成零的风险；更新前必须除回。是否需要缩放取决于浮点格式和实际数值范围。

### 概念边界与常见混淆

缩放过大也可能溢出；无穷值再除有限系数不会恢复信息。发现非有限梯度时通常跳过更新并调整尺度。缩放不解决所有低精度误差。

### 先看一个例子

真实梯度为0.00001，缩放1024后为0.01024，更容易在适用低精度路径中保留；更新前除1024恢复0.00001。若直接用0.01024更新，就把步长扩大1024倍，已经不是同一训练目标下的预期更新。

### 理解练习

#### 1. 反缩放

裁剪阈值指真实梯度时，应先裁剪还是先反缩放？

<details><summary>答案与解释</summary>

先反缩放，才能按真实大小比较阈值；否则阈值含义被缩放系数改变。

</details>

#### 2. 溢出

Inf除以1024能变成原有限梯度吗？

<details><summary>答案与解释</summary>

不能，仍为Inf，需重算或跳过并排查，不能照常更新。

</details>

#### 3. 格式

所有低精度格式都必须使用相同缩放系数吗？

<details><summary>答案与解释</summary>

不是，表示范围不同，实际需要取决于格式、模型和运算，不能按名称一律设置。

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
