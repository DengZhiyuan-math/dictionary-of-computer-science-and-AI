# CPU / GPU

概念编号：`concept:cpu-gpu` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cpu-gpu/)

## 第一层：概念入门 · 知其然

### 它是什么

CPU 和 GPU 都执行计算。CPU 擅长处理分支多、步骤变化大的任务；GPU 擅长让大量执行单元同时做类似的运算。

### 先看一个例子

把计算想成厨房：主厨处理点单、调整步骤；很多帮厨同时切同样大小的土豆。这个比喻对应不同的分工，不表示 GPU 可以自动把任何程序变快。

### 理解练习

只有一道菜、步骤还必须一道接一道，增加一百个帮厨就一定更快吗？

<details><summary>答案与解释</summary>

不一定。可以同时进行的工作不足时，额外的人需要等待，协调也有成本。GPU 的优势依赖足够多、适合并行的工作。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
