# VLA — Vision-Language-Action Model

概念编号：`concept:vla` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/vla/)

## 第一层：概念入门 · 知其然

### 定义

视觉—语言—动作模型结合视觉观测和语言指令，产生用于控制实体的行动表示。视觉说明环境，语言指定任务，动作输出可能是关节目标、末端位姿或离散技能；它还需通过控制系统与硬件执行。理解一句指令、预测动作和实际安全完成任务是不同层次。

### 概念边界与常见混淆

训练中见过相似物体不保证适用于新机器人、重量或摩擦。执行约束、碰撞检查和停止机制仍需要系统设计。

### 先看一个例子

指令“把红杯放到托盘上”，模型读取画面并输出抓取移动相关动作。杯子若被遮挡，模型可能缺少位置依据；即使语言回答正确，也不证明夹爪能抓稳。评估需看真实行动结果，并规定动作坐标、单位和频率。

### 理解练习

#### 1. 输出

模型只回答“应该拿红杯”，就已经是完整动作执行吗？

<details><summary>答案与解释</summary>

不是，需产生可解释的动作并由系统执行，语言计划不等于完成。

</details>

#### 2. 坐标

同样三个位置数值能直接用于不同机器人吗？

<details><summary>答案与解释</summary>

不能保证，坐标系、单位、可达范围和动作语义可能不同。

</details>

#### 3. 遮挡

目标看不清时直接猜位置合理吗？

<details><summary>答案与解释</summary>

不应无依据执行，可补充观测或请求协助；未知应进入决策。

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
