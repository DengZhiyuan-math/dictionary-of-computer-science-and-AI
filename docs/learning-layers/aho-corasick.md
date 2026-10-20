# Aho-Corasick

概念编号：`concept:aho-corasick` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/aho-corasick/)

## 第一层：概念入门 · 知其然

### 它是什么

Aho–Corasick把多个模式放进前缀树，并用失败链接复用后缀，一次扫描同时找很多词。

### 先看一个例子

检查一句话是否出现多个关键词，不必为每个词完整重扫一遍。

### 理解练习

文本she为什么应该同时匹配he？

<details><summary>答案与解释</summary>

he是she的后缀，失败或输出链接保留该模式的结束信息。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 前缀树状态表示当前匹配前缀，失败链接指向最长可用真后缀状态。
2. 输出既含本节点结束的模式，也含失败链上结束的模式；扫描成本还需加输出数。

### 具体输入与计算步骤

2个模式he、she，长度3的文本she。

1. 沿s→sh→she，到she输出she。
2. she的失败链接指向he，继承输出he。

计算结果：得到she起点0、he起点1两个匹配。

### 换到实际问题中应用

多关键词内容扫描。

1. 建立一次自动机，多篇文本分别从根开始扫描。
2. 明确大小写和Unicode规范化规则，并限制报告过多匹配的资源。

应用结论：匹配结果只表示字面出现，语境判定另做。

### 举一反三：改变条件后的完整解答

只输出当前节点模式会怎样？

<details><summary>变式的推演与答案</summary>

1. 在she终点只报she。
2. 后缀he会漏掉。

必须沿输出链接或预先继承输出集合。

</details>

### 原有解释与进一步例题


### Definition

Aho–Corasick searches many patterns together using a trie, failure links and output information. Trie prefixes share work; failure links represent a useful suffix when the next transition is missing.


### Parameters and mechanism

Build the trie for total pattern length M and failure links in breadth-first order. Scan text through transitions and failure links, reporting outputs at reached states. With an appropriate transition representation, scan cost is O(n+z), where z is the number of reported matches.


### Example

For patterns he, she and hers, the trie shares the prefix he between he and hers. Reading she can report both she and its suffix he through output/failure information. This differs from KMP’s single-pattern prefix table.


### 适用边界与常见误解

State the transition implementation and include the actual number of reported matches in complexity.

### 推导与方法参考

- [一手资料](https://doi.org/10.1145/360825.360855)

[返回分层目录](00-learning-index.md)
