# Amortized Analysis

概念编号：`concept:amortized-analysis` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/amortized-analysis/)

## 第一层：概念入门 · 知其然

### 它是什么

摊还分析把一串操作的总成本分摊，说明偶尔昂贵不代表每次都昂贵。

### 先看一个例子

动态数组初始容量1，满时翻倍，连续追加4项，计写入和旧元素复制。

### 理解练习

摊还常数代表每次追加最坏也常数吗？

<details><summary>答案与解释</summary>

不代表，扩容那次仍需复制很多元素。

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
