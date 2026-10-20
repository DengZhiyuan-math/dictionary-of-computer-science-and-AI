# VAE / GAN / Diffusion

概念编号：`concept:vae-gan-diffusion` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/vae-gan-diffusion/)

## 第一层：概念入门 · 知其然

### 定义

VAE、GAN与扩散模型都是生成模型，但训练机制不同。VAE学习把数据编码为潜变量分布并从潜变量重建数据，通过变分目标约束表示与先验。GAN让生成器产生样本、判别器区分真实与生成，两者竞争训练。扩散模型对数据逐渐加噪，学习相应反向去噪过程，再由噪声逐步生成样本。

### 概念边界与常见混淆

视觉逼真不等于覆盖全部数据变化或记住真实规律。模式缺失、重建损失与感知差异、生成成本各有权衡，不能凭模型类别保证最佳质量。

### 先看一个例子

生成手写数字时，VAE可采样潜向量后解码；GAN把随机输入送入生成器，判别器在训练时提供信号而非逐笔描画；扩散通常从噪声图开始多次去噪。三者都能生成相似数据，但生成步骤和训练评价不能直接互换。

### 理解练习

#### 1. 判别器

普通GAN生成新图时一定要判别器逐像素参与吗？

<details><summary>答案与解释</summary>

通常不需要，生成器可独立产生图，判别器主要参与训练信号。

</details>

#### 2. 潜变量

VAE只生成一个确定编码而从无分布，就完整描述其机制吗？

<details><summary>答案与解释</summary>

不完整，近似后验分布、采样与先验约束是关键部分。

</details>

#### 3. 去噪

扩散一步输出不清楚就说明所有后续也不行吗？

<details><summary>答案与解释</summary>

不能，它是迭代过程，中间状态并非最终样本；仍需检查完整输出。

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
