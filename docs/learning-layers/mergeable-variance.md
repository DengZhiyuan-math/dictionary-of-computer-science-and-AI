# Mergeable Variance · 流式方差与分片合并

概念编号：`concept:mergeable-variance` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mergeable-variance/)

## 第一层：概念入门 · 知其然

### 它是什么

可合并方差用数量、均值和离均平方和概括一组数据，不存全部样本也能合并统计。

### 先看一个例子

分片A=[1,3]，B=[5,7]，求总体方差。

### 理解练习

直接平均两片方差能得到总体方差吗？

<details><summary>答案与解释</summary>

通常不能，会遗漏两片均值之间的差异。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 保存(n,μ,M₂)，M₂=Σ(x−μ)²；两片均值差δ时，合并μ=μA+δnB/n。
2. 合并M₂=M₂A+M₂B+δ²nAnB/n，最后总体方差M₂/n，空摘要先单独处理。

### 具体输入与计算步骤

分片A=[1,3]，B=[5,7]，求总体方差。

1. A摘要(2,2,2)，B摘要(2,6,2)，δ=4，合并均值4。
2. M₂=2+2+16×2×2/4=20，总体方差20/4=5。

计算结果：M₂=2+2+16×2×2/4=20，总体方差20/4=5。

### 换到实际问题中应用

分布式计算传感器波动。

1. 每个worker输出三元摘要，再用同一合并算子做树形归并。
2. 声明总体或样本方差，浮点运算的合并顺序仍可能导致细小舍入差。

应用结论：声明总体或样本方差，浮点运算的合并顺序仍可能导致细小舍入差。

### 举一反三：改变条件后的完整解答

同一数据若要求无偏样本方差，结果多少？

<details><summary>变式的推演与答案</summary>

1. M₂仍20，但分母从n=4改为n−1=3。
2. 结果20/3≈6.6667；样本数1时不能计算该无偏估计。

结果20/3≈6.6667；样本数1时不能计算该无偏估计。

</details>

### 原有解释与进一步例题


### 定义与应用范围

可合并方差摘要是在流式计算或分布式分片中，保存样本数、均值和离均差平方和，再由这些摘要计算整体方差的方法。应用问题是数据怎样分批到达、摘要如何合并；总体方差和样本方差的定义仍使用共同的统计基础。


### 参数、公式与边界

摘要为 (n, μ, M₂)，M₂ 是各观测与均值之差的平方和。合并非空摘要 A、B，令 \(n=n_A+n_B\)、\(\Delta=\mu_B-\mu_A\)，则 \(\mu=\mu_A+\Delta n_B/n\)，\(M_2=M_{2,A}+M_{2,B}+\Delta^2n_An_B/n\)。总体方差为 M₂/n；无偏样本方差为 M₂/(n−1)，要求 n>1。空摘要须先单独处理，不能除零。


### 例子

分片 A 为 1、3，摘要是 (2,2,2)；B 为 5，摘要是 (1,5,0)。合并得均值 3、M₂=8，总体方差为 8/3，样本方差为 4。直接平均两片的方差会漏掉分片均值之间的差异。摘要只需固定大小存储，但浮点合并次序仍可能带来微小舍入差。


### 适用边界与常见误解

Population variance and sample variance use different denominators. Empty input needs an explicit convention. Floating-point overflow and rounding remain possible, and different merge orders can produce slightly different results.

### 推导与方法参考

- [一手资料](https://github.com/airbnb/chronon/blob/5bbc4d176a205e32b4172b8f0ecd360072cdb0fe/aggregator/src/main/scala/ai/chronon/aggregator/base/SimpleAggregators.scala)

[返回分层目录](00-learning-index.md)
