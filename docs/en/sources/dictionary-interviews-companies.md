# Company documentation exercises

Checked on 2026-10-17. This supplement contains ten original English exercises based on primary technical sources: Microsoft (3), Amazon/AWS (3), NVIDIA (3), and Meta/Facebook (1). The company field identifies the source owner. Every item is `documentation-derived`; none is presented as an actual interview question, a frequency estimate, or a company hiring endorsement.

## Evidence ledger

| Exercise ID | Primary source and verified scope |
| --- | --- |
| microsoft-token-bucket | [Microsoft throttling guidance](https://learn.microsoft.com/en-us/azure/architecture/patterns/throttling): burst allowance, refill rate, replica coordination. The numerical trace is original. |
| microsoft-circuit-breaker | [Microsoft circuit breaker guidance](https://learn.microsoft.com/en-us/azure/architecture/patterns/circuit-breaker): closed/open/half-open state machine. The consecutive-failure policy is an explicit exercise assumption. |
| microsoft-etag-concurrency | [Cosmos DB optimistic concurrency](https://learn.microsoft.com/en-us/azure/cosmos-db/database-transactions-optimistic-concurrency): ETag preconditions, HTTP 412, single-region versus multi-region scope. |
| amazon-consistent-hashing | [AWS consistent hashing guidance](https://docs.aws.amazon.com/wellarchitected/latest/reducing-scope-of-impact-with-cell-based-architecture/consistent-hashing.html): limited remapping and potential imbalance. The ring, positions, and lookup rule are defined in the exercise. |
| amazon-conditional-inventory | [DynamoDB condition expressions](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ConditionExpressions.html): conditional UpdateItem. The stock invariant and four-unit example are original. |
| amazon-fifo-message-groups | [SQS FIFO delivery logic](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/FIFO-queues-understanding-logic.html): ordering within groups and concurrency across groups. Six is the number of schedules allowed by the stated mathematical constraints, not a service scheduling promise. |
| nvidia-memory-coalescing | [CUDA Best Practices Guide](https://docs.nvidia.com/cuda/cuda-c-best-practices-guide/index.html#coalesced-access-to-global-memory): 32-byte transaction model for compute capability at least 6.0. Segment totals exclude cache reuse and are not measured DRAM traffic. |
| nvidia-parallel-scan | [GPU Gems 3, Chapter 39](https://developer.nvidia.com/gpugems/gpugems3/part-vi-gpu-computing/chapter-39-parallel-prefix-sum-scan-cuda): exclusive scan, Blelloch work/depth, compaction. Historical hardware and performance figures are deliberately not reused. |
| nvidia-warp-reduction | [NVIDIA synchronized warp primitives](https://developer.nvidia.com/blog/using-cuda-warp-level-primitives/): shuffle tree and explicit participation. All 32 lanes participate, including zero-padding lanes. |
| meta-cache-lease | [Facebook's NSDI 2013 paper, Section 3.2.1](https://www.usenix.org/system/files/conference/nsdi13/nsdi13-final170_update.pdf): invalidation revokes refill leases. The small numbered-token trace is original; this historical design is not asserted to describe Meta's current production system. |

The Meta paper is a first-party research publication by Facebook engineers. Its provenance is also linked from [Meta's engineering announcement](https://engineering.fb.com/2013/04/15/core-infra/scaling-memcache-at-facebook/).

## Attribution and access limits

[Microsoft's technical interview guide](https://careers.microsoft.com/v2/global/en/hiring-tips/technical-interviewing) supports the relevance of algorithms, testing, and systems knowledge, but it does not substantiate these specific questions as Microsoft interview samples.

The Meta Careers Coding Puzzles endpoint returned HTTP 429, and the Facebook practice endpoint was throttled during this research. No unverified puzzle statement or third-party company tag was imported. Apple-specific material was not added in this batch.

Question statements, numerical inputs, answers, and implementation discussion were independently authored. Each record links to the source that supports its underlying technical semantics. Discussion remains concise and does not reproduce source code, article text, or hiring material.

## Verification and assumptions

- Token bucket: exact fractional refill trace; nonnegative monotonic time; one-token request cost.
- Breaker: deterministic sequential state trace; a five-second interval starts at the second failure; equality with the deadline permits a probe.
- ETag and inventory: single-item conditional writes. The examples do not claim atomicity across multiple items or regions. Inventory protection is distinct from idempotency.
- Consistent hash ring: exact clockwise successor rule with wraparound; adding position 20 changes the stated sample only at hash 10.
- FIFO: enumerating all permutations yields six satisfying A1<A2 and B1<B2. Batch delivery requires the application to preserve the order of effects.
- GPU memory: count distinct aligned segment addresses, including all four bytes of each requested word.
- Scan: compare each exclusive output against a direct prefix sum; n=8 gives 2*(8-1)=14 tree additions.
- Warp reduction: simulate synchronous shuffle stages over all 32 lanes and check lane zero against an independent integer sum. Full participation avoids undefined absent-lane reads.
- Cache lease: evaluate the ordered read/write/invalidate/fill trace. The rejection protects this fill; broader consistency requires additional protocol assumptions.

Seven proposed graph keys are `token-bucket`, `circuit-breaker`, `optimistic-concurrency`, `message-ordering`, `consistent-hashing`, `gpu-parallel-algorithms`, and `cache-coherence`. The GPU umbrella connects the three related exercises; existing CPU/GPU, prefix-sum, concurrency, network, cache, transaction, replication, and binary-boundary concepts remain in use.
