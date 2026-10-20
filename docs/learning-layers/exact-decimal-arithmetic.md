# Exact Decimal Arithmetic / Minor Units

概念编号：`concept:exact-decimal-arithmetic` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/exact-decimal-arithmetic/)

## 第一层：概念入门 · 知其然

### 数值表示与允许的金额步长

有限十进制数可以用一个整数和小数位数表示，例如 12.30 表示为整数 1230、两位小数。小数位数决定整数的单位；同一个整数若对应“元”或“分”，数值含义不同。这里讨论有限十进制的精确表示和换算，不把任意实数都视为有限小数。


### 定义

精确十进制运算是在明确小数位数和舍入规则的条件下，以十进制可准确表示的量进行计算的方法。用整数存储最小计量单位是一种常见实现，可以避免先转二进制浮点而引入近似；但表示准确，不代表金额符合某个接口的业务规则。

### 理解定义中的术语与关系

#### 对齐单位再计算

相加前先把两个整数换到同一小数位数。增加小数位数可在整数末尾补零；减少小数位数时，若被舍去的位不全为零，就必须拒绝无损换算，或按明确规则舍入。显示两位小数并不能证明内部计算精确；除法也可能得到无限小数，需要单独规定精度和舍入。

### 概念边界与常见混淆

准确表示、算术溢出、舍入以及接口允许的金额，是分别需要检查的问题。真实币种和支付操作的规则要按对应接口文档确认，不能从小数位数自行推断。

### 先看一个例子

把金额字符串 12.30 与 0.45 相加：按两位小数读成 1230 与 45，整数相加得到 1275，解释回金额为 12.75。若某个教学接口只允许 0.05 的步长，那么 12.75 合法，12.73 虽能精确表示，却不在允许网格上。这里的步长是示例约定，不对应任何具体支付产品。

### 理解练习

#### 1. 整数必须带单位

123 与 45 相加总是代表 1.68 吗？

<details><summary>答案与解释</summary>

不是。只有两者都按两位小数计量时，168 才表示 1.68。如果一个单位是元、另一个是分，必须先统一单位再相加。

</details>

#### 2. 减少小数位数

12.75 能无损改成只保留一位小数吗？12.70 呢？

<details><summary>答案与解释</summary>

12.75 不能，因为最后的 5 会丢失；若要转换必须声明舍入规则。12.70 可以改成 12.7，去掉末尾零没有改变数值。

</details>

#### 3. 表示精确不等于业务有效

示例接口允许 0.05 的步长，12.73 已精确存成 1273，能直接发送吗？

<details><summary>答案与解释</summary>

不能。按分计量的允许步长是五，1273 不是五的整数倍。业务校验独立于是否发生了浮点近似，不能靠“精确整数”绕过。

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
