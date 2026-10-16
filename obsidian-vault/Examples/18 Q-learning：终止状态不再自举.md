---
title: "Q-learning：终止状态不再自举"
aliases: []
tags: ["example","area/rl"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/强化学习与模仿|强化学习与模仿]]

### 18 · Q-learning：终止状态不再自举

**场景与输入：** 当前 Q(s,a)=2，奖励 r=1，下一状态最大 Q 为 4，折扣 γ=0.9，步长 α=0.5。

1. 非终止转移的目标为 r+γ max Q=1+0.9×4=4.6。
2. TD 误差为 4.6-2=2.6，更新 Q=2+0.5×2.6=3.3。
3. 若这一步到达真正终止状态，目标只为 r=1，更新变成 2+0.5×(1-2)=1.5。

**结果：** 同样的观测奖励，是否终止会改变学习目标。只演示一次表格 Q-learning 更新，不代表完整策略已经学好。

**易错点与边界：** 环境真正终止与时间上限截断需要区分；是否自举应根据任务和接口语义决定。Q-learning 使用下一状态最大值，SARSA 使用实际下一动作的值。

**改变条件再想一想：** 把 α 改为 1，非终止时更新到哪里？

<details>
<summary>查看参考答案</summary>

直接更新到本次目标 4.6；这并不表示目标估计本身没有噪声。

</details>

[打开交互演示](../Demos/交互演示.html#qlearning)

## 关联概念与章节

- [[Concepts/离策略／在策略时序差分控制|离策略／在策略时序差分控制]]
- [[Concepts/回报、价值与 Bellman 关系|回报、价值与 Bellman 关系]]
- [[Chapters/第 66 讲 强化学习之一：价值、TD、Q-learning、SARSA、DQN|第 66 讲]]
- [[Chapters/第 65 讲 强化学习：Q-learning、PPO、Actor-Critic 与自我博弈|第 65 讲]]
