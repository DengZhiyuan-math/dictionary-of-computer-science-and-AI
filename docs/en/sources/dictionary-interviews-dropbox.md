# Dropbox: public technical preparation sources

Reviewed: 2026-10-17. All questions and explanations are in English.

This batch contains three **documentation-derived** exercises. They are original preparation problems with explicit contracts and checkable examples. No source establishes that Dropbox asks these questions in hiring interviews.

## Evidence ledger

| Exercise | First-party evidence | What the source establishes | Local teaching contract |
| --- | --- | --- | --- |
| `dropbox-streaming-content-hash` | [Dropbox API Content Hash](https://docs.dropboxapi.com/dropbox-api/docs/technical-reference/content-hash), linked from the [legacy Dropbox developer URL](https://www.dropbox.com/developers/reference/content-hash); [Dropbox's Python implementation at commit 618ff9ea7f58185ac7c0c321ce2a5c3ac41271a1](https://github.com/dropbox/dropbox-api-content-hasher/blob/618ff9ea7f58185ac7c0c321ce2a5c3ac41271a1/python/dropbox_content_hasher.py) | Fixed 4,194,304-byte file blocks; inner SHA-256 digests combined as binary bytes; final outer SHA-256; no empty block; reference implementation accepts arbitrary read sizes. | Compact hex/repeat read chunks, output fixtures, invariant proof, constant-state implementation question, and ordered parallel-hashing follow-up. |
| `dropbox-cursor-file-replay` | [Dropbox API List Folder](https://docs.dropboxapi.com/dropbox-api/api-reference/user-endpoints/files/list-folder); [Dropbox Detecting Changes](https://docs.dropboxapi.com/dropbox-api/docs/detecting-changes) | Recursive entries must be replayed in order. File replacement removes children; folder replacement preserves children; deletion removes a subtree. Returned cursors support continuation and changes, and the latest cursor must be saved even for empty pages. | A file-only cache, canonical ASCII paths, revision tokens, compact events, folder-parent precondition, per-page atomic local checkpoint, and a simulated pre-commit crash. |
| `dropbox-pattern-segmentation` | [Dropbox Tech: zxcvbn, 2012](https://dropbox.tech/security/zxcvbn-realistic-password-strength-estimation), sections “The model” and “Minimum entropy search” | Historical design detects overlapping candidate patterns and searches for a least-cost non-overlapping explanation with brute-force gaps using prefix dynamic programming. The post itself points to a later 2016 paper. | Supplied half-open intervals and artificial integer costs; return only the numeric optimum; bucket intervals by ending position to avoid scanning all matches for every prefix. No claim about current zxcvbn scoring or real password strength. |

The first-party content-hash documentation links to the `dropbox/dropbox-api-content-hasher` repository, establishing the repository's relevance and ownership. The inspected HEAD is pinned above. The legacy developer links redirect to the current `docs.dropboxapi.com` documentation, so the questions use the final documentation URLs.

The distinction between the historical additive example and later zxcvbn is verified against [Dropbox's scoring source at commit 67c4ece9efc40c9d0a1d7d995b2b22a91be500c2](https://github.com/dropbox/zxcvbn/blob/67c4ece9efc40c9d0a1d7d995b2b22a91be500c2/src/scoring.coffee). Its sequence state tracks the number of matches, and its objective combines a product of guesses with sequence-length terms. The supplied-cost exercise does not implement that objective; the follow-up asks what additional state such a scoring rule requires.

## Historical hiring challenge boundary

The historical `https://www.dropbox.com/jobs/challenges` URL now redirects to the Dropbox jobs homepage. Search results contain third-party copies or discussions of old challenges such as rectangle packing and “Dropbox Diet.” Those copies were not used to reconstruct a hiring statement or label a question as an official sample. A historical first-party statement was not recovered in this pass. This is a source limitation, not a claim that Dropbox never published such challenges.

## Contracts and independent verification

### Streaming content hash

The expanded bytes are the concatenation of each decoded hex string repeated `repeat` times. `repeat=0` contributes no bytes. Empty chunks do not create a file block. The five examples cover an empty file, one partial block, equivalent read chunkings, an exact full block, and a read crossing the block boundary. The compact cases expand to at most 4,194,305 bytes.

Expected digests were computed independently with Python's standard-library `hashlib`: partition the full byte sequence at fixed file-block boundaries, hash each partition, concatenate binary digests, then hash once more. A streaming implementation was separately compared with this materialized oracle at boundary lengths and with varying read chunk sizes. All 55 comparisons passed, including the five displayed fixtures, lengths B-1/B/B+1, two-block boundaries, and empty reads. No network operation is part of these tests.

### Cursor file replay

File events delete the exact cached file and all component descendants, then store their revision. Folder events delete only an exact cached file; the cache does not retain folder records. Delete events remove equality and slash-delimited descendants. Inputs have folder-valued parents for upserts. Revisions and cursors are opaque. Object key order has no semantic significance.

Each page is staged independently. A true `commit` publishes its complete file map and cursor together, even when the page has no entries. A false `commit` discards its staged changes and terminates the trace; later supplied pages are not processed. The examples cover sibling-prefix safety, replacing a folder with a file and back, rollback after an earlier successful page, folder-child preservation, empty-page checkpointing, and replay of the same replacement page. Independent checks compare map scanning with a path-component trie oracle, including injected crash locations. All five displayed fixtures and 5,000 generated traces passed.

This metadata exercise deliberately excludes cursor expiration/reset, sharing fields, external file downloads, and concurrent writers. Atomic publication is an explicit local design assumption, not a Dropbox API transaction guarantee.

### Pattern segmentation

Intervals are half-open and nonempty. All costs are artificial nonnegative integers. A complete solution can choose no matches and pay only fallback costs. Duplicate intervals do not force selection. Non-overlap permits equal adjacent endpoints. Empty length with no matches costs zero.

The five examples include a greedy trap, uncovered gaps at both ends, zero-cost adjacent matches, duplicate overpriced matches, and an empty input. Prefix-DP results were compared with exhaustive subsets of the supplied intervals on bounded generated instances; subsets containing overlaps are discarded and uncovered positions pay the fallback cost. All five displayed fixtures and 5,000 generated cases passed, including zero fallback costs. The source's historical model motivates the exercise, while the example scores and endpoint convention are local.

## Map integration

The questions reuse loop invariants, complexity analysis, hash tables, tries, transactions, idempotency, graph algorithms, weighted intervals, and dynamic programming. `cryptographic-hash` is the proposed new concept: a fixed-size cryptographic digest, streaming composition, and the distinction between content checksums, authentication, and ordinary hash-table hashing. The root integration task owns that concept definition and generated map/reader updates.
