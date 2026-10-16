# dictionary of computer science and AI

**计算机科学与 AI 中英知识词典：读得懂、查得到、讲得清。**

A Chinese-first, bilingual learning dictionary covering computer science, algorithms, machine learning, deep learning, LLMs, reinforcement learning, VLA, and world models. Includes 80 lessons, a searchable glossary, worked training examples, 90 oral questions, and a browser speech reader.

**v{{VERSION}} · 2026-10-16** · 80 讲 · {{SUBSECTIONS}} 个细讲小节 · 90 道口述题 · {{GLOSSARY}} 个核心词条组 · {{SOURCES}} 条参考资料

## 从这里开始

| 你想做什么 | 入口 |
| --- | --- |
| 遇到缩写，先查定义和易混点 | [中英核心术语词典](docs/GLOSSARY.md) |
| 看有哪些知识点，直接跳到解释 | [章节与小节索引](cs_ai_v2_index.md) |
| 系统阅读全部内容 | [完整讲稿](cs_ai_v2_full.md) |
| 专门补训练细节 | [训练微知识点：10 讲 + 20 道追问](cs_ai_v2_training_terms.md) |
| 快速确认公式、输入类型和计算过程 | [训练速查与数值例题](docs/TRAINING_CHEATSHEET.md) |
| 决定先学什么 | [按目标选择学习路线](docs/LEARNING_PATHS.md) |
| 阅读单章 | [80 讲逐章目录](cs_ai_v2_index.md#领域导航) |
| 下载后听讲稿 | [播放器文件](cs_ai_v2_audiobook.html) · [下载整套资料](https://github.com/DengZhiyuan-math/dictionary-of-computer-science-and-AI/releases/latest) |
| 阅读纯文本 | [全书 TXT](text/cs_ai_v2_full.txt) · [逐讲 TXT](text/chapters/) |
| 追溯定义和方法 | [官方文档、论文与课程](docs/REFERENCES.md) |

## 这份笔记怎样解释概念

每个概念优先回答：**解决什么问题 → 输入输出是什么 → 基本思路 → 适用条件与局限 → 相邻概念怎样区分。**

例如，BCE 不只展开缩写。第 41 讲用同一封垃圾邮件比较 49% 与 1% 的预测，说明“同样判错”为什么仍有不同损失，并区分 Logit、Sigmoid、BCEWithLogitsLoss 与互斥多分类交叉熵。第 43 讲用一次 SGD 更新解释学习率，第 44 讲处理梯度累积尾批，第 38 讲用混淆矩阵计算评价指标。

| 主线 | 具体内容 | 章节 |
| --- | --- | --- |
| 计算机系统 | CPU、GPU、操作系统、编译与软件抽象 | 01–04 |
| 数据结构与算法 | 树、哈希、排序、动态规划、图、字符串与流式统计 | 05–13 |
| 数据与服务 | 索引、事务、网络、缓存与分布式共识 | 14–20 |
| 机器学习与统计 | 数据划分、线性模型、树、Boosting、聚类、降维、概率与评估 | 21–39 |
| 深度学习与训练 | 损失、学习率、训练循环、优化器、正则化、架构与部署 | 40–51 |
| LLM 与 Agent | Transformer、微调、偏好训练、推理、检索与工具调用 | 52–61 |
| 生成与多模态 | VAE、GAN、Diffusion、Flow Matching 与跨模态表征 | 62–64 |
| 强化学习与具身智能 | 价值学习、策略学习、模仿、机器人、VLA 与世界模型 | 65–73 |
| 口述与复习 | 90 道问题、比较方法与能力表达 | 74–80 |

## 播放器使用

1. 从 [Releases](https://github.com/DengZhiyuan-math/dictionary-of-computer-science-and-AI/releases/latest) 下载资料包并解压，也可以点击仓库的 **Code → Download ZIP**。
2. 在浏览器中打开 `cs_ai_v2_audiobook.html`。
3. 选择“训练微知识点”等路线，或用 BCE、learning rate 等词全文搜索。
4. 点击小节定位、选择声音与语速，再开始朗读。播放器支持章节循环、答题停顿、进度保存与 TXT 导出。

GitHub 文件预览只显示 HTML 源码，需下载后在浏览器打开。播放器自带全部讲稿，无需安装依赖。声音由浏览器或系统提供，**资料包不含预录 MP3**；离线语音、锁屏和后台播放效果取决于设备。网络语音服务可能联网处理朗读文本。

## 这次优化了什么

- 保留原稿 80 讲与全部 90 道口述题，将长文拆成可独立阅读的章节，补齐前后章导航。
- 从原稿的 343 个细讲小节增加到 {{SUBSECTIONS}} 个，补充 BCE 数值、损失输入契约、SGD 更新、累积尾批、混合精度裁剪与指标计算。
- 新增 {{GLOSSARY}} 个中英核心词条组，每条都有解释、易混点和正文入口；完整覆盖仍以全书索引为准。
- 正文、训练选编、索引、TXT、统计与播放器共享内容源，修改后统一生成。

本资料用于入门理解、复习和技术交流，不穷尽全部计算机科学知识。模型名称用于说明代表性路线，不作为最新性能排行。口述答案应结合自己的实际学习和项目经历。重要概念请继续阅读对应文档、实现与论文。

## 维护与校验

阅读和听书不需要 Node.js。维护者使用 Node.js 20 或以上版本，无第三方构建依赖：

```sh
node scripts/build.mjs
node scripts/check.mjs
```

正文内容在 `data/book.json`，词典在 `data/glossary.json`，播放器模板在 `src/player.html`。不要单独修改生成后的讲稿或 HTML，以免下次生成覆盖。详见 [贡献说明](CONTRIBUTING.md) 与 [更新记录](CHANGELOG.md)。

本仓库整理自用户提供的 v2 讲稿、训练选编、索引和播放器。保留原参考来源；本次重点核对训练接口与更新顺序，未对全部 169 条参考资料逐一重新核验。仓库尚未指定内容再利用许可证，公开访问不代表已授予任意再分发许可。
