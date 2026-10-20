# CPU / GPU

概念编号：`concept:cpu-gpu` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cpu-gpu/)

## 第一层：概念入门 · 知其然

### 它是什么

CPU善于复杂控制，GPU善于大量相似任务并行计算。

### 先看一个例子

CPU算10毫秒，GPU算1毫秒，传输4毫秒，启动1毫秒。

### 理解练习

GPU计算快10倍意味着整体快10倍吗？

<details><summary>答案与解释</summary>

不意味着，总时间还包括搬运与启动。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 把独立数据分给线程，足够多工作才能利用GPU吞吐。
2. 比较总时间T=传输+启动+计算，而非只比较内核。

### 具体输入与计算步骤

CPU算10毫秒，GPU算1毫秒，传输4毫秒，启动1毫秒。

1. GPU总时间4+1+1=6毫秒。
2. 加速比10/6≈1.67。

计算结果：加速比10/6≈1.67。

### 换到实际问题中应用

部署批量图像模型。

1. 将整批一次传入设备，后续算子尽量留在设备上。
2. 同步后测量真实完成时间，同时报告批吞吐与单请求延迟。

应用结论：同步后测量真实完成时间，同时报告批吞吐与单请求延迟。

### 举一反三：改变条件后的完整解答

小任务CPU0.5毫秒、GPU0.1毫秒，其他开销仍5毫秒呢？

<details><summary>变式的推演与答案</summary>

1. GPU需5.1毫秒。
2. CPU反而约快10.2倍；应减少往返或留在CPU。

CPU反而约快10.2倍；应减少往返或留在CPU。

</details>

### 原有解释与进一步例题


### 为什么会这样

加速受可并行部分限制。还需考虑数据搬运、启动开销、内存访问与工作规模，不能只比较执行单元数量。

Scenario and inputs: A program takes 100 seconds. A GPU can accelerate 80 seconds of work by 10×; the other 20 seconds remain unchanged. Initially ignore transfer overhead.

Step 1: The accelerated portion falls from 80 seconds to 8, giving 28 seconds in total.

Step 2: Overall speedup is 100/28≈3.57, not 10.

Step 3: Even eliminating all 80 seconds leaves 20 seconds, limiting speedup to 5×. Real transfers and scheduling also affect the result.

Result and explanation: Amdahl’s law shows why an individual kernel’s speedup must be assessed in the context of end-to-end runtime.

Pitfalls and limits: The analysis assumes fixed workload and accelerated fraction. Larger batches or another algorithm can change that fraction and require fresh measurement.

Try another condition: If only 10% of time can be accelerated, what is the limit even at infinite speed?

Self-check answer: 1/0.9≈1.11×.


### 适用边界与常见误解

GPUs are not faster for every task.

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

- [一手资料](https://docs.nvidia.com/cuda/cuda-c-programming-guide/)

[返回分层目录](00-learning-index.md)
