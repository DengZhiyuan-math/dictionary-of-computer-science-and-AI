# Decision Tree

概念编号：`concept:decision-tree` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/decision-tree/)

## 第一层：概念入门 · 知其然

### 它是什么

A decision tree groups samples through successive conditions. A node is a decision location; a split divides data; a leaf is a terminal node. To predict order cancellation, a tree may split by price, then delivery time, and output a cancellation rate at each leaf. Classification trees predict classes or probabilities; regression trees predict continuous values. Training chooses features and thresholds from the objective rather than merely reproducing rules written beforehand.

### 先看一个例子

Five classification trees vote [1,1,0,1,0] on one email. Positive means spam.
An ensemble requires useful individual predictors and is also affected by error correlation. Real random forest classifiers may average leaf probabilities, unlike this hard-voting example.

### 理解练习

Every tree predicts 0 when the truth is 1. Would adding 100 identical trees help?

<details><summary>答案与解释</summary>

No. Duplicating the same error adds no information.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A decision tree groups samples through successive conditions. A node is a decision location; a split divides data; a leaf is a terminal node. To predict order cancellation, a tree may split by price, then delivery time, and output a cancellation rate at each leaf. Classification trees predict classes or probabilities; regression trees predict continuous values. Training chooses features and thresholds from the objective rather than merely reproducing rules written beforehand.


### 适用边界与常见误解

Deep trees can be unstable. Complexity control and ensemble methods address this in different ways.

### 例题：Random Forests: Error Correlation Limits Voting Gains

Five classification trees vote [1,1,0,1,0] on one email. Positive means spam.

1. Hard voting gives 3 to 2, producing class 1. Trees using identical data and features may make highly correlated errors.
2. For each tree, draw a bootstrap sample of training observations with replacement. Randomly selecting candidate features at each split introduces further variation among trees.
3. If all five trees make the same error on a type of email, adding votes does not automatically correct that systematic bias.

结果：An ensemble requires useful individual predictors and is also affected by error correlation. Real random forest classifiers may average leaf probabilities, unlike this hard-voting example.

易错点：3/5 is not automatically a calibrated real-world probability. Out-of-bag evaluation does not replace independent testing for every task.

变式：Every tree predicts 0 when the truth is 1. Would adding 100 identical trees help?

参考答案：No. Duplicating the same error adds no information.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
