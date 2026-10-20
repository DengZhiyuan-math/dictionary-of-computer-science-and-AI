# Recall

概念编号：`concept:recall` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/recall/)

## 第一层：概念入门 · 知其然

### 定义

查全率是在所有真实正样本中，被系统正确找出的比例，等于TP/(TP+FN)。它以真实目标总数为分母，而不是全部预测或全部样本。定义正类及真实结果获得方式很重要，否则漏报无法可靠统计。

### 概念边界与常见混淆

把所有样本都报为正可获得100%查全率，却可能带来大量误报。高查全率不是系统整体有效的充分条件，需结合成本和查准率。

### 先看一个例子

资料中有50篇相关文章，检索返回20篇，其中15篇相关。查全率15/50=30%，查准率15/20=75%。若不知道全部50篇的存在，就不能仅凭返回列表精确计算查全率。

### 理解练习

#### 1. 分母

返回20篇中15篇相关，能直接称召回75%吗？

<details><summary>答案与解释</summary>

不能，这是查准率；查全率需全部真实相关数作分母。

</details>

#### 2. 全报

全返回可使召回100%，为何仍可能不好用？

<details><summary>答案与解释</summary>

用户要筛大量无关结果，误报成本高；目标不只是避免漏报。

</details>

#### 3. 真值

只审查被返回文章，能知道所有漏掉的相关文档吗？

<details><summary>答案与解释</summary>

不能，未返回部分也需有适当真值或抽样设计，否则召回估计有盲区。

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
