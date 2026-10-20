# EM / Viterbi

概念编号：`concept:em-viterbi` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/em-viterbi/)

## 第一层：概念入门 · 知其然

### 它是什么

EM交替估计隐藏信息与参数；Viterbi在参数固定时找最可能的整条状态路径。

### 先看一个例子

两时刻状态固定为A开头，A→A概率0.6、A→B概率0.4，观测似然均1。

### 理解练习

逐时刻最可能状态一定组成最可能合法路径吗？

<details><summary>答案与解释</summary>

不一定，需同时考虑转移约束与整条路径概率。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. EM的E步求后验期望计数，M步最大化期望完整数据对数似然。
2. Viterbi对前驱取最大并保存指针，边际推断则对前驱概率求和。

### 具体输入与计算步骤

两时刻状态固定为A开头，A→A概率0.6、A→B概率0.4，观测似然均1。

1. 路径AA概率1×0.6×1=0.6，AB为0.4。
2. Viterbi选择AA；两路径概率和1用于总似然而不是一条路径分数。

计算结果：Viterbi选择AA；两路径概率和1用于总似然而不是一条路径分数。

### 换到实际问题中应用

从无状态标注序列学习隐马尔可夫模型。

1. 用前向后向求状态、转移后验期望，再归一化更新参数。
2. 训练结束再用Viterbi解码，区分学参数与找路径。

应用结论：训练结束再用Viterbi解码，区分学参数与找路径。

### 举一反三：改变条件后的完整解答

A→A期望计数3、A→B为1，新转移概率多少？

<details><summary>变式的推演与答案</summary>

1. A出边总期望计数3+1=4。
2. 归一化得3/4、1/4；平滑或先验需另行声明。

归一化得3/4、1/4；平滑或先验需另行声明。

</details>

### 原有解释与进一步例题


### 原理与推演

Latent variables are unobserved internal variables used to explain data—for example, a customer's unknown group given observed spending. EM alternates estimating hidden-variable probabilities under current parameters and updating parameters using those estimates. In a GMM, it repeatedly estimates component memberships and updates the components. Under suitable conditions the objective does not worsen, but a global optimum is not guaranteed.


### 适用边界与常见误解

Estimating model parameters differs from decoding a hidden-state sequence.

### 推导与方法参考

- [一手资料](https://www.cs.ubc.ca/~murphyk/Bayes/rabiner.pdf)

[返回分层目录](00-learning-index.md)
