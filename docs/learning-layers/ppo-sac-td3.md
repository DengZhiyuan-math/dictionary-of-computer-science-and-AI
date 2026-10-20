# PPO / SAC / TD3

概念编号：`concept:ppo-sac-td3` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/ppo-sac-td3/)

## 第一层：概念入门 · 知其然

### 定义

PPO、SAC、TD3 是训练行动策略的不同强化学习方法。PPO 用近期采样数据更新策略，通过概率比率裁剪等方式抑制过大的更新激励；SAC 在预期奖励之外奖励策略熵，鼓励保持行动多样性；TD3 常用于连续动作，以双价值估计取较小值、延迟策略更新等缓解估值高估。价值估计预测后续累计收益，并不是环境直接给出的事实。

### 概念边界与常见混淆

PPO裁剪不等于严格保证新旧策略距离有界。标准SAC、TD3的连续动作版本不能不改动就套到任意离散任务；算法实现与配置需明确。

### 先看一个例子

机器人选择连续转向角时，SAC可输出带随机性的角度分布，TD3通常输出确定角度并在采样时加探索噪声；PPO也可用连续分布，但采样与更新流程不同。比较应在相同环境交互预算与评价条件下进行，不能直接用不同任务的一次最高分排名。

### 理解练习

#### 1. 动作空间

只有左、右两种选择，能不看接口直接用任意TD3实现吗？

<details><summary>答案与解释</summary>

不能，需核对其连续动作假设及是否有离散变体，不能按名字互换。

</details>

#### 2. 估计

双价值给7和5，取5就保证低估真实回报吗？

<details><summary>答案与解释</summary>

不保证，真实可能更低；取小是减少高估的设计，不是误差绝对保证。

</details>

#### 3. 比较

只选十个种子中最好的一次得分公平吗？

<details><summary>答案与解释</summary>

通常有选择偏差，应报告一致协议下多次结果及波动。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. PPO比率r=π新/π旧，目标取min(rA,clip(r)A)限制激励。
2. SAC优化奖励加熵；TD3常取双critic较小值减轻高估，并延迟策略更新。

### 具体输入与计算步骤

PPO旧动作概率0.2、新概率0.3，优势1，裁剪范围0.8至1.2。

1. r=0.3/0.2=1.5，未裁剪收益1.5。
2. 裁剪为1.2，取min(1.5,1.2)=1.2；这不是把真实策略概率硬截为0.24。

计算结果：裁剪为1.2，取min(1.5,1.2)=1.2；这不是把真实策略概率硬截为0.24。

### 换到实际问题中应用

连续机器人控制需要数据效率。

1. 可评估复用回放数据的SAC或TD3，与适合现有采样流程的PPO比较。
2. 统一环境步数、种子与评估协议，避免只按一次最好回报选算法。

应用结论：统一环境步数、种子与评估协议，避免只按一次最好回报选算法。

### 举一反三：改变条件后的完整解答

若双critic估值7与5，TD3目标采用哪一个？

<details><summary>变式的推演与答案</summary>

1. 取min(7,5)=5。
2. 若即时奖励1、折扣0.9且非终止，目标为1+0.9×5=5.5。

若即时奖励1、折扣0.9且非终止，目标为1+0.9×5=5.5。

</details>

### 原有解释与进一步例题


### 原理与推演

TRPO uses a trust-region approach to constrain policy changes and avoid destroying existing behavior in one update. PPO pursues similar stability through easier-to-implement objectives, such as clipping or penalties. It commonly performs several updates on a newly collected batch of interactions before gathering fresh data. PPO controls update incentives; it does not enforce the same maximum change on every parameter or guarantee that a policy never moves too far.


### 例子

例子：PPO 的一次样本优势为 +1，新旧动作概率比为 1.3，裁剪 ε=0.2，则该样本的裁剪目标取 min(1.3,1.2)=1.2。SAC 的熵奖励和 TD3 的双评论家、延迟更新解决的是不同机制，不能用同一裁剪式概括全部算法。


### 适用边界与常见误解

Clipping the PPO objective differs from clipping gradients and does not impose a hard bound on every policy change.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/1707.06347)
- [一手资料](https://arxiv.org/abs/1801.01290)
- [一手资料](https://arxiv.org/abs/1802.09477)

[返回分层目录](00-learning-index.md)
