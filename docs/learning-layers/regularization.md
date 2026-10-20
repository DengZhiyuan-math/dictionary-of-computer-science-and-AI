# Regularization

概念编号：`concept:regularization` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/regularization/)

## 第一层：概念入门 · 知其然

### 它是什么

正则化通过限制模型或增加惩罚，减少对训练噪声的过度拟合。

### 先看一个例子

数据损失1，参数w=2，目标增加λw²/2，λ=0.1。

### 理解练习

正则越强一定越好吗？

<details><summary>答案与解释</summary>

不是，过强会使模型欠拟合。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 总目标J=L+λR，参数更新同时考虑数据与复杂度约束。
2. 以L2为例，惩罚梯度λw把权重向0拉，但不保证稀疏。

### 具体输入与计算步骤

数据损失1，参数w=2，目标增加λw²/2，λ=0.1。

1. 惩罚0.1×2²/2=0.2，总目标1.2。
2. 附加梯度0.1×2=0.2，学习率0.1时单独使w减少0.02。

计算结果：附加梯度0.1×2=0.2，学习率0.1时单独使w减少0.02。

### 换到实际问题中应用

高维小样本回归。

1. 仅在训练拟合参数，用验证集比较多个正则强度。
2. 报告训练与验证误差差距，确认没有因抑制过强损害两者。

应用结论：报告训练与验证误差差距，确认没有因抑制过强损害两者。

### 举一反三：改变条件后的完整解答

若λ从0.1变1，惩罚梯度多少？

<details><summary>变式的推演与答案</summary>

1. 梯度λw=1×2=2。
2. 同学习率附加更新0.2，强度增10倍，需要重新验证拟合与泛化。

同学习率附加更新0.2，强度增10倍，需要重新验证拟合与泛化。

</details>

### 原有解释与进一步例题


### 定义

正则化通过限制模型复杂度、约束参数或改变训练过程，降低对有限训练样本偶然特征的依赖。它通常引入偏差以换取更稳定的泛化，不保证在每个测试集上改善。Dropout 的机制与例子集中在独立方法页。


### 参数与公式

参数惩罚的一种形式为 $J(\theta)=L_{\mathrm{train}}(\theta)+\lambda R(\theta)$，L 为训练损失，R 为复杂度惩罚，λ≥0 为强度。L2 惩罚常取参数平方和，L1 常取绝对值和；惩罚是否含偏置、是否除样本数须注明。


### 例子

若训练损失为 3，单个权重 w=2，R=w²、λ=0.1，则总目标为 3.4。把 w 缩小虽降低惩罚，也可能增加拟合误差；需要优化完整目标，并在独立验证数据上选择 λ，而不是只追求更小权重。


### 适用边界与常见误解

Excessive regularization can suppress real signal.

### 领域应用

- [Covariance Shrinkage · 组合风险估计的收缩](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-covariance-shrinkage.md)：复用限制估计噪声与结构复杂度的思想，单独说明协方差矩阵如何向结构目标收缩。
- [Ridge Lasso · 金融因子回归的正则化](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-ridge-lasso.md)：先理解惩罚强度与偏差、方差的取舍，再比较金融因子的 L1、L2 回归。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/linear_model.html#ridge-regression-and-classification)

[返回分层目录](00-learning-index.md)
