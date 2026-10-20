# EM / Viterbi

概念编号：`concept:em-viterbi` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/em-viterbi/)

## 第一层：概念入门 · 知其然

### 它是什么

Latent variables are unobserved internal variables used to explain data—for example, a customer's unknown group given observed spending. EM alternates estimating hidden-variable probabilities under current parameters and updating parameters using those estimates. In a GMM, it repeatedly estimates component memberships and updates the components. Under suitable conditions the objective does not worsen, but a global optimum is not guaranteed.

### 先看一个例子

for example, a customer's unknown group given observed spending. EM alternates estimating hidden-variable probabilities under current parameters and updating parameters using those estimates. In a GMM, it repeatedly estimates component memberships and updates the components. Under suitable conditions the objective does not worsen, but a global optimum is not guaranteed.

### 理解练习

用自己的话解释：上面的情景为什么是“EM / Viterbi”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Latent variables are unobserved internal variables used to explain data—for example, a customer's unknown group given observed spending. EM alternates estimating hidden-variable probabilities under current parameters and updating parameters using those estimates. In a GMM, it repeatedly estimates component memberships and updates the components. Under suitable conditions the objective does not worsen, but a global optimum is not guaranteed.

情景依据：for example, a customer's unknown group given observed spending. EM alternates estimating hidden-variable probabilities under current parameters and updating parameters using those estimates. In a GMM, it repeatedly estimates component memberships and updates the components. Under suitable conditions the objective does not worsen, but a global optimum is not guaranteed.

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Latent variables are unobserved internal variables used to explain data—for example, a customer's unknown group given observed spending. EM alternates estimating hidden-variable probabilities under current parameters and updating parameters using those estimates. In a GMM, it repeatedly estimates component memberships and updates the components. Under suitable conditions the objective does not worsen, but a global optimum is not guaranteed.


### 适用边界与常见误解

Estimating model parameters differs from decoding a hidden-state sequence.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
