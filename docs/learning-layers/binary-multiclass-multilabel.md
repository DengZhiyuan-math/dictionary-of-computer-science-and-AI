# Binary / Multiclass / Multilabel

概念编号：`concept:binary-multiclass-multilabel` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/binary-multiclass-multilabel/)

## 第一层：概念入门 · 知其然

### 它是什么

Binary classification answers a yes/no question, such as whether an email is spam. Multiclass single-label classification chooses one of several mutually exclusive answers, such as cat, dog, or bird as the main species. Multilabel classification allows several answers simultaneously, such as both cats and dogs in an image. It usually assigns each label a separate probability without requiring them to sum to one. This distinction directly affects the output layer and loss; class count alone cannot determine whether BCE or mutually exclusive categorical cross-entropy is appropriate.

### 先看一个例子

例子：邮件是否垃圾是二分类；把一张图只归为猫、狗、鸟之一是多类单标签；同一图片同时标注“猫”和“室内”是多标签。最后一种允许多个真标签，不能直接强制所有类别概率像单标签 softmax 那样总和为 1。

### 理解练习

用自己的话解释：上面的情景为什么是“Binary / Multiclass / Multilabel”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Binary classification answers a yes/no question, such as whether an email is spam. Multiclass single-label classification chooses one of several mutually exclusive answers, such as cat, dog, or bird as the main species. Multilabel classification allows several answers simultaneously, such as both cats and dogs in an image. It usually assigns each label a separate probability without requiring them to sum to one. This distinction directly affects the output layer and loss; class count alone cannot determine whether BCE or mutually exclusive categorical cross-entropy is appropriate.

情景依据：例子：邮件是否垃圾是二分类；把一张图只归为猫、狗、鸟之一是多类单标签；同一图片同时标注“猫”和“室内”是多标签。最后一种允许多个真标签，不能直接强制所有类别概率像单标签 softmax 那样总和为 1。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Binary classification answers a yes/no question, such as whether an email is spam. Multiclass single-label classification chooses one of several mutually exclusive answers, such as cat, dog, or bird as the main species. Multilabel classification allows several answers simultaneously, such as both cats and dogs in an image. It usually assigns each label a separate probability without requiring them to sum to one. This distinction directly affects the output layer and loss; class count alone cannot determine whether BCE or mutually exclusive categorical cross-entropy is appropriate.


### 例子

例子：邮件是否垃圾是二分类；把一张图只归为猫、狗、鸟之一是多类单标签；同一图片同时标注“猫”和“室内”是多标签。最后一种允许多个真标签，不能直接强制所有类别概率像单标签 softmax 那样总和为 1。


### 适用边界与常见误解

Determine the task semantics before selecting outputs and loss.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
