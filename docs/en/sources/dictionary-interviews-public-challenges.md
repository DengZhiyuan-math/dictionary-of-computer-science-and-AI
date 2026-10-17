# Public company challenge additions

Checked: 2026-10-17. Canonical data: `src/content/dictionary-en/interviews-public-challenges.json`.

This batch contains two historical Cloudflare hiring samples and four LinkedIn Learning educational exercises. `company-sample` describes the provenance of the Cloudflare source assignments; the site's deterministic practice traces cover only specified parts of those larger tasks. `official-practice` does not claim that LinkedIn used a course exercise in hiring. No candidate recollections or third-party company tags are used.

## Primary-source evidence

Cloudflare's [official retrospective](https://blog.cloudflare.com/lessons-from-the-2020-intern-assignment/) identifies the full-stack exercise as a 2020 internship task and directly links the publishing organization. The systems statement is in a sibling repository in that organization. These are historical records, not assertions about the company's current interview process.

LinkedIn Learning's [course repository](https://github.com/LinkedInLearning/cpp-code-challenges-3096958/blob/ac918634ae590f86aee7d9983df1eae2a591eeae/README.md) identifies the course and instructor. Each linked challenge source contains its complete exercise instructions above the function stub. Reading those public files does not require course access.

| Entry ID | Pinned statement | Classification |
| --- | --- | --- |
| `cloudflare-variant-routing` | [Cloudflare full-stack README](https://github.com/cloudflare-internship-2020/internship-application-fullstack/blob/2d8f78217091122ce4897a98bbb49eebe39ddb5d/README.md) | Historical company sample; scoped trace |
| `cloudflare-icmp-probes` | [Cloudflare systems README](https://github.com/cloudflare-internship-2020/internship-application-systems/blob/de7f22f3b1bb0dd09f9046d2df890af3ca3faa2d/README.md) | Historical company sample; scoped trace |
| `linkedin-knight-moves` | [Challenge 6](https://github.com/LinkedInLearning/cpp-code-challenges-3096958/blob/ac918634ae590f86aee7d9983df1eae2a591eeae/src/06/Challenge/ch6_horseplay.cpp) | Official educational practice |
| `linkedin-ipv4-validation` | [Challenge 8](https://github.com/LinkedInLearning/cpp-code-challenges-3096958/blob/ac918634ae590f86aee7d9983df1eae2a591eeae/src/08/Challenge/ch8_ip_address.cpp) | Official educational practice |
| `linkedin-first-related-pair` | [Challenge 11](https://github.com/LinkedInLearning/cpp-code-challenges-3096958/blob/ac918634ae590f86aee7d9983df1eae2a591eeae/src/11/Challenge/ch11_relatives.cpp) | Official educational practice |
| `linkedin-toroidal-life` | [Challenge 13](https://github.com/LinkedInLearning/cpp-code-challenges-3096958/blob/ac918634ae590f86aee7d9983df1eae2a591eeae/src/13/Challenge/ch13_life.cpp) | Official educational practice |

Every question also includes an `additionalSources` reference for the visible detail view and reader: the official retrospective for Cloudflare and the pinned publisher README for LinkedIn Learning.

All six pinned statements were read successfully. The current source revisions were confirmed through GitHub's public commit API before pinning. The practice text uses concise paraphrases, original examples, and original solution explanations. It does not reproduce the full source assignments or course implementations.

## Explicit exercise conventions

The JSON `sourceNote` on every question distinguishes source requirements from local teaching choices. Important additions are injected random draws for deterministic routing examples; a fixed ping event log with an exclusive deadline and final cutoff; sorted knight outputs; strict IPv4 syntax and leading-zero handling; and a case-sensitive, left-to-right surname rule. None of these local conventions is presented as an undocumented hiring requirement.

The ping example is offline accounting. No packets were sent and no latency measurements were taken. The original ICMP assignment also requires CLI, network I/O, and packet handling; the accounting trace does not claim to implement those components. Empty accepted-reply sets have no mean RTT.

Map links reuse existing concepts. Parsing links to network, data structures, and loop invariants. Surname matching links to hashing and canonical keys. The automaton links to in-place marking as a follow-up, while the main solution deliberately uses two grids. All updates read old states before publishing the next generation.

## Independent checks

A standard-library verifier was run with:

```sh
python3 /private/tmp/check-dictionary-public-challenges.py
```

| Check | Independent reference | Cases |
| --- | --- | ---: |
| All published examples | Separate direct implementations | 17 |
| Knight moves | Scan all board destinations and test squared displacement 5 | 64 starting squares |
| IPv4 parsing | Python `ipaddress.IPv4Address` plus malformed text | 2,012 |
| First surname duplicate | Nested scan ordered by completion position | 1,092 surname sequences |
| Toroidal Life | Sparse neighbor-count accumulation versus dense grid scan | 300 states |
| Uniform variant bins | Exact midpoint grids, 100 points per bin | 32 variant counts |

The original example inputs are parsed from the content JSON. The checks include opposite corners, a boundary-crossing blinker, a stable block, a solitary cell, no surname matches, case differences, empty and extra IPv4 fields, Unicode digits, signs, leading zeros, duplicate replies, a reply exactly at the deadline, and no accepted replies. These bounded checks support the examples and state invariants. They do not test external network behavior or establish current hiring practices.
