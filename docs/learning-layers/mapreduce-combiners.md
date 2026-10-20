# MapReduce / Mergeable Summaries

概念编号：`concept:mapreduce-combiners` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mapreduce-combiners/)

## 第一层：概念入门 · 知其然

### 它是什么

MapReduce把同键数据汇总；组合器先在本地压缩摘要，减少传输，但必须保持最终结果。

### 先看一个例子

分片A有[2,4]，分片B只有[10]，求总体均值。

### 理解练习

直接平均两个分片均值3和10对吗？

<details><summary>答案与解释</summary>

不对，分片大小不同，应保留各自样本数。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 均值可合并摘要为(sum,count)，合并时分别相加，最终才做除法。
2. 组合器可能被跳过或重复分层执行，局部合并必须对任意分组保持语义一致。

### 具体输入与计算步骤

分片A有[2,4]，分片B只有[10]，求总体均值。

1. A摘要(6,2)，B摘要(10,1)，合并为(16,3)。
2. 总体均值16/3≈5.333；直接平均(3+10)/2=6.5错误。

计算结果：总体均值16/3≈5.333；直接平均(3+10)/2=6.5错误。

### 换到实际问题中应用

按城市汇总大量温度记录。

1. Mapper发出城市与(sum,count)，本地combiner按城市先合并。
2. Reducer再次合并后除总样本数，空分片按恒等摘要(0,0)处理。

应用结论：Reducer再次合并后除总样本数，空分片按恒等摘要(0,0)处理。

### 举一反三：改变条件后的完整解答

若B改为[10,10]，正确均值多少？

<details><summary>变式的推演与答案</summary>

1. B摘要(20,2)，总摘要(26,4)。
2. 均值26/4=6.5，这次等大分片的均值平均恰好成立，但不是一般规则。

均值26/4=6.5，这次等大分片的均值平均恰好成立，但不是一般规则。

</details>

### 原有解释与进一步例题


### 原理与推演

For a mean, retain (sum, count), combine pairs componentwise, and divide once at the end. An unweighted average of worker means fails when partition sizes differ.

A combiner must preserve results when applied to different groupings, including when it is skipped. Associativity and commutativity are useful requirements for unordered aggregation; floating-point rounding still depends on evaluation order.


### 例子

例子：分片一为 (0,10)，均值 5；分片二只有 (100)，均值 100。直接平均两个均值得 52.5，但正确整体均值为 110/3≈36.67。保存并合并 (sum,count) 可处理不同分片大小。


### 适用边界与常见误解

Aggregation algebra does not by itself guarantee exactly-once side effects, deterministic floating-point results, or balanced partitions.

### 推导与方法参考

- [一手资料](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/)

[返回分层目录](00-learning-index.md)
