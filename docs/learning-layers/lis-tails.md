# LIS Tails

概念编号：`concept:lis-tails` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/lis-tails/)

## 第一层：概念入门 · 知其然

### 它是什么

LIS的tails方法给每种长度保留能实现的最小结尾，结尾越小越方便后续延长；它求长度不直接保存完整序列。

### 先看一个例子

接龙时相同长度下保留较小尾牌，就给后续牌留下更多选择。

### 理解练习

相同长度接龙为何留小尾牌？

<details><summary>答案与解释</summary>

未来能接在大尾牌后的牌也能接小尾牌，小尾不会减少延长机会。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 严格递增时，对每个x找tails中首个≥x的位置替换。
2. 找不到则追加，tails长度即LIS长度，二分使总时间O(n log n)。

### 具体输入与计算步骤

输入[3,1,2,2,4]。

1. tails依次[3]、[1]、[1,2]。
2. 第二个2替换已有2，4追加成[1,2,4]。

计算结果：严格LIS长度3，不把相等2重复计数。

### 换到实际问题中应用

求最大嵌套信封数。

1. 宽度升序、同宽高度降序排序。
2. 对高度求严格LIS，避免同宽信封被同时选。

应用结论：排序规则是从二维约束归约到一维的关键。

### 举一反三：改变条件后的完整解答

若改求非递减子序列呢？

<details><summary>变式的推演与答案</summary>

1. 改找首个>x的位置，允许相等2追加。
2. 该输入可取[1,2,2,4]。

长度4，比较符号改变问题定义。

</details>

### 原有解释与进一步例题


### Definition

The tails method finds the length of a longest strictly increasing subsequence. tails[k] is the smallest achievable ending value of an increasing subsequence of length k+1 among processed inputs.


### Parameters and mechanism

For each x, replace the first tails value greater than or equal to x, or append if none exists. Binary search gives O(n log n). tails is a summary of best endpoints, not necessarily one actual subsequence; reconstruction needs predecessor information.


### Example

Processing [3,1,2] changes tails from [3] to [1] to [1,2], so the length is 2. The strict version uses the first value ≥x; choosing the first value >x instead addresses a nondecreasing variant.


### 适用边界与常见误解

tails need not itself be a subsequence of the input. Reconstruction requires additional predecessor information.

### 推导与方法参考

- [一手资料](https://escholarship.org/uc/item/09j2v8d0)

[返回分层目录](00-learning-index.md)
