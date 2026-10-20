# Dtype / Device

概念编号：`concept:dtype-device` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dtype-device/)

## 第一层：概念入门 · 知其然

### 它是什么

A tensor dtype specifies how values are represented, such as a floating-point format or integer type. Its device specifies where the tensor is stored and computed, such as CPU memory or a particular accelerator.

### 先看一个例子

One million float32 values occupy about four million raw bytes, versus two million for float16. Moving a tensor to a GPU changes its location, not automatically its dtype or mathematical shape.

### 理解练习

用自己的话解释：上面的情景为什么是“Dtype / Device”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A tensor dtype specifies how values are represented, such as a floating-point format or integer type. Its device specifies where the tensor is stored and computed, such as CPU memory or a particular accelerator.

情景依据：One million float32 values occupy about four million raw bytes, versus two million for float16. Moving a tensor to a GPU changes its location, not automatically its dtype or mathematical shape.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For n elements and b bytes per element, raw value storage is nb bytes, excluding metadata and other buffers. Operations require supported type and device combinations; conversions can change precision and transfers can add latency.


### 适用边界与常见误解

Matching shapes do not guarantee matching dtypes or devices.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
