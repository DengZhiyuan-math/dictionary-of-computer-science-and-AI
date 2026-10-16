---
title: "第 55 讲 · LLM 训练词汇：预训练、SFT、LoRA、QLoRA、Packing、蒸馏"
aliases: []
tags: ["chapter","area/llm"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/LLM 训练与推理|LLM 训练与推理]]

## 本讲概念

- [[Concepts/监督微调／低秩适配／量化低秩适配|监督微调／低秩适配／量化低秩适配]]

<a id="chapter-55"></a>

## 第 55 讲｜LLM 训练词汇：预训练、SFT、LoRA、QLoRA、Packing、蒸馏

领域：LLM 与智能体 · 细讲

<a id="chapter-55-section-01"></a>

### Pretraining、Continued Pretraining、SFT【重点】

预训练从大规模数据学习一般规律。继续预训练在已有模型上继续使用类似目标，常用于增加领域数据。SFT 使用输入与期望回答的示范，塑造任务行为。它们都可能更新参数，但数据形式与目标重点不同。加入新文档不一定非得微调：需要经常更新且可引用的知识，还可通过检索提供。

<a id="chapter-55-section-02"></a>

### Causal LM、Masked LM、Instruction Tuning【重点】

Causal language modeling 根据前文预测后续 token，masked language modeling 从可见上下文恢复被遮住内容。Instruction tuning 用任务指令与示范回答训练按要求输出。BERT 类的掩码预训练与自回归聊天模型并非同一种训练流程。模型能读完整句子提取表示，与能够高效自由生成长回答，是不同设计重点。

<a id="chapter-55-section-03"></a>

### Loss Mask、Assistant-Only Loss、Packing【重点】

指令微调中，训练数据可能包含用户输入、系统说明和助手回答。Assistant-only loss 只对选定回答位置计算目标，让模型重点学习应该怎样回应。Packing 把多个短序列放进一个较长训练块，减少填充浪费，但要正确处理样本边界、掩码和任务约定。原始文本被放进上下文，不代表每个位置都必须计入损失。

<a id="chapter-55-section-04"></a>

### Full Fine-Tuning、PEFT、LoRA【重点精学】

全量微调更新大部分或全部参数。PEFT，参数高效微调，只训练较少参数。LoRA 保留基础权重，并用可训练的低秩增量表示适配变化。Rank，秩，控制增量结构容量；target modules 决定加在哪些模块。较少可训练参数节省优化器状态等资源，但仍需运行基础模型，因此不代表整个训练成本按同样比例减少。

<a id="chapter-55-section-05"></a>

### QLoRA、Adapter、Prompt Tuning【重点】

QLoRA 在量化的基础模型上训练 LoRA 适配参数，进一步降低资源需求。Adapter 通常在网络中加入小型可训练模块。Prompt tuning 训练一组连续提示表示，而不是只手写自然语言提示词。它们有不同表达能力、资源和部署取舍。量化主要关心表示精度与内存，LoRA 主要关心更新参数的结构，二者可以组合但不是同义词。

<a id="chapter-55-section-06"></a>

### Distillation 与 Synthetic Data【重点】

知识蒸馏让学生模仿教师的输出分布、答案或某些内部表征。合成数据由模型或程序生成，可扩大训练材料，也可能复制教师错误。使用经过验证的代码执行或任务反馈，可以减少部分错误。学生复制了更多教师文本，不等于复制了教师所有能力；数据选择、训练目标和学生容量共同影响迁移。

<a id="chapter-55-section-07"></a>

### Deduplication、Contamination、Data Mixture【重点】

去重避免重复材料过度占据训练。评测污染指训练过程接触了本应独立测试的内容或过近变体，使成绩高估。Data mixture 是不同领域或类型数据的混合比例。训练 token 多并非等于有效信息多，低质量、重复或与任务无关的数据可能消耗预算。模型规模、数据量、质量和训练计算量应一起理解。

参考资料（不朗读）：[S106 · LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)；[S110 · QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)；[S111 · BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding](https://arxiv.org/abs/1810.04805)；[S109 · Hugging Face TRL — SFT Trainer](https://huggingface.co/docs/trl/sft_trainer)；[S112 · Distilling the Knowledge in a Neural Network](https://arxiv.org/abs/1503.02531)
