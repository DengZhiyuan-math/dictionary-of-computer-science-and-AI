# Zero Grad / Detach

概念编号：`concept:zero-grad-detach` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/zero-grad-detach/)

## 第一层：概念入门 · 知其然

### 定义

梯度缓冲记录反向传播已累加的导数值，zero_grad清除这些旧值以开始新的累积阶段。detach则产生与原计算历史断开的张量对象：后续计算不再沿这条路径向先前操作求导，但不会清空已存在的梯度。二者分别管理导数的数值缓存与计算依赖关系，不能互相替代。

### 概念边界与常见混淆

detach通常共享底层数据，修改可能影响原张量，需与clone复制区分。zero_grad将梯度设None或置零的具体方式也可能影响优化器处理。

### 先看一个例子

y=2w，先把y.detach后用于损失，损失仍能有数值，却不会经这条路径得到w的梯度。若已对w累计梯度3，再detach另一个结果，这个3不会自动消失。清空梯度才处理旧累计。

### 理解练习

#### 1. 清空

zero_grad能阻止下一次反向传播经过某层吗？

<details><summary>答案与解释</summary>

不能，它清旧数值，不切断新计算依赖。

</details>

#### 2. 截断

detach会自动让原参数被冻结且梯度清零吗？

<details><summary>答案与解释</summary>

不会，只对指定路径断开历史，其他路径和旧梯度仍可能存在。

</details>

#### 3. 复制

detach后的对象是否一定拥有独立数据副本？

<details><summary>答案与解释</summary>

不一定，通常共享存储；需独立副本时显式复制。

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
