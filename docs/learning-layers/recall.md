# Recall

概念编号：`concept:recall` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/recall/)

## 第一层：概念入门 · 知其然

### 它是什么

查全率问：所有真实正例中，有多少被找出来。

### 先看一个例子

真实问题10个，报警找到7个，漏掉3个。

### 理解练习

增加很多误报会直接降低召回吗？

<details><summary>答案与解释</summary>

不会直接进入公式，但会提高处理成本。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. R=TP/(TP+FN)，分母是实际正例总数。
2. 在TP不变时减少漏报会提高召回，阈值降低通常同时增加误报。

### 具体输入与计算步骤

真实问题10个，报警找到7个，漏掉3个。

1. R=7/(7+3)=0.7。
2. 若再找到2个漏报，TP=9、FN=1，R=0.9。

计算结果：若再找到2个漏报，TP=9、FN=1，R=0.9。

### 换到实际问题中应用

疾病筛查优先降低漏诊。

1. 在独立验证集选满足召回要求的阈值，并给出置信区间与误报量。
2. 核查重要亚组召回，不能用整体高值掩盖某群体漏诊。

应用结论：核查重要亚组召回，不能用整体高值掩盖某群体漏诊。

### 举一反三：改变条件后的完整解答

若对所有人都报阳，召回与查准率如何？

<details><summary>变式的推演与答案</summary>

1. 所有真实正例被找到，召回为1。
2. 若100人中10人真阳，查准率10/100=0.1，说明高召回不代表高精度。

若100人中10人真阳，查准率10/100=0.1，说明高召回不代表高精度。

</details>

### 原有解释与进一步例题


### Definition

Recall is the fraction of actual positive cases identified by a classifier. It measures coverage of positives at a specified decision threshold.


### Parameters and mechanism

Recall=TP/(TP+FN), where FN counts positive examples missed by the classifier. If there are no actual positives, this ratio is undefined without an explicit reporting convention.


### Example

If a dataset contains 20 true cases and the detector finds 8, recall is 40%. The number of false alarms can change precision without changing this recall value.


### 适用边界与常见误解

Improving recall does not mean false positives are necessarily acceptable.

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/model_evaluation.html)

[返回分层目录](00-learning-index.md)
