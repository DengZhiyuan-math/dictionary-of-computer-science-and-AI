# Reservoir Sampling

概念编号：`concept:reservoir-sampling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/reservoir-sampling/)

## 第一层：概念入门 · 知其然

### 它是什么

蓄水池抽样只保留固定数量样本，也能从长度未知的数据流中等概率抽取。

### 先看一个例子

只留一个样本，依次读取A、B、C。

### 理解练习

最后一个C一定最容易留下吗？

<details><summary>答案与解释</summary>

不是，正确算法让三者最终概率都为1/3。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 第i项以1/i概率替换当前样本，旧项留下需连续躲过后续替换。
2. 旧项概率(1/(i−1))×(1−1/i)=1/i，新项也是1/i，归纳证明均匀。

### 具体输入与计算步骤

只留一个样本，依次读取A、B、C。

1. 先保留A；读B时以1/2替换，读C时以1/3替换。
2. 最终P(A)=1×1/2×2/3=1/3，P(B)=1/2×2/3=1/3，P(C)=1/3。

计算结果：最终P(A)=1×1/2×2/3=1/3，P(B)=1/2×2/3=1/3，P(C)=1/3。

### 换到实际问题中应用

从无法全部存下的日志流抽一个审查样本。

1. 为每条有效记录递增计数，并用均匀随机整数决定替换。
2. 保存样本及计数，若需可重现则保存随机状态；不能只随机取开头一段。

应用结论：保存样本及计数，若需可重现则保存随机状态；不能只随机取开头一段。

### 举一反三：改变条件后的完整解答

第四项D到来后，A被保留的概率多少？

<details><summary>变式的推演与答案</summary>

1. A原概率1/3，避开D替换概率3/4。
2. 乘积1/4，与B、C、D相同。

乘积1/4，与B、C、D相同。

</details>

### 原有解释与进一步例题


### 定义

蓄水池抽样在不知道最终数据流长度时，用固定容量保留一个均匀随机子样本。它解决抽样问题；Bloom filter 解决近似成员查询，定义不再从后者页面重复搬来。


### 参数与公式

容量为 k，先保存前 k 个观测。第 t>k 个观测到来时，从 1 到 t 等概率抽整数 j；若 j≤k，就替换池中第 j 个，否则保持。处理到 t 时，每个原观测被保留的概率都是 k/t，空间为 O(k)。


### 例子

容量 k=1，先保存 A；B 到来时以 1/2 概率替换，C 到来时以 1/3 概率替换。最终 A 的保留概率为 (1/2)×(2/3)=1/3，B 也为 1/3，C 为 1/3。不能总用 1/2 替换，否则近期记录被过度保留。


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

### 推导与方法参考

- [一手资料](https://dl.acm.org/doi/10.1145/3147.3165)

[返回分层目录](00-learning-index.md)
