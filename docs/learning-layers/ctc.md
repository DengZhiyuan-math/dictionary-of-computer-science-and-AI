# CTC — Connectionist Temporal Classification

概念编号：`concept:ctc` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/ctc/)

## 第一层：概念入门 · 知其然

### 定义

连接时序分类（CTC）用于输入序列与输出符号之间的逐步对齐未知、但顺序保持的序列学习，例如声音转写文字。输入步数必须足以容纳目标，允许与无相邻重复的输出等长。模型每步给出符号及空白符的概率；一条对齐路径先合并连续重复符号，再去掉空白，得到输出序列。CTC对能折叠成目标文本的全部路径概率求和，而不是预先指定每个声音时刻的文字标签。

### 概念边界与常见混淆

CTC 保留输出的时间顺序，不能随意重排文字；相邻重复输出需要足够步骤及分隔。逐步取最大符号再折叠是一种简单解码，不保证得到总路径概率最大的文本。

### 先看一个例子

用 _ 表示空白。路径 A,A,_,B 折叠后是 AB；路径 A,_,A 则是 AA，因为两个 A 被空白分隔，合并重复发生在去空白之前。若目标是 AB，前一种路径是有效候选，但模型还必须把其他产生 AB 的路径也计入目标概率。

### 理解练习

#### 1. 折叠顺序

A,_,A 去空白后再合并为 A，是否遵守这里的规则？

<details><summary>答案与解释</summary>

不遵守。应先合并连续重复，两个 A 原本不连续，所以最终为 AA。顺序改变了标签含义。

</details>

#### 2. 多个对齐

目标 AB 只能由 A,_,B 这一条路径产生吗？

<details><summary>答案与解释</summary>

不是，A,A,B 或 _,A,B 等也可能产生 AB，前提是输入步数相应。训练汇总所有有效对齐。

</details>

#### 3. 局部与整体

每步最高概率形成的路径，折叠文本一定最可能吗？

<details><summary>答案与解释</summary>

不一定。另一文本可能有许多稍低概率路径，合计概率更高；单条最优路径与文本的路径总概率不同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 独立帧路径概率由各帧概率相乘，目标概率由合法路径求和。
2. 动态规划按时间与目标位置递推，重复字符必须用空白隔开。

### 具体输入与计算步骤

两帧各有P(A)=0.6、P(空白)=0.4。

1. 输出A的路径AA、A空白、空白A概率为0.36、0.24、0.24。
2. 总概率0.84，损失−ln0.84≈0.1744。

计算结果：总概率0.84，损失−ln0.84≈0.1744。

### 换到实际问题中应用

训练没有逐帧字标注的语音识别器。

1. 网络输出每帧字母与空白分布，对给定文本汇总合法对齐。
2. 用束搜索比较折叠后序列；逐帧贪心未必产生概率最高的文本。

应用结论：用束搜索比较折叠后序列；逐帧贪心未必产生概率最高的文本。

### 举一反三：改变条件后的完整解答

两帧能输出目标AA吗？

<details><summary>变式的推演与答案</summary>

1. AA会折叠为A，需路径A空白A才保留重复。
2. 至少三帧，因此两帧下该目标不可达。

至少三帧，因此两帧下该目标不可达。

</details>

### 原有解释与进一步例题


### 原理与推演

CTC, connectionist temporal classification, handles tasks where input frames and output labels lack a known alignment. In speech recognition, for example, the transcript may be known without knowing which frames correspond to each sound. CTC sums over possible alignments using a collapse rule that merges consecutive repeated labels before removing a dedicated blank symbol. Label smoothing softens the target distribution to discourage overconfidence. Auxiliary losses add training signals for intermediate representations, load balancing or other goals. Adding a loss does not automatically help; objectives and their weights can conflict.


### 适用边界与常见误解

CTC assumes monotonic alignments and compatible sequence lengths; it does not align arbitrary sequence pairs.

### 推导与方法参考

- [一手资料](https://www.cs.toronto.edu/~graves/icml_2006.pdf)

[返回分层目录](00-learning-index.md)
