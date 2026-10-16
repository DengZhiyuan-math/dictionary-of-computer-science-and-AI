---
title: "第 42 讲 · 损失函数第二讲：Focal、Dice、KL、对比学习与排序损失"
aliases: []
tags: ["chapter","area/training"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/损失、训练与优化|损失、训练与优化]]

## 本讲概念

- [[Concepts/对比损失|对比损失]]
- [[Concepts/连接时序分类|连接时序分类]]
- [[Concepts/Dice 重叠损失|Dice 重叠损失]]
- [[Concepts/聚焦损失|聚焦损失]]
- [[Concepts/KL 散度|KL 散度]]

<a id="chapter-42"></a>

## 第 42 讲｜损失函数第二讲：Focal、Dice、KL、对比学习与排序损失

领域：训练微知识点 · 细讲

<a id="chapter-42-section-01"></a>

### Class Weight 与 Positive Weight【重点】

当某类样本非常少时，可以让它在损失里占更大权重，避免大量容易的多数类样本主导训练。Class weight 是类别权重；BCE 中的 positive weight 是对正标签项施加的权重。这与复制少数类样本、修改分类阈值相关，但不是同一个操作。权重改变训练偏好，也可能改变概率校准情况，不能默认输出仍直接反映自然人群中的发生比例。最后仍应在符合部署分布的数据上检查。

<a id="chapter-42-section-02"></a>

### Focal Loss【重点】

Focal Loss 会降低已经容易判对的样本对损失的相对贡献，让训练更关注困难样本。目标检测中，大量背景位置很容易判断，真正物体可能很少，这使它很有价值。它不只是给少数类固定加权，而是根据模型当前对样本的判断动态改变贡献。困难样本也可能是错误标签，因此它不是类别不平衡的万能药。需要结合标注质量、采样和评估指标判断效果。

<a id="chapter-42-section-03"></a>

### IoU、Dice Loss 与分割【认识】

IoU，交并比，衡量预测区域与真实区域重合得怎么样。Dice 是另一种常用重叠度量，并可构造相应训练损失。医学图像里，一个很小的病灶被完全漏掉，背景仍然全部预测正确，像素准确率可能很好看；区域重叠指标更容易暴露这种问题。分割常会把 BCE 或交叉熵与 Dice 等目标结合，兼顾逐像素判断与整体区域重合。指标的可微近似和正式评测的计算也要区分。

<a id="chapter-42-section-04"></a>

### KL Divergence 与蒸馏【重点】

KL 散度描述一个概率分布与另一个参考分布之间的差异，用于让学生模仿教师分布，或约束新策略不要偏离参考策略太远。它通常不对称，因此“谁去匹配谁”有意义。它不是普通的几何距离，也不直接代表两个回答在语义上有多相似。交叉熵、KL 和熵有关联，但回答问题时最好说明比较的是哪些分布，而不是只说它们都是差不多的损失。

<a id="chapter-42-section-05"></a>

### Contrastive Loss、Triplet Loss、InfoNCE【重点】

度量学习关注表示空间中的相似关系。对比损失让相关对象的表示更接近，并与不相关对象区分。Triplet loss 使用锚点、正样本和负样本，希望正样本比负样本更接近锚点。InfoNCE 常把“在一批候选里找到正确匹配”作为学习任务。图文对齐、语义检索、人脸验证都可使用相关思想。负样本并非一定是真正不相关：错误负样本会产生不合理的训练压力。

<a id="chapter-42-section-06"></a>

### Hinge Loss、Margin 与排序损失【认识】

Hinge loss 不只希望判对，还希望与决策边界保持一定间隔，常见于支持向量机。Margin 指这种希望保留的安全间隔。排序损失关注相对次序：pointwise 单独预测每个对象的分数，pairwise 比较两个对象谁应靠前，listwise 直接考虑整份列表。搜索结果的顺序正确，不要求分数本身像真实概率一样校准。选择损失前先确认最终需要数值、类别、概率还是排序。

<a id="chapter-42-section-07"></a>

### CTC、Label Smoothing 与辅助损失【认识】

CTC 用于输入序列和输出标签不逐帧对齐的任务，例如语音识别时知道一句话的文字，却不知道每个音对应哪一帧。它通过合并重复标签和空白符等机制处理多种可能对齐。Label smoothing，标签平滑，把过于绝对的目标分布稍微软化，限制模型过度确信。Auxiliary loss，辅助损失，为中间表征、负载均衡等增加训练信号。多加一个损失并不自动更好，各项权重可能相互冲突。

参考资料（不朗读）：[S025 · PyTorch — torch.nn.BCEWithLogitsLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.BCEWithLogitsLoss.html)；[S075 · Focal Loss for Dense Object Detection](https://arxiv.org/abs/1708.02002)；[S076 · PyTorch — torch.nn.KLDivLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.KLDivLoss.html)；[S034 · A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/abs/2002.05709)；[S077 · PyTorch — torch.nn.CTCLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.CTCLoss.html)；[S026 · PyTorch — torch.nn.CrossEntropyLoss](https://docs.pytorch.org/docs/stable/generated/torch.nn.CrossEntropyLoss.html)
