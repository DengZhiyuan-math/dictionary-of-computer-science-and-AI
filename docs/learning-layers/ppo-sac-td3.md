# PPO / SAC / TD3

概念编号：`concept:ppo-sac-td3` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/ppo-sac-td3/)

## 第一层：概念入门 · 知其然

### 它是什么

TRPO uses a trust-region approach to constrain policy changes and avoid destroying existing behavior in one update. PPO pursues similar stability through easier-to-implement objectives, such as clipping or penalties. It commonly performs several updates on a newly collected batch of interactions before gathering fresh data. PPO controls update incentives; it does not enforce the same maximum change on every parameter or guarantee that a policy never moves too far.

### 先看一个例子

例子：PPO 的一次样本优势为 +1，新旧动作概率比为 1.3，裁剪 ε=0.2，则该样本的裁剪目标取 min(1.3,1.2)=1.2。SAC 的熵奖励和 TD3 的双评论家、延迟更新解决的是不同机制，不能用同一裁剪式概括全部算法。

### 理解练习

用自己的话解释：上面的情景为什么是“PPO / SAC / TD3”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：TRPO uses a trust-region approach to constrain policy changes and avoid destroying existing behavior in one update. PPO pursues similar stability through easier-to-implement objectives, such as clipping or penalties. It commonly performs several updates on a newly collected batch of interactions before gathering fresh data. PPO controls update incentives; it does not enforce the same maximum change on every parameter or guarantee that a policy never moves too far.

情景依据：例子：PPO 的一次样本优势为 +1，新旧动作概率比为 1.3，裁剪 ε=0.2，则该样本的裁剪目标取 min(1.3,1.2)=1.2。SAC 的熵奖励和 TD3 的双评论家、延迟更新解决的是不同机制，不能用同一裁剪式概括全部算法。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

TRPO uses a trust-region approach to constrain policy changes and avoid destroying existing behavior in one update. PPO pursues similar stability through easier-to-implement objectives, such as clipping or penalties. It commonly performs several updates on a newly collected batch of interactions before gathering fresh data. PPO controls update incentives; it does not enforce the same maximum change on every parameter or guarantee that a policy never moves too far.


### 例子

例子：PPO 的一次样本优势为 +1，新旧动作概率比为 1.3，裁剪 ε=0.2，则该样本的裁剪目标取 min(1.3,1.2)=1.2。SAC 的熵奖励和 TD3 的双评论家、延迟更新解决的是不同机制，不能用同一裁剪式概括全部算法。


### 适用边界与常见误解

Clipping the PPO objective differs from clipping gradients and does not impose a hard bound on every policy change.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
