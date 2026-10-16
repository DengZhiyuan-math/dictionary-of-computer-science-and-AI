---
title: "第 38 讲 · 评价的细节：阈值、AUC、校准、Macro 与 Micro"
aliases: []
tags: ["chapter","area/data-evaluation"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/数据、任务与评估|数据、任务与评估]]

## 本讲概念

- [[Concepts/概率校准|概率校准]]
- [[Concepts/交叉验证|交叉验证]]
- [[Concepts/精确率与召回率的调和平均|精确率与召回率的调和平均]]
- [[Concepts/按类平均／汇总计数|按类平均／汇总计数]]
- [[Concepts/精确率|精确率]]
- [[Concepts/召回率|召回率]]
- [[Concepts/排序区分指标|排序区分指标]]
- [[Concepts/分类阈值|分类阈值]]
- [[Concepts/特征处理与数据划分|特征处理与数据划分]]

<a id="chapter-38"></a>

## 第 38 讲｜评价的细节：阈值、AUC、校准、Macro 与 Micro

领域：训练微知识点 · 细讲

<a id="chapter-38-section-01"></a>

### Threshold、Confusion Matrix、Specificity【重点】

预测概率之后还要选分类阈值。提高阈值通常让系统少报正类，但可能漏掉更多真实正类。混淆矩阵区分真阳性、假阳性、真阴性、假阴性。Sensitivity 通常就是召回率，也叫 true positive rate；specificity 则关心真实负类里有多少被正确排除。它们不是同一个方向的能力，应该结合漏报与误报成本讨论。

<a id="chapter-38-section-02"></a>

### ROC-AUC 与 PR-AUC【重点】

ROC 曲线比较不同阈值下的真阳性率和假阳性率，AUC 汇总排序区分能力。PR 曲线比较精确率和召回率，正类罕见时常更直接暴露误报负担。ROC-AUC 很高不保证某个具体阈值下的精确率满足要求。Average precision 是一种常用 PR 汇总量，与对曲线作梯形积分未必完全相同，汇报结果应确认具体定义。

<a id="chapter-38-section-03"></a>

### Macro、Micro、Weighted Average【重点】

多类别或多标签任务中，可以先分别计算各类指标，再取平均。Macro 给每个类别相同份量，所以较容易暴露小类别问题。Weighted average 按类别样本数等加权，容易受大类别主导。Micro 先汇总计数再计算，强调总体样本层面的结果。三种分数都叫 F1 时也可能不同，不能省略平均方式后直接比较。

<a id="chapter-38-section-04"></a>

### Calibration、Brier Score 与 Temperature Scaling【重点】

校准关注报出的概率是否可信：一批被预测为百分之八十的事件，长期是否约有八成发生。排序很好但概率过分自信的模型，可以 AUC 高而校准差。Brier score 用概率与二元结果的差异评分。Temperature scaling 在保留部分排序结构的同时调整输出分数尺度，常用于后处理校准。它应在适当保留的数据上拟合，不能把测试标签拿来修好模型后再报独立成绩。

<a id="chapter-38-section-05"></a>

### Cross-Validation、Nested CV、OOF【重点】

交叉验证通过多次划分评估稳定性。OOF，折外预测，指某条样本的预测来自训练时没见过它的那一折模型，常用于 stacking。Nested CV 把模型选择放在内层，外层用于评价整个选择过程，减少反复调参带来的乐观偏差。它计算更贵，不能保证数据分布变化不存在；首先仍需选对时间或分组切分规则。

<a id="chapter-38-section-06"></a>

### Hyperparameter Search 与 Ablation【重点】

网格搜索试遍预先列出的组合，随机搜索随机挑配置。贝叶斯优化根据已有实验建立代理模型，决定下一次试哪里；Hyperband、ASHA 等方法提前淘汰表现不佳的配置，把预算分给更有希望的实验。Ablation，消融实验，移除或替换某个组件来测试它是否真正贡献效果。只换模型但同时改数据和训练预算，难以判断究竟是谁带来改进。

<a id="chapter-38-section-07"></a>

### Permutation Importance、SHAP、PDP、ICE【认识】

置换重要性打乱某个特征，观察性能损失。SHAP 将预测相对基准的变化分配给各特征。PDP 看平均预测随某特征变化的趋势，ICE 则看单个样本对应的曲线。它们解释的是模型行为，不自动解释真实因果关系；特征相关性还可能让重要性分配或人为改变特征后的样本变得难以解读。

<a id="chapter-38-section-08"></a>

### 混淆矩阵例题：Precision、Recall、F1 各在数什么【重点】

假设一千封邮件中有一百封垃圾邮件。模型报出八十封，其中六十封确实是垃圾邮件。于是，真阳性为六十，假阳性为二十，假阴性为四十，真阴性为八百八十。精确率为六十除以八十，也就是百分之七十五；召回率为六十除以一百，也就是百分之六十；F1 约为百分之六十六点七；准确率为百分之九十四。

同一数据上，把所有邮件都判为正常，也能得到百分之九十的准确率，却一封垃圾邮件都找不回来。这个例子说明指标选择要对应任务。阈值需要在验证数据上结合误报、漏报成本选择；不能在测试集上挑出最好的阈值，再把同一分数称为独立测试效果。

参考资料（不朗读）：[S062 · scikit-learn — 评价指标](https://scikit-learn.org/stable/modules/model_evaluation.html)；[S063 · scikit-learn — 概率校准](https://scikit-learn.org/stable/modules/calibration.html)；[S031 · scikit-learn — 交叉验证](https://scikit-learn.org/stable/modules/cross_validation.html)；[S064 · scikit-learn — 置换重要性](https://scikit-learn.org/stable/modules/permutation_importance.html)；[S065 · SHAP — Documentation](https://shap.readthedocs.io/en/latest/)
