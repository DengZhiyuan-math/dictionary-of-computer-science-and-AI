# NaN / Inf / OOM

概念编号：`concept:nan-inf-oom` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/nan-inf-oom/)

## 第一层：概念入门 · 知其然

### 定义

NaN、Inf 与 OOM 是不同故障。NaN 是浮点系统中表示未定义或无效数值结果的标记，例如0/0；Inf 表示正负无穷，也可能由有限格式溢出产生；OOM 表示内存分配无法满足，并不是一个数值。排查应先区分错误类别，再定位最早出现的位置。

### 概念边界与常见混淆

用0替换全部NaN可能掩盖错误并改变目标。释放缓存也不等于释放仍被程序引用的张量；必须确认真正持有内存的对象。

### 先看一个例子

计算log(0)通常得到−Inf，继续做−Inf−(−Inf)可能得到NaN；申请远超设备容量的大数组则可能OOM。前两者要查数值定义和范围，后者要查数组大小与保留对象；单纯减小学习率不能保证解决三者。

### 理解练习

#### 1. 类别

OOM能通过把NaN替换为0来修复吗？

<details><summary>答案与解释</summary>

不能，OOM是分配失败，需要减少占用或改变内存安排。

</details>

#### 2. 首因

最后损失NaN，是否只应检查损失函数？

<details><summary>答案与解释</summary>

不应，输入、中间运算或梯度可能更早出现Inf/NaN，应追踪首次异常。

</details>

#### 3. 修补

Inf除以一百万就能恢复有限值吗？

<details><summary>答案与解释</summary>

不能，已丢失信息；应修正生成它的运算并重新计算。

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
