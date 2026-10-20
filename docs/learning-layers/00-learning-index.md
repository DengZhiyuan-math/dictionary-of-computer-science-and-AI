# 知识点的两层学习目录

共 169 个知识点。本轮第一层已按[写作标准](../learning-quality/first-layer-writing-standard.md)逐篇检查，内容包括准确的定义、必要背景、完整例子、互补练习和已解释答案。读者具备数学博士训练，但不默认掌握相邻领域术语，也不默认偏好符号化。第二层及原有完整解释继续保留。结构与翻译检查不单独认证教学质量；[逐篇记录](../learning-quality/first-layer-review-manifest.json)将审核证据与具体内容版本对应。

结构化内容：[learning-layers.json](../../data/learning-layers.json)。此补充资料由网站的共享概念数据导出；原有章节、题号和来源保持不变。

## Hot 100 Algorithm Practice

- [Knapsack · 物品使用次数与一维状态更新](0-1-knapsack-unbounded-knapsack.md)
- [Backtracking / Pruning](backtracking-pruning.md)
- [Canonical Key](canonical-key.md)
- [Dummy Node](dummy-node.md)
- [Fast and Slow Pointers](fast-and-slow-pointers.md)
- [In-place Marking](in-place-marking.md)
- [Kadane’s Algorithm](kadane.md)
- [Loop Invariant](loop-invariant.md)
- [Lower Bound / Upper Bound](lower-bound-upper-bound.md)
- [Monotonic Deque](monotonic-deque.md)
- [Monotonic Stack](monotonic-stack.md)
- [Multi-source BFS · 等时传播与最近源距离](multi-source-bfs.md)
- [Postorder DP · 树上动态规划的返回值与全局答案](postorder-dp.md)
- [Prefix Sum](prefix-sum.md)
- [Quickselect / Top K](quickselect-top-k.md)
- [Sliding Window](sliding-window.md)
- [Topological Sort](topological-sort.md)
- [Two Pointers](two-pointers.md)
- [Stack](stack.md)
- [Heap](heap.md)
- [Trie](trie.md)

## Losses, Training, and Optimization

- [Activation Checkpointing](activation-checkpointing.md)
- [Adagrad / RMSProp](adagrad-rmsprop.md)
- [Adam / AdamW](adam-adamw.md)
- [Batch Size](batch-size.md)
- [BatchNorm / LayerNorm / RMSNorm](batchnorm-layernorm-rmsnorm.md)
- [BCE — Binary Cross-Entropy](bce.md)
- [BCEWithLogitsLoss](bcewithlogitsloss.md)
- [Checkpoint / Resume / Seed](checkpoint-resume-seed.md)
- [Contrastive Loss](contrastive-loss.md)
- [Cross-Entropy / NLL](cross-entropy-nll.md)
- [CTC — Connectionist Temporal Classification](ctc.md)
- [Dice Loss](dice-loss.md)
- [Dropout](dropout.md)
- [Early Stopping / Patience](early-stopping-patience.md)
- [Focal Loss](focal-loss.md)
- [Forward / Backward](forward-backward.md)
- [Gradient](gradient.md)
- [Gradient Clipping](gradient-clipping.md)
- [Huber Loss](huber-loss.md)
- [Initialization / Residual Connection](initialization-residual-connection.md)
- [Iteration / Optimizer Step / Epoch](iteration-optimizer-step-epoch.md)
- [KL Divergence](kl-divergence.md)
- [Learning Rate](learning-rate.md)
- [Loss / Objective / Metric](loss-objective-metric.md)
- [Microbatch / Gradient Accumulation](microbatch-gradient-accumulation.md)
- [Mixed Precision / Loss Scaling](mixed-precision-loss-scaling.md)
- [MSE / MAE / RMSE](mse-mae-rmse.md)
- [NaN / Inf / OOM](nan-inf-oom.md)
- [Regularization](regularization.md)
- [Scheduler](scheduler.md)
- [SGD / Momentum](sgd-momentum.md)
- [Train / Eval / No Grad](train-eval-no-grad.md)
- [Warmup / Warm Start](warmup-warm-start.md)
- [Weight Decay](weight-decay.md)
- [Zero Grad / Detach](zero-grad-detach.md)
- [Neural Network](neural-network.md)

## Retrieval, RAG, and Agents

- [Agent](agent.md)
- [BM25 / HNSW · 文本与向量检索的索引应用](bm25-hnsw.md)
- [RAG — Retrieval-Augmented Generation](rag.md)

## Computer Systems and Software

- [API — Application Programming Interface](api.md)
- [Concurrency / Parallelism](concurrency-parallelism.md)
- [CPU / GPU](cpu-gpu.md)
- [Operating System](operating-system.md)
- [Backpressure / Subscriber Demand](backpressure.md)
- [Max-min Fairness / Water Filling](max-min-fairness.md)
- [GPU Coalescing / Scan / Reduction](gpu-parallel-algorithms.md)

## LLM Training and Inference

- [Attention / Transformer](attention-transformer.md)
- [DPO / GRPO](dpo-grpo.md)
- [KV Cache / FlashAttention · 注意力推理的缓存与访存](kv-cache-flashattention.md)
- [SFT / LoRA / QLoRA](sft-lora-qlora.md)
- [Token / Embedding](token-embedding.md)

## Data Structures and Algorithms

- [BFS / DFS](bfs-dfs.md)
- [Dijkstra’s Algorithm](dijkstra.md)
- [Dynamic Programming](dynamic-programming.md)
- [Hash Table](hash-table.md)
- [Greedy](greedy.md)
- [Complexity](complexity.md)
- [Recursion](recursion.md)
- [Data Structures](data-structures.md)
- [Graph Algorithms](graph-algorithms.md)
- [Disjoint-set Union](disjoint-set-union.md)
- [0-1 BFS](zero-one-bfs.md)
- [Bellman-Ford](bellman-ford.md)
- [Fenwick Tree](fenwick-tree.md)
- [Segment Tree](segment-tree.md)
- [Difference Array](difference-array.md)
- [KMP Prefix Function](kmp-prefix-function.md)
- [Aho-Corasick](aho-corasick.md)
- [LIS Tails](lis-tails.md)
- [Weighted Interval Scheduling](weighted-interval-dp.md)
- [Interval DP](interval-dp.md)
- [Bitmask DP](bitmask-dp.md)
- [Binary Search on the Answer](binary-search-answer.md)
- [Reservoir Sampling](reservoir-sampling.md)
- [Bloom Filter](bloom-filter.md)
- [Amortized Analysis](amortized-analysis.md)
- [Exact Decimal Arithmetic / Minor Units](exact-decimal-arithmetic.md)
- [Cryptographic Hashes / Streaming Digests](cryptographic-hash.md)
- [Unicode Grapheme Clusters / UTF-8](unicode-graphemes.md)
- [Floyd–Warshall / All-pairs Shortest Paths](floyd-warshall.md)
- [Graph Core / Degree Peeling](graph-core-peeling.md)
- [Squared-distance Sums / Coordinate Moments](squared-distance-moments.md)

## Data, Tasks, and Evaluation

- [Binary / Multiclass / Multilabel](binary-multiclass-multilabel.md)
- [Broadcasting](broadcasting.md)
- [Calibration](calibration.md)
- [Cross-Validation](cross-validation.md)
- [Data Leakage](data-leakage.md)
- [Dtype / Device](dtype-device.md)
- [F1 Score](f1.md)
- [Logit](logit.md)
- [Macro / Micro](macro-micro.md)
- [Parameter / Hyperparameter](parameter-hyperparameter.md)
- [Precision](precision.md)
- [Recall](recall.md)
- [ROC AUC / PR AUC](roc-auc-pr-auc.md)
- [Sample / Feature / Label](sample-feature-label.md)
- [Sigmoid](sigmoid.md)
- [Softmax](softmax.md)
- [Tensor / Shape / Axis](tensor-shape-axis.md)
- [Threshold](threshold.md)
- [Feature Engineering](feature-engineering.md)
- [Causality](causality.md)

## Machine Learning and Statistical Models

- [Boosting](boosting.md)
- [Bootstrap / OOB](bootstrap-oob.md)
- [EM / Viterbi](em-viterbi.md)
- [K-nearest Neighbors · K 近邻预测](knn-k-means.md)
- [PCA — Principal Component Analysis](pca.md)
- [Random Forest](random-forest.md)
- [Linear Models](linear-models.md)
- [Decision Tree](decision-tree.md)
- [Clustering](clustering.md)
- [Anomaly Detection](anomaly-detection.md)
- [Time Series](time-series.md)

## Robotics, VLA, and World Models

- [Dreamer / MuZero](dreamer-muzero.md)
- [PID / MPC](pid-mpc.md)
- [VLA — Vision-Language-Action Model](vla.md)
- [World Model](world-model.md)
- [Motion Planning · 图搜索在机器人路径中的应用](motion-planning.md)

## Databases, Networks, and Distributed Systems

- [Index](index.md)
- [Replication / Sharding](replication-sharding.md)
- [Transaction / ACID](transaction-acid.md)
- [Network](network.md)
- [Consensus](consensus.md)
- [Cache](cache.md)
- [Adaptive Concurrency · 服务并发上限的反馈控制](adaptive-concurrency.md)
- [SQL Aggregation / Join Cardinality](sql-aggregation.md)
- [MapReduce / Mergeable Summaries](mapreduce-combiners.md)
- [Mergeable Variance · 流式方差与分片合并](mergeable-variance.md)
- [External Consistency](external-consistency.md)
- [SLI / SLO / Error Budget](slo-error-budget.md)
- [Token Bucket / Rate Limiting](token-bucket.md)
- [Circuit Breaker](circuit-breaker.md)
- [Optimistic Concurrency / Conditional Writes](optimistic-concurrency.md)
- [Idempotency / Safe Retries](idempotency.md)
- [Message Ordering / FIFO Groups](message-ordering.md)
- [Consistent Hashing](consistent-hashing.md)
- [Distributed Cache Coherence / Leases](cache-coherence.md)

## Reinforcement and Imitation Learning

- [Off-policy / Offline RL](off-policy-offline-rl.md)
- [PPO / SAC / TD3](ppo-sac-td3.md)
- [Q-learning / SARSA](q-learning-sarsa.md)
- [Bellman Equations](bellman.md)
- [Policy Gradient](policy-gradient.md)
- [Imitation Learning](imitation-learning.md)

## Generative Models and Multimodality

- [VAE / GAN / Diffusion](vae-gan-diffusion.md)
- [Multimodal Representation](multimodal-representation.md)

## Network Architectures and AI Engineering

- [CNN — Convolutional Neural Network](cnn.md)
- [RNN — Recurrent Neural Network](rnn.md)
- [MLOps](mlops.md)
