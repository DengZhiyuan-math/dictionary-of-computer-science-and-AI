# Unicode Grapheme Clusters / UTF-8

概念编号：`concept:unicode-graphemes` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/unicode-graphemes/)

## 第一层：概念入门 · 知其然

### 字符不是唯一的计数单位

显示文字时，要区分内容标识、编码存储和阅读边界。Unicode 给文字元素分配编号，称为码点；Unicode 标量值排除了留作代理编码用途的一段码点。UTF-8 是把这些值编码为字节的方法，一项值可能占多个字节。


### 定义

字素簇是按 Unicode 文本分割规则，把一个或多个码点组织成近似用户所感知字符的单位。它与字节数、标量值个数不是同一概念。讨论字符串长度或截断前，必须先声明使用哪个单位以及所采用的分割规则。

### 理解定义中的术语与关系

#### 同一个显示结果可能有不同表示

字母 e 后接组合尖音符，可以一起显示为带重音的一个字素簇。也可以用预组合的 é 表示。二者可能显示相同，却不必有相同字节串。规范化是按明确规则选择等价文本表示的处理；它和字素分割、大小写转换都不是同一操作。

### 概念边界与常见混淆

字素簇近似阅读单位，不等于屏幕上的固定宽度或语言学上永远唯一的字符定义。实际应用应使用声明版本与规则的 Unicode 库，不能用任意字节切片替代分割。

### 先看一个例子

字符串由 e、组合尖音符和 A 依次组成，显示为 éA。它包含三个标量值、通常两个扩展字素簇，UTF-8 编码共四字节。若要求最多三字节又不能拆开字素簇，可保留整个 é；若预算仅两字节，则不能保留这个三字节的首字素簇。

### 理解练习

#### 1. 长度必须声明单位

接口只写“最多十个字符”，是否足以确定存储限制与界面计数？

<details><summary>答案与解释</summary>

不足。十字节、十个标量值、十个字素簇可能对应不同文本范围。应明确每个限制的目的和计数单位，不能用一个含糊数字替代。

</details>

#### 2. 编码完整仍可能拆开阅读单位

把例子的前一个 e 保留下来而丢掉组合重音，UTF-8 一定损坏了吗？

<details><summary>答案与解释</summary>

不一定，e 本身是合法编码。但显示内容的字素簇被拆开了，失去了重音。编码合法与保留完整用户阅读单位是两项要求。

</details>

#### 3. 规范化改变什么

将分解形式 e 加重音转为预组合 é 后，字节数与阅读单位数一定同步变化吗？

<details><summary>答案与解释</summary>

不会。这个例子中 UTF-8 字节数从三变为二，但两者各自仍是一个字素簇。是否允许规范化要由接口约定，不能为截断偷偷改写内容。

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
