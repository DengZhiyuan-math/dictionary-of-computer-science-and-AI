# EM / Viterbi

概念编号：`concept:em-viterbi` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/em-viterbi/)

## 第一层：概念入门 · 知其然

### 定义

EM 与 Viterbi 解决不同问题。EM 用于有隐变量的概率模型参数估计：在当前参数下计算未观测部分的条件分布，再据此改进参数，交替迭代。Viterbi 则在模型参数给定、序列状态满足相应依赖结构时，寻找整条联合概率最大的隐藏状态路径。隐变量是模型包含但没有直接观察到的量；估计模型参数与推断一次序列的状态不能混同。

### 概念边界与常见混淆

普通 EM 不等于每轮把隐变量固定成一个最可能答案；它通常对条件分布求期望。EM 也可能停在局部最优，Viterbi 的最优路径则是相对于给定模型，不保证真实隐藏过程就是该路径。

### 先看一个例子

只观察到每天是否带伞，想估计“晴雨如何转换、不同天气带伞概率多少”，这些未知概率可以用 EM 学习。已有这些概率后，给定一周带伞记录，再找最可能的一周天气路径，是 Viterbi 的任务。单独挑每天最可能的天气，不一定组成联合概率最大的整周路径，因为天气转换概率也参与评分。

### 理解练习

#### 1. 未知量区别

天气转换概率完全已知，只求一周最可能天气序列，需要用 EM 重新估计吗？

<details><summary>答案与解释</summary>

不需要。当前问题是给定参数下的路径推断，可用满足结构条件的 Viterbi，而不是参数学习。

</details>

#### 2. 期望与硬选择

EM 的 E 步是否总是只留一个最可能隐状态？

<details><summary>答案与解释</summary>

不是。标准 EM 使用当前参数下的条件分布来计算期望；硬选择是不同变体，不能替代定义。

</details>

#### 3. 模型最优

Viterbi 最优路径是否足以证明模型拟合正确？

<details><summary>答案与解释</summary>

不能。即使模型错误也能有最优路径，应另检查模型假设和数据适配性。

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
