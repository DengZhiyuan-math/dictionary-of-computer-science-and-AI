# Netflix: source-backed engineering practice

Checked: 2026-10-17. Canonical data: `src/content/dictionary-en/interviews-netflix.json`.

This batch adds three original English exercises grounded in first-party Netflix engineering material. All three use `documentation-derived`. A bounded search did not locate a verified Netflix-published hiring problem suitable for this batch; that does not establish that none exists. No candidate recollection, commercial preparation list, or third-party company-frequency tag establishes the provenance of these exercises.

## Evidence ledger

| Entry | Primary evidence | What the evidence establishes | Local exercise boundary |
| --- | --- | --- | --- |
| `netflix-fieldmask-normalization` | [Netflix: Using Protobuf FieldMask](https://netflixtechblog.com/practical-api-design-at-netflix-part-1-using-protobuf-fieldmask-35cfdc606518), September 3, 2021; [Protobuf FieldMaskUtil](https://protobuf.dev/reference/java/api-docs/com/google/protobuf/util/FieldMaskUtil) | Netflix describes field selection to avoid unnecessary service calls. The linked Protobuf utility documents canonical normalization. | The trie algorithm, schema-valid input contract, structured examples, and outputs are original. |
| `netflix-shot-budget` | [Netflix: Dynamic Optimizer](https://netflixtechblog.com/dynamic-optimizer-a-perceptual-video-encoding-optimization-framework-e19f1e3a277f), March 5, 2018 | Netflix describes shot-specific encoding choices and rate-quality optimization. | The dense integer-budget DP is a teaching model, not a claim about its production optimizer. |
| `netflix-vegas-limit` | [Pinned Netflix VegasLimit.java](https://github.com/Netflix/concurrency-limits/blob/78a74b9878d38c4c048b0304ce12a162ab7b7222/concurrency-limits-core/src/main/java/com/netflix/concurrency/limits/limit/VegasLimit.java); [pinned repository overview](https://github.com/Netflix/concurrency-limits/blob/78a74b9878d38c4c048b0304ce12a162ab7b7222/README.md) | The implementation provides the queue-estimation update branches. The overview explains the concurrency-limiting context. | Custom constants and exact arithmetic make this a deterministic trace rather than a full Java-library reproduction. |

The pinned repository revision was resolved through GitHub's commit API and the source was read at that revision. The two blog posts and official Protobuf API reference were also read directly. Explanations and examples are independently authored; the site does not reproduce the articles or claim that these tasks appeared in interviews.

## Contracts and edge cases

Field-mask coverage is defined by complete path segments. `schedule` covers `schedule.date` but not `schedule_dates`. A parent arriving after a child must remove that child. All paths are assumed valid in an abstract schema, without repeated fields or wildcards. This exercise receives an explicitly present mask; an empty list selects no fields. An absent request mask is outside its contract. The main solution determines needed top-level fields before remote work.

The shot exercise uses positive integer byte costs and nonnegative additive synthetic quality scores. It requires exactly one candidate from every shot, including low-quality candidates when necessary. It returns `null` when infeasible and zero for an empty shot sequence. These scores are not video-quality measurements, and additivity does not model every real temporal-quality objective. The quality-per-extra-byte counterexample is original. The complexity states its dependence on the numeric budget, including a zero budget, and identifies the pseudopolynomial bound.

The Vegas trace starts after baseline initialization, assumes no probe or reset, and fixes the baseline at 100 ms. Its configured threshold, alpha, beta, increments, and smoothing are stated in the question; they are not advertised as defaults. Only the core update is traced. A drop precedes the low-demand guard. The exact rational ceiling is part of the teaching model; IEEE rounding can change a ceiling near an integer. Examples test both threshold equalities, both clamps, and a low-demand drop. No network measurements or performance guarantees are asserted.

## Independent checks

A temporary standard-library verifier read the actual JSON and ran:

```sh
python3 /private/tmp/check-netflix-practice.py
```

| Check | Reference or invariant | Cases |
| --- | --- | ---: |
| Published examples | Pairwise path coverage, Cartesian candidate enumeration, rational Vegas trace | 12 |
| Field-mask insertion orders | Trie versus all-pairs segment-ancestor elimination | 438 |
| Shot optimization | Dense DP versus exhaustive Cartesian selections | 2,000 |
| Vegas arithmetic | `Fraction` ceiling versus integer ceiling division | 64,160 |

All checks passed. Mask checks include duplicate paths, reversed insertion order, ancestor chains, and prefix-like sibling names. DP checks include zero shots, empty candidate lists, zero budget, duplicate costs, and infeasible complete assignments. Vegas arithmetic checks cover every initial limit 1 through 20 and integer sample RTT 100 through 500, with both drop values and utilization boundaries. This checks the arithmetic model; branch order was separately reviewed against the pinned implementation. The cross-batch persistent checker is maintained outside this agent's file ownership.

Map references reuse `trie`, `canonical-key`, `api`, `dynamic-programming`, `0-1-knapsack-unbounded-knapsack`, `complexity`, `concurrency-parallelism`, `network`, and `loop-invariant`. The new `adaptive-concurrency` concept is integrated by the parent agent.
