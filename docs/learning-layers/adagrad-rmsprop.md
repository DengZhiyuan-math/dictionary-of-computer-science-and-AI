# Adagrad / RMSProp

概念编号：`concept:adagrad-rmsprop` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/adagrad-rmsprop/)

## 第一层：概念入门 · 知其然

### 定义

AdaGrad 与 RMSProp 都是按参数分别缩放更新步长的梯度优化方法。梯度表示当前误差对参数变化的敏感程度；基本梯度下降用学习率乘梯度决定更新量。AdaGrad 累积每个参数历次梯度的平方，用其平方根缩小该参数步长；RMSProp 则对平方梯度作指数加权平均，逐渐降低旧记录的权重。分母中通常加入很小的正数以避免除零。

### 概念边界与常见混淆

AdaGrad 的累计量不减，长期可能使有效步长很小。RMSProp 的平均可随近期梯度改变，但它同样需要选择学习率及平均系数，并不保证在任意问题上优于普通梯度下降。

### 先看一个例子

忽略防除零项、学习率设为 1，同一参数连续两次梯度都是 2。AdaGrad 的平方累计为 4、8，更新大小分别为 2/√4=1 与 2/√8≈0.707。即使当前梯度相同，历史改变也使步长改变；这些是说明机制的数值，不是训练效果承诺。

### 理解练习

#### 1. 不同参数

两个参数当前梯度相同，AdaGrad 的更新大小是否必相同？

<details><summary>答案与解释</summary>

不必。各参数有自己的历史平方累计量，累计较大的参数分母较大、更新较小。

</details>

#### 2. 长期记录

AdaGrad 后来遇到很多小梯度，早年的大平方梯度会自动从累计中消失吗？

<details><summary>答案与解释</summary>

不会，普通 AdaGrad 是一直累加。RMSProp 的指数平均才会逐渐降低旧值的影响，两者的历史机制不同。

</details>

#### 3. 下降方向

用平方梯度缩放，是否表示更新不再区分当前梯度正负？

<details><summary>答案与解释</summary>

没有。平方进入正的尺度分母，分子仍是带符号的当前梯度；按梯度下降规则反向更新。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. AdaGrad 用 G←G+g²，更新量为 ηg/√G，频繁大梯度使后续步长缩小。
2. RMSProp 用 v←ρv+(1−ρ)g²，避免平方和永远累增。

### 具体输入与计算步骤

梯度2，历史平方和5，学习率0.1，忽略极小稳定项。

1. AdaGrad 新G=5+2²=9，更新幅度0.1×2/3=0.0667。
2. RMSProp 若旧v=1、ρ=0.9，则新v=1.3，幅度0.2/√1.3≈0.1754。

计算结果：RMSProp 若旧v=1、ρ=0.9，则新v=1.3，幅度0.2/√1.3≈0.1754。

### 换到实际问题中应用

训练稀疏词特征，常见词更新远多于罕见词。

1. 分别累计每个词参数的平方梯度，再按各自累计值缩放更新。
2. 常见词的有效步长通常更小；用验证集决定是否优于统一步长。

应用结论：常见词的有效步长通常更小；用验证集决定是否优于统一步长。

### 举一反三：改变条件后的完整解答

AdaGrad 下一次梯度仍为2，更新会怎样？

<details><summary>变式的推演与答案</summary>

1. G从9增到13。
2. 幅度0.2/√13≈0.0555，小于0.0667。

幅度0.2/√13≈0.0555，小于0.0667。

</details>

### 原有解释与进一步例题


### 原理与推演

AdaGrad scales each parameter’s update using its past gradients. This is useful for sparse features, but cumulative statistics can make effective step sizes increasingly small. RMSProp uses moving averages of recent squared gradients to limit that continual decay. These are adaptive step-size methods: parameters can receive different effective update scales. Adaptive does not mean that the learning rate needs no tuning or that validation is unnecessary.


### 例子

例子：当前梯度为 2，AdaGrad 既有平方梯度和为 5，学习率 0.1，忽略 ε 时本次更新幅度为 0.2/√9≈0.0667。若 RMSProp 的衰减为 0.9、旧均方为 1，则新均方为 0.9×1+0.1×4=1.3。两种方法保存历史的方式不同。


### 适用边界与常见误解

Adaptation still requires setting and validating the learning rate.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.optim.Adagrad.html)
- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.optim.RMSprop.html)

[返回分层目录](00-learning-index.md)
