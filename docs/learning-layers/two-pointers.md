# Two Pointers

概念编号：`concept:two-pointers` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/two-pointers/)

## 第一层：概念入门 · 知其然

### 它是什么

Two pointers maintain two positions in a sequence and move them according to a task-specific invariant. The technique is useful when movements eliminate possibilities without requiring a restart.

### 先看一个例子

For sorted [1,2,4,7] and target 6, endpoints sum to 8, so move the right pointer to 4. The sum becomes 5, so advance left to 2 and find 2+4=6. The same elimination is not valid on an unsorted array.

### 理解练习

用自己的话解释：上面的情景为什么是“Two Pointers”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Two pointers maintain two positions in a sequence and move them according to a task-specific invariant. The technique is useful when movements eliminate possibilities without requiring a restart.

情景依据：For sorted [1,2,4,7] and target 6, endpoints sum to 8, so move the right pointer to 4. The sum becomes 5, so advance left to 2 and find 2+4=6. The same elimination is not valid on an unsorted array.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For target-sum search in a sorted array, use left and right endpoints. If their sum is too small, advance left; if too large, decrease right. Sorting supplies the monotonicity needed to discard pairs. Each pointer moves at most n times.


### 适用边界与常见误解

Two indices are not a proof; justify moves using ordering, bounds, or another elimination argument.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
