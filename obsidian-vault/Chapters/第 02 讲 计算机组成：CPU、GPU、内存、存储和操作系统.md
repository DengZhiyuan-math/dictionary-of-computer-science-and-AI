---
title: "第 02 讲 · 计算机组成：CPU、GPU、内存、存储和操作系统"
aliases: []
tags: ["chapter","area/systems"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/计算机系统与软件|计算机系统与软件]]

## 本讲概念

- [[Concepts/并发／并行|并发／并行]]
- [[Concepts/中央处理器／图形处理器|中央处理器／图形处理器]]
- [[Concepts/操作系统与资源管理|操作系统与资源管理]]

<a id="chapter-02"></a>

## 第 02 讲｜计算机组成：CPU、GPU、内存、存储和操作系统

领域：计算机系统与软件 · 导览 / 复习

计算机的基本执行单元是 CPU，中央处理器。CPU 擅长逻辑判断、顺序执行、处理复杂的控制流程。GPU，图形处理器，擅长大量相似计算同时进行。深度学习中的矩阵运算高度并行，所以 GPU 成为训练和推理的主要硬件之一。GPU 并不是在所有事情上都比 CPU 快；它的优势来自合适的计算任务和足够的数据并行性。

RAM，也叫内存，负责保存运行中的程序和临时数据。SSD 是持久存储，关机之后数据仍然存在。缓存 Cache 是放在更快位置的临时数据副本，用来减少重复访问。CPU 缓存、内存缓存、数据库缓存、网页缓存，背后的思想类似，但作用层级不同。

操作系统，例如 Linux、Windows 和 macOS，负责在硬件与应用程序之间提供统一接口。Kernel，也就是内核，负责核心资源管理。进程 Process 是正在运行的程序实例；线程 Thread 是进程内部的执行单元。一个进程可以有多个线程，它们通常共享同一进程的内存。

并发 Concurrency 指多个任务在一段时间里交替推进；并行 Parallelism 指多个任务真的在同一时刻执行。异步 Asynchronous 指发起一项可能需要等待的操作后，可以先做别的事情，稍后再处理结果。多线程与异步并不等价，异步程序也可以在单线程上运行。

锁 Lock 用来保护共享资源，避免多个执行单元同时修改而产生错误。Race Condition 是结果取决于执行时序的竞争条件。Deadlock 是多个任务相互等待，谁都无法继续。Virtual Memory，虚拟内存，让每个进程看到相对独立的地址空间，操作系统负责映射到真实内存或其他存储位置。

你还会听到 Throughput 和 Latency。Latency 是完成一次请求所需的时间；Throughput 是单位时间内完成多少请求。例如一家餐厅可以平均十分钟完成一桌服务，但每小时能够服务很多桌。吞吐量高不等于单次延迟低。

这些概念是理解 AI 系统性能的基础。比如一个 LLM 运行缓慢，可能是 GPU 算力不足，也可能是显存不足、内存带宽不足、网络通信过慢，或者请求调度不合理。不能一概归结为模型参数太多。

参考资料（不朗读）：[S005 · Arpaci-Dusseau and Arpaci-Dusseau — Operating Systems: Three Easy Pieces](https://pages.cs.wisc.edu/~remzi/OSTEP/)
