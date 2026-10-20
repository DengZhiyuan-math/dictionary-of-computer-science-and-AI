# Consensus

概念编号：`concept:consensus` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/consensus/)

## 第一层：概念入门 · 知其然

### 它是什么

共识协议让多个副本在明确故障假设下，对命令顺序或状态推进达成一致。

### 先看一个例子

Raft集群5节点，采用多数派提交，假定节点只崩溃不作恶。

### 理解练习

复制到任意两个节点就够提交吗？

<details><summary>答案与解释</summary>

不够，5节点多数派至少3个，还要满足协议的任期与日志规则。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 任意两个多数派必有交集，为新旧领导的信息衔接提供基础。
2. Raft还用任期、投票限制和日志检查维护安全，仅多数派数字不是完整证明。

### 具体输入与计算步骤

Raft集群5节点，采用多数派提交，假定节点只崩溃不作恶。

1. 多数门槛floor(5/2)+1=3。
2. 失去2节点仍剩3，可在其能通信且满足协议条件时推进；再失1则只剩2无法提交。

计算结果：失去2节点仍剩3，可在其能通信且满足协议条件时推进；再失1则只剩2无法提交。

### 换到实际问题中应用

为配置服务保证更新顺序。

1. 通过共识日志提交配置变更，再按顺序应用到确定性状态机。
2. 故障演练网络分区，确认少数派不能对外宣称写入成功。

应用结论：故障演练网络分区，确认少数派不能对外宣称写入成功。

### 举一反三：改变条件后的完整解答

5节点分成3和2两组，两边都能写吗？

<details><summary>变式的推演与答案</summary>

1. 只有3节点组可能取得多数派。
2. 2节点组应停止成功提交，牺牲可用性以防冲突状态；多数派侧仍须完成领导与日志条件。

2节点组应停止成功提交，牺牲可用性以防冲突状态；多数派侧仍须完成领导与日志条件。

</details>

### 原有解释与进一步例题


### 原理与推演

Consensus protocols let nodes agree on particular state updates; Raft is one common algorithm. Leader election decides who coordinates certain operations. Distributed locks coordinate shared resources across machines but can introduce difficult failure boundaries. Exactly-once processing is often an end-to-end effect built using transactions, idempotency, and deduplication, not a network that never retransmits.


### 例子

例子：五个投票节点的多数为 3。某条日志只有两个节点确认时，不能仅因其中一个是 leader 就当作已提交。协议还需处理任期与日志规则；多数算术本身并不是一份完整的共识实现。


### 适用边界与常见误解

Copying data alone does not guarantee agreement under arbitrary failures.

### 推导与方法参考

- [一手资料](https://raft.github.io/raft.pdf)

[返回分层目录](00-learning-index.md)
