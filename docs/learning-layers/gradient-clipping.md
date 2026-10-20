# Gradient Clipping

概念编号：`concept:gradient-clipping` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/gradient-clipping/)

## 第一层：概念入门 · 知其然

### 它是什么

梯度裁剪限制单次梯度的大小，减少异常大更新，但不能修复所有训练问题。

### 先看一个例子

梯度向量(3,4)，全局范数阈值2。

### 理解练习

范数裁剪会分别把每项截为2吗？

<details><summary>答案与解释</summary>

不会，它统一缩放整个向量，尽量保持方向。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 计算总范数r=√Σgᵢ²；若r>c，乘c/r。
2. 缩放后范数为c，未超阈值则不变。

### 具体输入与计算步骤

梯度向量(3,4)，全局范数阈值2。

1. 原范数√(9+16)=5，缩放因子2/5=0.4。
2. 裁剪后(1.2,1.6)，范数2；η=0.1的更新范数0.2。

计算结果：裁剪后(1.2,1.6)，范数2；η=0.1的更新范数0.2。

### 换到实际问题中应用

循环模型出现偶发梯度爆炸。

1. 反向后、优化器更新前做全局范数裁剪，并记录被裁剪比例。
2. 混合精度先反缩放梯度，再裁剪，防止阈值作用于放大后的数值。

应用结论：混合精度先反缩放梯度，再裁剪，防止阈值作用于放大后的数值。

### 举一反三：改变条件后的完整解答

阈值改为10时会怎样？

<details><summary>变式的推演与答案</summary>

1. 原范数5未超过10。
2. 梯度保持(3,4)，不会被强制放大到范数10。

梯度保持(3,4)，不会被强制放大到范数10。

</details>

### 原有解释与进一步例题


### 原理与推演

Gradient clipping limits the magnitude of gradients in an update. Norm-based clipping commonly rescales the whole gradient when its norm is too large, preserving its overall direction; value-based clipping bounds individual components. This differs from reducing the learning rate: clipping targets unusually large gradients, whereas the learning rate sets the overall scale of updates. Excessive clipping can slow learning. It cannot compensate for incorrect labels or a faulty loss implementation.


### 例子

例子：梯度向量为 (3,4)，范数为 5，最大范数阈值为 2，则统一缩放为 (1.2,1.6)。这是保留方向的范数裁剪；把每个坐标分别截到 2 得到 (2,2)，属于另一种规则，方向已经改变。


### 适用边界与常见误解

With gradient scaling, normally unscale before clipping.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/nn.html)

[返回分层目录](00-learning-index.md)
