# Multimodal Representation

概念编号：`concept:multimodal-representation` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/multimodal-representation/)

## 第一层：概念入门 · 知其然

### 定义

多模态表示是把来自不同信息形式的数据，如文字、图像和声音，转换成便于模型联合处理的数值表示。负责转换的模型称为编码器。不同模态可以映射到共同的向量空间以比较匹配程度，也可以保留各自表示再组合；两种设计都不意味着文字向量的每个坐标天然对应图像的同一含义。

### 概念边界与常见混淆

表示维度相同并不表示已经对齐；对齐依赖训练目标和数据。高相似度也不保证事实正确、细节齐全或适合另一任务，尤其在训练中罕见的组合上。

### 先看一个例子

做文字搜图时，把“红色自行车”编码成向量，把候选图片也编码成向量，再按训练所规定的相似度排序。训练可以用真实图文对提高匹配对的相似度、降低不匹配对的相对相似度。若一张红车图比一张蓝车图得分高，这只是模型在这个任务上的匹配判断，并非逐字验证了每个对象和属性。

### 理解练习

#### 1. 形状与语义

任意两个模型分别输出 512 个数，就可以直接拿来图文检索吗？

<details><summary>答案与解释</summary>

不能。相同长度只保证算术操作可能定义；需要训练或校准建立跨模态可比较的关系。

</details>

#### 2. 相似度含义

最高分图片里缺了一只车轮，是否与“匹配分数高”逻辑矛盾？

<details><summary>答案与解释</summary>

不矛盾。分数反映模型学到的整体匹配，不是所有细节约束的证明；需要额外核查轮子这样的具体要求。

</details>

#### 3. 设计选择

把文字和图片的表示直接拼接是否也可能属于多模态表示？

<details><summary>答案与解释</summary>

可以，若下游模型联合使用它们。共同向量空间是检索常用设计，不是所有多模态系统必须满足的定义。

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
