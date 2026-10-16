---
title: "KV Cache：速度收益换来多少显存"
aliases: []
tags: ["interview","area/practice"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/口述、复习与表达|口述、复习与表达]]

## 33 · KV Cache：速度收益换来多少显存

**机器学习与 AI · 官方文档派生自测**

**来源：** [Transformers：How caching works](https://huggingface.co/docs/transformers/main/cache_explanation)，Hugging Face，核对 2026-10-16。支持因果解码缓存旧 K/V 及缓存长度增长；内存数字为给定维度的独立估算，忽略实现开销。

### 问题

给定常规KV缓存，如何按层数、batch、KV头数、序列长、头维度和dtype估算元素数？为什么每步不是恒定成本？

### 答题思路

1. K和V两份，元素数2×层数×batch×KV头数×长度×头维度。
2. 乘每元素字节得到基础缓存容量；GQA中使用KV头数，不能误用query头数。
3. 旧K/V无需重算，但新query仍访问历史key/value，随上下文增长的工作及内存访问仍存在；估算忽略分页、量化元数据等。

### 手算例子

输入：2层，batch1，2个KV头，长度4，头维度8，FP16每元素2字节

1. 元素数2×2×1×2×4×8=256。
2. 容量256×2=512字节；长度翻倍时此基础容量也翻倍。

结果：512字节（仅基础K/V张量）

### 追问与答案

缓存能原样跨不同prompt复用吗？

<details>
<summary>查看参考答案</summary>

只有前缀和模型/位置编码等条件兼容的部分才可能复用；任意prompt不能共享同一历史缓存。

</details>

**易错点：** 把KV cache理解为最终回答缓存；声称每步注意力变为O(1)；漏掉K/V的因子2。

## 关联概念与章节

- [[Concepts/键值缓存／高效注意力计算|键值缓存／高效注意力计算]]
- [[Concepts/张量／形状／轴|张量／形状／轴]]
- [[Chapters/第 106 讲 来源面试题：官方样题、算法练习与技术追问|第 106 讲]]
- [[Chapters/第 57 讲 LLM 推理：为什么有的模型又快又便宜|第 57 讲]]
- [[Chapters/第 58 讲 推理加速算法：KV Cache、FlashAttention、量化、推测解码|第 58 讲]]
