# VAE / GAN / Diffusion

概念编号：`concept:vae-gan-diffusion` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/vae-gan-diffusion/)

## 第一层：概念入门 · 知其然

### 它是什么

A VAE maps observations through an encoder to a probability distribution over latent variables, then reconstructs or generates samples with a decoder. Training combines reconstruction with constraints on the latent distribution, making sampling from a simple prior useful. The distinguishing feature is probabilistic latent-variable modeling, not merely dimensionality reduction. Latent variables can be ignored in some settings, so check what information the model actually uses.

### 先看一个例子

例子：生成一张图时，VAE 可先抽潜变量再解码，GAN 用生成器把噪声映射为图像，扩散模型从噪声开始多步去噪。三者即使输出同尺寸图像，训练目标与采样步骤也不同，不能把扩散的去噪步数解释成 VAE 的网络层数。

### 理解练习

用自己的话解释：上面的情景为什么是“VAE / GAN / Diffusion”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A VAE maps observations through an encoder to a probability distribution over latent variables, then reconstructs or generates samples with a decoder. Training combines reconstruction with constraints on the latent distribution, making sampling from a simple prior useful. The distinguishing feature is probabilistic latent-variable modeling, not merely dimensionality reduction. Latent variables can be ignored in some settings, so check what information the model actually uses.

情景依据：例子：生成一张图时，VAE 可先抽潜变量再解码，GAN 用生成器把噪声映射为图像，扩散模型从噪声开始多步去噪。三者即使输出同尺寸图像，训练目标与采样步骤也不同，不能把扩散的去噪步数解释成 VAE 的网络层数。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A VAE maps observations through an encoder to a probability distribution over latent variables, then reconstructs or generates samples with a decoder. Training combines reconstruction with constraints on the latent distribution, making sampling from a simple prior useful. The distinguishing feature is probabilistic latent-variable modeling, not merely dimensionality reduction. Latent variables can be ignored in some settings, so check what information the model actually uses.


### 例子

例子：生成一张图时，VAE 可先抽潜变量再解码，GAN 用生成器把噪声映射为图像，扩散模型从噪声开始多步去噪。三者即使输出同尺寸图像，训练目标与采样步骤也不同，不能把扩散的去噪步数解释成 VAE 的网络层数。


### 适用边界与常见误解

Just because they can all generate images does not mean that the training mechanisms are the same.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
