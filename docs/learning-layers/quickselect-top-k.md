# Quickselect / Top K

概念编号：`concept:quickselect-top-k` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/quickselect-top-k/)

## 第一层：概念入门 · 知其然

### 定义

快速选择在数组中寻找给定排名的元素，不要求完整排序。它选一个枢轴，把较小与较大元素分到两侧，再只处理含目标排名的一侧。Top-k 则可能要求最大的k项、其集合或有序列表，输出要求必须明确；找到第k项边界并不自动把这k项排好序。

### 概念边界与常见混淆

随机或适当枢轴通常有良好平均效率，朴素选枢轴可能最坏退化。重复值、从零还是从一计排名、是否允许修改原数组都需约定。

### 先看一个例子

数组[7,2,5,1,9]求第三小，取5作枢轴后两侧为[2,1]与[7,9]，5恰是第三小。左右内部无需有序。若要求最小三项升序返回，仍需把[2,1,5]排序成[1,2,5]。

### 理解练习

#### 1. 部分排序

找到第三小后，前面两项一定从小到大吗？

<details><summary>答案与解释</summary>

不一定，只需它们不大于边界；完整顺序是额外要求。

</details>

#### 2. 排名

[1,1,2]第二小按重复项计是什么？

<details><summary>答案与解释</summary>

是1，不是第二种不同值2；不同值排名是另一问题。

</details>

#### 3. 效率

每次枢轴总是最小值，目标在另一端，会有什么后果？

<details><summary>答案与解释</summary>

每次只排除一项，累计可能近似平方工作量，不能无条件称线性。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 以枢轴把较小、相等、较大元素分开，根据目标排名决定下一侧。
2. 随机枢轴通常有期望O(n)，不良划分可退化O(n²)。

### 具体输入与计算步骤

数组[4,1,3,2]，找第2小值。

1. 以3为枢轴得到小侧[1,2]、等侧[3]、大侧[4]。
2. 第2小位于小侧，再划分得到2，不必排序整个数组。

计算结果：第2小位于小侧，再划分得到2，不必排序整个数组。

### 换到实际问题中应用

取海量分数中的前100名。

1. 用选择划定100名边界，再只排序保留部分以显示排名。
2. 若流式输入需固定内存，可改用容量100的小顶堆。

应用结论：若流式输入需固定内存，可改用容量100的小顶堆。

### 举一反三：改变条件后的完整解答

若数组[2,2,2,3]找第2小，如何防重复值导致死循环？

<details><summary>变式的推演与答案</summary>

1. 三路划分给出相等区[2,2,2]，覆盖排名1至3。
2. 目标落在等区，直接返回2，不再递归相同区间。

目标落在等区，直接返回2，不再递归相同区间。

</details>

### 原有解释与进一步例题


### 原理与推演

If you want to find the kth largest value, you don't have to sort the entire array. Maintain a min-heap with a size of at most k. The top of the heap is the minimum value among the current retainers, which is the elimination threshold. It is worth replacing only if the new value exceeds the threshold. After scanning, the top of the heap will be the kth largest. The frequencies of the top k high-frequency elements are first counted, and then the same selection is made according to the frequency. The ranking object changes from the numerical value to the frequency of the key.

The heap only guarantees the extreme value at the top of the heap, and does not guarantee the overall ordering of the internal array. Here, the kth largest number of elements is counted, and repeated values still account for multiple rankings; the top k high-frequency objects are different keys and must be distinguished.


### 适用边界与常见误解

Quickselect usually modifies input. Randomized versions have expected linear but worst-case quadratic time.

### 例题：Top K: Let Requirements Determine the Algorithm

Find the two largest values in [9,1,7,3,8]. First clarify whether output must be ordered, input may be modified, and data arrives continuously.

1. Keep a min-heap of size 2, whose root is the current second-largest value. Reading 9 and 1 gives {1,9}; 7 replaces 1, 3 is ignored, and 8 replaces 7.
2. The retained values are {8,9}. Descending output still requires sorting those two results.
3. A static array can instead use quickselect to find the boundary in average O(n) time. It rearranges the array, leaves the selected region unsorted, and its worst case depends on pivot selection.

结果：A heap suits streaming updates: time O(n log k), auxiliary space O(k). Quickselect suits mutable static data. The constraints determine the choice.

易错点：“Quickselect is faster than sorting” is incomplete without average versus worst-case cost, output ordering and input mutation requirements.

变式：Data keeps arriving and Top K must be available at any time. What should be considered first?

参考答案：A fixed-size heap is usually convenient for incremental maintenance. Also discuss costs when k is close to n and the overhead of returning sorted results.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
