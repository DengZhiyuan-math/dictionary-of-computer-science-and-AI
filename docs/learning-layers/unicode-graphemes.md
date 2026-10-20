# Unicode Grapheme Clusters / UTF-8

概念编号：`concept:unicode-graphemes` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/unicode-graphemes/)

## 第一层：概念入门 · 知其然

### 它是什么

用户看到的一个字符可能由多个Unicode标量组成，也可能编码成多个字节。

### 先看一个例子

字符串由e、组合尖音符、A组成，看起来是“éA”。

### 理解练习

它是3个用户可见字符吗？

<details><summary>答案与解释</summary>

不是，前两个标量组成一个字素簇，总共2个可见字符。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. UTF-8按编码单位计字节，字素分割按Unicode字符边界规则组合标量。
2. 要保完整字符的字节前缀，应逐字素累计其UTF-8长度，超过预算前停止。

### 具体输入与计算步骤

字符串由e、组合尖音符、A组成，看起来是“éA”。

1. e占1字节，组合尖音符占2字节，A占1字节，总4字节。
2. 字节预算3保留完整“é”，预算2则连第一个字素都放不下，返回空前缀。

计算结果：字节预算3保留完整“é”，预算2则连第一个字素都放不下，返回空前缀。

### 换到实际问题中应用

限制昵称UTF-8长度且不拆开表情或组合字符。

1. 使用Unicode感知的字素遍历器，逐个测编码字节长度。
2. 截取完整前缀并保存所用规范化规则，不能用字节切片替代字符边界。

应用结论：截取完整前缀并保存所用规范化规则，不能用字节切片替代字符边界。

### 举一反三：改变条件后的完整解答

若先把“é”规范化为单标量“é”，字节数还一样吗？

<details><summary>变式的推演与答案</summary>

1. 预组合é的UTF-8为2字节，后面A再1字节。
2. 总变3字节但仍2个字素；是否规范化应由接口约定，不能悄悄改变原文。

总变3字节但仍2个字素；是否规范化应由接口约定，不能悄悄改变原文。

</details>

### 原有解释与进一步例题


### 原理与推演

The decomposed string e followed by a combining acute accent contains two Unicode scalars but one grapheme cluster and three UTF-8 bytes. A multi-scalar emoji can also form one Character.

For a byte-limited prefix that preserves characters, visit whole grapheme clusters in order and accumulate each cluster's UTF-8 length. Stop before the next cluster would exceed the budget. Segmentation should use a Unicode-aware library rather than byte slicing.


### 例子

例子：“é”可由一个码点表示，也可由 e 加组合重音组成；后者有两个 Unicode 标量，但用户通常把它视为一个字形簇。按 UTF-8 字节截断还可能破坏编码；限制“10 个可见字符”需先明确计数单位。


### 适用边界与常见误解

Counting characters does not give a byte length. Canonically equivalent text can have different byte sequences. The segmentation version and normalization policy are part of an interoperable text-processing contract.

### 推导与方法参考

- [一手资料](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/stringsandcharacters/)

[返回分层目录](00-learning-index.md)
