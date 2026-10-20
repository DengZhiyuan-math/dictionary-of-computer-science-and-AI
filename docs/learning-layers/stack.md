# Stack

概念编号：`concept:stack` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/stack/)

## 第一层：概念入门 · 知其然

### 它是什么

栈按后进先出保存尚未完成的任务，像叠盘子先拿走最上面一只。

### 先看一个例子

检查括号串“([])”是否合法。

### 理解练习

遇右括号只检查左右总数相同够吗？

<details><summary>答案与解释</summary>

不够，顺序与类型也要匹配，例如“([)]”不合法。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 遇左括号入栈；遇右括号必须与最近未匹配的左括号相配。
2. 栈顶代表最内层上下文，最后栈空才说明所有打开的层都关闭。

### 具体输入与计算步骤

检查括号串“([])”是否合法。

1. 读左圆括号后栈只有“(”；再读左方括号，栈自底向顶为“(、[”。
2. 读“]”弹[，读“)”弹(，栈空且无失配，结果合法。

计算结果：读“]”弹[，读“)”弹(，栈空且无失配，结果合法。

### 换到实际问题中应用

解析嵌套表达式“2[a3[b]]”。

1. 遇“[”保存外层字符串与重复次数，建立新层。
2. 内层3[b]变bbb，外层a+bbb变abbb再重复2次，得到abbbabbb。

应用结论：内层3[b]变bbb，外层a+bbb变abbb再重复2次，得到abbbabbb。

### 举一反三：改变条件后的完整解答

把输入换为“([)]”，首次失配在哪？

<details><summary>变式的推演与答案</summary>

1. 读到“)”时栈顶是“[”。
2. 类型不匹配，立即失败，即使最后左右括号数量相同也无效。

类型不匹配，立即失败，即使最后左右括号数量相同也无效。

</details>

### 原有解释与进一步例题


### 原理与推演

An array stores elements in sequential, indexable positions, enabling fast access by position. A dynamic array can grow; Python lists broadly belong to this category. A linked list connects nodes through pointers and supports insertion and deletion at certain positions, but is poor at random access. A stack is last-in, first-out, like a stack of plates; it commonly supports function calls and undo operations. A queue is first-in, first-out, like a line of people taking numbers; it commonly supports task scheduling. A deque, or double-ended queue, allows insertion and removal at both ends.


### 例子

例子：栈先压入 A 再压入 B，下一次 pop 返回 B，体现后进先出。用它检查括号“([])”时先遇到左括号就压入，右括号必须与栈顶匹配；单纯记录左右括号数量相等不足以判断顺序合法。


### 适用边界与常见误解

An ordinary stack expresses nesting; a monotonic stack additionally orders candidate values.

### 推导与方法参考

- [一手资料](https://algs4.cs.princeton.edu/home/)

[返回分层目录](00-learning-index.md)
