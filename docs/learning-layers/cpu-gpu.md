# CPU / GPU

概念编号：`concept:cpu-gpu` · [网站双语阅读](https://zhiyuan-deng.pages.dev/dictionary/topic/concept/cpu-gpu/)

## 第一层：概念入门 · 知其然

### 先说明程序、指令和内存

程序规定计算机要完成哪些操作，以及这些操作按什么规则执行。例如，读取两项数据、把它们相加、保存结果。人编写的程序通常要经过软件翻译，成为处理器能够识别的机器指令。指令就是用约定的编码表示的一项基本操作要求，例如读取某个位置的数据、做一次加法，或根据判断结果改变接下来执行的位置。

程序运行时，指令和正在处理的数据需要存放在硬件可以访问的存储空间中。这里先讨论内存：它是计算机运行程序时使用的工作存储空间。处理器是读取并执行指令的硬件部件；内存负责存放，处理器负责按指令进行操作。实际硬件还有不同层次的存储，但理解 CPU 与 GPU 的基本分工，不必先展开全部细节。


### 定义

CPU（Central Processing Unit，中央处理器）是计算机中执行通用程序、组织主要计算流程的处理器。它按照程序规定读取数据、进行运算，并根据中间结果决定后续操作。现代 CPU 可以包含多个能够执行程序指令的硬件单元，每个这样的单元称为一个核心，因此 CPU 也可以同时处理多项工作。

GPU（Graphics Processing Unit，图形处理器）是最初为图形计算发展起来、以大规模并行处理数据为主要设计方向的处理器。并行是指不同的硬件执行资源在同一时刻进行多项运算，而非只用一个执行资源逐项完成。现代可编程 GPU 除了处理图形，也能执行数值计算等程序，尤其适合对大量数据重复相同或相似操作的工作。

### 理解定义中的术语与关系

#### CPU 怎样执行一个有判断的程序

以处理一张订单为例：先读取商品数量和单价，计算金额，再判断是否满足折扣条件，最后按相应规则得到应付金额。后面的操作有时要等待前面的结果，有时又要依据结果选择不同步骤。

“条件分支”就是这种根据条件选择后续执行路径的操作：满足折扣条件，就执行折扣计算；不满足，就跳过它。在机器程序中，这由相应的判断和改变执行位置的指令实现。CPU 的设计通常投入较多资源，让这类步骤相互依赖、执行路径可能变化的程序尽快推进。GPU 也能执行判断；区别不是有没有判断功能。

#### GPU 为什么适合大量相似操作

图像可以看成许多位置的颜色记录，每个位置的记录称为像素。图像处理经常要对许多像素做相似计算。例如，每个像素各自调整颜色；只要一个像素的结果不需要等待另一个像素的结果，这些工作就可以分开安排，同时推进。GPU 将大量运算资源用于这样的处理，让许多份数据的计算重叠进行。

常见 GPU 会把一组工作安排在一起，共同推进相同的操作，这有助于让更多硬件资源用于实际计算。但如果组内不同工作需要走不同处理路径，相应路径往往要分开推进，并行效率便可能降低。这解释了为什么“可以在 GPU 上运行”与“适合在 GPU 上高效运行”是两回事。

#### 单项完成得快，与单位时间完成得多

延迟是完成一个指定任务所需的时间；吞吐量是单位时间完成的工作量。例如，一次图像处理请求多久返回，问的是延迟；一秒能处理多少张图像，问的是吞吐量。

CPU 通常重视单项或少量程序的快速响应，GPU 通常重视大量适合并行的工作的总处理能力。这是设计取向，而不是对每个具体任务的性能保证。不能只看到 GPU 同时处理的工作更多，就断定某个小请求一定更快完成。

#### 两者通常怎样协作

在常见的 CPU 与 GPU 协作程序中，CPU 组织处理流程，把适合并行的部分交给 GPU，并在需要时等待其结果。若 GPU 使用自己的存储空间，可能还要复制输入数据和结果；若两者能访问同一份内存，就不一定需要同样的复制步骤。

交付任务、访问或复制数据、等待结果都可能耗时。因此应比较完成整个任务的时间，而不是只比较 GPU 中那一段计算用了多久。具体哪些步骤存在、能否重叠，要看硬件和程序的组织方式。

### 概念边界与常见混淆

CPU 并不只做串行计算，GPU 也不是只能重复同一条操作。两者都执行程序，都可以处理多项工作。应当关注的是：任务能否分开、分开后需要怎样交换数据或等待结果，以及硬件如何安排这些工作。

### 先看一个例子

考虑一项明确的图像处理任务。像素是图像中一个位置的颜色记录；本例用红、绿、蓝三个取值为 0 到 255 的整数表示颜色。我们约定一种调整规则：把三个数分别乘以 1.1，四舍五入到整数，超过 255 的改为 255。例如，颜色记录 (100,150,240) 会变成 (110,165,255)。

现在对一千万个像素都做这个操作。每个输出只需要读取对应的输入像素，不必等待其他输出，因此可以把不同像素分给不同的执行资源。GPU 适合组织这种大量、相似且可以分别进行的工作。CPU 也能完成同一任务，并可以利用多个核心一起处理。

这里揭示的是任务为什么具有适合并行处理的结构，并没有给出哪种设备一定更快的结论。还需考虑输入数据在哪里、处理多少像素、结果接下来由谁使用，以及交付任务和等待结果的成本。

### 理解练习

#### 1. 两者的职责与共同点

一个图像处理程序由 CPU 读取任务信息，把逐像素处理交给 GPU，再使用处理结果。这里 CPU 和 GPU 是否都在执行程序？能否把 CPU 理解成“只管理、不计算”，GPU 理解成“不执行程序、只做加法”？

<details><summary>答案与解释</summary>

两者都在执行程序。CPU 执行的是组织流程、读取信息、安排任务和使用结果等操作，其中同样可能包含计算；GPU 执行的是交给它的处理程序，其中也有读取数据、进行运算和保存结果等操作。

两者的区别主要在于硬件怎样组织执行、对哪类工作作了更多优化，而不是一个执行程序、另一个不执行。CPU 也能做逐像素处理，GPU 也不只会做加法。

</details>

#### 2. 有条件判断，还能用 GPU 吗？

把规则改为：较暗的像素调亮，较亮的像素调暗。有人说“这有条件分支，所以只能交给 CPU”。这个判断对吗？即使能在 GPU 上运行，是否就说明一定高效？

<details><summary>答案与解释</summary>

不对。条件分支是根据判断结果选择后续操作，GPU 也能执行这类程序。因此，出现条件判断本身，并不排除使用 GPU。

但能运行不等于一定高效。GPU 常把一组工作安排在一起；如果组内需要执行不同处理路径，相应路径往往要分开推进，可能降低资源利用。还要看每条路径的工作量、数据的分布和具体硬件，不能只凭“有分支”或“可以运行”决定设备。

</details>

#### 3. 读到相邻数据，是否就必须串行？

如果改成“每个内部像素的新颜色，取它和周围八个输入像素的平均值”，是不是因为要读邻居，就不能并行处理了？

<details><summary>答案与解释</summary>

不是。关键是要读取什么，而不是有没有“邻居”。若每个计算都读取原来的输入图像，把结果写到另一张输出图像，各个输出仍然可以分别计算；多个计算读取相同的输入数据，并不意味着必须互相等待。

但若算出一个新颜色就直接覆盖原图，后面的计算可能读到已经修改的邻居，得到与原规则不同的结果。此时需要改变数据保存或执行安排。应区分“共享读取已有数据”与“必须等待另一个计算产生结果”，不能仅凭“数据之间有关联”就判断不能并行。

</details>

#### 4. 延迟与吞吐量分别回答什么问题？

假设有八张图像已全部就绪。CPU 逐张处理，每张 8 毫秒；GPU 一次处理八张，整批 40 毫秒后一起返回全部结果。忽略其他开销，连续处理多批时也没有批次间停顿。两种方式的第一张、最后一张结果何时返回？每秒分别完成多少张？GPU 平均每张分摊 5 毫秒，是否表示每张等待 5 毫秒就能返回？这些是本题约定的示意数据。

<details><summary>答案与解释</summary>

CPU 的第一张在 8 毫秒返回，最后一张在 64 毫秒返回；连续处理时每秒完成 125 张。GPU 的八张都在 40 毫秒返回；连续处理时每秒完成 200 张。因此，在这些假设下，CPU 更早给出第一张结果，GPU 更早完成整批，且持续处理的吞吐量更高。

40 毫秒除以八张得到的 5 毫秒，是总处理时间按图像数量分摊后的数值，并不是每张图像的实际等待时间。本题中八张图像都从开始等到第 40 毫秒。若只来一张图，或者需要先等其他图像凑批，响应时间又需要另测，不能由这一组批量数据直接推出。

</details>

#### 5. 计算部分更快，整个任务就更快吗？

假设 CPU 从输入就绪到结果可用需要 12 毫秒。换成 GPU 后，复制输入需 8 毫秒，计算需 2 毫秒，复制结果需 3 毫秒，提交任务及额外同步开销共 2 毫秒。这里额外同步不重复包含已列出的计算或复制时间，且各段均不重叠。GPU 方式的整体耗时是多少？如果后续处理仍在 GPU 上进行，是否仍必须把结果先复制回 CPU？

<details><summary>答案与解释</summary>

按本题约定，GPU 方式总共需要 15 毫秒，比 CPU 的 12 毫秒更慢。单独的 2 毫秒计算时间没有包含完成任务所需的全部步骤，不能据此宣称整体加速。

如果下一步仍由 GPU 使用这些结果，而且数据可以保持在那里，就不必为了“每一步都返回 CPU”而额外复制一次。反过来，如果 CPU 立即需要读取结果，就必须确保它能正确访问已完成的数据。具体是否需要复制，要看存储安排；不能把所有 CPU/GPU 协作都当成两块独立存储之间的往返复制。

</details>

#### 6. 把这些判断用于选择设备

项目 A 每次接收一张小图，用户希望尽快看到结果；项目 B 每夜处理大量已收集的图像，希望在截止时间前全部完成。仅凭“CPU”或“GPU”的名称能否替两个项目选设备？分别应该比较哪些结果？

<details><summary>答案与解释</summary>

不能直接决定。项目 A 应重点比较一次请求从输入就绪到结果可用的完整延迟，包括等待凑批、交付任务以及必要的数据访问。GPU 计算部分更快，也可能被这些成本抵消；CPU 可以作为需要实际比较的候选方案。

项目 B 更关注在给定时间内完成多少图像，以及全部任务何时结束。若图像处理可以分开安排，GPU 批量处理值得比较；但读取输入、保存结果或某个顺序步骤也可能限制整体速度。

两个项目都应先确认实现的是同一处理规则、输出正确，再在各自真实的任务规模和数据位置下测量。结论应来自这些比较，而不是“CPU 只能串行”或“GPU 一定更快”这样的口号。

</details>

## 第二层：深入理解 · 知其所以然

围绕推导、计算、应用与推广阅读；下面保留原有推演顺序。

### 从条件一步步推导

1. 把独立数据分给线程，足够多工作才能利用GPU吞吐。
2. 比较总时间T=传输+启动+计算，而非只比较内核。

### 具体输入与计算步骤

CPU算10毫秒，GPU算1毫秒，传输4毫秒，启动1毫秒。

1. GPU总时间4+1+1=6毫秒。
2. 加速比10/6≈1.67。

计算结果：加速比10/6≈1.67。

### 换到实际问题中应用

部署批量图像模型。

1. 将整批一次传入设备，后续算子尽量留在设备上。
2. 同步后测量真实完成时间，同时报告批吞吐与单请求延迟。

应用结论：同步后测量真实完成时间，同时报告批吞吐与单请求延迟。

### 举一反三：改变条件后的完整解答

小任务CPU0.5毫秒、GPU0.1毫秒，其他开销仍5毫秒呢？

<details><summary>变式的推演与答案</summary>

1. GPU需5.1毫秒。
2. CPU反而约快10.2倍；应减少往返或留在CPU。

CPU反而约快10.2倍；应减少往返或留在CPU。

</details>

### 原有解释与进一步例题


### 为什么会这样

加速受可并行部分限制。还需考虑数据搬运、启动开销、内存访问与工作规模，不能只比较执行单元数量。

Scenario and inputs: A program takes 100 seconds. A GPU can accelerate 80 seconds of work by 10×; the other 20 seconds remain unchanged. Initially ignore transfer overhead.

Step 1: The accelerated portion falls from 80 seconds to 8, giving 28 seconds in total.

Step 2: Overall speedup is 100/28≈3.57, not 10.

Step 3: Even eliminating all 80 seconds leaves 20 seconds, limiting speedup to 5×. Real transfers and scheduling also affect the result.

Result and explanation: Amdahl’s law shows why an individual kernel’s speedup must be assessed in the context of end-to-end runtime.

Pitfalls and limits: The analysis assumes fixed workload and accelerated fraction. Larger batches or another algorithm can change that fraction and require fresh measurement.

Try another condition: If only 10% of time can be accelerated, what is the limit even at infinite speed?

Self-check answer: 1/0.9≈1.11×.


### 适用边界与常见误解

GPUs are not faster for every task.

### 例题：CPU and GPU: Account for Work That Cannot Speed Up

A program takes 100 seconds. A GPU can accelerate 80 seconds of work by 10×; the other 20 seconds remain unchanged. Initially ignore transfer overhead.

1. The accelerated portion falls from 80 seconds to 8, giving 28 seconds in total.
2. Overall speedup is 100/28≈3.57, not 10.
3. Even eliminating all 80 seconds leaves 20 seconds, limiting speedup to 5×. Real transfers and scheduling also affect the result.

结果：Amdahl’s law shows why an individual kernel’s speedup must be assessed in the context of end-to-end runtime.

易错点：The analysis assumes fixed workload and accelerated fraction. Larger batches or another algorithm can change that fraction and require fresh measurement.

变式：If only 10% of time can be accelerated, what is the limit even at infinite speed?

参考答案：1/0.9≈1.11×.

### 推导与方法参考

- [一手资料](https://docs.nvidia.com/cuda/cuda-c-programming-guide/)
- [一手资料](https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/introduction.html)
- [一手资料](https://docs.nvidia.com/cuda/cuda-programming-guide/01-introduction/programming-model.html)
- [一手资料](https://ocw.mit.edu/courses/6-172-performance-engineering-of-software-systems-fall-2018/5655e50541f85421cc47b7c85d8e5de3_MIT6_172F18_lec8.pdf)
- [一手资料](https://www2.eecs.berkeley.edu/Pubs/TechRpts/2008/EECS-2008-134.pdf)

[返回分层目录](00-learning-index.md)
