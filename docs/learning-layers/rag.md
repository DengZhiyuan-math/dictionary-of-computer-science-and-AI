# RAG — Retrieval-Augmented Generation

概念编号：`concept:rag` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/rag/)

## 第一层：概念入门 · 知其然

### 它是什么

RAG, retrieval-augmented generation, retrieves relevant information from external documents or knowledge bases before answering, and supplies it to an LLM. It addresses stale parameter knowledge, private organizational knowledge absent from training, and answers that require clear evidence. RAG can reduce some knowledge hallucinations but cannot guarantee every answer is correct.

### 先看一个例子

Keyword retrieval ranks A,B,C; vector retrieval ranks C,B,D. A document contributes 1/(k+rank) from each list, with ranks starting at 1.
The final order is C,B,A,D. Rank fusion avoids directly adding BM25 raw scores and similarity scores on different scales.

### 理解练习

What happens if only one retrieval list remains?

<details><summary>答案与解释</summary>

The fused order matches that list, because 1/(k+rank) decreases as rank increases.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
