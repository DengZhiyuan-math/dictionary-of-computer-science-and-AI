# Reservoir Sampling

概念编号：`concept:reservoir-sampling` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/reservoir-sampling/)

## 第一层：概念入门 · 知其然

### 数据流与抽样单位

数据流是逐项到达、最终长度可能事先未知的记录序列。这里抽取的是记录的位置；两条内容相同的日志仍是两个观测。均匀抽样要求在处理结束时，各个位置获得相同的入样机会，不是要求每种内容出现相同次数。


### 定义

蓄水池抽样是在只能保留固定数量记录、又不知道最终记录总数时，从已读记录中维护均匀随机样本的方法。容量为一时，任何时刻已读的每一条记录都有相同概率成为当前样本；容量为多项时，标准算法维护无放回的均匀子集。

### 理解定义中的术语与关系

#### 替换机会为什么随到达位置变化

只保留一项时，先保存第一条。读到第十条，就以十分之一的概率让它替换当前样本；没有替换时继续保留旧样本。后来的记录获得一次进入机会，旧记录也可能继续留下。随机选择需要按已读记录数变化，不能每来一条就固定用一半概率替换。均匀性指概率分布，单次输出本来就只有一个位置。

### 概念边界与常见混淆

抽样只能代表被实际纳入流程的记录。若程序先过滤掉某类日志，算法不会自动修复这种选择偏差；如果要求较新的记录更重要，则已经改变了均匀抽样的目标。

### 先看一个例子

从依次到来的 A、B、C 中抽一项：先留 A；B 到来时以二分之一概率换入，C 到来时以三分之一概率换入。A 最终留下的概率为二分之一乘三分之二，即三分之一；B 也为三分之一，C 直接以三分之一换入。因此三者机会相等，虽然它们到达的时间不同。

### 理解练习

#### 1. 均匀不等于每种内容各半

十条日志中九条是错误、一条是成功，均匀抽一条时，两种内容是否各占一半？

<details><summary>答案与解释</summary>

不是。抽样单位是十个记录位置，每个位置机会为十分之一，所以抽到错误的概率是十分之九，成功为十分之一。要求类别各半需要另一种抽样设计。

</details>

#### 2. 固定替换概率的后果

若 B、C 到来时都用二分之一概率替换，最终三者机会还相等吗？

<details><summary>答案与解释</summary>

不相等。A 需躲过两次替换，概率四分之一；B 先换入再躲过 C，也是四分之一；C 直接有二分之一。后到的 C 被偏重了。

</details>

#### 3. 一次结果与概率保证

一次运行恰好抽中了最后一条，是否说明算法不均匀？

<details><summary>答案与解释</summary>

不能。最后一条也应有入样机会。应检查替换规则的概率推理，或用大量独立重复观察分布；不能要求一次运行同时表现出所有位置的频率。

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
