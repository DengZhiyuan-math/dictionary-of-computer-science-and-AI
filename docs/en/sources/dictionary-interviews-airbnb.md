# Airbnb preparation exercises from primary technical sources

Checked: 2026-10-17. Canonical data: `src/content/dictionary-en/interviews-airbnb.json`.

This batch adds three original English preparation exercises and 13 worked examples. Every entry uses `documentation-derived`. None is presented as a published Airbnb hiring question. The sources are Airbnb's official Chronon repository and the authors' public version of an Airbnb research paper. Candidate reports and company-frequency tags were not used. Search also surfaced candidate assessment material carrying confidentiality language; it was excluded as unsuitable for a public question bank.

## Evidence ledger

| Entry | Primary evidence | Established source material | Exercise-specific assumptions |
| --- | --- | --- | --- |
| `airbnb-point-in-time-window` | [Chronon README at commit 5bbc4d1](https://github.com/airbnb/chronon/blob/5bbc4d176a205e32b4172b8f0ecd360072cdb0fe/README.md), sections on backfills, joins, and consistency; [Airbnb's Chronon project page](https://airbnb.tech/opensource/chronon/) | The source associates feature backfills with each left-side key and timestamp, supports windowed aggregations, and discusses consistency with online feature serving. | A complete offline event history; per-user count and sum; positive fixed window width; the exact half-open interval `[t-W,t)`; repeated rows counted separately; output restored to query input order. These choices are stated in the question rather than attributed to a Chronon API. |
| `airbnb-diversity-greedy` | [Managing Diversity in Airbnb Search, arXiv:2004.02621v1](https://arxiv.org/abs/2004.02621v1), Sections 2.1 and 3.1, Equation 2 | Airbnb authors define Mean Listing Relevance using position-weighted booking relevance and distances from the selected prefix. They describe an incremental greedy ranker as one historical approach. | Supplied probabilities, discounts, symmetric dissimilarity matrix, deterministic input-index ties, example data, and the cached prefix-distance implementation. Dissimilarities need not satisfy the triangle inequality. The task computes the stated greedy policy; it does not claim global optimality or current production use. |
| `airbnb-mergeable-variance` | [Chronon SimpleAggregators.scala at commit 5bbc4d1, lines 160–247](https://github.com/airbnb/chronon/blob/5bbc4d176a205e32b4172b8f0ecd360072cdb0fe/aggregator/src/main/scala/ai/chronon/aggregator/base/SimpleAggregators.scala#L160-L247) | `WelfordState` keeps a count, mean, and centered second moment; it supports updates and parallel merges. `finalizeImpl()` returns `m2 / count`, so the displayed aggregation is population variance. | Original shards and outputs; empty shards are identities; an entirely empty result has null mean and variance. This explicit empty-result convention is not a claim about Chronon's API for empty states. |

Repository links are pinned to full commit `5bbc4d176a205e32b4172b8f0ecd360072cdb0fe`, read from the official `airbnb/chronon` repository during this review. The arXiv link pins version 1, dated 31 March 2020. Its title page identifies the authors' Airbnb affiliation. The current project page establishes the provenance of the Chronon repository; it is not used to infer current interview content.

## Contracts and correctness

### Temporal feature windows

For a query `(u,t)`, include precisely the rows whose user is `u` and whose event time lies in `[t-W,t)`. Sorting each user's queries allows monotonically increasing left and right event pointers. After advancing them, `[left,right)` contains exactly those rows; the running count and sum are therefore correct. Duplicate rows remain separate observations. Negative values do not affect pointer monotonicity because membership depends on time rather than the sum.

The total sort cost is bounded by `O(E log(E+1)+Q log(Q+1))`; the sweep is `O(E+Q)`. Grouped copies, query indices, and results need `O(E+Q)` additional space. This avoids the ambiguity of claiming constant space while retaining the full grouped history.

The event-time condition prevents later event times from entering earlier feature examples. It does not establish that an actual historical online service had already received every included event. Reconstructing what was known online requires an availability or ingestion-time condition in addition to the event-time condition. That distinction is preserved in the prompt, source note, pitfalls, and follow-up.

### Greedy diversity reranking

At one-based output position `i`, the question selects the remaining candidate maximizing:

```text
g_i(x) = (1-lambda) c[i] p[x]
         + lambda / i * sum(d[x][y] for y in selected_prefix)
```

The denominator is `i`, matching the displayed formula in the pinned paper; replacing it with `i-1` would define another model. The first distance contribution is zero. Before each selection, `distanceSum[x]` equals the sum against the selected prefix. Adding `d[x][z]` after selecting `z` preserves that invariant. Scanning remaining candidates and updating their sums costs `O(nk)` beyond the supplied matrix. The matrix itself occupies `O(n^2)` input space; validating all entries adds `O(n^2)` time. Computing each distance from `D`-dimensional features on demand instead costs `O(nkD)` time.

The worked counterexample distinguishes local selection from final ordered optimization. With `p=[1,0.9,0.8]`, `lambda=0.5`, discounts `[1,1]`, and `d(A,B)=d(A,C)=0.2`, `d(B,C)=10`, greedy chooses `A,B` with total `1`. The order `B,C` has total `0.45+0.4+0.5*10/2=3.35`. The problem permits nonmetric dissimilarities, so it does not rely on an unstated triangle inequality. Exact score ties use input order. Floating-point implementations should choose a consistent numeric comparison policy rather than silently introducing an arbitrary tolerance into this exact-tie contract.

### Mergeable population variance

A nonempty summary is `(n,mean,M2)`, with `M2=sum((x-mean)^2)`. Let `delta=meanB-meanA` and `n=nA+nB`. The parallel merge is:

```text
mean = meanA + delta*nB/n
M2   = M2A + M2B + delta^2*nA*nB/n
```

Expanding both shards' deviations around the combined mean proves the identity: each within-shard cross term vanishes because deviations sum to zero. Empty states are handled before division. Final population variance is `M2/n`. Sample variance would instead use `M2/(n-1)` for `n>=2`; it is a separate output contract.

For shards `[2,4]` and `[8,10,12]`, local states are `(2,3,2)` and `(3,10,8)`. The merge gives `(5,7.2,68.8)` and population variance `13.76`. The count-weighted average of the two local variances is only `2`, because it omits the between-shard contribution `58.8`. Centered updates reduce common cancellation problems, but floating-point reduction order can still change low-order bits.

Map links reuse sliding windows, two pointers, data leakage, feature engineering, greedy algorithms, objective functions, complexity, and MapReduce summaries. A dedicated `mergeable-variance` concept covers the additional state and between-group correction.

## Independent verification

All 13 published examples were recomputed from separate direct models. Temporal examples use row filtering; reranking examples explicitly sum distances to every previously selected candidate; variance examples use exact rational arithmetic on the raw observations before converting final values to decimals.

A separate bounded standard-library Python check also compared the proposed efficient algorithms with those direct models:

| Model | Independent reference | Comparisons |
| --- | --- | ---: |
| Per-user pointer sweep | Direct filtering of every query's event rows | 1,000 |
| Cached prefix-distance reranker | Recompute every candidate's full prefix sum at every position | 500 |
| Welford state and shard merge | Exact rational mean and centered squares of all observations | 500 |

All 2,000 deterministic randomized comparisons passed with seed `617`. Cases include empty inputs, duplicate rows, equal event/query timestamps, lower window boundaries, negative values, missing users, exact ranking ties, zero-length selections, lambda endpoints, uneven shards, and empty shards. Published fixtures additionally cover a large common numerical offset and a concrete greedy counterexample. These checks validate the teaching models and examples; they make no calls to Airbnb services and establish no claim about hiring practice.
