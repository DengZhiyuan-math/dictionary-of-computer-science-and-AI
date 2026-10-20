# Early Stopping / Patience

概念编号：`concept:early-stopping-patience` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/early-stopping-patience/)

## 第一层：概念入门 · 知其然

### 它是什么

提前停止根据独立验证数据的表现，决定何时停止训练。Patience 表示允许连续多少次检查没有达到规定改善标准，再触发停止。

### 先看一个例子

像练习同一套题：练得越久，旧题分数可能越高，但新题未必更好。训练时定期做验证，连续几轮没有进步，就停止并按规则恢复最佳权重。

### 理解练习

训练损失还在下降，是否一定不能停止？

<details><summary>答案与解释</summary>

不是。训练损失下降可能是在继续拟合训练细节。提前停止关注规定的验证指标，还要明确改善阈值、检查频率和是否恢复最佳权重。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

During training, periodically evaluate on validation data that was not used to fit the model. Falling training error alongside persistently worsening validation error is a common sign of overfitting. Early stopping ends training based on validation performance and usually retains a better checkpoint. Patience is the allowed number of consecutive checks without improvement, not necessarily seconds or epochs. Repeatedly using the test set to decide when to stop destroys its value as an independent evaluation.


### 例子

例子：越小越好的验证损失依次为 0.50、0.40、0.41、0.42，patience=2 且改善阈值为零，则最后连续两轮未改善时停止，并恢复损失 0.40 的权重。不能恢复到最后一轮后仍称其为最佳验证模型。


### 适用边界与常见误解

Patience usually counts validation checks, so state its unit.

### 领域应用

- [Early Stopping · 金融时序中的提前停止](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-early-stopping.md)：把早停视作时间验证中的模型选择，明确验证标签、等待轮数与最终采用的迭代版本。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
