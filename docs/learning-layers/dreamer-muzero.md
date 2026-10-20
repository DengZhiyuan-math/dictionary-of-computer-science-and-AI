# Dreamer / MuZero

概念编号：`concept:dreamer-muzero` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dreamer-muzero/)

## 第一层：概念入门 · 知其然

### 它是什么

Dreamer用学习的环境模型想象轨迹改进策略，MuZero在学习的模型中搜索动作。

### 先看一个例子

动作A奖励2、后续价值5，B奖励3、后续价值1，折扣0.9。

### 理解练习

模型内高回报足够证明真实有效吗？

<details><summary>答案与解释</summary>

不够，模型误差可能累积并被策略利用。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 把观察压成潜在状态，预测动作后的状态、奖励或价值。
2. 规划用这些预测估计回报，因此模型误差也会改变行动排序。

### 具体输入与计算步骤

动作A奖励2、后续价值5，B奖励3、后续价值1，折扣0.9。

1. A估计回报2+0.9×5=6.5。
2. B为3+0.9×1=3.9，当前模型偏好A。

计算结果：B为3+0.9×1=3.9，当前模型偏好A。

### 换到实际问题中应用

减少昂贵机器人交互。

1. 先用真实轨迹拟合模型，再进行有限长度想象或搜索。
2. 将改进策略回真实环境验证，并收集新误差修正模型。

应用结论：将改进策略回真实环境验证，并收集新误差修正模型。

### 举一反三：改变条件后的完整解答

若A后续价值高估4，选择会变吗？

<details><summary>变式的推演与答案</summary>

1. A应为2+0.9×1=2.9。
2. B仍3.9，应改选B，展示模型偏差如何反转决策。

B仍3.9，应改选B，展示模型偏差如何反转决策。

</details>

### 原有解释与进一步例题


### 原理与推演

Dreamer learns a latent world model from real interaction experience, then rolls out imagined trajectories inside that model to train an actor and a critic. It aims to turn each real experience into many internal learning opportunities, improving sample efficiency. The key distinction is training an action policy inside the model; this need not involve a large new search before every real action. Model prediction errors affect the policy, so real data must continually correct the model.


### 例子

例子：机器人已有一次真实动作转移记录，Dreamer 在学得的潜状态模型中展开若干虚拟动作以训练策略；MuZero 在表示、动力学和奖励模型上做搜索。虚拟搜索得到高奖励仍依赖模型准确，必须回到真实环境验证。


### 适用边界与常见误解

Compare control objectives, prediction targets, and planning mechanisms.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/1912.01603)
- [一手资料](https://arxiv.org/abs/1911.08265)

[返回分层目录](00-learning-index.md)
