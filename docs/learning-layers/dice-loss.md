# Dice Loss

概念编号：`concept:dice-loss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/dice-loss/)

## 第一层：概念入门 · 知其然

### 它是什么

IoU, intersection over union, measures overlap between predicted and ground-truth regions. Dice is another common overlap measure and can be used to construct a training loss. In medical imaging, a model may miss a small lesion entirely yet achieve high pixel accuracy by correctly predicting the background. Region-overlap metrics make this failure easier to see. Segmentation often combines BCE or cross-entropy with Dice-based objectives to assess both individual pixels and overall overlap. Distinguish differentiable training approximations from the metrics used in formal evaluation.

### 先看一个例子

例子：预测区域有 4 个像素，真实区域有 6 个，交集为 3，则 Dice=2×3/(4+6)=0.6，损失 1−Dice=0.4；IoU=3/(4+6−3)=3/7。空预测与空真值同时出现时分母为零，需事先约定平滑和评分规则。

### 理解练习

用自己的话解释：上面的情景为什么是“Dice Loss”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：IoU, intersection over union, measures overlap between predicted and ground-truth regions. Dice is another common overlap measure and can be used to construct a training loss. In medical imaging, a model may miss a small lesion entirely yet achieve high pixel accuracy by correctly predicting the background. Region-overlap metrics make this failure easier to see. Segmentation often combines BCE or cross-entropy with Dice-based objectives to assess both individual pixels and overall overlap. Distinguish differentiable training approximations from the metrics used in formal evaluation.

情景依据：例子：预测区域有 4 个像素，真实区域有 6 个，交集为 3，则 Dice=2×3/(4+6)=0.6，损失 1−Dice=0.4；IoU=3/(4+6−3)=3/7。空预测与空真值同时出现时分母为零，需事先约定平滑和评分规则。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

IoU, intersection over union, measures overlap between predicted and ground-truth regions. Dice is another common overlap measure and can be used to construct a training loss. In medical imaging, a model may miss a small lesion entirely yet achieve high pixel accuracy by correctly predicting the background. Region-overlap metrics make this failure easier to see. Segmentation often combines BCE or cross-entropy with Dice-based objectives to assess both individual pixels and overall overlap. Distinguish differentiable training approximations from the metrics used in formal evaluation.


### 例子

例子：预测区域有 4 个像素，真实区域有 6 个，交集为 3，则 Dice=2×3/(4+6)=0.6，损失 1−Dice=0.4；IoU=3/(4+6−3)=3/7。空预测与空真值同时出现时分母为零，需事先约定平滑和评分规则。


### 适用边界与常见误解

Smoothing terms and reduction conventions differ across implementations and affect the result.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
