# Agent

概念编号：`concept:agent` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/agent/)

## 第一层：概念入门 · 知其然

### 它是什么

智能体让模型依据目标选择行动、观察结果，再决定下一步。

### 先看一个例子

查询订单先调用订单工具，看到已发货后再查询物流。

### 理解练习

预先固定的两个工具调用一定是智能体吗？

<details><summary>答案与解释</summary>

不一定；若顺序完全固定，更接近工作流，关键在运行时是否自主选择后续动作。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 状态包含目标与已有观察，策略根据状态选择工具或停止。
2. 工具结果进入下一轮状态，因此错误观察会影响后续决策，需检查结果和终止条件。

### 具体输入与计算步骤

查询订单先调用订单工具，看到已发货后再查询物流。

1. 预算3次调用：查订单用1次，查物流用1次，剩1次。
2. 物流返回已签收后停止，总调用2次，避免无意义耗尽预算。

计算结果：物流返回已签收后停止，总调用2次，避免无意义耗尽预算。

### 换到实际问题中应用

自动排查一次构建失败。

1. 先读取日志，定位缺失依赖，再选择检查清单或执行获授权修复。
2. 重新构建并以退出码验证；失败则记录证据与剩余预算。

应用结论：重新构建并以退出码验证；失败则记录证据与剩余预算。

### 举一反三：改变条件后的完整解答

若物流工具超时，能断言订单未发货吗？

<details><summary>变式的推演与答案</summary>

1. 超时只说明没取得观察，不能推翻订单工具的已发货结果。
2. 在剩余预算内重试或报告查询失败，保留已知状态。

在剩余预算内重试或报告查询失败，保留已知状态。

</details>

### 原有解释与进一步例题


### 原理与推演

A fixed workflow arranges major steps such as retrieval, generation and review in advance. An agent loop chooses the next tool or action from current results. ReAct alternates reasoning, action and observation. More autonomous decisions do not necessarily improve reliability. Repeated tasks often suit fixed processes, while open-ended tasks require more dynamic choices. Both can be combined without turning the whole system into an unconstrained loop.


### 例子

例子：固定工作流总是先检索、再写答案；一个受限智能体先检索，发现缺少日期后选择再次查原文，证据齐全才生成答案。允许的工具、最大调用数和停止条件必须事先明确；它不能把网页中的指令当成用户授权。


### 适用边界与常见误解

Generating a tool call does not by itself create a reliable task-execution loop.

### 推导与方法参考

- [一手资料](https://www.anthropic.com/research/building-effective-agents)

[返回分层目录](00-learning-index.md)
