# API — Application Programming Interface

概念编号：`concept:api` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/api/)

## 第一层：概念入门 · 知其然

### 它是什么

API是程序之间约定的调用入口，规定输入、输出与错误含义。

### 先看一个例子

GET /orders/7 返回订单7，找不到时返回404。

### 理解练习

返回200但正文是错误信息算成功吗？

<details><summary>答案与解释</summary>

200表示HTTP状态语义上的成功；客户端仍需验证约定的业务字段与结果。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 调用者按契约构造请求，服务端验证后执行操作并编码响应。
2. 状态码、字段类型和重试语义共同决定调用者如何安全处理结果。

### 具体输入与计算步骤

GET /orders/7 返回订单7，找不到时返回404。

1. 连续请求订单7、8、9，状态分别200、404、200，成功读取2个。
2. 若平均每次100毫秒，串行总耗时约3×100=300毫秒，不含额外开销。

计算结果：若平均每次100毫秒，串行总耗时约3×100=300毫秒，不含额外开销。

### 换到实际问题中应用

给网站订单列表接入分页接口。

1. 发送 limit=20，校验返回items为数组，按next_cursor请求下一页。
2. 游标为空时结束，避免把空列表当网络错误无限重试。

应用结论：游标为空时结束，避免把空列表当网络错误无限重试。

### 举一反三：改变条件后的完整解答

创建订单请求超时后能直接重发吗？

<details><summary>变式的推演与答案</summary>

1. 超时可能发生在服务端已创建、响应丢失之后。
2. 使用服务端支持的幂等键查询或重试，避免产生重复订单。

使用服务端支持的幂等键查询或重试，避免产生重复订单。

</details>

### 原有解释与进一步例题


### 原理与推演

An API, or application programming interface, defines the capabilities that a system exposes. Think of it as a restaurant menu: callers know what they can order without knowing how the kitchen works. An SDK supplies development tools and wrappers for a platform. A framework often controls the overall application flow; a library supplies functionality that the application actively calls, though the distinction is not always strict.


### 例子

例子：GET /orders/42 返回订单 42 的状态。调用者只需知道路径、字段和错误约定，不必知道服务器用哪种数据库。若状态查询失败，API 应区分“订单不存在”和“服务暂不可用”，不能都返回一段看似成功的空数据。


### 适用边界与常见误解

Interface conventions and internal implementations should be understood separately.

### 推导与方法参考

- [一手资料](https://www.rfc-editor.org/rfc/rfc9110)

[返回分层目录](00-learning-index.md)
