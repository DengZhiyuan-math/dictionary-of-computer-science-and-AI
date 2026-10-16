# 面试题库的来源核对与使用边界

核对日期：2026-10-16。此轮新增 **36 题**，算法 18 题、系统与工程 9 题、机器学习与 AI 9 题。每题包含原创答题思路、可手算输入、至少两步推演、结果、追问答案和易错点。完整记录在 [data/interviews.mjs](../data/interviews.mjs)。

本题库不将来源不明的“某公司高频题”改写为真题。**本轮未收录可核验的某次真实面试问答记录**。公司公开教学样题、算法原站练习、技术文档派生自测分别标注；它们都不能证明某岗位、地区、轮次实际问过，也不提供出现概率。

| 标识 | 本轮数量 | 可以证明什么 |
| --- | ---: | --- |
| `company-sample` | 3 | 公司招聘官网公开讲解过具体样题；不是实际面试记录 |
| `official-practice` | 16 | 算法题原站公开题面及其约束；没有公司归属推断 |
| `documentation-derived` | 17 | 源技术文档支持相关语义；问题、例子和解答由本仓库原创整理 |

## 公司官方公开样题

[Amazon Jobs 的 software development interview topics](https://amazon.jobs/content/en-gb/how-we-hire/interview-prep/software-development-topics) 页面直接提供以下三份文字稿的下载入口。通过下载 DOCX 并读取 `word/document.xml` 核对正文；不转载文字稿。

| 本库题号 | 官方材料与定位 | 核验范围 |
| --- | --- | --- |
| algo-01 | [Amazon Coding Sample transcript](https://cdn.cms.amazon.jobs/46/56/87e44d2d4347a200acf9f50b023f/amazon-coding-sample-transcript.docx)，2:45 起 | 以 run-length encoding 讲解编码面试；本库另拟输入及流式追问 |
| algo-02 | [SDE Interview Coding Example transcript](https://cdn.cms.amazon.jobs/df/32/16e9875b4410ae36f65d6a2ddaf0/sde-interview-coding-sample-transcript.docx)，1:31、5:11、6:55 起 | 二值机器人快照、单步距离、数量检查与有序位置对应；本库把离散条件写明，不扩张为物理模拟 |
| eng-01 | [Amazon System Design Preparation transcript](https://cdn.cms.amazon.jobs/c5/ae/aa42c7554e87acfc8090595efd12/amazon-system-design-preparation-transcript.docx)，1:11 起 | 公开样题为在线书店；本库的库存1、并发下单和支付重放分析为原创扩展 |

文字稿可能保留录制时的工具和流程信息，因此本库不据此声称当前考试时长、工具或流程固定。官方技术准备材料可作为准备方向，不能当作面试题泄露。

## 算法原站公开练习

仅使用可公开读取的题面；未使用会员题内容、付费解答或公司标签推断。这里的中文题意为简短重述，全部数值例子和答题分析重新组织。

| 本库题号 | 原站题目 | 本库重点 |
| --- | --- | --- |
| algo-03 | [LeetCode 703](https://leetcode.com/problems/kth-largest-element-in-a-stream/) | 流式堆与出现次数 |
| algo-04 | [LeetCode 211](https://leetcode.com/problems/design-add-and-search-words-data-structure/) | 通配 Trie 与分支复杂度 |
| algo-05 | [LeetCode 743](https://leetcode.com/problems/network-delay-time/) | 非负权前提、不可达 |
| algo-06 | [LeetCode 23](https://leetcode.com/problems/merge-k-sorted-lists/) | 多路候选前沿与流式水位线追问 |
| algo-07 | [LeetCode 435](https://leetcode.com/problems/non-overlapping-intervals/) | 交换论证与加权目标边界 |
| algo-08 | [LeetCode 684](https://leetcode.com/problems/redundant-connection/) | 并查集、增量连通与删除限制 |
| algo-09 | [LeetCode 28](https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/) | KMP 与哈希碰撞边界 |
| algo-10 | [LeetCode 307](https://leetcode.com/problems/range-sum-query-mutable/) | 单点赋值、差量与动态区间和 |
| algo-11 | [LeetCode 322](https://leetcode.com/problems/coin-change/) | 完全背包、贪心反例、伪多项式 |
| algo-12 | [LeetCode 1631](https://leetcode.com/problems/path-with-minimum-effort/) | 瓶颈路径与阈值可行性 |
| algo-13 | [LeetCode 421](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/) | 二进制 Trie、位宽约定 |
| algo-14 | [LeetCode 209](https://leetcode.com/problems/minimum-size-subarray-sum/) | 正数滑窗前提 |
| algo-15 | [LeetCode 862](https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/) | 负数输入、前缀支配与单调队列 |
| algo-16 | [LeetCode 297](https://leetcode.com/problems/serialize-and-deserialize-binary-tree/) | 树编码协议与空节点 |
| algo-17 | [LeetCode 315](https://leetcode.com/problems/count-of-smaller-numbers-after-self/) | 离散化、重复值、顺序计数 |
| algo-18 | [LeetCode 621](https://leetcode.com/problems/task-scheduler/) | 计数下界与调度模型的适用条件 |

与 Hot 100 有少量重叠的题用于增加证明、流式或约束变化追问，不声称 16 道全是此前从未出现的新题。公开题目的扩展提问是本库原创，并非原站附加要求。

## 官方文档派生自测

以下均为 `documentation-derived`，**不能称公司面试真题**。技术标准只支持相关技术事实，不为本库的系统方案背书。

| 本库题号 | 一手来源 | 原创自测重点 |
| --- | --- | --- |
| eng-02 | [PostgreSQL 18 Transaction Isolation](https://www.postgresql.org/docs/18/transaction-iso.html) | 语句快照时间线 |
| eng-03 | [PostgreSQL 18 Multicolumn Indexes](https://www.postgresql.org/docs/18/indexes-multicolumn.html) | 多列索引与实际计划；不忽略 skip scan |
| eng-04 | [PostgreSQL 18 Explicit Locking](https://www.postgresql.org/docs/18/explicit-locking.html#LOCKING-DEADLOCKS) | 两账户等待环与整事务重试 |
| eng-05 | [RFC 9110 §9.2.2](https://www.rfc-editor.org/rfc/rfc9110.html#section-9.2.2) | 幂等效果与业务去重设计 |
| eng-06 | [RFC 9111 §5.2.2](https://www.rfc-editor.org/rfc/rfc9111.html#section-5.2.2) | no-cache、no-store 与验证 |
| eng-07 | [Python Condition objects](https://docs.python.org/3/library/threading.html#condition-objects) | 通知后循环复查共享谓词 |
| eng-08 | [AWS Builders Library：timeouts/retries/backoff/jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) | 给定尝试次数模型的27倍放大 |
| eng-09 | [Redis EXPIRE](https://redis.io/docs/latest/commands/expire/) | 覆盖写与TTL生命周期 |
| ai-01 | [PyTorch 2.14 BCEWithLogitsLoss](https://docs.pytorch.org/docs/2.14/generated/torch.nn.BCEWithLogitsLoss.html) | logit=0时的损失和梯度 |
| ai-02 | [PyTorch 2.14 CrossEntropyLoss](https://docs.pytorch.org/docs/2.14/generated/torch.nn.CrossEntropyLoss.html) | 互斥类别、共同平移 |
| ai-03 | [PyTorch 2.14 Gradient accumulation](https://docs.pytorch.org/docs/2.14/notes/amp_examples.html#gradient-accumulation) | 不等长微批的样本权重 |
| ai-04 | [PyTorch 2.14 Dropout](https://docs.pytorch.org/docs/2.14/generated/torch.nn.Dropout.html) | 保持期望、eval与no_grad分工 |
| ai-05 | [PyTorch 2.14 functional SDPA](https://docs.pytorch.org/docs/2.14/generated/torch.nn.functional.scaled_dot_product_attention.html) | mask位置与API约定 |
| ai-06 | [Transformers：How caching works](https://huggingface.co/docs/transformers/main/cache_explanation) | KV缓存基础内存估算 |
| ai-07 | [scikit-learn Common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html#data-leakage) | 折内fit与预处理泄露 |
| ai-08 | [scikit-learn f1_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html) | 阈值变化的计数结果 |
| ai-09 | [scikit-learn Probability calibration](https://scikit-learn.org/stable/modules/calibration.html) | 排序与概率可信度分离 |

## 可复核与维护

本库源记录保存 `sourceId`、`sourceKind`、发布者、核对日期和 `evidence`。章节编号稳定关联现有 1–97 讲，概念使用知识图谱已有 slug。例子是教学规模，系统设计数字为明确假设；数值输出可手算复核，不能将假设当作实测基准。

Meta Careers coding puzzles 的官方入口在本次网页读取中无法取得题面，未据二手转载收录为公司样题。Microsoft Careers 技术面试说明可证明准备主题，未提供本轮可核验的具体题面，故未贴公司标签。LeetCode 323 页面显示会员限制，未使用其题面。没有可靠一手证据的实际面试归属留空，而不是根据社区公司标签补全。
