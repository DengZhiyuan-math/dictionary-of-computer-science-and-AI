import assert from 'node:assert/strict';
import fs from 'node:fs';

// Offline verification of original teaching models, not company hiring systems.
// Deliberately different oracles check optimization, state, geometry, and arithmetic.
const root = new URL('../data/english/', import.meta.url);
const questions = ['apple', 'uber', 'netflix'].flatMap(company =>
  JSON.parse(fs.readFileSync(new URL(`interviews-${company}.json`, root), 'utf8')));
const counters = { examples: 0, comparisons: 0 };
const check = (actual, expected, context) => {
  assert.deepEqual(actual, expected, context);
  counters.comparisons++;
};
const sequences = function* (alphabet, length, prefix = []) {
  if (!length) { yield prefix; return; }
  for (const item of alphabet) yield* sequences(alphabet, length - 1, [...prefix, item]);
};
const sorted = values => [...values].sort();
const sum = values => values.reduce((a, b) => a + b, 0);

function snapshotMoves({ oldOrder, newOrder }) {
  const positions = new Map(oldOrder.map((id, i) => [id, i]));
  if (positions.size !== oldOrder.length || new Set(newOrder).size !== newOrder.length ||
      newOrder.length !== oldOrder.length || newOrder.some(id => !positions.has(id))) {
    throw new RangeError('Snapshots must contain the same distinct identifiers');
  }
  const tails = [];
  for (const id of newOrder) {
    const value = positions.get(id);
    let lo = 0, hi = tails.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (tails[mid] >= value) hi = mid; else lo = mid + 1;
    }
    tails[lo] = value;
  }
  return newOrder.length - tails.length;
}

function minimumMoveDistances(n) {
  const start = Array.from({ length: n }, (_, i) => i);
  const distances = new Map([[start.join(','), 0]]), queue = [start];
  for (let head = 0; head < queue.length; head++) {
    const state = queue[head], depth = distances.get(state.join(','));
    for (let from = 0; from < n; from++) for (let to = 0; to < n; to++) {
      const next = [...state], [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      const key = next.join(',');
      if (!distances.has(key)) { distances.set(key, depth + 1); queue.push(next); }
    }
  }
  return distances;
}

function actorMaps({ events }) {
  const cache = new Map(), pending = new Map(), results = new Map(), errors = new Map();
  let downloads = 0;
  for (const [kind, keyOrId, valueOrKey] of events) {
    if (kind === 'request') {
      const id = keyOrId, key = valueOrKey;
      if (cache.has(key)) results.set(id, cache.get(key));
      else if (pending.has(key)) pending.get(key).push(id);
      else { downloads++; pending.set(key, [id]); }
    } else {
      const key = keyOrId, value = valueOrKey;
      assert(pending.has(key), 'completion must name a pending key');
      for (const id of pending.get(key)) (kind === 'complete' ? results : errors).set(id, value);
      pending.delete(key);
      if (kind === 'complete') cache.set(key, value);
    }
  }
  return { downloads, results: Object.fromEntries(results), errors: Object.fromEntries(errors), cache: Object.fromEntries(cache) };
}

function actorJobLog({ events }) {
  const jobs = [], requests = [], cache = new Map();
  for (const [kind, keyOrId, valueOrKey] of events) {
    if (kind === 'request') {
      const request = { id: keyOrId, key: valueOrKey, state: 'pending' };
      requests.push(request);
      if (cache.has(request.key)) { request.state = 'complete'; request.value = cache.get(request.key); }
      else {
        let job = jobs.find(job => job.key === request.key && job.state === 'pending');
        if (!job) { job = { key: request.key, state: 'pending', waiters: [] }; jobs.push(job); }
        job.waiters.push(request);
      }
    } else {
      const job = jobs.find(job => job.key === keyOrId && job.state === 'pending');
      assert(job, 'completion must name a pending job');
      job.state = kind;
      for (const request of job.waiters) { request.state = kind; request.value = valueOrKey; }
      if (kind === 'complete') cache.set(keyOrId, valueOrKey);
    }
    for (const key of ['x', 'y']) assert(jobs.filter(job => job.key === key && job.state === 'pending').length <= 1);
  }
  return {
    downloads: jobs.length,
    results: Object.fromEntries(requests.filter(r => r.state === 'complete').map(r => [r.id, r.value])),
    errors: Object.fromEntries(requests.filter(r => r.state === 'fail').map(r => [r.id, r.value])),
    cache: Object.fromEntries(cache),
  };
}

const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
function graphemePrefix({ text, budget }) {
  let bytes = 0, end = 0;
  for (const { segment, index } of segmenter.segment(text)) {
    const size = Buffer.byteLength(segment, 'utf8');
    if (bytes + size > budget) break;
    bytes += size; end = index + segment.length;
  }
  return { prefix: text.slice(0, end), bytes };
}
function graphemeBoundaryOracle({ text, budget }) {
  const boundaries = [0, ...[...segmenter.segment(text)].map(item => item.index + item.segment.length)];
  const candidates = boundaries.map(end => text.slice(0, end));
  const prefix = candidates.filter(value => Buffer.byteLength(value) <= budget).at(-1);
  const encoded = Buffer.from(prefix);
  assert.equal(new TextDecoder('utf-8', { fatal: true, ignoreBOM: true }).decode(encoded), prefix);
  assert(text.startsWith(prefix));
  return { prefix, bytes: encoded.length };
}

function combineCounter({ events }) {
  let demand = 0;
  const delivered = [], dropped = [];
  for (const [kind, value, returned] of events) {
    if (kind === 'request') demand += value;
    else if (demand === 0) dropped.push(value);
    else { delivered.push(value); demand += returned - 1; }
    assert(demand >= 0);
  }
  return { delivered, dropped, demand };
}
function combineCreditTokens({ events }) {
  const tokens = [], delivered = [], dropped = [];
  for (const [kind, value, returned] of events) {
    if (kind === 'request') for (let n = 0; n < value; n++) tokens.push(1);
    else if (!tokens.length) dropped.push(value);
    else {
      tokens.pop(); delivered.push(value);
      for (let n = 0; n < returned; n++) tokens.push(1);
    }
  }
  return { delivered, dropped, demand: tokens.length };
}

const hexKey = ([q, r]) => `${q},${r}`;
const hexSteps = [[1, 0], [0, 1], [-1, 1], [-1, 0], [0, -1], [1, -1]];
function hexBfs({ origin, k }) {
  const seen = new Set([hexKey(origin)]), queue = [[...origin, 0]];
  for (let head = 0; head < queue.length; head++) {
    const [q, r, distance] = queue[head];
    if (distance === k) continue;
    for (const [dq, dr] of hexSteps) {
      const key = hexKey([q + dq, r + dr]);
      if (!seen.has(key)) { seen.add(key); queue.push([q + dq, r + dr, distance + 1]); }
    }
  }
  return { cells: sorted(seen), count: seen.size };
}
function hexDistanceOracle({ origin: [q, r], k }) {
  const cells = [];
  for (let dq = -k; dq <= k; dq++) for (let dr = -k; dr <= k; dr++)
    if (Math.max(Math.abs(dq), Math.abs(dr), Math.abs(dq + dr)) <= k) cells.push(hexKey([q + dq, r + dr]));
  assert.equal(cells.length, 1 + 3 * k * (k + 1));
  return { cells: sorted(cells), count: cells.length };
}

function criticalPath({ durations, edges }) {
  const ids = Object.keys(durations), adjacency = new Map(ids.map(id => [id, []]));
  const indegree = new Map(ids.map(id => [id, 0])), finish = { ...durations }, parent = new Map();
  for (const [u, v] of edges) { adjacency.get(u).push(v); indegree.set(v, indegree.get(v) + 1); }
  const queue = ids.filter(id => !indegree.get(id));
  for (let head = 0; head < queue.length; head++) {
    const u = queue[head];
    for (const v of adjacency.get(u)) {
      const candidate = finish[u] + durations[v];
      if (candidate > finish[v]) { finish[v] = candidate; parent.set(v, u); }
      indegree.set(v, indegree.get(v) - 1);
      if (!indegree.get(v)) queue.push(v);
    }
  }
  if (queue.length !== ids.length) return { error: 'cycle' };
  if (!ids.length) return { finish: {}, makespan: 0, criticalPath: [] };
  const end = ids.reduce((best, id) => finish[id] > finish[best] ? id : best), path = [];
  for (let id = end; id !== undefined; id = parent.get(id)) path.push(id);
  return { finish, makespan: finish[end], criticalPath: path.reverse() };
}
function criticalAllPaths({ durations, edges }) {
  const ids = Object.keys(durations), finish = Object.fromEntries(ids.map(id => [id, 0]));
  const visit = (id, elapsed, ancestors) => {
    if (ancestors.has(id)) throw new Error('cycle');
    const next = new Set(ancestors); next.add(id);
    elapsed += durations[id]; finish[id] = Math.max(finish[id], elapsed);
    for (const [u, v] of edges) if (u === id) visit(v, elapsed, next);
  };
  try { for (const id of ids) visit(id, 0, new Set()); }
  catch (error) { if (error.message === 'cycle') return { error: 'cycle' }; throw error; }
  return { finish, makespan: Math.max(0, ...Object.values(finish)) };
}
function checkCritical(input, actual, context) {
  const oracle = criticalAllPaths(input);
  if (oracle.error) { check(actual, oracle, context); return; }
  check({ finish: actual.finish, makespan: actual.makespan }, oracle, context);
  assert.equal(sum(actual.criticalPath.map(id => input.durations[id])), actual.makespan);
  for (let i = 1; i < actual.criticalPath.length; i++) assert(input.edges.some(([u, v]) =>
    u === actual.criticalPath[i - 1] && v === actual.criticalPath[i]));
}

function waterFill({ demands, capacity }) {
  const ordered = demands.map((demand, i) => [demand, i]).sort((a, b) => a[0] - b[0]);
  const allocations = Array(demands.length).fill(0);
  let unused = capacity;
  for (let i = 0; i < ordered.length; i++) {
    const level = unused / (ordered.length - i), [demand, index] = ordered[i];
    if (demand <= level) { allocations[index] = demand; unused -= demand; }
    else { for (const [, index] of ordered.slice(i)) allocations[index] = level; unused = 0; break; }
  }
  return { allocations, unused };
}
function saturatedSubsetOracle({ demands, capacity }) {
  const total = sum(demands), n = demands.length;
  if (capacity >= total) return { allocations: [...demands], unused: capacity - total };
  // Integer inputs allow exact rational comparisons without implementing float water filling.
  for (let mask = 0; mask < 2 ** n; mask++) {
    const frozen = demands.filter((_, i) => mask & (1 << i));
    const denominator = n - frozen.length;
    if (!denominator) continue;
    const numerator = capacity - sum(frozen);
    if (numerator < 0) continue;
    if (demands.every((demand, i) => mask & (1 << i) ?
      demand * denominator <= numerator : demand * denominator >= numerator)) {
      return { allocations: demands.map((demand, i) => mask & (1 << i) ? demand : numerator / denominator), unused: 0 };
    }
  }
  assert.fail('No max-min water level found');
}
function checkFair(input, actual, context) {
  const expected = saturatedSubsetOracle(input);
  assert(Math.abs(actual.unused - expected.unused) < 1e-10, context);
  assert.equal(actual.allocations.length, expected.allocations.length);
  actual.allocations.forEach((value, i) => assert(Math.abs(value - expected.allocations[i]) < 1e-10, context));
  counters.comparisons++;
}

function fieldMaskTrie({ paths }) {
  const root = { terminal: false, children: new Map() };
  for (const path of paths) {
    let node = root;
    for (const segment of path.split('.')) {
      if (node.terminal) break;
      if (!node.children.has(segment)) node.children.set(segment, { terminal: false, children: new Map() });
      node = node.children.get(segment);
    }
    node.terminal = true; node.children.clear();
  }
  const output = [];
  const visit = (node, prefix) => {
    if (node.terminal) { output.push(prefix.join('.')); return; }
    for (const [segment, child] of node.children) visit(child, [...prefix, segment]);
  };
  visit(root, []); output.sort();
  return { paths: output, topLevelFields: sorted(new Set(output.map(path => path.split('.')[0]))) };
}
function fieldMaskPairwise({ paths }) {
  const unique = [...new Set(paths)];
  const output = unique.filter(path => !unique.some(parent => parent !== path && path.startsWith(`${parent}.`))).sort();
  return { paths: output, topLevelFields: sorted(new Set(output.map(path => path.split('.')[0]))) };
}

function shotDp({ budget, shots }) {
  let dp = Array(budget + 1).fill(-Infinity); dp[0] = 0;
  for (const shot of shots) {
    const next = Array(budget + 1).fill(-Infinity);
    for (let used = 0; used <= budget; used++) if (dp[used] !== -Infinity)
      for (const { bytes, quality } of shot) if (used + bytes <= budget)
        next[used + bytes] = Math.max(next[used + bytes], dp[used] + quality);
    dp = next;
  }
  const best = Math.max(...dp);
  return best === -Infinity ? null : best;
}
function shotCartesian({ budget, shots }) {
  let best = null;
  const visit = (shot, bytes, quality) => {
    if (bytes > budget) return;
    if (shot === shots.length) { best = Math.max(best ?? 0, quality); return; }
    for (const option of shots[shot]) visit(shot + 1, bytes + option.bytes, quality + option.quality);
  };
  visit(0, 0, 0); return best;
}

function vegasCeiling({ initialLimit, minRttMs, maxLimit, samples }) {
  let limit = initialLimit;
  return samples.map(({ rttMs, inflight, didDrop }) => {
    const numerator = BigInt(limit) * BigInt(rttMs - minRttMs), denominator = BigInt(rttMs);
    const queue = Number((numerator + denominator - 1n) / denominator);
    if (didDrop) limit--;
    else if (2 * inflight < limit) return limit;
    else if (queue <= 1) limit += 6;
    else if (queue < 3) limit++;
    else if (queue > 6) limit--;
    return limit = Math.min(maxLimit, Math.max(1, limit));
  });
}
function vegasRationalThresholds({ initialLimit, minRttMs, maxLimit, samples }) {
  let limit = initialLimit;
  return samples.map(({ rttMs, inflight, didDrop }) => {
    const n = BigInt(limit) * BigInt(rttMs - minRttMs), d = BigInt(rttMs);
    let delta = 0;
    if (didDrop) delta = -1;
    else if (2 * inflight >= limit) {
      // ceil(n/d)<=t iff n<=t*d for integer t; no floating-point ceil.
      if (n <= d) delta = 6;
      else if (n <= 2n * d) delta = 1;
      else if (n > 6n * d) delta = -1;
    }
    limit = Math.max(1, Math.min(maxLimit, limit + delta)); return limit;
  });
}

const models = {
  'apple-snapshot-minimum-moves': snapshotMoves,
  'apple-actor-single-flight': actorMaps,
  'apple-grapheme-byte-budget': graphemePrefix,
  'apple-combine-demand': combineCounter,
  'uber-hex-neighborhood': hexBfs,
  'uber-critical-path': criticalPath,
  'uber-max-min-allocation': waterFill,
  'netflix-fieldmask-normalization': fieldMaskTrie,
  'netflix-shot-budget': shotDp,
  'netflix-vegas-limit': vegasCeiling,
};
const exampleOracles = {
  'apple-snapshot-minimum-moves': ({ oldOrder, newOrder }) =>
    minimumMoveDistances(oldOrder.length).get(newOrder.map(id => oldOrder.indexOf(id)).join(',')),
  'apple-actor-single-flight': actorJobLog,
  'apple-grapheme-byte-budget': graphemeBoundaryOracle,
  'apple-combine-demand': combineCreditTokens,
  'netflix-fieldmask-normalization': fieldMaskPairwise,
  'netflix-shot-budget': shotCartesian,
  'netflix-vegas-limit': vegasRationalThresholds,
};
check(sorted(questions.map(q => q.id)), sorted(Object.keys(models)), 'Every new question has a checker');
for (const question of questions) {
  assert.equal(question.sourceKind, 'documentation-derived');
  assert(question.sourceNote && /original/i.test(question.sourceNote), `${question.id}: original exercise provenance`);
  for (const example of question.examples) {
    const actual = models[question.id](example.input), context = `${question.id} published example`;
    if (question.id === 'uber-hex-neighborhood') {
      const expected = { cells: sorted(example.output.cells.map(hexKey)), count: example.output.count };
      check(actual, expected, context); check(actual, hexDistanceOracle(example.input), context);
    } else if (question.id === 'uber-max-min-allocation') {
      checkFair(example.input, actual, context); check(actual, example.output, context);
    } else {
      check(actual, example.output, context);
      if (question.id === 'uber-critical-path') checkCritical(example.input, actual, context);
      else check(actual, exampleOracles[question.id](example.input), `${context}: independent oracle`);
    }
    counters.examples++;
  }
}

for (let n = 0; n <= 7; n++) {
  const oldOrder = Array.from({ length: n }, (_, i) => i);
  for (const [key, distance] of minimumMoveDistances(n)) {
    const newOrder = key ? key.split(',').map(Number) : [];
    check(snapshotMoves({ oldOrder, newOrder }), distance, 'LIS versus BFS move distance');
  }
}
for (const input of [
  { oldOrder: ['a', 'a'], newOrder: ['a', 'a'] },
  { oldOrder: ['a', 'b'], newOrder: ['a', 'a'] },
  { oldOrder: ['a'], newOrder: ['b'] },
  { oldOrder: ['a'], newOrder: [] },
]) assert.throws(() => snapshotMoves(input), RangeError);

function actorTraces(events, active, requestNumber, depth) {
  check(actorMaps({ events }), actorJobLog({ events }), 'Actor maps versus independent job log');
  if (!depth) return;
  for (const key of ['x', 'y']) {
    const next = new Set(active);
    if (!Object.hasOwn(actorMaps({ events }).cache, key)) next.add(key);
    actorTraces([...events, ['request', `r${requestNumber}`, key]], next, requestNumber + 1, depth - 1);
  }
  for (const key of active) for (const kind of ['complete', 'fail']) {
    const next = new Set(active); next.delete(key);
    actorTraces([...events, [kind, key, kind === 'complete' ? `value-${key}` : `error-${key}`]], next, requestNumber, depth - 1);
  }
}
actorTraces([], new Set(), 0, 6);
for (const value of ['', 0]) {
  const input = { events: [['request', 'first', 'x'], ['complete', 'x', value], ['request', 'cached', 'x']] };
  const expected = { downloads: 1, results: { first: value, cached: value }, errors: {}, cache: { x: value } };
  check(actorMaps(input), expected, 'Falsy cached payload is present');
  check(actorMaps(input), actorJobLog(input), 'Falsy payload agrees with job-log oracle');
}

const stableClusters = ['A', 'é', 'e\u0301', '🇵🇷', '🙂', '👩🏽‍💻', '\r\n', '\uFEFF'];
for (const cluster of stableClusters) assert.equal([...segmenter.segment(cluster)].length, 1, 'Known stable extended grapheme');
for (let length = 0; length <= 2; length++) for (const parts of sequences(stableClusters, length)) {
  const text = parts.join('');
  for (let budget = 0; budget <= Buffer.byteLength(text) + 1; budget++)
    check(graphemePrefix({ text, budget }), graphemeBoundaryOracle({ text, budget }), 'Grapheme boundary and UTF-8 byte oracle');
}
for (let length = 0; length <= 5; length++) for (const events of sequences([
  ['request', 0], ['request', 1], ['request', 2], ['send', 'a', 0], ['send', 'b', 2],
], length)) check(combineCounter({ events }), combineCreditTokens({ events }), 'Demand counter versus credit tokens');

for (const origin of [[0, 0], [2, -1], [-3, 4], [100, -200]]) for (let k = 0; k <= 12; k++)
  check(hexBfs({ origin, k }), hexDistanceOracle({ origin, k }), 'Hex BFS versus distance formula');
for (let n = 0; n <= 4; n++) {
  const ids = Array.from({ length: n }, (_, i) => `v${i}`), possible = [];
  for (let u = 0; u < n; u++) for (let v = u + 1; v < n; v++) possible.push([ids[u], ids[v]]);
  for (let mask = 0; mask < 2 ** possible.length; mask++) {
    const edges = possible.filter((_, i) => mask & (1 << i));
    for (const values of sequences([0, 1, 3], n)) {
      const durations = Object.fromEntries(ids.map((id, i) => [id, values[i]])), input = { durations, edges };
      checkCritical(input, criticalPath(input), 'Critical-path DP versus all paths');
    }
  }
}
for (const input of [
  { durations: { a: 0 }, edges: [['a', 'a']] },
  { durations: { a: 0, b: 0 }, edges: [['a', 'b'], ['b', 'a']] },
  { durations: { a: 2, b: 1, c: 0 }, edges: [['a', 'b'], ['b', 'c'], ['c', 'a']] },
]) checkCritical(input, criticalPath(input), 'Reject dependency cycles');
for (let n = 0; n <= 4; n++) for (const demands of sequences([0, 1, 2, 3, 4], n))
  for (let capacity = 0; capacity <= 16; capacity++) checkFair({ demands, capacity }, waterFill({ demands, capacity }), 'Water filling versus saturated subsets');

const fields = ['a', 'a.b', 'a.b.c', 'a.bc', 'a_b', 'b', 'b.a'];
for (let mask = 0; mask < 2 ** fields.length; mask++) {
  const paths = fields.filter((_, i) => mask & (1 << i));
  for (const order of [paths, [...paths].reverse(), [...paths, ...paths]])
    check(fieldMaskTrie({ paths: order }), fieldMaskPairwise({ paths: order }), 'Trie versus segment-prefix pairwise normalization');
}
for (let n = 0; n <= 3; n++) for (const qualities of sequences([0, 1, 4], n * 2)) {
  const shots = Array.from({ length: n }, (_, i) => [{ bytes: 1, quality: qualities[i * 2] }, { bytes: 3, quality: qualities[i * 2 + 1] }]);
  for (let budget = 0; budget <= 10; budget++)
    check(shotDp({ budget, shots }), shotCartesian({ budget, shots }), 'Shot DP versus full Cartesian product');
}
check(shotDp({ budget: 10, shots: [[]] }), null, 'No candidate cannot satisfy a mandatory shot');
for (let initialLimit = 1; initialLimit <= 20; initialLimit++) for (const rttMs of [100, 101, 112, 125, 160, 180, 200, 400, 450, 800, 1000])
  for (let inflight = 0; inflight <= 21; inflight++) for (const didDrop of [false, true]) {
    const input = { initialLimit, minRttMs: 100, maxLimit: 20, samples: [{ rttMs, inflight, didDrop }] };
    check(vegasCeiling(input), vegasRationalThresholds(input), 'Vegas exact ceiling versus rational threshold tests');
  }
for (let initialLimit = 1; initialLimit <= 20; initialLimit++) for (const samples of sequences([
  { rttMs: 100, inflight: 20, didDrop: false },
  { rttMs: 160, inflight: 20, didDrop: false },
  { rttMs: 450, inflight: 0, didDrop: false },
  { rttMs: 100, inflight: 0, didDrop: true },
], 4)) {
  const input = { initialLimit, minRttMs: 100, maxLimit: 20, samples };
  check(vegasCeiling(input), vegasRationalThresholds(input), 'Vegas evolving four-sample exact state trace');
}

console.log(`Checked ${questions.length} Apple/Uber/Netflix questions, ${counters.examples} examples, and ${counters.comparisons} independent comparisons (offline).`);
