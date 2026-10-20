# CTC — Connectionist Temporal Classification

概念编号：`concept:ctc` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/ctc/)

## 第一层：概念入门 · 知其然

### 它是什么

CTC在不知道逐帧对应时，把折叠后得到同一文本的所有对齐概率相加。

### 先看一个例子

两帧各有P(A)=0.6、P(空白)=0.4。

### 理解练习

路径AA会输出两个A吗？

<details><summary>答案与解释</summary>

不会，先合并连续重复，再去空白，得到一个A。

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
