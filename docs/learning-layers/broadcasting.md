# Broadcasting

概念编号：`concept:broadcasting` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/broadcasting/)

## 第一层：概念入门 · 知其然

### 它是什么

广播让形状兼容的数组按规则对齐运算，不必手工复制小数组。

### 先看一个例子

形状(2,3)的矩阵加形状(3,)的向量[10,20,30]。

### 理解练习

向量会加到每一行还是每一列？

<details><summary>答案与解释</summary>

加到每一行，因为末尾维度3对齐。

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
