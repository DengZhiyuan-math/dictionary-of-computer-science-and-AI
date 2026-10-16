---
title: "第 65 讲 · 强化学习：Q-learning、PPO、Actor-Critic 与自我博弈"
aliases: []
tags: ["chapter","area/rl"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/强化学习与模仿|强化学习与模仿]]

## 本讲概念

- [[Concepts/回报、价值与 Bellman 关系|回报、价值与 Bellman 关系]]
- [[Concepts/策略梯度与 Actor-Critic|策略梯度与 Actor-Critic]]

<a id="chapter-65"></a>

## 第 65 讲｜强化学习：Q-learning、PPO、Actor-Critic 与自我博弈

领域：强化学习与具身智能 · 导览 / 复习

Reinforcement Learning，强化学习，研究如何在不断交互的环境中作决策，目标通常是让长期累计回报尽可能好。Agent 是行动者，Environment 是环境，State 是环境状态，Observation 是实际能够看到的信息，Action 是可执行动作，Reward 是奖励，Policy 是决定采取哪个动作的策略。

MDP，Markov Decision Process，马尔可夫决策过程，是强化学习的经典数学框架。直观上，给定当前完整状态和动作，未来状态的分布不再需要依赖更久之前的全部历史。现实中智能体可能看不到完整状态，这就涉及 POMDP，部分可观测马尔可夫决策过程。

Value Function，价值函数，评价一个状态或某个状态动作组合对未来回报的价值。Q Function，动作价值函数，是在某个状态采取某个动作后，长期来看预计得到多少回报。Bellman Equation，贝尔曼方程，是把长期价值递归分解为当前回报和未来价值的经典思想。

Q Learning，Q 学习，学习动作价值，进而选择价值较高的动作。DQN，Deep Q Network，用神经网络近似 Q 函数，曾在电子游戏强化学习中取得重要成果。Policy Gradient，策略梯度，直接优化产生动作的策略。Actor Critic，演员评论家架构，一个部分负责选择动作，另一个部分评价动作或状态，从而指导更新。

PPO，Proximal Policy Optimization，近端策略优化，通过限制或调节策略更新幅度，提高训练稳定性，是常见的强化学习算法。SAC，Soft Actor Critic，软演员评论家，是常见的离策略连续控制方法，强调奖励与熵正则化之间的平衡。Offline RL，离线强化学习，不直接持续探索环境，而是利用已经收集的历史交互数据学习策略。

Model Free RL，无模型强化学习，主要通过经验学习策略或价值，而不显式建立用于规划的环境动态模型。Model Based RL，基于模型的强化学习，尝试利用环境转移模型来进行规划、训练或评估。这与之后世界模型的关系非常紧密。

Exploration versus Exploitation，探索与利用，是强化学习最经典的矛盾。利用，就是做当前看起来最好的动作；探索，就是尝试可能带来新信息但暂时不确定的动作。Reward Hacking，奖励投机，是智能体找到了提高奖励数值的方法，却没有真正完成设计者希望的目标。Sparse Reward，稀疏奖励，是有效反馈很少，导致学习困难。

Imitation Learning，模仿学习，利用专家演示学习行为。Behavior Cloning，行为克隆，是把状态或观察映射到专家动作的监督学习方法。Inverse Reinforcement Learning，逆强化学习，从示范行为中尝试推断背后的奖励偏好。Curriculum Learning，课程学习，从较容易的任务逐步增加难度。Self Play，自我博弈，让智能体通过与自己或不断更新的对手交互提升能力。Multi Agent Reinforcement Learning，多智能体强化学习，研究多个智能体之间的合作、竞争和共同学习。

如果你想研究机器人或足球智能体，必须区分三类任务。模仿学习依赖示范数据。强化学习依赖奖励与交互。基于模型的控制或者世界模型则尝试显式利用环境如何变化的信息。现实系统常会将它们组合，而不是只能选择其中一种。

参考资料（不朗读）：[S002 · OpenAI Spinning Up — Key Concepts in RL](https://spinningup.openai.com/en/latest/spinningup/rl_intro.html)；[S113 · OpenAI Spinning Up — PPO](https://spinningup.openai.com/en/latest/algorithms/ppo.html)；[S143 · Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor](https://arxiv.org/abs/1801.01290)
