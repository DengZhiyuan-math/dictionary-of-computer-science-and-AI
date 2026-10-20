# Optimistic Concurrency / Conditional Writes

概念编号：`concept:optimistic-concurrency` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/optimistic-concurrency/)

## 第一层：概念入门 · 知其然

### 旧读结果与并发修改

两个请求可能先后读到同一个旧状态，然后分别提交修改。如果提交只是用新值覆盖旧值，较晚写入者就可能抹掉较早者的修改。这里的冲突是多个操作对同一状态作了不相容的假设，不是指程序一定同时执行到同一行代码。


### 定义

乐观并发控制允许操作先基于读到的状态准备修改，在提交时验证所依赖的版本或条件仍成立。验证与接受修改必须形成不可被其他写入插入的原子步骤；冲突时拒绝这次提交，再由调用方重新读取和决定。

### 理解定义中的术语与关系

#### 版本号怎样防止无声覆盖

版本号标识记录的某次状态。读到版本七，就提交“仅当当前仍是版本七才修改”的要求。第一个成功修改会推进版本，使其他基于七的修改失败。关键检查在负责保存状态的一端完成；只在客户端先比较，无法阻止比较之后发生的另一笔写入。

### 概念边界与常见混淆

版本检查不能自动合并用户意图，也不保证冲突下永远不重试。若一个业务操作涉及多条记录的不变量，需要相应的事务或协议，而非假定单条记录的条件写已经覆盖全部状态。

### 先看一个例子

库存五、版本七。甲乙都读取这个状态，各要买四件。甲原子检查版本七且库存足够，扣后库存一、版本八。乙仍提交版本七，必须失败；重新读后也只能看到一件，不能继续照旧购买四件。这样保留了并发操作对旧读结果的依赖。

### 理解练习

#### 1. 检查与写入必须连在一起

服务端先检查版本，暂停后再无条件写入，是否已实现可靠的版本保护？

<details><summary>答案与解释</summary>

没有。暂停期间另一个请求可能完成修改，后续无条件写入仍会覆盖它。检查成功和接受修改必须在同一个原子边界内。

</details>

#### 2. 冲突之后怎样重试

乙发现版本冲突，只把版本改成八，仍提交原先算出的库存一，安全吗？

<details><summary>答案与解释</summary>

不安全。新版本不是授权旧计算；必须读取新状态并重新判断购买是否可行。否则会把四件购买意图与错误的库存更新组合在一起。

</details>

#### 3. 乐观不等于没有协调

准备阶段不加长时间锁，是否意味着提交时也不需要任何协调？

<details><summary>答案与解释</summary>

不是。乐观方法把冲突检测集中在提交验证，仍需状态拥有者提供原子条件操作。它改变协调时机，不是取消共享状态约束。

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
