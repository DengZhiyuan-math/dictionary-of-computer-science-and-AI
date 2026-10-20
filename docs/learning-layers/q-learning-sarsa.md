# Q-learning / SARSA

概念编号：`concept:q-learning-sarsa` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/q-learning-sarsa/)

## 第一层：概念入门 · 知其然

### 定义

Q值估计在某状态采取某行动、再按后续策略继续的期望累计奖励。Q-learning 更新时使用下一状态允许行动中最大的估值，学习偏向贪心目标策略；SARSA 使用实际选择的下一行动的估值，评价包含当前探索方式的行为。两者都用经验改善估计，名字中的区别是更新目标，不是是否使用奖励。

### 概念边界与常见混淆

终止状态无后续价值，不能继续加下一状态项。函数近似、数据覆盖及探索条件会影响稳定性，不能由表格算法的结论直接保证任意神经网络训练。

### 先看一个例子

当前奖励1、折扣0.9，下一状态行动估值为5和2，但探索时实际选了第二个。Q-learning目标为1+0.9×5=5.5；SARSA为1+0.9×2=2.8。这些是更新目标，不是完整更新后Q值，后者还受学习率与旧估值影响。

### 理解练习

#### 1. 实际动作

实际选低估值动作时，Q-learning也必须用它吗？

<details><summary>答案与解释</summary>

不是，标准目标用下一状态最大估值，体现离策略学习。

</details>

#### 2. 终止

任务本步结束、奖励1，目标还可加0.9×5吗？

<details><summary>答案与解释</summary>

不能，目标为1，否则虚构结束后的收益。

</details>

#### 3. 更新量

目标5.5、旧值3、学习率0.2，新值是5.5吗？

<details><summary>答案与解释</summary>

不是，3+0.2×(5.5−3)=3.5，目标与插值更新不同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. Q-learning目标r+γmax Q(s′,a)，与采样下一动作无关。
2. SARSA目标r+γQ(s′,a′)，反映执行中的策略，包括探索。

### 具体输入与计算步骤

奖励1，折扣0.9，下一动作价值为2与5，实际选价值2的动作。

1. Q-learning目标1+0.9×5=5.5。
2. SARSA目标1+0.9×2=2.8，终止状态通常不再自举。

计算结果：SARSA目标1+0.9×2=2.8，终止状态通常不再自举。

### 换到实际问题中应用

有危险边界的网格探索。

1. SARSA把探索时实际动作风险纳入估值，Q-learning则估计贪心后续。
2. 统一探索率比较真实回报，不能仅比较表中最大Q。

应用结论：统一探索率比较真实回报，不能仅比较表中最大Q。

### 举一反三：改变条件后的完整解答

若当前Q=1、学习率0.5，按Q-learning目标更新多少？

<details><summary>变式的推演与答案</summary>

1. 误差5.5−1=4.5。
2. Q新=1+0.5×4.5=3.25。

Q新=1+0.5×4.5=3.25。

</details>

### 原有解释与进一步例题


### 原理与推演

Classic Q-learning uses the estimated value of the best next-state action in its target, even when exploration actually selects another action. SARSA uses the value of the action actually selected next under the behavior policy. This illustrates off-policy versus on-policy learning: the relationship between the target policy and the policy collecting data. Off-policy does not mean offline; an off-policy algorithm can collect new data while learning.


### 适用边界与常见误解

They relate the behavior policy and target policy differently.

### 例题：Q-Learning: No Bootstrapping at True Termination

Current Q(s,a)=2, reward r=1, maximum next-state Q=4, discount γ=0.9 and learning rate α=0.5.

1. For a nonterminal transition, the target is r+γ max Q=1+0.9×4=4.6.
2. The TD error is 4.6-2=2.6. Update Q=2+0.5×2.6=3.3.
3. At a true terminal state, the target is only r=1, giving 2+0.5×(1-2)=1.5.

结果：The same observed reward produces different learning targets depending on termination. One tabular Q-learning update does not establish a fully learned policy.

易错点：Distinguish true termination from time-limit truncation. Bootstrapping depends on the task and interface semantics. Q-learning uses the maximum next-state value; SARSA uses the actual next action’s value.

变式：With α=1, what is the updated value for the nonterminal transition?

参考答案：It becomes the current target, 4.6. This does not mean the target estimate is noise-free.

### 推导与方法参考

- [一手资料](http://incompleteideas.net/book/the-book-2nd.html)

[返回分层目录](00-learning-index.md)
