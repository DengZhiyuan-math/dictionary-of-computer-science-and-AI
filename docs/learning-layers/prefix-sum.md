# Prefix Sum

概念编号：`concept:prefix-sum` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/prefix-sum/)

## 第一层：概念入门 · 知其然

### 定义

前缀和保存从数组开头到各边界之前的累计值。采用P[0]=0、P[i]为前i项之和时，从索引l到r−1的区间和是P[r]−P[l]。相减抵消共同前缀，让静态数组的连续区间求和不必重复遍历；边界采用包含左端、排除右端的约定。

### 概念边界与常见混淆

修改一个元素会影响之后的全部前缀；频繁更新应考虑其他结构。负值不妨碍求和公式，但会破坏“前缀总是递增”的额外假设。

### 先看一个例子

数组[3,−1,4]得到P=[0,3,2,6]。索引1至2两项之和，用P[3]−P[1]=6−3=3，对应−1+4。开头补零使首项区间也可用相同公式。

### 理解练习

#### 1. 边界

求整个数组是否P[3]−P[0]？

<details><summary>答案与解释</summary>

是，得到6；尾后边界为3，不是最后索引2。

</details>

#### 2. 更新

第一项加2，只改P[1]足够吗？

<details><summary>答案与解释</summary>

不足，P[1]及之后每项都含第一项，应全部相应增加。

</details>

#### 3. 负值

P从3降到2就说明计算错了吗？

<details><summary>答案与解释</summary>

不一定，加入−1时正应下降；单调性不是一般前缀和定义。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 定义P[0]=0、P[i+1]=P[i]+a[i]。
2. 区间[l,r)之和P[r]−P[l]，共同前缀恰好抵消。

### 具体输入与计算步骤

数组[2,1,4]，用半开区间求下标1至3的和。

1. 构建P=[0,2,3,7]。
2. [1,3)和为P[3]−P[1]=7−2=5。

计算结果：[1,3)和为P[3]−P[1]=7−2=5。

### 换到实际问题中应用

频繁查询每天销量的时间区间总量。

1. 一次O(n)建前缀，每次O(1)回答区间。
2. 若原数据频繁修改，应评估树状数组等动态结构，静态前缀更新会影响后缀。

应用结论：若原数据频繁修改，应评估树状数组等动态结构，静态前缀更新会影响后缀。

### 举一反三：改变条件后的完整解答

将中间值1改为3，原P能继续用吗？

<details><summary>变式的推演与答案</summary>

1. 后续前缀均需加2，新P=[0,2,5,9]。
2. 新[1,3)和9−2=7；旧前缀会错误返回5。

新[1,3)和9−2=7；旧前缀会错误返回5。

</details>

### 原有解释与进一步例题


### 原理与推演

Define the prefix sum P such that the sum of the first zero elements is zero. The sum of a segment is k, which is equivalent to the current prefix sum minus an earlier prefix sum equal to k. Therefore, when scanning the current prefix P, check how many times P minus k has appeared before, then accumulate the answer, and finally record the current P. The occurrence of the zero prefix must be recorded once at the beginning to count the interval starting from the beginning of the array.

For example, one, negative one, one, the target is one. The three legal intervals come from two single elements and the entire array; the prefix frequency can count the contribution of repeated prefixes. The hash table must save the number of times, not just whether it exists. Recording the current prefix first and then querying will incorrectly include empty intervals when k is zero.


### 适用边界与常见误解

Counting often needs prefix frequencies and an initial zero prefix. Tree paths also need state undo on return.

### 例题：Prefix Sums: Counting Still Works with Negative Numbers

For [1,-1,1], count contiguous subarrays whose sum is 1. Let s be the prefix sum and initialize its frequency table to {0:1}.

1. After the first element, s=1. Look up s-1=0 and find one prior prefix. Add 1 to the count, then record prefix sum 1.
2. After the second element, s=0. Looking up -1 finds no prefix. Increase the frequency of prefix sum 0 to 2.
3. After the third element, s=1. Looking up 0 finds two prior prefixes, raising the total count to 3. Then record the current prefix.

结果：The three index intervals are [0,0], [0,2] and [2,2]. Expected time O(n), auxiliary space O(n).

易错点：Query before recording the current prefix; otherwise a target of 0 counts an empty interval. With negative values, window sums need not change monotonically as the window grows.

变式：How many nonempty zero-sum intervals does [0,0,0] contain?

参考答案：6: three of length 1, two of length 2 and one of length 3. Prefix frequencies contribute 1+2+3.

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

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
