# Cross-Validation

概念编号：`concept:cross-validation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cross-validation/)

## 第一层：概念入门 · 知其然

### 它是什么

交叉验证轮流留出部分数据作验证，检查模型对划分的敏感性。

### 先看一个例子

12个独立样本分3折，每折验证4个、训练8个。

### 理解练习

可先用全体数据拟合标准化吗？

<details><summary>答案与解释</summary>

不可以，验证信息会泄漏进训练。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 每折完整重新拟合模型与预处理，让验证样本不参与拟合。
2. 汇总分数选配置，最终独立测试集仍保持未触碰。

### 具体输入与计算步骤

12个独立样本分3折，每折验证4个、训练8个。

1. 三折正确数3、4、2，总正确9。
2. 等大折平均准确率(0.75+1+0.5)/3=0.75，等于9/12。

计算结果：等大折平均准确率(0.75+1+0.5)/3=0.75，等于9/12。

### 换到实际问题中应用

选择树的最大深度。

1. 不同深度使用相同折划分，每折仅拟合训练部分。
2. 按平均验证表现选深度，重训后评估保留测试集。

应用结论：按平均验证表现选深度，重训后评估保留测试集。

### 举一反三：改变条件后的完整解答

明日销量预测还应随机折吗？

<details><summary>变式的推演与答案</summary>

1. 随机折可能让未来训练数据参与预测过去。
2. 改用时间前推验证，仅用过去预测未来。

改用时间前推验证，仅用过去预测未来。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/cross_validation.html)

[返回分层目录](00-learning-index.md)
