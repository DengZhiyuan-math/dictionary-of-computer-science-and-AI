# KMP Prefix Function

概念编号：`concept:kmp-prefix-function` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kmp-prefix-function/)

## 第一层：概念入门 · 知其然

### 它是什么

KMP searches for one pattern using a prefix function that records how much already matched text can be reused after a mismatch. A proper prefix excludes the whole string.

### 先看一个例子

For pattern abab, the prefix-function array is [0,0,1,2]. In text ababab, matches overlap: after a full match, the suffix ab can serve as the matched prefix for the next candidate, without rescanning those letters.

### 理解练习

用自己的话解释：上面的情景为什么是“KMP Prefix Function”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：KMP searches for one pattern using a prefix function that records how much already matched text can be reused after a mismatch. A proper prefix excludes the whole string.

情景依据：For pattern abab, the prefix-function array is [0,0,1,2]. In text ababab, matches overlap: after a full match, the suffix ab can serve as the matched prefix for the next candidate, without rescanning those letters.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### Parameters and mechanism

For pattern position i, π[i] is the length of the longest proper prefix equal to a suffix of the prefix ending at i. After mismatch, fall back through π rather than restarting the text scan. Standard matching takes O(n+m) for text length n and pattern length m.


### 适用边界与常见误解

Prefix-function values are lengths. Specify overlap handling after matches and the empty-pattern convention.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
