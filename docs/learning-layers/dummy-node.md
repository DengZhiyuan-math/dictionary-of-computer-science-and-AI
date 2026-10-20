# Dummy Node

概念编号：`concept:dummy-node` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dummy-node/)

## 第一层：概念入门 · 知其然

### 它是什么

Linked list questions need to distinguish between node identity and node value. Two nodes with the same value do not mean that the linked lists intersect. The sentinel or dummy node is placed before the real head, so that operations such as deleting the head node and inserting the head can also be written as "modify the next of the predecessor". When deleting the nth node from the last, the fast and slow pointers maintain a fixed distance, so that the slow pointer finally falls on the predecessor of the node to be deleted. The bounds should be derived from loop invariants, not just by reciting how many times the fast pointer has been moved.

### 先看一个例子

例子：从链表 1→2 中删除头节点 1。添加哨兵 D→1→2 后，把 D.next 改为 2，最后返回 D.next。这样删除头与删除中间节点都可通过“前驱的 next”处理；哨兵是额外节点，不是具有特殊数值的业务节点。

### 理解练习

用自己的话解释：上面的情景为什么是“Dummy Node”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Linked list questions need to distinguish between node identity and node value. Two nodes with the same value do not mean that the linked lists intersect. The sentinel or dummy node is placed before the real head, so that operations such as deleting the head node and inserting the head can also be written as "modify the next of the predecessor". When deleting the nth node from the last, the fast and slow pointers maintain a fixed distance, so that the slow pointer finally falls on the predecessor of the node to be deleted. The bounds should be derived from loop invariants, not just by reciting how many times the fast pointer has been moved.

情景依据：例子：从链表 1→2 中删除头节点 1。添加哨兵 D→1→2 后，把 D.next 改为 2，最后返回 D.next。这样删除头与删除中间节点都可通过“前驱的 next”处理；哨兵是额外节点，不是具有特殊数值的业务节点。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Linked list questions need to distinguish between node identity and node value. Two nodes with the same value do not mean that the linked lists intersect. The sentinel or dummy node is placed before the real head, so that operations such as deleting the head node and inserting the head can also be written as "modify the next of the predecessor". When deleting the nth node from the last, the fast and slow pointers maintain a fixed distance, so that the slow pointer finally falls on the predecessor of the node to be deleted. The bounds should be derived from loop invariants, not just by reciting how many times the fast pointer has been moved.


### 例子

例子：从链表 1→2 中删除头节点 1。添加哨兵 D→1→2 后，把 D.next 改为 2，最后返回 D.next。这样删除头与删除中间节点都可通过“前驱的 next”处理；哨兵是额外节点，不是具有特殊数值的业务节点。


### 适用边界与常见误解

Return the actual head node; do not use sentinel values as input data.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
