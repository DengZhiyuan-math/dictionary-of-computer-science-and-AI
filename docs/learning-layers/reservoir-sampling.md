# Reservoir Sampling

概念编号：`concept:reservoir-sampling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/reservoir-sampling/)

## 第一层：概念入门 · 知其然

### 它是什么

蓄水池抽样在不知道最终数据流长度时，用固定容量保留一个均匀随机子样本。它解决抽样问题；Bloom filter 解决近似成员查询，定义不再从后者页面重复搬来。

### 先看一个例子

容量 k=1，先保存 A；B 到来时以 1/2 概率替换，C 到来时以 1/3 概率替换。最终 A 的保留概率为 (1/2)×(2/3)=1/3，B 也为 1/3，C 为 1/3。不能总用 1/2 替换，否则近期记录被过度保留。

### 理解练习

用自己的话解释：上面的情景为什么是“Reservoir Sampling”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：蓄水池抽样在不知道最终数据流长度时，用固定容量保留一个均匀随机子样本。它解决抽样问题；Bloom filter 解决近似成员查询，定义不再从后者页面重复搬来。

情景依据：容量 k=1，先保存 A；B 到来时以 1/2 概率替换，C 到来时以 1/3 概率替换。最终 A 的保留概率为 (1/2)×(2/3)=1/3，B 也为 1/3，C 为 1/3。不能总用 1/2 替换，否则近期记录被过度保留。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数与公式

容量为 k，先保存前 k 个观测。第 t>k 个观测到来时，从 1 到 t 等概率抽整数 j；若 j≤k，就替换池中第 j 个，否则保持。处理到 t 时，每个原观测被保留的概率都是 k/t，空间为 O(k)。


### 适用边界与常见误解

Correct probabilities depend on uniform-index bounds and the definition of a sampling unit.

### 例题：Reservoir Sampling: Every Position Ends with Probability One Third

A,B,C arrive in a stream. Keep one sample, applying a position-dependent replacement probability.

1. Keep A initially. B replaces it with probability 1/2.
2. C replaces the current sample with probability 1/3. A’s final retention probability is 1×1/2×2/3=1/3.
3. B’s final probability is 1/2×2/3=1/3. C’s final probability is 1/3.

结果：All three positions are equally likely to remain, without knowing the stream’s final length in advance.

易错点：Replacing with probability 1/2 every time favors later elements. Incorrect endpoints in uniform integer sampling also change probabilities.

变式：For records A,A,B, what is the probability that the retained value is A?

参考答案：2/3. Sampling is uniform over record positions. The two A records are distinct positions; values are not deduplicated first.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
