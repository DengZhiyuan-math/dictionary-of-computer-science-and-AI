# Difference Array

概念编号：`concept:difference-array` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/difference-array/)

## 第一层：概念入门 · 知其然

### 定义

差分数组用第一个值及此后相邻值的差来表示原数组。由它从左到右累加可以还原原值。这个表示适合把一整段位置都增加相同数值：只在区间开始处记录增加，在结束后的下一位置记录抵消，最后统一累加得到全部结果。原数组长度与结束后标记的存放方式需要预先约定。

### 概念边界与常见混淆

差分端点更新本身很快，但查看任意原值仍需要相应前缀累加。它尤其适合先做很多区间加法、再统一还原；不应把端点更新快误说成所有即时查询也同样快。

### 先看一个例子

原数组 [2,2,2,2]，差分为 [2,0,0,0]。把第二至第三项各加 5，在第二个差分加 5、第四个差分减 5，得到 [2,5,0,−5]。逐项累加后为 [2,7,7,2]。若不在第四项抵消，第四个原值也会错误地增加。

### 理解练习

#### 1. 还原含义

差分 [3,−1,4] 代表什么原数组？

<details><summary>答案与解释</summary>

依次累加得到 [3,2,6]。差分里的 −1 是相邻值下降量，不表示第二个原值就是 −1。

</details>

#### 2. 端点位置

第二至第三项加 5，为什么不在第三个差分减 5？

<details><summary>答案与解释</summary>

那会从第三个原值开始抵消，导致第三项没增加。应在结束后的第四项抵消，明确区间两端均包含。

</details>

#### 3. 更新类型

把第二至第三项都改成 5，能否总用上述两个端点加减实现？

<details><summary>答案与解释</summary>

不能直接照搬。赋值所需增量取决于各项旧值，不一定相同；此处机制处理统一增量，不是任意区间赋值。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 零基d[0]=a[0]，d[i]=a[i]−a[i−1]。
2. 闭区间[l,r]加x时d[l]+=x、d[r+1]−=x，预留尾哨兵。

### 具体输入与计算步骤

四项初始全0，对[1,2]加3。

1. 含哨兵差分为[0,3,0,−3,0]。
2. 累加前四项得[0,3,3,0]。

计算结果：每次更新O(1)，最终还原O(n)。

### 换到实际问题中应用

批量统计区间预约占用。

1. 每份预约起点加人数、结束后一位减人数。
2. 处理全部预约后扫描前缀，得到每时段人数及峰值。

应用结论：适合离线批量更新，频繁在线查询需其他结构。

### 举一反三：改变条件后的完整解答

再给[0,3]加2，结果是什么？

<details><summary>变式的推演与答案</summary>

1. d[0]+=2，d[4]−=2。
2. 还原得[2,5,5,2]。

末尾r+1哨兵防止越界和错误延长更新。

</details>

### 原有解释与进一步例题


### 原理与推演

A difference array may use zero-based or one-based indices, but reserve the position after the right endpoint. To add x over a closed range [l,r], add x to d[l] and subtract x from d[r+1]. Prefix accumulation then reconstructs the updated array.

Step 1: Allocate a length-6 difference array. The first update adds 2 to d[1] and subtracts 2 from d[4].


### 适用边界与常见误解

Basic difference arrays suit offline reconstruction; online queries usually require another structure.

### 例题：Difference Arrays: Undo the Increment After the Range

Start with a zero-based, length-5 array of zeros. Add 2 to inclusive [1,3], then add -1 to [2,4], reconstructing the array afterward.

1. Allocate a length-6 difference array. The first update adds 2 to d[1] and subtracts 2 from d[4].
2. The second subtracts 1 from d[2] and adds 1 to d[5]. Position d[5] is a sentinel canceling the update after the array ends.
3. Prefix-sum the first five differences to obtain values 0,2,1,1,-1 at positions 0…4.

结果：The final array is [0,2,1,1,-1]. Each range update changes two endpoints; final reconstruction takes O(n).

易错点：For an inclusive range, cancel at r+1 rather than r. Allocate the sentinel but do not return it as a sixth array value.

变式：For a half-open range [l,r), where is the cancellation?

参考答案：At d[r], because r is already outside the updated range.

### 推导与方法参考

- [一手资料](https://usaco.guide/silver/prefix-sums)

[返回分层目录](00-learning-index.md)
