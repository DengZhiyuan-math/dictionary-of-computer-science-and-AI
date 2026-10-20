# NaN / Inf / OOM

概念编号：`concept:nan-inf-oom` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/nan-inf-oom/)

## 第一层：概念入门 · 知其然

### 它是什么

NaN是无定义数值，Inf是无穷或溢出，OOM是内存不足；三者原因与处理不同。

### 先看一个例子

float32张量形状(1000,1000)，只算数据占用。

### 理解练习

OOM能靠把NaN替换为0解决吗？

<details><summary>答案与解释</summary>

不能，OOM是资源问题，不是非法数值问题。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 0/0会产生NaN，有限精度中超范围运算可能得到Inf。
2. 内存由元素数、类型及保存状态共同决定，需定位首个异常或分配失败。

### 具体输入与计算步骤

float32张量形状(1000,1000)，只算数据占用。

1. 元素数1000×1000=100万，每个4字节。
2. 数据约400万字节；再保存同大梯度会额外约400万，不含其他状态。

计算结果：数据约400万字节；再保存同大梯度会额外约400万，不含其他状态。

### 换到实际问题中应用

训练突然停止。

1. 检查异常类型：数值异常追首个非有限算子，OOM则记录峰值、批大小和保留图。
2. 先修根因，再验证有限损失及显存，不能盲目吞掉异常继续。

应用结论：先修根因，再验证有限损失及显存，不能盲目吞掉异常继续。

### 举一反三：改变条件后的完整解答

若批大小减半，所有显存都会减半吗？

<details><summary>变式的推演与答案</summary>

1. 激活常随批大小下降，但参数与优化器状态通常不变。
2. 若固定状态8 GB、激活4 GB，激活减半后共10 GB，而非6 GB。

若固定状态8 GB、激活4 GB，激活减半后共10 GB，而非6 GB。

</details>

### 原有解释与进一步例题


### 原理与推演

Loss scaling amplifies the loss in some mixed-precision training so that small gradients remain representable, then compensates before updating. NaN denotes an invalid numeric value; Inf denotes infinity, for example after overflow. These can arise from division by zero, extreme scores or unstable operations. OOM means out of memory, not exploding gradients. For OOM, inspect batch size, sequence length, saved activations and model size. For NaN, inspect numerical values and data first.


### 适用边界与常见误解

Separate numerical diagnosis from memory diagnosis first.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/notes/numerical_accuracy.html)

[返回分层目录](00-learning-index.md)
