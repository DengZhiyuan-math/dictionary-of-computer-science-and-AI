# Exact Decimal Arithmetic / Minor Units

概念编号：`concept:exact-decimal-arithmetic` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/exact-decimal-arithmetic/)

## 第一层：概念入门 · 知其然

### 它是什么

精确十进制用整数和小数位数表示金额，避免二进制浮点近似，还须遵守接口允许的金额步长。

### 先看一个例子

金额“10.25”，用两位小数整数表示。

### 理解练习

能表示两位小数就代表接口允许任意分数金额吗？

<details><summary>答案与解释</summary>

不一定，例如Stripe的ISK接口仍只允许整克朗金额。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 值=m/10ˢ，提高位数乘10的幂；降低位数若不许舍入，必须整除。
2. 表示精度与合法最小金额是两条约束，先精确换算再检查币种与操作规则。

### 具体输入与计算步骤

金额“10.25”，用两位小数整数表示。

1. “10.25”得到m=1025、s=2，换到三位得到10250。
2. 换到一位需1025除10但余5，不能无损转换，应拒绝或使用明确舍入规则。

计算结果：换到一位需1025除10但余5，不能无损转换，应拒绝或使用明确舍入规则。

### 换到实际问题中应用

生成Stripe的10 ISK收费金额。

1. 按该接口两位表示得到1000，再检查1000可被100整除。
2. 金额表达合法；最低收费、账户与支付方式约束还需独立检查。

应用结论：金额表达合法；最低收费、账户与支付方式约束还需独立检查。

### 举一反三：改变条件后的完整解答

10.25 ISK转成1025后可以直接收费吗？

<details><summary>变式的推演与答案</summary>

1. 1025除100余25，不是整ISK。
2. 不能，该规则禁止分数ISK，精确表示不等于业务合法。

不能，该规则禁止分数ISK，精确表示不等于业务合法。

</details>

### 原有解释与进一步例题


### 原理与推演

Represent a value as m/10^s. To increase the scale, multiply m by a power of ten. To reduce it without rounding, require the discarded digits to be zero. Decimal-string operations can implement this conversion without a binary floating-point intermediate.

Keep the representation scale separate from the allowed amount quantum. Stripe represents ISK with two decimal places but permits only whole-ISK charges; HUF and TWD manual payouts similarly require minor-unit integers divisible by 100.


### 例子

例子：12.30 可表示为整数 1230 与 scale=2。与 0.45 相加，先统一精度得到 1275/100=12.75；若改为 scale=1，1230/100 只能在相应整除条件下精确改写。金额取整必须明确规则，不能靠显示两位小数代替。


### 适用边界与常见误解

Representation scale and allowed increments can differ by operation. Input grammar, precision, and divisibility need separate checks. Integer storage must be wide enough; arbitrary-precision arithmetic does not have constant cost for unbounded digit counts.

### 推导与方法参考

- [一手资料](https://docs.stripe.com/currencies)

[返回分层目录](00-learning-index.md)
