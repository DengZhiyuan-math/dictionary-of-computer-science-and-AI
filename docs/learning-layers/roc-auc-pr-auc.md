# ROC AUC / PR AUC

概念编号：`concept:roc-auc-pr-auc` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/roc-auc-pr-auc/)

## 第一层：概念入门 · 知其然

### 它是什么

The ROC curve compares true positive and false positive rates across thresholds; its AUC summarizes ranking discrimination. The PR curve compares precision and recall, often revealing the burden of false positives more directly when positives are rare. A high ROC AUC does not guarantee adequate precision at a particular threshold. Average precision is a common PR summary measure, but may differ from trapezoidal integration of the curve. Confirm the exact definition when reporting results.

### 先看一个例子

There are 1000 samples, of which 10 are positive. A model gives TP=5, FP=5, FN=5, TN=985.
With class imbalance, accuracy can hide important differences. A single confusion matrix does not determine full ROC AUC or PR AUC.

### 理解练习

Does raising the threshold always improve precision?

<details><summary>答案与解释</summary>

No. The predicted-positive set shrinks, so recall cannot rise, but the positive proportion among remaining predictions can increase or decrease.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
