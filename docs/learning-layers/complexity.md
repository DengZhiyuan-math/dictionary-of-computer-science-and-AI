# Complexity

概念编号：`concept:complexity` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/complexity/)

## 第一层：概念入门 · 知其然

### 它是什么

复杂度描述输入规模增加时，算法消耗的时间或存储如何增长。它关心增长趋势，而不是某次运行恰好用了几毫秒。

### 先看一个例子

查名单时，逐个找可能需要检查整张名单；按位置直接取第十项则不必从头找。名单变长后，两种工作的增长方式不同。

### 理解练习

一段 O(n) 程序在一次测试中比 O(n²) 慢，能否据此否定复杂度分析？

<details><summary>答案与解释</summary>

不能。常数、实现和输入规模都影响实际用时。复杂度比较的是在所声明模型下随规模增长的趋势。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

An algorithm is a sequence of clear steps for solving a problem. Time complexity describes how computational cost grows with input size; space complexity describes how memory requirements grow. Big O notation primarily concerns growth rates, rather than the actual number of seconds on a particular computer. Better theoretical complexity does not guarantee faster execution on every small input.


### 适用边界与常见误解

Loop nesting alone does not determine complexity; include data-structure operations and output size.

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
