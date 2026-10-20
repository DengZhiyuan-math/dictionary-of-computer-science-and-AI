# LIS Tails

概念编号：`concept:lis-tails` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/lis-tails/)

## 第一层：概念入门 · 知其然

### 定义

最长递增子序列要求从原序列中按原次序选若干项，使值严格增加，并最大化项数；所选位置不要求连续。tails 方法为每个可实现长度保存最小的结尾值。相同长度时较小结尾对后续扩展不更差，所以新值只需替换最早不小于它的结尾，或在全部结尾之后延长长度。

### 概念边界与常见混淆

tails 中不同长度的结尾可能来自不同历史子序列，因此整个 tails 数组不保证本身就是原序列的一条子序列。若要输出具体答案，需要另外保存前驱关系。严格递增与允许相等时，替换边界也不同。

### 先看一个例子

读入 [3,1,2]：先记录长度 1 的最小结尾为 3；读 1 后替换为 1，表示长度仍为 1 但扩展机会更好；读 2 后可接在 1 后，记录变为 [1,2]，最大长度为 2。替换不是修改原输入，也不是说早先的 3 从问题中被删除。

### 理解练习

#### 1. 子序列与子数组

[1,5,2,3] 的 [1,2,3] 是否允许作为递增子序列？

<details><summary>答案与解释</summary>

允许，它保持原次序但跳过 5。若问题要求连续子数组，则不能这样跳过。

</details>

#### 2. 重复值

输入 [2,2,2]，严格递增的最大长度是多少？

<details><summary>答案与解释</summary>

是 1。相同值不能延长严格递增序列，应替换第一个不小于它的结尾；若允许非降序，答案才是 3。

</details>

#### 3. 记录与答案

[2,3,1] 的最终 tails 为 [1,3]，能直接输出为原序列的子序列吗？

<details><summary>答案与解释</summary>

不能，1 出现在 3 之后。长度 2 的实际答案可取 [2,3]；这说明 tails 保存扩展信息，不是完整路径。

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
