# GPU Coalescing / Scan / Reduction

概念编号：`concept:gpu-parallel-algorithms` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/gpu-parallel-algorithms/)

## 第一层：概念入门 · 知其然

### 它是什么

Coalescing groups neighboring lane accesses into memory transactions. Under the stated 32-byte segment model, 32 aligned four-byte contiguous loads touch four segments; a one-word shift touches five.

### 先看一个例子

例子：32 个线程读取连续、对齐的四字节元素，共 128 字节，在简化的 32 字节段模型下触及 4 段。整体错开四字节可能触及 5 段；真实硬件还需核对事务与缓存规则，不能把这个教学段数当所有 GPU 的固定性能倍数。

### 理解练习

用自己的话解释：上面的情景为什么是“GPU Coalescing / Scan / Reduction”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Coalescing groups neighboring lane accesses into memory transactions. Under the stated 32-byte segment model, 32 aligned four-byte contiguous loads touch four segments; a one-word shift touches five.

情景依据：例子：32 个线程读取连续、对齐的四字节元素，共 128 字节，在简化的 32 字节段模型下触及 4 段。整体错开四字节可能触及 5 段；真实硬件还需核对事务与缓存规则，不能把这个教学段数当所有 GPU 的固定性能倍数。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A work-efficient exclusive scan has O(n) work and O(log n) dependency depth. A reduction combines inputs into a total. Participation masks and synchronization are part of correctness; floating-point results can change with the reduction tree.


### 适用边界与常见误解

Operation count and dependency depth do not predict GPU wall time. Transaction rules depend on architecture, and warp masks do not supply values for absent lanes.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
