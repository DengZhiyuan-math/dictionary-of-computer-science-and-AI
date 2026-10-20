# Feature Engineering

概念编号：`concept:feature-engineering` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/feature-engineering/)

## 第一层：概念入门 · 知其然

### 它是什么

特征工程把原始记录变成预测可用的输入，同时保持时间与训练边界。

### 先看一个例子

训练值[2,4]，用均值与总体标准差标准化。

### 理解练习

测试集自己的均值应独立替换训练均值吗？

<details><summary>答案与解释</summary>

通常不应，需使用训练拟合的同一变换。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 标准化z=(x−μ训练)/σ训练，保证上线可复用且不利用测试分布。
2. 类别编码、缺失填补与目标编码也需在正确训练折中拟合。

### 具体输入与计算步骤

训练值[2,4]，用均值与总体标准差标准化。

1. μ=(2+4)/2=3，σ=√((1+1)/2)=1。
2. 训练变为[−1,1]；新值5按同一变换得到2。

计算结果：训练变为[−1,1]；新值5按同一变换得到2。

### 换到实际问题中应用

预测每小时网站负载。

1. 只用预测时已知的时刻、历史窗口和节假日特征，窗口不得读取未来。
2. 将变换与模型一起版本化，验证线上线下特征完全一致。

应用结论：将变换与模型一起版本化，验证线上线下特征完全一致。

### 举一反三：改变条件后的完整解答

若某列训练值全为3，标准差0怎么办？

<details><summary>变式的推演与答案</summary>

1. 直接除0会产生无效数值。
2. 按声明规则删除常量列或使用安全缩放约定，部署沿用同一规则。

按声明规则删除常量列或使用安全缩放约定，部署沿用同一规则。

</details>

### 原有解释与进一步例题


### Definition

Feature engineering turns raw observations into inputs suitable for a prediction task. It includes defining units, aggregations, missing-value behavior and transformations. A feature must be available at the prediction time.


### Parameters and mechanism

A fitted transformation learns state from training data. For standardization, z=(x-μ_train)/σ_train, where μ_train and σ_train are the training mean and scale. Apply those same values to validation and test inputs; define how zero scale is handled.


### Example

Training values 1 and 3 have mean 2 and population standard deviation 1. A future value 5 transforms to 3. Refitting the mean using that future value changes the training procedure using information held out for evaluation.


### 适用边界与常见误解

Preprocessing, feature selection, and target encoding can all introduce leakage.

### 领域应用

- [Training Standardization · 金融训练窗口的标准化](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-training-standardization.md)：特征变换的共同原理在基础页解释；这里固定金融时间窗口中的统计量版本与尺度约定。
- [Learning Pipeline · 金融数据的训练管线](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-learning-pipeline.md)：把特征处理与估计器放进同一时间验证边界，防止未来数据通过预处理进入历史预测。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/common_pitfalls.html)

[返回分层目录](00-learning-index.md)
