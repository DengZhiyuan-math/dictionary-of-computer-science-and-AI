---
title: "Redis TTL：更新值不一定保留过期时间"
aliases: []
tags: ["interview","area/practice"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/口述、复习与表达|口述、复习与表达]]

## 27 · Redis TTL：更新值不一定保留过期时间

**系统与工程 · 官方文档派生自测**

**来源：** [Redis：EXPIRE](https://redis.io/docs/latest/commands/expire/)，Redis，核对 2026-10-16。支持 SET 等覆盖操作对 TTL 的影响以及 EXPIRE 的语义；题目不是完整分布式锁协议。

### 问题

缓存键设置过期时间后又执行普通 SET，TTL 是否必然保留？如何让设计表达清楚？

### 答题思路

1. 普通覆盖SET通常清除旧TTL；要保留需明确使用支持的KEEPTTL语义。
2. 也可在同一SET中显式写EX/PX，而不是SET成功后另发EXPIRE造成中间窗口。
3. 过期与业务新鲜度策略要分开说明；读取命中不能证明数据与源完全一致。

### 手算例子

输入：SET item A EX 60；随后普通SET item B

1. 第一条建立60秒TTL。
2. 第二条覆盖值且未要求保留TTL。

结果：值为B；键变为无过期时间，TTL返回-1（假定未有其他操作）

### 追问与答案

为什么拆成SET再EXPIRE存在风险？

<details>
<summary>查看参考答案</summary>

进程可能在两条命令间崩溃，留下永久键；单条支持TTL的写入避免这类间隙。

</details>

**易错点：** 认为“设过一次TTL”就是永久属性；把TTL缓存直接当成完整分布式锁。

## 关联概念与章节

- [[Concepts/缓存与复用|缓存与复用]]
- [[Chapters/第 106 讲 来源面试题：官方样题、算法练习与技术追问|第 106 讲]]
- [[Chapters/第 18 讲 网络与服务算法：拥塞、限流、缓存、负载均衡|第 18 讲]]
