---
title: "KV cache：复用的是哪些计算"
aliases: []
tags: ["example","area/llm"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/LLM 训练与推理|LLM 训练与推理]]

### 29 · KV cache：复用的是哪些计算

**场景与输入：** 自回归解码已有 4 个 token，现在生成第 5 个。前缀各层的 Key 与 Value 可在先前步骤保存。

1. 缓存让第 5 步复用前 4 个 token 的 K、V，不必在每步重复做它们的同类投影。
2. 新 token 的 Query 仍需与可见前缀 Key 比较，再对 Value 加权，前缀更长时这部分工作仍增长。
3. 假设每个 token 存 2 组、每组 d 个数值、每数值 b 字节，L 层、T 个 token、批量 B 的简化内存为 2BLTdb。

**结果：** 例如 B=1、L=2、T=4、d=8、b=2 时为 256 字节；这里 d 是每层合计缓存的 KV 宽度。

**易错点与边界：** 真实 GQA/MQA、量化、分页和框架元数据会改变内存；KV cache 与 FlashAttention 优化的对象不同。

**改变条件再想一想：** 长度翻倍，按这个简化缓存公式会怎样？

<details>
<summary>查看参考答案</summary>

缓存大小翻倍；不能据此声称整个推理时间也恰好翻倍。

</details>



## 关联概念与章节

- [[Concepts/键值缓存／高效注意力计算|键值缓存／高效注意力计算]]
- [[Concepts/注意力／Transformer 架构|注意力／Transformer 架构]]
- [[Chapters/第 58 讲 推理加速算法：KV Cache、FlashAttention、量化、推测解码|第 58 讲]]
