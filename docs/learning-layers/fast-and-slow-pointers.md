# Fast and Slow Pointers

概念编号：`concept:fast-and-slow-pointers` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/fast-and-slow-pointers/)

## 第一层：概念入门 · 知其然

### 它是什么

快慢指针以不同速度走链表，用相遇判断环，或定位中点。

### 先看一个例子

三节点环A→B→C→A，两指针从A出发。

### 理解练习

有环时快指针会永远错过慢指针吗？

<details><summary>答案与解释</summary>

不会，每轮相对前进一格，最终相遇。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 慢每次1步、快2步，入环后相对位置每轮增加1模环长。
2. 无环时快指针先到空，读取快指针的下一跳前要检查非空。

### 具体输入与计算步骤

三节点环A→B→C→A，两指针从A出发。

1. 第1轮慢B、快C；第2轮慢C、快B。
2. 第3轮两者都在A，确认环，历经3轮。

计算结果：第3轮两者都在A，确认环，历经3轮。

### 换到实际问题中应用

判断链式任务引用是否循环。

1. 用快慢指针先检测相遇，避免额外保存全部访问节点。
2. 需找入口时一指针回起点，另一留相遇处，同速前进至再次相遇。

应用结论：需找入口时一指针回起点，另一留相遇处，同速前进至再次相遇。

### 举一反三：改变条件后的完整解答

四节点无环链A→B→C→D时会怎样？

<details><summary>变式的推演与答案</summary>

1. 两轮后慢在C，快到空。
2. 判定无环；这个约定下慢指向偶数长度的后一个中点。

判定无环；这个约定下慢指向偶数长度的后一个中点。

</details>

### 原有解释与进一步例题


### 原理与推演

A fast pointer taking two steps and a slow pointer taking one can find a midpoint or detect a cycle. Without a cycle, the fast pointer reaches null first; with a cycle, the pointers must meet inside it. To find the cycle entry, reset one pointer to the head, then advance both at the same speed. Their next meeting point is the entry. This follows from the relationship between the head-to-entry distance and distances around the cycle.

To test whether a linked list is a palindrome, find a midpoint, reverse the second half, and compare corresponding values using constant auxiliary space. Restore the second half if the caller expects the input unchanged. The pointer initialization determines which of the two middle nodes is selected for an even-length list.


### 例子

例子：链 A→B→C→B 形成环。快指针每次两步、慢指针一步；从 A 出发，第一次到 C 与 B，第二次都到 C，因而相遇。相遇是环存在的证据，找环入口还需按算法重新设置指针，不能直接认定 C 是入口。


### 适用边界与常见误解

The first meeting point is usually not the cycle entry, and null checks remain necessary.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
