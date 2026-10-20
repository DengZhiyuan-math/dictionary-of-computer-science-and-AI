# Network

概念编号：`concept:network` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/network/)

## 第一层：概念入门 · 知其然

### 它是什么

Networks enable data transfer between devices. An IP address identifies a communication endpoint. A packet is a unit of network-transmitted data. Routers forward packets toward their destinations. DNS, the Domain Name System, resolves human-readable domain names to relevant network addresses.

### 先看一个例子

例子：浏览器查询服务名得到地址，再建立传输连接并发送 HTTP 请求。一次应用请求可分成多个网络包；某包重传与用户重试完整业务请求不是同一件事。业务重试仍需用操作身份防止重复处理。

### 理解练习

用自己的话解释：上面的情景为什么是“Network”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Networks enable data transfer between devices. An IP address identifies a communication endpoint. A packet is a unit of network-transmitted data. Routers forward packets toward their destinations. DNS, the Domain Name System, resolves human-readable domain names to relevant network addresses.

情景依据：例子：浏览器查询服务名得到地址，再建立传输连接并发送 HTTP 请求。一次应用请求可分成多个网络包；某包重传与用户重试完整业务请求不是同一件事。业务重试仍需用操作身份防止重复处理。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

A simplified page request proceeds as follows. The user enters a URL; the device resolves an address through DNS, establishes the necessary network connection and secure session, and sends an HTTP request. The server processes it, perhaps accesses a database, and returns HTML, JSON, or other resources. The browser then loads styles, scripts, and images and renders the page.

Latency measures round-trip waiting or response time; bandwidth is a link's data-carrying capacity; throughput is the data transfer actually achieved. A CDN, or content delivery network, caches content closer to users. A load balancer distributes requests across service instances. A reverse proxy receives and forwards requests on a server's behalf. A firewall restricts network traffic according to rules.

A retry repeats a request after a failure; a timeout prevents indefinite waiting. Exponential backoff increases the wait after successive failures. Adding random jitter helps prevent clients from retrying simultaneously. Idempotency means that repeating an operation has the same final effect as performing it once. Payment services often require idempotency request IDs because clients may retry after network timeouts, but must not charge repeatedly.


### 适用边界与常见误解

Latency and throughput are different indicators, and service reliability also involves retries and idempotence.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
