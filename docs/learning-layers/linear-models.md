# Linear Models

概念编号：`concept:linear-models` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/linear-models/)

## 第一层：概念入门 · 知其然

### 定义

线性预测模型把选定特征分别乘参数再相加，并可加截距。这里“线性”主要指对参数的线性组合；特征本身可以是原变量的平方或其他预先定义的变换。线性回归直接预测数值，逻辑回归则把组合分数通过sigmoid变成二类概率，后者并不表示概率随输入线性变化。

### 概念边界与常见混淆

特征共线会使个别系数不稳定；训练范围外线性外推可能不合理。模型简单不等于假设少，应核对误差结构及任务范围。

### 先看一个例子

房价模型为50+2×面积，单位约定面积平方米、价格万元，面积80预测210万元。系数2是模型控制其他特征时的关系，不自动表示多建一平方米就必然增加两万元。若加入面积平方，仍可对两个系数线性拟合。

### 理解练习

#### 1. 线性

y=a+bx+cx²对参数仍线性吗？

<details><summary>答案与解释</summary>

是，a、b、c都只一次出现，但关于x是二次曲线。

</details>

#### 2. 因果

系数为正足以证明主动改变特征会增加结果吗？

<details><summary>答案与解释</summary>

不足，混杂和选择可产生关联，需要因果设计。

</details>

#### 3. 外推

只用小房数据拟合，可保证超大房预测可靠？

<details><summary>答案与解释</summary>

不能，线性关系可能在范围外改变，应验证或限制使用范围。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 预测为wᵀφ(x)+b，φ可包含固定的基函数。
2. 平方损失对权重求导形成正规方程；实际求解常用数值稳定的分解而非显式求逆。

### 具体输入与计算步骤

模型y=2x+1，输入x=3。

1. x=3时预测2×3+1=7。
2. 若真实值8，误差7−8=−1，半平方损失0.5，对w梯度−1×3=−3。

计算结果：若真实值8，误差7−8=−1，半平方损失0.5，对w梯度−1×3=−3。

### 换到实际问题中应用

做可解释的房租基线。

1. 按训练数据拟合面积、位置编码与房龄权重，必要时加入正则。
2. 验证残差模式与外推风险，权重相关不自动证明因果。

应用结论：验证残差模式与外推风险，权重相关不自动证明因果。

### 举一反三：改变条件后的完整解答

若改为逻辑回归分数z=2x+1，x=0时概率多少？

<details><summary>变式的推演与答案</summary>

1. 分数z=1，不直接作为概率。
2. σ(1)=1/(1+e⁻¹)≈0.7311，说明逻辑回归用于分类概率。

σ(1)=1/(1+e⁻¹)≈0.7311，说明逻辑回归用于分类概率。

</details>

### 原有解释与进一步例题


### Definition

A linear model predicts by adding weighted input features and an intercept. Linear describes dependence on the fitted coefficients; input features may themselves contain nonlinear transformations.


### Parameters and mechanism

The prediction is y_hat=β_0+Σ_j β_j x_j. Ordinary least squares chooses coefficients minimizing the sum of squared prediction errors. β_0 is the intercept; β_j measures the contribution per unit of feature x_j in the model. Correlated inputs can make coefficients unstable.


### Example

For y_hat=2+3x, input x=4 gives prediction 14. If x is measured in meters, changing it to centimeters requires changing the coefficient accordingly. A fitted relationship predicts association and does not by itself establish causality.


### 适用边界与常见误解

Logistic regression usually models classification probabilities; “regression” in its name does not restrict outputs to continuous targets.

### 领域应用

- [Neutralization · 金融截面的残差化与暴露约束](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-neutralization.md)：线性回归定义统一保留，金融应用区分特征残差化与最终组合的风险中性。
- [Ridge Lasso · 金融因子回归的正则化](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-ridge-lasso.md)：把线性模型扩展到相关金融因子的收缩估计，解释目标口径、参数尺度和时间选参。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/linear_model.html)

[返回分层目录](00-learning-index.md)
