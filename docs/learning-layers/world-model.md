# World Model

概念编号：`concept:world-model` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/world-model/)

## 第一层：概念入门 · 知其然

### 它是什么

世界模型学习动作如何改变环境，并预测结果，供规划或想象训练使用。

### 先看一个例子

简化位置模型x新=x+u，当前位置2，动作序列1、−0.5。

### 理解练习

预测准确一小步就保证长期规划准确吗？

<details><summary>答案与解释</summary>

不保证，小误差可能沿多步累积。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 模型可预测观察或潜在状态，并结合奖励模型估算行动价值。
2. 滚动模型得到想象轨迹，策略可能偏向模型乐观误差，因此要回真实环境校验。

### 具体输入与计算步骤

简化位置模型x新=x+u，当前位置2，动作序列1、−0.5。

1. 第一步位置2+1=3。
2. 第二步3−0.5=2.5，模型给出两步轨迹[3,2.5]。

计算结果：第二步3−0.5=2.5，模型给出两步轨迹[3,2.5]。

### 换到实际问题中应用

移动机器人比较候选短路径。

1. 用历史状态动作拟合动力学，在模型中检查路径与障碍风险。
2. 只执行首段后重新观察规划，减轻长期模型漂移。

应用结论：只执行首段后重新观察规划，减轻长期模型漂移。

### 举一反三：改变条件后的完整解答

若每一步都低估位移0.1，两步误差多少？

<details><summary>变式的推演与答案</summary>

1. 实际两步比预测各多0.1。
2. 在此加法模型中累计误差0.2，预测2.5而实际2.7。

在此加法模型中累计误差0.2，预测2.5而实际2.7。

</details>

### 原有解释与进一步例题


### 原理与推演

A world model learns a model of the environment: its current state and how that state may change after actions. It need not generate high-resolution images or be a natural language model. It can predict future scenes at pixel level, or predict compressed internal states or representations.

Imagine a football agent observing player positions, ball velocity and defensive formations. A policy directly chooses whether to pass or shoot. A system with a world model can also predict how the defense might change over the next two seconds after a pass to a teammate on the left. It can compare predicted outcomes before choosing an action.

A physics simulator, such as a rigid-body dynamics engine, explicitly implements physical rules. A learned world model infers environmental dynamics from data. Simulators often make their rules clearer but can be costly to model or run; learned models are flexible but need not be physically accurate. Hybrid models combine known physics with learned components.

Causal modeling asks whether changing an action causes a particular outcome. A counterfactual asks what would have happened had a different action been taken. Predictive uncertainty matters: when a world model lacks relevant experience, the system should recognize that its predictions may be unreliable. Compounding error is central to long-horizon prediction. Partial observability means that sensors often reveal only part of the true state.

In an interview, distinguish a VLA from a world model by its role. A VLA maps observations and goals to actions; a world model predicts environmental change. A VLA system may have no explicit world model, or may use one to support planning, check predicted action consequences or generate training data.

There is no general-purpose world model that reliably simulates every real scenario. World modeling encompasses active research in video prediction, abstract representations, self-supervised learning, interactive environments, control and planning. Understanding these limits supports more precise discussion than listing model names alone.


### 适用边界与常见误解

Realistic video does not automatically provide reliable action-conditioned prediction or control.

### 例题：World Models: Prediction Error and Feedback Correction

One-dimensional position x starts at 0 and targets 5. The real system follows x_next=x+u+wind, while the predictor ignores wind. Actions are restricted to [-1,1].

1. A fixed-action policy always uses u=1. With wind=-0.3, each real movement is only 0.7, so predictions and observations diverge.
2. A feedback policy observes again each step and uses u=clip(5-x,-1,1). Its action shrinks as it approaches the target.
3. With wind=-0.3, feedback settles near 4.7, retaining a steady-state offset. Fixed actions continue past the target.

结果：Closed-loop feedback changes accumulated error, but a proportional policy without wind compensation cannot eliminate every offset. The demo shows predicted and actual next positions together.

易错点：This is not full MPC: it neither optimizes a multistep action sequence nor trains a world model. The simplified dynamics illustrate prediction, observation and feedback.

变式：With zero wind, what happens after the feedback policy reaches 5?

参考答案：Its action becomes 0 and position remains 5. The fixed-action policy keeps moving by 1 each step.

### 推导与方法参考

- [一手资料](http://incompleteideas.net/book/the-book-2nd.html)

[返回分层目录](00-learning-index.md)
