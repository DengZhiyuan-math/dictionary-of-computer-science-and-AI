# Regularization

概念编号：`concept:regularization` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/regularization/)

## 第一层：概念入门 · 知其然

### 它是什么

正则化通过限制模型复杂度、约束参数或改变训练过程，减少模型对训练样本偶然细节的依赖。

### 先看一个例子

拟合几个测量点时，一条绕来绕去的曲线能穿过每个点；适当限制曲线复杂度，可能更接近新测量点的规律，但也可能限制过头。

### 理解练习

正则化越强，模型对新数据就一定越好吗？

<details><summary>答案与解释</summary>

不是。过强的限制会使模型连真实规律也学不到。强度需要通过独立验证来选择。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
