# In-place Marking

概念编号：`concept:in-place-marking` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/in-place-marking/)

## 第一层：概念入门 · 知其然

### 定义

原地标记是在处理数组时，把“访问过、已归类”等辅助状态编码回原数组，而不是另建同样大小的状态表。它依赖输入允许修改，以及原值能与标记区分；常用符号变化、加固定偏移或交换位置，但每种编码都有适用范围。原地不等于没有任何辅助变量，而是额外空间不随输入长度增长。

### 概念边界与常见混淆

若原数据可含负数或零，上述符号编码不再直接适用。调用者仍需原输入时，必须恢复标记或明确使用副本；省额外空间可能以修改输入为代价。

### 先看一个例子

输入长度 4、值都在 1 到 4 内的 [2,3,2,1]。读取值 2 后，把对应第二位置的值变负；再读取值 3，把第三位置变负。读取第三项时取绝对值得到原值 2，看到第二位置已经为负，说明 2 曾出现过。负号记录的是对应值的出现状态，而不是原输入真的含负数。

### 理解练习

#### 1. 索引范围

长度 4 却允许值 10，还能直接按值定位标记吗？

<details><summary>答案与解释</summary>

不能，会越界。值到位置的映射依赖给定范围，应先验证或换编码。

</details>

#### 2. 读取原值

第三项已变成 −2，为什么仍按 2 处理？

<details><summary>答案与解释</summary>

本例原值全正，负号只表示状态，取绝对值恢复原含义；直接使用负值会破坏索引规则。

</details>

#### 3. 接口约定

函数不说明会修改输入，调用者之后继续用原数组，有什么问题？

<details><summary>答案与解释</summary>

调用者会读到标记而非原数据。正确性应包含输入是否保留的约定，不能只检查函数返回值。

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
