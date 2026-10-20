# GPU Coalescing / Scan / Reduction

概念编号：`concept:gpu-parallel-algorithms` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/gpu-parallel-algorithms/)

## 第一层：概念入门 · 知其然

### 任务划分与数据访问

GPU 程序通常把工作写成许多执行实例，每个实例处理某些输入，并保留自己的执行状态，这里称为线程。多个线程可以同时工作，但它们仍要读取数据、保存结果，并在确实依赖他人结果时等待合适的执行顺序。


### 定义

GPU 并行算法是把计算及数据访问组织成适合 GPU 执行资源的协同过程。这里重点区分三件事：归约把多个输入合成一个结果；扫描返回每个位置的前缀结果；连续访存让相关线程尽量读取邻近地址，以便硬件较有效地合并访问。

### 理解定义中的术语与关系

#### 相同数学任务可以有不同执行安排

求总和可先让若干组分别求局部和，再合并。扫描则必须让每个输出得到正确的前缀贡献，不能只返回总和。数据地址安排又是另一件事：计算次数相同，分散读取也可能花更多时间。参与者之间的先后约束必须明确，不能以为启动了许多线程就已经实现正确同步。

### 概念边界与常见混淆

线程数、算术次数、内存访问和实际耗时不是同一个指标。浮点加法改变合并顺序可能改变舍入，某种具体 GPU 的访问段大小也不能被当成所有硬件的定义。

### 先看一个例子

输入二、一、三、四。求和归约只输出十；排他前缀和在每个位置输出此前输入的总和，得到零、二、三、六，首位置用加法单位元零。两者都能用并行协作求解，但输出含义与后续使用方式不同。这个例子采用精确整数运算，并假定不溢出。

### 理解练习

#### 1. 归约与扫描

只得到总和十，是否已经得到了例子的四个排他前缀？

<details><summary>答案与解释</summary>

没有。总和只有一个结果，不能恢复每个位置之前的贡献；扫描要求零、二、三、六这些不同输出。

</details>

#### 2. 相同计算量与访存效率

两个实现都做相同数量加法，一个连续读地址，一个分散读地址，能否断言同样快？

<details><summary>答案与解释</summary>

不能。需要搬运的数据、访问能否合并以及等待都可能不同。数学工作量是分析的一部分，不是完整的硬件时间模型。

</details>

#### 3. 为什么不能只增加线程

某个输出要读其他线程刚写的局部和，多启动一些线程能否代替顺序协调？

<details><summary>答案与解释</summary>

不能。读者仍可能在写入完成前读取。必须安排数据已经生成且可见之后再使用；线程更多不会消除依赖。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 相邻线程读相邻地址可合并访问，事务段数取决于对齐与覆盖范围。
2. 归约或前缀扫描还需同步与参与掩码；浮点加法换树形顺序可能改变舍入。

### 具体输入与计算步骤

32个线程各读连续4字节，首地址按32字节段对齐，假定按该段模型计数。

1. 总字节32×4=128，对齐后覆盖128/32=4个段。
2. 起点偏移4字节后覆盖地址4至131，跨5个段，而非仍4个。

计算结果：起点偏移4字节后覆盖地址4至131，跨5个段，而非仍4个。

### 换到实际问题中应用

实现每批数据的并行前缀和。

1. 采用工作量O(n)、依赖深度O(log n)的扫描结构，核对线程块之间的偏移合并。
2. 对照串行结果与容差，测带宽和真实运行时间，避免只看线程数。

应用结论：对照串行结果与容差，测带宽和真实运行时间，避免只看线程数。

### 举一反三：改变条件后的完整解答

输入[2,1,3,4]的排他扫描与归约分别是什么？

<details><summary>变式的推演与答案</summary>

1. 排他扫描在各位置保存之前元素和，得到[0,2,3,6]。
2. 归约总和10；扫描返回多个前缀，不能用单一总和代替。

归约总和10；扫描返回多个前缀，不能用单一总和代替。

</details>

### 原有解释与进一步例题


### 原理与推演

Coalescing groups neighboring lane accesses into memory transactions. Under the stated 32-byte segment model, 32 aligned four-byte contiguous loads touch four segments; a one-word shift touches five.

A work-efficient exclusive scan has O(n) work and O(log n) dependency depth. A reduction combines inputs into a total. Participation masks and synchronization are part of correctness; floating-point results can change with the reduction tree.


### 例子

例子：32 个线程读取连续、对齐的四字节元素，共 128 字节，在简化的 32 字节段模型下触及 4 段。整体错开四字节可能触及 5 段；真实硬件还需核对事务与缓存规则，不能把这个教学段数当所有 GPU 的固定性能倍数。


### 适用边界与常见误解

Operation count and dependency depth do not predict GPU wall time. Transaction rules depend on architecture, and warp masks do not supply values for absent lanes.

### 推导与方法参考

- [一手资料](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/)

[返回分层目录](00-learning-index.md)
