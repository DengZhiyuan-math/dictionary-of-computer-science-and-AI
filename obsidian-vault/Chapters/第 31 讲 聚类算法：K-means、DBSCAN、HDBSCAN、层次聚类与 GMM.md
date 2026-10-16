---
title: "第 31 讲 · 聚类算法：K-means、DBSCAN、HDBSCAN、层次聚类与 GMM"
aliases: []
tags: ["chapter","area/ml-methods"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/机器学习与统计模型|机器学习与统计模型]]

## 本讲概念

- [[Concepts/近邻预测／K 均值聚类|近邻预测／K 均值聚类]]
- [[Concepts/聚类与密度结构|聚类与密度结构]]

## 具体案例与可视化

- [[Examples/16 K-means：分配与均值更新|案例 16 · K-means：分配与均值更新]]

<a id="chapter-31"></a>

## 第 31 讲｜聚类算法：K-means、DBSCAN、HDBSCAN、层次聚类与 GMM

领域：机器学习算法 · 细讲

<a id="chapter-31-section-01"></a>

### K-means 与 K-means++【重点】

K-means 先选定分组数量，交替执行把样本分给最近中心、再根据成员更新中心。它适合在所用特征与距离下比较紧凑的群体，不能保证适合任意形状的簇。K-means++ 改善初始中心选择，让中心不要过于挤在一起，但不保证找到全局最优。特征尺度会影响距离，因此客户收入和年龄不能不加思考地直接混在一起。

<a id="chapter-31-section-02"></a>

### MiniBatch K-means 与 K-medoids【认识】

MiniBatch K-means 每次用小批样本更新，降低大数据场景的计算成本，可能牺牲一些精度。K-medoids 用真实样本作为簇代表，而不是任意均值点，可以搭配某些更一般的距离，并对极端值更稳健。它通常计算更贵。两者都不是改变了聚类目标的大方向，而是在速度、代表方式和稳健性上作取舍。

<a id="chapter-31-section-03"></a>

### Hierarchical Clustering，层次聚类【重点】

凝聚式层次聚类从每个样本各自成组开始，逐步合并近似群组，形成一棵嵌套结构。Single、complete、average linkage 分别用不同组间距离规则；Ward 方法依据合并对组内变化的影响。树状图让你看到不同粒度下的群体，而不是一开始只能得到固定数量。大数据时存储与计算可能昂贵，早期错误合并也未必能撤销。

<a id="chapter-31-section-04"></a>

### DBSCAN【重点】

DBSCAN 从局部密度出发：邻域里有足够多样本的位置成为核心，再把密度连通的区域扩展成簇。它能找到非球形群组，并把一些孤立点标为噪声，不必预先指定簇数。但邻域半径和最低样本数非常关键，不同密度的群组并存时，一个统一半径可能顾此失彼。距离和尺度仍然重要，不能因算法不要求簇数就称它无需调参。

<a id="chapter-31-section-05"></a>

### HDBSCAN 与 OPTICS【认识】

HDBSCAN 从不同密度尺度形成层次结构，再选择较稳定的群组。OPTICS 记录不同可达密度关系，也用于分析尺度变化下的簇结构。它们针对固定密度阈值的局限提供不同思路，但仍有参数、距离和数据表示的选择。噪声标签是算法认为不稳定或不密集，不自动意味着这条业务记录错误。

<a id="chapter-31-section-06"></a>

### Gaussian Mixture Model 与 Soft Assignment【重点】

GMM 用多个高斯成分的混合表达数据分布。一个点可以以不同概率属于各个成分，这叫软分配，与 K-means 的单一硬归属不同。它能表达不同方向和形状的椭圆群体，代价是更多参数与分布假设。通常用 EM 在成分归属和参数更新之间交替，可能陷入局部最优，也需要防止某个成分退化。

<a id="chapter-31-section-07"></a>

### Spectral Clustering、Affinity Propagation、Mean Shift【认识】

谱聚类先建立样本之间的相似图，再利用图的谱结构寻找较容易分组的表示，适合某些非凸结构，但大图成本高。Affinity propagation 通过样本间的信息交换寻找代表点。Mean shift 把点逐步移向密度较高的位置，寻找密度峰，带宽选择决定分组尺度。名字不同的聚类，实际上在回答不同的“什么叫同一群体”。

<a id="chapter-31-section-08"></a>

### Silhouette 与聚类评价【认识】

Silhouette 比较一个点与自身群组和附近其他群组的距离，提供内部结构评价。有已知参考标签时，还可用 ARI、NMI 等比较划分。不过群组是否对业务有用，不能只看一个内部高分。聚类得到的是某种表示和假设下的组织方式，不保证发现唯一真实类别。

<a id="chapter-31-section-09"></a>

### 案例 16：K-means：分配与均值更新

场景与输入：六个二维点为 (0,0)、(0,2)、(2,0)、(7,7)、(7,9)、(9,7)，取 K=2，初始中心为 (0,0)、(2,0)。

手算第 1 步：按欧氏距离把每个点分给最近中心，距离相同取较小中心编号。初始中心都在左下，并没有覆盖两团。

手算第 2 步：用各簇点的均值替换中心，再按新中心重新分配，重复两步。每一步都检查簇内平方误差 SSE。

手算第 3 步：最终分成左右两团，中心为 (2/3,2/3) 与 (23/3,23/3)，SSE=32/3。

结果与解释：在这个例子中，Lloyd 交替步骤找到明显分组；每次分配或均值更新不会增加该目标，但不保证全局最优。

易错点与边界：K 是预先指定的；演示遇到空簇时保留旧中心，这只是显式教学策略，实际库的处理可能不同。尺度会影响欧氏距离。

改变条件再想一想：把第二坐标都乘以 100，会保持同样的距离含义吗？

自测参考：不会，第二坐标将主导距离；应根据任务决定是否标准化以及怎样处理单位。

参考资料（不朗读）：[S024 · scikit-learn — 聚类](https://scikit-learn.org/stable/modules/clustering.html)；[S051 · scikit-learn — 高斯混合](https://scikit-learn.org/stable/modules/mixture.html)；[S176 · scikit-learn — KMeans：Lloyd 更新与局部最优](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html)
