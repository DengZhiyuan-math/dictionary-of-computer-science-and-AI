# VLA — Vision-Language-Action Model

概念编号：`concept:vla` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/vla/)

## 第一层：概念入门 · 知其然

### 它是什么

视觉语言动作模型把图像与语言指令结合，输出机器人可执行的动作。

### 先看一个例子

指令“把杯子右移5厘米”，动作接口以米为单位。

### 理解练习

理解文字就足以安全执行吗？

<details><summary>答案与解释</summary>

不够，还需感知定位、坐标转换、动作边界与反馈。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 图像与指令形成条件表示，动作头输出离散动作标记或连续控制量。
2. 训练需把示范动作与观察对齐，部署要匹配坐标、单位和控制频率。

### 具体输入与计算步骤

指令“把杯子右移5厘米”，动作接口以米为单位。

1. 5厘米=0.05米；若分5个等步，每步位移0.01米。
2. 每步10 Hz执行，5步名义持续0.5秒，仍需反馈确认实际到位。

计算结果：每步10 Hz执行，5步名义持续0.5秒，仍需反馈确认实际到位。

### 换到实际问题中应用

让机械臂按口头指令整理桌面。

1. 定位目标与障碍，转换到机器人坐标，限制动作幅度。
2. 执行短动作后重新观察，偏离或碰撞风险升高时停止。

应用结论：执行短动作后重新观察，偏离或碰撞风险升高时停止。

### 举一反三：改变条件后的完整解答

若相机“右”对应机器人负x，命令应如何变？

<details><summary>变式的推演与答案</summary>

1. 视觉右移0.05米需经坐标变换。
2. 输出机器人Δx=−0.05米，不能直接把视觉正方向当机器人正方向。

输出机器人Δx=−0.05米，不能直接把视觉正方向当机器人正方向。

</details>

### 原有解释与进一步例题


### 原理与推演

Embodied AI studies how agents with bodies or action interfaces perceive, decide and act. Robot learning develops control abilities from data. VLA, or vision–language–action modeling, is an important research direction. Typical inputs include camera observations, language tasks and sometimes the robot’s internal state; outputs are executable action representations.

Compare the roles of LLMs, VLMs and VLAs. An LLM primarily processes language and related symbol sequences. A VLM combines visual inputs with language. A VLA must go beyond describing a cup on a table to outputting actions that move an arm to pick it up. It must decide what to do as well as interpret what it sees.

Action chunking predicts a short sequence of future actions at once, rather than one control instant. This can reduce generation frequency and short-term jitter, but still requires timely adjustments from new observations. Diffusion Policy generates action sequences with diffusion methods. ACT, Action Chunking with Transformers, is a representative imitation learning method using action chunks. Some VLA systems also use flow matching for continuous action generation.

VLA systems face costly demonstration collection, demanding action precision, varied robot platforms, latency, collisions and safety constraints. Correct visual or language answers do not establish reliable physical execution. Describe the process as perception, instruction understanding, action generation and feedback control.


### 例子

例子：输入相机图像和“把红杯放到托盘上”的指令，VLA 输出一段动作表示。将动作转换为机械臂命令前，还需校准坐标、检查执行范围与碰撞。语言上描述正确的动作不等于真实机器人已经安全完成。


### 适用边界与常见误解

A policy using vision alone is not necessarily a vision-language-action model.

### 推导与方法参考

- [一手资料](https://arxiv.org/abs/2406.09246)

[返回分层目录](00-learning-index.md)
