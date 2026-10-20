# Trie

概念编号：`concept:trie` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/trie/)

## 第一层：概念入门 · 知其然

### 定义

字典树把字符串按前缀组织成路径：根表示空前缀，每条字符边扩展一位，共同前缀共享节点。节点还需标记某个完整词是否在此结束，因为路径存在不等于该前缀就是已存词。检索沿字符路径前进，适合前缀查询和自动补全。

### 概念边界与常见混淆

字符编码、大小写和空串规则需要定义。节点数量与总前缀数相关，稀疏字符集若预留巨大转移表可能浪费空间。

### 先看一个例子

插入car与cat，共享c、a两步，最后分叉r与t。查询ca路径存在，但若没单独插入ca，它不是完整词；前缀查询则可列出car、cat。若再插入carpet，必须保留car的结束标记。

### 理解练习

#### 1. 词与前缀

ca路径存在就等于词表包含ca吗？

<details><summary>答案与解释</summary>

不等于，还要检查结束标记。

</details>

#### 2. 删除

删除car时直接删掉共享c、a节点合适吗？

<details><summary>答案与解释</summary>

不合适，会破坏cat等词；只删无其他用途的部分并维护结束状态。

</details>

#### 3. 编码

Car与car是否共用同词路径？

<details><summary>答案与解释</summary>

取决于大小写规范，默认不同字符不同边，需先明确等价规则。

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
