# dictionary of computer science and AI

**计算机科学与 AI 中英知识词典：读得懂、查得到、讲得清。**

A Chinese-first, bilingual learning dictionary covering computer science, algorithms, machine learning, deep learning, LLMs, reinforcement learning, VLA, and world models. Includes 97 lessons, a complete LeetCode Hot 100 pattern map, a searchable glossary, worked training examples, 90 oral questions, and a browser speech reader.

**v2.4.0 · 2026-10-16** · 97 讲 · 482 个细讲小节 · 90 道口述题 · 103 个核心词条组 · 177 条参考资料

## 从这里开始

| 你想做什么 | 入口 |
| --- | --- |
| 看整体结构、概念联系和先修顺序 | **[知识地图](docs/KNOWLEDGE_MAP.md)** · [交互图文件](docs/knowledge-map.html) |
| 用小输入手算，再改变条件观察 | **[30 个完整案例](docs/EXAMPLES.md)** · [20 个离线交互演示](docs/visual-demos.html) |
| 用 Obsidian 双链浏览完整笔记 | [笔记库首页](obsidian-vault/00-知识地图.md)，下载后将 `obsidian-vault` 文件夹作为仓库打开 |
| 遇到缩写，先查定义和易混点 | [中英核心术语词典](docs/GLOSSARY.md) |
| 看有哪些知识点，直接跳到解释 | [章节与小节索引](cs_ai_v2_index.md) |
| 系统阅读全部内容 | [完整讲稿](cs_ai_v2_full.md) |
| 专门补训练细节 | [训练微知识点：10 讲 + 20 道追问](cs_ai_v2_training_terms.md) |
| 快速确认公式、输入类型和计算过程 | [训练速查与数值例题](docs/TRAINING_CHEATSHEET.md) |
| 学习 Hot 100 的主要算法思想 | [17 类思想讲解与全部 100 题映射](docs/LEETCODE_HOT100.md) |
| 决定先学什么 | [按目标选择学习路线](docs/LEARNING_PATHS.md) |
| 阅读单章 | [97 讲逐章目录](cs_ai_v2_index.md#领域导航) |
| 下载后听讲稿 | [播放器文件](cs_ai_v2_audiobook.html) · [下载整套资料](https://github.com/DengZhiyuan-math/dictionary-of-computer-science-and-AI/releases/latest) |
| 阅读纯文本 | [全书 TXT](text/cs_ai_v2_full.txt) · [逐讲 TXT](text/chapters/) |
| 追溯定义和方法 | [官方文档、论文与课程](docs/REFERENCES.md) |

## 知识地图与双向链接

知识地图将全书组织为 **14 个领域 → 131 个概念词条组 → 97 讲原文 → 100 道 Hot 100 练习**，并提供训练、算法、LLM 系统、行动与世界模型四条专题路线。

每个概念页都有定义、易混点、推荐先修、后续概念、应用与对照、章节依据和相关练习。关系附有解释，目录归属、理解先修与概念对照分别标注。地图中的 131 个概念组包括原词典的 103 组及 28 个用于连接整体结构的主题概念。

下载 [最新资料](https://github.com/DengZhiyuan-math/dictionary-of-computer-science-and-AI/releases/latest)，解压后用 Obsidian 打开 `obsidian-vault` 文件夹，入口是 `00-知识地图.md`。内部使用 `[[笔记路径|显示名称]]` 与章节标题链接，保留全部章节原文，并附两张原生 Canvas；无需社区插件。GitHub 上可通过[文字知识地图](docs/KNOWLEDGE_MAP.md)的普通链接阅读。交互图需要下载后在浏览器打开。

## 这份笔记怎样解释概念

新增 **30 个完整案例、20 个可交互演示**：每个案例都有具体输入、逐步计算、结果、易错点，以及带参考答案的变式自测。算法可以逐步查看指针、队列、栈与 DP 状态；BCE、学习率、阈值、注意力、Q-learning 等可以调参数观察数值变化。还包括 K-means、RRF、卷积、位置反馈，以及广播、泄露、事务和 KV cache 等手算案例。

下载后打开 `docs/visual-demos.html`，无需联网或安装依赖。案例同步进入相关章节、TXT 与播放器的“案例讲解”路线；Obsidian 的 `Examples` 提供 30 篇双链笔记，`Demos` 内保留可独立离线运行的演示。GitHub 文件预览显示源码，浏览演示请下载后打开。

每个概念优先回答：**解决什么问题 → 输入输出是什么 → 基本思路 → 适用条件与局限 → 相邻概念怎样区分。**

例如，BCE 不只展开缩写。第 41 讲用同一封垃圾邮件比较 49% 与 1% 的预测，说明“同样判错”为什么仍有不同损失，并区分 Logit、Sigmoid、BCEWithLogitsLoss 与互斥多分类交叉熵。第 43 讲用一次 SGD 更新解释学习率，第 44 讲处理梯度累积尾批，第 38 讲用混淆矩阵计算评价指标。

第 81–97 讲按官方 Hot 100 的 17 类展开哈希、双指针、窗口、前缀和、链表、树、图、回溯、二分、栈、堆、贪心、动态规划与约束驱动技巧。每题都有官方入口、思路定位、指定解法的复杂度及易错点；重点解释状态与正确性依据。

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
| LeetCode Hot 100 | 17 类算法思想、完整 100 题映射与复杂度边界 | 81–97 |

## 播放器使用

1. 从 [Releases](https://github.com/DengZhiyuan-math/dictionary-of-computer-science-and-AI/releases/latest) 下载资料包并解压，也可以点击仓库的 **Code → Download ZIP**。
2. 在浏览器中打开 `cs_ai_v2_audiobook.html`。
3. 选择“训练微知识点”或“LeetCode Hot 100”等路线，也可用 BCE、单调栈、前缀和等词全文搜索。
4. 点击小节定位、选择声音与语速，再开始朗读。播放器支持章节循环、答题停顿、进度保存与 TXT 导出。

GitHub 文件预览只显示 HTML 源码，需下载后在浏览器打开。播放器自带全部讲稿，无需安装依赖。声音由浏览器或系统提供，**资料包不含预录 MP3**；离线语音、锁屏和后台播放效果取决于设备。网络语音服务可能联网处理朗读文本。

## 这次优化了什么

- 保留原稿 80 讲与全部 90 道口述题，将长文拆成可独立阅读的章节，补齐前后章导航。
- 从原稿的 343 个细讲小节增加到 482 个，补充训练数值例题、输入契约，以及 Hot 100 的算法思想与逐题映射。
- 追加 17 讲 Hot 100 内容，原 80 讲编号稳定；播放器新增独立学习路线。
- 新增分层知识地图、可搜索的局部关系图与完整 Obsidian 双链笔记库。
- 增加 30 个案例、20 个离线演示，并连入概念、章节和播放器；Obsidian 笔记总数增至 377 篇。
- 新增 103 个中英核心词条组，每条都有解释、易混点和正文入口；完整覆盖仍以全书索引为准。
- 正文、训练选编、索引、TXT、统计与播放器共享内容源，修改后统一生成。

本资料用于入门理解、复习和技术交流，不穷尽全部计算机科学知识。模型名称用于说明代表性路线，不作为最新性能排行。口述答案应结合自己的实际学习和项目经历。重要概念请继续阅读对应文档、实现与论文。

## 维护与校验

阅读和听书不需要 Node.js。维护者使用 Node.js 20 或以上版本，无第三方构建依赖：

```sh
node scripts/build.mjs
node scripts/check.mjs
```

原 80 讲在 `data/book.json`，Hot 100 内容源在 `data/hot100.mjs`，词典在 `data/glossary.json`，地图结构与关系在 `data/knowledge-map.mjs`。案例在 `data/examples.mjs`，演示计算在 `data/demo-engines.mjs`。不要单独修改生成后的讲稿、笔记库或 HTML，以免下次生成覆盖。详见 [贡献说明](CONTRIBUTING.md) 与 [更新记录](CHANGELOG.md)。

本仓库整理自用户提供的 v2 讲稿、训练选编、索引和播放器，并补充原创算法思想讲解。保留原参考来源；重点核对训练接口、更新顺序与官方 Hot 100 题单，未对全部 177 条参考资料逐一重新核验。仓库尚未指定内容再利用许可证，公开访问不代表已授予任意再分发许可。
