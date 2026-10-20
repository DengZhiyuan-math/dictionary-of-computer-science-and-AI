# KL Divergence

概念编号：`concept:kl-divergence` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kl-divergence/)

## 第一层：概念入门 · 知其然

### 它是什么

KL散度衡量用分布Q描述来自P的数据，相比直接用P多付出多少平均对数代价。

### 先看一个例子

P=[1,0]，Q=[0.5,0.5]。

### 理解练习

交换P、Q结果一定相同吗？

<details><summary>答案与解释</summary>

不一定，KL有方向，不是对称距离。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 定义D(P‖Q)=ΣPᵢln(Pᵢ/Qᵢ)，Pᵢ=0的项按极限记0。
2. 若Pᵢ>0却Qᵢ=0，编码该事件代价无限，KL为无穷。

### 具体输入与计算步骤

P=[1,0]，Q=[0.5,0.5]。

1. 第一项1×ln(1/0.5)=ln2。
2. 第二项为0，所以KL≈0.6931自然单位。

计算结果：第二项为0，所以KL≈0.6931自然单位。

### 换到实际问题中应用

蒸馏时让学生概率接近教师。

1. 声明方向为教师P到学生Q，并让学生对教师支持集保持正概率。
2. 按类别求和后按样本平均，注意工具接口是否要求输入log概率。

应用结论：按类别求和后按样本平均，注意工具接口是否要求输入log概率。

### 举一反三：改变条件后的完整解答

反过来D(Q‖P)是多少？

<details><summary>变式的推演与答案</summary>

1. Q在第二类有0.5，但P在该类为0。
2. 出现正概率除以0，因此反向KL无穷，展示不对称。

出现正概率除以0，因此反向KL无穷，展示不对称。

</details>

### 原有解释与进一步例题


### 原理与推演

KL divergence measures a discrepancy between probability distributions. It can train a student model to match a teacher’s distribution or constrain a new policy from moving too far from a reference policy. KL divergence is generally asymmetric, so the direction of comparison matters. It is not a geometric distance or a direct measure of semantic similarity between answers. Cross-entropy, KL divergence and entropy are related, but explain which distributions are being compared rather than treating them as interchangeable losses.


### 例子

例子：P=(0.5,0.5)，Q=(0.25,0.75)，KL(P∥Q)=0.5log(2)+0.5log(2/3)≈0.1438。交换 P、Q 得约 0.1308，因此 KL 不对称。若 P 在某处有正概率而 Q 为零，该方向的 KL 可以无穷大。


### 适用边界与常见误解

KL divergence is not a symmetric distance, and input conventions depend on the implementation.

### 推导与方法参考

- [一手资料](https://www.inference.org.uk/itprnn/book.pdf)

[返回分层目录](00-learning-index.md)
