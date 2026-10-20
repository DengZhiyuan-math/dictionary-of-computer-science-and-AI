# Off-policy / Offline RL

概念编号：`concept:off-policy-offline-rl` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/off-policy-offline-rl/)

## 第一层：概念入门 · 知其然

### 它是什么

Offline RL trains on a fixed collection of interactions without gathering new experience from the environment during training. It can overestimate actions poorly covered by the dataset. CQL addresses this with conservative value estimation; IQL fits values and extracts a policy while limiting dependence on evaluating actions outside the data. Neither creates missing coverage. Offline evaluation is also an imperfect substitute for safe, controlled real-world validation.

### 先看一个例子

例子：日志只记录在某状态选择“等待”，从未记录“大额买入”。离线算法即使给后者估出高价值，也缺少相应数据支持；在仿真里选择它不等于已验证真实成交。off-policy 指学习目标策略可不同于采样策略，offline 另强调训练期间不再收集新交互。

### 理解练习

用自己的话解释：上面的情景为什么是“Off-policy / Offline RL”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Offline RL trains on a fixed collection of interactions without gathering new experience from the environment during training. It can overestimate actions poorly covered by the dataset. CQL addresses this with conservative value estimation; IQL fits values and extracts a policy while limiting dependence on evaluating actions outside the data. Neither creates missing coverage. Offline evaluation is also an imperfect substitute for safe, controlled real-world validation.

情景依据：例子：日志只记录在某状态选择“等待”，从未记录“大额买入”。离线算法即使给后者估出高价值，也缺少相应数据支持；在仿真里选择它不等于已验证真实成交。off-policy 指学习目标策略可不同于采样策略，offline 另强调训练期间不再收集新交互。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Offline RL trains on a fixed collection of interactions without gathering new experience from the environment during training. It can overestimate actions poorly covered by the dataset. CQL addresses this with conservative value estimation; IQL fits values and extracts a policy while limiting dependence on evaluating actions outside the data. Neither creates missing coverage. Offline evaluation is also an imperfect substitute for safe, controlled real-world validation.


### 例子

例子：日志只记录在某状态选择“等待”，从未记录“大额买入”。离线算法即使给后者估出高价值，也缺少相应数据支持；在仿真里选择它不等于已验证真实成交。off-policy 指学习目标策略可不同于采样策略，offline 另强调训练期间不再收集新交互。


### 适用边界与常见误解

An off-policy algorithm can also collect new experience continuously online.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
