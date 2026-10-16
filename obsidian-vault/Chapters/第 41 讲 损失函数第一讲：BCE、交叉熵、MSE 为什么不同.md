---
title: "第 41 讲 · 损失函数第一讲：BCE、交叉熵、MSE 为什么不同"
aliases: []
tags: ["chapter","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/损失、训练与优化|损失、训练与优化]]

## 本讲概念

- [[Concepts/二元交叉熵|二元交叉熵]]
- [[Concepts/融合 Sigmoid 的二元交叉熵|融合 Sigmoid 的二元交叉熵]]
- [[Concepts/交叉熵／负对数似然|交叉熵／负对数似然]]
- [[Concepts/Huber 损失|Huber 损失]]
- [[Concepts/损失／目标函数／评价指标|损失／目标函数／评价指标]]
- [[Concepts/均方／绝对／均方根误差|均方／绝对／均方根误差]]

## 具体案例与可视化

- [[Examples/12 BCE：同样判错，损失差多少|案例 12 · BCE：同样判错，损失差多少]]

<a id="chapter-41"></a>

## 第 41 讲｜损失函数第一讲：BCE、交叉熵、MSE 为什么不同

领域：训练微知识点 · 细讲

<a id="chapter-41-section-01"></a>

### Loss、Objective 与 Metric【重点精学】

Loss，损失，给模型的错误打分，是训练时希望改善的对象。Objective，目标函数，可能还包含正则化等额外要求。Metric，评估指标，告诉我们效果是否符合任务需要。训练目标和汇报指标可以不同：例如用 BCE 训练是否购买的概率预测器，上线时关注精确率或实际转化效果。选择一种可优化的损失，只是为了让训练有方向，不保证它与最终业务目标完全一致。

<a id="chapter-41-section-02"></a>

### BCE，Binary Cross-Entropy，二元交叉熵【重点精学】

BCE 常用于二分类以及逐标签的多标签学习。它比较模型给出的概率与目标标签，不只是数有多少个类别判对了。可以把它理解为对概率预测的评分：支持真实答案的概率越低，受到的惩罚越大。

举一个例子。一封邮件实际是垃圾邮件。模型甲认为它是垃圾邮件的概率为百分之四十九；模型乙认为只有百分之一。如果用百分之五十作为分类阈值，两者都判错，准确率无法区分这两次错误。但模型乙几乎否定了真实答案，比模型甲更加自信地犯错，BCE 会给予它更大惩罚。这个例子说明，概率预测质量和最后的硬分类结果是两件事。

对于多标签图片识别，可以分别判断“有没有猫”“有没有狗”“有没有汽车”，并组合各个标签的 BCE。分别计算损失不意味着这些标签在真实世界里完全独立；共享的网络依然可以利用它们的相关信息。相反，如果答案要求在猫、狗、鸟中只能选一种，就要考虑互斥类别的建模方式。

<a id="chapter-41-section-03"></a>

### BCELoss 与 BCEWithLogitsLoss【重点】

看到 BCELoss，通常意味着输入已经是概率。看到 BCEWithLogitsLoss，意味着直接接收原始分数，把 Sigmoid 与 BCE 合在内部计算。这种融合有助于数值稳定，避免先得到极端概率后再计算带来的问题。使用后者时一般不应在外面重复做一次 Sigmoid。面试不必记 API，但要能解释：名字里 WithLogits 表示它接收的是概率变换之前的分数。

<a id="chapter-41-section-04"></a>

### Cross-Entropy 与 Negative Log-Likelihood【重点】

交叉熵不是 BCE 的竞争对手；BCE 本身就是二元情形下的交叉熵。在日常训练代码里，CrossEntropyLoss 常指接收多个类别原始分数、内部完成相应归一化的分类损失。典型场景是每个样本只有一个正确类别。语言模型预测下一 Token，也常使用这种词表范围的分类目标。NLL，负对数似然，表达的是不要让真实观察在模型看来过于不可能。离散分类的交叉熵和 NLL 有密切联系，但这不意味着所有模型的似然目标都只是分类。

<a id="chapter-41-section-05"></a>

### MSE、MAE 与 RMSE【重点】

MSE，均方误差，常用于连续值预测，并对特别大的误差给予较强惩罚。MAE，平均绝对误差，把偏离真实值的大小直接作为错误量，对极端误差相对不那么敏感。RMSE 是 MSE 换回与目标相同单位后的常用评估量。预测温度时，听到平均差几度通常比一个平方单位的数更直观。它们也可以在合适的其他模型中使用，不是只有名叫线性回归的算法才能使用。

<a id="chapter-41-section-06"></a>

### Huber Loss 与 Quantile Loss【认识】

Huber 在误差较小时像平方误差，在误差很大时更接近绝对误差，兼顾平滑性和对异常值的稳健性。Quantile loss，也叫分位数损失或 pinball loss，允许对高估与低估施加不同代价，训练某个条件分位数。例如库存规划不一定只需要平均需求，也可能需要一个较保守的高需求分位数。选择损失首先取决于希望预测什么，以及不同错误的代价，而不是哪种缩写更流行。

面试口述：BCE 用于二元概率预测，尤其惩罚自信地预测错误；互斥多类别通常用对应的交叉熵；连续数值预测可以比较 MSE、MAE 或 Huber。模型架构与损失函数是不同层次，同一种网络可以搭配不同目标。

<a id="chapter-41-section-07"></a>

### BCE 数值例题：同样判错，损失为什么不同【重点】

沿用垃圾邮件例子，真实标签为一。使用自然对数时，单个样本的 BCE 就是预测正类概率的负对数。概率为零点四九，损失约为零点七一三；概率为零点零一，损失约为四点六零五。两者在百分之五十阈值下都判错，但后者损失约为前者的六点五倍。这个倍数来自损失数值，不代表业务损失必然也是六点五倍。

真实标签为零时，评分的是负类概率，也就是一减去预测正类概率。概率恰为零或一时，直接取对数可能遇到数值问题；实际训练优先采用接收 logits 的稳定实现。BCE 也允许零到一之间的软目标，不能把接口要求简化成标签只能是整数。

<a id="chapter-41-section-08"></a>

### 输入契约：先看任务，再对齐 Shape 与 Dtype【重点精学】

以普通批量分类为例，单 logit 二分类的输出可以是批量大小乘一，目标也应采用相同形状的浮点张量；逐标签多标签任务则常是批量大小乘标签数，两者都可使用 BCEWithLogitsLoss。不要把形状为批量大小的目标，无意广播成批量大小乘一。

互斥多分类使用类别编号目标时，CrossEntropyLoss 通常接收批量大小乘类别数的原始分数，目标是形状为批量大小的长整型类别编号。它也支持与输出同形状的浮点类别分布目标，但需要满足有效分布要求。二分类同样能建模成两个互斥 logits 配合交叉熵；一个 logit 配合 BCE 只是另一种常用参数化。接口形状还会随分割等任务增加空间维度，不能把这里的普通分类示例当成唯一合法形式。

<a id="chapter-41-section-09"></a>

### 案例 12：BCE：同样判错，损失差多少

场景与输入：真实标签 y=1；模型给正类概率 p。阈值固定为 0.5，比较 p=0.49 与 p=0.01。

手算第 1 步：y=1 时，BCE=-ln(p)。p=0.49 得到约 0.71335；p=0.01 得到约 4.60517。

手算第 2 步：两次硬分类都为负类，但后者给真实类别的概率更低，损失约为前者的 6.46 倍。

手算第 3 步：切换 y=0 时，损失改为 -ln(1-p)；同一个 0.01 此时是正确且较自信的预测。

结果与解释：损失衡量概率预测，不等于 0/1 错误数。演示概率限制在 (0,1)，端点的对数发散另行讨论。

易错点与边界：BCEWithLogitsLoss 输入是原始 logit；不要对它的输入再先做 Sigmoid。演示显示概率和对应 logit，计算的是等价的单样本 BCE。

改变条件再想一想：p=0.5 时，两个标签的损失一样吗？

自测参考：一样，均为 ln(2)≈0.69315。

参考资料（不朗读）：[S025 · PyTorch — torch.nn.BCEWithLogitsLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html)；[S072 · PyTorch — torch.nn.BCELoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.BCELoss.html)；[S026 · PyTorch — torch.nn.CrossEntropyLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html)；[S073 · PyTorch — torch.nn.MSELoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.MSELoss.html)；[S074 · PyTorch — torch.nn.HuberLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.HuberLoss.html)；[S023 · scikit-learn — 线性模型](https://scikit-learn.org/stable/modules/linear_model.html)
