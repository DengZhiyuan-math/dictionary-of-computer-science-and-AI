# PCA — Principal Component Analysis

概念编号：`concept:pca` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/pca/)

## 第一层：概念入门 · 知其然

### 它是什么

主成分分析（PCA）把多个数值特征重新组合成彼此正交的方向，依次保留数据变化较大的方向，用较少维度表示数据。

### 先看一个例子

身高和臂展常一起增减。把它们想成平面上的点云，最长的延伸方向可以总结大部分变化；另一个方向记录偏离这个趋势的部分。

### 理解练习

保留变化最大的方向，就一定保留了最有用的预测信息吗？

<details><summary>答案与解释</summary>

不一定。PCA 优化的是特征方差的保留，不使用预测目标。较小方差的方向也可能与任务结果有关。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 定义

主成分分析（PCA）把中心化后的多变量数据投影到彼此正交、按方差大小排序的方向。它是无监督降维：只看输入的变化，不保证保留的方向最能预测标签。


### 参数与公式

有 n 行样本、d 列特征的中心化矩阵 X，样本协方差为 $\Sigma=X^\top X/(n-1)$。求 $\Sigma v_j=\lambda_jv_j$，按特征值 λ 降序选择 k 个单位正交向量组成 V，投影为 $Z=XV$。第 j 个方向的解释方差比为 $\lambda_j/\sum_l\lambda_l$。中心和可选的尺度参数必须只在训练集拟合。


### 例子

协方差矩阵 [[2,1],[1,2]] 的特征值为 3、1，第一方向为 (1,1)/√2，保留一个方向解释 75% 方差。中心化样本 (2,0) 在这一方向的坐标为 √2；标签若取决于另一方向，压缩仍可能丢失预测信息。


### 适用边界与常见误解

High-variance directions need not be the most useful for classification.

### 领域应用

- [PCA Residual · 多资产收益的主成分残差](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-pca-residual.md)：把一般主成分分析连接到多资产共同收益剔除，并区分几何残差与最终持仓中性。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
