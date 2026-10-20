# API — Application Programming Interface

概念编号：`concept:api` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/api/)

## 第一层：概念入门 · 知其然

### 它是什么

An API, or application programming interface, defines the capabilities that a system exposes. Think of it as a restaurant menu: callers know what they can order without knowing how the kitchen works. An SDK supplies development tools and wrappers for a platform. A framework often controls the overall application flow; a library supplies functionality that the application actively calls, though the distinction is not always strict.

### 先看一个例子

例子：GET /orders/42 返回订单 42 的状态。调用者只需知道路径、字段和错误约定，不必知道服务器用哪种数据库。若状态查询失败，API 应区分“订单不存在”和“服务暂不可用”，不能都返回一段看似成功的空数据。

### 理解练习

用自己的话解释：上面的情景为什么是“API — Application Programming Interface”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：An API, or application programming interface, defines the capabilities that a system exposes. Think of it as a restaurant menu: callers know what they can order without knowing how the kitchen works. An SDK supplies development tools and wrappers for a platform. A framework often controls the overall application flow; a library supplies functionality that the application actively calls, though the distinction is not always strict.

情景依据：例子：GET /orders/42 返回订单 42 的状态。调用者只需知道路径、字段和错误约定，不必知道服务器用哪种数据库。若状态查询失败，API 应区分“订单不存在”和“服务暂不可用”，不能都返回一段看似成功的空数据。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

An API, or application programming interface, defines the capabilities that a system exposes. Think of it as a restaurant menu: callers know what they can order without knowing how the kitchen works. An SDK supplies development tools and wrappers for a platform. A framework often controls the overall application flow; a library supplies functionality that the application actively calls, though the distinction is not always strict.


### 例子

例子：GET /orders/42 返回订单 42 的状态。调用者只需知道路径、字段和错误约定，不必知道服务器用哪种数据库。若状态查询失败，API 应区分“订单不存在”和“服务暂不可用”，不能都返回一段看似成功的空数据。


### 适用边界与常见误解

Interface conventions and internal implementations should be understood separately.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
