# Amortized Analysis

概念编号：`concept:amortized-analysis` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/amortized-analysis/)

## 第一层：概念入门 · 知其然

### 单次成本与一串操作的成本

分析数据结构时，需要先约定计价单位，例如把写入一个元素或复制一个元素各算一次操作。单次最坏成本问某一次可能多贵；摊还分析则问从指定初始状态出发，一串合法操作总共会花多少成本。


### 定义

摊还分析是通过约束操作序列的总成本，得到每次操作分摊成本上界的分析方法。它可以给出对所有合法序列成立的保证，不需要把输入看成随机抽样，也不意味着每一次实际耗时都等于这个分摊值。

### 理解定义中的术语与关系

#### 偶尔扩容为何不等于每次都复制

动态数组把元素放在一块可容纳若干项的存储区。追加时若还有空位，只需写入新项；满了就申请更大空间并复制旧项。每次容量翻倍意味着下一次昂贵复制前，已经允许许多次便宜追加。证明摊还成本时要利用这种序列约束，不能只把一次昂贵操作乘以总次数。

### 概念边界与常见混淆

摊还界不能直接用于保证一次请求的响应时限。若单次复制尖峰不可接受，需要预留空间、分块存储或其他实现安排，另行分析其代价。

### 先看一个例子

从容量为一的空数组开始，连续追加四项，容量满时翻倍。四次新项写入共花四个单位；加入第二项时复制一项，加入第三项时复制两项，总成本为七。第四次追加并不复制任何旧项，尽管第三次比较昂贵。这里只计算元素写入和复制，没有把内存申请的真实耗时当成常数实测值。

### 理解练习

#### 1. 摊还是否需要随机输入

如果追加的值全部相同，翻倍数组的摊还分析还成立吗？

<details><summary>答案与解释</summary>

成立。在这个计价模型中，复制次数取决于容量和追加次数，而非值的随机性。摊还分析与随机输入下的期望成本是不同的保证。

</details>

#### 2. 从总成本能推出什么

四次追加总成本七，能否保证其中每次都不超过两个单位？

<details><summary>答案与解释</summary>

不能。第三次需要复制两项再写入新项，成本是三。平均分摊少，不排除某次实际成本高。

</details>

#### 3. 更换扩容规则

如果每次只多申请一个空位，仍能直接沿用翻倍扩容的结论吗？

<details><summary>答案与解释</summary>

不能。这样几乎每次追加都需复制已有元素，前四次的复制量成为零、一、二、三，之后持续累积。应重新分析整串成本，而不是只看到“都是扩容”。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 扩容复制量形成1+2+4+…的几何级数，小于最终容量的两倍。
2. n次普通写入加O(n)复制，总O(n)，因此每次摊还O(1)，不需要随机假设。

### 具体输入与计算步骤

动态数组初始容量1，满时翻倍，连续追加4项，计写入和旧元素复制。

1. 4次写入成本4，第二项扩容复制1，第三项扩容复制2。
2. 总成本4+1+2=7，平均7/4=1.75个计价操作。

计算结果：总成本4+1+2=7，平均7/4=1.75个计价操作。

### 换到实际问题中应用

选择增长型消息缓存的数组策略。

1. 使用几何扩容减少反复复制，并评估扩容时峰值内存与延迟。
2. 若严格单次延迟预算不容扩容尖峰，应预分配或分块，而非把摊还界当延迟保证。

应用结论：若严格单次延迟预算不容扩容尖峰，应预分配或分块，而非把摊还界当延迟保证。

### 举一反三：改变条件后的完整解答

继续追加到8项，总成本多少？

<details><summary>变式的推演与答案</summary>

1. 8次写入，加扩容复制1+2+4=7。
2. 总15，平均15/8=1.875，虽第5项很贵但整串仍线性。

总15，平均15/8=1.875，虽第5项很贵但整串仍线性。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/mit6_006f11_lec09/)

[返回分层目录](00-learning-index.md)
