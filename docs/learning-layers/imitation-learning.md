# Imitation Learning

概念编号：`concept:imitation-learning` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/imitation-learning/)

## 第一层：概念入门 · 知其然

### 它是什么

模仿学习从专家示范学习行动规则；行为克隆把观测映射到示范行动，但执行时会遇到自己造成的新状态。

### 先看一个例子

跟着教练录像学开车，偏离车道后可能看到录像里没有的景象。

### 理解练习

录像里会开车，为什么偏离车道后会失误？

<details><summary>答案与解释</summary>

它进入专家示范未覆盖的状态，小错误改变未来输入分布。

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
