# Fast and Slow Pointers

概念编号：`concept:fast-and-slow-pointers` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/fast-and-slow-pointers/)

## 第一层：概念入门 · 知其然

### 定义

快慢指针让两个位置标记沿同一结构以不同速度移动，用相对位置判断结构性质。链表每个节点指向下一节点；若某个后继指回先前节点，就存在环。每轮慢指针走一步、快指针走两步：无环时快指针最终到空；有环且持续移动时，两者最终进入同一环并相遇。相遇节点不一定是环入口。

### 概念边界与常见混淆

不能只比较节点保存的数值来判相遇，两个不同节点可以值相同。快指针走两步前要检查后继是否存在；空表和偶数长度中点也要有明确约定。

### 先看一个例子

链为 A→B→C→D→B，环长为 3。从 A 开始，第一轮慢到 B、快到 C；第二轮慢到 C、快到 B；第三轮两者都到 D。相遇说明存在环，但入口实际是 B。若只要找中点，在无环链表中快指针到尾时慢指针大约到中部，这是另一种任务。

### 理解练习

#### 1. 相遇与入口

上例在 D 相遇，能否把 D 直接作为环入口返回？

<details><summary>答案与解释</summary>

不能，入口为 B。相遇检测与入口定位是不同步骤，需要进一步使用距离关系。

</details>

#### 2. 数值与身份

两个节点都存 7，指针分别指向它们就算相遇吗？

<details><summary>答案与解释</summary>

不算。相遇要求指向同一个节点，否则重复值会被误判为环。

</details>

#### 3. 无环结束

快指针到了最后节点，还能不检查就连续走两步吗？

<details><summary>答案与解释</summary>

不能，应检查当前节点及下一链接；到空说明这条链没有检测到环，不能继续解引用。

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
