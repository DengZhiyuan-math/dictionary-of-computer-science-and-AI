---
title: "Fenwick：查询与更新沿不同方向走"
aliases: []
tags: ["example","area/algorithms"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/数据结构与算法|数据结构与算法]]

### 35 · Fenwick：查询与更新沿不同方向走

**场景与输入：** 一基数组 a=[2,1,3,4,2]。tree 保存区间和，初始 tree[1…5]=[2,3,3,10,2]。

1. 查询前 5 项，先读 tree[5]=2，索引减 lowbit(5)=1 到 4，再读 tree[4]=10，得到 12。
2. 把位置 3 加 2，先让 tree[3] 从 3 到 5，再让 tree[4] 从 10 到 12；下一索引 8 超过 n，停止。
3. 更新后前 5 项为 14；位置 2…4 的和为 prefix(4)-prefix(1)=12-2=10。

**结果：** Fenwick 只更新包含该位置的二进制区间块；每条查询或更新路径至多 O(log n) 步。

**易错点与边界：** 下标 0 不适合作为这个一基更新接口的起点，因为 lowbit(0)=0。

**改变条件再想一想：** 位置 3 的增量改成 -2，前 5 项是多少？

<details>
<summary>查看参考答案</summary>

10。原总和 12 减 2，结构同样支持负增量。

</details>

[打开交互演示](../Demos/交互演示.html#fenwick)

## 关联概念与章节

- [[Concepts/树状数组|树状数组]]
- [[Chapters/第 100 讲 算法进阶 · 区间结构：差分、Fenwick 与线段树|第 100 讲]]
