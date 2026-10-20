# RNN — Recurrent Neural Network

概念编号：`concept:rnn` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/rnn/)

## 第一层：概念入门 · 知其然

### 它是什么

循环网络按顺序更新隐藏状态，让先前输入影响后续输出；LSTM、GRU用门控制记忆。

### 先看一个例子

听一句话时保留前面关键词，帮助理解后面的词。

### 理解练习

听后面的词为什么还要保留前面的状态？

<details><summary>答案与解释</summary>

词义和任务输出可能依赖前文，隐藏状态汇总此前输入。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 一般状态ht=f(Wxxt+Whht−1+b)，跨时间共享参数。
2. 反传跨多个时间步相乘，可能梯度消失或爆炸，门控和截断可缓解但非完全消除。

### 具体输入与计算步骤

教学线性递推ht=0.5ht−1+xt，h0=0，输入2、4。

1. h1=2。
2. h2=0.5×2+4=5。

计算结果：状态5包含当前4和先前2的衰减贡献1。

### 换到实际问题中应用

处理传感器流。

1. 每个设备维护独立状态，按时间顺序输入。
2. 新序列重置或明确继承状态，训练测试边界禁止泄漏。

应用结论：状态归属错误会串扰不同设备。

### 举一反三：改变条件后的完整解答

交换输入为4、2，末状态还相同吗？

<details><summary>变式的推演与答案</summary>

1. h1=4，h2=0.5×4+2=4。
2. 原末状态5，新末状态4。

顺序影响结果，这正是序列模型保留的信息。

</details>

### 原有解释与进一步例题


### 定义

循环神经网络（RNN）按序列顺序更新隐藏状态，用状态汇总先前输入。LSTM 与 GRU 是采用门控的循环结构；卷积与注意力的基础分别保留在各自页面，不在这里重复整段网络比较。


### 参数与公式

普通 RNN 可写为 $h_t=\tanh(W_hh_{t-1}+W_xx_t+b)$。x 为当前输入，h 为隐藏状态，W、b 为可学习参数。训练沿时间展开并反传；历史信息能否保留取决于动态与训练，不是只要状态维度大就能长期记忆。


### 例子

标量模型 hₜ=tanh(0.5hₜ₋₁+xₜ)，h₀=0，输入 1、0，得到 h₁≈0.7616、h₂≈0.3634。第二步输入虽为零，仍受第一步影响。未来输入不能提前进入历史隐藏状态，否则金融预测会泄漏。


### 适用边界与常见误解

Sequence length, gradient propagation, and parallelization constraints jointly affect suitability.

### 领域应用

- [LSTM · 金融序列中的门控记忆](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-lstm.md)：从循环网络扩展到门控记忆的金融输入契约，处理时间窗口、资产边界与状态恢复。

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/tutorials/beginner/nlp/sequence_models_tutorial.html)

[返回分层目录](00-learning-index.md)
