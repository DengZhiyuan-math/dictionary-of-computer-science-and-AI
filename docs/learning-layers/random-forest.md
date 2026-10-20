# Random Forest

概念编号：`concept:random-forest` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/random-forest/)

## 第一层：概念入门 · 知其然

### 它是什么

随机森林训练多棵带随机性的树，再汇总预测，降低单棵树的不稳定。

### 先看一个例子

三棵分类树输出[猫,狗,狗]。

### 理解练习

森林每棵树应完全相同吗？

<details><summary>答案与解释</summary>

不应，样本重采样和分裂特征随机性提供差异。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 不同树误差不完全相关时，平均可降低方差。
2. 树之间过度相关会限制收益，增加棵数不能消除所有偏差。

### 具体输入与计算步骤

三棵分类树输出[猫,狗,狗]。

1. 硬投票中狗2票、猫1票，结果狗。
2. 若回归输出[2,4,6]，均值(2+4+6)/3=4。

计算结果：若回归输出[2,4,6]，均值(2+4+6)/3=4。

### 换到实际问题中应用

为表格分类构建稳健基线。

1. 调整树数、深度、叶子样本数并使用适当验证切分。
2. 检查逐类表现与袋外评估，特征重要性需警惕相关特征与高基数偏差。

应用结论：检查逐类表现与袋外评估，特征重要性需警惕相关特征与高基数偏差。

### 举一反三：改变条件后的完整解答

若100棵树总预测相同错误，多数投票能修正吗？

<details><summary>变式的推演与答案</summary>

1. 100票都支持同一错误类别。
2. 仍然错误，独立性与数据质量比单纯增加树数更重要。

仍然错误，独立性与数据质量比单纯增加树数更重要。

</details>

### 原有解释与进一步例题


### 原理与推演

Random forests predict with many trees. Classic training gives each tree a different bootstrap sample and limits each split to a random feature subset. This second randomness is crucial: if one strong feature always dominates the top split, trees become similar; limiting candidates lets them explore different rules.

Regression usually averages tree values; classification may vote or average class probabilities depending on implementation. Different perspectives reduce a single tree's high variance. They cannot recover information every tree lacks, nor guarantee freedom from overfitting.


### 适用边界与常见误解

Random forests mainly reduce variance; they do not guarantee freedom from overfitting.

### 例题：Random Forests: Error Correlation Limits Voting Gains

Five classification trees vote [1,1,0,1,0] on one email. Positive means spam.

1. Hard voting gives 3 to 2, producing class 1. Trees using identical data and features may make highly correlated errors.
2. For each tree, draw a bootstrap sample of training observations with replacement. Randomly selecting candidate features at each split introduces further variation among trees.
3. If all five trees make the same error on a type of email, adding votes does not automatically correct that systematic bias.

结果：An ensemble requires useful individual predictors and is also affected by error correlation. Real random forest classifiers may average leaf probabilities, unlike this hard-voting example.

易错点：3/5 is not automatically a calibrated real-world probability. Out-of-bag evaluation does not replace independent testing for every task.

变式：Every tree predicts 0 when the truth is 1. Would adding 100 identical trees help?

参考答案：No. Duplicating the same error adds no information.

### 领域应用

- [Random Forest · 随机森林的金融应用](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-random-forest.md)：保留通用森林原理，补充金融收益目标、相关样本、袋外评价和成本后的比较口径。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/ensemble.html)

[返回分层目录](00-learning-index.md)
