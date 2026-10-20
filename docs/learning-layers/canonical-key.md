# Canonical Key

概念编号：`concept:canonical-key` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/canonical-key/)

## 第一层：概念入门 · 知其然

### 它是什么

规范化键把等价对象转成同一种表示，方便去重与分组。

### 先看一个例子

单词eat、tea、tan按排序后的字母作为键。

### 理解练习

eat和tea为什么属于同组？

<details><summary>答案与解释</summary>

两者的键都是aet，字母及次数相同。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 先明确等价关系，再构造在同一等价类中不变的键。
2. 还需保证不同类不会误合并；只用字母集合会丢失重复次数。

### 具体输入与计算步骤

单词eat、tea、tan按排序后的字母作为键。

1. 排序得到eat→aet、tea→aet、tan→ant。
2. 哈希分组得到{eat,tea}和{tan}，组数2。

计算结果：哈希分组得到{eat,tea}和{tan}，组数2。

### 换到实际问题中应用

对无顺序的商品组合做缓存。

1. 将商品编号排序，并保留每件商品的数量，序列化成无歧义格式。
2. 组合[A,B]与[B,A]共享缓存，组合[A,A,B]保持独立。

应用结论：组合[A,B]与[B,A]共享缓存，组合[A,A,B]保持独立。

### 举一反三：改变条件后的完整解答

若改用去重字母集合，ab和aab会怎样？

<details><summary>变式的推演与答案</summary>

1. 二者都会变成{a,b}。
2. 它们不是字母异位词却被误合并，应改用排序串或字符计数。

它们不是字母异位词却被误合并，应改用排序串或字符计数。

</details>

### 原有解释与进一步例题


### 原理与推演

The difficulty with anagram grouping is not how to append the list, but constructing the same keys for the same class of objects. The sorted character sequence can be used as the key; when the question is limited to lowercase English letters, the twenty-six character count can also be used as the key. For example, the character order of eat and tea is different, but the frequency array is the same. This idea is called normalized representation: eliminating unimportant order differences.

Keys must be unambiguous. Do not concatenate multiple counts into a number string without separation, otherwise different counts may result in the same string. Sorting keys incur additional character sorting costs; counting keys for a fixed alphabet can be constructed linearly based on the total number of characters, but the twenty-six position premise cannot be directly generalized to all character sets.


### 适用边界与常见误解

Character counts can identify anagrams. Composite keys must encode those counts unambiguously.

### 推导与方法参考

- [一手资料](https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/d3e4d64266d481c74c9e7c15e09999fe_MIT6_006F11_lec08.pdf)

[返回分层目录](00-learning-index.md)
