# KV Cache / FlashAttention · 注意力推理的缓存与访存

概念编号：`concept:kv-cache-flashattention` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kv-cache-flashattention/)

## 第一层：概念入门 · 知其然

### 它是什么

KV cache 保存自回归推理中已处理 token 的键和值，供后续 token 复用。FlashAttention 则通过分块等方式减少注意力计算的中间存储和数据搬运；它不是另一种 KV cache，两者可以配合使用。注意力的数学机制见基础链接。

### 先看一个例子

L=2、T=100、H=2、d=4、b=2 时，示意 KV 存储为 6400 字节。T 翻倍，这部分存储也翻倍。更换模型权重后，旧状态不能仅因输入文字相同就继续使用；跨请求的共享还要满足各自数据和访问边界。

### 理解练习

用自己的话解释：上面的情景为什么是“KV Cache / FlashAttention · 注意力推理的缓存与访存”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：KV cache 保存自回归推理中已处理 token 的键和值，供后续 token 复用。FlashAttention 则通过分块等方式减少注意力计算的中间存储和数据搬运；它不是另一种 KV cache，两者可以配合使用。注意力的数学机制见基础链接。

情景依据：L=2、T=100、H=2、d=4、b=2 时，示意 KV 存储为 6400 字节。T 翻倍，这部分存储也翻倍。更换模型权重后，旧状态不能仅因输入文字相同就继续使用；跨请求的共享还要满足各自数据和访问边界。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数、公式与边界

简化地，L 层、缓存 T 个 token、每层 H 个 KV 头、每头维度 d、每个数 b 字节时，键和值共占 \(M=2LTHdb\) 字节，不计分配器和额外元数据。复用需要模型版本、位置、前缀及其他影响状态的配置兼容。缓存避免重复投影，并没有免除新 token 读取历史键值的工作。


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

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
