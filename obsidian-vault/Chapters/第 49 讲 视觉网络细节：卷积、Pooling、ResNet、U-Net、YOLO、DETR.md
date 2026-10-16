---
title: "第 49 讲 · 视觉网络细节：卷积、Pooling、ResNet、U-Net、YOLO、DETR"
aliases: []
tags: ["chapter","area/architectures"]
---

<!-- Generated. Edit data/knowledge-map.mjs and canonical book content. -->

[[Areas/网络架构与 AI 工程|网络架构与 AI 工程]]

## 本讲概念

- [[Concepts/卷积与视觉归纳偏置|卷积与视觉归纳偏置]]

<a id="chapter-49"></a>

## 第 49 讲｜视觉网络细节：卷积、Pooling、ResNet、U-Net、YOLO、DETR

领域：深度学习与生成模型 · 细讲

<a id="chapter-49-section-01"></a>

### Convolution、Kernel、Channel【重点】

卷积用一组可学习的小模板扫描局部区域，把同样的识别规则复用于图像不同位置。Kernel 在这里是卷积核，不是操作系统内核，也不是 SVM 的核函数。Channel 是特征通道，早期可能对应颜色，后面则对应学到的不同模式。卷积减少参数并利用局部结构，但并不自动让模型对任意旋转、尺度和位置变化都保持不变。

<a id="chapter-49-section-02"></a>

### Stride、Padding、Dilation、Receptive Field【重点】

Stride 是卷积窗口移动的步幅，较大步幅通常减小输出空间尺寸。Padding 在边缘补充位置，影响输出大小和边界处理。Dilation 在卷积核采样位置之间留间隔，扩大感受范围。Receptive field，感受野，是某个特征能够受到输入中多大区域影响。网络层数增加或下采样，都会改变它，不只是卷积核本身的尺寸决定。

<a id="chapter-49-section-03"></a>

### Pooling 与下采样【重点】

Max pooling 从局部区域取最大激活，average pooling 取平均，减少空间尺寸并汇总信息。下采样降低计算成本，也会丢失精细位置。Global average pooling 汇总整个空间上的通道信息，常接分类头。需要逐像素定位的任务通常还需要上采样或高分辨率特征。分辨率更低并不只是图片变小，也意味着小目标信息可能消失。

<a id="chapter-49-section-04"></a>

### ResNet 与 Skip Connection【重点】

ResNet 让某些层学习对已有表示的修正，并通过捷径把输入直接传到后面。这样信息与梯度不必只经过一条很长的变换链，帮助训练深层网络。它不是把前面的层完全取消，也不保证所有深网络都没有梯度问题。Skip connection 是更广泛概念，U-Net 的跨尺度连接与 ResNet 的残差相加相关但不完全相同。

<a id="chapter-49-section-05"></a>

### U-Net、FPN、Depthwise Separable Convolution【认识】

U-Net 先压缩提取语义，再上采样恢复位置，并把早期细节特征传给后半部分，适合分割。FPN，特征金字塔，融合不同尺度特征，帮助检测大小不同的物体。深度可分离卷积把空间处理与通道混合拆开，减少计算，常见于轻量网络。它用结构限制换效率，并不保证在所有硬件上获得同等实际加速。

<a id="chapter-49-section-06"></a>

### Detection、Segmentation、NMS【重点】

目标检测输出对象类别与位置，语义分割给像素分类，实例分割还区分同类不同对象。NMS，非极大值抑制，去掉高度重叠、评分较低的候选框，避免同一个物体报出很多次。IoU 用于衡量框或区域重叠，mAP 汇总不同类别与匹配规则下的检测表现。不同 IoU 阈值下的 mAP 不能不加区分地比较。

<a id="chapter-49-section-07"></a>

### YOLO、Faster R-CNN、DETR、SAM【认识】

YOLO 系列以高效检测为重要目标，Faster R-CNN 代表候选区域再精细分类的经典两阶段路线。DETR 把检测看成集合预测，用匹配目标处理预测与真实物体的对应，原始路线不依赖传统 NMS。SAM 关注可提示的图像分割，不等于自动完成全部类别识别。模型系列内部会变化，本讲比较设计路线，不把某个版本的配置当成永久定义。

参考资料（不朗读）：[S092 · Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)；[S095 · U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)；[S096 · End-to-End Object Detection with Transformers](https://arxiv.org/abs/2005.12872)；[S097 · Segment Anything](https://arxiv.org/abs/2304.02643)；[S098 · Torchvision — Models and Pre-trained Weights](https://docs.pytorch.org/vision/stable/models.html)
