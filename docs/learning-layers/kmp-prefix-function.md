# KMP Prefix Function

概念编号：`concept:kmp-prefix-function` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kmp-prefix-function/)

## 第一层：概念入门 · 知其然

### 它是什么

KMP用模式自身的前后缀关系，在失配时保留仍可能匹配的部分，避免文本指针反复退回。

### 先看一个例子

拼积木时尾部恰好像下一轮开头，可以接着拼而非全部拆掉。

### 理解练习

尾部像新开头时为什么不必全重来？

<details><summary>答案与解释</summary>

该尾部已经验证等于模式前缀，前缀函数直接保留这段已知信息。

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
