# Meta algorithm practice: source and correctness review

Checked: 2026-10-17. This batch adds eight public contest problems for interview preparation. Their provenance is **official practice**. No record claims that a specific hiring interview used the problem.

## Source provenance

The [NeurIPS HackerCup AI competition site](https://hackercupai.github.io/) links directly to the [HackerCupAI dataset](https://huggingface.co/datasets/hackercupai/hackercup). Its [dataset card](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/README.md) describes original statements, official samples, and available solution analyses from 2011–2023. The archive is released by the competition organizers. Historical Facebook contest names remain in the source titles; the company filter uses Meta.

The [official NeurIPS 2024 competition listing](https://neurips.cc/Conferences/2024/CompetitionTrack) identifies the Hacker-Cup AI competition and its Meta organizers, and states that historic Hacker Cup problems and solutions will be provided. This establishes the provenance chain from the conference listing to the competition site and its dataset.

The current Meta Careers Coding Puzzles endpoint returned HTTP 429. It was not retried or bypassed, and no inaccessible puzzle or candidate recollection was used.

All content uses archive revision `209283d622e6ee41daa4a889d48f3cd67ebdab01`. Only 32 small statement, analysis, and sample text files were fetched: 35,466 bytes total. Full competition inputs, outputs, parquet files, and images were not downloaded. The site links to each pinned statement. Prompts paraphrase the statement; solution explanations use reviewed mathematical reasoning.

## Included problems

| Question | Original contest | Main technique | Pinned statement and analysis |
| --- | --- | --- | --- |
| `meta-travel-restrictions` | Facebook Hacker Cup 2020, Qualification Round — Travel Restrictions | Directed path reachability | [Statement](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2020/quals/travel_restrictions.md), [analysis](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2020/quals/travel_restrictions_sol.md) |
| `meta-timber` | Facebook Hacker Cup 2020, Qualification Round — Timber | Sparse endpoint dynamic programming | [Statement](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2020/quals/timber.md), [analysis](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2020/quals/timber_sol.md) |
| `meta-consistency-two` | Facebook Hacker Cup 2021, Qualification Round — Consistency, Chapter 2 | All-pairs shortest paths | [Statement](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2021/quals/consistency_ch2.md), [analysis](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2021/quals/consistency_ch2_sol.md) |
| `meta-xs-and-os` | Facebook Hacker Cup 2021, Qualification Round — Xs and Os | Distinct optimal move sets | [Statement](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2021/quals/xs_and_os.md), [analysis](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2021/quals/xs_and_os_sol.md) |
| `meta-weak-typing-two` | Facebook Hacker Cup 2021, Round 1 — Weak Typing, Chapter 2 | Substring contribution counting | [Statement](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2021/round1/weak_typing_ch2.md), [analysis](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2021/round1/weak_typing_ch2_sol.md) |
| `meta-second-second-friend` | Meta Hacker Cup 2022, Qualification Round — Second Second Friend | Graph 2-core peeling | [Statement](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2022/quals/second_second_friend.md), [analysis](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2022/quals/second_second_friend_sol.md) |
| `meta-watering-well-one` | Meta Hacker Cup 2022, Round 1 — Watering Well, Chapter 1 | Squared-distance moments | [Statement](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2022/round1/watering_well_ch1.md), [analysis](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2022/round1/watering_well_ch1_sol.md) |
| `meta-ready-go-two` | Meta Hacker Cup 2023, Round 2 — Ready, Go, Part 2 | Component and liberty aggregation | [Statement](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2023/round2/ready_go_part_2.md), [analysis](https://huggingface.co/datasets/hackercupai/hackercup/blob/209283d622e6ee41daa4a889d48f3cd67ebdab01/2023/round2/ready_go_part_2_sol.md) |

The graph-core problem is **Second Second Friend**, the qualification-round version with rocks. It is distinct from the simpler **Second Friend**. **Ready, Go, Part 2** belongs to **2023 Round 2**. Source bounds and these distinctions were checked against the full statements.

## Knowledge-map additions

- `floyd-warshall`: directed shortest paths with zero diagonal entries and unreachable pairs at infinity. The intermediate vertex must be the outer loop. Consistency uses only unit positive costs; negative-cycle behavior is outside that problem.
- `graph-core-peeling`: repeatedly remove vertices with degree below k. A removed vertex cannot belong to any induced subgraph of minimum degree at least k; the fixed point contains every valid final tree set. The grid problem uses k = 2 and forbids deleting an original tree.
- `squared-distance-moments`: for count N, vector sum S and squared-norm sum Q, the exact identity is Σ||p − t_i||² = N||p||² − 2p·S + Q. Arithmetic must remain exact before modular reduction. The original problem has coordinate bound 3000; the supplied moment solution also avoids enumerating all coordinate pairs.

Existing graph topics cover BFS/DFS, hash tables, dynamic programming, prefix summaries, loop invariants, canonical keys, and complexity. These additions are linked to the closest existing reading chapters rather than claiming those chapters already contain every new derivation.

## Correctness checks

The committed regression check runs with `npm run check:dictionary`. Its algorithm checker, `scripts/check-dictionary-algorithms.mjs`, independently checks all 14 Google/Meta additions, 36 published examples, and 8,548 bounded comparisons without network access. The separate research checks below additionally cover the archived Meta samples.

A temporary standard-library Node verifier at `/private/tmp/check-meta-algorithms-batch2.mjs` checked:

- All **21 authored examples**.
- All **43 official sample cases** for the eight archived problems. Constructive outputs are checked for feasibility, not byte equality to one possible official painting.
- **1,898 independent brute-force comparisons**, using exhaustive tree orientations, direct substring enumeration, exhaustive small-grid tree additions, direct pairwise squared distances, and per-move Go capture simulation.

The deterministic random tests use seed 981365 and are limited to small instances. The arguments in each question establish why the proposed recurrence or counting rule applies; finite testing is additional evidence, not a formal proof for every input. The parent integration run separately checks generated assets, map relations, links, and live rendering.

Important edge cases: a country reaches itself; a single tree is not used in both directions; absent character rules may make a common target impossible; one X placement may win along two lines; F characters retain their original indices; an empty 2-core can be valid without required trees; negative modular residues need normalization; one Go liberty can border several stones and several groups.

## Statement snapshots

Hashes below identify the exact downloaded source text used in this review.

| Statement path | SHA-256 |
| --- | --- |
| `2020/quals/travel_restrictions.md` | `38c371a025475ddca25383257a62fedd6726ac526738a5206976c0a5cd3daa9d` |
| `2020/quals/timber.md` | `b2ad5e13acf9ffc699476ae56f7a1f563f135221ea0166180cd3a949edff22b4` |
| `2021/quals/consistency_ch2.md` | `b6a83d102e190ab305690e1601120b15153aba248497ac1d0527ef8d90deb53f` |
| `2021/quals/xs_and_os.md` | `536e2ed51e24ad9a3ae5aa1b2c854f6db9b3324a2cf29262e815873f4885ac4b` |
| `2021/round1/weak_typing_ch2.md` | `11d0045a46ba9067c61199fc472aaeeb4a04144ebd9efc339e48b9b947278c52` |
| `2022/quals/second_second_friend.md` | `d3d951a5b996b6d539ee44cc8c2d8cfbb81dbaedc226ff7a97dfa64d5afd504d` |
| `2022/round1/watering_well_ch1.md` | `366773e1ad1f5d97585275342d548a4891f14e93f2cf30780ab18e64198899dc` |
| `2023/round2/ready_go_part_2.md` | `233dc6d428d3d3a1feb23c0b8d6a74a16398cfed79c8abee27edc4a7d463d6be` |
