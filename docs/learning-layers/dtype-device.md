# Dtype / Device

概念编号：`concept:dtype-device` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dtype-device/)

## 第一层：概念入门 · 知其然

### 它是什么

类型决定数值精度与占用，设备决定数据在哪里计算，两者都需符合算子要求。

### 先看一个例子

1000个float32元素，每元素4字节，保存在GPU。

### 理解练习

同形状CPU与GPU张量能直接相加吗？

<details><summary>答案与解释</summary>

通常不能，要明确移动到兼容设备。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 数据大小等于元素数乘每元素字节数，不含分配器等额外状态。
2. 接口还区分语义类型，如类别索引应为指定整数，连续值用浮点。

### 具体输入与计算步骤

1000个float32元素，每元素4字节，保存在GPU。

1. float32占1000×4=4000字节。
2. float16改为2000字节，同时精度与数值范围改变。

计算结果：float16改为2000字节，同时精度与数值范围改变。

### 换到实际问题中应用

模型在GPU、加载数据在CPU。

1. 在批次入口移动输入和必要标签，并核对损失要求的类型。
2. 统一转换减少反复搬运，避免用浮点标签代替整数类别索引。

应用结论：统一转换减少反复搬运，避免用浮点标签代替整数类别索引。

### 举一反三：改变条件后的完整解答

标签[0,2]改成float16后能当整数索引吗？

<details><summary>变式的推演与答案</summary>

1. 数值虽一样，接口类型不再符合索引要求。
2. 保留所需整数类型，预测保持适当浮点类型。

保留所需整数类型，预测保持适当浮点类型。

</details>

### 原有解释与进一步例题


### Definition

A tensor dtype specifies how values are represented, such as a floating-point format or integer type. Its device specifies where the tensor is stored and computed, such as CPU memory or a particular accelerator.


### Parameters and mechanism

For n elements and b bytes per element, raw value storage is nb bytes, excluding metadata and other buffers. Operations require supported type and device combinations; conversions can change precision and transfers can add latency.


### Example

One million float32 values occupy about four million raw bytes, versus two million for float16. Moving a tensor to a GPU changes its location, not automatically its dtype or mathematical shape.


### 适用边界与常见误解

Matching shapes do not guarantee matching dtypes or devices.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/tensor_attributes.html)

[返回分层目录](00-learning-index.md)
