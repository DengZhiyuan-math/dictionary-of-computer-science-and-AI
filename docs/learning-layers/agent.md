# Agent

概念编号：`concept:agent` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/agent/)

## 第一层：概念入门 · 知其然

### 它是什么

A fixed workflow arranges major steps such as retrieval, generation and review in advance. An agent loop chooses the next tool or action from current results. ReAct alternates reasoning, action and observation. More autonomous decisions do not necessarily improve reliability. Repeated tasks often suit fixed processes, while open-ended tasks require more dynamic choices. Both can be combined without turning the whole system into an unconstrained loop.

### 先看一个例子

例子：固定工作流总是先检索、再写答案；一个受限智能体先检索，发现缺少日期后选择再次查原文，证据齐全才生成答案。允许的工具、最大调用数和停止条件必须事先明确；它不能把网页中的指令当成用户授权。

### 理解练习

用自己的话解释：上面的情景为什么是“Agent”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：A fixed workflow arranges major steps such as retrieval, generation and review in advance. An agent loop chooses the next tool or action from current results. ReAct alternates reasoning, action and observation. More autonomous decisions do not necessarily improve reliability. Repeated tasks often suit fixed processes, while open-ended tasks require more dynamic choices. Both can be combined without turning the whole system into an unconstrained loop.

情景依据：例子：固定工作流总是先检索、再写答案；一个受限智能体先检索，发现缺少日期后选择再次查原文，证据齐全才生成答案。允许的工具、最大调用数和停止条件必须事先明确；它不能把网页中的指令当成用户授权。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A fixed workflow arranges major steps such as retrieval, generation and review in advance. An agent loop chooses the next tool or action from current results. ReAct alternates reasoning, action and observation. More autonomous decisions do not necessarily improve reliability. Repeated tasks often suit fixed processes, while open-ended tasks require more dynamic choices. Both can be combined without turning the whole system into an unconstrained loop.


### 例子

例子：固定工作流总是先检索、再写答案；一个受限智能体先检索，发现缺少日期后选择再次查原文，证据齐全才生成答案。允许的工具、最大调用数和停止条件必须事先明确；它不能把网页中的指令当成用户授权。


### 适用边界与常见误解

Generating a tool call does not by itself create a reliable task-execution loop.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
