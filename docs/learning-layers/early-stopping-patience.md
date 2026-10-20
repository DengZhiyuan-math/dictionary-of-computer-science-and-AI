# Early Stopping / Patience

概念编号：`concept:early-stopping-patience` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/early-stopping-patience/)

## 第一层：概念入门 · 知其然

### 定义

早停根据独立验证数据上的表现决定何时停止训练，避免只追求训练误差继续降低。耐心值指定允许连续多少次验证检查不改善；“改善”还需要指定指标方向和最小变化量。保存最佳模型与停止训练是两个动作，停止时的最后参数不一定是验证最优参数。

### 概念边界与常见混淆

耐心值按验证检查计数，不必等于训练轮数；每轮检查多次或隔轮检查都会改变含义。验证波动不证明一定开始过拟合，规则只是根据有限证据作训练选择，最终效果仍应独立评价。

### 先看一个例子

约定验证损失越小越好，严格下降才算改善，连续两次不改善就停。四次检查损失为 0.50、0.40、0.42、0.41：第二次保存最好参数，第三、四次都未优于 0.40，因此第四次停；若需要最好模型，应恢复第二次，而不是把 0.41 当最佳。

### 理解练习

#### 1. 比较基准

0.42 降到 0.41，为什么例子仍算不改善？

<details><summary>答案与解释</summary>

比较的是历史最好值 0.40，不只是上一次；它虽比上次好但未改进已有最好模型。

</details>

#### 2. 次数与轮数

每五轮验证一次，耐心值 2 就是最多等两轮吗？

<details><summary>答案与解释</summary>

不是，它指两次验证检查，可能跨越十轮。应同时给验证频率和具体触发约定。

</details>

#### 3. 保存与恢复

训练停止后直接使用内存中的最后参数，是否自动得到最佳参数？

<details><summary>答案与解释</summary>

不一定。需显式保存并恢复最佳检查点，或核对框架是否自动恢复；停止本身不保证恢复。

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
