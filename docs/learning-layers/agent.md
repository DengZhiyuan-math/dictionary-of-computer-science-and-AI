# Agent

概念编号：`concept:agent` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/agent/)

## 第一层：概念入门 · 知其然

### 定义

在基于语言模型的系统中，智能体通常指围绕目标，反复进行观察、选择行动、执行和读取结果的软件流程。模型可能选择调用搜索、运行计算或请求人工输入；实际工具由软件执行，结果再成为下一次决策的信息。这里的“智能体”描述系统组织方式，不表示模型具有意识，也不表示每一步都应自主执行。

### 概念边界与常见混淆

循环本身不保证正确；必须规定工具权限、停止条件、错误处理和结果核验。对外发送、付款或删除数据是否需要人批准，是系统权限设计，不能由“智能体”名称自动推得。

### 先看一个例子

要回答“这批订单的实际总额”，流程先读取订单表，再调用计算工具求和，检查是否有缺失金额；若有缺失则询问而不是编造，信息完整后再计算并回答。与一次直接生成答案相比，下一步取决于表格和工具实际返回了什么。工具返回失败时也应进入后续判断，而不是把计划当成完成。

### 理解练习

#### 1. 行动与完成

模型写出“我将读取订单表”，是否已证明读过实际表格？

<details><summary>答案与解释</summary>

没有。需要真实调用与返回结果；生成的行动描述不能代替执行证据。

</details>

#### 2. 反馈循环

求和工具返回字段不存在，智能体下一步仍按预定总额回答合适吗？

<details><summary>答案与解释</summary>

不合适。应检查字段或请求信息；反馈决定下一步，失败结果不是可忽略的装饰。

</details>

#### 3. 权限界限

能选择付款工具，是否意味着可以自行批准任何付款？

<details><summary>答案与解释</summary>

不意味着。选择能力与执行权限不同，应由明确授权、金额限制及确认流程控制。

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
