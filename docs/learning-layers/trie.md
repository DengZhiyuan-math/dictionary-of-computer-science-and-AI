# Trie

概念编号：`concept:trie` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/trie/)

## 第一层：概念入门 · 知其然

### 它是什么

Rabin–Karp computes rolling hashes for sliding text windows, quickly filters candidate positions, and verifies the actual characters to guard against collisions. Aho–Corasick organizes many keywords into a trie and adds failure links, finding many patterns in a single scan. It suits dictionary matching and log-rule detection. One uses compact summaries to reduce comparisons; the other shares structure across patterns. Both reuse existing information.

### 先看一个例子

Patterns he, she and hers; text ushers, with zero-based indices 0…5.
Matches include she, he and hers. Producing every match costs time, so complexity must include output count.

### 理解练习

If only the existence of any match matters, must all positions be stored?

<details><summary>答案与解释</summary>

No. Return after the first match. This changes output cost, but the structure’s semantics must remain correct.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Rabin–Karp computes rolling hashes for sliding text windows, quickly filters candidate positions, and verifies the actual characters to guard against collisions. Aho–Corasick organizes many keywords into a trie and adds failure links, finding many patterns in a single scan. It suits dictionary matching and log-rule detection. One uses compact summaries to reduce comparisons; the other shares structure across patterns. Both reuse existing information.


### 适用边界与常见误解

Storage depends on created nodes and child representations. Merely stating linear operation time is incomplete.

### 例题：Multiple Patterns: Several Words Can End at One Position

Patterns he, she and hers; text ushers, with zero-based indices 0…5.

1. At index 3, character e completes she over [1,3].
2. The same position also completes suffix he over [2,3]. Failure links and output relationships must retain this match.
3. Reading r and s completes hers over [2,5]. Matches may overlap; finding one long word does not permit skipping all its characters.

结果：Matches include she, he and hers. Producing every match costs time, so complexity must include output count.

易错点：Checking only the current trie node’s terminal marker can miss shorter patterns on its failure chain.

变式：If only the existence of any match matters, must all positions be stored?

参考答案：No. Return after the first match. This changes output cost, but the structure’s semantics must remain correct.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
