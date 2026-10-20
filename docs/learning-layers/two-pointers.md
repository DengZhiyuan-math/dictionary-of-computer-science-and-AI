# Two Pointers

概念编号：`concept:two-pointers` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/two-pointers/)

## 第一层：概念入门 · 知其然

### 它是什么

双指针用两个位置协同缩小搜索范围，适合有排序或结构约束的问题。

### 先看一个例子

有序数组[1,2,4,7]，找和为9的两个数。

### 理解练习

和太小时为什么可移动左指针？

<details><summary>答案与解释</summary>

当前左值配任何更小右值都不够大，因此可排除它。

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
