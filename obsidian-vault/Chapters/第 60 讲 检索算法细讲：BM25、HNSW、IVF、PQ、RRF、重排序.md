---
title: "第 60 讲 · 检索算法细讲：BM25、HNSW、IVF、PQ、RRF、重排序"
aliases: []
tags: ["chapter","area/retrieval-agents"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/检索、RAG 与 Agent|检索、RAG 与 Agent]]

## 本讲概念

- [[Concepts/词项检索评分／近似近邻图索引|词项检索评分／近似近邻图索引]]

<a id="chapter-60"></a>

## 第 60 讲｜检索算法细讲：BM25、HNSW、IVF、PQ、RRF、重排序

领域：LLM 与智能体 · 细讲

<a id="chapter-60-section-01"></a>

### Inverted Index、TF-IDF、BM25【重点】

倒排索引从词指向包含该词的文档，避免搜索时逐篇扫描。TF-IDF 同时考虑词在文档中有多突出，以及它在整个文档集合中是否罕见。BM25 进一步用词频饱和与文档长度调整等设计评分。罕见产品编号和精确术语常适合关键词检索；改写很多、字面不同的表达则可能需要语义表示。BM25 不是一种生成式语言模型。

<a id="chapter-60-section-02"></a>

### Dense Retrieval、Bi-Encoder、Cross-Encoder【重点】

稠密检索把查询和文档表示为向量。Bi-encoder 分别编码两边，文档向量可以提前计算。Cross-encoder 把查询和候选一起处理，判断相关性通常更精细，但无法对海量文档都昂贵地做一遍。因此先召回再重排是自然组合。Embedding 质量和近邻索引质量是两个问题：表示本身把无关对象放在一起，换更精确的索引也不能解决语义错误。

<a id="chapter-60-section-03"></a>

### Exact Search、ANN、HNSW【重点】

精确搜索检查候选以找到真正最近者。ANN 允许一定召回损失换速度。HNSW 建立多层近邻图，先在稀疏高层快速接近目标区域，再在低层细找。它常提供良好查询效果，但建索引和存图需要内存。搜索宽度与建图参数影响速度、召回和资源，不能只说用了向量数据库就天然准确。

<a id="chapter-60-section-04"></a>

### IVF、PQ、LSH【认识】

IVF 先把向量分成粗区域，查询时只搜索若干相关区域。PQ，乘积量化，把向量切成子块并用码本压缩，减少存储与距离计算成本。LSH 设计让相近对象更可能落到同一桶的哈希，减少候选。它们分别利用粗筛、压缩和随机碰撞，常可组合。ANN 的近似损失、量化误差与表示误差应分开理解。

<a id="chapter-60-section-05"></a>

### Hybrid Search、RRF、SPLADE、ColBERT【认识】

混合检索结合关键词与语义信号。RRF 根据各列表中的名次融合，不要求各模型原始分数天然在同一尺度。SPLADE 学习稀疏词项表示，结合词项检索结构与学习能力。ColBERT 用多向量和后期交互兼顾预计算与细粒度匹配。它们提供不同效率质量折中，并不是 RAG 必须一次装齐的组件。

<a id="chapter-60-section-06"></a>

### Chunking、Overlap、Metadata Filter【重点】

分块定义检索的最小内容单元，overlap 让相邻块共享一些边界文本。块太短可能丢上下文，太长可能稀释关键内容。元数据过滤限定时间、来源、权限等范围，权限最好在召回前或检索过程中正确执行，而不是先把敏感材料交给模型再让它别说。解析失败的表格或图片也不能靠更大的 embedding 自动修复。

<a id="chapter-60-section-07"></a>

### Query Rewrite、HyDE、Multi-Hop 与评价【重点】

查询改写把含糊请求变成更适合检索的表达。HyDE 先生成假设性文档，再用它帮助语义检索；生成文档不是证据。Multi-hop 依据第一轮结果继续检索，解决需要拼接多个来源的问题。评价要分别看召回是否找到证据、重排是否把它放前面、回答是否忠实引用。RAG 不是只看最终一句话听起来合理就算成功。

参考资料（不朗读）：[S010 · Manning, Raghavan, Schütze — Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/irbook.html)；[S008 · Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs](https://arxiv.org/abs/1603.09320)；[S126 · Faiss — Indexes and search](https://github.com/facebookresearch/faiss/wiki/Faiss-indexes)；[S127 · Cormack et al. — Reciprocal rank fusion](https://dl.acm.org/doi/10.1145/1571941.1572114)；[S128 · SPLADE: Sparse Lexical and Expansion Model for First Stage Ranking](https://arxiv.org/abs/2107.05720)；[S129 · ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction over BERT](https://arxiv.org/abs/2004.12832)；[S122 · Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks](https://arxiv.org/abs/2005.11401)
