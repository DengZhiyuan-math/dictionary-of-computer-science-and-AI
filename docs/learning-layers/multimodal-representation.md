# Multimodal Representation

概念编号：`concept:multimodal-representation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/multimodal-representation/)

## 第一层：概念入门 · 知其然

### 它是什么

多模态表示把图片、文字、声音等不同形式的信息编码为可比较或可联合处理的向量。

### 先看一个例子

图片里的猫与文字“猫”形式不同，但模型可学到它们应靠近。

### 理解练习

猫图片与文字“猫”形式不同，如何比较？

<details><summary>答案与解释</summary>

分别编码到已对齐向量空间，再用余弦等分数比较，不直接比较原始像素和字符。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 图像编码器g和文本编码器h分别输出向量，并通常归一化。
2. 用配对样本提高相似度、非配对样本降低相似度；学到的接近不等于完整语义等价。

### 具体输入与计算步骤

图片向量(1,0)，文字猫(0.8,0.6)、狗(0,1)，均为单位向量。

1. 点积即余弦：猫0.8、狗0。
2. 按最高相似度选猫。

计算结果：0.8是相似分数，不自动等于80%正确概率。

### 换到实际问题中应用

实现文字搜图片。

1. 预先编码图片并建向量索引，查询文字经文本编码器。
2. 返回近邻并用真实检索任务评估召回及偏差。

应用结论：跨模态对齐质量决定检索效果。

### 举一反三：改变条件后的完整解答

若图片向量变成(0,1)，结果怎样？

<details><summary>变式的推演与答案</summary>

1. 与猫相似0.6，与狗相似1。
2. 最高分变为狗。

表征或输入变化可改变检索排序，需防止域外过度解释。

</details>

### 原有解释与进一步例题


### Word2Vec, GloVe, FastText, Contextual Embedding [Overview]

Word2Vec learns vectors from word–context co-occurrence. GloVe uses global co-occurrence statistics, while FastText adds subword information to handle word forms and unseen words. Their typical word representations are context independent. Contextual embeddings instead give a word different vectors in different sentences, such as apple as a fruit versus Apple as a company. Nearby vectors reflect a learned relationship, not necessarily exact synonymy.


### Contrastive Learning, SimCLR, CLIP [Core]

SimCLR treats different augmented views of the same image as positive pairs and learns a stable visual representation. CLIP brings the matched image and text closer and distinguishes them from other pairs to obtain a cross-modal space. It can use text category descriptions for zero-shot classification or image and text retrieval, but it is not a chat model that is inherently capable of generating long answers. The quality of the training image-text pairs, negative samples, and augmentation design all affect the learned associations.


### BYOL, DINO, Masked Autoencoder [Overview]

BYOL, DINO and related self-distillation approaches train one branch to match a teacher branch’s representation, with teacher updates and mechanisms to prevent collapse. They do not always require explicit negative examples. Masked autoencoders hide much of an input and learn to reconstruct it, emphasizing structural completion. Learning useful representations does not by itself produce an instruction-following agent; downstream interfaces still need training.


### VLM, Projector, Cross-Attention [Core]

Vision–language models connect a visual encoder to language capabilities. A projector maps visual features into representations accepted by a language model; cross-attention offers another interaction mechanism. Image resolution, visual-token count and cropping affect recognition of small text and fine details. OCR recognizes text; broader visual understanding also includes positions, relationships and scenes. They are not interchangeable.


### ASR, CTC, Transducer, Vocoder [Overview]

ASR converts speech to text using approaches such as CTC, encoder–decoder models or transducers. Transducers commonly support streaming recognition with different input and output lengths. TTS converts text to speech; a vocoder converts acoustic representations to waveforms. A mel spectrogram is a common time–frequency representation; codec tokens encode audio as discrete units. Word error rate, or WER, measures transcription errors, not tone, timbre or speech naturalness.


### Video Token, Temporal Consistency, Optical Flow [Overview]

Video requires modeling change over time, not merely processing more images. Temporal consistency concerns whether objects maintain their identity, appearance and plausible motion. Optical flow estimates local visual motion and supports tracking and video analysis, though camera movement and occlusion complicate interpretation. Coherent-looking generated video can still violate contact mechanics, gravity or action–outcome relationships. Distinguish visual quality from physical prediction.


### Point Cloud, NeRF, Gaussian Splatting [Overview]

Point clouds represent scenes with 3D points and additional attributes. NeRF learns a spatially and view-dependent radiance field to render novel views. 3D Gaussian splatting represents and renders scenes efficiently with optimizable spatial Gaussian primitives. These solve 3D representation and view synthesis, rather than necessarily learning how forces move objects. Static reconstruction, interactive world modeling and robot control are distinct levels.


### 适用边界与常见误解

Embedding similarity, cross-modal understanding, and reliable action are distinct evaluation goals.

### 例题：Cross-Modal Representation: Cosine Similarity Is Not Fact-Checking

Use image vector [1,0] and text vectors [2,0] and [1,1] to illustrate vector comparison only.

1. The image’s cosine similarity with the first text is 2/(1×2)=1; with the second it is 1/√2≈0.707.
2. After normalization, the first text vector is [1,0] and the second is approximately [.707,.707]. Their dot products with the image vector equal cosine similarities.
3. Scaling the first text vector to [20,0] still gives cosine 1, showing invariance to positive rescaling of vector magnitude.

结果：Shared representations turn cross-modal retrieval into a nearest-vector problem. These artificial vectors neither train nor validate a real image–text model.

易错点：Similarity is not correctness or probability. Cosine for a zero vector is undefined. Models can still misread negation, quantities and detailed spatial relationships.

变式：What is the cosine for text vector [-1,0]?

参考答案：-1, indicating opposite direction. Semantic interpretation still depends on the learned space.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/2103.00020)

[返回分层目录](00-learning-index.md)
