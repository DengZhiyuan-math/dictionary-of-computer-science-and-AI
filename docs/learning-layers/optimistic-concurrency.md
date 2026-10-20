# Optimistic Concurrency / Conditional Writes

概念编号：`concept:optimistic-concurrency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/optimistic-concurrency/)

## 第一层：概念入门 · 知其然

### 它是什么

乐观并发先读取再尝试更新，提交时原子检查版本或条件，冲突就拒绝而非覆盖别人。

### 先看一个例子

库存5、版本7，两位客户都读到版本7，各要买4件。

### 理解练习

只在客户端先检查库存够不够能防超卖吗？

<details><summary>答案与解释</summary>

不能，两人可能同时看到同一旧库存。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 写入条件必须在数据库原子验证，例如version=7且stock≥4。
2. 成功后扣库存并推进版本；失败者重新读、重新算，不直接重放旧替换值。

### 具体输入与计算步骤

库存5、版本7，两位客户都读到版本7，各要买4件。

1. 第一位条件成立，库存5−4=1，版本变8。
2. 第二位仍拿版本7，条件失败；重新读1也不够买4，应拒绝。

计算结果：第二位仍拿版本7，条件失败；重新读1也不够买4，应拒绝。

### 换到实际问题中应用

多人同时编辑用户资料。

1. 响应携带ETag或版本，修改提交If-Match并要求服务端原子检查。
2. 冲突后展示新值并合并意图，避免最后写入者无声覆盖。

应用结论：冲突后展示新值并合并意图，避免最后写入者无声覆盖。

### 举一反三：改变条件后的完整解答

第二位重读版本8后改买1件，结果呢？

<details><summary>变式的推演与答案</summary>

1. 版本8且库存1满足条件。
2. 扣为0、版本变9，这次是基于新状态重新决定，不是盲目重试。

扣为0、版本变9，这次是基于新状态重新决定，不是盲目重试。

</details>

### 原有解释与进一步例题


### 原理与推演

A version check such as If-Match rejects a stale replacement. After a conflict, reread the current state and recompute the intended change before retrying.

A state predicate can enforce a local invariant directly, such as stock >= requested quantity before subtracting stock in the same atomic operation.


### 例子

例子：两个客户端都读到余额版本 7，A 更新后版本变为 8，B 使用 If-Match:7 的覆盖请求应冲突。B 需读取最新状态并重新判断业务条件，而不是把旧值盲目重试到成功。


### 适用边界与常见误解

A separate read and write do not provide an atomic condition. Conditional mutation alone does not deduplicate repeated business requests or establish a multi-item transaction.

### 推导与方法参考

- [一手资料](https://learn.microsoft.com/en-us/azure/cosmos-db/database-transactions-optimistic-concurrency)

[返回分层目录](00-learning-index.md)
