# ROC AUC / PR AUC

概念编号：`concept:roc-auc-pr-auc` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/roc-auc-pr-auc/)

## 第一层：概念入门 · 知其然

### 定义

ROC 与 PR 曲线展示分类分数在不同阈值下的权衡。ROC 横轴是假正率FP/(FP+TN)，纵轴是召回率；PR 横轴是召回率、纵轴是查准率。AUC 汇总曲线面积，但必须说明计算方式；PR 的梯形面积与平均查准率等实现不总相同。ROC侧重相对排序，PR更直接体现报出结果中的误报比例。

### 概念边界与常见混淆

AUC不是概率校准，也不直接选择部署阈值。类别比例变化对PR影响很大，跨数据集比较必须说明人群与真值口径。

### 先看一个例子

一万样本中100个正例，某阈值找出80个、误报99个。召回80%，假正率99/9900=1%，查准率80/179≈44.7%。低假正率并不意味着报出的179个里错误很少，因为负例基数很大。

### 理解练习

#### 1. 分母

99个误报的比例应除9900还是179？

<details><summary>答案与解释</summary>

假正率除9900；报出结果的错误比例除179。两者回答不同问题。

</details>

#### 2. 校准

严格递增变换保持排序，ROC-AUC不变就说明概率不变吗？

<details><summary>答案与解释</summary>

不说明，排序可保留而概率数值改变，校准可能变差。

</details>

#### 3. 阈值

AUC高就能不定义成本直接确定最佳阈值吗？

<details><summary>答案与解释</summary>

不能，阈值取决于误报漏报成本、容量和目标约束。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 无并列时AUC等于随机正例分数超过随机负例的概率。
2. PR中的查准率还依赖类别基率，AP与梯形PR面积并非总是相同。

### 具体输入与计算步骤

两个正例分数0.9、0.4，两个负例0.8、0.1。

1. 4对正负比较中0.9胜两次，0.4只胜0.1一次，共3胜。
2. ROC-AUC=3/4=0.75。

计算结果：ROC-AUC=3/4=0.75。

### 换到实际问题中应用

评估罕见欺诈检测。

1. 同时报告ROC-AUC、明确计算方式的PR指标和部署阈值下的误报量。
2. 保持测试基率贴近实际，避免抽样平衡后误解查准率。

应用结论：保持测试基率贴近实际，避免抽样平衡后误解查准率。

### 举一反三：改变条件后的完整解答

若给所有分数加10，AUC变吗？

<details><summary>变式的推演与答案</summary>

1. 各正负对的大小关系不变。
2. AUC仍0.75，显示排序指标不验证概率校准。

AUC仍0.75，显示排序指标不验证概率校准。

</details>

### 原有解释与进一步例题


### 原理与推演

The ROC curve compares true positive and false positive rates across thresholds; its AUC summarizes ranking discrimination. The PR curve compares precision and recall, often revealing the burden of false positives more directly when positives are rare. A high ROC AUC does not guarantee adequate precision at a particular threshold. Average precision is a common PR summary measure, but may differ from trapezoidal integration of the curve. Confirm the exact definition when reporting results.

Result and explanation: With class imbalance, accuracy can hide important differences. A single confusion matrix does not determine full ROC AUC or PR AUC.

Pitfalls and limits: Do not substitute precision at one threshold for PR AUC, or infer a complete ranking absent from these counts.


### 适用边界与常见误解

Average precision and trapezoidal area under a PR curve need not be identical.

### 例题：Imbalanced Evaluation: Two Very Different 99% Scores

There are 1000 samples, of which 10 are positive. A model gives TP=5, FP=5, FN=5, TN=985.

1. Accuracy=(5+985)/1000=99%, Precision=5/(5+5)=50%, Recall=5/(5+5)=50%.
2. Predicting everything negative gives TN=990, FN=10 and the same 99% accuracy, but Recall=0.
3. The operating points share accuracy but differ in positive detections and false alarms requiring review. Choose using costs and thresholds.

结果：With class imbalance, accuracy can hide important differences. A single confusion matrix does not determine full ROC AUC or PR AUC.

易错点：Do not substitute precision at one threshold for PR AUC, or infer a complete ranking absent from these counts.

变式：Does raising the threshold always improve precision?

参考答案：No. The predicted-positive set shrinks, so recall cannot rise, but the positive proportion among remaining predictions can increase or decrease.

### 领域应用

- [ROC AUC · 金融方向预测的排序评价](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-roc-auc.md)：将通用排序评价用于金融涨跌标签，区分排序质量、概率质量、交易门槛和成本后收益。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/model_evaluation.html)

[返回分层目录](00-learning-index.md)
