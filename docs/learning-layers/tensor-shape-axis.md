# Tensor / Shape / Axis

概念编号：`concept:tensor-shape-axis` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/tensor-shape-axis/)

## 第一层：概念入门 · 知其然

### 定义

张量在本页指有多维索引的数值数组，形状列出各轴长度，轴是按约定排序的索引方向。形状(2,3)可以表示两条样本、每条三个特征，但这些含义不是数字自带的，需要程序约定。沿某轴求和会消去或保留为长度1的该轴，改变的是特定索引维度，不是任意把数混合。

### 概念边界与常见混淆

reshape只重新解释排列，不等于交换轴；转置改变索引对应关系。总元素数相同不足以保证样本、时间、特征语义保持正确。

### 先看一个例子

[[1,2,3],[4,5,6]]形状(2,3)。沿轴0求和得[5,7,9]，合并两条记录的对应特征；沿轴1得[6,15]，分别合并每条记录内的特征。相同输入，不同轴回答不同问题。

### 理解练习

#### 1. 轴

批次轴求平均，是每样本平均还是跨样本平均？

<details><summary>答案与解释</summary>

跨样本，对其余对应索引保留结果；需先声明哪个轴是批次。

</details>

#### 2. 形状

(2,3)与(3,2)元素数相同就含义相同吗？

<details><summary>答案与解释</summary>

不相同，索引对应与各轴角色可不同，变形需核对数据排列。

</details>

#### 3. 保维

沿轴1求和且保留维度，上例形状是什么？

<details><summary>答案与解释</summary>

是(2,1)，数值为[[6],[15]]，方便后续按该轴广播。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 求和消去指定轴，保留其余轴；keepdim则把该轴长度变1。
2. reshape只改变布局解释，不能凭空改变元素总数。

### 具体输入与计算步骤

矩阵[[1,2,3],[4,5,6]]，形状(2,3)。

1. 沿轴0求和=[1+4,2+5,3+6]=[5,7,9]。
2. 沿轴1求和=[6,15]，形状(2,)。

计算结果：沿轴1求和=[6,15]，形状(2,)。

### 换到实际问题中应用

处理批次B、时间T、特征F的序列。

1. 为每个轴命名，按时间平均需选择T轴，而非误把样本混在一起。
2. 保留必要维度以支持后续广播，核对输出形状。

应用结论：保留必要维度以支持后续广播，核对输出形状。

### 举一反三：改变条件后的完整解答

6个元素能reshape成(2,2)吗？

<details><summary>变式的推演与答案</summary>

1. 目标形状只容纳4个元素。
2. 不能，需保持元素数，例如(3,2)合法。

不能，需保持元素数，例如(3,2)合法。

</details>

### 原有解释与进一步例题


### 原理与推演

For now, think of a tensor as a multidimensional array. Its shape gives its size along each direction; an axis identifies a direction of organization or computation. A color-image batch can have sample, channel, height, and width axes. “Dimension” may mean the number of axes or the size of one axis, so context matters. Embedding dimension usually means components per vector, not dataset sample count. Shape mismatches concern data alignment, not necessarily a flaw in the algorithm's principle.


### 适用边界与常见误解

“Dimension” may mean the number of axes or the size of one axis; check context.

### 例题：Tensor Broadcasting: A Column and a Row Form a Matrix

Predictions have shape [3,1] and labels have shape [3]. Use ordinary elementwise subtraction to calculate errors.

1. Broadcasting aligns trailing axes: [3,1] and [1,3] broadcast to [3,3]. This no longer pairs three samples one to one.
2. For example, [[1],[2],[3]] minus [1,2,3] gives [[0,-1,-2],[1,0,-1],[2,1,0]].
3. Explicitly reshaping labels to [3,1] gives three zero rows, matching the intended sample pairing.

结果：Wrong shapes can yield a valid computation with incorrect meaning. Check shapes, axis meanings and the expected output shape.

易错点：Do not infer that every loss interface broadcasts automatically. BCEWithLogitsLoss requires identical input and target shapes.

变式：Why is this harder to detect at batch=1?

参考答案：Broadcasting [1,1] with [1] still produces one number, so small tests can hide the axis error.

### 推导与方法参考

- [一手资料](https://numpy.org/doc/stable/user/absolute_beginners.html)

[返回分层目录](00-learning-index.md)
