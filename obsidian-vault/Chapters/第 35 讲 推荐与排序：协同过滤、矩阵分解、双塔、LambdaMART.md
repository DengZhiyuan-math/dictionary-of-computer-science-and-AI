---
title: "第 35 讲 · 推荐与排序：协同过滤、矩阵分解、双塔、LambdaMART"
aliases: []
tags: ["chapter","area/ml-methods"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/机器学习与统计模型|机器学习与统计模型]]

<a id="chapter-35"></a>

## 第 35 讲｜推荐与排序：协同过滤、矩阵分解、双塔、LambdaMART

领域：机器学习算法 · 细讲

<a id="chapter-35-section-01"></a>

### Retrieval、Ranking、Re-ranking【重点】

推荐系统通常先从巨大候选库召回一批对象，再用更昂贵的模型排序，最后按多样性、去重或约束重排。召回阶段关注别漏掉好候选，排序阶段关注有限候选里的精细顺序。一个商品根本没被召回，后面的强排序器也无法把它推荐出来。分阶段设计是用不同计算预算解决不同规模的问题。

<a id="chapter-35-section-02"></a>

### Collaborative Filtering【重点】

协同过滤利用用户与物品的交互规律。User-based 方法寻找行为相似的用户，Item-based 方法寻找经常被同一批人喜欢的物品。它不是单纯分析商品描述，而是利用群体行为。冷启动是主要困难：新用户或新物品没有足够交互。热门偏差、曝光偏差和未点击不等于不喜欢，也会影响训练数据的解释。

<a id="chapter-35-section-03"></a>

### Matrix Factorization 与 ALS【重点】

矩阵分解用低维向量表示用户和物品，让向量关系解释已观察的评分或交互。ALS，交替最小二乘，固定一边向量优化另一边，再轮换。它把巨大交互表压缩成潜在兴趣结构，适合传统推荐基线。向量中的某个方向不一定能够清楚命名为科幻或体育，模型仍可能捕捉有用关系。没有观察的交互不能一律当成明确负反馈。

<a id="chapter-35-section-04"></a>

### Factorization Machine 与 DeepFM【认识】

Factorization machine 用低维向量高效表示特征之间的交互，适合用户、商品、场景等稀疏类别特征组合。DeepFM 将这类交互建模与深层网络结合，捕捉不同复杂度的关系。它们与简单矩阵分解相联系，但输入不只限于一个用户编号和一个物品编号。重点是有效处理稀疏组合，而不是靠穷举每一种用户场景。

<a id="chapter-35-section-05"></a>

### Two-Tower，双塔模型【重点】

双塔分别把查询或用户、候选物品编码成向量，用相似度匹配。候选向量可以预先计算并建立索引，因此适合大规模召回。Cross-encoder 把两者一起输入、允许更细粒度交互，常用于较小候选集的重排序。双塔快在可以预计算，并不是因为它一定只有两层神经元。

<a id="chapter-35-section-06"></a>

### RankNet、LambdaRank、LambdaMART【认识】

RankNet 学习候选对的相对顺序。LambdaRank 用与排序评价有关的更新信号强调更重要的次序变化。LambdaMART 把相关思想与提升树结合，是表格特征排序中的经典路线。NDCG 看相关结果是否出现在列表前面，MRR 关注第一个正确结果出现得多早。这些目标不要求分数本身就是点击概率。

<a id="chapter-35-section-07"></a>

### Negative Sampling、Hard Negative 与 MMR【重点】

负采样从没有正交互的候选中挑一部分训练，减少计算。Hard negative 选择看起来相似但实际上不相关的对象，使模型学习细微区别，不过必须防止把潜在正例当负例。MMR 在相关性之外考虑与已选结果的重复程度，获得更有多样性的列表。去重和多样性不是另一个更大模型才会有的能力，也可以由清楚的排序规则实现。

参考资料（不朗读）：[S057 · Google Developers — Recommendation Systems](https://developers.google.com/machine-learning/recommendation/overview/types)；[S010 · Manning, Raghavan, Schütze — Introduction to Information Retrieval](https://nlp.stanford.edu/IR-book/html/htmledition/irbook.html)；[S041 · LightGBM — Features](https://lightgbm.readthedocs.io/en/stable/Features.html)；[S058 · Sentence Transformers — Retrieve and Re-Rank](https://sbert.net/examples/sentence_transformer/applications/retrieve_rerank/README.html)
