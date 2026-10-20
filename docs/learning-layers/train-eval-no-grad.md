# Train / Eval / No Grad

概念编号：`concept:train-eval-no-grad` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/train-eval-no-grad/)

## 第一层：概念入门 · 知其然

### 定义

训练/评估模式与梯度记录控制是两套机制。train和eval改变特定层的前向行为，例如Dropout屏蔽和BatchNorm统计来源；no_grad让其作用范围内的运算不建立普通反向求导记录。eval并不自动停止求导，no_grad也不自动把层切换到评估行为。

### 概念边界与常见混淆

具体行为依赖层配置，并非每一层在两种模式都不同。之后继续训练要恢复训练模式；不要把requires_grad、模式和优化器更新混作一件事。

### 先看一个例子

验证网络时通常先eval，再在no_grad范围内算预测：前者关闭通常训练随机屏蔽，后者省去无需的梯度记录。若只no_grad但仍train，Dropout仍可能随机，BatchNorm仍可能更新统计。若想对评估输出求输入导数，则可eval但保留梯度记录。

### 理解练习

#### 1. 求导

eval后还能求输入梯度吗？

<details><summary>答案与解释</summary>

可以，只要相关输入要求梯度且没有关闭记录；eval不是求导开关。

</details>

#### 2. 随机

no_grad自动关闭Dropout吗？

<details><summary>答案与解释</summary>

不会，Dropout依赖层模式，应另行eval。

</details>

#### 3. 恢复

验证后忘记train继续训练，可能有何影响？

<details><summary>答案与解释</summary>

需要训练行为的层仍用评估规则，训练条件改变；须显式管理模式。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 训练模式的Dropout随机输出0或4，eval直接输出2。
2. no_grad只影响计算图记录，不改变模块训练标志。

### 具体输入与计算步骤

Dropout输入2，丢弃率0.5，随后做模型验证。

1. train加no_grad仍以各0.5概率输出0、4。
2. eval加no_grad输出2且不记录梯度，是常规验证组合。

计算结果：eval加no_grad输出2且不记录梯度，是常规验证组合。

### 换到实际问题中应用

评估分类器验证准确率。

1. 保存当前模式，切换eval并在no_grad环境遍历验证集。
2. 统计指标后恢复train，防止后续训练继续使用冻结的归一化统计。

应用结论：统计指标后恢复train，防止后续训练继续使用冻结的归一化统计。

### 举一反三：改变条件后的完整解答

eval模式下仍能反向求导吗？

<details><summary>变式的推演与答案</summary>

1. 能，只要梯度记录开启且相关张量需要梯度。
2. 因此输入敏感度分析可在eval下求导，eval不等于禁用自动求导。

因此输入敏感度分析可在eval下求导，eval不等于禁用自动求导。

</details>

### 原有解释与进一步例题


### 原理与推演

Training and evaluation modes control the behavior of layers such as Dropout and BatchNorm. Disabling gradient recording controls whether the information needed for backpropagation is recorded. These are separate: switching to evaluation mode does not disable every gradient, and disabling gradients does not change Dropout’s training behavior. Set both correctly during evaluation or deployment for stable behavior and efficient resource use.


### 例子

例子：验证时设 eval 会关闭通常的 dropout 随机屏蔽，但并不自动关闭梯度记录；再使用 no_grad 才省去反传图。相反，train 配合 no_grad 仍可能更新 BatchNorm 运行统计。两组开关职责独立。


### 适用边界与常见误解

Evaluation mode and disabling gradients do not replace one another.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/notes/autograd.html)

[返回分层目录](00-learning-index.md)
