---
title: "第 25 讲 · 传统机器学习算法：线性模型、树、随机森林和 Boosting"
aliases: []
tags: ["chapter","area/ml-methods"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/机器学习与统计模型|机器学习与统计模型]]

<a id="chapter-25"></a>

## 第 25 讲｜传统机器学习算法：线性模型、树、随机森林和 Boosting

领域：机器学习导览 · 导览 / 复习

这一讲介绍常见的算法家族，后面的独立章节会继续展开。先从 Linear Regression，线性回归，开始。它假设预测结果可以由多个输入变量的加权组合来近似，适合预测连续数值。优点是简单、快速、容易解释，缺点是对复杂非线性关系表达能力有限，除非人为加入更丰富的特征。

Logistic Regression，逻辑回归，名字虽然叫回归，最常用于分类。它把特征的加权组合转换成某一类别的概率，典型用法是二分类。线性回归预测连续值，逻辑回归预测类别概率，这个区分要能说清楚。

Decision Tree，决策树，模仿人逐步提问。例如判断贷款风险，先问收入是否足够，再问负债是否过高，最后得到预测。每个节点选择某个特征和分割条件，把数据划成越来越具体的区域。它能够表达非线性关系，直观易解释，但单棵深树容易过拟合，对训练数据中的小变化也可能很敏感。

Random Forest，随机森林，是必须会解释的算法。它不是一棵非常复杂的树，而是很多棵相对不同的决策树。训练时，每棵树通常从原始训练集中有放回地抽取样本，也就是 Bootstrap Sampling；并且在各个节点分裂时，只考虑随机选取的一部分特征。最后，分类通常通过投票或平均类别概率，回归通过平均预测值得到整体结果。

为什么这样设计？因为单棵决策树的预测可能波动很大，许多彼此不完全相同的树综合起来，可以降低方差，提高稳定性。这个思想叫 Bagging，也就是 Bootstrap Aggregating。随机森林尤其适合中小规模或中等规模的结构化表格数据，能够处理非线性和特征交互，也不一定需要做复杂的特征缩放。局限是模型可能比较大，外推能力有限，而且特征重要性并不等于因果关系。

Gradient Boosting，梯度提升，是另一种集成思想。它与随机森林最重要的区别，是树的训练方式。随机森林的树大体并行、相对独立地训练，再把预测综合。Boosting 通常一轮接一轮地训练新模型，让后面的模型针对当前整体模型仍然处理不好的地方进行改进。你可以粗略理解为：随机森林让多个不同的专家共同投票；Boosting 让一个团队不断复盘、逐步纠错。这里的纠错，在技术上是优化指定损失函数，不一定是简单地拟合原始预测误差。

XGBoost、LightGBM 和 CatBoost 都是梯度提升树家族的重要工具。XGBoost 强调高效、正则化与工程优化。LightGBM 采用高效的直方图和树生长策略，尤其适合大规模数据。CatBoost 在类别型特征处理方面具有鲜明特点。对于传统结构化数据，这类梯度提升树通常是非常强的基线。它们并非必然优于神经网络，但在许多表格预测任务上很有竞争力。

SVM，支持向量机，是通过寻找类别之间有利于泛化的分隔边界来分类的算法。Kernel Trick，核技巧，可以让它在不显式构造高维特征的情况下表达某些非线性边界。KNN，K Nearest Neighbors，K 近邻，用距离最近的几个已知样本来做预测，几乎不需要传统意义上的训练，但预测时可能需要较多计算。Naive Bayes，朴素贝叶斯，用贝叶斯思想并作条件独立假设，常见于文本分类和简单高效的基线。

你还会听到 Ensemble Learning，集成学习，它不是某一种具体算法，而是组合多个模型的方法。Bagging 主要希望通过平均降低波动；Boosting 侧重逐步改进；Stacking 则训练一个额外模型，学习如何综合不同模型的预测。

关于模型选择，可以用四句话概括：追求简单可解释，先考虑线性或逻辑回归；表格数据中的非线性关系，优先比较随机森林与梯度提升树；高维小样本的某些分类任务可以考虑 SVM；图像、语音、文本这类复杂原始信号，通常更适合深度学习架构。

参考资料（不朗读）：[S038 · scikit-learn — 集成学习](https://scikit-learn.org/stable/modules/ensemble.html)；[S039 · scikit-learn — 支持向量机](https://scikit-learn.org/stable/modules/svm.html)；[S040 · XGBoost — Introduction to Boosted Trees](https://xgboost.readthedocs.io/en/stable/tutorials/model.html)；[S041 · LightGBM — Features](https://lightgbm.readthedocs.io/en/stable/Features.html)；[S042 · CatBoost — How training is performed](https://catboost.ai/docs/en/concepts/algorithm-main-stages)
