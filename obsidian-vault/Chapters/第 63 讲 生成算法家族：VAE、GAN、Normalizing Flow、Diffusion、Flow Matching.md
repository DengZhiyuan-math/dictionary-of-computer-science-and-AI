---
title: "第 63 讲 · 生成算法家族：VAE、GAN、Normalizing Flow、Diffusion、Flow Matching"
aliases: []
tags: ["chapter","area/multimodal"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/生成模型与多模态|生成模型与多模态]]

## 本讲概念

- [[Concepts/变分自编码／对抗生成／扩散|变分自编码／对抗生成／扩散]]

<a id="chapter-63"></a>

## 第 63 讲｜生成算法家族：VAE、GAN、Normalizing Flow、Diffusion、Flow Matching

领域：深度学习与生成模型 · 细讲

<a id="chapter-63-section-01"></a>

### Generative 与 Discriminative【重点】

判别模型重点区分或预测目标，生成模型重点学习如何描述、采样数据。二者不是只能二选一：一个系统可以先生成候选，再用判别器打分，也可以让生成目标帮助学习表示。生成新图片不是从数据库复制一张图片的定义，当然训练数据重复仍可能造成记忆与复现问题。

<a id="chapter-63-section-02"></a>

### VAE 与 Latent Space【重点】

VAE 用编码器把观察映射成潜在变量的概率表示，再用解码器从潜在变量重建或生成。训练既重视重建，也约束潜在分布结构，使从简单先验采样更可行。与普通自编码器相比，关键是可采样的概率建模，而不是仅仅把维度压得更低。某些设置会出现潜在变量被忽略等问题，需要检查模型真正使用了什么信息。

<a id="chapter-63-section-03"></a>

### GAN、Generator、Discriminator【重点】

GAN 的生成器制造样本，判别器区分真实与生成，两者相互推动学习。它可以产生锐利样本，但对抗训练可能不稳定。Mode collapse，模式坍塌，是生成器只覆盖数据分布的一小部分，看起来样本漂亮却缺乏多样性。WGAN 等路线改变分布差异的建模和训练约束，以改善相关困难，不是对抗训练自然已经完全稳定。

<a id="chapter-63-section-04"></a>

### Normalizing Flow【认识】

归一化流用一串可逆变换，把容易采样的分布映射为复杂分布，并利用变换结构追踪密度。RealNVP、Glow 是相关代表。它的优势是可计算的密度和采样机制，代价是对网络结构有一定限制。这里的 flow 不是网络流算法，也不等于股票订单流，同一个单词在不同领域描述完全不同对象。

<a id="chapter-63-section-05"></a>

### DDPM 与 Denoising【重点精学】

扩散模型在训练构造中逐步给数据加噪，让模型学习在不同噪声水平下恢复结构。生成时从噪声出发逐步构造样本。DDPM 是经典概率扩散路线。训练不一定每次都完整走完全部加噪步骤，可以抽取噪声水平构造目标。生成步数影响计算成本，不能把“训练很多步”与“生成一张图用多少去噪步”混为一谈。

<a id="chapter-63-section-06"></a>

### DDIM、DPM-Solver、Latent Diffusion、CFG【重点】

DDIM 与 DPM-Solver 等研究怎样更有效地完成采样，减少所需步骤或改善质量。Latent diffusion 在压缩后的表示空间生成，再解码成图像。CFG，classifier-free guidance，结合条件与无条件预测增强对提示的遵循，过强可能损害多样性或质量。它与训练学习率无关，也不是因为名字里有 classifier 就必须训练一个额外分类器。

<a id="chapter-63-section-07"></a>

### Flow Matching 与 Rectified Flow【重点】

流匹配学习把简单分布中的样本沿路径逐步移动到目标数据分布的变化方向。Rectified flow 是相关的路径与训练设计路线。它与扩散、连续生成模型有深刻联系，但不能简单说一个有噪声、另一个完全与噪声无关。它同样可能从随机噪声开始，也通常需要数值积分或若干生成步骤。使用 flow matching 不自动意味着一次前向就能完成任意高质量生成。

<a id="chapter-63-section-08"></a>

### DiT 与算法层次【重点】

DiT 用 Transformer 作为扩散类生成过程中的预测网络。U-Net 与 Transformer 是网络结构，diffusion 与 flow matching 是生成训练及过程设计，LoRA 是参数适配方式，三者可以叠加。听到一个新模型名时，先问它改变了哪一层，避免把架构、目标与采样器混成平行算法。

参考资料（不朗读）：[S131 · Auto-Encoding Variational Bayes](https://arxiv.org/abs/1312.6114)；[S132 · Generative Adversarial Networks](https://arxiv.org/abs/1406.2661)；[S133 · Denoising Diffusion Probabilistic Models](https://arxiv.org/abs/2006.11239)；[S135 · Denoising Diffusion Implicit Models](https://arxiv.org/abs/2010.02502)；[S136 · DPM-Solver: A Fast ODE Solver for Diffusion Probabilistic Model Sampling in Around 10 Steps](https://arxiv.org/abs/2206.00927)；[S134 · Flow Matching for Generative Modeling](https://arxiv.org/abs/2210.02747)；[S137 · Scalable Diffusion Models with Transformers](https://arxiv.org/abs/2212.09748)；[S138 · Classifier-Free Diffusion Guidance](https://arxiv.org/abs/2207.12598)
