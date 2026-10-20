# Policy Gradient

概念编号：`concept:policy-gradient` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/policy-gradient/)

## 第一层：概念入门 · 知其然

### 它是什么

A policy-gradient method adjusts parameters of an action policy to improve expected return. A stochastic policy π_θ(a|s) gives the probability of taking action a in state s.

### 先看一个例子

If an action has higher estimated advantage than the baseline, a small ascent update tends to increase its sampled log probability. One fortunate reward is not enough to identify a reliable advantage; exploration and estimation affect the update.

### 理解练习

用自己的话解释：上面的情景为什么是“Policy Gradient”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A policy-gradient method adjusts parameters of an action policy to improve expected return. A stochastic policy π_θ(a|s) gives the probability of taking action a in state s.

情景依据：If an action has higher estimated advantage than the baseline, a small ascent update tends to increase its sampled log probability. One fortunate reward is not enough to identify a reliable advantage; exploration and estimation affect the update.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

A score-function gradient has the form E[∇_θ log π_θ(a|s) A(s,a)], under the sampling and return convention of the algorithm. A is an advantage estimate comparing the action with a baseline; an inaccurate estimate can increase variance or bias.


### 适用边界与常见误解

Constraints in a policy objective differ from gradient clipping.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
