# Bootstrap / OOB

概念编号：`concept:bootstrap-oob` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bootstrap-oob/)

## 第一层：概念入门 · 知其然

### 它是什么

统计自举（bootstrap）从已有样本中有放回地重抽样，用重抽样结果估计统计量的抽样变化。随机森林还用自举训练不同树；某棵树未抽到的原样本称为该树的袋外样本（OOB）。它与逐段解利率曲线的“自举”是不同方法。

### 先看一个例子

原样本为 A、B、C、D，一次自举可能抽到 A、A、D、B，C 是这次的 OOB。用多个重抽样均值的标准差估计均值的不确定性；OOB 预测则只汇总未训练过该观测的树，不能把训练过它的树也加进来。

### 理解练习

用自己的话解释：上面的情景为什么是“Bootstrap / OOB”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：统计自举（bootstrap）从已有样本中有放回地重抽样，用重抽样结果估计统计量的抽样变化。随机森林还用自举训练不同树；某棵树未抽到的原样本称为该树的袋外样本（OOB）。它与逐段解利率曲线的“自举”是不同方法。

情景依据：原样本为 A、B、C、D，一次自举可能抽到 A、A、D、B，C 是这次的 OOB。用多个重抽样均值的标准差估计均值的不确定性；OOB 预测则只汇总未训练过该观测的树，不能把训练过它的树也加进来。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数与公式

从 n 个独立同分布观测中抽 n 次，一个指定观测未被抽中的概率为 $(1-1/n)^n\to e^{-1}$。每次重抽样得到统计量 $\hat\theta^{*(b)}$，用 B 次结果的分布近似其抽样不确定性。金融时间序列有依赖时，通常需要区块等保留依赖的重抽样，不能直接打散日期。


### 适用边界与常见误解

Out-of-bag evaluation does not replace appropriate temporal or group-based validation.

### 概念辨析

- [Yield Curve Bootstrapping · 收益率曲线自举](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/rates-curve-bootstrap.md)：统计自举通过有放回重抽样估计不确定性；曲线自举按工具现金流逐段解折现因子。“自举”同名，算法与输出不同。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
