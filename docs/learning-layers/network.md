# Network

概念编号：`concept:network` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/network/)

## 第一层：概念入门 · 知其然

### 它是什么

网络请求经过命名解析、连接、传输和应用处理，延迟与吞吐分别描述等多久和传多少。

### 先看一个例子

往返延迟20毫秒，传1 MB数据，链路速率10 MB/秒，假设已有连接。

### 理解练习

带宽翻倍会让所有延迟都减半吗？

<details><summary>答案与解释</summary>

不会，传播往返与服务处理不随带宽同比缩短。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 简化总时间为固定等待加数据大小除有效速率。
2. TCP提供可靠有序字节流，但应用消息边界、超时重试与幂等仍需应用定义。

### 具体输入与计算步骤

往返延迟20毫秒，传1 MB数据，链路速率10 MB/秒，假设已有连接。

1. 传输时间1/10秒=100毫秒。
2. 加往返约120毫秒，不含拥塞、丢包与服务端处理。

计算结果：加往返约120毫秒，不含拥塞、丢包与服务端处理。

### 换到实际问题中应用

排查网页首次打开慢。

1. 分别测DNS、建连、TLS、首字节与下载，定位占主导阶段。
2. 按证据使用连接复用、压缩或缓存，避免把服务端慢一律归因带宽。

应用结论：按证据使用连接复用、压缩或缓存，避免把服务端慢一律归因带宽。

### 举一反三：改变条件后的完整解答

带宽升至20 MB/秒，其余不变，总时间多少？

<details><summary>变式的推演与答案</summary>

1. 传输1/20秒=50毫秒。
2. 总约20+50=70毫秒，是120/70≈1.71倍加速，而非2倍。

总约20+50=70毫秒，是120/70≈1.71倍加速，而非2倍。

</details>

### 原有解释与进一步例题


### 原理与推演

Networks enable data transfer between devices. An IP address identifies a communication endpoint. A packet is a unit of network-transmitted data. Routers forward packets toward their destinations. DNS, the Domain Name System, resolves human-readable domain names to relevant network addresses.

A simplified page request proceeds as follows. The user enters a URL; the device resolves an address through DNS, establishes the necessary network connection and secure session, and sends an HTTP request. The server processes it, perhaps accesses a database, and returns HTML, JSON, or other resources. The browser then loads styles, scripts, and images and renders the page.

Latency measures round-trip waiting or response time; bandwidth is a link's data-carrying capacity; throughput is the data transfer actually achieved. A CDN, or content delivery network, caches content closer to users. A load balancer distributes requests across service instances. A reverse proxy receives and forwards requests on a server's behalf. A firewall restricts network traffic according to rules.

A retry repeats a request after a failure; a timeout prevents indefinite waiting. Exponential backoff increases the wait after successive failures. Adding random jitter helps prevent clients from retrying simultaneously. Idempotency means that repeating an operation has the same final effect as performing it once. Payment services often require idempotency request IDs because clients may retry after network timeouts, but must not charge repeatedly.


### 例子

例子：浏览器查询服务名得到地址，再建立传输连接并发送 HTTP 请求。一次应用请求可分成多个网络包；某包重传与用户重试完整业务请求不是同一件事。业务重试仍需用操作身份防止重复处理。


### 适用边界与常见误解

Latency and throughput are different indicators, and service reliability also involves retries and idempotence.

### 推导与方法参考

- [一手资料](https://www.rfc-editor.org/rfc/rfc9293)

[返回分层目录](00-learning-index.md)
