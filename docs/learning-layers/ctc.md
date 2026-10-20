# CTC — Connectionist Temporal Classification

概念编号：`concept:ctc` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/ctc/)

## 第一层：概念入门 · 知其然

### 它是什么

CTC 是处理输入序列与输出标签没有逐帧对齐信息的一种训练方法。例如知道一句话的文字，但不知道每个字对应哪几帧声音。

### 先看一个例子

同一个字可以在多个音频帧上重复出现，帧间也可出现空白。CTC 按规则折叠帧级路径，得到最终文字，再汇总能产生该文字的多条路径。

### 理解练习

路径 A、空白、A 折叠后，是否与连续的 A、A 一样？

<details><summary>答案与解释</summary>

不一样。CTC 先合并连续重复标签，再移除空白。A、空白、A 得到 AA；连续 A、A 得到 A。次序很关键。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

CTC, connectionist temporal classification, handles tasks where input frames and output labels lack a known alignment. In speech recognition, for example, the transcript may be known without knowing which frames correspond to each sound. CTC sums over possible alignments using a collapse rule that merges consecutive repeated labels before removing a dedicated blank symbol. Label smoothing softens the target distribution to discourage overconfidence. Auxiliary losses add training signals for intermediate representations, load balancing or other goals. Adding a loss does not automatically help; objectives and their weights can conflict.


### 适用边界与常见误解

CTC assumes monotonic alignments and compatible sequence lengths; it does not align arbitrary sequence pairs.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
