# Train / Eval / No Grad

概念编号：`concept:train-eval-no-grad` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/train-eval-no-grad/)

## 第一层：概念入门 · 知其然

### 它是什么

Training and evaluation modes control the behavior of layers such as Dropout and BatchNorm. Disabling gradient recording controls whether the information needed for backpropagation is recorded. These are separate: switching to evaluation mode does not disable every gradient, and disabling gradients does not change Dropout’s training behavior. Set both correctly during evaluation or deployment for stable behavior and efficient resource use.

### 先看一个例子

例子：验证时设 eval 会关闭通常的 dropout 随机屏蔽，但并不自动关闭梯度记录；再使用 no_grad 才省去反传图。相反，train 配合 no_grad 仍可能更新 BatchNorm 运行统计。两组开关职责独立。

### 理解练习

用自己的话解释：上面的情景为什么是“Train / Eval / No Grad”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Training and evaluation modes control the behavior of layers such as Dropout and BatchNorm. Disabling gradient recording controls whether the information needed for backpropagation is recorded. These are separate: switching to evaluation mode does not disable every gradient, and disabling gradients does not change Dropout’s training behavior. Set both correctly during evaluation or deployment for stable behavior and efficient resource use.

情景依据：例子：验证时设 eval 会关闭通常的 dropout 随机屏蔽，但并不自动关闭梯度记录；再使用 no_grad 才省去反传图。相反，train 配合 no_grad 仍可能更新 BatchNorm 运行统计。两组开关职责独立。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Training and evaluation modes control the behavior of layers such as Dropout and BatchNorm. Disabling gradient recording controls whether the information needed for backpropagation is recorded. These are separate: switching to evaluation mode does not disable every gradient, and disabling gradients does not change Dropout’s training behavior. Set both correctly during evaluation or deployment for stable behavior and efficient resource use.


### 例子

例子：验证时设 eval 会关闭通常的 dropout 随机屏蔽，但并不自动关闭梯度记录；再使用 no_grad 才省去反传图。相反，train 配合 no_grad 仍可能更新 BatchNorm 运行统计。两组开关职责独立。


### 适用边界与常见误解

Evaluation mode and disabling gradients do not replace one another.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
