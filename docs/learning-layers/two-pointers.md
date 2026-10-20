# Two Pointers

概念编号：`concept:two-pointers` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/two-pointers/)

## 第一层：概念入门 · 知其然

### 定义

双指针用两个位置标记协同处理序列，常见方式为从两端收缩、同向扫描或分隔已处理与未处理区。它是一类组织技巧而非一个自动正确的算法；关键是为什么移动某个指针不会丢掉答案。排序或单调性经常提供这一依据，但不同任务的证明不同。

### 概念边界与常见混淆

无序数组不能直接照搬两端比较。若原始位置有意义，排序还需保留索引。线性扫描成本不包括可能额外的排序成本。

### 先看一个例子

有序数组[1,3,4,6]找和7。两端1+6=7成功；若找和8，1+6=7偏小，只能把左端向右移，因为固定1配任何更左侧右端都不可能超过7。该排除理由依赖已排序。

### 理解练习

#### 1. 移动

和太大为何可减小右端？

<details><summary>答案与解释</summary>

固定右端再增大左端只会不小于当前和；在有序前提下可排除该右端。

</details>

#### 2. 前提

[6,1,4,3]不排序就用该规则可靠吗？

<details><summary>答案与解释</summary>

不可靠，指针移动不再保证值单调，排除论证失效。

</details>

#### 3. 成本

先排序再扫描，能直接称整个算法O(n)吗？

<details><summary>答案与解释</summary>

不能，需加入排序成本，常见比较排序为O(n log n)。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 排序使增大左下标不会降低左值，减小右下标不会提高右值。
2. 每次排除一个已证明无解的端点，最多O(n)次移动。

### 具体输入与计算步骤

有序数组[1,2,4,7]，找和为9的两个数。

1. 初始1+7=8<9，左指针移到2。
2. 2+7=9，返回这两个位置，共两次和比较。

计算结果：2+7=9，返回这两个位置，共两次和比较。

### 换到实际问题中应用

判断忽略标点的字符串是否回文。

1. 左右指针跳过无关字符，比较归一化后的字符。
2. 相等则向内推进，不等立即失败，处理Unicode时先明确字符单位。

应用结论：相等则向内推进，不等立即失败，处理Unicode时先明确字符单位。

### 举一反三：改变条件后的完整解答

未排序数组[4,1,7,2]还能用上述两数和移动规则吗？

<details><summary>变式的推演与答案</summary>

1. 不能，端点大小不再给出可排除范围。
2. 先排序并保留原下标，或用哈希表，不能直接套用排序证明。

先排序并保留原下标，或用哈希表，不能直接套用排序证明。

</details>

### 原有解释与进一步例题


### Definition

Two pointers maintain two positions in a sequence and move them according to a task-specific invariant. The technique is useful when movements eliminate possibilities without requiring a restart.


### Parameters and mechanism

For target-sum search in a sorted array, use left and right endpoints. If their sum is too small, advance left; if too large, decrease right. Sorting supplies the monotonicity needed to discard pairs. Each pointer moves at most n times.


### Example

For sorted [1,2,4,7] and target 6, endpoints sum to 8, so move the right pointer to 4. The sum becomes 5, so advance left to 2 and find 2+4=6. The same elimination is not valid on an unsorted array.


### 适用边界与常见误解

Two indices are not a proof; justify moves using ordering, bounds, or another elimination argument.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
