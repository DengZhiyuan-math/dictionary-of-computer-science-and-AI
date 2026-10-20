# Imitation Learning

概念编号：`concept:imitation-learning` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/imitation-learning/)

## 第一层：概念入门 · 知其然

### 定义

模仿学习利用示范中的观测、行动或轨迹，学习在相似任务中怎样行动。行为克隆是最直接的一种：把示范者看到的信息当作输入、采取的行动当作目标，按监督学习训练行动预测器。这里的策略是从观测到行动的规则；示范提供“做过什么”，不自动说明所有情况下“应该做什么”。

### 概念边界与常见混淆

模仿学习不等同于强化学习的试错奖励优化，也不保证超过或完整复制专家。示范质量、观测是否包含决策依据，以及执行时遇到的状态，都影响能学到什么。

### 先看一个例子

训练小车沿线行驶，示范多是在车身居中的状态向前走。行为克隆若学会这类动作，实际行驶稍偏离后可能遇到示范中没有的画面；继续直行会偏得更远。补充偏离后的纠正示范，才直接提供“怎样回到中线”的信息。这个问题来自执行中的状态变化，不只是单张图像预测误差。

### 理解练习

#### 1. 训练目标

行为克隆中，输入是相机画面、目标是方向盘角度，是否必须同时提供每步奖励？

<details><summary>答案与解释</summary>

不必须。监督信号来自示范行动；可以另加奖励训练，但那是扩展，不是行为克隆的必要条件。

</details>

#### 2. 低误差与可靠执行

随机留出示范图像上的误差很小，为什么仍可能连续行驶失败？

<details><summary>答案与解释</summary>

执行时误差会改变之后的输入，带车进入示范少见的偏离状态。独立图像上的误差没有检验这种反馈过程，应测试整段执行与恢复。

</details>

#### 3. 信息不足

专家能听到警报而模型只看到画面，冲突行动能单靠更多同类画面解决吗？

<details><summary>答案与解释</summary>

不能保证。相同画面可能因未观测警报对应不同正确动作，应补充相关观测或接受信息不足造成的不确定性。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 行为克隆最小化示范状态上的行动损失。
2. 小错误改变后续状态分布，误差可累积；交互式收集纠正示范能覆盖新状态。

### 具体输入与计算步骤

10个示范，模型预测对8个、错2个。

1. 示范分类准确率8/10=80%。
2. 若简化假设每步独立正确率0.8，5步全对概率0.8^5=32.768%。

计算结果：现实错误相关，该乘法只是说明长程成功不等于单步准确率。

### 换到实际问题中应用

训练仓储机械臂模仿抓取。

1. 先在示范数据训练，再在安全仿真中运行。
2. 记录偏离状态并请专家给纠正行动，加入数据后重训。

应用结论：部署评价应看完整任务成功和失败状态覆盖。

### 举一反三：改变条件后的完整解答

若新增纠正数据使单步率到95%，5步简化成功率呢？

<details><summary>变式的推演与答案</summary>

1. 0.95^5≈0.7738。
2. 比0.32768高，但仍不是95%。

需要检验闭环轨迹，而不只离线准确率。

</details>

### 原有解释与进一步例题


### Definition

Imitation learning trains a policy using expert demonstrations. Behavior cloning is its supervised form: predict the demonstrated action from the recorded observation. Other imitation methods can query an expert or match broader behavior.


### Parameters and mechanism

For demonstrations (s_i,a_i), behavior cloning minimizes an action loss Σ_i L(π_θ(s_i),a_i). The dataset covers expert-visited states, which may differ from states reached after the learner makes mistakes; this is distribution shift.


### Example

A driving policy trained only on centered-lane images may drift slightly at deployment and encounter images absent from training. Collecting expert corrections on learner-visited states targets this coverage gap; simply lowering training loss on the original images may not.


### 适用边界与常见误解

Behavior cloning may fit demonstrations without keeping its own rollout states within the demonstration distribution.

### 推导与方法参考

- [一手资料](https://proceedings.mlr.press/v15/ross11a/ross11a.pdf)

[返回分层目录](00-learning-index.md)
