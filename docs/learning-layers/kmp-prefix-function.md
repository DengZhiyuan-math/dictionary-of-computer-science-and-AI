# KMP Prefix Function

概念编号：`concept:kmp-prefix-function` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kmp-prefix-function/)

## 第一层：概念入门 · 知其然

### 定义

KMP 是在文本中查找一个模式串的字符串匹配算法。它先分析模式自身，记录每个前缀中“同时也是后缀的最长真前缀”的长度；真前缀不能取整个前缀自身，这张记录称为前缀函数。匹配失配时，已匹配内容的某个后缀仍可能对应模式开头，因此可以沿记录缩短候选匹配长度，而不让文本读取位置反复回退。

### 概念边界与常见混淆

保留的后缀必须确实等于模式前缀，不能任意选一段相同长度。KMP解决精确字符匹配，不自动处理同义词、拼写纠错或多个模式的联合索引。

### 先看一个例子

模式为 ABABAC。若已匹配 ABABA，下一文本字符是 B，而模式期待 C，则已读串末尾的 ABA 仍等于模式开头 ABA。保留这个长度 3 的匹配，再把当前 B 与模式第四个字符 B 比较，就得到长度 4，而不用重新读取之前的文本。这一步说明为何模式的自重叠能节省比较。

### 理解练习

#### 1. 真前缀

字符串 AAA 的最长真前缀同时也是后缀的是 AAA 吗？

<details><summary>答案与解释</summary>

不是，真前缀排除整个字符串，因此是 AA，长度 2。若允许整个串，失配时就无法严格缩短候选。

</details>

#### 2. 保留的依据

ABABA 失配后为什么能保留 ABA，而不能保留 BAB？

<details><summary>答案与解释</summary>

ABA 既是已读串的后缀又是模式开头；BAB 不是该模式的前缀。需要同时满足这两个条件。

</details>

#### 3. 匹配范围

模式为“car”，文本只有“automobile”，KMP能靠词义找到吗？

<details><summary>答案与解释</summary>

不能，精确字符序列没有出现。语义相近需要另定义检索规则，不能由字符串精确匹配推出。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. π[i]为截至i的前缀的最长真前后缀长度，真前缀排除整串。
2. 失配时令j=π[j−1]，不断缩短候选；每次前进和回退摊还线性。

### 具体输入与计算步骤

模式abab，求π及在ababab中的匹配。

1. π=[0,0,1,2]。
2. 首个匹配从0开始，保留长度2后继续，第二个从2开始。

计算结果：重叠匹配不会因重置为0而丢失。

### 换到实际问题中应用

流式日志匹配固定关键词。

1. 预处理关键词π，块与块之间保留当前j。
2. 每字符更新状态并在j达到模式长度时报告位置再回退。

应用结论：块边界不能清空状态，否则漏跨块匹配。

### 举一反三：改变条件后的完整解答

模式aaaa的π是什么？

<details><summary>变式的推演与答案</summary>

1. 第2字符可复用a，长度1；第3复用aa，长度2。
2. 第4复用aaa，长度3。

π=[0,1,2,3]，不能把整串长度4当真前缀。

</details>

### 原有解释与进一步例题


### Definition

KMP searches for one pattern using a prefix function that records how much already matched text can be reused after a mismatch. A proper prefix excludes the whole string.


### Parameters and mechanism

For pattern position i, π[i] is the length of the longest proper prefix equal to a suffix of the prefix ending at i. After mismatch, fall back through π rather than restarting the text scan. Standard matching takes O(n+m) for text length n and pattern length m.


### Example

For pattern abab, the prefix-function array is [0,0,1,2]. In text ababab, matches overlap: after a full match, the suffix ab can serve as the matched prefix for the next candidate, without rescanning those letters.


### 适用边界与常见误解

Prefix-function values are lengths. Specify overlap handling after matches and the empty-pattern convention.

### 推导与方法参考

- [一手资料](https://xlinux.nist.gov/dads/HTML/knuthMorrisPratt.html)

[返回分层目录](00-learning-index.md)
