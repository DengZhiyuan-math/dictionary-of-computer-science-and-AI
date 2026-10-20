# Anomaly Detection

概念编号：`concept:anomaly-detection` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/anomaly-detection/)

## 第一层：概念入门 · 知其然

### 它是什么

Anomaly detection identifies observations unusual under a specified reference model or normal-data baseline. Unusual does not necessarily mean erroneous, malicious or important; that interpretation requires context.

### 先看一个例子

If normal latency has reference mean 100 ms and scale 10 ms, 150 ms has z=5. A threshold of 3 flags it for investigation. A sustained workload change can make the old baseline inappropriate rather than proving each new request is faulty.

### 理解练习

用自己的话解释：上面的情景为什么是“Anomaly Detection”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Anomaly detection identifies observations unusual under a specified reference model or normal-data baseline. Unusual does not necessarily mean erroneous, malicious or important; that interpretation requires context.

情景依据：If normal latency has reference mean 100 ms and scale 10 ms, 150 ms has z=5. A threshold of 3 flags it for investigation. A sustained workload change can make the old baseline inappropriate rather than proving each new request is faulty.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

A simple score is z=(x-μ)/σ for a scalar baseline with positive scale σ. A rule may flag |z|>k. μ and σ are estimated from reference data, k is a chosen threshold, and a normal-distribution interpretation requires additional assumptions.


### 适用边界与常见误解

The anomaly score does not automatically equal the calibrated anomaly probability.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
