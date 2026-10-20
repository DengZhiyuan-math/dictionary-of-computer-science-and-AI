# Huber Loss

概念编号：`concept:huber-loss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/huber-loss/)

## 第一层：概念入门 · 知其然

### 它是什么

Huber损失对小误差用平方，对大误差用线性，兼顾平滑和抗异常值。

### 先看一个例子

误差r=3，分界δ=1。

### 理解练习

大误差惩罚完全不增长吗？

<details><summary>答案与解释</summary>

仍线性增长，只是不再平方增长。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 若abs(r)≤δ，L=r²/2；否则L=δ(abs(r)−δ/2)。
2. 两段在δ处数值和斜率相接，大误差梯度幅度限制为δ。

### 具体输入与计算步骤

误差r=3，分界δ=1。

1. r=3时L=1×(3−0.5)=2.5。
2. 对比半平方损失9/2=4.5；Huber梯度1而非3。

计算结果：对比半平方损失9/2=4.5；Huber梯度1而非3。

### 换到实际问题中应用

传感器回归含少量离群读数。

1. 按目标量纲选择δ，并在验证集对比MAE、RMSE与异常点表现。
2. 保留正常小误差的平滑梯度，降低极端样本支配更新的程度。

应用结论：保留正常小误差的平滑梯度，降低极端样本支配更新的程度。

### 举一反三：改变条件后的完整解答

若误差改为0.5，δ仍1呢？

<details><summary>变式的推演与答案</summary>

1. 落在平方段，L=0.5²/2=0.125。
2. 梯度0.5，与局部平方损失一致。

梯度0.5，与局部平方损失一致。

</details>

### 原有解释与进一步例题


### 原理与推演

Huber loss behaves like squared error for small errors and more like absolute error for large errors, balancing smoothness and robustness to outliers. Quantile loss, also called pinball loss, assigns different costs to overestimation and underestimation to learn a conditional quantile. Inventory planning, for example, may require a conservative high-demand quantile as well as average demand. Choose a loss based on what should be predicted and the costs of different errors, rather than the popularity of an abbreviation.

Interview answer: BCE is used for binary probability predictions and strongly penalizes confidently wrong predictions. Mutually exclusive multiclass tasks commonly use multiclass cross-entropy. For continuous-value prediction, consider MSE, MAE or Huber loss. Model architecture and loss function are separate choices; the same network can be trained with different objectives.


### 适用边界与常见误解

The transition scale still needs to suit the task.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/generated/torch.nn.HuberLoss.html)

[返回分层目录](00-learning-index.md)
