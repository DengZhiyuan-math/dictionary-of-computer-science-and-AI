# Cross-Validation

概念编号：`concept:cross-validation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cross-validation/)

## 第一层：概念入门 · 知其然

### 定义

交叉验证把可用数据分为若干份，轮流用部分数据训练、留出一份评估，以估计训练流程对未见数据的表现。一次完整轮换中，每份都充当一次验证数据，再汇总各次结果。要评估的是整套训练流程，包括特征处理和超参数选择；验证样本不能参与该轮从数据学习的处理步骤。

### 概念边界与常见混淆

反复依据交叉验证选模型会对这些结果产生选择偏差，仍可能需要独立测试。时间序列、同病人多记录等数据必须用符合未来使用场景的划分，不能默认随机分折。

### 先看一个例子

六条相互独立记录分三份，每次训练四条、验证两条，共训练三个模型。若需要从数据估计特征均值，应每次只用该轮四条训练记录估计，再用于两条验证记录。预先用全部六条估计均值，会让验证信息进入训练流程。最后部署模型可在选择流程完成后用全部可用训练数据重新拟合。

### 理解练习

#### 1. 训练次数

三折验证是否只训练一个模型、验证三次？

<details><summary>答案与解释</summary>

通常不是，应在每折训练数据上重新拟合一个模型，否则验证集曾参与别轮训练的状态可能被带入。

</details>

#### 2. 预处理

标准化没有使用标签，就能先用全部数据拟合吗？

<details><summary>答案与解释</summary>

不能据此认为无泄漏。验证特征分布也属于留出信息；应在训练折拟合，再应用到验证折。

</details>

#### 3. 相关记录

同一病人的记录随机分到两边，能否可靠检验新病人表现？

<details><summary>答案与解释</summary>

通常不合适，模型可能利用同病人特征。若目标是新病人，应把病人作为分组单位划分。

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
