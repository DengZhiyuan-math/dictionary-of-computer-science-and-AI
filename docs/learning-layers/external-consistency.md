# External Consistency

概念编号：`concept:external-consistency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/external-consistency/)

## 第一层：概念入门 · 知其然

### 它是什么

Serializability requires equivalence to a serial transaction order. External consistency adds the order that clients can observe between non-overlapping transactions.

### 先看一个例子

例子：客户端已收到事务 T1 提交成功，随后才发起 T2，则外部一致的序列必须把 T1 放在 T2 前。两事务若实际重叠，未必有由客户端先后强制的顺序；不能把“可串行化”自动解释成遵守所有墙钟印象。

### 理解练习

用自己的话解释：上面的情景为什么是“External Consistency”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Serializability requires equivalence to a serial transaction order. External consistency adds the order that clients can observe between non-overlapping transactions.

情景依据：例子：客户端已收到事务 T1 提交成功，随后才发起 T2，则外部一致的序列必须把 T1 放在 T2 前。两事务若实际重叠，未必有由客户端先后强制的顺序；不能把“可串行化”自动解释成遵守所有墙钟印象。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

If T1 commits before T2 begins, a consistent snapshot cannot include T2's effects while omitting T1's. Strong reads started after both commits must reflect both; an explicitly historical snapshot can precede them.


### 适用边界与常见误解

Two independent reads are not automatically one snapshot. Clock timestamps alone do not establish a transaction consistency guarantee.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
