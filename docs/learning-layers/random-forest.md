# Random Forest

概念编号：`concept:random-forest` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/random-forest/)

## 第一层：概念入门 · 知其然

### 它是什么

Random forests predict with many trees. Classic training gives each tree a different bootstrap sample and limits each split to a random feature subset. This second randomness is crucial: if one strong feature always dominates the top split, trees become similar; limiting candidates lets them explore different rules.

### 先看一个例子

if one strong feature always dominates the top split, trees become similar; limiting candidates lets them explore different rules.

### 理解练习

用自己的话解释：上面的情景为什么是“Random Forest”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Random forests predict with many trees. Classic training gives each tree a different bootstrap sample and limits each split to a random feature subset. This second randomness is crucial: if one strong feature always dominates the top split, trees become similar; limiting candidates lets them explore different rules.

情景依据：if one strong feature always dominates the top split, trees become similar; limiting candidates lets them explore different rules.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
