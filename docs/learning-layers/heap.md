# Heap

概念编号：`concept:heap` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/heap/)

## 第一层：概念入门 · 知其然

### 它是什么

A tree is a hierarchical structure. Each node in a binary tree has at most two children. A binary search tree uses ordering to support search. AVL trees and red-black trees are balanced binary search trees that avoid excessive depth. A heap is another tree-based structure: rather than sorting all elements completely, it makes the minimum or maximum easy to retrieve. A priority queue, often implemented with a heap, schedules the most urgent task.

### 先看一个例子

Find the two largest values in [9,1,7,3,8]. First clarify whether output must be ordered, input may be modified, and data arrives continuously.
A heap suits streaming updates: time O(n log k), auxiliary space O(k). Quickselect suits mutable static data. The constraints determine the choice.

### 理解练习

Data keeps arriving and Top K must be available at any time. What should be considered first?

<details><summary>答案与解释</summary>

A fixed-size heap is usually convenient for incremental maintenance. Also discuss costs when k is close to n and the overhead of returning sorted results.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A tree is a hierarchical structure. Each node in a binary tree has at most two children. A binary search tree uses ordering to support search. AVL trees and red-black trees are balanced binary search trees that avoid excessive depth. A heap is another tree-based structure: rather than sorting all elements completely, it makes the minimum or maximum easy to retrieve. A priority queue, often implemented with a heap, schedules the most urgent task.


### 适用边界与常见误解

A heap is not totally ordered; its underlying array is not a sorted result.

### 例题：Top K: Let Requirements Determine the Algorithm

Find the two largest values in [9,1,7,3,8]. First clarify whether output must be ordered, input may be modified, and data arrives continuously.

1. Keep a min-heap of size 2, whose root is the current second-largest value. Reading 9 and 1 gives {1,9}; 7 replaces 1, 3 is ignored, and 8 replaces 7.
2. The retained values are {8,9}. Descending output still requires sorting those two results.
3. A static array can instead use quickselect to find the boundary in average O(n) time. It rearranges the array, leaves the selected region unsorted, and its worst case depends on pivot selection.

结果：A heap suits streaming updates: time O(n log k), auxiliary space O(k). Quickselect suits mutable static data. The constraints determine the choice.

易错点：“Quickselect is faster than sorting” is incomplete without average versus worst-case cost, output ordering and input mutation requirements.

变式：Data keeps arriving and Top K must be available at any time. What should be considered first?

参考答案：A fixed-size heap is usually convenient for incremental maintenance. Also discuss costs when k is close to n and the overhead of returning sorted results.

### 例题：Dijkstra: Why Old Distances Remain in the Queue

Directed edges are A→B=5, A→C=1, C→B=1, B→D=2 and C→D=7. Start from A.

1. After A, candidates are B=5 and C=1. Processing C first improves B to 2 and D to 8.
2. Processing the new B=2 improves D to 4. Old entries B=5 and D=8 may still be queued.
3. Next process D=4. When B=5 is popped, skip it because it differs from current dist[B]=2. Likewise skip D=8.

结果：Distances are A=0, C=1, B=2, D=4. The shortest route to D is A-C-B-D.

易错点：The demo sorts a small list to display candidates; it is not an efficient heap implementation. Heap complexity bounds do not describe that display container.

变式：If C→B=-4 is allowed, does the same nonnegative-weight proof apply?

参考答案：No. Negative edges may lower a finalized distance. Choose another method according to the constraints.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
