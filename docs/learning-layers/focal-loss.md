# Focal Loss

概念编号：`concept:focal-loss` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/focal-loss/)

## 第一层：概念入门 · 知其然

### 它是什么

Focal loss reduces the relative loss contribution of easy, correctly classified samples so that training focuses more on difficult ones. This is useful in object detection, where easy background locations can greatly outnumber objects. Rather than assigning a fixed minority-class weight, it adjusts a sample’s contribution according to the model’s current prediction. Difficult samples may also be mislabeled, so focal loss is not a universal remedy for class imbalance. Assess it alongside label quality, sampling and evaluation metrics.

### 先看一个例子

例子：二元正标签的预测正确类概率为 p_t=0.9，γ=2，忽略 α 时 focal loss=−(1−0.9)²log(0.9)≈0.00105；普通交叉熵约为 0.105。调制项降低容易样本权重，γ 是聚焦强度，不能保证提高所有任务的准确率。

### 理解练习

用自己的话解释：上面的情景为什么是“Focal Loss”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Focal loss reduces the relative loss contribution of easy, correctly classified samples so that training focuses more on difficult ones. This is useful in object detection, where easy background locations can greatly outnumber objects. Rather than assigning a fixed minority-class weight, it adjusts a sample’s contribution according to the model’s current prediction. Difficult samples may also be mislabeled, so focal loss is not a universal remedy for class imbalance. Assess it alongside label quality, sampling and evaluation metrics.

情景依据：例子：二元正标签的预测正确类概率为 p_t=0.9，γ=2，忽略 α 时 focal loss=−(1−0.9)²log(0.9)≈0.00105；普通交叉熵约为 0.105。调制项降低容易样本权重，γ 是聚焦强度，不能保证提高所有任务的准确率。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Focal loss reduces the relative loss contribution of easy, correctly classified samples so that training focuses more on difficult ones. This is useful in object detection, where easy background locations can greatly outnumber objects. Rather than assigning a fixed minority-class weight, it adjusts a sample’s contribution according to the model’s current prediction. Difficult samples may also be mislabeled, so focal loss is not a universal remedy for class imbalance. Assess it alongside label quality, sampling and evaluation metrics.


### 例子

例子：二元正标签的预测正确类概率为 p_t=0.9，γ=2，忽略 α 时 focal loss=−(1−0.9)²log(0.9)≈0.00105；普通交叉熵约为 0.105。调制项降低容易样本权重，γ 是聚焦强度，不能保证提高所有任务的准确率。


### 适用边界与常见误解

Difficult examples may be mislabeled. Emphasizing them does not guarantee better performance.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
