# Bellman Equations

概念编号：`concept:bellman` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bellman/)

## 第一层：概念入门 · 知其然

### 定义

Bellman 关系描述序贯决策中的价值如何分解。状态是用于决定后续行动的信息，策略规定在状态下怎样选择行动；状态的价值是按该策略继续行动所得到的期望累计奖励。若状态已包含预测下一步所需的信息，且将后续奖励按固定折扣系数缩小，当前价值就等于当前奖励的期望，加上下一状态价值的折扣期望。

### 概念边界与常见混淆

固定策略的价值关系与最优价值关系不同。前者按该策略对动作求平均，后者在允许动作中选择最优；不能把“下一步取最大”强加到任意策略的评价中。

### 先看一个例子

某任务现在确定获得 2 分，下一步到达的状态在既定策略下价值为 10 分，折扣系数为 0.9，则当前价值为 2+0.9×10=11 分。10 已代表从下一状态开始的全部后续奖励，不能再把相同的未来奖励另加一次。若任务当前结束，后续价值按 0 处理。

### 理解练习

#### 1. 结束状态

最后一次行动奖励为 3，任务随即结束，还要加下一轮估值吗？

<details><summary>答案与解释</summary>

不应加，结束后的继续价值为 0，所以该步价值就是 3；否则会虚构不存在的未来奖励。

</details>

#### 2. 随机后继

下一状态以相同概率价值 4 或 8，当前奖励为 1、折扣 0.5，当前价值多少？

<details><summary>答案与解释</summary>

下一价值的期望为 6，所以是 1+0.5×6=4。不能只选较好的 8，因为此处后继是随机结果而非可自由选择。

</details>

#### 3. 评价谁的策略

某策略坚持选择收益较低的动作，其价值还能满足 Bellman 关系吗？

<details><summary>答案与解释</summary>

可以。它满足自己策略下的期望分解，但一般不满足对动作取最大的最优关系；分解成立不等于策略最优。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 固定策略下V(s)=Σaπ(a给定s)Σs′P(s′给定s,a)[r+γV(s′)]。
2. 最优价值把对行动的策略平均改为max；0≤γ<1的有限状态折扣模型有收缩性质。

### 具体输入与计算步骤

状态A可选行动：左奖励2、到价值10；右奖励4、到价值6，γ=0.9。

1. 左Q=2+0.9×10=11。
2. 右Q=4+0.9×6=9.4。

计算结果：贪心选择左，当前奖励较小但长期价值较高。

### 换到实际问题中应用

为仓库机器人规划奖励。

1. 定义位置、行动、碰撞惩罚与到达奖励。
2. 按状态反复Bellman更新直至误差门槛，再提取策略。

应用结论：模型转移错误会使计算出的策略失效。

### 举一反三：改变条件后的完整解答

若γ降为0.2呢？

<details><summary>变式的推演与答案</summary>

1. 左Q=2+2=4，右Q=4+1.2=5.2。
2. 最优改选右。

重视短期的折扣会改变行动选择。

</details>

### 原有解释与进一步例题


### 定义

Bellman 关系把长期价值分解为当前奖励与后续状态的折现价值。固定策略的价值评估与在可选行动中寻找最优策略，是两个不同问题。


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

### 推导与方法参考

- [一手资料](https://www.incompleteideas.net/book/bookdraft2018mar21.pdf)

[返回分层目录](00-learning-index.md)
