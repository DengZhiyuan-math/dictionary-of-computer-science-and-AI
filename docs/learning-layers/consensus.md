# Consensus

概念编号：`concept:consensus` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/consensus/)

## 第一层：概念入门 · 知其然

### 定义

分布式共识让多个节点在规定故障和通信假设下，对某个值或操作顺序达成一致。协议通常需要保证不决定冲突结果的安全性，以及满足条件时最终作出决定的活性。节点失效、消息延迟与恶意行为是不同模型，不能只说“多数同意”就保证全部性质。

### 概念边界与常见混淆

可用性与一致决策在通信故障时有取舍。崩溃容错协议不能直接当作能处理任意作恶；具体副本数量和仲裁条件必须对应故障模型。

### 先看一个例子

三个副本用多数提交一条操作，任意两个多数集合都会相交，这使记录延续成为可能；但新领导如何继承已提交记录仍需协议规则。网络分割为两台与一台时，小分组通常不能继续独立提交，否则两边可能产生冲突历史。

### 理解练习

#### 1. 安全与活性

停止提交但没有冲突，就说明协议全部目标完成吗？

<details><summary>答案与解释</summary>

只说明未观察到安全冲突，活性可能未满足，需分别评价。

</details>

#### 2. 分割

单台与双台两边都独立提交一定安全吗？

<details><summary>答案与解释</summary>

不保证，可能给同一位置决定不同操作；需遵守仲裁规则。

</details>

#### 3. 故障模型

能处理节点关机就必能处理伪造消息吗？

<details><summary>答案与解释</summary>

不是，恶意行为超出单纯崩溃模型，需额外协议和假设。

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
