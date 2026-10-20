# Precision

概念编号：`concept:precision` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/precision/)

## 第一层：概念入门 · 知其然

### 定义

查准率是在被系统判为正的样本中，真正为正的比例，等于TP/(TP+FP)。正类须由任务明确，例如“应拦截的垃圾邮件”；TP为正确拦截，FP为误拦正常邮件。它回答报出的结果有多可信，而不回答漏掉多少真实目标。

### 概念边界与常见混淆

没有任何正预测时分母为零，应声明约定，不能凭空说100%准确。正类比例变化也可能改变查准率，即使条件命中率相同。

### 先看一个例子

系统拦截20封，其中18封垃圾、2封正常，查准率90%。即使实际还有80封垃圾未被拦截，这个90%仍不变，因此必须配合查全率看覆盖。

### 理解练习

#### 1. 分母

共有100封邮件，18封正确拦截，查准率是18%吗？

<details><summary>答案与解释</summary>

不是，分母是全部拦截20封，故为90%，不是全部邮件。

</details>

#### 2. 漏报

查准率高是否意味着几乎找出全部垃圾邮件？

<details><summary>答案与解释</summary>

不意味着，只报少数很确定结果也能高查准，但可能漏很多。

</details>

#### 3. 无预测

一封也不拦截，能直接声称查准率100%吗？

<details><summary>答案与解释</summary>

不能，原比值未定义，应报告零分母规则与预测数量。

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
