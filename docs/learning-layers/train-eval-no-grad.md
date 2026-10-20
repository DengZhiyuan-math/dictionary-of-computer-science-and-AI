# Train / Eval / No Grad

概念编号：`concept:train-eval-no-grad` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/train-eval-no-grad/)

## 第一层：概念入门 · 知其然

### 它是什么

train/eval改变Dropout与BatchNorm等层的行为；no_grad关闭梯度记录，二者用途不同。

### 先看一个例子

Dropout输入2，丢弃率0.5，随后做模型验证。

### 理解练习

只用no_grad会自动关闭Dropout吗？

<details><summary>答案与解释</summary>

不会，还需eval模式。

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
