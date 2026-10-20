# Complexity

概念编号：`concept:complexity` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/complexity/)

## 第一层：概念入门 · 知其然

### 它是什么

复杂度描述输入变大时工作量与存储如何增长，不能直接当作真实秒数。

### 先看一个例子

循环i从1到4，每轮内循环运行i次。

### 理解练习

两层循环一定是n²次操作吗？

<details><summary>答案与解释</summary>

不一定，要把每轮实际次数相加。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 此循环总次数Σi=n(n+1)/2，主导项是n²/2，所以Θ(n²)。
2. 时间、辅助空间与输出空间应分开，哈希的期望界与最坏界也需区别。

### 具体输入与计算步骤

循环i从1到4，每轮内循环运行i次。

1. n=4时次数1+2+3+4=10。
2. n=8时36次，增长3.6倍；渐近二次不代表每次翻倍恰好4倍。

计算结果：n=8时36次，增长3.6倍；渐近二次不代表每次翻倍恰好4倍。

### 换到实际问题中应用

评估返回所有数对的接口能否扩容。

1. 先计算输出对数n(n−1)/2，再分析生成与序列化成本。
2. 即使内部查找O(1)，输出本身仍需Ω(n²)工作与相应传输。

应用结论：即使内部查找O(1)，输出本身仍需Ω(n²)工作与相应传输。

### 举一反三：改变条件后的完整解答

若内层指针全程只前进n次而不是每轮重置，还是二次吗？

<details><summary>变式的推演与答案</summary>

1. 把全程内层操作相加只有n次，外层也n次。
2. 总量O(n)，不能只看语法上有两层循环。

总量O(n)，不能只看语法上有两层循环。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
