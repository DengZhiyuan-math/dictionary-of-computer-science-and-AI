# Knapsack · 物品使用次数与一维状态更新

概念编号：`concept:0-1-knapsack-unbounded-knapsack` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/0-1-knapsack-unbounded-knapsack/)

## 第一层：概念入门 · 知其然

### 它是什么

背包问题是在容量限制内选择物品；0/1 表示每件限一次，完全背包允许重复。

### 先看一个例子

一件重2、价值3的物品，背包容量4。

### 理解练习

0/1 情况能得到价值6吗？

<details><summary>答案与解释</summary>

不能，只有一件物品，最多价值3。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 令 dp[c] 为容量 c 内最大价值，则候选值是 dp[c−2]+3。
2. 0/1 倒序读取旧状态；完全背包正序读取本轮状态，因此允许再次取用。

### 具体输入与计算步骤

一件重2、价值3的物品，背包容量4。

1. 初始化 dp=[0,0,0,0,0]，倒序更新 c=4、3、2，均得到3。
2. 完全背包正序更新：dp[2]=3，dp[4]=dp[2]+3=6。

计算结果：完全背包正序更新：dp[2]=3，dp[4]=dp[2]+3=6。

### 换到实际问题中应用

预算4元，优惠券每种只能用一次，金额分别1、2、5元，要求刚好抵扣。

1. 布尔状态仅 dp[0]=真；倒序加入1后可达{0,1}，加入2后可达{0,1,2,3}。
2. 5超过预算，4仍不可达，不能把未装满误报为成功。

应用结论：5超过预算，4仍不可达，不能把未装满误报为成功。

### 举一反三：改变条件后的完整解答

若每件限一次，重量改为1、2、3，容量4呢？

<details><summary>变式的推演与答案</summary>

1. 处理1、2后可达0至3；处理3时 dp[4]读取旧 dp[1]。
2. dp[1]为真，因此1+3可恰好装满4。

dp[1]为真，因此1+3可恰好装满4。

</details>

### 原有解释与进一步例题


### 定义与应用范围

0/1 背包中每件物品最多选一次，完全背包允许同类物品重复使用。两者都可把容量作为状态，但一维压缩时必须防止错误复用当前物品。最少硬币数、最大价值、方案计数是不同目标，不能照搬同一递推的初始化。


### 参数、公式与边界

最大价值状态 dp[c] 配合重量 w、价值 v，可尝试 \(dp[c]=\max(dp[c],dp[c-w]+v)\)。0/1 情形按容量递减，读取的仍是本轮物品加入之前的状态；完全背包按容量递增，允许读取本轮已更新的状态。精确装满问题要把不可达状态设为不可达，容量零再按目标初始化。


### 例子

只有一件重量 2、价值 3 的物品，容量为 4。0/1 背包的价值最多为 3，若递增更新却得到 6，说明同一件被用了两次；完全背包允许重复时 6 才合法。若目标改成“最少硬币数”，就应使用最小化递推和相应不可达值。


### 适用边界与常见误解

With items in the outer loop, 0/1 capacities are usually traversed backward and unbounded capacities forward. Also distinguish counting from optimization.

### 例题：0/1 Knapsack: Descending Capacity Prevents Reuse

Item weights are [1,2,5], each usable once, and capacity is 4. Determine whether it can be filled exactly. Boolean dp[c] records whether processed items can sum to c.

1. Initialize only dp[0] to true. For weight 1, scan capacities from 4 down to 1. Only 0 and 1 become reachable.
2. Process weight 2 in descending order. Capacities 0,1,2,3 are reachable. Capacity 4 reads dp[2] from before this item, so remains false.
3. Weight 5 exceeds capacity. An ascending scan would reuse weight 1 within one pass and incorrectly make every capacity reachable.

结果：Capacity 4 is unreachable. Time O(number of items × capacity), auxiliary space O(capacity). This is exact-fill reachability.

易错点：Unbounded knapsack permits repeated use of an item type and can use an ascending update order that allows reuse. Loop order expresses the usage constraint.

变式：What if the weights become [1,2,3]?

参考答案：Yes: 1+3 fills capacity 4, still using each item only once.

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/3484e876d81aba07911a1109f5b5e81e_MIT6_006F11_lec21.pdf)

[返回分层目录](00-learning-index.md)
