# Clustering

概念编号：`concept:clustering` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/clustering/)

## 第一层：概念入门 · 知其然

### 定义

聚类是根据样本的特征及选定的相似性规则，把样本组织成若干组的无监督学习任务。“无监督”指拟合时没有提供希望预测的类别标签；它不表示没有人为选择。哪些特征有意义、怎样量化差异、允许多少组，都会改变结果。以 K-means 为例，先指定组数，再交替把样本分给最近的中心、用组内均值更新中心，使组内平方距离总和下降。

### 概念边界与常见混淆

聚类并不保证恢复客观存在的类别。K-means 偏好按所选距离紧凑的组，而且可能停在不同的局部解；客户的消费金额或地理位置也可能给出不同但有用途的分组。

### 先看一个例子

按月购买次数给客户分两组，数据为 1、2、9、10 次。若初始中心取 1 和 10，则先得到 {1,2} 与 {9,10}，新中心为 1.5 与 9.5。再次分配不变。这说明组是由特征与算法形成的；编号 0、1 只是名称，不代表低级、高级客户。

### 理解练习

#### 1. 没有标签是否就没有假设？

只提供购买次数，没有客户类别标签，因此两组一定是数据的天然分类吗？

<details><summary>答案与解释</summary>

不一定。购买次数、组数为二、采用平方距离都是选择。需要用分组稳定性和实际用途检验这些选择，不能仅凭算法输出确认类别存在。

</details>

#### 2. 尺度改变

增加以“元”为单位的消费金额后，可以直接与购买次数一起计算距离吗？

<details><summary>答案与解释</summary>

可以计算，但金额的数值尺度可能主导距离。应先说明两种差异怎样权衡；标准化是一种选择，并非自动正确的答案。

</details>

#### 3. 组数与拟合

把四位客户各自分成一组，组内平方距离为零，是否说明四组最好？

<details><summary>答案与解释</summary>

不能。允许更多组自然可以降低这个拟合量，但可能失去归纳和服务分群的意义。应根据目标比较组数，而不能只比较训练距离。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. K-means最小化各点到所属中心的平方距离和。
2. 固定中心时分给最近中心；固定分组时均值使平方误差最小。

### 具体输入与计算步骤

一维点0、2、8、10，初始中心0与10。

1. 分组[0,2]与[8,10]，新中心1与9。
2. 平方误差=1+1+1+1=4。

计算结果：再分配不变，达到一个局部稳定解。

### 换到实际问题中应用

给客户行为分群。

1. 只用训练期消费频率和金额，先处理尺度。
2. 拟合后检查簇内典型客户与业务可解释性，而非把簇号当等级。

应用结论：得到用于差异化服务的分组，需要持续验证。

### 举一反三：改变条件后的完整解答

k改为1时中心和误差多少？

<details><summary>变式的推演与答案</summary>

1. 均值=(0+2+8+10)/4=5。
2. 误差=25+9+9+25=68。

更多簇常降训练误差，但不证明业务更好。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://scikit-learn.org/stable/modules/generated/sklearn.cluster.KMeans.html)

[返回分层目录](00-learning-index.md)
