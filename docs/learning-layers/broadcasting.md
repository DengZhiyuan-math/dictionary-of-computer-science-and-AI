# Broadcasting

概念编号：`concept:broadcasting` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/broadcasting/)

## 第一层：概念入门 · 知其然

### 定义

广播是数组逐元素运算中的形状兼容规则：从最右侧维度对齐，每一对维度大小必须相同，或其中一个为 1；缺少的前导维度按 1 处理。大小为 1 的维度在逻辑上复用同一数据来配合较大维度。它描述运算的索引含义，不要求先实际复制出一个完整大数组，也不表示任意两个不同形状都能运算。

### 概念边界与常见混淆

广播成功也可能代表逻辑错误。例如 (3,1) 与 (3) 相减会产生 (3,3)，不是三个对应位置的差；应先写清每一轴表示样本、特征还是其他对象。

### 先看一个例子

形状为 (2,3) 的数组 [[1,2,3],[4,5,6]] 加形状为 (3) 的 [10,20,30]，后者作为每一行的同一组增量，结果为 [[11,22,33],[14,25,36]]。若改加 (2,1) 的 [[10],[20]]，则每行分别加 10 与 20。相同元素数量不能代替轴含义。

### 理解练习

#### 1. 兼容规则

形状 (2,3) 与 (2) 能直接广播相加吗？

<details><summary>答案与解释</summary>

不能，最右维为 3 与 2，既不相同也没有 1。若想每行加一个数，应明确变成 (2,1)。

</details>

#### 2. 外形正确性

三项预测是 (3,1)、标签是 (3)，相减结果一定是三项误差吗？

<details><summary>答案与解释</summary>

不是，会广播为 (3,3)，混合不同样本。应先统一为相同的逐样本形状，防止静默错误。

</details>

#### 3. 复制与结果

无需复制小数组，是否表示输出大数组也不占内存？

<details><summary>答案与解释</summary>

不是。广播可以省去输入复制，但输出及中间计算仍可能很大；必须分别考虑输入视图与结果存储。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 从右向左比较维度，尺寸相等或其中一个为1才可兼容。
2. 缺失的前导维度当作1，因此(3,)相当于(1,3)，结果取较大尺寸。

### 具体输入与计算步骤

形状(2,3)的矩阵加形状(3,)的向量[10,20,30]。

1. 矩阵[[1,2,3],[4,5,6]]加向量，第一行变为[11,22,33]。
2. 第二行变为[14,25,36]，结果形状仍(2,3)。

计算结果：第二行变为[14,25,36]，结果形状仍(2,3)。

### 换到实际问题中应用

给一个批次的每个特征减去训练均值。

1. 数据形状(B,F)，均值保存为(F,)或(1,F)，核对F一致。
2. 执行X−mean后逐列中心化，不把批次维当特征维。

应用结论：执行X−mean后逐列中心化，不把批次维当特征维。

### 举一反三：改变条件后的完整解答

若均值误写为(3,1)，还能与(2,3)相加吗？

<details><summary>变式的推演与答案</summary>

1. 末维1与3兼容，但下一维3与2不兼容。
2. 因此报形状错误；要按列加应改回(1,3)。

因此报形状错误；要按列加应改回(1,3)。

</details>

### 原有解释与进一步例题


### Definition

Broadcasting aligns tensor dimensions so an elementwise operation can apply to compatible shapes without explicitly copying a smaller input along every dimension.


### Parameters and mechanism

Compare dimensions from the trailing axis: they must be equal or one must be 1; missing leading dimensions act as 1. The output uses the larger size on each aligned dimension. Broadcasting is a shape rule, independent of arithmetic precision.


### Example

Adding shapes [3,1] and [1,4] produces [3,4]. Adding [3] and [4] fails because the trailing dimensions are unequal and neither is 1. An unintended but valid broadcast can silently produce the wrong computation.


### 适用边界与常见误解

A valid broadcast can still compute the wrong quantity.

### 推导与方法参考

- [一手资料](https://numpy.org/doc/stable/user/basics.broadcasting.html)

[返回分层目录](00-learning-index.md)
