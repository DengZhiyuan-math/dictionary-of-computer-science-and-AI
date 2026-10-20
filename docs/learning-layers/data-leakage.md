# Data Leakage

概念编号：`concept:data-leakage` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/data-leakage/)

## 第一层：概念入门 · 知其然

### 它是什么

数据泄漏是使用部署时得不到的信息进行训练或选模型，造成评估虚高。

### 先看一个例子

训练值1、3，测试值100，标准化只应拟合训练值。

### 理解练习

贷款发放时预测违约能用后来催收次数吗？

<details><summary>答案与解释</summary>

不能，决策时这些信息尚不存在。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 先固定预测时点，再核查每个特征的实际可用时间。
2. 所有数据驱动预处理只在训练部分拟合，再应用于验证与测试。

### 具体输入与计算步骤

训练值1、3，测试值100，标准化只应拟合训练值。

1. 训练均值(1+3)/2=2，值1中心化后为−1。
2. 若泄漏测试值，均值104/3≈34.67，值1误变为−33.67。

计算结果：若泄漏测试值，均值104/3≈34.67，值1误变为−33.67。

### 换到实际问题中应用

同一患者有多次高度相似检查。

1. 按患者分组切分，阻止同一人记录跨训练与测试。
2. 使用仅训练拟合的流程报告患者级泛化表现。

应用结论：使用仅训练拟合的流程报告患者级泛化表现。

### 举一反三：改变条件后的完整解答

看测试结果后反复改模型20次，还能叫独立测试吗？

<details><summary>变式的推演与答案</summary>

1. 不能，测试集已经参与了模型选择。
2. 另留未触碰数据或收集新数据，原测试集视作验证集。

另留未触碰数据或收集新数据，原测试集视作验证集。

</details>

### 原有解释与进一步例题


### 定义

数据泄漏是训练、特征处理或模型选择使用了实际预测时不可得的信息，使评价偏乐观。泄漏不仅是直接看到测试答案，也可能来自全样本预处理、相关样本跨折和事后筛选。


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

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/common_pitfalls.html)

[返回分层目录](00-learning-index.md)
