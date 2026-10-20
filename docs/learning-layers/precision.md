# Precision

概念编号：`concept:precision` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/precision/)

## 第一层：概念入门 · 知其然

### 它是什么

查准率问：被报为正的样本中，有多少真的为正。

### 先看一个例子

报警10次，其中8次是真问题。

### 理解练习

没有被报警的问题会直接进入查准率分母吗？

<details><summary>答案与解释</summary>

不会，分母只统计所有报警，即TP+FP。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. P=TP/(TP+FP)，误报越多，在TP不变时比例越低。
2. 阈值变化会改变被报为正的集合，因此查准率需连同阈值报告。

### 具体输入与计算步骤

报警10次，其中8次是真问题。

1. TP=8、FP=2，P=8/(8+2)=0.8。
2. 误报增至4且TP不变，P=8/12≈0.6667。

计算结果：误报增至4且TP不变，P=8/12≈0.6667。

### 换到实际问题中应用

人工审核容量有限的反欺诈系统。

1. 在验证集选择满足审核量的阈值，统计所选案件真实欺诈比例。
2. 同时检查召回，避免只挑极少高把握案例造成大量漏报。

应用结论：同时检查召回，避免只挑极少高把握案例造成大量漏报。

### 举一反三：改变条件后的完整解答

若模型从不报警，查准率是100%吗？

<details><summary>变式的推演与答案</summary>

1. 此时TP+FP=0，原公式未定义。
2. 按约定报告未定义或指定值，并明确无报警，不能直接宣称完美。

按约定报告未定义或指定值，并明确无报警，不能直接宣称完美。

</details>

### 原有解释与进一步例题


### Definition

Precision is the fraction of predicted positives that are actually positive. It answers whether positive predictions are trustworthy at a specified decision threshold.


### Parameters and mechanism

Precision=TP/(TP+FP), where TP counts correctly predicted positives and FP counts negative examples predicted positive. If no positive predictions exist, the denominator is zero and the evaluation convention must be stated.


### Example

A detector raises 10 alarms and 8 are true cases: precision is 80%. This does not tell how many true cases it missed; recall addresses that separate denominator.


### 适用边界与常见误解

The denominator counts predicted positives, not actual positives. Precision is undefined when no examples are predicted positive unless a reporting convention is specified.

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/model_evaluation.html)

[返回分层目录](00-learning-index.md)
