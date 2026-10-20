# KV Cache / FlashAttention · 注意力推理的缓存与访存

概念编号：`concept:kv-cache-flashattention` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kv-cache-flashattention/)

## 第一层：概念入门 · 知其然

### 它是什么

KV缓存复用已生成词的键和值；FlashAttention改变注意力的内存访问方式，避免完整存储大分数矩阵。

### 先看一个例子

1层、2个头、长度4、每头维度3，K与V均用2字节元素。

### 理解练习

KV缓存会让上下文内存不再随长度增长吗？

<details><summary>答案与解释</summary>

不会，缓存仍随保存词数线性增加。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 自回归只新增一个词的K、V，旧词不变时可直接复用。
2. FlashAttention用分块与在线归一化计算相同注意力目标，主要节省内存读写。

### 具体输入与计算步骤

1层、2个头、长度4、每头维度3，K与V均用2字节元素。

1. K与V总元素2×1×2×4×3=48。
2. 存储48×2=96字节；不含批次、分配器及其他激活。

计算结果：存储48×2=96字节；不含批次、分配器及其他激活。

### 换到实际问题中应用

降低语言模型逐词生成延迟。

1. 启用KV缓存并验证位置编码、掩码与缓存长度一致。
2. 使用支持的高效注意力内核并测端到端延迟，两者解决的成本不同。

应用结论：使用支持的高效注意力内核并测端到端延迟，两者解决的成本不同。

### 举一反三：改变条件后的完整解答

长度从4变8，其余不变，缓存多少？

<details><summary>变式的推演与答案</summary>

1. 元素数变2×1×2×8×3=96。
2. 存储192字节，翻倍而非变为4倍；完整注意力矩阵元素才随长度平方增长。

存储192字节，翻倍而非变为4倍；完整注意力矩阵元素才随长度平方增长。

</details>

### 原有解释与进一步例题


### 定义与应用范围

KV cache 保存自回归推理中已处理 token 的键和值，供后续 token 复用。FlashAttention 则通过分块等方式减少注意力计算的中间存储和数据搬运；它不是另一种 KV cache，两者可以配合使用。注意力的数学机制见基础链接。


### 参数、公式与边界

简化地，L 层、缓存 T 个 token、每层 H 个 KV 头、每头维度 d、每个数 b 字节时，键和值共占 \(M=2LTHdb\) 字节，不计分配器和额外元数据。复用需要模型版本、位置、前缀及其他影响状态的配置兼容。缓存避免重复投影，并没有免除新 token 读取历史键值的工作。


### 例子

L=2、T=100、H=2、d=4、b=2 时，示意 KV 存储为 6400 字节。T 翻倍，这部分存储也翻倍。更换模型权重后，旧状态不能仅因输入文字相同就继续使用；跨请求的共享还要满足各自数据和访问边界。


### 适用边界与常见误解

Cache management, numerical quantization, and kernel optimization are different techniques.

### 例题：KV Cache: Which Computations Are Reused?

During causal autoregressive decoding, four tokens have already been processed. Now process the fifth token to predict the sixth. Keys and values for the first four tokens are cached separately at each layer.

1. Reuse the first four tokens’ cached K and V instead of recomputing their projections. Compute Q, K and V for the fifth token and append its K and V to the cache.
2. The fifth token’s query attends to the visible keys for tokens 1…5 and weights their values. Its final representation predicts the sixth token. This attention work still grows with prefix length.
3. Suppose each token stores 2 groups of d values, each b bytes. For L layers, T tokens and batch size B, simplified memory use is 2BLTdb.

结果：Before processing the fifth token, B=1, L=2, T=4, d=8 and b=2 give 256 bytes of cached values. Here d is the total cached key width per layer, with the same width assumed for values. After appending the fifth token, the same formula gives 320 bytes.

易错点：GQA/MQA, quantization, paging and framework metadata change real memory use. KV caching and FlashAttention optimize different aspects of inference.

变式：What happens when length doubles under this simplified cache formula?

参考答案：Cache size doubles. This does not establish that total inference time exactly doubles.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/2205.14135)

[返回分层目录](00-learning-index.md)
