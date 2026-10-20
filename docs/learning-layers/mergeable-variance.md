# Mergeable Variance · 流式方差与分片合并

概念编号：`concept:mergeable-variance` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mergeable-variance/)

## 第一层：概念入门 · 知其然

### 它是什么

可合并方差摘要是在流式计算或分布式分片中，保存样本数、均值和离均差平方和，再由这些摘要计算整体方差的方法。应用问题是数据怎样分批到达、摘要如何合并；总体方差和样本方差的定义仍使用共同的统计基础。

### 先看一个例子

分片 A 为 1、3，摘要是 (2,2,2)；B 为 5，摘要是 (1,5,0)。合并得均值 3、M₂=8，总体方差为 8/3，样本方差为 4。直接平均两片的方差会漏掉分片均值之间的差异。摘要只需固定大小存储，但浮点合并次序仍可能带来微小舍入差。

### 理解练习

用自己的话解释：上面的情景为什么是“Mergeable Variance · 流式方差与分片合并”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：可合并方差摘要是在流式计算或分布式分片中，保存样本数、均值和离均差平方和，再由这些摘要计算整体方差的方法。应用问题是数据怎样分批到达、摘要如何合并；总体方差和样本方差的定义仍使用共同的统计基础。

情景依据：分片 A 为 1、3，摘要是 (2,2,2)；B 为 5，摘要是 (1,5,0)。合并得均值 3、M₂=8，总体方差为 8/3，样本方差为 4。直接平均两片的方差会漏掉分片均值之间的差异。摘要只需固定大小存储，但浮点合并次序仍可能带来微小舍入差。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数、公式与边界

摘要为 (n, μ, M₂)，M₂ 是各观测与均值之差的平方和。合并非空摘要 A、B，令 \(n=n_A+n_B\)、\(\Delta=\mu_B-\mu_A\)，则 \(\mu=\mu_A+\Delta n_B/n\)，\(M_2=M_{2,A}+M_{2,B}+\Delta^2n_An_B/n\)。总体方差为 M₂/n；无偏样本方差为 M₂/(n−1)，要求 n>1。空摘要须先单独处理，不能除零。


### 适用边界与常见误解

Population variance and sample variance use different denominators. Empty input needs an explicit convention. Floating-point overflow and rounding remain possible, and different merge orders can produce slightly different results.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
