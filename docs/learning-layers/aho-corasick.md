# Aho-Corasick

概念编号：`concept:aho-corasick` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/aho-corasick/)

## 第一层：概念入门 · 知其然

### 它是什么

Aho–Corasick searches many patterns together using a trie, failure links and output information. Trie prefixes share work; failure links represent a useful suffix when the next transition is missing.

### 先看一个例子

For patterns he, she and hers, the trie shares the prefix he between he and hers. Reading she can report both she and its suffix he through output/failure information. This differs from KMP’s single-pattern prefix table.

### 理解练习

用自己的话解释：上面的情景为什么是“Aho-Corasick”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Aho–Corasick searches many patterns together using a trie, failure links and output information. Trie prefixes share work; failure links represent a useful suffix when the next transition is missing.

情景依据：For patterns he, she and hers, the trie shares the prefix he between he and hers. Reading she can report both she and its suffix he through output/failure information. This differs from KMP’s single-pattern prefix table.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

Build the trie for total pattern length M and failure links in breadth-first order. Scan text through transitions and failure links, reporting outputs at reached states. With an appropriate transition representation, scan cost is O(n+z), where z is the number of reported matches.


### 适用边界与常见误解

State the transition implementation and include the actual number of reported matches in complexity.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
