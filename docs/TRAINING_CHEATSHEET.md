# 训练速查：把术语接成一次更新

这页补充公式与纸面计算；口语化解释见[训练选编](../cs_ai_v2_training_terms.md)。以下普通分类形状使用 `B` 表示批量大小、`C` 表示类别或标签数。

## 先定输出与损失

| 任务与接口 | 模型输出 | 目标 | 输入端注意事项 |
| --- | --- | --- | --- |
| 单 logit 二分类，BCEWithLogitsLoss | 浮点 logits，`[B, 1]` | 同形状浮点值，通常是 0/1，也允许软目标 | 损失前不重复 Sigmoid |
| 逐标签多标签，BCEWithLogitsLoss | 浮点 logits，`[B, C]` | 同形状浮点标签 | 各标签可同时为真，不要求和为 1 |
| 互斥多分类，CrossEntropyLoss，类别编号目标 | 浮点 logits，`[B, C]` | 长整型编号，`[B]`，取值 `0..C-1` | 损失前不重复 Softmax |
| 互斥多分类，CrossEntropyLoss，软目标 | 浮点 logits，`[B, C]` | 同形状浮点类别分布 | 目标应为有效分布，不能依赖接口替你校验全部约束 |
| 连续值预测，MSE/MAE/Huber | 浮点数值 | 对齐的真实数值 | 先检查单位、缺失值与异常值 |

二分类也能用两个互斥 logits 配合交叉熵。表格展示常见契约，空间预测等任务会增加其他轴；不要通过无意广播掩盖形状错误。依据：[BCEWithLogitsLoss](https://docs.pytorch.org/docs/2.14/generated/torch.nn.BCEWithLogitsLoss.html)、[CrossEntropyLoss](https://docs.pytorch.org/docs/2.14/generated/torch.nn.CrossEntropyLoss.html)。

## BCE：同样判错，为什么损失差很多

单个二元样本、无权重时，使用自然对数：

$$L=-[y\ln(p)+(1-y)\ln(1-p)]$$

真实垃圾邮件 `y=1` 时：

| 预测概率 p | 以 0.5 为阈值 | BCE |
| --- | --- | --- |
| 0.49 | 错误 | 约 0.713 |
| 0.01 | 错误 | 约 4.605 |

准确率只看硬决策；BCE 还看模型为真实答案分配的概率。公式中的 `p` 是概率，而 `BCEWithLogitsLoss` 接收的是变换前的 `z`。计算说明与接口含义参考 [PyTorch BCE 文档](https://docs.pytorch.org/docs/2.14/generated/torch.nn.BCEWithLogitsLoss.html)。

## 学习率：先用最简单的 SGD 算一步

没有动量与权重衰减时：

$$\theta_{t+1}=\theta_t-\eta g_t$$

`θ=2`、`g=0.4`、`η=0.1`，更新后 `θ=1.96`；学习率改成 `0.01`，则为 `1.996`。Adam 等算法还会处理历史统计，不能直接照套这个数值例子。调度器改变的是学习率随进度变化的方式，具体调用顺序应参照[优化器与调度器文档](https://docs.pytorch.org/docs/2.14/optim.html)。

## 一次更新的逻辑顺序

1. 在更新组边界清空旧梯度。
2. 前向计算原始输出，按正确契约计算损失。
3. 反向计算并累计梯度。
4. 若使用缩放，在组结束时还原梯度尺度；若裁剪，在还原后裁剪。
5. 执行实际参数更新。
6. 按调度规则处理学习率，并记录本次更新与指标。

评估时切换适当层行为，并关闭不需要的梯度记录。`eval()` 与 `no_grad()` 各自负责不同事情。自动混合精度可能跳过非有限梯度对应的更新，按实际更新数调度时应跟踪这一点。依据：[AMP 示例中的梯度裁剪与累积](https://docs.pytorch.org/docs/2.14/notes/amp_examples.html)。

## 梯度累积：别漏掉尾部

等大小小批时，常用估算：

$$B_{effective}=B_{micro}\times A\times W$$

其中 `A` 是每次更新累积的小批数，`W` 是数据并行设备数。这要求各设备和小批大小一致，且损失归一化方式匹配；变长序列还可能需要按有效 token 数计权。

一轮有 10 个等大小小批、每 4 批更新、保留尾部，则更新分组是 `4 + 4 + 2`，共 3 次。若按每组样本平均损失，尾组除以 2，不能机械沿用除以 4。跨轮累积或丢弃尾部也可作为明确策略，但日志应反映真实处理的数据与更新次数。缩放和累积的边界参见 [PyTorch AMP 示例](https://docs.pytorch.org/docs/2.14/notes/amp_examples.html)。

## 指标：不要让高准确率掩盖漏报

1000 封邮件，真实垃圾邮件 100 封。报出 80 封，其中正确 60 封：

| | 真实正类 | 真实负类 |
| --- | --- | --- |
| 预测正类 | TP = 60 | FP = 20 |
| 预测负类 | FN = 40 | TN = 880 |

- Precision = `TP / (TP + FP)` = 75%。
- Recall = `TP / (TP + FN)` = 60%。
- F1 = `2TP / (2TP + FP + FN)` ≈ 66.7%。
- Accuracy = `(TP + TN) / 1000` = 94%。

全部预测为正常的模型也有 90% 准确率，但召回率为零。分母为零时要说明指标的处理约定；多类任务还要说明平均方式。[第 38 讲](../chapters/38.md)继续讨论 AUC、校准、验证和特征解释。

## 常见误解

| 听起来相近 | 应当区分 |
| --- | --- |
| 学习率衰减／权重衰减 | 一个改变更新步幅规则，一个对权重施加收缩倾向 |
| Backward／Step | 一个求梯度，一个实际更新参数 |
| Eval／No grad | 一个切换特定层行为，一个关闭梯度记录 |
| Checkpoint／Activation checkpointing | 一个保存状态，一个重算激活以换显存 |
| AUC 高／概率准 | 排序区分好，不保证概率校准好 |
| PPO clipping／梯度裁剪 | 一个作用于策略目标，一个限制梯度幅度 |

查完整解释：[术语词典](GLOSSARY.md) · [小节索引](../cs_ai_v2_index.md)。
