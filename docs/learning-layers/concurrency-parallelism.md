# Concurrency / Parallelism

概念编号：`concept:concurrency-parallelism` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/concurrency-parallelism/)

## 第一层：概念入门 · 知其然

### 它是什么

并发表示多个任务在重叠的时间段内推进；并行表示多个任务在同一时刻实际执行。

### 先看一个例子

一个厨师轮流照看两口锅，是并发；两个厨师各自同时炒菜，可以是并行。轮流推进并不要求真正同时执行。

### 理解练习

单核处理器在两个程序之间快速切换，属于并发还是一定属于并行？

<details><summary>答案与解释</summary>

属于并发，不能仅凭快速切换认定并行。是否同时执行还要看执行资源与具体任务。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
