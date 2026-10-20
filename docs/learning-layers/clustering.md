# Clustering

概念编号：`concept:clustering` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/clustering/)

## 第一层：概念入门 · 知其然

### 它是什么

聚类按规定的相似性，把没有预先类别标签的对象分组。分组含义取决于特征、距离和算法。

### 先看一个例子

把水果按重量和颜色摆成几堆，算法只看到这些特征，不知道“苹果”“梨”这些名字。不同特征和距离可能分出不同的堆。

### 理解练习

算法分出的每一堆，是否必然就是现实中的一种水果？

<details><summary>答案与解释</summary>

不是。聚类反映所用特征和规则下的相似性，不自动等于真实类别，也不自动给出因果解释。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 定义

聚类在没有类别标签时，依据指定距离或相似性把样本分组。K-means 用中心代表簇；层次聚类反复合并或拆分簇，形成一棵分组树。分组是否有用取决于特征、尺度与任务。


### 参数与公式

K-means 最小化 $\sum_i\|x_i-\mu_{c_i}\|^2$，cᵢ 为样本簇编号、μ 为中心。层次聚类还需指定簇间距离规则，如单连接、全连接或平均连接。资产 HRP 使用相关距离及聚类树分配资本，是聚类基础之上的应用。


### 例子

一维数据 (0,1,9,10) 取 K=2，可分成 (0,1) 与 (9,10)，中心为 0.5、9.5，平方误差和为 1。把全部点放在中心 5 的同一簇，误差和为 82。改变距离或特征缩放，可能改变分组。


### 适用边界与常见误解

Clusters need not match real-world categories. Distance scales, density assumptions, and cluster shapes affect the grouping.

### 例题：K-Means: Assignment and Mean Updates

The six 2D points are (0,0), (0,2), (2,0), (7,7), (7,9), (9,7). Set K=2 with initial centers (0,0) and (2,0).

1. Assign each point to its nearest center by Euclidean distance, breaking ties by the smaller center index. Both initial centers are in the lower-left group, so do not cover both groups.
2. Replace each center with the mean of its assigned points, then reassign using the new centers. Repeat, checking within-cluster squared error, SSE, at each step.
3. The final clusters have centers (2/3,2/3) and (23/3,23/3), with SSE=32/3.

结果：Lloyd’s alternating steps find the obvious grouping here. Neither assignment nor mean updates increase this objective, but a global optimum is not guaranteed.

易错点：K is specified in advance. The demo retains the old center for an empty cluster as an explicit teaching convention; libraries may differ. Feature scale affects Euclidean distance.

变式：If every second coordinate is multiplied by 100, do distances retain the same meaning?

参考答案：No. The second coordinate will dominate. Decide whether to standardize and how to handle units based on the task.

### 领域应用

- [HRP · 聚类树的组合配置应用](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/portfolio-hrp.md)：聚类方法统一在机器学习基础；HRP 只解释相关距离、子簇方差与递归资本分配。

### 概念辨析

- [K-nearest Neighbors · K 近邻预测](knn-k-means.md)：KNN 使用邻居的已知标签预测新样本；K-means 根据距离组织无标签数据，定义集中在聚类页。相似名称不代表同一任务。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
