---
title: "第 54 讲 · LLM 是怎样训练成聊天助手的"
aliases: []
tags: ["chapter","area/llm"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/LLM 训练与推理|LLM 训练与推理]]

<a id="chapter-54"></a>

## 第 54 讲｜LLM 是怎样训练成聊天助手的

领域：LLM 与智能体 · 导览 / 复习

现代 LLM 的训练可以粗分为 Pretraining，预训练，以及 Post Training，后训练。预训练主要建立广泛的语言和世界知识表征。后训练则改善指令遵循、回答格式、特定任务能力、工具使用和偏好对齐。

SFT，Supervised Fine Tuning，监督微调，使用高质量的输入与期望输出样本继续训练，使模型学会按指令回答。Instruction Tuning，指令微调，是常见形式。Fine Tuning，不一定要求改变全部模型参数。PEFT，Parameter Efficient Fine Tuning，参数高效微调，只训练较少参数。LoRA，Low Rank Adaptation，低秩适配，通过引入小规模可训练参数，以较低成本适配基础模型。Full Fine Tuning，则更新更大范围甚至全部参数。

Preference Learning，偏好学习，使用比较数据表达哪种回答更好。RLHF，Reinforcement Learning from Human Feedback，从人类反馈中进行强化学习，是一种较广义的后训练路线。典型流程可以包括收集偏好、训练奖励模型，再用强化学习优化语言模型。PPO 是常见的策略优化算法之一。DPO，Direct Preference Optimization，直接偏好优化，利用偏好样本直接优化模型，不需要经典 RLHF 流程中显式训练一个单独奖励模型再做在线策略优化。DPO 不等于强化学习所有方法的替代品。

RLAIF，AI Feedback，用 AI 评审或产生偏好信号，减少对人工逐条评分的依赖，但可能引入评价模型自身的偏差。GRPO，Group Relative Policy Optimization，是一类根据一组候选回答的相对反馈调整策略的方法，在推理能力后训练的讨论中经常出现。Verifiable Reward，可验证奖励，是指结果可以比较明确地自动检查，比如数学题最终答案、代码测试是否通过。

Reasoning Model，推理模型，通常通过训练与推理机制，使模型更擅长多步骤问题。Chain of Thought，思维链，泛指分步推理的文本或内部推理过程。Test Time Compute，测试时计算量，强调在真正回答问题时投入更多推理计算，例如生成、检查或搜索多个候选步骤。不能简单把“想得越长”与“答案越好”等同起来；验证机制和任务类型很重要。

Synthetic Data，合成数据，是由模型或程序生成的数据。Distillation，知识蒸馏，让较小模型学习较大模型或教师系统的输出分布、行为或内部知识。Continued Pretraining，继续预训练，让已有模型进一步接触特定领域的大规模数据，例如法律文献或代码。Domain Adaptation，领域适配，让模型在新领域表现更好。

Dataset Curation，数据整理，涉及去重、质量筛选、版权与授权约束、毒性和隐私风险控制。Data Contamination，数据污染，在评测语境下，常指训练过程中接触了应当独立保留的测试内容，导致分数高估。Alignment，对齐，通常讨论模型行为与预期指令、偏好、安全和价值约束的一致程度。

Model Evaluation，模型评测，不只是看聊天是否流畅。Perplexity，困惑度，是衡量语言模型预测分布的一类指标。Benchmark，基准测试，用统一题目比较能力。Human Evaluation，人类评审，评估有用性、正确性、表达和风险。Pass at K 常用于代码任务，表示产生多个候选时至少一个通过测试的概率或估计指标。面试里需要强调：公开基准成绩不等于真实环境的可靠性。

你可以这样总结训练阶段：预训练主要学习广泛的模式和知识；监督微调让模型更会执行任务；偏好优化和强化学习进一步塑造行为；推理时的计算与工具使用又提供额外能力。这些阶段相互关联，但并不能简单地合并为同一种训练。

参考资料（不朗读）：[S106 · LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)；[S107 · Direct Preference Optimization: Your Language Model is Secretly a Reward Model](https://arxiv.org/abs/2305.18290)；[S108 · DeepSeekMath: Pushing the Limits of Mathematical Reasoning in Open Language Models](https://arxiv.org/abs/2402.03300)；[S109 · Hugging Face TRL — SFT Trainer](https://huggingface.co/docs/trl/sft_trainer)
