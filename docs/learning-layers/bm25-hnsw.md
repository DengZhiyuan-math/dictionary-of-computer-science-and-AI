# BM25 / HNSW · 文本与向量检索的索引应用

概念编号：`concept:bm25-hnsw` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/bm25-hnsw/)

## 第一层：概念入门 · 知其然

### 定义

BM25 与 HNSW 服务于不同的检索环节。BM25 根据查询词在文档中的出现情况、词的稀有程度和文档长度计算相关分数，属于词项匹配。HNSW 是对向量建立分层邻居图的近似检索索引：从较粗层快速接近目标，再在细层搜索较近向量。向量本身由其他方法产生；HNSW 不负责理解文字或训练这些表示。

### 概念边界与常见混淆

BM25 分数不是统一校准的相关概率；不同查询的数值不能随意比较。HNSW 的近似性与语义模型的错误是不同来源，向量近并不证明事实正确或词义完全相同。

### 先看一个例子

查询“心肌梗死”，文档甲重复这一术语，文档乙使用“心脏病发作”。词项检索容易命中甲；训练良好的语义向量可能让乙也靠近查询。若用 HNSW 查这些向量，它减少逐一比较的工作，但可能漏掉精确距离最近的项目。两类结果可以合并后重新排序，称为混合检索的一种做法。

### 理解练习

#### 1. 职责区别

只换 HNSW 参数，不更换向量模型，就能保证学会所有同义词吗？

<details><summary>答案与解释</summary>

不能。索引改善的是对既有向量的查找，语义关系主要来自表示模型与训练数据。

</details>

#### 2. 近似含义

HNSW 返回第一名就必然是精确距离第一名吗？

<details><summary>答案与解释</summary>

不必，它用少搜索换速度，可能漏掉更近项。可用精确检索结果作参照评价召回与速度权衡。

</details>

#### 3. 混合动机

文档编号“AB-173”必须精确匹配，是否仅靠语义近邻就足够？

<details><summary>答案与解释</summary>

不一定。相近编号可能向量很近却不满足精确条件，应保留词项或结构化约束，再决定如何合并结果。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. BM25用逆文档频率提高稀有词权重，并对词频增长与文档长度做修正。
2. HNSW先在稀疏高层靠近查询，再到低层扩大候选，避免逐个比较所有向量。

### 具体输入与计算步骤

查询“红苹果”，一篇含这两个词的短文通常得到较强词匹配。

1. 设k₁=1、b=0、词频2、IDF=1，则单词贡献2×(1+1)/(2+1)=4/3。
2. 词频从2变4时贡献8/5=1.6，小于原分数的2倍，体现词频饱和。

计算结果：词频从2变4时贡献8/5=1.6，小于原分数的2倍，体现词频饱和。

### 换到实际问题中应用

知识库既要找到错误码原文，也要理解同义提问。

1. 并行做BM25关键词检索与HNSW语义检索，合并候选后统一重排。
2. 用带答案的查询测召回率和延迟，避免直接相加量纲不同的原始分数。

应用结论：用带答案的查询测召回率和延迟，避免直接相加量纲不同的原始分数。

### 举一反三：改变条件后的完整解答

若增大HNSW搜索候选数，通常怎样变化？

<details><summary>变式的推演与答案</summary>

1. 访问更多邻居会增加距离计算与耗时。
2. 近邻召回通常提高，但仍需实测；并非候选越大就一定适合延迟预算。

近邻召回通常提高，但仍需实测；并非候选越大就一定适合延迟预算。

</details>

### 原有解释与进一步例题


### 定义与应用范围

BM25 是按词项统计给文档打分的检索方法，通常由倒排索引找候选；HNSW 是组织近似最近邻搜索的分层图索引，可用于向量检索。一个定义打分口径，一个组织搜索过程，不能因为都用于检索就视为同一种算法。


### 参数、公式与边界

BM25 的一类常见写法对查询词累加 \(\operatorname{IDF}(w)f_w(k_1+1)/(f_w+k_1(1-b+b|D|/\operatorname{avgdl}))\)，f_w 为文档内词频，|D| 为文档长度，k₁ 控制词频饱和，b 控制长度调整；IDF 版本须固定。HNSW 另需规定距离、图连接数和搜索宽度，扩大搜索通常增加成本，不能保证每次返回精确最近邻。


### 例子

检索产品编号 ZX-17 时，词项精确匹配往往很有用；检索“忘记密码怎么办”与“账户登录恢复”时，可另外利用向量相似性召回。无论采用哪种索引，最终都应在同一已标注查询集上比较召回与延迟，再决定是否合并候选，不能只凭方法名称判断优劣。


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

### 推导与方法参考

- [一手资料](https://nlp.stanford.edu/IR-book/html/htmledition/okapi-bm25-a-non-binary-model-1.html)
- [一手资料](https://arxiv.org/abs/1603.09320)

[返回分层目录](00-learning-index.md)
