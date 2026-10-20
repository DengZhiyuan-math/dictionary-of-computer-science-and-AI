# Amortized Analysis

概念编号：`concept:amortized-analysis` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/amortized-analysis/)

## 第一层：概念入门 · 知其然

### 它是什么

Worst-case analysis focuses on the most expensive case among allowed inputs; expectation analysis must explain whether the randomness comes from the algorithm or the input model; amortized analysis allocates the total cost of a series of operations to each operation and does not require random inputs.

### 先看一个例子

Initial capacity is 1 and doubles when full. Append 8 elements, ignoring allocator overhead.
With geometric capacity growth, a geometric series bounds n appends by O(n) total work, giving O(1) amortized cost per append.

### 理解练习

Can old storage be ignored immediately during growth?

<details><summary>答案与解释</summary>

No. Old and new arrays can coexist during copying. Analyze peak memory and reclamation separately.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Worst-case analysis focuses on the most expensive case among allowed inputs; expectation analysis must explain whether the randomness comes from the algorithm or the input model; amortized analysis allocates the total cost of a series of operations to each operation and does not require random inputs.


### 适用边界与常见误解

Amortized analysis is not expected analysis over random inputs and does not make every operation cheap.

### 例题：Dynamic Arrays: Amortizing Expensive Growth

Initial capacity is 1 and doubles when full. Append 8 elements, ignoring allocator overhead.

1. Growing to capacities 2,4,8 copies 1,2,4 existing elements respectively: 7 copies in total.
2. Eight writes plus seven copies give 15 units of work. One append can be expensive, but total work is still proportional to 8.
3. A ninth append grows capacity to 16 and copies 8 elements. Total copies become 15 and total work 24, still below 3×9.

结果：With geometric capacity growth, a geometric series bounds n appends by O(n) total work, giving O(1) amortized cost per append.

易错点：Amortized O(1) does not mean worst-case O(1) for every append. Growing by one slot each time instead copies 1+2+…+(n-1) elements.

变式：Can old storage be ignored immediately during growth?

参考答案：No. Old and new arrays can coexist during copying. Analyze peak memory and reclamation separately.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
