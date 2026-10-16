---
title: "Dijkstra：旧距离为什么还在队列里"
aliases: []
tags: ["example","area/algorithms"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/数据结构与算法|数据结构与算法]]

### 32 · Dijkstra：旧距离为什么还在队列里

**场景与输入：** 有向边 A→B=5、A→C=1、C→B=1、B→D=2、C→D=7；从 A 出发。

1. 处理 A 后，候选 B=5、C=1。先处理 C，把 B 改进为 2、D 改进为 8。
2. 处理新 B=2 后，D 改进为 4。队列里仍可能保留旧 B=5 和旧 D=8。
3. 随后取 D=4；弹出 B=5 时发现它不等于当前 dist[B]=2，跳过；D=8 同理。

**结果：** 距离 A=0、C=1、B=2、D=4，最短路线 A-C-B-D。

**易错点与边界：** 演示按小列表排序展示候选，不是高效堆实现；理论堆复杂度不适用于该展示容器。

**改变条件再想一想：** 允许 C→B=-4 时还能套同一个非负权证明吗？

<details>
<summary>查看参考答案</summary>

不能；负边可能让已经确认的距离再次下降，应根据约束改用其他方法。

</details>

[打开交互演示](../Demos/交互演示.html#dijkstra)

## 关联概念与章节

- [[Concepts/非负权最短路算法|非负权最短路算法]]
- [[Concepts/堆与优先队列|堆与优先队列]]
- [[Chapters/第 99 讲 算法进阶 · 有权最短路：松弛、优先队列与负环|第 99 讲]]
