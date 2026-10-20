# Imitation Learning

概念编号：`concept:imitation-learning` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/imitation-learning/)

## 第一层：概念入门 · 知其然

### 它是什么

Imitation learning trains a policy using expert demonstrations. Behavior cloning is its supervised form: predict the demonstrated action from the recorded observation. Other imitation methods can query an expert or match broader behavior.

### 先看一个例子

A driving policy trained only on centered-lane images may drift slightly at deployment and encounter images absent from training. Collecting expert corrections on learner-visited states targets this coverage gap; simply lowering training loss on the original images may not.

### 理解练习

用自己的话解释：上面的情景为什么是“Imitation Learning”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Imitation learning trains a policy using expert demonstrations. Behavior cloning is its supervised form: predict the demonstrated action from the recorded observation. Other imitation methods can query an expert or match broader behavior.

情景依据：A driving policy trained only on centered-lane images may drift slightly at deployment and encounter images absent from training. Collecting expert corrections on learner-visited states targets this coverage gap; simply lowering training loss on the original images may not.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For demonstrations (s_i,a_i), behavior cloning minimizes an action loss Σ_i L(π_θ(s_i),a_i). The dataset covers expert-visited states, which may differ from states reached after the learner makes mistakes; this is distribution shift.


### 适用边界与常见误解

Behavior cloning may fit demonstrations without keeping its own rollout states within the demonstration distribution.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
