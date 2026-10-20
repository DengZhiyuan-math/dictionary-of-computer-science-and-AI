# Bellman Equations

概念编号：`concept:bellman` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bellman/)

## 第一层：概念入门 · 知其然

### 它是什么

Bellman 关系把长期价值分解为当前奖励与后续状态的折现价值。固定策略的价值评估与在可选行动中寻找最优策略，是两个不同问题。

### 先看一个例子

若这一步已经真正终止，目标只有 2。交易奖励如何纳入费用和库存风险，见金融应用。

### 理解练习

用自己的话解释：上面的情景为什么是“Bellman Equations”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Bellman 关系把长期价值分解为当前奖励与后续状态的折现价值。固定策略的价值评估与在可选行动中寻找最优策略，是两个不同问题。

情景依据：若这一步已经真正终止，目标只有 2。交易奖励如何纳入费用和库存风险，见金融应用。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数与公式

固定策略 π 下，$V^\pi(s)=E_\pi[r_{t+1}+\gamma V^\pi(s_{t+1})\mid s_t=s]$。最优动作价值为 $Q^*(s,a)=E[r_{t+1}+\gamma\max_{a'}Q^*(s_{t+1},a')\mid s_t=s,a_t=a]$。γ 为折扣，s、a 为状态和行动；真正终止后未来价值为零，时间截断不必等于终止。


### 例子

一个行动立即得到奖励 2，随后确定进入价值 5 的非终止状态，γ=0.9，则该次 Bellman 目标为 2+0.9×5=6.5。若这一步已经真正终止，目标只有 2。交易奖励如何纳入费用和库存风险，见金融应用。


### 适用边界与常见误解

Value depends on the policy, discount, and task; single-step rewards alone are insufficient for comparison.

### 例题：Q-Learning: No Bootstrapping at True Termination

Current Q(s,a)=2, reward r=1, maximum next-state Q=4, discount γ=0.9 and learning rate α=0.5.

1. For a nonterminal transition, the target is r+γ max Q=1+0.9×4=4.6.
2. The TD error is 4.6-2=2.6. Update Q=2+0.5×2.6=3.3.
3. At a true terminal state, the target is only r=1, giving 2+0.5×(1-2)=1.5.

结果：The same observed reward produces different learning targets depending on termination. One tabular Q-learning update does not establish a fully learned policy.

易错点：Distinguish true termination from time-limit truncation. Bootstrapping depends on the task and interface semantics. Q-learning uses the maximum next-state value; SARSA uses the actual next action’s value.

变式：With α=1, what is the updated value for the nonterminal transition?

参考答案：It becomes the current target, 4.6. This does not mean the target estimate is noise-free.

### 领域应用

- [Reinforcement Learning for Trading · 强化学习的交易应用](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/ml-rl-trading.md)：先掌握状态、行动、奖励与 Bellman 关系，再定义交易环境的成交、成本和风险边界。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
