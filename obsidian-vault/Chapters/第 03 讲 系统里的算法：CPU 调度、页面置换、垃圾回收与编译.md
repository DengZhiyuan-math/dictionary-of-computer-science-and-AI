---
title: "第 03 讲 · 系统里的算法：CPU 调度、页面置换、垃圾回收与编译"
aliases: []
tags: ["chapter","area/systems"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/计算机系统与软件|计算机系统与软件]]

## 本讲概念

- [[Concepts/操作系统与资源管理|操作系统与资源管理]]

<a id="chapter-03"></a>

## 第 03 讲｜系统里的算法：CPU 调度、页面置换、垃圾回收与编译

领域：计算机系统补充 · 细讲

<a id="chapter-03-section-01"></a>

### FCFS、Round Robin、SJF、MLFQ【认识】

操作系统调度决定谁获得 CPU。先来先服务简单，但长任务可能挡住短任务。Round robin 给各任务轮流分配时间片，兼顾响应。最短任务优先利用任务时长信息减少某些等待，但真实时长不总可知，也可能让长任务饥饿。多级反馈队列根据任务运行行为调整优先级，在交互响应与吞吐之间折中。调度算法的好坏取决于目标，不是只看总运算次数。

<a id="chapter-03-section-02"></a>

### Page、Page Fault、FIFO、LRU、Clock【重点】

虚拟内存按页管理映射。访问尚不在所需内存位置的页会触发缺页处理，可能涉及读取存储。FIFO 置换最早进入的页，LRU 淘汰最近最少使用的页，Clock 用访问标记近似利用近期使用信息。命中率和置换成本都重要。LRU 也用于应用缓存，但 CPU 页管理、数据库缓存和网页缓存是不同系统层次。

<a id="chapter-03-section-03"></a>

### Mutex、Semaphore、Atomic、CAS【重点】

Mutex 让某段共享资源同一时刻只由一个执行者进入。Semaphore 用计数控制可同时访问资源的数量。Atomic operation 是对并发观察者不可被拆开看到中间状态的操作。CAS，比较并交换，仅当当前位置还是预期值时才更新，常用于构建并发结构。无锁不等于没有竞争，也不保证每个线程都以公平速度推进。

<a id="chapter-03-section-04"></a>

### Deadlock、Starvation、Livelock【认识】

死锁是相互等待而无法继续。饥饿是某个任务长期拿不到资源，尽管系统整体还在前进。活锁是任务不断响应彼此并改变状态，却没有实际完成工作。固定加锁顺序、超时、死锁检测等处理不同风险。银行家算法是基于资源需求与安全状态的经典死锁避免方法，但不是所有操作系统都照搬它管理全部资源。

<a id="chapter-03-section-05"></a>

### Garbage Collection、Reference Counting、Mark-and-Sweep【重点】

垃圾回收寻找不再需要的对象并回收内存。引用计数跟踪对象还被多少引用持有，能及时释放部分对象，但循环引用需要额外处理。标记清扫从仍可到达的根对象追踪，再回收不可达对象。分代回收利用许多对象寿命很短的观察。自动回收不等于没有内存泄漏：程序一直错误地保留引用，对象就仍然可达。

<a id="chapter-03-section-06"></a>

### Lexer、Parser、AST、IR、JIT【重点】

词法分析把源代码分成 token，语法分析组织结构，AST 是抽象语法树。编译器把代码转成中间表示 IR，作优化后生成目标代码。JIT 在运行期间编译，可利用实际执行信息。编译器的 token 与 LLM tokenizer 的 token 同名但用途不同。优化要保持程序语义，不能仅因为更快就任意改结果。

<a id="chapter-03-section-07"></a>

### Event Loop、I/O Multiplexing、Thread Pool、Backpressure【重点】

事件循环在操作就绪时推进对应任务，I/O 多路复用让单个等待机制监视多个连接，线程池复用工作线程避免频繁创建。背压让处理不过来的下游要求上游减速，防止队列无限增长。异步能减少等待浪费，但 CPU 密集计算不会因为写成异步就自动获得更多算力。

参考资料（不朗读）：[S005 · Arpaci-Dusseau and Arpaci-Dusseau — Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/)；[S006 · LLVM — Compiler Infrastructure](https://llvm.org/docs/)；[S007 · Python — asyncio](https://docs.python.org/3/library/asyncio.html)
