# Early Stopping / Patience

概念编号：`concept:early-stopping-patience` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/early-stopping-patience/)

## 第一层：概念入门 · 知其然

### 它是什么

早停在验证表现连续不改善时结束训练，耐心值限制容忍次数。

### 先看一个例子

验证损失0.50、0.40、0.41、0.42，耐心2。

### 理解练习

停止时权重必然最好吗？

<details><summary>答案与解释</summary>

不是，必须明确保存或恢复最佳权重。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 改善时更新最佳值并清零等待，否则等待加1。
2. 等待达到上限停止，方向、最小改善量及验证间隔都要预先声明。

### 具体输入与计算步骤

验证损失0.50、0.40、0.41、0.42，耐心2。

1. 第二次最佳0.40，等待0；第三次未改善，等待1。
2. 第四次仍未改善，等待2并停止，最佳仍是第二次。

计算结果：第四次仍未改善，等待2并停止，最佳仍是第二次。

### 换到实际问题中应用

微调时训练损失下降、验证回升。

1. 固定验证间隔并保存每次改善的检查点。
2. 停止后恢复最佳权重，再评估独立测试集。

应用结论：停止后恢复最佳权重，再评估独立测试集。

### 举一反三：改变条件后的完整解答

第四次若为0.39，还会停止吗？

<details><summary>变式的推演与答案</summary>

1. 0.39低于最佳0.40，形成改善。
2. 最佳改为0.39并清零等待，因此继续。

最佳改为0.39并清零等待，因此继续。

</details>

### 原有解释与进一步例题


### 原理与推演

During training, periodically evaluate on validation data that was not used to fit the model. Falling training error alongside persistently worsening validation error is a common sign of overfitting. Early stopping ends training based on validation performance and usually retains a better checkpoint. Patience is the allowed number of consecutive checks without improvement, not necessarily seconds or epochs. Repeatedly using the test set to decide when to stop destroys its value as an independent evaluation.


### 例子

例子：越小越好的验证损失依次为 0.50、0.40、0.41、0.42，patience=2 且改善阈值为零，则最后连续两轮未改善时停止，并恢复损失 0.40 的权重。不能恢复到最后一轮后仍称其为最佳验证模型。


### 适用边界与常见误解

Patience usually counts validation checks, so state its unit.

### 领域应用

- [Early Stopping · 金融时序中的提前停止](https://github.com/DengZhiyuan-math/dictionary-of-quant/blob/main/docs/learning-layers/quant-early-stopping.md)：把早停视作时间验证中的模型选择，明确验证标签、等待轮数与最终采用的迭代版本。

### 推导与方法参考

- [一手资料](https://keras.io/api/callbacks/early_stopping/)

[返回分层目录](00-learning-index.md)
