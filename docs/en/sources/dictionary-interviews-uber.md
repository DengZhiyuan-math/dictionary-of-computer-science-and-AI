# Uber preparation exercises from official engineering sources

Checked: 2026-10-17. Canonical data: `src/content/dictionary-en/interviews-uber.json`.

All three entries use `documentation-derived`. They are original preparation exercises based on Uber's engineering publications. None is represented as an actual Uber hiring question or a complete implementation of the source system. The articles and current H3 reference were read directly. No candidate reports or third-party company-frequency tags were used.

## Evidence ledger

| Entry | Official primary source | Established source material | Local exercise assumptions |
| --- | --- | --- | --- |
| `uber-hex-neighborhood` | [Uber: H3 spatial index, 2018](https://www.uber.com/us/en/blog/h3/) and [official H3 traversal reference](https://h3geo.org/docs/api/traversal/) | Uber developed H3 for spatial analysis. Neighborhood traversal returns cells within a grid distance. H3 has pentagons; API result order is unspecified. | An infinite planar axial grid with six explicit neighbor offsets. Original coordinates, inputs, enumeration algorithm, and counts. No real H3 indexes or spherical-distance claims. |
| `uber-critical-path` | [Uber: CRISP, 2021](https://www.uber.com/us/en/blog/crisp-critical-path-analysis-for-microservice-architectures/) | A computation DAG has work nodes and dependency edges. Its longest weighted path limits parallel completion time. The article separates dependency analysis from the treatment of nested RPC spans and notes that bottlenecks can shift after optimization. | The input DAG is already constructed from nonoverlapping work units. Unlimited workers and zero scheduling/communication overhead. Original durations, edges, cycle convention, examples, and topological-DP solution. |
| `uber-max-min-allocation` | [Uber: Peloton resource scheduler, 2018](https://www.uber.com/us/en/blog/resource-scheduler-cluster-management-peloton/) | Peloton uses hierarchical max-min fairness and elastic resource pools. The source describes reservations, limits, weights, and entitlement across resource dimensions. | One divisible resource, equal weights, demand caps, no reservations or hierarchy. Original inputs and equal-level water-filling solution. This deliberately omits real placement, preemption, and multidimensional policy. |

The [official coding interview process article](https://www.uber.com/en-NG/blog/engineering-interview-process/) was also checked. It uses finding anagrams as an example of clarifying capitalization and output-order requirements. It does not supply a full problem contract. The dictionary already has anagram practice, so that mention was not promoted into another alleged hiring sample.

## Mathematical contracts and boundaries

For the planar hex exercise, the coordinate difference `(dq,dr)` has hop distance `max(abs(dq),abs(dr),abs(dq+dr))`. Shell `j>=1` has `6j` cells, so the filled disk contains `1+3k(k+1)`. This count is a property of the ideal planar grid in the prompt. It is not an unconditional equality for real H3 disks near pentagons. Output is a set; example display order is not a required API order. `k=0` includes only the origin. The expected time bound assumes constant-time coordinate arithmetic and hash-set operations.

For the dependency DAG, `finish[v] = duration[v] + max(finish[u] for u->v)`, with an empty predecessor maximum of zero. The maximum finish is the makespan under unlimited parallelism. Reconstruction returns any maximizing path. Empty graphs return zero; zero-duration cycles remain invalid. Real RPC spans can overlap and include child time; feeding inclusive span lengths directly into this recurrence would double-count work. Finite-worker scheduling is outside the contract.

For equal-weight max-min allocation, `x[i]=min(d[i],lambda)` and `sum(x)=min(C,sum(d))`. If all demands are satisfied, excess capacity is unused. Zero demands freeze at zero; zero capacity yields all-zero allocations; an empty instance consumes nothing. Allocation can be fractional. A satisfied low-demand pool must not waste capacity that can serve another pool. The map links to the dedicated max-min fairness concept, greedy algorithms, operating systems, and complexity. It does not use `scheduler`, which refers to learning-rate schedules in this dictionary.

## Independent verification

A standard-library verifier was run:

```sh
python3 /private/tmp/check-dictionary-uber.py
```

| Check | Independent reference | Cases |
| --- | --- | ---: |
| Published examples | Separate implementations of all three models | 12 |
| Hex BFS | Axial distance scan and closed-form disk count | 65 origin/radius combinations |
| Critical-path DP | Exhaustive path enumeration, including zero weights and cycles | 5,925 graphs/duration assignments |
| Water filling | Enumeration of saturated subsets with exact rational arithmetic | 13,277 demand/capacity combinations |

The DAG checks exhaust every forward-edge subset on up to four vertices with duration choices `{0,1,3}`, then include randomly relabeled larger DAGs and explicit cycles. The allocation checks cover all demand vectors of lengths 0 through 4 over `{0,1,2,3,4}` and capacities 0 through 16. All checks passed. These offline checks support the mathematical models and examples; they do not evaluate Uber services or establish current hiring practice.

The persistent cross-batch check is `node scripts/check-dictionary-apple-uber-netflix.mjs`. It reads all three canonical company files and verifies all 40 published examples against separate oracles. It also runs 55,767 bounded comparisons across all ten questions, including exhaustive snapshot move distances, single-flight failure/retry traces, demand credits, platform grapheme boundaries and UTF-8 bytes, hex geometry, DAG path enumeration, saturated allocation subsets, segment-aware masks, Cartesian encoding selections, and exact-integer Vegas threshold comparisons. It performs no network calls and uses only Node standard-library functionality. The complete run passed in approximately 0.3 seconds locally.
