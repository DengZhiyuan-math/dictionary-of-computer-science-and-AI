# In-place Marking

概念编号：`concept:in-place-marking` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/in-place-marking/)

## 第一层：概念入门 · 知其然

### 它是什么

When setting zero in a matrix, you cannot immediately change the rows and columns as soon as you see zero, otherwise the newly created zeros will continue to propagate. First record which rows and columns need to be changed to zero, and then execute them uniformly. To compress the mark space, you can use the first row and first column as marks, but you should save whether the first row and first column originally contain zeros. Process the first row and column last to avoid overwriting the mark before it is used up.

### 先看一个例子

例子：矩阵 [[1,0],[3,4]] 的原始零位于第 1 行第 2 列，最终应为 [[0,0],[3,0]]。若扫描时直接把新写出的零也当原始标记，可能错误地把 3 清零；需先记录哪些行列原本含零。

### 理解练习

用自己的话解释：上面的情景为什么是“In-place Marking”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：When setting zero in a matrix, you cannot immediately change the rows and columns as soon as you see zero, otherwise the newly created zeros will continue to propagate. First record which rows and columns need to be changed to zero, and then execute them uniformly. To compress the mark space, you can use the first row and first column as marks, but you should save whether the first row and first column originally contain zeros. Process the first row and column last to avoid overwriting the mark before it is used up.

情景依据：例子：矩阵 [[1,0],[3,4]] 的原始零位于第 1 行第 2 列，最终应为 [[0,0],[3,0]]。若扫描时直接把新写出的零也当原始标记，可能错误地把 3 清零；需先记录哪些行列原本含零。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

When setting zero in a matrix, you cannot immediately change the rows and columns as soon as you see zero, otherwise the newly created zeros will continue to propagate. First record which rows and columns need to be changed to zero, and then execute them uniformly. To compress the mark space, you can use the first row and first column as marks, but you should save whether the first row and first column originally contain zeros. Process the first row and column last to avoid overwriting the mark before it is used up.


### 例子

例子：矩阵 [[1,0],[3,4]] 的原始零位于第 1 行第 2 列，最终应为 [[0,0],[3,0]]。若扫描时直接把新写出的零也当原始标记，可能错误地把 3 清零；需先记录哪些行列原本含零。


### 适用边界与常见误解

This modifies the input. Preserve information in marker positions or process it in a safe order.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
