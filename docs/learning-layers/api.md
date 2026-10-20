# API — Application Programming Interface

概念编号：`concept:api` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/api/)

## 第一层：概念入门 · 知其然

### 定义

API（应用程序编程接口）是供程序调用的一套约定，说明能请求哪些操作、需要什么输入、会产生什么输出以及失败如何表示。接口把使用者需要知道的规则与内部实现分开；它既可以是本地函数，也可以是通过网络调用的服务。接口存在并不保证所有请求都被允许，权限也是约定的一部分。

### 概念边界与常见混淆

响应格式相同不代表语义兼容：数量从“件”改成“箱”会改变含义。网络超时也不等于远端必未执行，重试修改操作时需考虑重复执行。

### 先看一个例子

库存接口约定输入商品编号，返回数量和更新时间；未知编号返回明确的“不存在”错误。程序查询编号 A17，得到数量 8、时间 10:00 后，可展示这份记录，但不能据此保证 10:05 仍有八件。内部库存可以从文件换成数据库，只要外部含义与约定保持兼容，调用者无需知道实现细节。

### 理解练习

#### 1. 接口与实现

API 是否一定是网页地址？

<details><summary>答案与解释</summary>

不是。本地软件库的函数也属于程序接口；网络地址只是某类接口的访问方式。

</details>

#### 2. 错误含义

未知编号返回错误，能否直接当成库存为零？

<details><summary>答案与解释</summary>

不能。商品不存在与已知商品卖完含义不同；若业务要合并处理，应明确规定，而非猜测。

</details>

#### 3. 重试修改

下单请求超时，再发送同一请求一定只产生一张订单吗？

<details><summary>答案与解释</summary>

不一定。第一单可能已创建但响应丢失；需要约定唯一请求标识或其他去重机制，不能仅凭超时推断未执行。

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
