# Attention / Transformer

概念编号：`concept:attention-transformer` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/attention-transformer/)

## 第一层：概念入门 · 知其然

### 定义

注意力机制根据当前要处理的位置与候选信息的匹配程度，计算权重，再用这些权重汇总候选内容。常见实现把当前位置变成查询向量，把候选位置分别变成键向量和值向量：查询与键决定权重，值提供被汇总的内容。Transformer 是以注意力及逐位置变换为主要部件的神经网络架构；自注意力表示查询和候选来自同一序列，交叉注意力则来自不同序列。

### 概念边界与常见混淆

注意力权重不自动等于因果解释或语义真相。架构还需要表示顺序的信息；只把一组词输入没有位置信息的对称汇总，不能凭空知道它们原先的次序。

### 先看一个例子

为理解加权汇总，假设某位置对两个候选得到权重 0.75 与 0.25，候选值向量为 (4,0) 与 (0,8)，输出是 (3,2)。权重之和为 1，但输出不是选择其中一个候选，而是组合内容。语言生成时还要遮住未来位置，避免在预测下一个词时读取尚未生成的词。

### 理解练习

#### 1. 键与值

权重是通过查询与键计算的，是否说明输出直接等于键的平均？

<details><summary>答案与解释</summary>

不是。这里按权重汇总的是值；键负责匹配，值负责提供内容，虽然它们可以从同一输入变换而来。

</details>

#### 2. 生成条件

训练预测第三个词时允许读取第四个真实词，会怎样？

<details><summary>答案与解释</summary>

可能利用实际生成时不可用的信息，训练与使用条件不一致。需要符合预测任务的遮罩，而不能只追求训练误差下降。

</details>

#### 3. 权重解释

某词权重最大，能否据此证明它是回答的唯一原因？

<details><summary>答案与解释</summary>

不能。输出还依赖值向量、其他层及模型参数，权重只是特定计算环节中的系数。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 由查询Q与键K的点积得到匹配分数，再除以√d控制尺度。
2. 对分数做softmax得到和为1的权重，再乘V；因果掩码禁止读取未来位置。

### 具体输入与计算步骤

两个候选值为2和6，注意力权重为0.25和0.75。

1. 设分数为0与ln3，指数为1与3，归一化得到1/4与3/4。
2. 加权和=(1/4)×2+(3/4)×6=5。

计算结果：加权和=(1/4)×2+(3/4)×6=5。

### 换到实际问题中应用

预测句子下一词，需要综合较远处的主语。

1. 给当前位置构造查询，对已出现的词计算匹配，并屏蔽未来位置。
2. 汇总上下文后送入输出层，使远处信息无需逐步跨越每个中间词。

应用结论：汇总上下文后送入输出层，使远处信息无需逐步跨越每个中间词。

### 举一反三：改变条件后的完整解答

若第二个位置被掩码，输出变成多少？

<details><summary>变式的推演与答案</summary>

1. 把第二个分数置为负无穷，softmax权重变为1与0。
2. 输出为1×2+0×6=2，不能再使用被遮挡的6。

输出为1×2+0×6=2，不能再使用被遮挡的6。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/1706.03762)

[返回分层目录](00-learning-index.md)
