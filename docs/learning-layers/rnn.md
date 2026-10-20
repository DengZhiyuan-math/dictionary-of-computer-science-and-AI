# RNN — Recurrent Neural Network

概念编号：`concept:rnn` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/rnn/)

## 第一层：概念入门 · 知其然

### 它是什么

循环神经网络（RNN）按序列顺序更新隐藏状态，用状态汇总先前输入。LSTM 与 GRU 是采用门控的循环结构；卷积与注意力的基础分别保留在各自页面，不在这里重复整段网络比较。

### 先看一个例子

标量模型 hₜ=tanh(0.5hₜ₋₁+xₜ)，h₀=0，输入 1、0，得到 h₁≈0.7616、h₂≈0.3634。第二步输入虽为零，仍受第一步影响。未来输入不能提前进入历史隐藏状态，否则金融预测会泄漏。

### 理解练习

用自己的话解释：上面的情景为什么是“RNN — Recurrent Neural Network”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：循环神经网络（RNN）按序列顺序更新隐藏状态，用状态汇总先前输入。LSTM 与 GRU 是采用门控的循环结构；卷积与注意力的基础分别保留在各自页面，不在这里重复整段网络比较。

情景依据：标量模型 hₜ=tanh(0.5hₜ₋₁+xₜ)，h₀=0，输入 1、0，得到 h₁≈0.7616、h₂≈0.3634。第二步输入虽为零，仍受第一步影响。未来输入不能提前进入历史隐藏状态，否则金融预测会泄漏。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数与公式

普通 RNN 可写为 $h_t=\tanh(W_hh_{t-1}+W_xx_t+b)$。x 为当前输入，h 为隐藏状态，W、b 为可学习参数。训练沿时间展开并反传；历史信息能否保留取决于动态与训练，不是只要状态维度大就能长期记忆。


### 适用边界与常见误解

Sequence length, gradient propagation, and parallelization constraints jointly affect suitability.

### 领域应用

- [LSTM · 金融序列中的门控记忆](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-lstm.md)：从循环网络扩展到门控记忆的金融输入契约，处理时间窗口、资产边界与状态恢复。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
