# Threshold

概念编号：`concept:threshold` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/threshold/)

## 第一层：概念入门 · 知其然

### 它是什么

阈值把连续分数转成决策，阈值越低通常越容易报正。

### 先看一个例子

概率[0.3,0.6,0.8]，真实标签[0,1,0]。

### 理解练习

默认0.5一定最适合业务吗？

<details><summary>答案与解释</summary>

不一定，取决于校准、类别比例和误判成本。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 决策规则p≥t为正，改变t会同时改变TP、FP、FN。
2. 阈值应在验证集按目标约束选择，再锁定用于测试。

### 具体输入与计算步骤

概率[0.3,0.6,0.8]，真实标签[0,1,0]。

1. t=0.5时预测[0,1,1]，TP=1、FP=1、FN=0。
2. t=0.7时预测[0,0,1]，TP=0、FP=1、FN=1。

计算结果：t=0.7时预测[0,0,1]，TP=0、FP=1、FN=1。

### 换到实际问题中应用

告警系统要求每天最多100条。

1. 在验证数据扫描阈值，评估告警量、精度和召回。
2. 选择满足容量的工作点，监控分布漂移后容量是否仍满足。

应用结论：选择满足容量的工作点，监控分布漂移后容量是否仍满足。

### 举一反三：改变条件后的完整解答

同一例把t降至0.2会怎样？

<details><summary>变式的推演与答案</summary>

1. 预测全部为正，TP=1、FP=2、FN=0。
2. 召回1、查准率1/3；降低阈值并不保证整体更好。

召回1、查准率1/3；降低阈值并不保证整体更好。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/user_guide.html)

[返回分层目录](00-learning-index.md)
