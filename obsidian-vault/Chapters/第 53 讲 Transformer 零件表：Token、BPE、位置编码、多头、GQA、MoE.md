---
title: "第 53 讲 · Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE"
aliases: []
tags: ["chapter","area/llm"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/LLM 训练与推理|LLM 训练与推理]]

## 本讲概念

- [[Concepts/注意力／Transformer 架构|注意力／Transformer 架构]]

<a id="chapter-53"></a>

## 第 53 讲｜Transformer 零件表：Token、BPE、位置编码、多头、GQA、MoE

领域：LLM 与智能体 · 细讲

<a id="chapter-53-section-01"></a>

### Tokenizer、Vocabulary、BPE、WordPiece、Unigram【重点】

Tokenizer 把文字转成 token 序列，vocabulary 是可用 token 的集合。BPE 逐步合并频繁的符号对，WordPiece 使用相关的子词建模思路，Unigram tokenizer 从候选子词集合及概率模型出发选择分词。Token 不固定等于汉字或单词，空格和符号也可能占 token。不同 tokenizer 下同一句话长度不同，因此不能把字符数直接当作上下文消耗。

<a id="chapter-53-section-02"></a>

### BOS、EOS、PAD、UNK【认识】

这些特殊 token 分别可能表示序列开始、结束、填充、未知内容，具体以模型约定为准。EOS 告诉生成过程何时结束，PAD 让不等长序列可以组成批次。Attention mask 通知模型哪些位置可以参与，loss mask 决定哪些位置计入训练目标。前者能否读取与后者是否评分是两回事，不能互相替代。

<a id="chapter-53-section-03"></a>

### Embedding、Hidden Size、Layer、FFN【重点】

Embedding 把离散 token 映射为向量。Hidden size 是中间表示宽度，layer 是堆叠的处理层。一个 Transformer block 通常包含注意力、前馈网络、归一化和残差路径。FFN 逐位置变换特征，常占据相当部分参数。ReLU、GELU、SwiGLU 等是激活或门控结构选择，不是整个大模型的类别名称。

<a id="chapter-53-section-04"></a>

### Query、Key、Value、Attention Score【重点精学】

Query 可以直观理解为当前位置想找什么，key 表示各位置可供匹配的线索，value 是匹配后要汇总的信息。Attention score 决定聚合时各位置的权重。这个类比帮助理解选择信息，但它们都是学习到的向量，并不对应人工写好的问题、目录和答案。注意力权重较高也不自动等于该位置对最终结论具有可解释的因果重要性。

<a id="chapter-53-section-05"></a>

### Multi-Head、MQA、GQA【重点】

多头注意力用多个表示通道观察不同关系。标准 MHA 的各头有相应键和值。MQA 让多个查询头共享较少的键值表示，GQA 则分组共享，在表达能力与缓存成本之间折中。它们尤其影响生成时 KV cache 的规模与带宽需求。Head 的数量并不是模型能同时思考几个完全独立问题的精确计数。

<a id="chapter-53-section-06"></a>

### Positional Encoding、RoPE、ALiBi【重点】

注意力本身需要额外方式获知顺序。位置编码加入位置相关表示。RoPE 用旋转式变换让注意力利用相对位置关系；ALiBi 给注意力分数加入与距离有关的偏置。它们帮助模型理解次序，但支持更长输入不意味着对训练长度之外的所有任务都泛化可靠。上下文长度、位置外推和有效检索长文信息是不同能力。

<a id="chapter-53-section-07"></a>

### Causal Mask 与 Padding Mask【重点】

Causal mask 防止预测当前位置时读取未来答案。Padding mask 排除为了凑齐长度而加入的无效位置。在训练时，因果掩码允许同时计算很多位置，又不泄露后续目标；在生成时，未来 token 还没产生，仍通常按顺序继续。Mask 不是数据删除：被屏蔽内容可能仍在内存里，只是不参与指定的计算关系。

<a id="chapter-53-section-08"></a>

### MoE、Router、Expert、Load Balancing【重点】

MoE 在部分层设置多个专家子网络，由 router 为 token 选择其中一部分。总参数量与每次激活参数量因此不同。Load balancing 避免大量 token 挤向同一专家，让资源空闲或超载。专家是训练中形成的功能分工，不一定能清楚命名为数学专家、医学专家。省激活计算不等于省全部存储和通信，推理仍需考虑模型权重放在哪里。

参考资料（不朗读）：[S091 · Attention Is All You Need](https://arxiv.org/abs/1706.03762)；[S102 · Hugging Face — Tokenizer Summary](https://huggingface.co/docs/transformers/tokenizer_summary)；[S104 · RoFormer: Enhanced Transformer with Rotary Position Embedding](https://arxiv.org/abs/2104.09864)；[S105 · GQA: Training Generalized Multi-Query Transformer Models from Multi-Head Checkpoints](https://arxiv.org/abs/2305.13245)；[S103 · Switch Transformers: Scaling to Trillion Parameter Models with Simple and Efficient Sparsity](https://arxiv.org/abs/2101.03961)
