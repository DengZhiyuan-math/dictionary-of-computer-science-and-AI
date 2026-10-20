# Consistent Hashing

概念编号：`concept:consistent-hashing` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/consistent-hashing/)

## 第一层：概念入门 · 知其然

### 键的归属与节点变化

分布式存储需要把数据键路由到负责它的节点。节点增加或离开时，旧键的归属可能改变，进而需要迁移或重新填充数据。哈希在这里提供稳定的位置映射，不负责证明内容安全或数据副本一致。


### 定义

一致性哈希是一类让成员变化时尽量局部改变键归属的分配方法。常见圆环实现把节点位置和键位置放到同一周期空间中，按固定方向选择遇到的第一个节点作为归属；新增节点只接管相应区间。

### 理解定义中的术语与关系

#### 圆环只是路由规则

位置走到末端会绕回起点，所以每个键仍能找到归属。一个物理节点可有多个虚拟位置以改善分配，但这些位置不是多个独立故障副本。迁移时怎样读取旧数据、维护副本及处理不同版本成员表，需要另外的系统协议。

### 概念边界与常见混淆

局部迁移不保证负载完全均匀，也不能解决一个特别热门的键。哈希位置分布、虚拟位置数量和节点容量都会影响实际平衡。

### 先看一个例子

教学圆环只有零至九十九的位置，节点在二十、六十、九十；键在十、三十、七十、九十五。按递增方向选首个节点，四键分别归二十、六十、九十、二十。增加四十后，三十改归四十，其他三键保持；并非所有键因节点数变化而重新分配。

### 理解练习

#### 1. 绕回规则

键九十五之后没有更大节点，是否应该报没有归属？

<details><summary>答案与解释</summary>

不是。圆环定义要求绕回到二十。若忘记绕回，就没有实现同一条周期路由规则。

</details>

#### 2. 虚拟位置不是独立副本

同一机器有三个虚拟位置，是否已经可以抵抗该机器故障？

<details><summary>答案与解释</summary>

不能，机器故障会同时影响三个位置。容错副本要分布到符合故障隔离要求的不同物理资源。

</details>

#### 3. 负载与键数量

每个节点拥有相同数量的键，能否断言处理负载相同？

<details><summary>答案与解释</summary>

不能。键的访问频率、记录大小和处理成本可能不同。路由均匀只是负载平衡的一部分，热点需要另行分析。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 键归属于第一个不小于其哈希的令牌，无则绕回。
2. 新增令牌v接管前一令牌之后至v的区间，其他归属不变；虚拟令牌可改善平衡。

### 具体输入与计算步骤

环取0至99，节点令牌20、60、90，键哈希为10、30、70、95。

1. 原归属10→20、30→60、70→90、95→20。
2. 插入40只转移区间(20,40]，键30改归40，其余三键不变。

计算结果：插入40只转移区间(20,40]，键30改归40，其余三键不变。

### 换到实际问题中应用

给缓存集群扩容。

1. 用固定哈希、排序令牌表及二分查找路由，成员变更按受影响区间迁移。
2. 复制时选择不同物理节点，避免多个虚拟令牌误算为多个容错副本。

应用结论：复制时选择不同物理节点，避免多个虚拟令牌误算为多个容错副本。

### 举一反三：改变条件后的完整解答

若移除令牌60，原归60的键30去哪里？

<details><summary>变式的推演与答案</summary>

1. 在未插入40的原环中，下一个顺时针令牌为90。
2. 键30转到90，令牌20和90原有键无需重算归属。

键30转到90，令牌20和90原有键无需重算归属。

</details>

### 原有解释与进一步例题


### 原理与推演

In a clockwise ring, a key belongs to the first token at or after its hash, with wraparound. A sorted token array supports this lookup with binary search.

Inserting a token transfers the interval from the previous token, exclusive, to the new token, inclusive. Virtual tokens can improve balance; replication must select distinct physical owners when required.


### 例子

例子：环上的节点令牌为 20、60、90，键哈希 50 归到顺时针首个令牌 60。加入令牌 40 后，哈希 30 的键从 60 转到 40，哈希 50 仍归 60。迁移范围由环区间决定，并非所有键重新分配。


### 适用边界与常见误解

Limited remapping does not imply equal load, automatic data migration, or consistency during reconfiguration. One hot key can remain a bottleneck.

### 推导与方法参考

- [一手资料](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/consistent-hashing.html)

[返回分层目录](00-learning-index.md)
