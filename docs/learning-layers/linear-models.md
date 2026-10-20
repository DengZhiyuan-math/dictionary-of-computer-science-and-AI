# Linear Models

概念编号：`concept:linear-models` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/linear-models/)

## 第一层：概念入门 · 知其然

### 它是什么

A linear model predicts by adding weighted input features and an intercept. Linear describes dependence on the fitted coefficients; input features may themselves contain nonlinear transformations.

### 先看一个例子

If x is measured in meters, changing it to centimeters requires changing the coefficient accordingly. A fitted relationship predicts association and does not by itself establish causality.

### 理解练习

用自己的话解释：上面的情景为什么是“Linear Models”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A linear model predicts by adding weighted input features and an intercept. Linear describes dependence on the fitted coefficients; input features may themselves contain nonlinear transformations.

情景依据：If x is measured in meters, changing it to centimeters requires changing the coefficient accordingly. A fitted relationship predicts association and does not by itself establish causality.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

The prediction is y_hat=β_0+Σ_j β_j x_j. Ordinary least squares chooses coefficients minimizing the sum of squared prediction errors. β_0 is the intercept; β_j measures the contribution per unit of feature x_j in the model. Correlated inputs can make coefficients unstable.


### Example

For y_hat=2+3x, input x=4 gives prediction 14. If x is measured in meters, changing it to centimeters requires changing the coefficient accordingly. A fitted relationship predicts association and does not by itself establish causality.


### 适用边界与常见误解

Logistic regression usually models classification probabilities; “regression” in its name does not restrict outputs to continuous targets.

### 领域应用

- [Neutralization · 金融截面的残差化与暴露约束](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-neutralization.md)：线性回归定义统一保留，金融应用区分特征残差化与最终组合的风险中性。
- [Ridge Lasso · 金融因子回归的正则化](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-ridge-lasso.md)：把线性模型扩展到相关金融因子的收缩估计，解释目标口径、参数尺度和时间选参。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
