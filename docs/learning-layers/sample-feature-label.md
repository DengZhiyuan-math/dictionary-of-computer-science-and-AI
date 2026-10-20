# Sample / Feature / Label

概念编号：`concept:sample-feature-label` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/sample-feature-label/)

## 第一层：概念入门 · 知其然

### 它是什么

样本是一条待学习记录，特征是预测时输入的信息，标签是希望预测的答案。

### 先看一个例子

3套房屋，每套用面积和房龄预测房价。

### 理解练习

房价同时放入输入会怎样？

<details><summary>答案与解释</summary>

若部署时不知道它，就是答案泄漏。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 把每个样本排成一行，特征为列，形成X形状(N,F)。
2. 标签与行顺序严格对应，乱序应对X和y应用同一置换。

### 具体输入与计算步骤

3套房屋，每套用面积和房龄预测房价。

1. N=3、F=2，X形状(3,2)，共有6个特征数值。
2. 单目标回归标签y形状通常为(3,)或按接口为(3,1)。

计算结果：单目标回归标签y形状通常为(3,)或按接口为(3,1)。

### 换到实际问题中应用

构建学生成绩预测数据。

1. 仅放入预测时已知的出勤、作业等特征，最终成绩作为标签。
2. 按学生或时间切分，并检查特征与标签一一对齐。

应用结论：按学生或时间切分，并检查特征与标签一一对齐。

### 举一反三：改变条件后的完整解答

若每人有2个待预测成绩，y形状怎样？

<details><summary>变式的推演与答案</summary>

1. 每个样本对应两个输出。
2. 3样本时y为(3,2)，不能误把第二目标当成第四个样本。

3样本时y为(3,2)，不能误把第二目标当成第四个样本。

</details>

### 原有解释与进一步例题


### 原理与推演

A sample is one example, such as an order. A feature is information available for prediction, such as price or a user's previous view count. A label is a supervised answer, such as whether the order was later canceled. Target is a broader term for the value or content the model is trained to predict or reconstruct: a class, number, next text segment, or image. Labels need not be manually annotated: next-word prediction gets its answers from the text itself. Distinguish answers available during training from information available at prediction time. If an answer unavailable at prediction time enters the input during training or evaluation, it causes data leakage.


### 适用边界与常见误解

Information unavailable at prediction time causes leakage if included among features.

### 领域应用

- [Label Availability · 金融标签的可用时间](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-label-availability.md)：在样本、特征和标签的基础上，明确未来收益标签何时完成、何时可以进入历史训练。

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/user_guide.html)

[返回分层目录](00-learning-index.md)
