# Public company interview samples: Asana and Slack

Checked: 2026-10-17. Canonical data: `src/content/dictionary-en/interviews-company-samples.json`.

This batch adds seven questions: four public company samples and three company-recommended algorithm exercises. It contains no candidate recollections and makes no claim that these questions remain in an active hiring loop. The explanations, contracts that resolve ambiguity, and small worked inputs are independently authored.

## Provenance

[Asana's Engineering Interview Guide](https://asana.com/eng/interview-guide) explicitly links the public [Asana 101 Technical Interview Guide](https://docs.google.com/document/d/1wVUna6BgzBm8l8iMgrbcKAToSNAUe2c6o65D8kR5i8U/edit). The document labels Growing Hedges as a sample problem. Its Min/Max Heaps practice list names Reorganise String and Find K Pairs with the Smallest Sums. Its Hash Tables list names Insert Delete GetRandom in O(1). Those three recommendations establish the Asana association; their linked LeetCode statements establish the problem contracts. They are labelled `official-practice`, not `company-sample`.

[Slack's official preparation repository](https://github.com/slackhq/backend-interview-prep-questions/blob/33a0b146af19bde1473123e5da0a6803d861c7d3/README.md) explicitly asks three questions about movie runtime, actor counts, and rating categories. It also states that this particular dataset will not be used in the onsite. The repository is archived. The sample [movie schema](https://github.com/slackhq/backend-interview-prep-questions/blob/33a0b146af19bde1473123e5da0a6803d861c7d3/movies.sql) and [actor schema](https://github.com/slackhq/backend-interview-prep-questions/blob/33a0b146af19bde1473123e5da0a6803d861c7d3/actors.sql) are pinned at commit `33a0b146af19bde1473123e5da0a6803d861c7d3`. The published table has separate content-certificate `rating` and numeric `imdb_score` columns.

| ID | Source classification | Statement and scope |
| --- | --- | --- |
| `asana-growing-hedges` | `company-sample` | Asana's complete public grid simulation sample; zero years and a nonempty rectangle are explicit exercise assumptions. |
| `asana-reorganize-string` | `official-practice` | [LeetCode 767](https://leetcode.com/problems/reorganize-string/), specifically recommended by Asana; any valid output permutation is acceptable. |
| `asana-k-smallest-pairs` | `official-practice` | [LeetCode 373](https://leetcode.com/problems/find-k-pairs-with-smallest-sums/), specifically recommended by Asana; duplicate values represent separate source-index pairs. |
| `asana-randomized-set` | `official-practice` | [LeetCode 380](https://leetcode.com/problems/insert-delete-getrandom-o1/), specifically recommended by Asana; random calls require a nonempty set. |
| `slack-longest-movie` | `company-sample` | Official preparation question; all ties, empty input, and deterministic ID ordering are added clarifications. |
| `slack-most-actors` | `company-sample` | Official preparation question; distinct actor identifiers, duplicate credits, zero-credit films, and all ties are added clarifications. |
| `slack-rating-breakdown` | `company-sample` | Official preparation question; percentages and deterministic category ordering are added clarifications. Ratings are nonnull category strings. |

## Correctness boundaries and checks

All 16 worked examples were independently recomputed. Grid outputs use an eight-neighbor simulation and an unordered all-pairs adjacency count. Pair-sum outputs were compared with a fully enumerated Cartesian product. String outputs preserve the multiset and satisfy adjacency constraints; impossible examples violate the separator bound. Randomized-set examples call `getRandom` only on a singleton, making their outputs deterministic. All six SQL examples were executed with Python's SQLite driver using the displayed queries.

The garden update is simultaneous. A boundary hedge never has eight in-bounds neighbors. A full 3 by 3 garden alternates between 20 and 12 adjacent hedge pairs. The final count is an undirected edge count, not the number of occupied cells.

The pair-sum heap bound includes construction, extraction, heap state, and output separately. The randomized-set bound is expected and amortized, not worst-case constant time. Uniform sampling assumes an unbiased bounded-index primitive.

SQL costs are described as abstract scan/hash algorithms where applicable. They are not asserted as unconditional SQLite execution-plan guarantees. `COUNT(DISTINCT a.imdb_id)` preserves distinct-person semantics under duplicate credit rows; the left join preserves films with no credits. Category percentages use a real-valued numerator to avoid integer division.

Existing question IDs and the 100 LeetCode map entries were checked for duplicate statements. These seven statements are new to this site's bank. Some reuse existing techniques, such as heap merging and hashing; that is intentional. Their question details link to the existing concepts and lessons. The three SQL questions additionally link to the new `sql-aggregation` concept maintained by the integration owner.

## Limits

Asana's public document records its own last-verification date in 2023, and Slack's repository was archived in 2025. These are historical public preparation materials. Their provenance establishes company publication or recommendation, not frequency, recency of use, or a guarantee about future interviews.

Third-party interview-frequency pages and setup-only repositories were excluded. No private assessment, leaked interview bank, or applicant submission was used. The fictional movie examples avoid reproducing the original IMDb dataset.
