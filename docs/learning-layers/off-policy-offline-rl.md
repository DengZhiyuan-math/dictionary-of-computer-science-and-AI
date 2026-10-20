# Off-policy / Offline RL

概念编号：`concept:off-policy-offline-rl` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/off-policy-offline-rl/)

## 第一层：概念入门 · 知其然

### 定义

离策略描述学习规则与采样策略的关系：可用另一种行动策略收集的数据来学习目标策略。离线强化学习描述数据获取约束：学习期间只使用固定已有数据，不再主动与环境交互。两者不是同义词；在线离策略算法可以不断收集新数据，离线学习则需要面对目标行动可能不在数据覆盖中的问题。

### 概念边界与常见混淆

复用数据不代表任意分布都可无条件学习。覆盖不足、选择偏差和估值误差可能被优化放大，离线评估也需要额外假设。

### 先看一个例子

仓库机器人保留旧策略的行动和后果。继续运行机器人收集新经历，同时利用旧记录学习，是在线离策略；训练时关闭交互，只用这批日志，则是离线。若日志从未尝试某种急转弯，模型对该动作给高价值不意味着真实安全。

### 理解练习

#### 1. 分类

经验回放持续加入新数据，是否必然是离线学习？

<details><summary>答案与解释</summary>

不是，离线指不能收集新数据，不是指使用了历史记录。

</details>

#### 2. 覆盖

日志里动作从未出现，能从高模型分数直接认证它最好吗？

<details><summary>答案与解释</summary>

不能，缺少实际支持，可能是外推错误而非高收益。

</details>

#### 3. 两种关系

新策略与采样策略不同，就说明训练没有环境交互吗？

<details><summary>答案与解释</summary>

不说明，那只描述离策略；是否交互是在线与离线的另一维度。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 离策略更新需要处理行为分布与目标策略分布的差异。
2. 离线不能采样纠正未知区域，因此常限制策略偏离数据或保守估值。

### 具体输入与计算步骤

数据只含状态s下动作A，平均回报2，从未尝试B。

1. 观察到A回报[1,3]，经验均值(1+3)/2=2。
2. B样本数0，无法仅凭这批数据直接算出可靠经验均值。

计算结果：B样本数0，无法仅凭这批数据直接算出可靠经验均值。

### 换到实际问题中应用

从历史推荐日志学习策略。

1. 检查动作覆盖与日志策略，按用户或时间切分并做合适离线评估。
2. 对未覆盖动作保持谨慎，并在获授权的小流量验证后再扩大。

应用结论：对未覆盖动作保持谨慎，并在获授权的小流量验证后再扩大。

### 举一反三：改变条件后的完整解答

若重新允许采样B，还是严格离线学习吗？

<details><summary>变式的推演与答案</summary>

1. 不再满足固定数据、无环境交互的条件。
2. 可进入在线或离线到在线阶段，用新观察纠正B估值。

可进入在线或离线到在线阶段，用新观察纠正B估值。

</details>

### 原有解释与进一步例题


### 原理与推演

Offline RL trains on a fixed collection of interactions without gathering new experience from the environment during training. It can overestimate actions poorly covered by the dataset. CQL addresses this with conservative value estimation; IQL fits values and extracts a policy while limiting dependence on evaluating actions outside the data. Neither creates missing coverage. Offline evaluation is also an imperfect substitute for safe, controlled real-world validation.


### 例子

例子：日志只记录在某状态选择“等待”，从未记录“大额买入”。离线算法即使给后者估出高价值，也缺少相应数据支持；在仿真里选择它不等于已验证真实成交。off-policy 指学习目标策略可不同于采样策略，offline 另强调训练期间不再收集新交互。


### 适用边界与常见误解

An off-policy algorithm can also collect new experience continuously online.

### 推导与方法参考

- [一手资料](http://incompleteideas.net/book/the-book-2nd.html)

[返回分层目录](00-learning-index.md)
