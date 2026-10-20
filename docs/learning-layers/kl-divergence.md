# KL Divergence

概念编号：`concept:kl-divergence` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/kl-divergence/)

## 第一层：概念入门 · 知其然

### 定义

KL 散度比较两个概率分布，方向明确地写为 KL(P‖Q)。离散情形为对所有 P 为正的位置加总 P(x)ln(P(x)/Q(x))，表示来自 P 的数据改用 Q 描述时增加的平均对数损失。P 在某位置为正而 Q 为零时散度无穷；P 为零的项按极限作零贡献。

### 概念边界与常见混淆

连续分布使用密度及积分，不能把某一点的概率为零与密度为零混为一谈。KL 也不满足普通距离所需的对称性和三角不等式。

### 先看一个例子

P=(0.5,0.5)，Q=(0.9,0.1)，KL(P‖Q)=0.5ln(0.5/0.9)+0.5ln(0.5/0.1)≈0.511。反向 KL(Q‖P)≈0.368，说明它不是普通对称距离。某个单项可为负，但加权总和不为负。

### 理解练习

#### 1. 方向

把 P 与 Q 对调，计算的是同一个量吗？

<details><summary>答案与解释</summary>

一般不是，数据来源与近似分布的角色交换了，示例已有不同结果。

</details>

#### 2. 零概率

P=(1,0)、Q=(0,1)，KL(P‖Q)有限吗？

<details><summary>答案与解释</summary>

不有限，Q 把 P 必然发生的事件视为不可能，平均对数损失无穷。

</details>

#### 3. 非负性

某项 ln 比值为负，是否证明 KL 为负？

<details><summary>答案与解释</summary>

不能。非负结论关于满足归一化条件的完整加权和，而不是每个单项。

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
