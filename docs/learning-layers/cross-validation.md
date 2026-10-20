# Cross-Validation

概念编号：`concept:cross-validation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cross-validation/)

## 第一层：概念入门 · 知其然

### 它是什么

交叉验证按规定的切分方式，轮流用部分数据训练、用另一部分评估，帮助比较方法和参数。验证数据不参与对应轮的拟合。

### 先看一个例子

把资料分成几份，每轮留一份作模拟考试，其余用于学习。若在考试前已经用全部资料计算了预处理参数，考试就不再完全独立。

### 理解练习

做交叉验证前，先用全部数据挑选特征，会有什么问题？

<details><summary>答案与解释</summary>

留出的验证数据已经影响了特征选择，评估会泄漏。需要在每轮训练部分内完成选择和拟合；时间序列还要尊重时间顺序。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Cross-validation evaluates stability across repeated data splits. Out-of-fold predictions, or OOF predictions, come from a fold model that did not see the corresponding sample during training; stacking commonly uses them. Nested cross-validation performs model selection in an inner loop and evaluates the whole selection procedure in an outer loop, reducing optimism from repeated tuning. It costs more computation and does not eliminate distribution shift. The time-based or group-based splitting rules must still be appropriate.


### 适用边界与常见误解

Time-dependent or grouped data cannot be split randomly without considering its structure.

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

- [Nested Time Validation · 金融时序的嵌套验证](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-nested-time-validation.md)：在一般交叉验证上增加时间顺序、标签完成与内外层职责，评价完整的选参流程。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
