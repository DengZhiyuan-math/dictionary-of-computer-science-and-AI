# PID / MPC

概念编号：`concept:pid-mpc` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/pid-mpc/)

## 第一层：概念入门 · 知其然

### 它是什么

PID adjusts control using current error, accumulated error and the rate of error change to track a desired state. The proportional term responds to deviation, the integral term handles persistent offset, and the derivative term can provide damping. Noise, delay and tuning affect stability. PID is not learned from large video datasets, but is useful in many stabilization tasks.

### 先看一个例子

One-dimensional position x starts at 0 and targets 5. The real system follows x_next=x+u+wind, while the predictor ignores wind. Actions are restricted to [-1,1].
Closed-loop feedback changes accumulated error, but a proportional policy without wind compensation cannot eliminate every offset. The demo shows predicted and actual next positions together.

### 理解练习

With zero wind, what happens after the feedback policy reaches 5?

<details><summary>答案与解释</summary>

Its action becomes 0 and position remains 5. The fixed-action policy keeps moving by 1 each step.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

PID adjusts control using current error, accumulated error and the rate of error change to track a desired state. The proportional term responds to deviation, the integral term handles persistent offset, and the derivative term can provide damping. Noise, delay and tuning affect stability. PID is not learned from large video datasets, but is useful in many stabilization tasks.


### 适用边界与常见误解

The prediction horizon may differ from the executed horizon.

### 例题：World Models: Prediction Error and Feedback Correction

One-dimensional position x starts at 0 and targets 5. The real system follows x_next=x+u+wind, while the predictor ignores wind. Actions are restricted to [-1,1].

1. A fixed-action policy always uses u=1. With wind=-0.3, each real movement is only 0.7, so predictions and observations diverge.
2. A feedback policy observes again each step and uses u=clip(5-x,-1,1). Its action shrinks as it approaches the target.
3. With wind=-0.3, feedback settles near 4.7, retaining a steady-state offset. Fixed actions continue past the target.

结果：Closed-loop feedback changes accumulated error, but a proportional policy without wind compensation cannot eliminate every offset. The demo shows predicted and actual next positions together.

易错点：This is not full MPC: it neither optimizes a multistep action sequence nor trains a world model. The simplified dynamics illustrate prediction, observation and feedback.

变式：With zero wind, what happens after the feedback policy reaches 5?

参考答案：Its action becomes 0 and position remains 5. The fixed-action policy keeps moving by 1 each step.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
