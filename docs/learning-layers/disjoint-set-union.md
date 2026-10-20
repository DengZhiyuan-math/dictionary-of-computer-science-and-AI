# Disjoint-set Union

概念编号：`concept:disjoint-set-union` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/disjoint-set-union/)

## 第一层：概念入门 · 知其然

### 定义

并查集维护一个随合并变化的集合划分：每个对象恰好属于一个组，各组互不重叠。查询操作找到对象所在组的代表，合并操作把两个组变为一个组。常见实现用树形的父指针记录组关系；代表只是当前组的标识，并不必然是最小元素或某个业务负责人。

### 概念边界与常见混淆

基本并查集适合只增加合并的连通性维护，不直接支持删除一条连接后自动拆组，也不能从同组推出两个对象直接相连。

### 先看一个例子

初始四人 A、B、C、D 各一组。合并 A 与 B 后为 {A,B}；合并 C 与 D 后为 {C,D}；再合并 B 与 C，则四人同组。因此 A 与 D 属于同组，虽然没有直接执行过“合并 A 与 D”。它记录传递的分组关系，不保存一条具体的 A 到 D 的连接路线。

### 理解练习

#### 1. 传递关系

只合并 A–B 与 B–C，查询 A 和 C 是否同组？

<details><summary>答案与解释</summary>

是。第二次合并的是整个组，不只是修改 B 与 C 这一对；但同组不意味着原图存在直接 A–C 边。

</details>

#### 2. 重复合并

A、B 已在同组，再合并一次会增加组数还是减少组数？

<details><summary>答案与解释</summary>

都不会。查询到代表相同即可保持原划分，避免把一次冗余连接误认为一次新合并。

</details>

#### 3. 删除边界

删除 B–C 后，基本并查集能否只改一个代表就知道哪些人还连通？

<details><summary>答案与解释</summary>

不能一般地做到。可能还有其他连接跨过两个部分，而结构未保存完整边关系；需要重建或使用支持动态连通性的额外方法。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 每个元素指向父节点，根代表集合。
2. 按大小合并避免高树，路径压缩把查询路径指向根，摊还复杂度接近常数。

### 具体输入与计算步骤

4个元素初始独立，执行union(0,1)、union(2,3)、union(1,2)。

1. 集合数4→3→2→1。
2. 最后find(0)=find(3)，连通分量大小4。

计算结果：根编号可能依实现变化，不应当永久业务ID。

### 换到实际问题中应用

检查无向图加边是否成环。

1. 加边(u,v)前查是否同根。
2. 若同根，新边形成环；否则合并。

应用结论：可用于Kruskal选不成环的边。

### 举一反三：改变条件后的完整解答

需要删除一条好友边，并查集能直接拆群吗？

<details><summary>变式的推演与答案</summary>

1. 父树不保留原图全部边结构。
2. 删除连接关系无法仅从根信息恢复分裂结果。

需离线回滚或更强动态连通结构。

</details>

### 原有解释与进一步例题


### 原理与推演

Disjoint-set union (DSU) maintains disjoint sets. find returns a set representative, and union merges two sets. Two nodes are connected exactly when their representatives match. Representatives may change after unions, so do not treat a root’s label as a permanent application ID.

Ordinary disjoint-set union is good at online queries that only add connections, and cannot directly reverse a union to process arbitrary deletions. Offline dynamic connectivity, rollback structures, etc. require additional design; when rolling back, it is usually avoided to directly use path compression that is difficult to recover.


### 适用边界与常见误解

Ordinary DSU mainly handles added connections. Path compression changes tree shape without changing set membership.

### 例题：Union-Find: Repeated Connections Do Not Reduce Set Count

Six nodes 0…5 receive undirected connections (0,1), (2,3), (1,2), (0,3), (4,5), in that order.

1. Start with 6 sets. The first two connections each merge a pair, leaving 4 sets.
2. After merging (1,2), nodes 0,1,2,3 share one set. The count becomes 3.
3. For (0,3), both roots already match, so no merge occurs. Finally (4,5) reduces the count to 2.

结果：The final partition is {0,1,2,3} and {4,5}. Representatives depend on the union strategy, but membership does not.

易错点：Do not subtract one for every edge. Repeated edges or edges closing a cycle may cause no new union.

变式：Remove (1,2) but still add (0,3). How many final sets remain?

参考答案：Still 2. Connection (0,3) merges the previously separate {0,1} and {2,3}.

### 推导与方法参考

- [一手资料](https://atcoder.github.io/ac-library/production/document_en/dsu.html)

[返回分层目录](00-learning-index.md)
