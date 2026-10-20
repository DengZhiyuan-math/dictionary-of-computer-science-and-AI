# Sliding Window

概念编号：`concept:sliding-window` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sliding-window/)

## 第一层：概念入门 · 知其然

### 它是什么

滑动窗口维护一个连续区间，边界前移时增删少量信息，避免重复扫描。

### 先看一个例子

正数数组[1,2,3,1]，求和至少5的最短连续区间。

### 理解练习

满足条件后为什么还要移动左边界？

<details><summary>答案与解释</summary>

为了缩短区间，直到再缩就不满足。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 正数保证右扩时和不减、左缩时和不增，所以每个边界只需向前。
2. 每项最多加入和移除一次，总时间O(n)。

### 具体输入与计算步骤

正数数组[1,2,3,1]，求和至少5的最短连续区间。

1. 读到3时和为6、长度3；去掉左侧1后和5、长度2。
2. 再去掉2只剩3不满足，最后答案长度2，对应[2,3]。

计算结果：再去掉2只剩3不满足，最后答案长度2，对应[2,3]。

### 换到实际问题中应用

统计最近5分钟事件数。

1. 按时间入队，删除早于当前时间减5分钟的记录。
2. 维护计数并明确时间边界是否包含，避免窗口端点重复。

应用结论：维护计数并明确时间边界是否包含，避免窗口端点重复。

### 举一反三：改变条件后的完整解答

含负数后还能直接用上述最短和窗口吗？

<details><summary>变式的推演与答案</summary>

1. 负数会让右扩降低和、左缩增加和，原单调性失效。
2. 如[1,−1,5]，需采用前缀和配单调队列等适合负数的算法。

如[1,−1,5]，需采用前缀和配单调队列等适合负数的算法。

</details>

### 原有解释与进一步例题


### 原理与推演

The sliding window maintains a contiguous interval, allowing the right end to incorporate new elements, the left end to remove old elements, and incrementally update status such as frequency. First define when the current range is legal, and then decide when to shrink. In the longest substring without repeated characters, once a new character causes repetition, the window will continue to be narrowed until there are no more repetitions, and then the maximum length will be updated.

For example, on the second b in abba, move left past both the leading a and the first b; removing just one character is insufficient. If using last-seen indices, set left to the maximum of its current value and the repeated character’s previous index plus one. This prevents left from moving backward at the final a.


### 适用边界与常见误解

With negative values, interval sums are not monotonic under expansion; positive-array window rules do not apply unchanged.

### 例题：Sliding Window: Shrink Until a Duplicate Is Removed

For the string abcaad, find the longest contiguous substring with no repeated character. Maintain a character set for [left,right].

1. Read a, b and c to form abc of length 3. Before adding the next a, detect the duplicate, remove the leftmost a and advance left to 1.
2. The window becomes bca. The next a is another duplicate. Remove b, c and then a until the old a is gone, then insert the new a.
3. Finally read d. The current window ad has length 2; the best length remains 3. Each character is inserted and removed at most once.

结果：The answer is 3, achieved by abc or bca. Time O(n); set space O(min(n, alphabet size)).

易错点：Advancing left only once may leave an invalid window. A substring must be contiguous; it cannot skip characters in the middle.

变式：What is the answer for aaaa?

参考答案：1. Each new a requires removing the old a from the window.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
