# Q-learning / SARSA

概念编号：`concept:q-learning-sarsa` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/q-learning-sarsa/)

## 第一层：概念入门 · 知其然

### 它是什么

Classic Q-learning uses the estimated value of the best next-state action in its target, even when exploration actually selects another action. SARSA uses the value of the action actually selected next under the behavior policy. This illustrates off-policy versus on-policy learning: the relationship between the target policy and the policy collecting data. Off-policy does not mean offline; an off-policy algorithm can collect new data while learning.

### 先看一个例子

Current Q(s,a)=2, reward r=1, maximum next-state Q=4, discount γ=0.9 and learning rate α=0.5.
The same observed reward produces different learning targets depending on termination. One tabular Q-learning update does not establish a fully learned policy.

### 理解练习

With α=1, what is the updated value for the nonterminal transition?

<details><summary>答案与解释</summary>

It becomes the current target, 4.6. This does not mean the target estimate is noise-free.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
