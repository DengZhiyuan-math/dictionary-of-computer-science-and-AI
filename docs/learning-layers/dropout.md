# Dropout

概念编号：`concept:dropout` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dropout/)

## 第一层：概念入门 · 知其然

### 定义

Dropout 是训练中的随机正则化方法：对指定层的部分数值按给定概率置零，迫使模型在不同随机子路径下完成任务，减少对固定组合的依赖。常见的反向缩放实现把保留值除以保留概率，使每个数值在随机屏蔽下的期望不变；通常评估时关闭屏蔽。屏蔽的是一次计算中的数值，不是永久删除参数。

### 概念边界与常见混淆

屏蔽率更高不一定正则更好，过强会使有效信息不足。训练与评估模式应一致地控制；固定随机种子是复现实验的工具，不是使 Dropout 永远使用同一张掩码的理由。

### 先看一个例子

输入 [2,4]、屏蔽概率 0.5，若这次保留第一项而屏蔽第二项，反向缩放输出为 [4,0]；另一次可能为 [0,8]。第一项输出以各一半概率为 4 或 0，期望仍为 2。评估时通常直接使用 [2,4]。保持单个数值期望不保证整个非线性网络的输出期望精确相同。

### 理解练习

#### 1. 缩放含义

保留概率 0.25、输入数值 3，保留时输出多少？

<details><summary>答案与解释</summary>

反向缩放实现中为 3/0.25=12，屏蔽时为 0，期望 0.25×12=3。需先说明使用这种实现约定。

</details>

#### 2. 永久变化

一次把某项置零，是否意味着对应权重从模型中删除？

<details><summary>答案与解释</summary>

不意味着。下一次可能重新保留，权重仍参与训练；随机数值屏蔽与结构剪枝不同。

</details>

#### 3. 评估模式

评估忘记关闭随机屏蔽，重复同一输入结果可能怎样？

<details><summary>答案与解释</summary>

结果可能随机变化，且与通常部署模式不一致。若故意用多次随机预测估计不确定性，应明确这是另一种评估设计。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 保留概率q=1−p，输出mx/q，其中m以概率q为1。
2. 期望E[mx/q]=x，使随机训练均值与推理尺度一致。

### 具体输入与计算步骤

输入2，丢弃概率0.5，采用保留时放大的实现。

1. 输出以各0.5概率为0或2/0.5=4。
2. 均值0.5×0+0.5×4=2；普通推理直接输出2。

计算结果：均值0.5×0+0.5×4=2；普通推理直接输出2。

### 换到实际问题中应用

小数据分类器发生过拟合。

1. 在隐藏层加入适度dropout，用验证集选择丢弃率。
2. 评估时禁用dropout，避免随机变化混入模型比较。

应用结论：评估时禁用dropout，避免随机变化混入模型比较。

### 举一反三：改变条件后的完整解答

丢弃率升为0.75，保留的2变成多少？

<details><summary>变式的推演与答案</summary>

1. q=0.25，保留值2/0.25=8。
2. 均值仍0.25×8=2，但方差增加，不保证泛化更好。

均值仍0.25×8=2，但方差增加，不保证泛化更好。

</details>

### 原有解释与进一步例题


### 原理与推演

Dropout randomly masks activations during training to reduce reliance on particular information pathways. Inference normally disables this masking, with scaling handled according to the implementation. Dropout does not permanently delete neurons after training. Drop path and stochastic depth randomly skip paths or residual branches in suitable architectures, providing more structured stochastic regularization. Their benefit depends on the architecture and data; adding more does not always help.


### 例子

例子：训练时保留概率为 0.5，输入激活为 4，采用 inverted dropout 后输出以各半概率为 0 或 8，期望仍为 4。推理时通常直接使用 4。一次被保留的输出翻倍，不代表模型在推理时还应再乘一次 0.5。


### 适用边界与常见误解

Standard inference does not permanently delete neurons.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.Dropout.html)

[返回分层目录](00-learning-index.md)
