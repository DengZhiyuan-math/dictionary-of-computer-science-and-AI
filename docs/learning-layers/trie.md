# Trie

概念编号：`concept:trie` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/trie/)

## 第一层：概念入门 · 知其然

### 它是什么

字典树把有相同前缀的词共享路径，适合前缀查找与自动补全。

### 先看一个例子

插入cat与car，从根按字符走边。

### 理解练习

存在路径ca就表示词ca已经插入吗？

<details><summary>答案与解释</summary>

不表示，还需终止标记。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 每层消费一个字符，词尾标记区分完整词与只存在的前缀。
2. 长度L查询通常O(L)，空间依赖实际节点数与孩子表示，不能只按词数估算。

### 具体输入与计算步骤

插入cat与car，从根按字符走边。

1. 先插cat建立c、a、t三个节点；再插car只新增r。
2. 除根共4节点，完整词2个；前缀ca匹配两个词，但本身非词。

计算结果：除根共4节点，完整词2个；前缀ca匹配两个词，但本身非词。

### 换到实际问题中应用

做命令行命令补全。

1. 读取输入前缀走到对应节点，再遍历后代终止节点。
2. 设置返回数量上限并按需要排序，输出成本至少与输出总字符数相关。

应用结论：设置返回数量上限并按需要排序，输出成本至少与输出总字符数相关。

### 举一反三：改变条件后的完整解答

若再插入词ca，需要新增节点吗？

<details><summary>变式的推演与答案</summary>

1. c与a路径已经存在。
2. 无需新增节点，只将a设终止，完整词数变3。

无需新增节点，只将a设终止，完整词数变3。

</details>

### 原有解释与进一步例题


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

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
