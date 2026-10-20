# RAG — Retrieval-Augmented Generation

概念编号：`concept:rag` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/rag/)

## 第一层：概念入门 · 知其然

### 定义

检索增强生成先从外部资料中检索与问题相关的内容，再把它和问题一起提供给生成模型。检索负责选择证据，生成负责组织回答；资料可在不重新训练模型的情况下更新。系统还要决定怎样切分资料、是否保留出处、检索多少内容以及遇到证据不足怎样处理。

### 概念边界与常见混淆

检索到资料不等于证据正确，也不保证回答忠实。未命中相关段落时，模型流畅作答仍可能错误；来源中的指令也应当作资料而非系统授权。

### 先看一个例子

回答公司的报销上限，系统检索到2025与2026两份制度，应按问题日期、适用部门与生效时间筛选，再引用相应条款。只把旧文档与新文档都塞给模型，不能保证它自动正确解决冲突。

### 理解练习

#### 1. 更新

制度更新后是否一定要重新训练语言模型才能回答？

<details><summary>答案与解释</summary>

不一定，可更新检索资料及索引；仍需核对新版本被命中和正确使用。

</details>

#### 2. 证据

答案带引用，就保证引用支持结论吗？

<details><summary>答案与解释</summary>

不保证，应核对引用段落是否包含该事实及适用条件。

</details>

#### 3. 缺失

检索没找到上限，直接猜一个常见金额合适吗？

<details><summary>答案与解释</summary>

不合适，应说明不足、扩大检索或请求信息，不能把猜测伪装成制度。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 查询先编码检索候选，再重排和裁剪上下文，最后生成带依据的回答。
2. 错误可来自检索漏召回或生成不忠实，需分别评估。

### 具体输入与计算步骤

知识库查到政策段落写明“退款期限7天”。

1. 标注10题，其中8题检到正确依据，检索召回8/10=0.8。
2. 其中6题最终答对，整体正确率6/10=0.6，不能用0.8冒充答案正确率。

计算结果：其中6题最终答对，整体正确率6/10=0.6，不能用0.8冒充答案正确率。

### 换到实际问题中应用

回答公司内部报销规则。

1. 检索仅用户可访问的当前版本，保留段落来源与生效日期。
2. 上下文写明7天就引用该条；冲突或无依据时说明资料不足。

应用结论：上下文写明7天就引用该条；冲突或无依据时说明资料不足。

### 举一反三：改变条件后的完整解答

若旧版写7天、新版写14天，都检到怎么办？

<details><summary>变式的推演与答案</summary>

1. 先核查适用范围与生效时间，不能简单投票。
2. 适用新版时回答14天并引用新版；无法判定时明确冲突。

适用新版时回答14天并引用新版；无法判定时明确冲突。

</details>

### 原有解释与进一步例题


### 原理与推演

RAG, retrieval-augmented generation, retrieves relevant information from external documents or knowledge bases before answering, and supplies it to an LLM. It addresses stale parameter knowledge, private organizational knowledge absent from training, and answers that require clear evidence. RAG can reduce some knowledge hallucinations but cannot guarantee every answer is correct.

Keep three roles distinct. An LLM supplies language and reasoning capabilities. RAG supplies external knowledge. An agent system uses models, tools and workflows to perform tasks. These can work together, but describe different parts of a system.


### 适用边界与常见误解

Retrieval does not guarantee a correct answer or sufficient evidence.

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

- [一手资料](https://arxiv.org/abs/2005.11401)

[返回分层目录](00-learning-index.md)
