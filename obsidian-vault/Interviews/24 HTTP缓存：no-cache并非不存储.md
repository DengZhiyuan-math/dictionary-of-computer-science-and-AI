---
title: "HTTP缓存：no-cache并非不存储"
aliases: []
tags: ["interview","area/practice"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/口述、复习与表达|口述、复习与表达]]

## 24 · HTTP缓存：no-cache并非不存储

**系统与工程 · 官方文档派生自测**

**来源：** [RFC 9111：Cache-Control](https://www.rfc-editor.org/rfc/rfc9111.html#section-5.2.2)，IETF，核对 2026-10-16。支持 no-cache、no-store、max-age 的缓存含义；不是隐私或安全的全面保证。

### 问题

说明响应头 no-cache、no-store 和 max-age 的区别，及 ETag 如何参与验证。

### 答题思路

1. no-cache可存但复用前需成功验证；no-store要求缓存不存储该请求/响应相关内容。
2. max-age限定新鲜度，具体计算还涉及年龄，不能只看本机经过秒数。
3. 缓存用条件请求验证，304可让其复用已有表示；身份内容还需正确Vary及共享缓存策略。

### 手算例子

输入：已缓存正文V1及ETag e1，响应要求no-cache；再次读取

1. 发送If-None-Match:e1而非直接展示旧正文。
2. 若源站返回304且验证成功，复用V1。

结果：发生网络验证，但不必重新下载完整正文

### 追问与答案

no-store能清除所有此前泄露的副本吗？

<details>
<summary>查看参考答案</summary>

不能；它约束缓存处理语义，不是已传播内容的全局撤销机制或完整隐私保障。

</details>

**易错点：** 把no-cache翻译成禁止缓存；忽略共享缓存中用户身份差异。

## 关联概念与章节

- [[Concepts/缓存与复用|缓存与复用]]
- [[Concepts/网络与服务性能|网络与服务性能]]
- [[Chapters/第 106 讲 来源面试题：官方样题、算法练习与技术追问|第 106 讲]]
- [[Chapters/第 17 讲 计算机网络：一次网页请求经历什么|第 17 讲]]
- [[Chapters/第 18 讲 网络与服务算法：拥塞、限流、缓存、负载均衡|第 18 讲]]
