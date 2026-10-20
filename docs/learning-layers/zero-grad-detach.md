# Zero Grad / Detach

概念编号：`concept:zero-grad-detach` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/zero-grad-detach/)

## 第一层：概念入门 · 知其然

### 它是什么

清空梯度是重置已累积的参数梯度；detach 是切断某条计算路径的梯度传播。它们操作的对象和目的不同。

### 先看一个例子

可以把累积梯度想成记账本：清空梯度是翻到新的一页；detach 像规定某条支路的结果只供读取，不沿这条支路追溯责任。

### 理解练习

对一个中间张量 detach，就等于清空整个模型已有的梯度吗？

<details><summary>答案与解释</summary>

不是。detach 影响该计算路径的传播，不会自动把参数上已经累积的梯度清掉，也不代表冻结整个模型。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Some frameworks accumulate new gradients onto existing ones by default, so clear gradients at the appropriate update boundaries. Failing to clear them can count old gradients again; clearing them too early defeats intended accumulation. Detach and stop-gradient operations block gradient propagation along a path, for example in target networks, teacher branches or unnecessary computation graphs. Detaching does not necessarily copy the underlying data and does not freeze the entire model.


### 适用边界与常见误解

detach does not automatically copy storage or freeze the entire model.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
