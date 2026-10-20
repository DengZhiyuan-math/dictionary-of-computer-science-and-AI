# Dummy Node

概念编号：`concept:dummy-node` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dummy-node/)

## 第一层：概念入门 · 知其然

### 它是什么

哑节点是临时表头，让删除首节点与删除中间节点使用相同规则。

### 先看一个例子

链表1→2→3，删除值1。

### 理解练习

结果应返回dummy吗？

<details><summary>答案与解释</summary>

不，应返回dummy.next，即新的真实表头。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 令dummy.next=head，所有待删节点都拥有前驱。
2. 删除统一写作prev.next=prev.next.next，不再单独改原head。

### 具体输入与计算步骤

链表1→2→3，删除值1。

1. 初始dummy→1→2→3，prev=dummy。
2. 令dummy.next=2，返回2→3，共改一次链接。

计算结果：令dummy.next=2，返回2→3，共改一次链接。

### 换到实际问题中应用

合并两个有序链表。

1. 尾指针从dummy开始，逐个接入较小节点并推进。
2. 接上剩余链后返回dummy.next，空输入也适用。

应用结论：接上剩余链后返回dummy.next，空输入也适用。

### 举一反三：改变条件后的完整解答

单节点1被删除后应返回什么？

<details><summary>变式的推演与答案</summary>

1. dummy.next改为1.next，即空指针。
2. 返回空链表，不能返回已删的原head。

返回空链表，不能返回已删的原head。

</details>

### 原有解释与进一步例题


### 原理与推演

Linked list questions need to distinguish between node identity and node value. Two nodes with the same value do not mean that the linked lists intersect. The sentinel or dummy node is placed before the real head, so that operations such as deleting the head node and inserting the head can also be written as "modify the next of the predecessor". When deleting the nth node from the last, the fast and slow pointers maintain a fixed distance, so that the slow pointer finally falls on the predecessor of the node to be deleted. The bounds should be derived from loop invariants, not just by reciting how many times the fast pointer has been moved.


### 例子

例子：从链表 1→2 中删除头节点 1。添加哨兵 D→1→2 后，把 D.next 改为 2，最后返回 D.next。这样删除头与删除中间节点都可通过“前驱的 next”处理；哨兵是额外节点，不是具有特殊数值的业务节点。


### 适用边界与常见误解

Return the actual head node; do not use sentinel values as input data.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
