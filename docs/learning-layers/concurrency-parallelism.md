# Concurrency / Parallelism

概念编号：`concept:concurrency-parallelism` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/concurrency-parallelism/)

## 第一层：概念入门 · 知其然

### 它是什么

并发让多个任务在同一时期推进；并行让多个任务在同一时刻执行。

### 先看一个例子

任务原耗时10秒，其中2秒必须串行、8秒可并行。

### 理解练习

单核能并发吗？

<details><summary>答案与解释</summary>

可以，在等待或时间片边界切换任务，但不能同时执行多条CPU指令流。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 重叠I/O等待可改善吞吐，不等于增加同时工作的核心。
2. 理想并行时间为串行时间加可并行时间除以核心数。

### 具体输入与计算步骤

任务原耗时10秒，其中2秒必须串行、8秒可并行。

1. 4核理想时间2+8/4=4秒。
2. 加速比10/4=2.5，实际还要加调度及通信开销。

计算结果：加速比10/4=2.5，实际还要加调度及通信开销。

### 换到实际问题中应用

同时调用多个独立查询。

1. 用异步方式重叠等待，设置并发上限防止压垮后端。
2. 纯CPU任务另评估多核并行，测量端到端时间。

应用结论：纯CPU任务另评估多核并行，测量端到端时间。

### 举一反三：改变条件后的完整解答

若串行部分变8秒，4核耗时如何？

<details><summary>变式的推演与答案</summary>

1. 可并行部分只剩2秒，时间8+2/4=8.5秒。
2. 加速比10/8.5≈1.176，串行部分限制收益。

加速比10/8.5≈1.176，串行部分限制收益。

</details>

### 原有解释与进一步例题


### 原理与推演

The basic execution unit of a computer is the CPU, or central processing unit. CPUs are good at logical decisions, sequential execution, and complex control flow. GPUs, or graphics processing units, are good at performing many similar computations at once. Matrix operations in deep learning are highly parallel, making GPUs a major platform for training and inference. A GPU is not faster than a CPU at everything; its advantage depends on suitable workloads and enough data parallelism.

Concurrency means organizing tasks so they can make progress over overlapping periods. Their execution may be interleaved on one core or run in parallel on multiple cores. Parallelism means that computations actually execute simultaneously. Asynchronous execution means that, after starting an operation that may require waiting, the program can do other work and handle the result later. Multithreading and asynchronous execution are not equivalent; an asynchronous program can run on a single thread.


### 适用边界与常见误解

Asynchrony describes waiting and control flow and is not equivalent to parallelism.

### 例题：CPU and GPU: Account for Work That Cannot Speed Up

A program takes 100 seconds. A GPU can accelerate 80 seconds of work by 10×; the other 20 seconds remain unchanged. Initially ignore transfer overhead.

1. The accelerated portion falls from 80 seconds to 8, giving 28 seconds in total.
2. Overall speedup is 100/28≈3.57, not 10.
3. Even eliminating all 80 seconds leaves 20 seconds, limiting speedup to 5×. Real transfers and scheduling also affect the result.

结果：Amdahl’s law shows why an individual kernel’s speedup must be assessed in the context of end-to-end runtime.

易错点：The analysis assumes fixed workload and accelerated fraction. Larger batches or another algorithm can change that fraction and require fresh measurement.

变式：If only 10% of time can be accelerated, what is the limit even at infinite speed?

参考答案：1/0.9≈1.11×.

### 推导与方法参考

- [一手资料](https://pages.cs.wisc.edu/~remzi/OSTEP/)

[返回分层目录](00-learning-index.md)
