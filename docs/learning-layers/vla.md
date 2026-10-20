# VLA — Vision-Language-Action Model

概念编号：`concept:vla` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/vla/)

## 第一层：概念入门 · 知其然

### 它是什么

Embodied AI studies how agents with bodies or action interfaces perceive, decide and act. Robot learning develops control abilities from data. VLA, or vision–language–action modeling, is an important research direction. Typical inputs include camera observations, language tasks and sometimes the robot’s internal state; outputs are executable action representations.

### 先看一个例子

例子：输入相机图像和“把红杯放到托盘上”的指令，VLA 输出一段动作表示。将动作转换为机械臂命令前，还需校准坐标、检查执行范围与碰撞。语言上描述正确的动作不等于真实机器人已经安全完成。

### 理解练习

用自己的话解释：上面的情景为什么是“VLA — Vision-Language-Action Model”的例子？请指出定义中的关键条件在情景里如何体现，而不是只复述最后的数值。

<details><summary>答案与解释</summary>

对照定义：Embodied AI studies how agents with bodies or action interfaces perceive, decide and act. Robot learning develops control abilities from data. VLA, or vision–language–action modeling, is an important research direction. Typical inputs include camera observations, language tasks and sometimes the robot’s internal state; outputs are executable action representations.

情景依据：例子：输入相机图像和“把红杯放到托盘上”的指令，VLA 输出一段动作表示。将动作转换为机械臂命令前，还需校准坐标、检查执行范围与碰撞。语言上描述正确的动作不等于真实机器人已经安全完成。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 原理与推演

Compare the roles of LLMs, VLMs and VLAs. An LLM primarily processes language and related symbol sequences. A VLM combines visual inputs with language. A VLA must go beyond describing a cup on a table to outputting actions that move an arm to pick it up. It must decide what to do as well as interpret what it sees.

Action chunking predicts a short sequence of future actions at once, rather than one control instant. This can reduce generation frequency and short-term jitter, but still requires timely adjustments from new observations. Diffusion Policy generates action sequences with diffusion methods. ACT, Action Chunking with Transformers, is a representative imitation learning method using action chunks. Some VLA systems also use flow matching for continuous action generation.

VLA systems face costly demonstration collection, demanding action precision, varied robot platforms, latency, collisions and safety constraints. Correct visual or language answers do not establish reliable physical execution. Describe the process as perception, instruction understanding, action generation and feedback control.


### 适用边界与常见误解

A policy using vision alone is not necessarily a vision-language-action model.

### 举一反三

改变第一层例子中的一个关键条件，先预测，再验证。列出假设；检查方法是否仍适用；重新计算或执行；用反例或极端情况核验。说明差异来自哪项条件。

[返回分层目录](00-learning-index.md)
