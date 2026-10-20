# Cryptographic Hashes / Streaming Digests

概念编号：`concept:cryptographic-hash` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cryptographic-hash/)

## 第一层：概念入门 · 知其然

### 它是什么

密码哈希把任意字节串映成固定长度摘要；相同内容应得到相同摘要，但摘要本身不是加密。

### 先看一个例子

Dropbox对5 MiB文件按4 MiB固定块分别做SHA-256，再对块摘要拼接做SHA-256。

### 理解练习

网络每次传1 MiB就应每次结束一个哈希块吗？

<details><summary>答案与解释</summary>

不应，传输分块与内容哈希规定的4 MiB块不同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 普通增量哈希分批更新等价于哈希字节拼接；Dropbox另明确规定了两层块摘要结构。
2. 外层接收原始32字节摘要，而非64个十六进制字符，否则结果改变。

### 具体输入与计算步骤

Dropbox对5 MiB文件按4 MiB固定块分别做SHA-256，再对块摘要拼接做SHA-256。

1. 5 MiB分为4 MiB和1 MiB两块，得到两个32字节摘要。
2. 外层哈希输入64字节，最终32字节摘要显示为64个十六进制字符。

计算结果：外层哈希输入64字节，最终32字节摘要显示为64个十六进制字符。

### 换到实际问题中应用

流式校验Dropbox上传文件内容。

1. 累计字节到4,194,304时结束内层块，摘要原始字节交给外层，再重置内层。
2. EOF仅结束非空残块，最终比较外层摘要，网络分片大小不影响结果。

应用结论：EOF仅结束非空残块，最终比较外层摘要，网络分片大小不影响结果。

### 举一反三：改变条件后的完整解答

文件恰好4 MiB，EOF还要追加空块吗？

<details><summary>变式的推演与答案</summary>

1. 完整块已结束并贡献一个32字节摘要，残留字节数为0。
2. 不追加空块；外层只接收该32字节，空文件则直接哈希空的外层输入。

不追加空块；外层只接收该32字节，空文件则直接哈希空的外层输入。

</details>

### 原有解释与进一步例题


### 原理与推演

Dropbox content_hash first hashes each 4,194,304-byte block with SHA-256, then hashes the concatenation of the raw 32-byte block digests. Only the final digest is encoded as hexadecimal. Transport chunk boundaries do not change the fixed block boundaries.

Keep one inner hash context, one outer context, and a block-byte counter. Finalize every full block and any remaining nonempty block. An empty file contributes no inner block; an exact block multiple must not append an empty block.


### 例子

例子：文件分成两个块，各自 SHA-256 得到 32 字节摘要 A、B。组合散列应对 64 个原始摘要字节求哈希；把 A、B 各转成 64 字符十六进制后再拼接，会变成另一组输入，不能得到同一个分块内容散列。


### 适用边界与常见误解

Dropbox content_hash differs from SHA-256 applied directly to the file. Hash-table indexing, content identification, and authentication have different requirements. Digest equality is subject to collision assumptions and does not by itself authenticate a sender.

### 推导与方法参考

- [一手资料](https://www.dropbox.com/developers/reference/content-hash)

[返回分层目录](00-learning-index.md)
