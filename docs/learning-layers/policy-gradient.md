# Policy Gradient

概念编号：`concept:policy-gradient` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/policy-gradient/)

## 第一层：概念入门 · 知其然

### 定义

策略梯度是一类直接调整参数化行动规则、以提高期望累计奖励的强化学习方法。策略为每个状态指定行动的概率；与先比较各行动价值再选最大不同，它对“改变策略参数会怎样改变平均回报”求梯度，再向增大回报的方向更新。随机行动使方法能够探索，并提供用于估计更新方向的轨迹数据。

### 概念边界与常见混淆

增加某次成功行动的概率只是直觉，需要考虑该行动相对同状态其他选择的收益及整条轨迹。梯度估计有方差，有限样本的每次更新不保证真实期望回报单调上升。

### 先看一个例子

单步任务中选择 A 得 2 分、选择 B 得 0 分，没有后续。若选 A 概率为 0.3，期望回报为 0.6；提高到 0.4 后为 0.8。这个完全已知的小例子说明目标是改善整个概率规则。实际问题不知道各行动的期望回报，只能从多次含噪的交互估计，不能用一条幸运轨迹断言更新必然改善。

### 理解练习

#### 1. 目标量

在示例中把选 A 概率改为 0.5，期望回报和每次实际回报是否都等于 1？

<details><summary>答案与解释</summary>

期望是 1，但实际只能得 2 或 0。优化期望并不保证每次交互得到平均值。

</details>

#### 2. 幸运与价值

行动 A 偶尔得 100、通常得负分，一次得 100 后就认定 A 最优合适吗？

<details><summary>答案与解释</summary>

不合适。需要估计完整回报分布下的平均结果，并与其他行动比较；单次结果不是期望价值。

</details>

#### 3. 方法边界

直接学习行动概率，是否表示完全不需要价值估计？

<details><summary>答案与解释</summary>

不表示。许多方法用价值估计作为比较基准或辅助估计以降低方差；关键是被更新的策略由参数直接表示。

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
