---
title: "KMP：失配时退到哪个边界"
aliases: []
tags: ["example","area/algorithms"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/数据结构与算法|数据结构与算法]]

### 38 · KMP：失配时退到哪个边界

**场景与输入：** 模式 ababaca，文本 abababaca。π 是每个前缀的最长相等真前后缀长度。

1. 模式前五个字符 ababa 的 π 依次为 0、0、1、2、3。
2. 处理第六个字符 c，候选边界长度 3 对应下一字符 b，不匹配；退到长度 1，仍对应 b，再退到 0，得到 π[5]=0。
3. 最终 π=[0,0,1,2,3,0,1]；搜索文本时复用边界，匹配从零基位置 2 开始。

**结果：** 单模式搜索不必在每次失配后让文本指针退回，重叠候选信息已编码在边界链里。

**易错点与边界：** π 的值是长度而非字符位置；访问 π[j-1] 前必须保证 j>0。

**改变条件再想一想：** 模式 aaa 在文本 aaaaa 中允许重叠时有几个匹配？

<details>
<summary>查看参考答案</summary>

3 个，起点 0、1、2；报告后退到长度 2，而不是清零。

</details>

[打开交互演示](../Demos/交互演示.html#kmp)

## 关联概念与章节

- [[Concepts/KMP 与前缀函数|KMP 与前缀函数]]
- [[Chapters/第 101 讲 算法进阶 · 字符串匹配：KMP、Trie 与多模式|第 101 讲]]
