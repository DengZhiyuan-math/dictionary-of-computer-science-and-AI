# Threshold

概念编号：`concept:threshold` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/threshold/)

## 第一层：概念入门 · 知其然

### 它是什么

A classification threshold must still be chosen after predicting probabilities. Raising it usually produces fewer positive predictions but may miss more actual positives. The confusion matrix distinguishes true positives, false positives, true negatives and false negatives. Sensitivity usually means recall, or the true positive rate. Specificity measures the proportion of actual negatives correctly excluded. These measure different aspects of performance and should be discussed in terms of missed detections and false alarms.

### 先看一个例子

Scores [.95,.8,.7,.6,.4,.3,.2,.05] have true labels [1,0,1,0,1,0,0,0]. Predict positive when the score is at least the threshold.
Lowering the threshold expands the predicted-positive set. Recall cannot decrease, but precision need not be monotonic. The demo’s scores themselves do not change.

### 理解练习

At threshold 1, what are the accuracy and recall?

<details><summary>答案与解释</summary>

Every prediction is negative: accuracy is 5/8, recall is 0, and precision is undefined.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A classification threshold must still be chosen after predicting probabilities. Raising it usually produces fewer positive predictions but may miss more actual positives. The confusion matrix distinguishes true positives, false positives, true negatives and false negatives. Sensitivity usually means recall, or the true positive rate. Specificity measures the proportion of actual negatives correctly excluded. These measure different aspects of performance and should be discussed in terms of missed detections and false alarms.


### 适用边界与常见误解

Choose thresholds on validation data according to false-positive and false-negative costs.

### 例题：Thresholds: Recalculate the Confusion Matrix

Scores [.95,.8,.7,.6,.4,.3,.2,.05] have true labels [1,0,1,0,1,0,0,0]. Predict positive when the score is at least the threshold.

1. At threshold 0.5, the first four predictions are positive: two true positives and two false positives. The remainder contains one false negative and three true negatives.
2. Precision=2/(2+2)=0.5, Recall=2/(2+1)=2/3, F1=4/(4+2+1)=4/7, Accuracy=5/8.
3. Lowering the threshold to 0.4 finds the third actual positive: TP=3, FP=2, FN=0, TN=3.

结果：Lowering the threshold expands the predicted-positive set. Recall cannot decrease, but precision need not be monotonic. The demo’s scores themselves do not change.

易错点：With no predicted positives, the precision denominator is 0. The demo displays “undefined” rather than treating this as 100%. Applications must define their convention.

变式：At threshold 1, what are the accuracy and recall?

参考答案：Every prediction is negative: accuracy is 5/8, recall is 0, and precision is undefined.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
