# Apple preparation: source evidence and validation

Checked: 2026-10-17. Canonical data: `src/content/dictionary-en/interviews-apple.json`.

This batch contains four original `documentation-derived` exercises and 16 worked examples. Targeted searches of Apple careers and developer publications did not identify an official public hiring-question statement suitable for this batch. That search result does not establish that no such statement exists. No candidate recollections, third-party company tags, or App Store listings are used as Apple hiring evidence.

The `company` label identifies the organization publishing the technical source. Every question explicitly distinguishes the original exercise from an Apple interview claim. The data, reasoning, complexity models, and deterministic traces are independently authored.

## Primary-source ledger

| Exercise | Primary evidence | What the source establishes | Local scope and assumptions |
| --- | --- | --- | --- |
| `apple-snapshot-minimum-moves` | [NSDiffableDataSourceSnapshot](https://developer.apple.com/documentation/uikit/nsdiffabledatasourcesnapshot-swift.struct) | Snapshots describe ordered sections and items with unique hashable identifiers. | A single-section permutation with identical identifier sets; a move removes and reinserts one identifier. The minimum-move theorem is an independent algorithmic result, not a UIKit implementation or animation guarantee. |
| `apple-actor-single-flight` | [WWDC21: Protect mutable state with Swift actors](https://developer.apple.com/videos/play/wwdc2021/10133/) | The image-downloader discussion explains reentrancy across suspension. Its 11:59 associated code registers an in-progress task, shares it with later callers, and clears a failed task. | Fixed request/completion/failure events; one completion owner; no invalidation, cancellation, or replacement generations. Networking is simulated, not performed. |
| `apple-grapheme-byte-budget` | [Swift String](https://developer.apple.com/documentation/swift/string) | Swift `Character` uses extended grapheme clusters; Unicode scalar and UTF-8 views have different element units. | A maximum UTF-8 byte budget; longest original prefix at a cluster boundary; preserve the original scalar sequence without normalization. |
| `apple-combine-demand` | [PassthroughSubject](https://developer.apple.com/documentation/combine/passthroughsubject), [Processing Published Elements with Subscribers](https://developer.apple.com/documentation/combine/processing-published-elements-with-subscribers) | A passthrough subject drops unrequested values. Both subscription requests and demand returned by `receive(_:)` add credit; each delivery consumes one. | One direct subscriber, finite credit, sequential nonreentrant events, no buffer, completion, or cancellation. The specified callback demand applies only when the callback runs. |

The API documentation pages expose official Markdown alternatives at their `.md` URLs. These were read directly when the HTML text endpoint returned only its JavaScript notice. The WWDC transcript and associated code were also read; no video execution or Swift compilation is claimed.

## Reasoning and independent checks

- **Snapshot moves:** Breadth-first search over the remove-and-reinsert operation found exact shortest distances for every permutation of sizes zero through seven: 5,914 states in total. Each distance matched `n - LIS_length`. The lower bound follows because unmoved items form a common subsequence; keeping a longest such subsequence and inserting every other item attains the bound. The main example has the explicit two-move witness given in the answer. Empty and unchanged orders are included. Duplicate identifiers and unequal sets are rejected by contract; they are outside the permutation theorem.
- **Actor cache:** A separate job-list simulation reproduced all three examples, including two joined requests, shared failure and retry, cached success, and independent keys completing in reverse order. These checks validate the local event model. They do not test real scheduling or external networking.
- **Unicode prefix:** Enumerating all cluster-boundary prefixes with Node's `Intl.Segmenter` (Unicode 17.0) and measuring each prefix's UTF-8 bytes reproduced all six outputs. The selected examples use stable cluster cases: a regional-indicator flag, a combining accent, a precomposed accent, and a single emoji. The first string's byte lengths are `[1,8,3,4,1]`. Node's library is a check on these examples, not a claim that all Swift and Node Unicode versions behave identically.
- **Combine demand:** A queue of individual credit tokens independently reproduced the three examples. It confirms additive requests, callback replenishment, consumption before replenishment, and the absence of callback credit for a dropped send. The invariant counts only actual deliveries.

Complexities state their input units and exclude network latency and payload copying. The Unicode scan assumes linear segmentation; variable-width characters invalidate constant-time indexing assumptions. The actor bookkeeping includes pending waiters and retained output. The Combine model assumes credit sums fit a fixed-width integer.

## Map links

The snapshot exercise links to LIS tails, binary-search bounds, hashing, and loop invariants, with a direct background link to chapter 102. Actor caching links to concurrency, caching, hashing, and invariants. The byte-budget exercise links to the `unicode-graphemes` concept. The demand exercise links to `backpressure`. The integration owner maintains those two concept definitions and all generated reader/map artifacts.
