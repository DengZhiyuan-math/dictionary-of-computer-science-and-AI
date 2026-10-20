# Disjoint-set Union

概念编号：`concept:disjoint-set-union` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/disjoint-set-union/)

## 第一层：概念入门 · 知其然

### 它是什么

并查集维护互不相交的集合，支持查询代表和合并；适合连通性，不直接维护完整路径。

### 先看一个例子

朋友圈合并后，判断两人是否属于同一个大群，不必列出所有好友链。

### 理解练习

同朋友圈必须知道两人间具体好友链吗？

<details><summary>答案与解释</summary>

不必；代表相同即可判断同集合，但无法由此恢复完整路径。

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
