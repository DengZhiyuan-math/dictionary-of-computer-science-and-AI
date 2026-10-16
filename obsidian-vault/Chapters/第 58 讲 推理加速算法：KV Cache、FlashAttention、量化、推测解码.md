---
title: "第 58 讲 · 推理加速算法：KV Cache、FlashAttention、量化、推测解码"
aliases: []
tags: ["chapter","area/llm"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/LLM 训练与推理|LLM 训练与推理]]

## 本讲概念

- [[Concepts/键值缓存／高效注意力计算|键值缓存／高效注意力计算]]
- [[Concepts/缓存与复用|缓存与复用]]

## 具体案例与可视化

- [[Examples/29 KV cache：复用的是哪些计算|案例 29 · KV cache：复用的是哪些计算]]

<a id="chapter-58"></a>

## 第 58 讲｜推理加速算法：KV Cache、FlashAttention、量化、推测解码

领域：LLM 与智能体 · 细讲

<a id="chapter-58-section-01"></a>

### Prefill、Decode、TTFT、TPOT【重点】

Prefill 处理输入上下文，decode 逐步生成新 token。TTFT 衡量多久看到第一个 token，TPOT 衡量后续 token 的生成间隔。一次请求的总延迟还包含排队、工具调用与网络。某项优化提高整体吞吐，不一定降低每个用户的等待时间；选择优化前应知道实际瓶颈在哪里。

<a id="chapter-58-section-02"></a>

### KV Cache 与 Prefix Caching【重点精学】

KV cache 保存历史 token 已计算的 key 和 value，避免生成每个新 token 时重算全部历史键值。新 token 通常仍要访问相关历史缓存进行注意力计算，所以长上下文并不免费。Prefix caching 在多个请求具有可复用前缀时共享已有计算，要求内容与模型配置等兼容。缓存还需考虑用户数据隔离，不能因为文本看起来相似就随意混用。

<a id="chapter-58-section-03"></a>

### FlashAttention 与 PagedAttention【重点精学】

FlashAttention 通过分块、融合与重计算等安排减少 GPU 内存读写，避免把庞大的中间注意力矩阵完整存放到较慢内存。它不是简单删掉大量注意力连接的近似算法，主要优化精确注意力的计算方式。PagedAttention 则重点管理 KV cache 的内存分块和映射，降低浪费、改善共享与调度。前者侧重计算中的数据搬运，后者侧重缓存内存管理。

<a id="chapter-58-section-04"></a>

### Static Batching、Continuous Batching、Chunked Prefill【重点】

静态批处理把一批请求一起跑，某些请求结束后也可能得等其他请求。连续批处理在生成过程中动态加入和移除请求，提升资源利用。Chunked prefill 把长输入处理拆成块，与其他请求的生成协调，减少长请求对延迟的干扰。这些是服务调度方法，不直接让模型学到新知识。

<a id="chapter-58-section-05"></a>

### PTQ、QAT、GPTQ、AWQ【重点】

PTQ 是训练后量化，QAT 在训练时考虑量化影响。GPTQ、AWQ 是低比特权重量化的重要路线，分别通过近似误差处理或激活感知的保护与缩放等方式降低质量损失。Weight-only quantization 主要压缩权重，激活和 KV cache 是否量化是另一个选择。低比特不保证所有设备都更快，还取决于内核支持、解码开销和任务瓶颈。

<a id="chapter-58-section-06"></a>

### Speculative Decoding，推测解码【重点】

较快的草稿模型先提出一段候选，目标模型批量检查并按相应接受规则决定保留哪些，再继续。草稿与目标越匹配，接受率通常越高，但草稿本身也有成本。某些精确采样方案可以保持目标分布，任意“让小模型先写、大模型看一眼”的流程却未必如此。它适合目标模型较贵且验证并行有利的场景，不保证任何硬件与请求都加速。

<a id="chapter-58-section-07"></a>

### Tensor、Pipeline、Data Parallelism 与 ZeRO【重点】

张量并行拆开同一层的大计算，流水线并行把不同层放到不同设备，数据并行用模型副本处理不同数据。ZeRO 或 FSDP 等训练方案分摊参数、梯度、优化器状态中的相应部分，减少复制开销。通信、流水线空泡和负载不均可能抵消加速。模型能放下与跑得快是两个不同目标。

<a id="chapter-58-section-08"></a>

### 案例 29：KV cache：复用的是哪些计算

场景与输入：自回归解码已有 4 个 token，现在生成第 5 个。前缀各层的 Key 与 Value 可在先前步骤保存。

手算第 1 步：缓存让第 5 步复用前 4 个 token 的 K、V，不必在每步重复做它们的同类投影。

手算第 2 步：新 token 的 Query 仍需与可见前缀 Key 比较，再对 Value 加权，前缀更长时这部分工作仍增长。

手算第 3 步：假设每个 token 存 2 组、每组 d 个数值、每数值 b 字节，L 层、T 个 token、批量 B 的简化内存为 2BLTdb。

结果与解释：例如 B=1、L=2、T=4、d=8、b=2 时为 256 字节；这里 d 是每层合计缓存的 KV 宽度。

易错点与边界：真实 GQA/MQA、量化、分页和框架元数据会改变内存；KV cache 与 FlashAttention 优化的对象不同。

改变条件再想一想：长度翻倍，按这个简化缓存公式会怎样？

自测参考：缓存大小翻倍；不能据此声称整个推理时间也恰好翻倍。

参考资料（不朗读）：[S117 · FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness](https://arxiv.org/abs/2205.14135)；[S118 · Efficient Memory Management for Large Language Model Serving with PagedAttention](https://arxiv.org/abs/2309.06180)；[S119 · Fast Inference from Transformers via Speculative Decoding](https://arxiv.org/abs/2211.17192)；[S120 · GPTQ: Accurate Post-Training Quantization for Generative Pre-trained Transformers](https://arxiv.org/abs/2210.17323)；[S121 · AWQ: Activation-aware Weight Quantization for LLM Compression and Acceleration](https://arxiv.org/abs/2306.00978)；[S101 · PyTorch — Distributed Overview](https://docs.pytorch.org/tutorials/beginner/dist_overview.html)
