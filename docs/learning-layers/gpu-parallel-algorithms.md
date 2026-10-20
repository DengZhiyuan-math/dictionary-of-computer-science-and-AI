# GPU Coalescing / Scan / Reduction

概念编号：`concept:gpu-parallel-algorithms` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/gpu-parallel-algorithms/)

## 第一层：概念入门 · 知其然

### 它是什么

GPU并行算法把工作分给许多线程，还须安排内存访问和同步，不能只数乘加次数。

### 先看一个例子

32个线程各读连续4字节，首地址按32字节段对齐，假定按该段模型计数。

### 理解练习

线程多就一定内存访问高效吗？

<details><summary>答案与解释</summary>

不一定，散乱地址会触及更多内存段。

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
