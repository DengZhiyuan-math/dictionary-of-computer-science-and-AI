# Stack

概念编号：`concept:stack` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/stack/)

## 第一层：概念入门 · 知其然

### 定义

栈是一种只在一端加入和移除元素的抽象数据结构，这一端称栈顶。后加入的元素先移除，即后进先出；push加入、pop移除、peek读取栈顶但不移除。数组或链表都能实现栈，栈的定义约束操作次序，不指定一种硬件或容器。

### 概念边界与常见混淆

空栈不能随意pop，需定义错误或空结果。栈适合最近未完成任务优先处理，先进先出的任务通常应使用队列。

### 先看一个例子

检查括号“([])”：遇左括号依次压入(、[；遇]必须匹配当前栈顶[再弹出；遇)匹配(。若是“([)]”，)与栈顶[不匹配，即使左右括号数量相同也不合法。

### 理解练习

#### 1. 次序

依次push A、B、C，第一次pop是什么？

<details><summary>答案与解释</summary>

C，最近加入先移除，不是最早A。

</details>

#### 2. 查看

peek读到C后再pop仍是C吗？

<details><summary>答案与解释</summary>

若中间没修改，是C，因为peek不移除。

</details>

#### 3. 括号

左右括号数量相等就能不用栈确认合法嵌套吗？

<details><summary>答案与解释</summary>

不能，“([)]”是反例，需要核对最近未闭合类型。

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
