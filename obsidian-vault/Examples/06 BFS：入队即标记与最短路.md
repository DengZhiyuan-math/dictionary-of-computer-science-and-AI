---
title: "BFS：入队即标记与最短路"
aliases: []
tags: ["example","area/hot100"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/Hot 100 算法实践|Hot 100 算法实践]]

### 06 · BFS：入队即标记与最短路

**场景与输入：** 有向等权图 A→B、A→C、B→D、C→D、D→E，F 是孤立节点。寻找从 A 出发的最少边数。

1. A 距离为 0，出队后将 B、C 标记并入队，距离均为 1。
2. B 出队时发现 D，记录距离 2、父节点 B；C 再遇到 D 时，因为 D 已标记而不重复入队。
3. D 发现 E，距离 3。最终队列为空，F 始终没有距离。沿 E→D→B→A 反转父指针得到路径。

**结果：** A 到 E 的一条最短路径是 A-B-D-E，长度 3；F 不可达。邻接表时间 O(V+E)，空间 O(V)。

**易错点与边界：** 结论依赖所有边代价相同；一般带权图不能只按层数比较。出队才标记会产生重复入队。

**改变条件再想一想：** 把 A→C 的代价改为 10，仍能用 BFS 保证最低代价吗？

<details>
<summary>查看参考答案</summary>

不能。BFS 最少边数与最小总代价是两个目标；非负权可考虑 Dijkstra。

</details>

[打开交互演示](../Demos/交互演示.html#bfs)

## 关联概念与章节

- [[Concepts/广度／深度优先搜索|广度／深度优先搜索]]
- [[Chapters/第 89 讲 Hot 100 · 图与前缀树：访问状态、传播层次与依赖关系|第 89 讲]]
