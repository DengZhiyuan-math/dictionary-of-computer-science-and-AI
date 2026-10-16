---
title: "第 26 讲 · 线性模型家族：回归、Ridge、Lasso、Logistic 与 GAM"
aliases: []
tags: ["chapter","area/ml-methods"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/机器学习与统计模型|机器学习与统计模型]]

## 本讲概念

- [[Concepts/线性模型与正则化|线性模型与正则化]]

<a id="chapter-26"></a>

## 第 26 讲｜线性模型家族：回归、Ridge、Lasso、Logistic 与 GAM

领域：机器学习算法 · 细讲

<a id="chapter-26-section-01"></a>

### Linear Regression，线性回归【重点】

线性回归用输入特征的加权组合预测一个连续量，例如根据面积、位置和楼龄预测房价。它可以作为快速、可解释的基线。所谓线性，主要是针对可学习系数；预先加入平方项、交互项或其他变换后，也能描述一定的非线性关系。系数大小不能脱离单位与特征相关性解释，更不能直接读成因果效应。模型在训练范围外可以给出外推，但外推不一定可信。

<a id="chapter-26-section-02"></a>

### Ridge、Lasso、Elastic Net【重点】

Ridge，岭回归，在拟合误差之外惩罚过大的系数，常用于特征相关、估计不稳定的情况。Lasso 使用另一种惩罚，能把部分系数压到零，因此兼具一定特征选择作用。Elastic Net 结合两类惩罚，在许多相关特征存在时提供折中。它们不是三种完全不同的数据任务，而是同一类线性预测加入不同复杂度约束。正则化强度越大，限制越强，但并非效果越好。

<a id="chapter-26-section-03"></a>

### Logistic 与 Multinomial Regression【重点】

逻辑回归用线性分数建立类别概率，典型目标是二分类。它的决策边界在给定特征空间中是线性的，但输出概率随分数变化不是直线。互斥多类别任务可以使用多项逻辑回归，在多个类别间分配概率。它适合解释性、速度和概率预测都重要的基线。名字里的 regression 不是说它只能预测连续数值，也不是说它只能使用 MSE。

<a id="chapter-26-section-04"></a>

### GLM、Poisson 与 Gamma Regression【认识】

GLM，广义线性模型，把线性预测结构与适合目标类型的分布及连接方式结合。逻辑回归就是其中一种。Poisson regression 常用于次数或计数；Gamma regression 常用于严格为正、右偏的连续量。这里要关注目标的取值范围与误差结构，而不是先随便训练再把负数裁成零。模型的分布假设不合适时，还可能需要其他扩展。

<a id="chapter-26-section-05"></a>

### Polynomial Features、Splines 与 GAM【重点】

多项式特征人为加入曲线与交互。Spline，样条，用相互连接的简单局部曲线表示平滑变化。GAM，广义加性模型，把各个特征的平滑影响组合起来，保留较强的可解释性，又不强迫每个特征只有一条直线效应。它适合希望观察价格、时间、温度等影响曲线的任务。基本加性结构不自动表达所有复杂交互，需要显式设计或扩展。

<a id="chapter-26-section-06"></a>

### Robust Regression 与 RANSAC【认识】

普通平方误差可能被极端点强烈影响。Huber regression 对大残差采取更稳健的处理。RANSAC 反复从小样本子集拟合候选模型，再寻找支持该模型的内点，适合部分观测严重失真的几何拟合等场景。它假定存在足够一致的主体结构；如果异常不是少数，结果也可能不可靠。鲁棒方法的目的不是随意删除不喜欢的数据，而是对污染机制作明确处理。

<a id="chapter-26-section-07"></a>

### Quantile Regression，分位数回归【认识】

有时需要的不只是平均预测，而是一个条件中位数或偏保守的上界。分位数回归使用对高估、低估不对称的目标来学习指定分位数，例如需求预测中的高需求情景。多个分位数能帮助描述结果范围，但不自动提供对所有新分布都正确的置信保证。它与通过重复抽样得到参数置信区间不是同一件事。

参考资料（不朗读）：[S023 · scikit-learn — 线性模型](https://scikit-learn.org/stable/modules/linear_model.html)
