# Policy Gradient

概念编号：`concept:policy-gradient` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/policy-gradient/)

## 第一层：概念入门 · 知其然

### 它是什么

策略梯度直接调整行动概率的参数，以提高期望回报，不要求先对每个行动求最优值。

### 先看一个例子

成功的尝试使类似行动更可能，但不能忽略失败样本和探索。

### 理解练习

一次成功就把该行动概率改100%合理吗？

<details><summary>答案与解释</summary>

不合理；回报有噪声，需批量估计梯度并保留探索，单次样本不证明最优。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 对随机策略，梯度可写E[∇logπθ(a给定s)G]。
2. 减去不依赖当前行动的基线b不改变期望梯度，可降低方差。

### 具体输入与计算步骤

单状态选A概率p=sigmoid(θ)=0.5，选到A，回报3、基线1、学习率0.1。

1. ∂logp/∂θ=1−p=0.5，优势3−1=2。
2. 梯度样本1，θ从0升至0.1，p约0.525。

计算结果：这是一次带噪更新，不证明整体最优。

### 换到实际问题中应用

训练仿真控制策略。

1. 收集按当前策略生成的轨迹和折扣回报。
2. 估计优势、批量更新，并监控回报方差与安全约束。

应用结论：样本量与分布变化影响训练稳定性。

### 举一反三：改变条件后的完整解答

若同次回报0、基线1呢？

<details><summary>变式的推演与答案</summary>

1. 优势−1，梯度=0.5×(−1)=−0.5。
2. θ更新到−0.05，p约0.4875。

低于基线的行动概率下降。

</details>

### 原有解释与进一步例题


### Definition

A policy-gradient method adjusts parameters of an action policy to improve expected return. A stochastic policy π_θ(a|s) gives the probability of taking action a in state s.


### Parameters and mechanism

A score-function gradient has the form E[∇_θ log π_θ(a|s) A(s,a)], under the sampling and return convention of the algorithm. A is an advantage estimate comparing the action with a baseline; an inaccurate estimate can increase variance or bias.


### Example

If an action has higher estimated advantage than the baseline, a small ascent update tends to increase its sampled log probability. One fortunate reward is not enough to identify a reliable advantage; exploration and estimation affect the update.


### 适用边界与常见误解

Constraints in a policy objective differ from gradient clipping.

### 推导与方法参考

- [一手资料](https://www.incompleteideas.net/book/bookdraft2018mar21.pdf)

[返回分层目录](00-learning-index.md)
