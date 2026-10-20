# Warmup / Warm Start

概念编号：`concept:warmup-warm-start` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/warmup-warm-start/)

## 第一层：概念入门 · 知其然

### 它是什么

预热逐渐增大学习率；热启动从已有模型或状态开始，两者不是一回事。

### 先看一个例子

目标学习率0.1，线性预热5步，从0开始。

### 理解练习

加载预训练权重就意味着已做学习率预热吗？

<details><summary>答案与解释</summary>

不意味着，初始化来源与学习率计划相互独立。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 线性预热第t步ηₜ=η目标×t/T，适用于t≤T的声明约定。
2. 热启动是否还需优化器状态取决于继续训练还是仅借用权重微调。

### 具体输入与计算步骤

目标学习率0.1，线性预热5步，从0开始。

1. 第1步0.1/5=0.02，第3步0.06。
2. 第5步达到0.1，之后按后续调度，不继续无限增加。

计算结果：第5步达到0.1，之后按后续调度，不继续无限增加。

### 换到实际问题中应用

微调大模型时初期更新不稳定。

1. 加载合适预训练权重，并为当前优化器配置独立预热。
2. 按真实优化器步计数，记录初期损失与梯度验证收益。

应用结论：按真实优化器步计数，记录初期损失与梯度验证收益。

### 举一反三：改变条件后的完整解答

若累计4微批更新一次，5步预热需多少微批？

<details><summary>变式的推演与答案</summary>

1. 每步需要4个微批。
2. 共5×4=20个微批，不能处理5个微批就认为预热结束。

共5×4=20个微批，不能处理5个微批就认为预热结束。

</details>

### 原有解释与进一步例题


### 原理与推演

Warmup first uses a smaller learning rate at the beginning of training, and then gradually increases it to the target level. Its purpose is to get training off to a smoother start, rather than letting the GPU heat up first. Then other scheduling methods are usually added. Not all models must use warmup; warmup that is too long can also eat up the effective training budget. Warmup is different from warm start: the latter usually refers to continuing from an existing model or state, rather than starting over from random initialization.


### 例子

例子：目标学习率为 0.001，线性 warmup 五次更新，可依次用 0.0002、0.0004、0.0006、0.0008、0.001。warm start 则从既有参数继续训练；恢复优化器、调度器与随机状态是否同时恢复，需要另行说明。


### 适用边界与常见误解

They describe different mechanisms and can be used together.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/optim.html)

[返回分层目录](00-learning-index.md)
