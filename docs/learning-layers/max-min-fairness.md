# Max-min Fairness / Water Filling

概念编号：`concept:max-min-fairness` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/max-min-fairness/)

## 第一层：概念入门 · 知其然

### 资源、需求与可行分配

这里考虑一种可细分的资源，例如可按小份调整的计算配额。总容量固定，每个使用者还有需求上限。可行分配要求各人拿到的量非负、不超过其需求，合计不超过容量；先明确这些限制，再讨论什么叫公平。


### 定义

最大最小公平分配要求：若想在另一个可行分配中增加某人的份额，就必须减少至少一位原先份额不大于他的使用者的份额。这个定义保护较小份额者，不要求已经满足小需求的人继续拿走用不上的资源。此处采用单资源、相同权重的模型。

### 理解定义中的术语与关系

#### 注水法怎样实现这种分配

先把所有尚未满足需求的人一起增加相同份额。有人达到需求上限，就固定他的份额，余下的人继续一起增加。容量用完或所有需求满足时停止。这叫逐步注水；这里的水位只是共同分配量的表示，不需要先学某个贪心算法才能理解过程。

### 概念边界与常见混淆

不同权重、多种同时受限资源、不可细分任务或最低服务承诺，会改变可行集合或公平定义，不能直接套用这个等权单资源过程。

### 先看一个例子

容量为十二，三人需求上限为二、八、八。若先试每人四，第一人实际只需要二。固定他的二，把剩余十平均分给另外两人，得到二、五、五。若从拿五的人手中取一份给另一个拿五的人，就会伤害原份额不大于受益者的人，不能无代价提高较大份额。

### 理解练习

#### 1. 平均分不一定可行

例子中分为四、四、四，问题在哪里？

<details><summary>答案与解释</summary>

第一人需求上限是二，分四违反已声明的可行条件，也占用了别人仍需要的资源。公平比较必须在可行分配之间进行。

</details>

#### 2. 容量超过需求

容量变成二十，需求仍是二、八、八，是否应强行把二十全部分完？

<details><summary>答案与解释</summary>

不应。总需求只有十八，分为二、八、八即可，余下二不强行分配。资源利用目标不能推翻需求上限。

</details>

#### 3. 把更多给已经较大者

把二、五、五改为二、四、六，是否符合优先保护较小份额的思路？

<details><summary>答案与解释</summary>

不符合。对二、四、六这个新分配，可以把第三人的一份转给第二人，得到二、五、五：第二人的四增加了，只有原先拿六、份额比他更大的人被减少，没有伤害任何原份额不大于四的人。因此新分配违反最大最小公平的定义。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 同水位λ分配xᵢ=min(dᵢ,λ)，总分配为min(C,Σd)。
2. 逐步注水，碰到小需求上限就移出共享集合，再均分剩余容量。

### 具体输入与计算步骤

单一可分资源容量12，三个等权需求上限2、8、8。

1. 初始均分12/3=4，需求2先满足，剩容量10。
2. 剩两者各10/2=5，分配[2,5,5]，合计12。

计算结果：剩两者各10/2=5，分配[2,5,5]，合计12。

### 换到实际问题中应用

给三个租户分配可分CPU配额。

1. 按需求上限排序，用剩余容量除活跃租户数决定水位。
2. 验证不超过需求、总量不超容量；多资源或带权公平需要扩展模型。

应用结论：验证不超过需求、总量不超容量；多资源或带权公平需要扩展模型。

### 举一反三：改变条件后的完整解答

容量改20，需求仍2、8、8呢？

<details><summary>变式的推演与答案</summary>

1. 总需求只有18，所有人需求均可满足。
2. 分配[2,8,8]，剩2空闲，不强塞超过需求的资源。

分配[2,8,8]，剩2空闲，不强塞超过需求的资源。

</details>

### 原有解释与进一步例题


### 原理与推演

For capacity C >= 0 and demands d_i >= 0, allocate x_i = min(d_i, lambda), choosing a common water level so the total is min(C, sum d_i). A demand-capped consumer leaves the sharing set when its cap is reached.

Sort demands, satisfy the smallest cap when it is no greater than the remaining equal share, then divide the remaining capacity equally among active consumers. Sorting costs O(n log(n + 1)) time; the subsequent scan is linear.


### 适用边界与常见误解

This formula assumes equal weights and one divisible resource, without reservations, placement constraints, or indivisible jobs. Peloton's hierarchical, weighted, multi-resource scheduler has additional policies.

### 概念辨析

- [Risk Parity · 风险平价](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-risk-parity.md)：最大最小公平分配保护较小的未满足分配；风险平价约束组合风险贡献。目标、单位与约束不同。

### 推导与方法参考

- [一手资料](https://www.uber.com/us/en/blog/resource-scheduler-cluster-management-peloton/)

[返回分层目录](00-learning-index.md)
