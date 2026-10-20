# Difference Array

概念编号：`concept:difference-array` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/difference-array/)

## 第一层：概念入门 · 知其然

### 它是什么

差分数组记录相邻值的变化量，把整段加法变成两个端点调整，最后前缀累加还原。

### 先看一个例子

把开水龙头记为流量+3、关掉记为−3，中间不用每秒重复记录。

### 理解练习

关水龙头的负变化应该记在哪？

<details><summary>答案与解释</summary>

闭区间最后位置仍需保留流量，因此在r+1减回，防止后续继续累积。

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
