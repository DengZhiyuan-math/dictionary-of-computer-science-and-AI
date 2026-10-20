# Kadane’s Algorithm

概念编号：`concept:kadane` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kadane/)

## 第一层：概念入门 · 知其然

### 定义

Kadane 算法求非空连续子数组的最大元素和。连续意味着不能跳过中间位置；算法从左到右保存“必须在当前位置结束”的最好和，每读一个数就比较单独从这里开始，或把它接到上一段之后。再保留所有结束位置中的最大值，就覆盖全部非空连续区间，而不用枚举每一对端点。

### 概念边界与常见混淆

非空要求决定全负数组不能返回空段和 0。若需要环形区间、限定长度或二维区域，原状态和转移需调整。

### 先看一个例子

数组 [−2,3,−1,4,−5]，各位置结束的最好和依次是 −2、3、2、6、1；全局最大为 6，对应 [3,−1,4]。第三项虽为负，保留它仍能把两侧的 3 与 4 接成合法连续段；不能只删掉所有负数。

### 理解练习

#### 1. 连续约束

能取 3 与 4 跳过 −1，报告和 7 吗？

<details><summary>答案与解释</summary>

不能，那不是连续子数组。合法连接必须包含中间 −1，和为 6。

</details>

#### 2. 全负数组

非空数组 [−4,−2,−7] 的答案是 0 吗？

<details><summary>答案与解释</summary>

不是，应选 [−2] 得 −2。返回 0 等于暗中允许空段。

</details>

#### 3. 状态区别

最后位置的最好和为 1，为何最终不返回 1？

<details><summary>答案与解释</summary>

最大区间不一定到数组末尾。还需保存此前结束位置的最好值 6。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 以i结束的最优解要么单独a[i]，要么接在前一最优后，end=max(a[i],end+a[i])。
2. 全局best记录所有end的最大值；非空问题以首元素初始化。

### 具体输入与计算步骤

数组[−2,3,−1,4]，要求子数组非空。

1. end依次为−2、max(3,1)=3、max(−1,2)=2。
2. 最后max(4,2+4)=6，最优子数组[3,−1,4]。

计算结果：最后max(4,2+4)=6，最优子数组[3,−1,4]。

### 换到实际问题中应用

寻找日收益序列中累计收益最大的连续区间。

1. 遍历时在重新开始子数组处记录起点，best改善时保存区间。
2. 输出区间和及边界；若是复合收益应先明确不能直接把简单收益求和当精确复利。

应用结论：输出区间和及边界；若是复合收益应先明确不能直接把简单收益求和当精确复利。

### 举一反三：改变条件后的完整解答

全负数组[−5,−2,−7]结果是什么？

<details><summary>变式的推演与答案</summary>

1. end依次−5、−2、−7，best最大为−2。
2. 非空答案是[−2]，返回0会错误允许空子数组。

非空答案是[−2]，返回0会错误允许空子数组。

</details>

### 原有解释与进一步例题


### 原理与推演

Maximum subarray sum can define the state as "the largest non-empty consecutive sum that must end at the current position". The new element is either connected to the previous interval or starts over; choose the larger value between the two, and then use the global answer to record the maximum value among all end points. The state only needs the previous value, so it can be squeezed into constant extra space.

For [-2,3,-1,4], the best sum ending at the final position comes from [3,-1,4]. If every value is negative, choose the largest negative value. Initializing the answer to zero would incorrectly allow an empty subarray.


### 例子

例子：数组 (−2,3,−1,4,−5)，记录“必须在当前位置结束”的最大和，依次为 −2、3、2、6、1，全局最大为 6，对应 (3,−1,4)。递推为 end=max(x,end+x)；若要求非空子数组，全负输入也不能返回空集的 0。


### 适用边界与常见误解

An all-negative array still needs to return a negative number, which cannot be replaced by an empty interval of zero.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
