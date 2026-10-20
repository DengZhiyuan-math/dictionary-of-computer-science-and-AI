# Quickselect / Top K

概念编号：`concept:quickselect-top-k` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/quickselect-top-k/)

## 第一层：概念入门 · 知其然

### 它是什么

If you want to find the kth largest value, you don't have to sort the entire array. Maintain a min-heap with a size of at most k. The top of the heap is the minimum value among the current retainers, which is the elimination threshold. It is worth replacing only if the new value exceeds the threshold. After scanning, the top of the heap will be the kth largest. The frequencies of the top k high-frequency elements are first counted, and then the same selection is made according to the frequency. The ranking object changes from the numerical value to the frequency of the key.

### 先看一个例子

If you want to find the kth largest value, you don't have to sort the entire array. Maintain a min-heap with a size of at most k. The top of the heap is the minimum value among the current retainers, which is the elimination threshold. It is worth replacing only if the new value exceeds the threshold. After scanning, the top of the heap will be the kth largest. The frequencies of the top k high-frequency elements are first counted, and then the same selection is made according to the frequency. The ranking object changes from the numerical value to the frequency of the key.

### 理解练习

用自己的话解释：上面的情景为什么是“Quickselect / Top K”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：If you want to find the kth largest value, you don't have to sort the entire array. Maintain a min-heap with a size of at most k. The top of the heap is the minimum value among the current retainers, which is the elimination threshold. It is worth replacing only if the new value exceeds the threshold. After scanning, the top of the heap will be the kth largest. The frequencies of the top k high-frequency elements are first counted, and then the same selection is made according to the frequency. The ranking object changes from the numerical value to the frequency of the key.

情景依据：If you want to find the kth largest value, you don't have to sort the entire array. Maintain a min-heap with a size of at most k. The top of the heap is the minimum value among the current retainers, which is the elimination threshold. It is worth replacing only if the new value exceeds the threshold. After scanning, the top of the heap will be the kth largest. The frequencies of the top k high-frequency elements are first counted, and then the same selection is made according to the frequency. The ranking object changes from the numerical value to the frequency of the key.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
