# Stack

概念编号：`concept:stack` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/stack/)

## 第一层：概念入门 · 知其然

### 它是什么

An array stores elements in sequential, indexable positions, enabling fast access by position. A dynamic array can grow; Python lists broadly belong to this category. A linked list connects nodes through pointers and supports insertion and deletion at certain positions, but is poor at random access. A stack is last-in, first-out, like a stack of plates; it commonly supports function calls and undo operations. A queue is first-in, first-out, like a line of people taking numbers; it commonly supports task scheduling. A deque, or double-ended queue, allows insertion and removal at both ends.

### 先看一个例子

例子：栈先压入 A 再压入 B，下一次 pop 返回 B，体现后进先出。用它检查括号“([])”时先遇到左括号就压入，右括号必须与栈顶匹配；单纯记录左右括号数量相等不足以判断顺序合法。

### 理解练习

用自己的话解释：上面的情景为什么是“Stack”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：An array stores elements in sequential, indexable positions, enabling fast access by position. A dynamic array can grow; Python lists broadly belong to this category. A linked list connects nodes through pointers and supports insertion and deletion at certain positions, but is poor at random access. A stack is last-in, first-out, like a stack of plates; it commonly supports function calls and undo operations. A queue is first-in, first-out, like a line of people taking numbers; it commonly supports task scheduling. A deque, or double-ended queue, allows insertion and removal at both ends.

情景依据：例子：栈先压入 A 再压入 B，下一次 pop 返回 B，体现后进先出。用它检查括号“([])”时先遇到左括号就压入，右括号必须与栈顶匹配；单纯记录左右括号数量相等不足以判断顺序合法。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

An array stores elements in sequential, indexable positions, enabling fast access by position. A dynamic array can grow; Python lists broadly belong to this category. A linked list connects nodes through pointers and supports insertion and deletion at certain positions, but is poor at random access. A stack is last-in, first-out, like a stack of plates; it commonly supports function calls and undo operations. A queue is first-in, first-out, like a line of people taking numbers; it commonly supports task scheduling. A deque, or double-ended queue, allows insertion and removal at both ends.


### 例子

例子：栈先压入 A 再压入 B，下一次 pop 返回 B，体现后进先出。用它检查括号“([])”时先遇到左括号就压入，右括号必须与栈顶匹配；单纯记录左右括号数量相等不足以判断顺序合法。


### 适用边界与常见误解

An ordinary stack expresses nesting; a monotonic stack additionally orders candidate values.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
