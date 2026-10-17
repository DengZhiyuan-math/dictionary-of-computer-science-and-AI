# Google public-source preparation additions

Checked on 2026-10-17. The canonical additions are in `src/content/dictionary-en/interviews-google.json`.

These eight entries contain four official contest practice tasks and four original exercises based on Google documentation. None is described as an actual Google interview question. The [former Tech Dev Guide interview path](https://techdevguide.withgoogle.com/paths/interview/) currently redirects to Google Careers resources, so it was not used as evidence for historical interview attribution. The four contest entries use Google's [official competition archive](https://github.com/google/coding-competitions-archive), pinned at commit `87385db7dbd81b281225412b8ad496334536d016`.

## Source ledger

| Record | Primary evidence | Scope and classification |
| --- | --- | --- |
| `google-workout` | [Statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_a/workout/problem_statement/problem.html), [official analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/kickstart/2020/round_a/workout/problem_statement/analysis.html) | Official practice, Kick Start 2020 Round A. Monotone insertion-count feasibility; the exercise explicitly includes the natural K = 0 boundary. |
| `google-append-sort` | [Statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2021/round_1a/append_sort/problem_statement/problem.html), [official analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2021/round_1a/append_sort/problem_statement/analysis.html) | Official practice, Code Jam 2021 Round 1A. Minimal decimal-prefix extension; complexity accounts for constructed digit lengths. |
| `google-chain-reactions` | [Statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2022/qualification_round/chain_reactions/problem_statement/problem.html), [official analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2022/qualification_round/chain_reactions/problem_statement/analysis.html) | Official practice, Code Jam 2022 qualification. The two-state recurrence is an independently expressed version of the official minimum-carry observation. |
| `google-double-or-one-thing` | [Statement](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2022/round_1a/double_or_one_thing/problem_statement/problem.html), [official analysis](https://github.com/google/coding-competitions-archive/blob/87385db7dbd81b281225412b8ad496334536d016/codejam/2022/round_1a/double_or_one_thing/problem_statement/analysis.html) | Official practice, Code Jam 2022 Round 1A. Run-level lexicographic decisions; distinct from run-length encoding and Decode String. |
| `google-mapreduce-mean` | [Google Research publication](https://research.google/pubs/mapreduce-simplified-data-processing-on-large-clusters/), [paper, section 4.3](https://storage.googleapis.com/gweb-research2023-media/pubtools/4449.pdf) | Documentation-derived original exercise. The paper supplies the partial-combining mechanism and algebraic conditions; the mean counterexample and examples are new. |
| `google-spanner-order` | [Spanner: TrueTime and external consistency](https://docs.cloud.google.com/spanner/docs/true-time-external-consistency) | Documentation-derived original exercise. The relevant guarantee concerns serializable transactions with external consistency. The example does not assert that every read mode uses the latest state. |
| `google-error-budget` | [SRE Workbook, Implementing SLOs](https://sre.google/workbook/implementing-slos/) | Documentation-derived original arithmetic exercise. Request-based good/total events and budget definitions; no automatic conversion to time-based availability. |
| `google-embedding-ranking` | [Google recommendation course: Candidate generation overview](https://developers.google.com/machine-learning/recommendation/overview/candidate-generation) | Documentation-derived original vector example. Norm sensitivity and normalized-ranking equivalence; no claim that norm proves popularity for an individual item. |

Prompts and explanations use original wording. Contest titles and technical terms retain their standard names. Company identifies the owner of the preparation source. It does not mean that a task was asked in that company's interviews, that it is representative of a current interview loop, or that Google endorses this site.

## Knowledge map integration

Existing algorithm nodes cover all four contest patterns: `binary-search-answer`, `greedy`, `postorder-dp`, `dynamic-programming`, `loop-invariant`, and `two-pointers`. Embedding retrieval reuses `token-embedding`, `rag`, and `multimodal-representation`, with the existing cosine worked example in lesson 64.

Three additional concepts are proposed:

- `mapreduce-combiners` — partial aggregation whose summary preserves enough information for regrouping; pairwise sum/count merging illustrates an associative and commutative operation in exact arithmetic. Related lessons: 19 and 20. Boundary: a scalar mean loses partition weights; floating-point arithmetic can depend on order; the exercise assumes each occurrence contributes exactly once.
- `external-consistency` — transaction serial order also respects real-time precedence. Related lessons: 16, 19, and 20. Boundary: serializability alone does not impose that real-time order, and independent reads are not automatically a single snapshot.
- `slo-error-budget` — a reliability target applied to an explicitly defined event population, with the tolerated bad-event fraction equal to one minus the target. Related lessons: 19 and 51. Boundary: request-based and time-based SLIs use different denominators; a 100% target leaves zero budget, so a budget-consumption ratio is undefined.

## Verification and limits

Independent checks passed using a temporary standard-library Python script:

- Workout: 984 cases. All original sequences of length 2 through 4 chosen from integers 1 through 9, with K from 0 through 3, were compared against every permitted insertion set between the endpoints.
- Append Sort: 252 sequences of length 2 or 3 over values {1, 2, 9, 10, 19, 99}. Exhaustive decimal extensions determined feasibility for every total budget from 0 through 3; results agreed with the greedy algorithm. Both displayed examples were also recomputed, including the example requiring 4 appended digits.
- Chain Reactions: 4,282 cases. Every lower-index parent forest with 1 through 5 nodes and every assignment of values from {1, 3} was checked against all leaf activation permutations. Both displayed examples were also recomputed.
- Double or One Thing: all 3,279 nonempty strings of length at most 7 over {A, B, C}, with every emission mask enumerated. All three displayed examples were also recomputed.
- Documentation exercises: direct sum/count calculations, transaction-order prefixes, exact rational SLO arithmetic, and direct vector arithmetic verified every displayed example. The unit-vector distance identity was also checked on both candidates.

These checks establish the stated local examples and test the recurrences over bounded inputs. They do not constitute a formal proof for every possible input or validate a production distributed system. Append Sort enumeration proves agreement only through the stated 3-digit budget, with separate checks for its displayed examples.
