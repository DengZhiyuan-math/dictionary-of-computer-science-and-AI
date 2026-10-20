# Anomaly Detection

概念编号：`concept:anomaly-detection` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/anomaly-detection/)

## 第一层：概念入门 · 知其然

### 定义

异常检测是在指定的正常参照下，对观察的偏离程度进行评分或筛查的任务。正常参照可以来自历史数据、已知正常样本或业务规则；阈值把连续的偏离分数变成是否报警的决定。这里的异常表示与参照不一致，不是对原因的诊断。

### 概念边界与常见混淆

罕见不等于有害，常见也不等于安全。阈值降低通常增加报警并可能增加误报；参照随季节或使用习惯失效时，需要更新参照，而不是只改阈值掩盖问题。

### 先看一个例子

网站平常工作日每分钟收到 8–15 次请求。先用这个范围作简化参照，把超过 30 次的分钟标记为异常。某分钟 50 次会报警，12 次不会。若这天正在举办促销，50 次可能是预期需求；问题可能是参照没有包含促销场景，而不是访问者在攻击网站。这里的范围和阈值都是示意规则。

### 理解练习

#### 1. 报警含义

每分钟 50 次超过阈值，能否直接封禁为攻击？

<details><summary>答案与解释</summary>

不能由这一个分数确认。它提示调查，应结合请求来源、促销和服务状态；自动封禁还需要另外定义行动规则与误伤成本。

</details>

#### 2. 改变阈值

把阈值从 30 改成 20，25 次这一分钟会怎样？正常参照是否因此改变？

<details><summary>答案与解释</summary>

它从不报警变成报警。改变的是决策规则，历史正常数据并没有因此改变；检测分数与是否采取行动应区分。

</details>

#### 3. 参照条件

周末通常每分钟 50 次，仍用工作日规则会有什么问题？

<details><summary>答案与解释</summary>

正常周末也会持续报警。需要按适当时段建参照或把时段纳入模型；持续报警并不证明每个周末都有攻击。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 先定义正常数据范围和评分函数。
2. 分数阈值决定报警率；模型变化和阈值变化要分开评估。

### 具体输入与计算步骤

教学正常均值10、标准差2，用z=(x−10)/2，大于3报警。

1. x=18时z=8/2=4。
2. 4>3所以报警；x=15时z=2.5不报警。

计算结果：阈值只是规则，不代表已确认故障。

### 换到实际问题中应用

监控服务器请求量。

1. 按工作日与时段建立正常基线。
2. 报警后结合发布记录与错误率排查。

应用结论：减少把正常活动误报为攻击。

### 举一反三：改变条件后的完整解答

促销期正常均值升到16、标准差仍2，18还异常吗？

<details><summary>变式的推演与答案</summary>

1. 新z=(18−16)/2=1。
2. 低于阈值3。

基线改变会改变异常判断，需防止把真实故障学成正常。

</details>

### 原有解释与进一步例题


### Definition

Anomaly detection identifies observations unusual under a specified reference model or normal-data baseline. Unusual does not necessarily mean erroneous, malicious or important; that interpretation requires context.


### Parameters and mechanism

A simple score is z=(x-μ)/σ for a scalar baseline with positive scale σ. A rule may flag |z|>k. μ and σ are estimated from reference data, k is a chosen threshold, and a normal-distribution interpretation requires additional assumptions.


### Example

If normal latency has reference mean 100 ms and scale 10 ms, 150 ms has z=5. A threshold of 3 flags it for investigation. A sustained workload change can make the old baseline inappropriate rather than proving each new request is faulty.


### 适用边界与常见误解

The anomaly score does not automatically equal the calibrated anomaly probability.

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/outlier_detection.html)

[返回分层目录](00-learning-index.md)
