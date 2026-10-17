import assert from 'node:assert/strict';
import fs from 'node:fs';
import {fileURLToPath} from 'node:url';

// Independent teaching models: no database, Redis, HTTP, Python or GPU runtime.
// Their assumptions are stated in the source note and in the question records.
const questions = JSON.parse(fs.readFileSync(fileURLToPath(new URL('../data/english/interviews-original.json', import.meta.url)), 'utf8'));
const ids = ['eng', 'ai'].flatMap(prefix => Array.from({length: 9}, (_, i) => `${prefix}-${String(i + 1).padStart(2, '0')}`));
let checks = 0;
const equal = (actual, expected, label) => { checks++; assert.deepEqual(actual, expected, label); };
const close = (actual, expected, label, epsilon = 1e-9) => {
  checks++;
  assert(Number.isFinite(actual) && Math.abs(actual - expected) <= epsilon * Math.max(1, Math.abs(expected)), `${label}: ${actual} != ${expected}`);
};
const mean = values => values.reduce((a, b) => a + b, 0) / values.length;
const text = (id, fields = ['prompt', 'answer', 'approach', 'pitfalls', 'complexity', 'followUp', 'followUpAnswer']) => {
  const question = questions.find(q => q.id === id);
  assert(question, `Missing original question ${id}`);
  // Inline-code delimiters change presentation, not the documented contract.
  return fields.map(field => typeof question[field] === 'string' ? question[field] : JSON.stringify(question[field])).join('\n').replaceAll('`', '');
};
const contains = (id, pattern, label) => { checks++; assert(pattern.test(text(id)), `${id}: ${label}`); };
for (const id of ids) {
  const question = questions.find(q => q.id === id);
  assert(question, `Missing original question ${id}`);
  equal(question.examples.length, 1, `${id}: retain the original worked example`);
  assert(typeof question.followUpAnswer === 'string' && question.followUpAnswer.trim(), `${id}: missing answered follow-up`);
  assert(!/\p{Script=Han}/u.test(JSON.stringify(question)), `${id}: untranslated prose`);
}

// eng-01: reservation and order insertion are one atomic state transition.
function bookstore(initialStock, attempts, callbacks) {
  let stock = initialStock;
  const orders = new Map();
  for (const id of attempts) {
    if (orders.has(id) || stock === 0) continue;
    stock--;
    orders.set(id, {paid: false, shipment: false});
  }
  for (const id of callbacks) {
    const order = orders.get(id);
    if (!order) continue;
    order.paid = true;
    order.shipment = true; // One durable fulfillment marker per order.
  }
  return {stock, orders: orders.size, shipments: [...orders.values()].filter(o => o.shipment).length};
}
const bookstoreResult = bookstore(1, ['A', 'B'], ['A', 'A', 'B']);
equal(bookstoreResult, {stock: 0, orders: 1, shipments: 1}, 'eng-01 worked trace');
for (let stock = 0; stock <= 3; stock++) for (let count = 1; count <= 4; count++) {
  const attempts = Array.from({length: count}, (_, i) => String(i));
  for (const sequence of [attempts, attempts.toReversed()]) {
    const result = bookstore(stock, [...sequence, ...sequence], [...attempts, ...attempts]);
    equal(result.stock, Math.max(0, stock - count), 'stock invariant');
    equal(result.orders, Math.min(stock, count), 'no oversell');
    equal(result.shipments, result.orders, 'idempotent fulfillment marker');
  }
}

// eng-02: only commits preceding the statement snapshot are visible.
const readCommitted = (history, started) => history.filter(row => row.committed <= started).at(-1).value;
const balanceHistory = [{committed: 0, value: 10}, {committed: 2, value: 15}];
const readResults = [readCommitted(balanceHistory, 1), readCommitted(balanceHistory, 3)];
equal(readResults, [10, 15], 'eng-02 worked trace');
for (let before = -4; before <= 4; before++) for (let after = -4; after <= 4; after++) {
  const history = [{committed: 0, value: before}, {committed: 2, value: after}];
  equal(readCommitted(history, 1), before, 'a future commit is invisible');
  equal(readCommitted(history, 3), after, 'next statement sees committed value');
}

// eng-03: compare a bounded tenant segment with a full predicate scan.
const indexKeys = [[1, 10], [1, 20], [2, 10], [2, 30]];
function indexedRange(keys, tenant, time) {
  let lo = 0, hi = keys.length;
  while (lo < hi) {
    const mid = (lo + hi) >>> 1;
    const key = keys[mid];
    if (key[0] < tenant || (key[0] === tenant && key[1] < time)) lo = mid + 1;
    else hi = mid;
  }
  const found = [];
  while (lo < keys.length && keys[lo][0] === tenant) found.push(keys[lo++]);
  return found;
}
const rangeResult = indexedRange(indexKeys, 2, 20);
equal(rangeResult, [[2, 30]], 'eng-03 worked query');
const largerKeys = Array.from({length: 4}, (_, tenant) => Array.from({length: 8}, (_, time) => [tenant, time])).flat();
for (let tenant = -1; tenant <= 4; tenant++) for (let time = -1; time <= 8; time++) equal(indexedRange(largerKeys, tenant, time), largerKeys.filter(k => k[0] === tenant && k[1] >= time), 'index result vs full scan');

// eng-04: Kahn elimination is independent of a transitive-closure cycle oracle.
function hasCycle(edges, size) {
  const indegrees = Array(size).fill(0), successors = Array.from({length: size}, () => []);
  for (const [from, to] of edges) { successors[from].push(to); indegrees[to]++; }
  const ready = indegrees.flatMap((n, i) => n === 0 ? [i] : []);
  let removed = 0;
  for (let i = 0; i < ready.length; i++) {
    removed++;
    for (const next of successors[ready[i]]) if (--indegrees[next] === 0) ready.push(next);
  }
  return removed !== size;
}
equal(hasCycle([[0, 1], [1, 0]], 2), true, 'eng-04 wait-for cycle');
equal(hasCycle([[0, 1]], 2), false, 'aborting one participant breaks the cycle');
for (let mask = 0; mask < 1 << 9; mask++) {
  const edges = [], reach = Array.from({length: 3}, () => Array(3).fill(false));
  for (let from = 0; from < 3; from++) for (let to = 0; to < 3; to++) if (mask & (1 << (3 * from + to))) { edges.push([from, to]); reach[from][to] = true; }
  for (let via = 0; via < 3; via++) for (let from = 0; from < 3; from++) for (let to = 0; to < 3; to++) reach[from][to] ||= reach[from][via] && reach[via][to];
  equal(hasCycle(edges, 3), reach.some((row, i) => row[i]), 'cycle algorithms agree');
}

// eng-05: scoped key, normalized request identity and order/result commit together.
function idempotentOrders(requests) {
  const stored = new Map(), results = [];
  let nextOrder = 42;
  for (const {scope, key, price} of requests) {
    const id = JSON.stringify([scope, key]);
    const previous = stored.get(id);
    if (previous && previous.price !== price) { results.push('conflict'); continue; }
    if (!previous) stored.set(id, {price, order: nextOrder++});
    results.push(stored.get(id).order);
  }
  return {orders: stored.size, results};
}
const orderResult = idempotentOrders([{scope: 'user', key: 'K', price: 20}, {scope: 'user', key: 'K', price: 20}]);
equal(orderResult, {orders: 1, results: [42, 42]}, 'eng-05 worked replay');
for (let repeats = 1; repeats <= 8; repeats++) {
  const requests = Array.from({length: repeats}, () => ({scope: 'u1', key: 'K', price: 20}));
  equal(idempotentOrders(requests).results, Array(repeats).fill(42), 'all replays share a durable result');
  equal(idempotentOrders([...requests, {scope: 'u1', key: 'K', price: 21}]).results.at(-1), 'conflict', 'same key and changed request');
  equal(idempotentOrders([...requests, {scope: 'u2', key: 'K', price: 20}]).orders, 2, 'key scope matters');
}

// eng-06: a 304 validates stored content; it is not another representation body.
function cacheRead({directive, currentAge = 0, maxAge = 0, validationStatus = 304}) {
  if (directive === 'no-store') return {stored: false, network: true, body: 'download'};
  const validate = directive === 'no-cache' || currentAge >= maxAge;
  return {stored: true, network: validate, body: validate && validationStatus !== 304 ? 'download' : 'V1'};
}
const cacheResult = cacheRead({directive: 'no-cache'});
equal(cacheResult, {stored: true, network: true, body: 'V1'}, 'eng-06 successful validation');
equal(cacheRead({directive: 'no-store'}).stored, false, 'no-store cannot retain the response');
equal(cacheRead({directive: 'max-age', currentAge: 5, maxAge: 10}).network, false, 'fresh cache reuse');
equal(cacheRead({directive: 'max-age', currentAge: 10, maxAge: 10}).network, true, 'freshness requires age below lifetime');
equal(cacheRead({directive: 'no-cache', currentAge: 0, maxAge: 100, validationStatus: 200}).body, 'download', 'changed representation needs new body');

// eng-07: notification makes a waiter runnable, but does not allocate queue items.
function consumersAfterNotify(order, itemCount) {
  const queue = Array.from({length: itemCount}, (_, i) => i), outcomes = {};
  for (const consumer of order) outcomes[consumer] = queue.length ? ['consumed', queue.shift()] : ['wait'];
  return outcomes;
}
const consumerResult = consumersAfterNotify(['C1', 'C2'], 1);
equal(consumerResult, {C1: ['consumed', 0], C2: ['wait']}, 'eng-07 worked interleaving');
for (const order of [['C1', 'C2'], ['C2', 'C1']]) for (let items = 0; items <= 3; items++) equal(Object.values(consumersAfterNotify(order, items)).filter(v => v[0] === 'consumed').length, Math.min(items, 2), 'predicate loop consumes available items only');

// eng-08: enumerate a nested invocation tree, then compare with a product bound.
function leafAttempts(attempts, layer = 0) {
  if (layer === attempts.length) return 1;
  let leaves = 0;
  for (let attempt = 0; attempt < attempts[layer]; attempt++) leaves += leafAttempts(attempts, layer + 1);
  return leaves;
}
const retryResult = 100 * leafAttempts([3, 3, 3]);
equal(retryResult, 2700, 'eng-08 worst-case attempts');
for (let a = 1; a <= 4; a++) for (let b = 1; b <= 4; b++) for (let c = 1; c <= 4; c++) equal(leafAttempts([a, b, c]), a * b * c, 'nested attempts multiply');

// eng-09: TTL state changes are modeled at explicit times, not wall-clock sleeps.
function redisSet(old, value, now, options = {}) {
  const present = old && (old.expires === null || old.expires > now);
  const expires = options.ex !== undefined ? now + options.ex : options.keepTTL && present ? old.expires : null;
  return {value, expires};
}
function redisTTL(state, now) {
  if (!state || (state.expires !== null && state.expires <= now)) return -2;
  return state.expires === null ? -1 : Math.floor(state.expires - now);
}
const firstSet = redisSet(null, 'A', 0, {ex: 60});
const secondSet = redisSet(firstSet, 'B', 1);
equal([secondSet.value, redisTTL(secondSet, 1)], ['B', -1], 'eng-09 ordinary SET clears expiry');
equal(redisTTL(redisSet(firstSet, 'B', 1, {keepTTL: true}), 1), 59, 'KEEPTTL preserves expiry');
equal(redisTTL(redisSet(firstSet, 'B', 1, {ex: 60}), 1), 60, 'EX replaces expiry');
equal(redisTTL(firstSet, 60), -2, 'expired key is missing');
equal(redisTTL(redisSet(firstSet, 'B', 61, {keepTTL: true}), 61), -1, 'no old TTL exists after expiry');

// ai-01: stable scalar BCE and finite-difference derivative.
const sigmoid = z => z >= 0 ? 1 / (1 + Math.exp(-z)) : Math.exp(z) / (1 + Math.exp(z));
const bce = (z, y) => Math.max(z, 0) - y * z + Math.log1p(Math.exp(-Math.abs(z)));
const bceResult = {loss: bce(0, 1), gradient: sigmoid(0) - 1};
close(bceResult.loss, Math.log(2), 'ai-01 worked loss');
close(bceResult.gradient, -0.5, 'ai-01 worked gradient');
for (const y of [0, 1]) for (const z of [-1000, -100, -10, -2, 0, 2, 10, 100, 1000]) {
  assert(Number.isFinite(bce(z, y)), 'stable BCE handles extreme finite logits'); checks++;
  if (Math.abs(z) <= 10) {
    const h = 1e-5;
    close((bce(z + h, y) - bce(z - h, y)) / (2 * h), sigmoid(z) - y, 'BCE numerical derivative', 1e-7);
  }
}

// ai-02: stable CE compared with direct softmax on bounded logits.
const softmax = logits => {
  const max = Math.max(...logits), exps = logits.map(z => Math.exp(z - max)), total = exps.reduce((a, b) => a + b, 0);
  return exps.map(z => z / total);
};
const crossEntropy = (logits, target) => {
  const max = Math.max(...logits);
  return max - logits[target] + Math.log(logits.reduce((sum, z) => sum + Math.exp(z - max), 0));
};
const ceResult = crossEntropy([0, 0, 0], 2);
close(ceResult, Math.log(3), 'ai-02 worked loss');
for (const a of [-4, 0, 3]) for (const b of [-4, 0, 3]) for (const c of [-4, 0, 3]) for (let target = 0; target < 3; target++) {
  const logits = [a, b, c];
  close(crossEntropy(logits, target), -Math.log(softmax(logits)[target]), 'CE vs probability formula');
  close(crossEntropy(logits.map(z => z + 1000), target), crossEntropy(logits, target), 'CE shift invariance');
}

// ai-03: compare accumulation weights with flattening the actual per-example list.
const accumulatedMean = groups => groups.reduce((sum, group) => sum + group.length * mean(group), 0) / groups.reduce((n, group) => n + group.length, 0);
const accumulationResult = accumulatedMean([[3, 3], [9]]);
equal(accumulationResult, 5, 'ai-03 worked mean gradient');
equal(mean([3, 9]), 6, 'unweighted microbatch means differ');
for (let n = 2; n <= 7; n++) for (let mask = 0; mask < 1 << n; mask++) for (let split = 1; split < n; split++) {
  const values = Array.from({length: n}, (_, i) => mask & (1 << i) ? 9 : -3);
  close(accumulatedMean([values.slice(0, split), values.slice(split)]), mean(values), 'accumulation vs full example mean');
}

// ai-04: enumerate all Bernoulli masks and their probabilities, not random draws.
const dropout = (values, retained, p, training) => training ? values.map((x, i) => p === 1 ? 0 : x * retained[i] / (1 - p)) : [...values];
const dropoutResult = {training: dropout([2, 2], [1, 0], 0.5, true), evaluation: dropout([2, 2], [1, 0], 0.5, false)};
equal(dropoutResult, {training: [4, 0], evaluation: [2, 2]}, 'ai-04 worked mask');
for (const p of [0, 0.25, 0.5, 0.75, 0.9]) {
  const values = [2, -3, 0], expectations = [0, 0, 0];
  let totalProbability = 0;
  for (let mask = 0; mask < 8; mask++) {
    const retained = Array.from({length: 3}, (_, i) => Number(Boolean(mask & (1 << i))));
    const probability = retained.reduce((product, bit) => product * (bit ? 1 - p : p), 1);
    const output = dropout(values, retained, p, true);
    totalProbability += probability;
    output.forEach((value, i) => { expectations[i] += probability * value; });
  }
  close(totalProbability, 1, 'mask probabilities sum to one');
  expectations.forEach((value, i) => close(value, values[i], 'inverted dropout preserves expectation'));
}
equal(dropout([2, -3], [1, 1], 1, true), [0, 0], 'p=1 is an explicit all-zero case');

// ai-05: compare masked-score softmax with normalization over only visible keys.
function attention(scores, visible, values) {
  assert(visible.some(Boolean), 'the exercise excludes fully masked rows');
  const weights = softmax(scores.map((z, i) => visible[i] ? z : -Infinity));
  return {weights, value: weights.reduce((sum, w, i) => sum + w * values[i], 0)};
}
const attentionResult = attention([0, 0, 0], [true, true, false], [2, 6, 100]);
equal(attentionResult, {weights: [0.5, 0.5, 0], value: 4}, 'ai-05 worked masked attention');
close((2 + 6) / 3, 8 / 3, 'post-softmax mask loses normalization');
for (let n = 1; n <= 4; n++) for (let code = 0; code < 3 ** n; code++) for (let mask = 1; mask < 1 << n; mask++) {
  const scores = Array.from({length: n}, (_, i) => [-2, 0, 2][Math.floor(code / 3 ** i) % 3]);
  const visible = Array.from({length: n}, (_, i) => Boolean(mask & (1 << i)));
  const values = Array.from({length: n}, (_, i) => i * 3 - 2);
  const selected = scores.flatMap((score, i) => visible[i] ? [{score, value: values[i]}] : []);
  const numerator = selected.reduce((sum, item) => sum + Math.exp(item.score) * item.value, 0);
  const denominator = selected.reduce((sum, item) => sum + Math.exp(item.score), 0);
  const result = attention(scores, visible, values);
  close(result.value, numerator / denominator, 'masked attention vs visible-only normalization');
  close(result.weights.reduce((a, b) => a + b, 0), 1, 'visible weights sum to one');
}

// ai-06: use integers for bytes and count K/V per layer independently.
const kvSize = ({layers, batch, kvHeads, length, headDim, bytesPerElement}) => {
  const elements = 2n * BigInt(layers) * BigInt(batch) * BigInt(kvHeads) * BigInt(length) * BigInt(headDim);
  return {elements, bytes: elements * BigInt(bytesPerElement)};
};
const kvResult = kvSize({layers: 2, batch: 1, kvHeads: 2, length: 4, headDim: 8, bytesPerElement: 2});
equal(kvResult, {elements: 256n, bytes: 512n}, 'ai-06 worked KV size');
for (const layers of [1, 3]) for (const batch of [1, 2]) for (const kvHeads of [1, 4]) for (const length of [0, 1, 7]) for (const headDim of [2, 8]) for (const bytesPerElement of [1, 2, 4]) {
  const result = kvSize({layers, batch, kvHeads, length, headDim, bytesPerElement});
  let counted = 0n;
  for (let layer = 0; layer < layers; layer++) for (let b = 0; b < batch; b++) for (let head = 0; head < kvHeads; head++) for (let token = 0; token < length; token++) counted += BigInt(2 * headDim);
  equal(result.elements, counted, 'KV formula vs layer/head count');
  equal(result.bytes, counted * BigInt(bytesPerElement), 'KV dtype byte factor');
}
equal(2n ** 30n, 1073741824n, 'GiB conversion denominator');

// ai-07: fit on the training subset, then transform test data without refitting.
const trainingMean = mean([0, 2]), leakyMean = mean([0, 2, 100]);
const leakageResult = {trainingMean, testCentered: 100 - trainingMean, leakyMean, leakyTestCentered: 100 - leakyMean};
equal(leakageResult, {trainingMean: 1, testCentered: 99, leakyMean: 34, leakyTestCentered: 66}, 'ai-07 worked centering');
for (const testValue of [-100, 0, 100]) {
  equal(mean([0, 2]), 1, 'training fit is independent of test feature');
  close(mean([0, 2, testValue]), (2 + testValue) / 3, 'leaky fit changes with test feature');
}

// ai-08: compare the count formula with harmonic precision/recall.
function binaryF1(labels, scores, threshold) {
  let tp = 0, fp = 0, fn = 0;
  labels.forEach((y, i) => {
    const predicted = scores[i] >= threshold;
    if (predicted && y) tp++;
    if (predicted && !y) fp++;
    if (!predicted && y) fn++;
  });
  const denominator = 2 * tp + fp + fn;
  return {tp, fp, fn, value: denominator ? 2 * tp / denominator : 0};
}
const labels = [1, 0, 1, 0], scores = [0.9, 0.8, 0.6, 0.1];
const f1Result = [binaryF1(labels, scores, 0.7).value, binaryF1(labels, scores, 0.5).value];
equal(f1Result, [0.5, 0.8], 'ai-08 worked F1');
close(binaryF1(labels, scores, 0).value, 2 / 3, 'F1 can fall as threshold decreases');
for (let n = 1; n <= 6; n++) for (let mask = 0; mask < 1 << n; mask++) for (const threshold of [0, 0.25, 0.5, 0.75, 1]) {
  const truth = Array.from({length: n}, (_, i) => Number(Boolean(mask & (1 << i))));
  const probabilities = Array.from({length: n}, (_, i) => (i % 4) / 4);
  const {tp, fp, fn, value} = binaryF1(truth, probabilities, threshold);
  const precision = tp + fp ? tp / (tp + fp) : 0, recall = tp + fn ? tp / (tp + fn) : 0;
  close(value, precision + recall ? 2 * precision * recall / (precision + recall) : 0, 'F1 count vs harmonic mean');
}

// ai-09: AUC is a pairwise ranking statistic; ties receive half credit.
function pairwiseAuc(labels, probabilities) {
  const positive = probabilities.filter((_, i) => labels[i] === 1), negative = probabilities.filter((_, i) => labels[i] === 0);
  assert(positive.length && negative.length, 'ROC AUC needs both classes');
  let credit = 0;
  for (const p of positive) for (const n of negative) credit += p > n ? 1 : p === n ? 0.5 : 0;
  return credit / (positive.length * negative.length);
}
function rankAuc(labels, probabilities) {
  const rows = probabilities.map((score, i) => ({score, label: labels[i]})).sort((a, b) => a.score - b.score);
  let positiveRanks = 0, positives = 0;
  for (let start = 0; start < rows.length;) {
    let end = start + 1;
    while (end < rows.length && rows[end].score === rows[start].score) end++;
    const averageRank = (start + 1 + end) / 2;
    for (let i = start; i < end; i++) if (rows[i].label) { positiveRanks += averageRank; positives++; }
    start = end;
  }
  return (positiveRanks - positives * (positives + 1) / 2) / (positives * (rows.length - positives));
}
const calibrationLabels = [1, 1, 0, 0], calibrationProbabilities = [0.9, 0.8, 0.7, 0.6];
const calibrationResult = {auc: pairwiseAuc(calibrationLabels, calibrationProbabilities), meanProbability: mean(calibrationProbabilities), positiveFraction: mean(calibrationLabels), gap: mean(calibrationProbabilities) - mean(calibrationLabels)};
close(calibrationResult.auc, 1, 'ai-09 worked AUC');
close(calibrationResult.meanProbability, 0.75, 'ai-09 mean probability');
close(calibrationResult.positiveFraction, 0.5, 'ai-09 positive fraction');
close(calibrationResult.gap, 0.25, 'ai-09 empirical aggregate gap');
for (let n = 2; n <= 6; n++) for (let mask = 1; mask < (1 << n) - 1; mask++) {
  const truth = Array.from({length: n}, (_, i) => Number(Boolean(mask & (1 << i))));
  const probabilities = Array.from({length: n}, (_, i) => (i % 3 + 1) / 4);
  close(pairwiseAuc(truth, probabilities), rankAuc(truth, probabilities), 'pairwise vs sorted-rank AUC');
  close(pairwiseAuc(truth, probabilities.map(p => p * p)), pairwiseAuc(truth, probabilities), 'strictly increasing transformation preserves AUC');
}

// A nontrivial binary-unit case catches byte/GB/GiB and GQA head-count mistakes.
const largeKv = kvSize({layers: 32, batch: 1, kvHeads: 8, length: 4096, headDim: 128, bytesPerElement: 2});
equal(largeKv.bytes, 536870912n, 'dense FP16 GQA cache byte count');
close(Number(largeKv.bytes) / 2 ** 30, 0.5, 'binary GiB conversion');
equal(kvSize({layers: 32, batch: 1, kvHeads: 32, length: 4096, headDim: 128, bytesPerElement: 2}).bytes / largeKv.bytes, 4n, 'using query heads would overestimate this GQA cache fourfold');

// Bind the independent results to every actual translated worked example.
// Narrative state examples remain prose: check the asserted effect and the
// numerical assumptions, then use the state traces above as the explicit model.
const example = id => questions.find(q => q.id === id).examples[0];
const matches = (value, regex, label) => { checks++; assert(regex.test((typeof value === 'string' ? value : JSON.stringify(value)).replaceAll('`', '')), label); };
function numeric(actual, expected, label) {
  if (typeof expected === 'number') { close(actual, expected, label); return; }
  equal(Object.keys(actual), Object.keys(expected), `${label}: result fields`);
  for (const key of Object.keys(expected)) numeric(actual[key], expected[key], `${label}.${key}`);
}
let ex = example('eng-01');
matches(ex.input, /stock\s*=\s*1/i, 'eng-01: one available copy');
matches(ex.input, /two customers/i, 'eng-01: two concurrent customers');
matches(ex.output, /at most one copy.*replaying.*does not create a second fulfillment/i, 'eng-01: published stock and replay effects');
equal([bookstoreResult.orders, bookstoreResult.shipments], [1, 1], 'eng-01: independent state effect');
contains('eng-01', /same database transaction/i, 'atomic reservation and order creation');
contains('eng-01', /downstream fulfillment idempotent/i, 'external delivery needs its own idempotency');

ex = example('eng-02');
matches(ex.input, /balance\s*=\s*10.*15 and commits.*another ordinary SELECT/i, 'eng-02: snapshot ordering');
equal(ex.output, readResults, 'eng-02: published reads');
contains('eng-02', /statement.*snapshot|snapshot.*statement/i, 'statement snapshot scope');

ex = example('eng-03');
equal(ex.output, indexedRange(ex.input.sortedKeys, ex.input.tenant, ex.input.minimumTime), 'eng-03: published range output');
contains('eng-03', /skip scan/i, 'missing-leading-column caveat');

ex = example('eng-04');
matches(ex.input, /T1 first locks account 2.*T2 first locks account 5.*T1 then requests 5.*T2 then requests 2/i, 'eng-04: reverse lock order');
matches(ex.output, /aborts one transaction.*other can continue/i, 'eng-04: published resolution');
equal(hasCycle([[0, 1], [1, 0]], 2), true, 'eng-04: published timeline has cycle');
contains('eng-04', /victim.*unspecified|do not rely on which transaction/i, 'unspecified deadlock victim');

ex = example('eng-05');
matches(ex.input, /key K.*20.*same K.*equivalent request/i, 'eng-05: equivalent keyed replay');
matches(ex.output, /exactly one order.*same order 42/i, 'eng-05: published replay result');
equal(orderResult.orders, 1, 'eng-05: model creates one order');
equal(orderResult.results, [42, 42], 'eng-05: both calls identify order 42');
contains('eng-05', /atomically.*key ownership.*order creation/i, 'atomic durable result protocol');

ex = example('eng-06');
matches(ex.input, /ETag "e1".*no-cache/i, 'eng-06: valid entity-tag syntax');
matches(ex.output, /validates over the network.*304.*reuse V1.*without downloading/i, 'eng-06: published validation effect');
equal(cacheResult.network && cacheResult.stored && cacheResult.body === 'V1', true, 'eng-06: state model validates and reuses body');
contains('eng-06', /unqualified/i, 'no-cache directive scope');

ex = example('eng-07');
matches(ex.input, /C1 and C2.*one item.*notifies both/i, 'eng-07: one item, two consumers');
matches(ex.output, /one consumer obtains.*other returns to waiting/i, 'eng-07: published queue effect');
equal(Object.values(consumerResult).filter(v => v[0] === 'consumed').length, 1, 'eng-07: one model consumer succeeds');
equal(Object.values(consumerResult).filter(v => v[0] === 'wait').length, 1, 'eng-07: one model consumer waits');
contains('eng-07', /same lock/i, 'shared predicate lock');

ex = example('eng-08');
equal(ex.input.allBottomAttemptsFail, true, 'eng-08: worst-case persistent failure');
equal(ex.output, ex.input.topLevelRequests * leafAttempts(ex.input.attemptCapsIncludingFirst), 'eng-08: published retry count');
contains('eng-08', /including.*first attempt/i, 'attempt cap includes initial attempt');

ex = example('eng-09');
matches(ex.input, /SET item A EX 60.*SET item B.*without KEEPTTL/i, 'eng-09: ordinary overwrite');
equal(ex.output, {value: secondSet.value, ttl: redisTTL(secondSet, 1)}, 'eng-09: published persistent key');
contains('eng-09', /client.*crash.*between|crash.*between.*commands/i, 'split SET/EXPIRE crash gap');

ex = example('ai-01');
equal(ex.input.weighted, false, 'ai-01: unweighted formula');
equal(ex.input.logits.length, ex.input.targets.length, 'ai-01: matching scalar example shapes');
numeric(ex.output, {loss: bce(ex.input.logits[0], ex.input.targets[0]), gradient: sigmoid(ex.input.logits[0]) - ex.input.targets[0]}, 'ai-01: published BCE');
contains('ai-01', /raw logits/i, 'BCE logits input');

ex = example('ai-02');
numeric(ex.output, crossEntropy(ex.input.logits[0], ex.input.target[0]), 'ai-02: published CE');
contains('ai-02', /natural logarithms/i, 'CE logarithm base');
contains('ai-02', /integer.*indices|indices.*integer/i, 'class-index target mode');

ex = example('ai-03');
const groups = ex.input.microbatchSizes.map((n, i) => Array(n).fill(ex.input.meanGradients[i]));
numeric(ex.output, accumulatedMean(groups), 'ai-03: published accumulated gradient');
contains('ai-03', /additive.*equally weighted per-example/i, 'sample weighting assumption');
contains('ai-03', /actual normalization denominator/i, 'weighted/token reduction caveat');

ex = example('ai-04');
equal(ex.output, {training: dropout(ex.input.activation, ex.input.keepMask, ex.input.dropProbability, true), evaluation: dropout(ex.input.activation, ex.input.keepMask, ex.input.dropProbability, false)}, 'ai-04: published dropout outputs');
contains('ai-04', /p=1.*separately/i, 'dropout endpoint avoids division by zero');
contains('ai-04', /no_grad.*does not.*training flag|does not set.*training flag/i, 'no_grad is separate from eval');

ex = example('ai-05');
equal(ex.input.dropoutProbability, 0, 'ai-05: deterministic attention example');
numeric(ex.output, attention(ex.input.scores, ex.input.visible, ex.input.values).value, 'ai-05: published attention output');
contains('ai-05', /True.*allowed|True permits participation/i, 'functional SDPA mask polarity');
contains('ai-05', /at least one visible key/i, 'nonempty visibility assumption');

ex = example('ai-06');
const size = kvSize({layers: ex.input.layers, batch: ex.input.batch, kvHeads: ex.input.kvHeads, length: ex.input.sequenceLength, headDim: ex.input.headDimension, bytesPerElement: ex.input.bytesPerElement});
equal(ex.output, {elements: Number(size.elements), bytes: Number(size.bytes)}, 'ai-06: published KV memory');
contains('ai-06', /Hkv.*storage.*Hq|Hkv for cache storage/i, 'cache uses KV heads');
contains('ai-06', /2\^30 for GiB/i, 'GiB binary conversion');

ex = example('ai-07');
equal(ex.input.operation, 'centering only', 'ai-07: example is not full standardization');
const fitted = mean(ex.input.trainingFeatures), leaky = mean([...ex.input.trainingFeatures, ...ex.input.testFeatures]);
numeric(ex.output, {trainingMean: fitted, testCentered: ex.input.testFeatures[0] - fitted, leakyMean: leaky, leakyTestCentered: ex.input.testFeatures[0] - leaky}, 'ai-07: published fit/transform values');
contains('ai-07', /each fold.*training subset/i, 'preprocessing remains inside cross-validation');

ex = example('ai-08');
equal(ex.input.comparison, '>=', 'ai-08: inclusive threshold');
numeric(ex.output, ex.input.thresholds.map(threshold => binaryF1(ex.input.labels, ex.input.scores, threshold).value), 'ai-08: published F1');
contains('ai-08', /F1=0.*denominator is zero/i, 'explicit zero-division convention');

ex = example('ai-09');
const p = ex.input.probabilities, y = ex.input.labels;
numeric(ex.output, {auc: pairwiseAuc(y, p), meanProbability: mean(p), positiveFraction: mean(y), gap: mean(p) - mean(y)}, 'ai-09: published ranking and group gap');
contains('ai-09', /not.*population.*calibration|does not establish population miscalibration/i, 'finite-sample calibration limitation');

console.log(`Original systems and AI review passed: ${ids.length} published worked examples, answered follow-ups, semantic assumptions and ${checks} independent numeric/state checks. No database, cache server, thread runtime or GPU was invoked.`);
