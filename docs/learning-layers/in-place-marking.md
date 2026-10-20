# In-place Marking

概念编号：`concept:in-place-marking` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/in-place-marking/)

## 第一层：概念入门 · 知其然

### 它是什么

原地标记把访问状态写回已有数组，节省额外空间，但会修改输入。

### 先看一个例子

数组[1,3,3]，值范围1至3，用下标abs(v)−1标记出现。

### 理解练习

数值可为0或负数时能直接沿用符号标记吗？

<details><summary>答案与解释</summary>

不能，原值和标记会混淆，需重新设计编码。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 利用值域与数组下标一一对应，把“出现”写成对应位置负号。
2. 遍历读取abs(v)恢复原值；写标记用负绝对值防重复翻转。

### 具体输入与计算步骤

数组[1,3,3]，值范围1至3，用下标abs(v)−1标记出现。

1. 处理1使数组[−1,3,3]；处理3使[−1,3,−3]。
2. 再次处理3不变，唯一正值位置下标1对应缺失数2。

计算结果：再次处理3不变，唯一正值位置下标1对应缺失数2。

### 换到实际问题中应用

找1至n范围中未出现的编号。

1. 先确认数组可修改且长度和值域符合约定，再做符号标记。
2. 扫描仍为正的位置输出编号，需要保留输入则最后取绝对值恢复。

应用结论：扫描仍为正的位置输出编号，需要保留输入则最后取绝对值恢复。

### 举一反三：改变条件后的完整解答

若标记操作写成乘−1，重复的3会怎样？

<details><summary>变式的推演与答案</summary>

1. 第一次把下标2变负，第二次又变正。
2. 会误报3缺失，应使用−abs(a[index])保持标记幂等。

会误报3缺失，应使用−abs(a[index])保持标记幂等。

</details>

### 原有解释与进一步例题


### 原理与推演

When setting zero in a matrix, you cannot immediately change the rows and columns as soon as you see zero, otherwise the newly created zeros will continue to propagate. First record which rows and columns need to be changed to zero, and then execute them uniformly. To compress the mark space, you can use the first row and first column as marks, but you should save whether the first row and first column originally contain zeros. Process the first row and column last to avoid overwriting the mark before it is used up.


### 例子

例子：矩阵 [[1,0],[3,4]] 的原始零位于第 1 行第 2 列，最终应为 [[0,0],[3,0]]。若扫描时直接把新写出的零也当原始标记，可能错误地把 3 清零；需先记录哪些行列原本含零。


### 适用边界与常见误解

This modifies the input. Preserve information in marker positions or process it in a safe order.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
