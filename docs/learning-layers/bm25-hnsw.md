# BM25 / HNSW · 文本与向量检索的索引应用

概念编号：`concept:bm25-hnsw` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bm25-hnsw/)

## 第一层：概念入门 · 知其然

### 它是什么

BM25 是按词项统计给文档打分的检索方法，通常由倒排索引找候选；HNSW 是组织近似最近邻搜索的分层图索引，可用于向量检索。一个定义打分口径，一个组织搜索过程，不能因为都用于检索就视为同一种算法。

### 先看一个例子

检索产品编号 ZX-17 时，词项精确匹配往往很有用；检索“忘记密码怎么办”与“账户登录恢复”时，可另外利用向量相似性召回。无论采用哪种索引，最终都应在同一已标注查询集上比较召回与延迟，再决定是否合并候选，不能只凭方法名称判断优劣。

### 理解练习

用自己的话解释：上面的情景为什么是“BM25 / HNSW · 文本与向量检索的索引应用”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：BM25 是按词项统计给文档打分的检索方法，通常由倒排索引找候选；HNSW 是组织近似最近邻搜索的分层图索引，可用于向量检索。一个定义打分口径，一个组织搜索过程，不能因为都用于检索就视为同一种算法。

情景依据：检索产品编号 ZX-17 时，词项精确匹配往往很有用；检索“忘记密码怎么办”与“账户登录恢复”时，可另外利用向量相似性召回。无论采用哪种索引，最终都应在同一已标注查询集上比较召回与延迟，再决定是否合并候选，不能只凭方法名称判断优劣。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数、公式与边界

BM25 的一类常见写法对查询词累加 \(\operatorname{IDF}(w)f_w(k_1+1)/(f_w+k_1(1-b+b|D|/\operatorname{avgdl}))\)，f_w 为文档内词频，|D| 为文档长度，k₁ 控制词频饱和，b 控制长度调整；IDF 版本须固定。HNSW 另需规定距离、图连接数和搜索宽度，扩大搜索通常增加成本，不能保证每次返回精确最近邻。


### 适用边界与常见误解

An index cannot compensate for an unsuitable vector representation.

### 例题：RRF: Fuse Ranks Instead of Adding Raw Scores

Keyword retrieval ranks A,B,C; vector retrieval ranks C,B,D. A document contributes 1/(k+rank) from each list, with ranks starting at 1.

1. At k=60, A receives 1/61 and D receives 1/63. B receives 2/62.
2. C receives 1/63+1/61≈0.032266, slightly above B≈0.032258.
3. Merge all documents that appear and sort by the fused score. A document absent from a list contributes 0 from that list.

结果：The final order is C,B,A,D. Rank fusion avoids directly adding BM25 raw scores and similarity scores on different scales.

易错点：RRF scores are not probabilities. Deduplicate each retrieval list first. The parameter k is not the number of results returned.

变式：What happens if only one retrieval list remains?

参考答案：The fused order matches that list, because 1/(k+rank) decreases as rank increases.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
