# Google algorithm practice additions

Checked: 2026-10-17. Canonical content: `src/content/dictionary-en/interviews-google-algorithms.json`.

These six problems come from Google's official Code Jam and Kick Start archive. They are labeled `official-practice`: their publication establishes official contest provenance, not use in a Google hiring interview. The site uses concise explanations and independently computed examples. No candidate recollection or third-party company tag is used as evidence.

All source links are pinned to archive revision `87385db7dbd81b281225412b8ad496334536d016`.

| Entry | Official statement | Official analysis | Existing map concepts |
| --- | --- | --- | --- |
| Metal Harvest | [Kick Start 2020 F statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_f/metal_harvest/problem_statement/problem.html) | [Analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_f/metal_harvest/problem_statement/analysis.html) | Greedy algorithms; loop invariants; complexity |
| Slides! | [Code Jam 2016 1C statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2016/round_1c/slides/problem_statement/problem.html) | [Analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2016/round_1c/slides/problem_statement/analysis.html) | Topological sort; graph algorithms; dynamic programming |
| Alien Piano | [Kick Start 2020 D statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_d/alien_piano/problem_statement/problem.html) | [Analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_d/alien_piano/problem_statement/analysis.html) | Dynamic programming; loop invariants; complexity |
| Moons and Umbrellas | [Code Jam 2021 qualification statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2021/qualification_round/moons_and_umbrellas/problem_statement/problem.html) | [Analysis, including extra credit](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2021/qualification_round/moons_and_umbrellas/problem_statement/analysis.html) | Dynamic programming; loop invariants |
| Bundling | [Kick Start 2020 A statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_a/bundling/problem_statement/problem.html) | [Analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_a/bundling/problem_statement/analysis.html) | Tries; postorder processing; greedy algorithms |
| Candies | [Kick Start 2020 C statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_c/candies/problem_statement/problem.html) | [Analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_c/candies/problem_statement/analysis.html) | Fenwick trees; segment trees; prefix sums |

The official Candies analysis uses segment trees. The site's Fenwick alternative maintains the same two additive sums. Moons and Umbrellas uses an iterative two-state version of the official dynamic programming argument. Complexity statements assume constant-time arithmetic on sufficiently wide integers. In particular, a Candies query total can exceed JavaScript's exact `Number` range even under the original constraints; signed 64-bit integers suffice for those constraints.

## Independent numerical checks

The committed regression check runs with `npm run check:dictionary`. Its algorithm checker, `scripts/check-dictionary-algorithms.mjs`, covers all 14 Google/Meta additions, all 36 published examples, and 8,548 bounded comparisons without network access. It uses exhaustive or direct references that differ from the efficient teaching algorithms.

The standard-library verifier was run as:

```sh
node /private/tmp/check-google-algorithms-batch2.mjs
```

It reads the content JSON and checks all 15 published examples. Additional checks passed:

| Task | Independent reference | Cases |
| --- | --- | ---: |
| Metal Harvest | Enumerated integer-start windows and minimum set cover on required time cells | 1,275 |
| Slides! | All increasing-edge graphs for 2–5 vertices, plus explicit route enumeration through 9 vertices | 23 feasibility comparisons; 255 route counts |
| Alien Piano | Enumerated assignments of four keys | 363 input sequences |
| Moons and Umbrellas | Enumerated all completions, with positive, zero, and negative costs | 27,300 |
| Bundling | Enumerated partitions of labeled string occurrences | 300 |
| Candies | Direct weighted sums after mixed assignments and queries | 500 operation sequences |
| Candies integer precision | Closed-form comparison at 200,000 elements | 1 |

Edge cases cover disordered intervals, idle coverage and excluded endpoints; the two-vertex and maximum-capacity DAG cases; repeated pitches and a single note; negative transition costs at the first character; duplicates and strings ending inside a trie; even left endpoints, singleton ranges, repeated assignments, and operations without any query. These finite checks support the formulas and examples; the explanations provide the general invariants and recurrences.

No new concept keys are required. The six entries reuse the current graph vocabulary and point to existing lessons. They are distinct from the earlier Workout, Append Sort, Chain Reactions, and Double or One Thing entries.
