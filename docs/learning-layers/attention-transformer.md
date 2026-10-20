# Attention / Transformer

概念编号：`concept:attention-transformer` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/attention-transformer/)

## 第一层：概念入门 · 知其然

### 它是什么

Intuitively, a query represents what the current position seeks, keys provide matching clues at other positions, and values contain the information to aggregate. Attention scores determine aggregation weights after normalization. This is an analogy: queries, keys and values are learned vectors, not human-written questions, catalogs and answers. A high attention weight does not automatically establish interpretable causal importance to the final output.

### 先看一个例子

Query q=[1,0], keys [1,0], [0,1], [1,1], and values [2,0], [0,2], [1,1]. Key dimension is 2.
Attention outputs a weighted combination of values; query–key matching determines the weights. Lower temperature concentrates these unequal-score weights more strongly.

### 理解练习

If two keys have equal scores, must they have equal weights?

<details><summary>答案与解释</summary>

Under the same query and mask conditions, their softmax weights are equal. Their value vectors may still differ.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Intuitively, a query represents what the current position seeks, keys provide matching clues at other positions, and values contain the information to aggregate. Attention scores determine aggregation weights after normalization. This is an analogy: queries, keys and values are learned vectors, not human-written questions, catalogs and answers. A high attention weight does not automatically establish interpretable causal importance to the final output.


### 适用边界与常见误解

Attention weights do not automatically provide a causal explanation.

### 例题：Attention: Scores, Normalization and Weighted Sums

Query q=[1,0], keys [1,0], [0,1], [1,1], and values [2,0], [0,2], [1,1]. Key dimension is 2.

1. Dot products are [1,0,1]. Dividing by √2 gives approximately [.707,0,.707]. The demo temperature defaults to 1.
2. Softmax subtracts the maximum score before exponentiation, giving weights approximately [.4011,.1978,.4011], summing to 1.
3. The weighted value sum is approximately [1.2033,.7967]. Masking the third key gives it weight 0 and renormalizes the other weights.

结果：Attention outputs a weighted combination of values; query–key matching determines the weights. Lower temperature concentrates these unequal-score weights more strongly.

易错点：This is scaled dot-product attention for one query, one head and no dropout. The extra temperature control is a teaching device. Masking all keys requires separately defined behavior.

变式：If two keys have equal scores, must they have equal weights?

参考答案：Under the same query and mask conditions, their softmax weights are equal. Their value vectors may still differ.

### 例题：KV Cache: Which Computations Are Reused?

During causal autoregressive decoding, four tokens have already been processed. Now process the fifth token to predict the sixth. Keys and values for the first four tokens are cached separately at each layer.

1. Reuse the first four tokens’ cached K and V instead of recomputing their projections. Compute Q, K and V for the fifth token and append its K and V to the cache.
2. The fifth token’s query attends to the visible keys for tokens 1…5 and weights their values. Its final representation predicts the sixth token. This attention work still grows with prefix length.
3. Suppose each token stores 2 groups of d values, each b bytes. For L layers, T tokens and batch size B, simplified memory use is 2BLTdb.

结果：Before processing the fifth token, B=1, L=2, T=4, d=8 and b=2 give 256 bytes of cached values. Here d is the total cached key width per layer, with the same width assumed for values. After appending the fifth token, the same formula gives 320 bytes.

易错点：GQA/MQA, quantization, paging and framework metadata change real memory use. KV caching and FlashAttention optimize different aspects of inference.

变式：What happens when length doubles under this simplified cache formula?

参考答案：Cache size doubles. This does not establish that total inference time exactly doubles.

### 领域应用

- [Causal Attention Mask · 金融预测的信息可见范围](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-causal-attention-mask.md)：将通用注意力的访问范围落实到金融预测时点，区分逐位置预测与历史整窗预测。
- [KV Cache / FlashAttention · 注意力推理的缓存与访存](kv-cache-flashattention.md)：先明确键、值与注意力访问范围，再计算缓存容量或讨论访存优化。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
