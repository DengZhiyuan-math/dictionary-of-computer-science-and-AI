---
title: "KMP 与前缀函数"
aliases: ["KMP Prefix Function"]
tags: ["concept","area/algorithms"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# KMP 与前缀函数

**KMP Prefix Function** · [[Areas/数据结构与算法|数据结构与算法]]

## 定义

利用已匹配部分的真前后缀在失配后复用比较信息。

## 易混点与边界

前缀函数值是长度，报告匹配后要处理重叠和空模式约定。

## 推荐先修

可先结合下面的章节读定义与例子；没有额外指定的先修关系。

## 继续学习

可沿下方的应用、对照与章节继续阅读。

## 应用、关联与对照

- **有解释的关联** [[Concepts/多模式自动机|多模式自动机]]：失配后复用后缀信息的思想跨越单模式与多模式。

## 章节依据

- [[Chapters/第 101 讲 算法进阶 · 字符串匹配：KMP、Trie 与多模式|第 101 讲 · 算法进阶 · 字符串匹配：KMP、Trie 与多模式]]

## 所在路线

- [[Routes/算法思想地图|算法思想地图]]

## 具体案例与可视化

- [[Examples/38 KMP：失配时退到哪个边界|案例 38 · KMP：失配时退到哪个边界]]

## 面试准备题

- [[Interviews/09 KMP：失配后保留已验证的信息|面试 09 · KMP：失配后保留已验证的信息]]
