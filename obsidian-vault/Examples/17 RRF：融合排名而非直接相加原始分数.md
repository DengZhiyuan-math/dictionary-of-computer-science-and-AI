---
title: "RRF：融合排名而非直接相加原始分数"
aliases: []
tags: ["example","area/retrieval-agents"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/检索、RAG 与 Agent|检索、RAG 与 Agent]]

### 17 · RRF：融合排名而非直接相加原始分数

**场景与输入：** 关键词检索排名 A、B、C；向量检索排名 C、B、D。每个文档在一个列表中贡献 1/(k+rank)，rank 从 1 开始。

1. 取 k=60，A 得 1/61，D 得 1/63；B 得 2/62。
2. C 得 1/63+1/61，约 0.032266；B 约 0.032258，因此 C 略高于 B。
3. 合并所有出现过的文档后排序；没有出现在某列表的文档，在该列表贡献为 0。

**结果：** 结果为 C、B、A、D。它融合的是排名信息，避免把尺度不同的 BM25 原始分数与相似度直接相加。

**易错点与边界：** RRF 分数不是概率；重复文档应先在每个检索列表中去重。k 的作用不能等同于返回条数。

**改变条件再想一想：** 只保留一个检索列表会怎样？

<details>
<summary>查看参考答案</summary>

融合排序保持该列表的排名顺序，因为 1/(k+rank) 随 rank 变大而减小。

</details>

[打开交互演示](../Demos/交互演示.html#rrf)

## 关联概念与章节

- [[Concepts/词项检索评分／近似近邻图索引|词项检索评分／近似近邻图索引]]
- [[Concepts/检索增强生成|检索增强生成]]
- [[Chapters/第 60 讲 检索算法细讲：BM25、HNSW、IVF、PQ、RRF、重排序|第 60 讲]]
- [[Chapters/第 59 讲 RAG、搜索、Agent 与工具调用|第 59 讲]]
