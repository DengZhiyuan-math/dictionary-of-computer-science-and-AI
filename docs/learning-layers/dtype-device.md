# Dtype / Device

概念编号：`concept:dtype-device` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dtype-device/)

## 第一层：概念入门 · 知其然

### 定义

张量是按形状组织的数值数组；数据类型规定每项怎样编码，如整数、单精度浮点或低精度浮点，影响范围、精度和占用。设备规定张量实际位于哪种执行资源上，例如 CPU 或某块 GPU。一个运算是否可执行，取决于输入类型、设备及算子的支持规则；类型转换与设备搬运是两种不同操作。

### 概念边界与常见混淆

位数少不只意味着误差稍大，也可能更早溢出或下溢。把低精度值再转回高精度不能恢复已经丢失的信息；某些索引或标签算子还明确要求整数类型。

### 先看一个例子

一个含 1000 项的数组，float32 每项 4 字节，数值本体共 4000 字节；float16 每项 2 字节，共 2000 字节，不计额外管理信息。把 float32 数组搬到 GPU 并不会自动变成 float16；把它转成整数还可能截掉小数，例如 2.9 转成整数通常为 2，具体规则须以接口为准。

### 理解练习

#### 1. 类型与位置

CPU 上的 float32 转到 GPU 后，能只凭设备变化断言数值精度变低吗？

<details><summary>答案与解释</summary>

不能，设备与类型独立。若没有类型转换且运算符合规则，存储类型仍是 float32。

</details>

#### 2. 信息恢复

2.9 转成整数 2 后再转 float32，会恢复 2.9 吗？

<details><summary>答案与解释</summary>

不会，得到 2.0。小数信息在第一次转换时已丢失，提高编码精度不能重建原值。

</details>

#### 3. 存储比较

相同元素数由 float32 改为 float16，能保证整个训练峰值内存减半吗？

<details><summary>答案与解释</summary>

不能。只说明这份数值本体减半，参数副本、优化器状态、临时缓冲和管理信息可能不变。

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
