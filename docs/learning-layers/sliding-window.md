# Sliding Window

概念编号：`concept:sliding-window` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sliding-window/)

## 第一层：概念入门 · 知其然

### 它是什么

The sliding window maintains a contiguous interval, allowing the right end to incorporate new elements, the left end to remove old elements, and incrementally update status such as frequency. First define when the current range is legal, and then decide when to shrink. In the longest substring without repeated characters, once a new character causes repetition, the window will continue to be narrowed until there are no more repetitions, and then the maximum length will be updated.

### 先看一个例子

For example, on the second b in abba, move left past both the leading a and the first b; removing just one character is insufficient. If using last-seen indices, set left to the maximum of its current value and the repeated character’s previous index plus one. This prevents left from moving backward at the final a.

### 理解练习

用自己的话解释：上面的情景为什么是“Sliding Window”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：The sliding window maintains a contiguous interval, allowing the right end to incorporate new elements, the left end to remove old elements, and incrementally update status such as frequency. First define when the current range is legal, and then decide when to shrink. In the longest substring without repeated characters, once a new character causes repetition, the window will continue to be narrowed until there are no more repetitions, and then the maximum length will be updated.

情景依据：For example, on the second b in abba, move left past both the leading a and the first b; removing just one character is insufficient. If using last-seen indices, set left to the maximum of its current value and the repeated character’s previous index plus one. This prevents left from moving backward at the final a.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
