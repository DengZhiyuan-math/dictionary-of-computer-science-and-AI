# Mixed Precision / Loss Scaling

概念编号：`concept:mixed-precision-loss-scaling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mixed-precision-loss-scaling/)

## 第一层：概念入门 · 知其然

### 它是什么

These names denote floating-point formats. Lower precision generally saves memory and can accelerate computation on supported hardware, but the numerical range and resolution differ. BF16 has an exponent range similar to FP32 but lower precision; FP16 has a narrower representable range. Mixed precision uses different formats for different operations, often retaining higher precision for sensitive calculations. It does not simply make all numbers smaller, and does not guarantee equal speedups on every device.

### 先看一个例子

例子：一个梯度为 10⁻⁸，在常见 FP16 范围内可能下溢。若损失先乘 1024，梯度也乘同一倍数；反传后再除 1024，才恢复原更新尺度。缩放不能修复中间激活溢出，溢出时还需跳过更新并调整策略。

### 理解练习

用自己的话解释：上面的情景为什么是“Mixed Precision / Loss Scaling”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：These names denote floating-point formats. Lower precision generally saves memory and can accelerate computation on supported hardware, but the numerical range and resolution differ. BF16 has an exponent range similar to FP32 but lower precision; FP16 has a narrower representable range. Mixed precision uses different formats for different operations, often retaining higher precision for sensitive calculations. It does not simply make all numbers smaller, and does not guarantee equal speedups on every device.

情景依据：例子：一个梯度为 10⁻⁸，在常见 FP16 范围内可能下溢。若损失先乘 1024，梯度也乘同一倍数；反传后再除 1024，才恢复原更新尺度。缩放不能修复中间激活溢出，溢出时还需跳过更新并调整策略。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

These names denote floating-point formats. Lower precision generally saves memory and can accelerate computation on supported hardware, but the numerical range and resolution differ. BF16 has an exponent range similar to FP32 but lower precision; FP16 has a narrower representable range. Mixed precision uses different formats for different operations, often retaining higher precision for sensitive calculations. It does not simply make all numbers smaller, and does not guarantee equal speedups on every device.


### 例子

例子：一个梯度为 10⁻⁸，在常见 FP16 范围内可能下溢。若损失先乘 1024，梯度也乘同一倍数；反传后再除 1024，才恢复原更新尺度。缩放不能修复中间激活溢出，溢出时还需跳过更新并调整策略。


### 适用边界与常见误解

Unscaling and optimizer updates must occur at the correct accumulation boundaries.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
