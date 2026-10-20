# Calibration

概念编号：`concept:calibration` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/calibration/)

## 第一层：概念入门 · 知其然

### 它是什么

概率校准检查预测概率与长期实际频率是否一致：一批被预测为 0.8 的事件，应约有 80% 发生。校准改善的是概率含义；它与为了匹配期权报价而反求定价模型参数的校准不同。

### 先看一个例子

若在独立校准数据支持下调整为 0.6，同样这组标签的得分为 0.24；仍须用新测试样本评价。

### 理解练习

用自己的话解释：上面的情景为什么是“Calibration”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：概率校准检查预测概率与长期实际频率是否一致：一批被预测为 0.8 的事件，应约有 80% 发生。校准改善的是概率含义；它与为了匹配期权报价而反求定价模型参数的校准不同。

情景依据：若在独立校准数据支持下调整为 0.6，同样这组标签的得分为 0.24；仍须用新测试样本评价。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 参数与公式

二元标签 $y_i\in\{0,1\}$、预测概率 pᵢ 时，$\mathrm{Brier}=n^{-1}\sum_i(p_i-y_i)^2$，越小越好，但它同时受区分能力等因素影响，不是纯校准误差。可靠性图比较各概率组的平均预测与实际频率。校准器要在适当留出集拟合，测试标签不能参与调整。


### 例子

100 个样本都预测 0.8，实际发生 60 次，说明该组过度自信；其 Brier 为 (60×0.2²+40×0.8²)/100=0.28。若在独立校准数据支持下调整为 0.6，同样这组标签的得分为 0.24；仍须用新测试样本评价。


### 适用边界与常见误解

A high AUC does not guarantee well-calibrated probabilities.

### 领域应用

- [Probability Calibration · 金融概率与交易阈值](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-probability-calibration.md)：在通用概率校准基础上，连接金融方向标签、非对称支付、成本与独立的时间校准段。

### 概念辨析

- [Model Calibration · 定价模型校准](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/pricing-model-calibration.md)：概率校准比较预测概率与实际频率；定价模型校准选择匹配市场价格的参数。它们的目标和评价数据不同。

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
