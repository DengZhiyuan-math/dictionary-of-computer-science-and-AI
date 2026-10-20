# Feature Engineering

概念编号：`concept:feature-engineering` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/feature-engineering/)

## 第一层：概念入门 · 知其然

### 它是什么

Feature engineering turns raw observations into inputs suitable for a prediction task. It includes defining units, aggregations, missing-value behavior and transformations. A feature must be available at the prediction time.

### 先看一个例子

Training values 1 and 3 have mean 2 and population standard deviation 1. A future value 5 transforms to 3. Refitting the mean using that future value changes the training procedure using information held out for evaluation.

### 理解练习

用自己的话解释：上面的情景为什么是“Feature Engineering”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Feature engineering turns raw observations into inputs suitable for a prediction task. It includes defining units, aggregations, missing-value behavior and transformations. A feature must be available at the prediction time.

情景依据：Training values 1 and 3 have mean 2 and population standard deviation 1. A future value 5 transforms to 3. Refitting the mean using that future value changes the training procedure using information held out for evaluation.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

A fitted transformation learns state from training data. For standardization, z=(x-μ_train)/σ_train, where μ_train and σ_train are the training mean and scale. Apply those same values to validation and test inputs; define how zero scale is handled.


### 适用边界与常见误解

Preprocessing, feature selection, and target encoding can all introduce leakage.

### 领域应用

- [Training Standardization · 金融训练窗口的标准化](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-training-standardization.md)：特征变换的共同原理在基础页解释；这里固定金融时间窗口中的统计量版本与尺度约定。
- [Learning Pipeline · 金融数据的训练管线](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-learning-pipeline.md)：把特征处理与估计器放进同一时间验证边界，防止未来数据通过预处理进入历史预测。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
