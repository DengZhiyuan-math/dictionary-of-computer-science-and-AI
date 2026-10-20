# Fast and Slow Pointers

概念编号：`concept:fast-and-slow-pointers` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/fast-and-slow-pointers/)

## 第一层：概念入门 · 知其然

### 它是什么

A fast pointer taking two steps and a slow pointer taking one can find a midpoint or detect a cycle. Without a cycle, the fast pointer reaches null first; with a cycle, the pointers must meet inside it. To find the cycle entry, reset one pointer to the head, then advance both at the same speed. Their next meeting point is the entry. This follows from the relationship between the head-to-entry distance and distances around the cycle.

### 先看一个例子

例子：链 A→B→C→B 形成环。快指针每次两步、慢指针一步；从 A 出发，第一次到 C 与 B，第二次都到 C，因而相遇。相遇是环存在的证据，找环入口还需按算法重新设置指针，不能直接认定 C 是入口。

### 理解练习

用自己的话解释：上面的情景为什么是“Fast and Slow Pointers”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A fast pointer taking two steps and a slow pointer taking one can find a midpoint or detect a cycle. Without a cycle, the fast pointer reaches null first; with a cycle, the pointers must meet inside it. To find the cycle entry, reset one pointer to the head, then advance both at the same speed. Their next meeting point is the entry. This follows from the relationship between the head-to-entry distance and distances around the cycle.

情景依据：例子：链 A→B→C→B 形成环。快指针每次两步、慢指针一步；从 A 出发，第一次到 C 与 B，第二次都到 C，因而相遇。相遇是环存在的证据，找环入口还需按算法重新设置指针，不能直接认定 C 是入口。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

To test whether a linked list is a palindrome, find a midpoint, reverse the second half, and compare corresponding values using constant auxiliary space. Restore the second half if the caller expects the input unchanged. The pointer initialization determines which of the two middle nodes is selected for an even-length list.


### 适用边界与常见误解

The first meeting point is usually not the cycle entry, and null checks remain necessary.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
