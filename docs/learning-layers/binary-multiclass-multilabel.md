# Binary / Multiclass / Multilabel

概念编号：`concept:binary-multiclass-multilabel` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/binary-multiclass-multilabel/)

## 第一层：概念入门 · 知其然

### 它是什么

二分类选两者之一，多分类选多个类别中的一个，多标签允许同时选多个。

### 先看一个例子

图片里同时有猫与狗，用标签向量[1,1,0]表示猫、狗、鸟。

### 理解练习

这里能用“只能选一个动物”的目标吗？

<details><summary>答案与解释</summary>

不能，两个标签同时成立，属于多标签问题。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 互斥多分类用概率总和为1的分布描述唯一类别。
2. 多标签为每个标签建一个独立二元目标，输出总和没有必须为1的要求。

### 具体输入与计算步骤

图片里同时有猫与狗，用标签向量[1,1,0]表示猫、狗、鸟。

1. 概率[0.8,0.7,0.1]用阈值0.5逐项比较，得到[1,1,0]。
2. 若强制argmax，只留下猫，会漏掉狗这个正确标签。

计算结果：若强制argmax，只留下猫，会漏掉狗这个正确标签。

### 换到实际问题中应用

给文章标注金融、编程、旅行主题。

1. 先确认主题是否可以重叠；允许重叠时使用三个独立输出。
2. 用逐标签BCE训练并分别验证阈值，输出可为空或多个主题。

应用结论：用逐标签BCE训练并分别验证阈值，输出可为空或多个主题。

### 举一反三：改变条件后的完整解答

若任务改成图片主色只能选红、绿、蓝之一呢？

<details><summary>变式的推演与答案</summary>

1. 标签从集合变成一个类别索引。
2. 使用3维互斥分布与多类交叉熵，推理取最大概率类别。

使用3维互斥分布与多类交叉熵，推理取最大概率类别。

</details>

### 原有解释与进一步例题


### 原理与推演

Binary classification answers a yes/no question, such as whether an email is spam. Multiclass single-label classification chooses one of several mutually exclusive answers, such as cat, dog, or bird as the main species. Multilabel classification allows several answers simultaneously, such as both cats and dogs in an image. It usually assigns each label a separate probability without requiring them to sum to one. This distinction directly affects the output layer and loss; class count alone cannot determine whether BCE or mutually exclusive categorical cross-entropy is appropriate.


### 例子

例子：邮件是否垃圾是二分类；把一张图只归为猫、狗、鸟之一是多类单标签；同一图片同时标注“猫”和“室内”是多标签。最后一种允许多个真标签，不能直接强制所有类别概率像单标签 softmax 那样总和为 1。


### 适用边界与常见误解

Determine the task semantics before selecting outputs and loss.

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/multiclass.html)

[返回分层目录](00-learning-index.md)
