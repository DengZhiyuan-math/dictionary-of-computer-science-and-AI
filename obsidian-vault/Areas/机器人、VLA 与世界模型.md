---
title: "机器人、VLA 与世界模型"
aliases: []
tags: ["area","area/embodied"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

# 机器人、VLA 与世界模型

[[00-知识地图|知识地图]]

**核心问题：** 怎样从观察与语言走向可反馈的行动与预测？

把感知、动作表示、控制、规划、模仿和环境动力学连接成行动系统。

## 概念入口

- [[Concepts/想象中学习策略／学模型并搜索|想象中学习策略／学模型并搜索]]：Dreamer 在潜在模型轨迹中训练行为；MuZero 将学到的模型与搜索结合。
- [[Concepts/反馈控制／模型预测控制|反馈控制／模型预测控制]]：PID 按误差及其变化反馈；MPC 在模型与约束下滚动规划。
- [[Concepts/视觉语言动作模型|视觉语言动作模型]]：以视觉与语言条件产生可用于行动的输出。
- [[Concepts/世界模型|世界模型]]：学习环境状态及其随动作变化的规律，服务预测或决策。
- [[Concepts/定位、规划与控制|定位、规划与控制]]：用感知和状态估计定位环境，再生成路径与反馈控制行动。

## 章节原文

- [[Chapters/第 69 讲 VLA 与具身智能：让模型从理解走向行动|第 69 讲 · VLA 与具身智能：让模型从理解走向行动]]
- [[Chapters/第 70 讲 机器人基础算法：SLAM、ICP、RRT、PID、MPC、CEM|第 70 讲 · 机器人基础算法：SLAM、ICP、RRT、PID、MPC、CEM]]
- [[Chapters/第 71 讲 VLA 算法路线：RT-2、OpenVLA、ACT、Diffusion Policy、Pi Zero|第 71 讲 · VLA 算法路线：RT-2、OpenVLA、ACT、Diffusion Policy、Pi Zero]]
- [[Chapters/第 72 讲 World Model：世界模型与可预测的环境|第 72 讲 · World Model：世界模型与可预测的环境]]
- [[Chapters/第 73 讲 世界模型路线：RSSM、Dreamer、MuZero、TD-MPC、JEPA、Genie|第 73 讲 · 世界模型路线：RSSM、Dreamer、MuZero、TD-MPC、JEPA、Genie]]

## 跨领域连接

预测画面、预测动作后果与优化控制策略是不同目标，需要分别评价。

- 可从这里进入：[[Areas/检索、RAG 与 Agent|检索、RAG 与 Agent]]。
- 可从这里进入：[[Areas/生成模型与多模态|生成模型与多模态]]。
- 可从这里进入：[[Areas/强化学习与模仿|强化学习与模仿]]。

## 概念间的连接

- [[Concepts/模仿学习与示范数据|模仿学习与示范数据]] → [[Concepts/视觉语言动作模型|视觉语言动作模型]]：机器人动作学习可以利用示范。
- [[Concepts/多模态对齐与表征|多模态对齐与表征]] → [[Concepts/视觉语言动作模型|视觉语言动作模型]]：视觉语言条件需要可用表示。
- [[Concepts/定位、规划与控制|定位、规划与控制]] → [[Concepts/反馈控制／模型预测控制|反馈控制／模型预测控制]]：规划与反馈控制协同执行。
- [[Concepts/反馈控制／模型预测控制|反馈控制／模型预测控制]] → [[Concepts/世界模型|世界模型]]：预测模型可服务滚动规划与控制。
- [[Concepts/世界模型|世界模型]] → [[Concepts/想象中学习策略／学模型并搜索|想象中学习策略／学模型并搜索]]：学到的动力学可用于想象或搜索。
- [[Concepts/变分自编码／对抗生成／扩散|变分自编码／对抗生成／扩散]] → [[Concepts/世界模型|世界模型]]：逼真生成与动作条件下的可预测控制不同。
- [[Concepts/视觉语言动作模型|视觉语言动作模型]] → [[Concepts/世界模型|世界模型]]：动作产生与动作后果预测可以互补。

## 案例与可视化

- [[Examples/19 世界模型：预测偏差与反馈修正|案例 19 · 世界模型：预测偏差与反馈修正]]
