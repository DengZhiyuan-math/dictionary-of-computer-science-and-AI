# Cryptographic Hashes / Streaming Digests

概念编号：`concept:cryptographic-hash` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cryptographic-hash/)

## 第一层：概念入门 · 知其然

### 它是什么

Dropbox content_hash first hashes each 4,194,304-byte block with SHA-256, then hashes the concatenation of the raw 32-byte block digests. Only the final digest is encoded as hexadecimal. Transport chunk boundaries do not change the fixed block boundaries.

### 先看一个例子

例子：文件分成两个块，各自 SHA-256 得到 32 字节摘要 A、B。组合散列应对 64 个原始摘要字节求哈希；把 A、B 各转成 64 字符十六进制后再拼接，会变成另一组输入，不能得到同一个分块内容散列。

### 理解练习

用自己的话解释：上面的情景为什么是“Cryptographic Hashes / Streaming Digests”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Dropbox content_hash first hashes each 4,194,304-byte block with SHA-256, then hashes the concatenation of the raw 32-byte block digests. Only the final digest is encoded as hexadecimal. Transport chunk boundaries do not change the fixed block boundaries.

情景依据：例子：文件分成两个块，各自 SHA-256 得到 32 字节摘要 A、B。组合散列应对 64 个原始摘要字节求哈希；把 A、B 各转成 64 字符十六进制后再拼接，会变成另一组输入，不能得到同一个分块内容散列。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Keep one inner hash context, one outer context, and a block-byte counter. Finalize every full block and any remaining nonempty block. An empty file contributes no inner block; an exact block multiple must not append an empty block.


### 适用边界与常见误解

Dropbox content_hash differs from SHA-256 applied directly to the file. Hash-table indexing, content identification, and authentication have different requirements. Digest equality is subject to collision assumptions and does not by itself authenticate a sender.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
