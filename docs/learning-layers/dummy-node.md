# Dummy Node

概念编号：`concept:dummy-node` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dummy-node/)

## 第一层：概念入门 · 知其然

### 定义

哑节点是在链表操作中额外放置、不代表业务数据的辅助节点。链表节点保存值及指向下一节点的链接；若在真实首节点前放一个哑节点，所有真实节点都拥有可用于修改链接的前驱。删除首节点就能与删除中间节点采用相同的“让前驱跳过目标”规则，函数最终返回哑节点之后的真实链表。

### 概念边界与常见混淆

哑节点不是空指针，也不是新增加的真实数据。遍历与返回边界要排除它；若删除后没有真实节点，结果是空链表，而不是只含哑节点的业务链表。

### 先看一个例子

真实链表为 4→7→9，在前面放 D，得到 D→4→7→9。删除值 4 的首节点时，把 D 的下一链接改为 7，得到 D→7→9，真实结果是 7→9。删除值 7 时则修改它的真实前驱链接；哑节点的具体数值不参与筛选。

### 理解练习

#### 1. 返回边界

删除首项后直接返回 D 本身，会发生什么？

<details><summary>答案与解释</summary>

调用者会看到本不应出现的辅助节点。应返回 D 的下一链接，指向真实首节点或空。

</details>

#### 2. 连续删除

4→4→7 删除所有 4，前驱跳过第一个 4 后应立刻前移吗？

<details><summary>答案与解释</summary>

不应自动前移，应检查新的下一节点是否也要删，否则可能漏掉第二个 4。只有保留当前节点时才相应推进前驱。

</details>

#### 3. 空链表

原来为空，也能在前面放哑节点并统一处理吗？

<details><summary>答案与解释</summary>

可以，D 的下一链接为空。循环不进入，最后返回空；这样也避免把空表当作特殊业务节点。

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
