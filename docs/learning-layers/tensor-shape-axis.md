# Tensor / Shape / Axis

概念编号：`concept:tensor-shape-axis` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/tensor-shape-axis/)

## 第一层：概念入门 · 知其然

### 它是什么

For now, think of a tensor as a multidimensional array. Its shape gives its size along each direction; an axis identifies a direction of organization or computation. A color-image batch can have sample, channel, height, and width axes. “Dimension” may mean the number of axes or the size of one axis, so context matters. Embedding dimension usually means components per vector, not dataset sample count. Shape mismatches concern data alignment, not necessarily a flaw in the algorithm's principle.

### 先看一个例子

Predictions have shape [3,1] and labels have shape [3]. Use ordinary elementwise subtraction to calculate errors.
Wrong shapes can yield a valid computation with incorrect meaning. Check shapes, axis meanings and the expected output shape.

### 理解练习

Why is this harder to detect at batch=1?

<details><summary>答案与解释</summary>

Broadcasting [1,1] with [1] still produces one number, so small tests can hide the axis error.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
