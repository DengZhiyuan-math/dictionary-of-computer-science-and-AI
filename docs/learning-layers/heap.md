# Heap

概念编号：`concept:heap` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/heap/)

## 第一层：概念入门 · 知其然

### 定义

二叉最小堆是一种满足局部次序的完全二叉树表示：每个父节点的值不大于孩子，除最后一层外各层填满、末层从左填。它保证根为全局最小，但不保证兄弟或不同子树有完整顺序。插入通过向上调整恢复性质，取最小后通过向下调整恢复，常用于优先队列。

### 概念边界与常见混淆

查任意值不因堆性质自动变成对数时间；它擅长反复访问极值。相同优先级是否稳定需额外序号约定。

### 先看一个例子

数组[1,3,2,8,5]按层存储可表示最小堆：1孩子3和2，3孩子8和5。根1最小，但数组3出现在2前说明它不是排序数组。取出1后以末项补根，再按孩子比较下沉，才能恢复。

### 理解练习

#### 1. 局部

最小堆里每个左孩子都小于右孩子吗？

<details><summary>答案与解释</summary>

不要求，只约束父与孩子关系。

</details>

#### 2. 排序

按内部数组顺序读就是升序吗？

<details><summary>答案与解释</summary>

不是，例中3在2前；需反复取最小或另行排序。

</details>

#### 3. 平级

任务同优先级会自动按先到先服务吗？

<details><summary>答案与解释</summary>

不保证，需把到达序号作为比较规则的一部分。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 完全二叉树用数组存储，插入末尾后沿父链上浮以恢复堆序。
2. 高度O(log n)，插入和删除根通常O(log n)，读根O(1)。

### 具体输入与计算步骤

最小堆数组[1,3,2]，插入0。

1. 追加0得[1,3,2,0]，与父3交换成[1,0,2,3]。
2. 再与根1交换得[0,1,2,3]，共2次上浮交换。

计算结果：再与根1交换得[0,1,2,3]，共2次上浮交换。

### 换到实际问题中应用

维护流式数据中最大的3个数。

1. 保留容量3的小顶堆，新值超过根才替换根。
2. 根是当前前三名中最小者，若要有序展示再排序这3项。

应用结论：根是当前前三名中最小者，若要有序展示再排序这3项。

### 举一反三：改变条件后的完整解答

若在[1,3,2]中查3能只看根吗？

<details><summary>变式的推演与答案</summary>

1. 根只保证全局最小，不能确定3在哪个子树。
2. 任意查找最坏O(n)，堆不是搜索树。

任意查找最坏O(n)，堆不是搜索树。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/resources/mit6_006f11_lec04/)

[返回分层目录](00-learning-index.md)
