# Canonical Key

概念编号：`concept:canonical-key` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/canonical-key/)

## 第一层：概念入门 · 知其然

### 它是什么

The difficulty with anagram grouping is not how to append the list, but constructing the same keys for the same class of objects. The sorted character sequence can be used as the key; when the question is limited to lowercase English letters, the twenty-six character count can also be used as the key. For example, the character order of eat and tea is different, but the frequency array is the same. This idea is called normalized representation: eliminating unimportant order differences.

### 先看一个例子

For example, the character order of eat and tea is different, but the frequency array is the same. This idea is called normalized representation: eliminating unimportant order differences.

### 理解练习

用自己的话解释：上面的情景为什么是“Canonical Key”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：The difficulty with anagram grouping is not how to append the list, but constructing the same keys for the same class of objects. The sorted character sequence can be used as the key; when the question is limited to lowercase English letters, the twenty-six character count can also be used as the key. For example, the character order of eat and tea is different, but the frequency array is the same. This idea is called normalized representation: eliminating unimportant order differences.

情景依据：For example, the character order of eat and tea is different, but the frequency array is the same. This idea is called normalized representation: eliminating unimportant order differences.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Keys must be unambiguous. Do not concatenate multiple counts into a number string without separation, otherwise different counts may result in the same string. Sorting keys incur additional character sorting costs; counting keys for a fixed alphabet can be constructed linearly based on the total number of characters, but the twenty-six position premise cannot be directly generalized to all character sets.


### 适用边界与常见误解

Character counts can identify anagrams. Composite keys must encode those counts unambiguously.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
