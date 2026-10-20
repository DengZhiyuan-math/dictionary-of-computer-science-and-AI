# Q-learning / SARSA

概念编号：`concept:q-learning-sarsa` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/q-learning-sarsa/)

## 第一层：概念入门 · 知其然

### 它是什么

Q-learning按下一状态最优动作估值更新；SARSA按实际下一动作更新。

### 先看一个例子

奖励1，折扣0.9，下一动作价值为2与5，实际选价值2的动作。

### 理解练习

两个方法的目标总是一样吗？

<details><summary>答案与解释</summary>

不是，实际下一动作并非最优时会不同。

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
