# Aho-Corasick

概念编号：`concept:aho-corasick` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/aho-corasick/)

## 第一层：概念入门 · 知其然

### 定义

Aho–Corasick是在同一文本中同时查找多个模式串的算法。它先把模式放入字典树：共享前缀共用路径，每条字符边扩展一个前缀。再为非根节点建立失败链接，指向当前已匹配串的最长真后缀所对应的字典树前缀节点；真后缀不取整个串，没有非空匹配时回到根。当前字符无法沿原路径继续时，沿链接寻找可继续的位置，从而共享多个模式的匹配工作。

### 概念边界与常见混淆

构建与扫描的成本还取决于字符转移的保存方式和报告的匹配总数。如果文本中出现大量重叠匹配，输出它们本身就需要相应时间，不能笼统声称任何输入都只需与文本长度成正比的总时间。

### 先看一个例子

模式为 he、she、hers，文本为 shers。读到 she 时，既找到 she，也找到末尾的 he；继续读 r，虽然 she 没有 r 子边，后缀 he 可以延伸成 her；再读 s 找到 hers。因此模式可以相互重叠，报告输出时不能只看最长模式而漏掉后缀模式。

### 理解练习

#### 1. 多个输出

读到 she 后只报告 she、不报告 he，是否完整？

<details><summary>答案与解释</summary>

不完整。he 在同一结束位置出现，若任务要求全部匹配，就必须利用后缀输出信息报告它。

</details>

#### 2. 失败链接含义

失败后可以随意跳到另一模式的开头吗？

<details><summary>答案与解释</summary>

不能。跳转必须保留当前已读内容中确实匹配的后缀，否则可能漏报或凭空产生匹配。

</details>

#### 3. 输出成本

一万个匹配位置必须逐个输出，能忽略这些输出的时间吗？

<details><summary>答案与解释</summary>

不能。即使文本只扫描一次，报告也至少要处理这些结果；复杂度应说明匹配输出数这一项。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 前缀树状态表示当前匹配前缀，失败链接指向最长可用真后缀状态。
2. 输出既含本节点结束的模式，也含失败链上结束的模式；扫描成本还需加输出数。

### 具体输入与计算步骤

2个模式he、she，长度3的文本she。

1. 沿s→sh→she，到she输出she。
2. she的失败链接指向he，继承输出he。

计算结果：得到she起点0、he起点1两个匹配。

### 换到实际问题中应用

多关键词内容扫描。

1. 建立一次自动机，多篇文本分别从根开始扫描。
2. 明确大小写和Unicode规范化规则，并限制报告过多匹配的资源。

应用结论：匹配结果只表示字面出现，语境判定另做。

### 举一反三：改变条件后的完整解答

只输出当前节点模式会怎样？

<details><summary>变式的推演与答案</summary>

1. 在she终点只报she。
2. 后缀he会漏掉。

必须沿输出链接或预先继承输出集合。

</details>

### 原有解释与进一步例题


### Definition

Aho–Corasick searches many patterns together using a trie, failure links and output information. Trie prefixes share work; failure links represent a useful suffix when the next transition is missing.


### Parameters and mechanism

Build the trie for total pattern length M and failure links in breadth-first order. Scan text through transitions and failure links, reporting outputs at reached states. With an appropriate transition representation, scan cost is O(n+z), where z is the number of reported matches.


### Example

For patterns he, she and hers, the trie shares the prefix he between he and hers. Reading she can report both she and its suffix he through output/failure information. This differs from KMP’s single-pattern prefix table.


### 适用边界与常见误解

State the transition implementation and include the actual number of reported matches in complexity.

### 推导与方法参考

- [一手资料](https://doi.org/10.1145/360825.360855)

[返回分层目录](00-learning-index.md)
