# Anomaly Detection

概念编号：`concept:anomaly-detection` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/anomaly-detection/)

## 第一层：概念入门 · 知其然

### 它是什么

异常检测找出相对指定正常基线少见的观察；异常不自动等于错误或恶意。

### 先看一个例子

平时每分钟10次请求，突然50次值得调查，也可能是正常促销。

### 理解练习

请求从10到50能直接判定攻击吗？

<details><summary>答案与解释</summary>

不能；需结合正常基线、促销等上下文，异常分数不确认原因。

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
