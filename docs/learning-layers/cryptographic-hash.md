# Cryptographic Hashes / Streaming Digests

概念编号：`concept:cryptographic-hash` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cryptographic-hash/)

## 第一层：概念入门 · 知其然

### 字节内容与摘要

文件在这里被看作有顺序的字节序列；一个字节是八个二进制位。摘要是根据完整输入计算出的短结果。编码成十六进制只是把每个字节写成两个可读字符，并不会增加摘要实际包含的信息。


### 定义

密码学哈希函数把允许长度范围内的字节串确定地映射到固定长度摘要，并以抗原像、抗第二原像和抗碰撞等性质为安全目标。这些目标分别限制从摘要寻找输入、为给定输入找另一个同摘要输入，以及寻找任意一对不同的同摘要输入。它不提供把摘要解密回原文的功能。

### 理解定义中的术语与关系

#### 相同摘要能说明什么

同一算法处理相同字节，必须得到相同摘要。反过来，由于摘要长度固定而输入种类更多，不同输入发生碰撞在数学上不可避免；安全目标是让相应寻找工作在所讨论资源下不可行。若攻击者还能替换你用于比较的“正确摘要”，只核对哈希不能证明文件来自可信发布者。

### 概念边界与常见混淆

哈希不是保密加密，也不是签名或身份认证。实际安全判断还取决于算法、协议和威胁模型；不能用“摘要很长”代替这些条件。

### 先看一个例子

两个工具对同一个文件计算 SHA-256。摘要实际为 32 字节，常显示成 64 个十六进制字符。若一个工具把文件按小段读取、另一个一次读完，只要向同一增量哈希依次提供完全相同的字节，最终摘要应一致。另行规定的“先分块各算摘要、再组合”是另一种算法，不能与普通文件 SHA-256 混淆。

### 理解练习

#### 1. 碰撞存在与安全目标

固定长度摘要必然可能碰撞，是否立即意味着任何文件都能轻易被替换？

<details><summary>答案与解释</summary>

不意味着。存在性不等于可有效找到，寻找任意碰撞也不同于替换一个指定文件而保持其摘要。需要说明攻击者的目标与可用资源。

</details>

#### 2. 读取分段是否改变输入

依次把 AB、CD 交给同一个增量哈希，与把 ABCD 一次交给它，会得到不同结果吗？

<details><summary>答案与解释</summary>

在字节完全相同、顺序相同且中途没有结束哈希的前提下不会。两者表示相同输入；把两个分段分别结束哈希再拼摘要则不同。

</details>

#### 3. 完整性与来源

从不可信页面同时下载文件和它的摘要，二者匹配就能证明发布者身份吗？

<details><summary>答案与解释</summary>

不能。对方可以同时更换文件和摘要。需要通过可信渠道获取验证依据或使用适当的认证机制；普通哈希比较本身没有建立身份信任。

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
