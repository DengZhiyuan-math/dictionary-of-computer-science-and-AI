---
title: "第 22 讲 · 训练词汇起点：样本、张量、标签、Logit 与概率"
aliases: []
tags: ["chapter","area/data-evaluation"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/数据、任务与评估|数据、任务与评估]]

## 本讲概念

- [[Concepts/二分类／互斥多分类／多标签|二分类／互斥多分类／多标签]]
- [[Concepts/广播|广播]]
- [[Concepts/数据类型／计算设备|数据类型／计算设备]]
- [[Concepts/概率变换前的分数|概率变换前的分数]]
- [[Concepts/参数／超参数|参数／超参数]]
- [[Concepts/样本／特征／标签|样本／特征／标签]]
- [[Concepts/S 形概率变换|S 形概率变换]]
- [[Concepts/类别概率归一化|类别概率归一化]]
- [[Concepts/张量／形状／轴|张量／形状／轴]]

## 具体案例与可视化

- [[Examples/21 张量广播：一列加一行变成矩阵|案例 21 · 张量广播：一列加一行变成矩阵]]

<a id="chapter-22"></a>

## 第 22 讲｜训练词汇起点：样本、张量、标签、Logit 与概率

领域：训练微知识点 · 细讲

算法名称告诉你用了哪种方法，下面这些词则告诉你方法具体在处理什么。把它们接起来，才能听懂别人描述一次训练。这里没有公式，也不需要记住函数写法。

<a id="chapter-22-section-01"></a>

### Sample、Feature、Label、Target【重点】

Sample 是一条样本，例如一条订单。Feature 是预测时能够使用的信息，例如商品价格和用户此前的浏览次数。Label 是用来监督学习的答案，例如订单后来是否取消。Target 是更一般的训练目标，可以是类别、数值、下一段文字或希望重建的图像。标签不一定由人手工标注：预测下一个词时，文本本身就提供答案。必须区分“训练时有答案”和“实际预测时能看到答案”。后者如果偷偷进入输入，就会形成泄露。

<a id="chapter-22-section-02"></a>

### Tensor、Shape、Dimension、Axis【重点】

Tensor，张量，在这里先理解为多维数组。Shape 是各个方向有多大，Axis 是沿哪个方向组织或计算。例如一批彩色图片可以按样本、颜色通道、高度、宽度几个方向组织。Dimension 有时指方向的数量，有时指某个方向的大小，听到时要结合上下文。Embedding dimension 通常指每个向量有多少个分量，不是数据集有多少条样本。Shape 不匹配是数据放错位置，不等于算法原理有问题。

<a id="chapter-22-section-03"></a>

### Dtype、Device、Broadcasting【认识】

Dtype 是数值表示类型，如整数或浮点数。Device 是数据和计算放在哪里，如 CPU 或 GPU。Broadcasting，广播，允许较小形状的数据按约定与较大数据一起运算，不必手工复制。例如给一批样本的每个特征加上同一个偏置。广播有时会让本来形状错误的计算也能运行，因此程序不报错并不保证结果正确。Padding 是给不等长序列补齐位置，Mask 则告诉计算过程哪些位置有效。

<a id="chapter-22-section-04"></a>

### Weight、Bias、Parameter、Hyperparameter【重点】

Weight 和 Bias 是模型内部可学习的权重与偏置；Parameter 是这类参数的总称。Learning rate、batch size、树的最大深度等通常是超参数，控制模型或训练流程，而不是普通训练直接拟合出的权重。这里的 bias 是偏置项，不等于偏差方差中的统计偏差，也不等于社会偏见。同一个词在不同语境有不同含义，应该先确认它属于模型结构、统计误差还是公平性问题。

<a id="chapter-22-section-05"></a>

### Logit、Sigmoid、Softmax【重点精学】

Logit 在神经网络分类讨论中通常指变成概率之前的原始分数，可以为负，也可以大于一。Sigmoid 把单个分数转换到零和一之间，常用于某个标签是否成立的概率预测。Softmax 把一组分数变成总和为一的概率，适合在互斥类别之间分配概率。它们都是输出变换，不是完整学习算法，也不是损失函数。高概率不保证正确，因为模型还可能没有校准好。

<a id="chapter-22-section-06"></a>

### Binary、Multiclass、Multilabel【重点精学】

二分类是判断一个问题的是或否，如是否垃圾邮件。多类别单标签分类是在多个互斥答案中选一个，如主要物种是猫、狗还是鸟。多标签分类允许多个答案同时成立，如图片中既有猫又有狗。后者通常为每个标签分别给一个概率，不要求所有概率加起来是一。这一区别直接影响输出层和损失函数：不能只数类别有几个，就决定该用 BCE 还是互斥类别交叉熵。

<a id="chapter-22-section-07"></a>

### 案例 21：张量广播：一列加一行变成矩阵

场景与输入：预测张量形状为 [3,1]，标签形状为 [3]，做一般逐元素减法来计算误差。

手算第 1 步：广播从尾轴对齐：[3,1] 与 [1,3] 可广播到 [3,3]。这已经不是三个样本一一对应。

手算第 2 步：例如预测 [[1],[2],[3]] 减标签 [1,2,3]，结果是 [[0,-1,-2],[1,0,-1],[2,1,0]]。

手算第 3 步：若先把标签显式变为 [3,1]，差值为三行零，才符合这里的样本配对意图。

结果与解释：错误形状可能产生合法但语义错误的计算；检查 shape、轴含义和期望输出形状。

易错点与边界：不要据此推断所有损失接口都自动广播；BCEWithLogitsLoss 要求输入和目标形状相同。

改变条件再想一想：batch=1 时为何更难发现？

自测参考：[1,1] 和 [1] 的广播结果仍只有一个数，小样本测试可能掩盖轴错误。

参考资料（不朗读）：[S025 · PyTorch — torch.nn.BCEWithLogitsLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html)；[S026 · PyTorch — torch.nn.CrossEntropyLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html)；[S027 · PyTorch — 张量](https://docs.pytorch.org/docs/stable/tensors.html)
