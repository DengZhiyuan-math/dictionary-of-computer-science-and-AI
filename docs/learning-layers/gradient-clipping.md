# Gradient Clipping

概念编号：`concept:gradient-clipping` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/gradient-clipping/)

## 第一层：概念入门 · 知其然

### 它是什么

Gradient clipping limits the magnitude of gradients in an update. Norm-based clipping commonly rescales the whole gradient when its norm is too large, preserving its overall direction; value-based clipping bounds individual components. This differs from reducing the learning rate: clipping targets unusually large gradients, whereas the learning rate sets the overall scale of updates. Excessive clipping can slow learning. It cannot compensate for incorrect labels or a faulty loss implementation.

### 先看一个例子

例子：梯度向量为 (3,4)，范数为 5，最大范数阈值为 2，则统一缩放为 (1.2,1.6)。这是保留方向的范数裁剪；把每个坐标分别截到 2 得到 (2,2)，属于另一种规则，方向已经改变。

### 理解练习

用自己的话解释：上面的情景为什么是“Gradient Clipping”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Gradient clipping limits the magnitude of gradients in an update. Norm-based clipping commonly rescales the whole gradient when its norm is too large, preserving its overall direction; value-based clipping bounds individual components. This differs from reducing the learning rate: clipping targets unusually large gradients, whereas the learning rate sets the overall scale of updates. Excessive clipping can slow learning. It cannot compensate for incorrect labels or a faulty loss implementation.

情景依据：例子：梯度向量为 (3,4)，范数为 5，最大范数阈值为 2，则统一缩放为 (1.2,1.6)。这是保留方向的范数裁剪；把每个坐标分别截到 2 得到 (2,2)，属于另一种规则，方向已经改变。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Gradient clipping limits the magnitude of gradients in an update. Norm-based clipping commonly rescales the whole gradient when its norm is too large, preserving its overall direction; value-based clipping bounds individual components. This differs from reducing the learning rate: clipping targets unusually large gradients, whereas the learning rate sets the overall scale of updates. Excessive clipping can slow learning. It cannot compensate for incorrect labels or a faulty loss implementation.


### 例子

例子：梯度向量为 (3,4)，范数为 5，最大范数阈值为 2，则统一缩放为 (1.2,1.6)。这是保留方向的范数裁剪；把每个坐标分别截到 2 得到 (2,2)，属于另一种规则，方向已经改变。


### 适用边界与常见误解

With gradient scaling, normally unscale before clipping.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
