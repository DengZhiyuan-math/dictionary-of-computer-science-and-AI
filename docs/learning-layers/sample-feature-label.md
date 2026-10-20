# Sample / Feature / Label

概念编号：`concept:sample-feature-label` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sample-feature-label/)

## 第一层：概念入门 · 知其然

### 它是什么

A sample is one example, such as an order. A feature is information available for prediction, such as price or a user's previous view count. A label is a supervised answer, such as whether the order was later canceled. Target is a broader term for the value or content the model is trained to predict or reconstruct: a class, number, next text segment, or image. Labels need not be manually annotated: next-word prediction gets its answers from the text itself. Distinguish answers available during training from information available at prediction time. If an answer unavailable at prediction time enters the input during training or evaluation, it causes data leakage.

### 先看一个例子

If an answer unavailable at prediction time enters the input during training or evaluation, it causes data leakage.

### 理解练习

用自己的话解释：上面的情景为什么是“Sample / Feature / Label”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A sample is one example, such as an order. A feature is information available for prediction, such as price or a user's previous view count. A label is a supervised answer, such as whether the order was later canceled. Target is a broader term for the value or content the model is trained to predict or reconstruct: a class, number, next text segment, or image. Labels need not be manually annotated: next-word prediction gets its answers from the text itself. Distinguish answers available during training from information available at prediction time. If an answer unavailable at prediction time enters the input during training or evaluation, it causes data leakage.

情景依据：If an answer unavailable at prediction time enters the input during training or evaluation, it causes data leakage.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A sample is one example, such as an order. A feature is information available for prediction, such as price or a user's previous view count. A label is a supervised answer, such as whether the order was later canceled. Target is a broader term for the value or content the model is trained to predict or reconstruct: a class, number, next text segment, or image. Labels need not be manually annotated: next-word prediction gets its answers from the text itself. Distinguish answers available during training from information available at prediction time. If an answer unavailable at prediction time enters the input during training or evaluation, it causes data leakage.


### 适用边界与常见误解

Information unavailable at prediction time causes leakage if included among features.

### 领域应用

- [Label Availability · 金融标签的可用时间](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-label-availability.md)：在样本、特征和标签的基础上，明确未来收益标签何时完成、何时可以进入历史训练。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
