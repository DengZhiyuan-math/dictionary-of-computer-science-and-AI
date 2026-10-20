# Dice Loss

概念编号：`concept:dice-loss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dice-loss/)

## 第一层：概念入门 · 知其然

### 定义

Dice 系数衡量两个集合的重叠，等于交集大小的两倍除以两个集合大小之和。分割任务把像素划为目标或背景，Dice 损失常定义为 1 减 Dice 系数；可训练版本用连续预测概率代替硬集合计数，形成可求导的近似。它与逐像素正确率关注不同，尤其能显示稀少目标是否被覆盖。

### 概念边界与常见混淆

预测和真实目标都为空时原分式为 0/0，需要明确约定或平滑处理。Dice 数值也不直接描述目标形状、边界误差或不同类别的重要性。

### 先看一个例子

图中 100 个像素，真实目标 10 个；预测目标 8 个，其中 6 个正确。交集为 6，Dice=12/(10+8)=2/3。若全预测背景，像素正确率仍为 90%，但 Dice 为 0，因为没有找到目标。连续版本、平滑项及多类平均方式应在实际训练中另外注明。

### 理解练习

#### 1. 交集计数

预测的 8 个像素里有 2 个错误，Dice 分母是否只放 6？

<details><summary>答案与解释</summary>

不是，分母包含全部预测大小 8 和真实大小 10。只放正确部分会忽略误报，错误地提高分数。

</details>

#### 2. 背景优势

全报背景有 90% 准确率，能否说目标分割良好？

<details><summary>答案与解释</summary>

不能，目标全漏。总体准确率由背景占比主导，Dice 的 0 揭示这个缺陷。

</details>

#### 3. 空集合

两者都没有目标，能直接用 0/0 得到数值 1 吗？

<details><summary>答案与解释</summary>

不能，数学表达未定义。可以按任务约定把完全空匹配记为 1，但应明确这是规则而非分式运算结果。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. Dice=2×交集/(预测大小+真值大小)，完全重合为1。
2. 训练常用可微概率替代离散集合，损失1−Dice，并明确平滑与空集约定。

### 具体输入与计算步骤

预测4像素、真值2像素、交集2像素。

1. Dice=2×2/(4+2)=2/3。
2. 损失1−2/3=1/3，两个误报像素降低得分。

计算结果：损失1−2/3=1/3，两个误报像素降低得分。

### 换到实际问题中应用

分割小病灶。

1. 明确按样本或按类计算软Dice，再声明平均方式。
2. 同时核查像素交叉熵与空病灶病例，避免只优化平均重叠。

应用结论：同时核查像素交叉熵与空病灶病例，避免只优化平均重叠。

### 举一反三：改变条件后的完整解答

预测和真值都为空时原公式如何？

<details><summary>变式的推演与答案</summary>

1. 分子分母均0，产生未定义的0/0。
2. 必须声明空集得分或平滑方案，并在训练评估保持一致。

必须声明空集得分或平滑方案，并在训练评估保持一致。

</details>

### 原有解释与进一步例题


### 原理与推演

IoU, intersection over union, measures overlap between predicted and ground-truth regions. Dice is another common overlap measure and can be used to construct a training loss. In medical imaging, a model may miss a small lesion entirely yet achieve high pixel accuracy by correctly predicting the background. Region-overlap metrics make this failure easier to see. Segmentation often combines BCE or cross-entropy with Dice-based objectives to assess both individual pixels and overall overlap. Distinguish differentiable training approximations from the metrics used in formal evaluation.


### 例子

例子：预测区域有 4 个像素，真实区域有 6 个，交集为 3，则 Dice=2×3/(4+6)=0.6，损失 1−Dice=0.4；IoU=3/(4+6−3)=3/7。空预测与空真值同时出现时分母为零，需事先约定平滑和评分规则。


### 适用边界与常见误解

Smoothing terms and reduction conventions differ across implementations and affect the result.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/1606.04797)

[返回分层目录](00-learning-index.md)
