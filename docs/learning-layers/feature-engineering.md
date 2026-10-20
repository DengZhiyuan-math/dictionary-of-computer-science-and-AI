# Feature Engineering

概念编号：`concept:feature-engineering` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/feature-engineering/)

## 第一层：概念入门 · 知其然

### 定义

特征工程把原始记录转换成适于预测的输入，包括聚合、编码、尺度变换及领域构造。转换要保留预测时可用的信息，并使训练和使用采用同一规则；需从数据学习的均值、类别表等只能在允许的训练部分拟合。特征不是越多越好，必须与目标及可获得性一致。

### 概念边界与常见混淆

相关不等于因果，但预测特征不必都有因果解释。另一方面，高训练重要性也可能来自泄漏，应检查来源和时间，而不是只按模型分数选特征。

### 先看一个例子

每天早上预测当天需求，可把过去七个完整日销量平均作为特征。周一预测时使用截至周日的数据；若把周一实际销量混进平均，就泄漏未来。缺失某天时也要明确按七个自然日还是七条记录计算，避免时间含义悄然改变。

### 理解练习

#### 1. 可用性

月底汇总字段能直接预测月初结果吗？

<details><summary>答案与解释</summary>

若月初尚不可得则不能，应按实际时点截断。

</details>

#### 2. 拟合

标准化均值能先看验证集一起算吗？

<details><summary>答案与解释</summary>

不应，验证信息进入处理规则；训练拟合后再应用。

</details>

#### 3. 一致

训练按元、上线按万元却同名字段，会怎样？

<details><summary>答案与解释</summary>

数值含义错位，需明确单位并统一转换，字段同名不保证同义。

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
