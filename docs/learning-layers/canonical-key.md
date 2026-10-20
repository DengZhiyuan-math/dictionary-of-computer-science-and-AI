# Canonical Key

概念编号：`concept:canonical-key` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/canonical-key/)

## 第一层：概念入门 · 知其然

### 定义

规范化键是把按任务规则视为等价的对象映射到统一表示的标识。理想情况下，等价对象得到同一键，不等价对象得到不同键，才能用键完成可靠去重或分组。关键首先是定义等价关系；排序、大小写转换、去空格等只是可能的构造操作，不能随意改变原问题中有意义的信息。

### 概念边界与常见混淆

规范化键不同于一般哈希值。有限长度哈希可能碰撞，通常还需比较原始或规范表示。一个键是否正确必须针对约定等价关系，而不是只看它算得快或看起来整洁。

### 先看一个例子

把由相同字符及重复次数组成的词归为一组，规定忽略字符次序但保留大小写。eat 与 tea 排序都得 aet，可同组；eat 与 Eat 不同组。aab 与 abb 也不同，因为重复次数不同。若只用字符集合 {a,b} 作键，会把后两者错误合并。

### 理解练习

#### 1. 重复信息

字符集合能否正确区分 aab 与 abb？

<details><summary>答案与解释</summary>

不能，两者集合相同，但次数不同。若任务保留次数，应用排序串或计数等能保留重复的信息。

</details>

#### 2. 任务约定

用户名 Alice 与 alice 是否应使用同一键？

<details><summary>答案与解释</summary>

取决于系统是否规定大小写等价。不能仅因为转换小写方便就把两个原本不同的账户合并。

</details>

#### 3. 哈希碰撞

两个文件哈希相同，是否在逻辑上绝对证明内容相同？

<details><summary>答案与解释</summary>

对一般有限长度哈希不能绝对保证。实际可以根据碰撞风险制定流程，严格判等仍要核对内容或采用满足任务要求的额外验证。

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
