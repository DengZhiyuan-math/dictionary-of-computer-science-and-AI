# VAE / GAN / Diffusion

概念编号：`concept:vae-gan-diffusion` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/vae-gan-diffusion/)

## 第一层：概念入门 · 知其然

### 它是什么

VAE学习潜变量分布，GAN让生成器与判别器竞争，扩散模型学习逐步去噪生成。

### 先看一个例子

简化加噪xₜ=√αx₀+√(1−α)ε，x₀=2、α=0.25、ε=0。

### 理解练习

三者只是同一个损失换名字吗？

<details><summary>答案与解释</summary>

不是，训练目标和生成机制不同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. VAE优化重构与分布约束的下界；GAN优化对抗目标。
2. 扩散先按已知过程加噪，再训练网络估计去噪所需信息，采样时逆向迭代。

### 具体输入与计算步骤

简化加噪xₜ=√αx₀+√(1−α)ε，x₀=2、α=0.25、ε=0。

1. √α=0.5，xₜ=0.5×2+√0.75×0=1。
2. 若已知ε=0，可反解x₀=(1−0)/0.5=2；实际模型需估计未知噪声。

计算结果：若已知ε=0，可反解x₀=(1−0)/0.5=2；实际模型需估计未知噪声。

### 换到实际问题中应用

选择图像生成模型。

1. 按质量、覆盖度、训练稳定性与采样延迟比较，而非只看单张最好样本。
2. 用独立数据与固定采样协议评估，并检查重复训练图像。

应用结论：用独立数据与固定采样协议评估，并检查重复训练图像。

### 举一反三：改变条件后的完整解答

若ε改为1，同样参数的xₜ多少？

<details><summary>变式的推演与答案</summary>

1. xₜ=1+√0.75。
2. 约1.866；不能简单把xₜ除0.5还原，必须扣除噪声项。

约1.866；不能简单把xₜ除0.5还原，必须扣除噪声项。

</details>

### 原有解释与进一步例题


### 原理与推演

A VAE maps observations through an encoder to a probability distribution over latent variables, then reconstructs or generates samples with a decoder. Training combines reconstruction with constraints on the latent distribution, making sampling from a simple prior useful. The distinguishing feature is probabilistic latent-variable modeling, not merely dimensionality reduction. Latent variables can be ignored in some settings, so check what information the model actually uses.


### 例子

例子：生成一张图时，VAE 可先抽潜变量再解码，GAN 用生成器把噪声映射为图像，扩散模型从噪声开始多步去噪。三者即使输出同尺寸图像，训练目标与采样步骤也不同，不能把扩散的去噪步数解释成 VAE 的网络层数。


### 适用边界与常见误解

Just because they can all generate images does not mean that the training mechanisms are the same.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/1312.6114)
- [一手资料](https://arxiv.org/abs/1406.2661)
- [一手资料](https://arxiv.org/abs/2006.11239)

[返回分层目录](00-learning-index.md)
