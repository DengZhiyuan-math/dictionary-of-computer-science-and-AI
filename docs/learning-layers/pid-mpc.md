# PID / MPC

概念编号：`concept:pid-mpc` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/pid-mpc/)

## 第一层：概念入门 · 知其然

### 它是什么

PID按当前、累计与变化中的误差调控制量；MPC用模型预测未来并在约束内优化动作。

### 先看一个例子

目标温度20，当前18，比例增益2，暂不使用积分微分。

### 理解练习

PID一定需要完整动力学模型吗？

<details><summary>答案与解释</summary>

不需要完整预测模型，但仍需合适整定与稳定性验证。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. PID比例项Kp×误差，积分消除持续偏差，微分响应变化趋势。
2. MPC对未来状态递推并最小化目标，每次只执行首个动作后重新规划。

### 具体输入与计算步骤

目标温度20，当前18，比例增益2，暂不使用积分微分。

1. 误差20−18=2，比例控制量2×2=4。
2. 若执行器上限3，实际只能输出3，积分部分还需防饱和积累。

计算结果：若执行器上限3，实际只能输出3，积分部分还需防饱和积累。

### 换到实际问题中应用

控制有功率上限的恒温设备。

1. 简单回路先整定PID并测试超调；若需显式预测温度约束可构建MPC。
2. 用实际温度反馈持续纠偏，并验证模型失配时表现。

应用结论：用实际温度反馈持续纠偏，并验证模型失配时表现。

### 举一反三：改变条件后的完整解答

若目标改16、当前18，比例输出多少？

<details><summary>变式的推演与答案</summary>

1. 误差16−18=−2，控制量−4。
2. 仅加热设备若下限0则输出0，不能命令负功率当制冷。

仅加热设备若下限0则输出0，不能命令负功率当制冷。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://www.cds.caltech.edu/~murray/books/AM08/pdf/am08-complete_22Feb09.pdf)

[返回分层目录](00-learning-index.md)
