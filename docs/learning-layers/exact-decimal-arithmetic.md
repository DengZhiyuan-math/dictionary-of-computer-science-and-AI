# Exact Decimal Arithmetic / Minor Units

概念编号：`concept:exact-decimal-arithmetic` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/exact-decimal-arithmetic/)

## 第一层：概念入门 · 知其然

### 它是什么

Represent a value as m/10^s. To increase the scale, multiply m by a power of ten. To reduce it without rounding, require the discarded digits to be zero. Decimal-string operations can implement this conversion without a binary floating-point intermediate.

### 先看一个例子

例子：12.30 可表示为整数 1230 与 scale=2。与 0.45 相加，先统一精度得到 1275/100=12.75；若改为 scale=1，1230/100 只能在相应整除条件下精确改写。金额取整必须明确规则，不能靠显示两位小数代替。

### 理解练习

用自己的话解释：上面的情景为什么是“Exact Decimal Arithmetic / Minor Units”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Represent a value as m/10^s. To increase the scale, multiply m by a power of ten. To reduce it without rounding, require the discarded digits to be zero. Decimal-string operations can implement this conversion without a binary floating-point intermediate.

情景依据：例子：12.30 可表示为整数 1230 与 scale=2。与 0.45 相加，先统一精度得到 1275/100=12.75；若改为 scale=1，1230/100 只能在相应整除条件下精确改写。金额取整必须明确规则，不能靠显示两位小数代替。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Keep the representation scale separate from the allowed amount quantum. Stripe represents ISK with two decimal places but permits only whole-ISK charges; HUF and TWD manual payouts similarly require minor-unit integers divisible by 100.


### 适用边界与常见误解

Representation scale and allowed increments can differ by operation. Input grammar, precision, and divisibility need separate checks. Integer storage must be wide enough; arbitrary-precision arithmetic does not have constant cost for unbounded digit counts.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
