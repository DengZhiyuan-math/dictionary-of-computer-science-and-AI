# Decision Tree

概念编号：`concept:decision-tree` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/decision-tree/)

## 第一层：概念入门 · 知其然

### 定义

决策树通过一串特征条件把输入划入叶子，再由叶子输出类别、概率或数值。内部节点提出条件，分支表示条件结果；训练选择划分以改善某个纯度或误差目标。预测一次只沿一条根到叶路径，结构易读不等于自动体现因果关系。

### 概念边界与常见混淆

树太深可把噪声和个别样本记住，最小叶样本数或剪枝控制复杂度。输入范围外也通常沿已有规则落叶，不自动具备合理外推。

### 先看一个例子

示意房价树先问面积是否不超过80平方米；是则预测150万元，否则再按是否有电梯分成220或190万元。面积从80变成80.1可能跨叶产生跳变；这些预测是叶内训练记录的摘要，不表示每个房屋都值同样价格。

### 理解练习

#### 1. 路径

预测一个样本需要遍历所有叶子吗？

<details><summary>答案与解释</summary>

通常不需，只按条件走一条路径，成本与路径深度相关。

</details>

#### 2. 跳变

相近输入预测突然不同，一定是实现错误吗？

<details><summary>答案与解释</summary>

不一定，硬阈值本就可能跳变，需判断是否符合任务。

</details>

#### 3. 训练拟合

每叶只有一个训练样本、误差0，就说明最好吗？

<details><summary>答案与解释</summary>

不能，可能记忆噪声，应看独立验证和复杂度权衡。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 分类常选使加权不纯度下降最多的分裂，Gini=1−Σp类²。
2. 叶子输出类别频率或多数类，深度、叶子样本数等限制复杂度。

### 具体输入与计算步骤

4个样本标签[0,0,1,1]，一个特征分裂恰好把两类分开。

1. 根节点两类各半，Gini=1−0.5²−0.5²=0.5。
2. 分裂后两个纯叶Gini均0，加权下降0.5−0=0.5。

计算结果：分裂后两个纯叶Gini均0，加权下降0.5−0=0.5。

### 换到实际问题中应用

建立易解释的客户流失基线。

1. 用训练集选择分裂，验证集限制深度和叶子最小样本数。
2. 检查规则稳定性与重要亚组误差，不能把单次分裂当因果结论。

应用结论：检查规则稳定性与重要亚组误差，不能把单次分裂当因果结论。

### 举一反三：改变条件后的完整解答

若一个叶子标签为[0,0,1]，其Gini是多少？

<details><summary>变式的推演与答案</summary>

1. 类别比例2/3与1/3。
2. Gini=1−4/9−1/9=4/9≈0.4444，不再是纯叶。

Gini=1−4/9−1/9=4/9≈0.4444，不再是纯叶。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/tree.html)

[返回分层目录](00-learning-index.md)
