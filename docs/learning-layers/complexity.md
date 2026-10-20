# Complexity

概念编号：`concept:complexity` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/complexity/)

## 第一层：概念入门 · 知其然

### 定义

算法复杂度在指定计算模型下，描述输入规模增长时所需操作或存储怎样增长。时间复杂度计工作量，空间复杂度计存储；O记号给渐近上界，Θ给同阶界，并需说明最坏、平均或摊还口径。它抽离具体硬件常数，帮助比较规模趋势，不直接等于秒数。

### 概念边界与常见混淆

O(n²)也是某线性算法的宽松上界，所以“有一个上界”不同于精确阶。输入编码长度、额外空间是否包括输入与输出都需明示。

### 先看一个例子

遍历n项求和需约n次访问；枚举全部不同位置对有n(n−1)/2对。n从100增到1000，前者工作约十倍，后者约百倍。真实耗时还受实现、缓存和常数影响，规模较小时同阶趋势不决定谁快。

### 理解练习

#### 1. 常数

O(n)程序对所有n都比O(n log n)快吗？

<details><summary>答案与解释</summary>

不是，常数和实现可使小规模反转，渐近趋势只约束足够大时的增长。

</details>

#### 2. 口径

哈希平均常数时间就等于最坏常数吗？

<details><summary>答案与解释</summary>

不等于，需要区别输入分布与碰撞等最坏情形。

</details>

#### 3. 规模

n=1000的两重全配对只有1000步吗？

<details><summary>答案与解释</summary>

不是，无序不同对为499500，规模应按组合数量而非输入项数直接计。

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
