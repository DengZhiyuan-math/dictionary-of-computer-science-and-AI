# Dreamer / MuZero

概念编号：`concept:dreamer-muzero` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dreamer-muzero/)

## 第一层：概念入门 · 知其然

### 它是什么

Dreamer learns a latent world model from real interaction experience, then rolls out imagined trajectories inside that model to train an actor and a critic. It aims to turn each real experience into many internal learning opportunities, improving sample efficiency. The key distinction is training an action policy inside the model; this need not involve a large new search before every real action. Model prediction errors affect the policy, so real data must continually correct the model.

### 先看一个例子

例子：机器人已有一次真实动作转移记录，Dreamer 在学得的潜状态模型中展开若干虚拟动作以训练策略；MuZero 在表示、动力学和奖励模型上做搜索。虚拟搜索得到高奖励仍依赖模型准确，必须回到真实环境验证。

### 理解练习

用自己的话解释：上面的情景为什么是“Dreamer / MuZero”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Dreamer learns a latent world model from real interaction experience, then rolls out imagined trajectories inside that model to train an actor and a critic. It aims to turn each real experience into many internal learning opportunities, improving sample efficiency. The key distinction is training an action policy inside the model; this need not involve a large new search before every real action. Model prediction errors affect the policy, so real data must continually correct the model.

情景依据：例子：机器人已有一次真实动作转移记录，Dreamer 在学得的潜状态模型中展开若干虚拟动作以训练策略；MuZero 在表示、动力学和奖励模型上做搜索。虚拟搜索得到高奖励仍依赖模型准确，必须回到真实环境验证。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Dreamer learns a latent world model from real interaction experience, then rolls out imagined trajectories inside that model to train an actor and a critic. It aims to turn each real experience into many internal learning opportunities, improving sample efficiency. The key distinction is training an action policy inside the model; this need not involve a large new search before every real action. Model prediction errors affect the policy, so real data must continually correct the model.


### 例子

例子：机器人已有一次真实动作转移记录，Dreamer 在学得的潜状态模型中展开若干虚拟动作以训练策略；MuZero 在表示、动力学和奖励模型上做搜索。虚拟搜索得到高奖励仍依赖模型准确，必须回到真实环境验证。


### 适用边界与常见误解

Compare control objectives, prediction targets, and planning mechanisms.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
