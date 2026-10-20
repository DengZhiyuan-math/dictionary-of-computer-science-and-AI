# Kadane’s Algorithm

概念编号：`concept:kadane` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kadane/)

## 第一层：概念入门 · 知其然

### 它是什么

Maximum subarray sum can define the state as "the largest non-empty consecutive sum that must end at the current position". The new element is either connected to the previous interval or starts over; choose the larger value between the two, and then use the global answer to record the maximum value among all end points. The state only needs the previous value, so it can be squeezed into constant extra space.

### 先看一个例子

例子：数组 (−2,3,−1,4,−5)，记录“必须在当前位置结束”的最大和，依次为 −2、3、2、6、1，全局最大为 6，对应 (3,−1,4)。递推为 end=max(x,end+x)；若要求非空子数组，全负输入也不能返回空集的 0。

### 理解练习

用自己的话解释：上面的情景为什么是“Kadane’s Algorithm”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Maximum subarray sum can define the state as "the largest non-empty consecutive sum that must end at the current position". The new element is either connected to the previous interval or starts over; choose the larger value between the two, and then use the global answer to record the maximum value among all end points. The state only needs the previous value, so it can be squeezed into constant extra space.

情景依据：例子：数组 (−2,3,−1,4,−5)，记录“必须在当前位置结束”的最大和，依次为 −2、3、2、6、1，全局最大为 6，对应 (3,−1,4)。递推为 end=max(x,end+x)；若要求非空子数组，全负输入也不能返回空集的 0。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

For [-2,3,-1,4], the best sum ending at the final position comes from [3,-1,4]. If every value is negative, choose the largest negative value. Initializing the answer to zero would incorrectly allow an empty subarray.


### 适用边界与常见误解

An all-negative array still needs to return a negative number, which cannot be replaced by an empty interval of zero.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
