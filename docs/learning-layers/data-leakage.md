# Data Leakage

概念编号：`concept:data-leakage` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/data-leakage/)

## 第一层：概念入门 · 知其然

### 它是什么

数据泄漏是训练、特征处理或模型选择使用了实际预测时不可得的信息，使评价偏乐观。泄漏不仅是直接看到测试答案，也可能来自全样本预处理、相关样本跨折和事后筛选。

### 先看一个例子

若先用三者求均值 4，再切训练测试，未来输入已经改变了训练参数。正确做法是冻结训练均值 2；即使没有读取未来标签，这仍是一种泄漏。

### 理解练习

用自己的话解释：上面的情景为什么是“Data Leakage”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：数据泄漏是训练、特征处理或模型选择使用了实际预测时不可得的信息，使评价偏乐观。泄漏不仅是直接看到测试答案，也可能来自全样本预处理、相关样本跨折和事后筛选。

情景依据：若先用三者求均值 4，再切训练测试，未来输入已经改变了训练参数。正确做法是冻结训练均值 2；即使没有读取未来标签，这仍是一种泄漏。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数与公式

对预测时刻 t，所有输入及拟合参数必须只使用在 t 可见的记录。每一折先在训练集 fit，再在验证或测试集 transform；特征选择与缺失填补也要遵守同一边界。具体变换的定义见特征工程，时间标签规则见金融应用。


### 例子

训练值为 1、3，训练均值为 2；未来输入为 8。若先用三者求均值 4，再切训练测试，未来输入已经改变了训练参数。正确做法是冻结训练均值 2；即使没有读取未来标签，这仍是一种泄漏。


### 适用边界与常见误解

Preprocessing statistics and target encoding can also leak validation information.

### 例题：Data Leakage: Fitting a Mean Using Future Data

Train on the first two months and validate on the third. A feature has training values [0,2] and future validation values [100,102].

1. Using the full-data mean gives 51. Transforming training data with it exposes fitting to the future distribution.
2. Split chronologically first. The training mean is 1; use that fitted value for both training and validation. Large transformed validation values are possible.
3. Fit transformations only on the training portion of each cross-validation fold too. Evaluate an independent test set after model selection.

结果：Preventing leakage requires controlling which data each fitting operation sees, including imputation, scaling, feature selection and target encoding.

易错点：The large values make leakage visible; mean leakage does not necessarily improve every model’s score. Do not arbitrarily shuffle time-dependent tasks.

变式：If validation and training means differ greatly, should the scaler be refitted on validation data?

参考答案：Do not do so during evaluation to improve the score. Investigate distribution shift, and retrain under a clearly defined data-update protocol.

### 领域应用

- [Point in Time · 金融数据版本与时点连接](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-point-in-time-pit.md)：共用数据泄漏的定义；时点数据页只讲可用时间、修订版本与资产池的重建。
- [Data Leakage · 金融研究的信息时间边界](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-data-leakage.md)：将通用数据泄漏落实到财报可见时间、标签完成、历史版本和金融预处理。
- [Learning Pipeline · 金融数据的训练管线](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-learning-pipeline.md)：预处理也可能越过信息边界；金融管线要把每个拟合步骤限制在相应训练历史内。
- [Nested Time Validation · 金融时序的嵌套验证](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-nested-time-validation.md)：先识别训练、选择与测试之间的信息泄漏，再安排时间顺序和完整标签的嵌套验证。

### 概念辨析

- [Survivorship Bias · 幸存者偏差](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-survivorship-bias.md)：幸存者偏差来自选择性保留样本；数据泄漏来自使用预测时不可得的信息。二者可能同时出现，但并不互相等价。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
