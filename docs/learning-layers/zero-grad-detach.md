# Zero Grad / Detach

概念编号：`concept:zero-grad-detach` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/zero-grad-detach/)

## 第一层：概念入门 · 知其然

### 它是什么

清梯度移除累计的导数值；detach切断张量与先前计算图的连接，二者不能互相替代。

### 先看一个例子

两次反向分别产生梯度2与3，中间没有清梯度。

### 理解练习

detach会自动清掉参数.grad吗？

<details><summary>答案与解释</summary>

不会，它只改变计算图连接。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 叶子参数的.grad通常累加，因此独立更新前应清理旧梯度。
2. detach后的张量不再把后续梯度传播回原图，但可能共享底层存储。

### 具体输入与计算步骤

两次反向分别产生梯度2与3，中间没有清梯度。

1. 不清理时梯度累计2+3=5。
2. 若两次属于独立更新，第二次应只用3，而非5。

计算结果：若两次属于独立更新，第二次应只用3，而非5。

### 换到实际问题中应用

训练生成器时临时更新判别器。

1. 将生成样本detach后用于判别器损失，避免这一步更新生成器图。
2. 判别器和生成器各自清梯度并按各自目标更新。

应用结论：判别器和生成器各自清梯度并按各自目标更新。

### 举一反三：改变条件后的完整解答

x=2需梯度，y=x²，z=detach(y)×3，z会给x梯度12吗？

<details><summary>变式的推演与答案</summary>

1. detach切断z到x的路径。
2. 不会得到12；未detach才有dz/dx=3×2x=12，单独z还可能不具备可反向图。

不会得到12；未detach才有dz/dx=3×2x=12，单独z还可能不具备可反向图。

</details>

### 原有解释与进一步例题


### 原理与推演

Some frameworks accumulate new gradients onto existing ones by default, so clear gradients at the appropriate update boundaries. Failing to clear them can count old gradients again; clearing them too early defeats intended accumulation. Detach and stop-gradient operations block gradient propagation along a path, for example in target networks, teacher branches or unnecessary computation graphs. Detaching does not necessarily copy the underlying data and does not freeze the entire model.


### 适用边界与常见误解

detach does not automatically copy storage or freeze the entire model.

### 推导与方法参考

- [一手资料](https://docs.pytorch.org/docs/stable/notes/autograd.html)

[返回分层目录](00-learning-index.md)
