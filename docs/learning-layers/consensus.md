# Consensus

概念编号：`concept:consensus` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/consensus/)

## 第一层：概念入门 · 知其然

### 它是什么

Consensus protocols let nodes agree on particular state updates; Raft is one common algorithm. Leader election decides who coordinates certain operations. Distributed locks coordinate shared resources across machines but can introduce difficult failure boundaries. Exactly-once processing is often an end-to-end effect built using transactions, idempotency, and deduplication, not a network that never retransmits.

### 先看一个例子

例子：五个投票节点的多数为 3。某条日志只有两个节点确认时，不能仅因其中一个是 leader 就当作已提交。协议还需处理任期与日志规则；多数算术本身并不是一份完整的共识实现。

### 理解练习

用自己的话解释：上面的情景为什么是“Consensus”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Consensus protocols let nodes agree on particular state updates; Raft is one common algorithm. Leader election decides who coordinates certain operations. Distributed locks coordinate shared resources across machines but can introduce difficult failure boundaries. Exactly-once processing is often an end-to-end effect built using transactions, idempotency, and deduplication, not a network that never retransmits.

情景依据：例子：五个投票节点的多数为 3。某条日志只有两个节点确认时，不能仅因其中一个是 leader 就当作已提交。协议还需处理任期与日志规则；多数算术本身并不是一份完整的共识实现。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Consensus protocols let nodes agree on particular state updates; Raft is one common algorithm. Leader election decides who coordinates certain operations. Distributed locks coordinate shared resources across machines but can introduce difficult failure boundaries. Exactly-once processing is often an end-to-end effect built using transactions, idempotency, and deduplication, not a network that never retransmits.


### 例子

例子：五个投票节点的多数为 3。某条日志只有两个节点确认时，不能仅因其中一个是 leader 就当作已提交。协议还需处理任期与日志规则；多数算术本身并不是一份完整的共识实现。


### 适用边界与常见误解

Copying data alone does not guarantee agreement under arbitrary failures.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
