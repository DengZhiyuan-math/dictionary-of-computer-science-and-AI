# MapReduce / Mergeable Summaries

概念编号：`concept:mapreduce-combiners` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/mapreduce-combiners/)

## 第一层：概念入门 · 知其然

### 按键汇总与中间结果

把大量记录分到不同机器后，同一个对象的信息可能散落在许多分片。例如，每条温度记录都带城市名，要计算每座城市的总记录数和平均温度，就必须把同城市的贡献合起来。城市名在这里叫键。


### 定义

MapReduce 是把记录先转换成键值对，再把相同键的值汇集并归约的计算组织方式。组合器是在发送中间结果前，对本地同键数据先做一次可合并汇总的过程；它是减少传输的优化，不能改变最终答案。

### 理解定义中的术语与关系

#### 摘要必须足以继续合并

求平均值时，只保存局部平均值会丢掉样本数量。保存“总和、数量”，就能继续分别相加，最后再相除。组合器可能不运行，也可能分层重复运行，所以最终结果不能依赖它恰好运行一次或使用某种特定分组。

### 概念边界与常见混淆

不是每种统计量都能用很小的精确摘要任意合并。还需检查重复输入、排序要求及浮点舍入；数学上可结合不等于机器上每种合并次序都逐位相同。

### 先看一个例子

分片 A 的温度是二和四，分片 B 只有十。A 输出总和六、数量二，B 输出总和十、数量一；合并后总和十六、数量三，均值为十六除以三。若直接平均局部均值三与十，得到六点五，就把仅一条记录的 B 当成与两条记录的 A 同样重。

### 理解练习

#### 1. 为何不能直接平均局部均值

例子中三与十为何不能等权平均？

<details><summary>答案与解释</summary>

它们分别概括两条和一条记录。等权平均会给第二个分片的单条记录更高权重；总和与数量保留了正确的观测单位。

</details>

#### 2. 没有组合器仍须正确

如果某次没有运行组合器，最终归约还能算对吗？

<details><summary>答案与解释</summary>

应当能。每条原始值可先表示成自身总和与数量一，最终统一合并。组合器减少中间数据，不承担一个缺它就错误的必需步骤。

</details>

#### 3. 已经合并过的摘要还能再合并吗

两个本地摘要合并后又与第三个摘要合并，数量是否要重新设为一？

<details><summary>答案与解释</summary>

不能。数量代表原始记录数，不是中间摘要的个数。重置为一会丢掉权重，重新引入平均局部均值的错误。

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
