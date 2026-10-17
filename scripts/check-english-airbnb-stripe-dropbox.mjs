import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

// Offline checks only. The references deliberately use different data structures
// or exhaustive calculations from the approaches described in the exercises.
const companies = ['airbnb', 'stripe', 'dropbox'];
const questions = companies.flatMap((company) => JSON.parse(readFileSync(
  new URL(`../data/english/interviews-${company}.json`, import.meta.url), 'utf8',
)));
const byId = new Map(questions.map((question) => [question.id, question]));
assert.equal(questions.length, 9);
assert.equal(byId.size, questions.length);
let comparisons = 0;
let workedExamples = 0;

function same(actual, expected, label) {
  assert.deepStrictEqual(actual, expected, label);
  comparisons += 1;
}

function near(actual, expected, label) {
  if (typeof expected === 'number') {
    assert.equal(typeof actual, 'number', label);
    assert.ok(Number.isFinite(actual), `${label}: nonfinite result`);
    assert.ok(Math.abs(actual - expected) <= 1e-9 * Math.max(1, Math.abs(expected)),
      `${label}: ${actual} != ${expected}`);
  } else if (Array.isArray(expected)) {
    assert.ok(Array.isArray(actual), label);
    assert.equal(actual.length, expected.length, label);
    expected.forEach((value, index) => near(actual[index], value, label));
  } else if (expected && typeof expected === 'object') {
    assert.deepStrictEqual(Object.keys(actual).sort(), Object.keys(expected).sort(), label);
    Object.entries(expected).forEach(([key, value]) => near(actual[key], value, label));
  } else {
    assert.deepStrictEqual(actual, expected, label);
  }
}

function approximatelySame(actual, expected, label) {
  near(actual, expected, label);
  comparisons += 1;
}

let randomState = 0x5a17d09b;
function randomInt(maximum) {
  randomState ^= randomState << 13;
  randomState ^= randomState >>> 17;
  randomState ^= randomState << 5;
  return (randomState >>> 0) % maximum;
}

function temporalSweep({ events, queries, window }) {
  const groups = new Map();
  for (const event of events) {
    if (!groups.has(event.user)) groups.set(event.user, []);
    groups.get(event.user).push(event);
  }
  const orderedQueries = queries.map((query, index) => ({ ...query, index }));
  orderedQueries.sort((a, b) => a.time - b.time);
  for (const rows of groups.values()) rows.sort((a, b) => a.time - b.time);
  const state = new Map();
  const result = Array(queries.length);
  for (const query of orderedQueries) {
    const rows = groups.get(query.user) || [];
    if (!state.has(query.user)) state.set(query.user, { left: 0, right: 0, sum: 0 });
    const active = state.get(query.user);
    while (active.right < rows.length && rows[active.right].time < query.time) {
      active.sum += rows[active.right++].value;
    }
    while (active.left < active.right && rows[active.left].time < query.time - window) {
      active.sum -= rows[active.left++].value;
    }
    result[query.index] = { count: active.right - active.left, sum: active.sum };
  }
  return result;
}

function temporalReference({ events, queries, window }) {
  return queries.map((query) => {
    const matching = events.filter((event) => event.user === query.user
      && event.time >= query.time - window && event.time < query.time);
    return { count: matching.length, sum: matching.reduce((sum, event) => sum + event.value, 0) };
  });
}

function rerankCached(input) {
  const { ids, probabilities, distances, discounts, lambda, k } = input;
  const distanceSums = Array(ids.length).fill(0);
  const selected = new Set();
  const order = [];
  const contributions = [];
  for (let position = 0; position < k; position += 1) {
    let best = -1;
    let maximum = -Infinity;
    for (let candidate = 0; candidate < ids.length; candidate += 1) {
      if (selected.has(candidate)) continue;
      const value = (1 - lambda) * discounts[position] * probabilities[candidate]
        + lambda * distanceSums[candidate] / (position + 1);
      if (value > maximum) { maximum = value; best = candidate; }
    }
    selected.add(best);
    order.push(ids[best]);
    contributions.push(maximum);
    for (let candidate = 0; candidate < ids.length; candidate += 1) {
      if (!selected.has(candidate)) distanceSums[candidate] += distances[candidate][best];
    }
  }
  return { order, contributions, total: contributions.reduce((sum, value) => sum + value, 0) };
}

function rerankReference(input) {
  const prefix = [];
  const contributions = [];
  while (prefix.length < input.k) {
    const scores = input.ids.map((_, candidate) => prefix.includes(candidate) ? null : (
      (1 - input.lambda) * input.discounts[prefix.length] * input.probabilities[candidate]
      + input.lambda * prefix.reduce((sum, other) => sum + input.distances[candidate][other], 0)
        / (prefix.length + 1)
    ));
    const remaining = scores.map((score, candidate) => ({ score, candidate }))
      .filter(({ score }) => score !== null);
    remaining.sort((a, b) => b.score - a.score || a.candidate - b.candidate);
    prefix.push(remaining[0].candidate);
    contributions.push(remaining[0].score);
  }
  return {
    order: prefix.map((index) => input.ids[index]),
    contributions,
    total: contributions.reduce((sum, value) => sum + value, 0),
  };
}

function mergedVariance({ shards }) {
  let state = { n: 0, mean: 0, M2: 0 };
  for (const shard of shards) {
    const local = { n: 0, mean: 0, M2: 0 };
    for (const value of shard) {
      local.n += 1;
      const delta = value - local.mean;
      local.mean += delta / local.n;
      local.M2 += delta * (value - local.mean);
    }
    if (!local.n) continue;
    if (!state.n) { state = local; continue; }
    const n = state.n + local.n;
    const delta = local.mean - state.mean;
    state = {
      n,
      mean: state.mean + delta * local.n / n,
      M2: state.M2 + local.M2 + delta * delta * state.n * local.n / n,
    };
  }
  return state.n
    ? { ...state, populationVariance: state.M2 / state.n }
    : { n: 0, mean: null, M2: 0, populationVariance: null };
}

function varianceReference({ shards }) {
  const values = shards.flat();
  if (!values.length) return { n: 0, mean: null, M2: 0, populationVariance: null };
  // Fixtures and generated values are integers or exact quarter increments.
  // BigInt raw moments on offset, scaled integers avoid floating cancellation.
  const origin = values[0];
  const scaled = values.map((value) => {
    const integer = (value - origin) * 4;
    assert.ok(Number.isSafeInteger(integer));
    return BigInt(integer);
  });
  const n = BigInt(values.length);
  const sum = scaled.reduce((total, value) => total + value, 0n);
  const sumSquares = scaled.reduce((total, value) => total + value * value, 0n);
  const numerator = sumSquares * n - sum * sum;
  const M2 = Number(numerator) / Number(16n * n);
  return {
    n: values.length,
    mean: origin + Number(sum) / (4 * values.length),
    M2,
    populationVariance: Number(numerator) / Number(16n * n * n),
  };
}

function idempotencyDeque({ events }) {
  const cache = new Map();
  let queue = [];
  let head = 0;
  const responses = [];
  let executions = 0;
  for (const event of events) {
    if (event.op === 'prune') {
      while (head < queue.length && event.at - queue[head].at >= 86400) {
        cache.delete(queue[head++].key);
      }
      // Keep consumed storage bounded by live entries; copying is amortized.
      if (head * 2 >= queue.length) { queue = queue.slice(head); head = 0; }
      continue;
    }
    const old = cache.get(event.key);
    if (old) {
      responses.push(old.params === event.params
        ? { action: 'replayed', status: old.result.status, body: old.result.body }
        : { action: 'mismatch' });
      continue;
    }
    const executed = event.result.phase === 'executed';
    responses.push({
      action: executed ? 'executed' : 'uncached', status: event.result.status, body: event.result.body,
    });
    if (executed) {
      executions += 1;
      cache.set(event.key, event);
      queue.push(event);
    }
  }
  return { responses, executions, retainedKeys: [...cache.keys()] };
}

function idempotencyReference({ events }) {
  let retained = [];
  const responses = [];
  let executions = 0;
  for (const event of events) {
    if (event.op === 'prune') {
      retained = retained.filter((record) => record.at > event.at - 86400);
      continue;
    }
    const record = retained.find((entry) => entry.key === event.key);
    if (record) {
      responses.push(record.params !== event.params ? { action: 'mismatch' } : {
        action: 'replayed', status: record.result.status, body: record.result.body,
      });
    } else if (event.result.phase !== 'executed') {
      responses.push({ action: 'uncached', status: event.result.status, body: event.result.body });
    } else {
      retained = [...retained, event];
      executions += 1;
      responses.push({ action: 'executed', status: event.result.status, body: event.result.body });
    }
  }
  return { responses, executions, retainedKeys: retained.map((record) => record.key) };
}

function webhookSets({ events }) {
  const ids = new Set();
  const fulfilled = new Set();
  const actions = [];
  for (const event of events) {
    if (ids.has(event.id)) { actions.push('duplicate-delivery'); continue; }
    if (!event.commit) { actions.push('rolled-back'); continue; }
    ids.add(event.id);
    if (event.type === 'invoice.created') actions.push('recorded');
    else if (fulfilled.has(event.objectId)) actions.push('duplicate-effect');
    else { fulfilled.add(event.objectId); actions.push('fulfilled'); }
  }
  return { actions, fulfilled: [...fulfilled], processedEventIds: [...ids] };
}

function webhookHistoryReference({ events }) {
  const committed = [];
  const fulfilled = [];
  const actions = [];
  for (const event of events) {
    if (committed.some((previous) => previous.id === event.id)) {
      actions.push('duplicate-delivery');
    } else if (!event.commit) {
      actions.push('rolled-back');
    } else {
      const effectExists = committed.some((previous) => previous.type === 'invoice.paid'
        && previous.objectId === event.objectId);
      if (event.type === 'invoice.created') actions.push('recorded');
      else if (effectExists) actions.push('duplicate-effect');
      else { actions.push('fulfilled'); fulfilled.push(event.objectId); }
      committed.push(event);
    }
  }
  return { actions, fulfilled, processedEventIds: committed.map((event) => event.id) };
}

function currencyStrings({ rows }) {
  return rows.map(({ amount, currency, operation }) => {
    const match = /^[0-9]+(?:\.[0-9]+)?$/.exec(amount);
    if (!match || match[0] !== amount) return { ok: false, reason: 'syntax' };
    const [whole, fraction = ''] = amount.split('.');
    const scale = currency === 'jpy' ? 0 : 2;
    if ([...fraction.slice(scale)].some((digit) => digit !== '0')) {
      return { ok: false, reason: 'precision' };
    }
    const minor = (whole + fraction.slice(0, scale).padEnd(scale, '0')).replace(/^0+(?=\d)/, '');
    const wholeUnits = minor === '0' || minor.endsWith('00');
    if (currency === 'isk' && !wholeUnits) return { ok: false, reason: 'currency-increment' };
    if (['huf', 'twd'].includes(currency) && operation === 'manual-payout' && !wholeUnits) {
      return { ok: false, reason: 'payout-increment' };
    }
    return { ok: true, minor };
  });
}

function currencyRationalReference({ rows }) {
  return rows.map(({ amount, currency, operation }) => {
    // Independent grammar scan and rational scaling, without truncating digits.
    let dot = -1;
    let syntax = amount.length > 0;
    for (let index = 0; index < amount.length; index += 1) {
      const code = amount.charCodeAt(index);
      if (code >= 48 && code <= 57) continue;
      if (code === 46 && dot === -1 && index > 0 && index < amount.length - 1) dot = index;
      else syntax = false;
    }
    if (!syntax) return { ok: false, reason: 'syntax' };
    const digits = dot === -1 ? amount : amount.slice(0, dot) + amount.slice(dot + 1);
    const denominator = dot === -1 ? 1n : 10n ** BigInt(amount.length - dot - 1);
    const numerator = BigInt(digits) * (currency === 'jpy' ? 1n : 100n);
    if (numerator % denominator) return { ok: false, reason: 'precision' };
    const minor = numerator / denominator;
    if (currency === 'isk' && minor % 100n) return { ok: false, reason: 'currency-increment' };
    if (operation === 'manual-payout' && ['huf', 'twd'].includes(currency) && minor % 100n) {
      return { ok: false, reason: 'payout-increment' };
    }
    return { ok: true, minor: minor.toString() };
  });
}

const BLOCK = 4194304;
function fixtureChunks({ chunks }) {
  return chunks.map(({ hex, repeat }) => {
    assert.ok(/^(?:[0-9a-fA-F]{2})*$/.test(hex));
    assert.ok(Number.isSafeInteger(repeat) && repeat >= 0);
    const pattern = Buffer.from(hex, 'hex');
    return pattern.length ? Buffer.alloc(pattern.length * repeat).fill(pattern) : Buffer.alloc(0);
  });
}

function streamingHash(input) {
  const outer = createHash('sha256');
  let inner = createHash('sha256');
  let used = 0;
  for (const chunk of fixtureChunks(input)) {
    let offset = 0;
    while (offset < chunk.length) {
      const length = Math.min(BLOCK - used, chunk.length - offset);
      inner.update(chunk.subarray(offset, offset + length));
      used += length;
      offset += length;
      if (used === BLOCK) {
        outer.update(inner.digest());
        inner = createHash('sha256');
        used = 0;
      }
    }
  }
  if (used) outer.update(inner.digest());
  return outer.digest('hex');
}

function materializedHashReference(input) {
  const bytes = Buffer.concat(fixtureChunks(input));
  const digests = [];
  for (let offset = 0; offset < bytes.length; offset += BLOCK) {
    digests.push(createHash('sha256').update(bytes.subarray(offset, offset + BLOCK)).digest());
  }
  return createHash('sha256').update(Buffer.concat(digests)).digest('hex');
}

function replayMap({ initialCursor, initialFiles, pages }) {
  let cursor = initialCursor;
  let files = new Map(Object.entries(initialFiles));
  for (const page of pages) {
    const next = new Map(files);
    for (const [kind, path, revision] of page.entries) {
      if (kind === 'folder') next.delete(path);
      else {
        for (const existing of next.keys()) {
          if (existing === path || existing.startsWith(`${path}/`)) next.delete(existing);
        }
        if (kind === 'file') next.set(path, revision);
      }
    }
    if (!page.commit) break;
    files = next;
    cursor = page.cursor;
  }
  return { cursor, files: Object.fromEntries(files) };
}

function replayTrieReference({ initialCursor, initialFiles, pages }) {
  const root = { children: new Map() };
  const upsert = (kind, path, revision) => {
    const parts = path.slice(1).split('/');
    let node = root;
    for (let index = 0; index < parts.length - 1; index += 1) {
      if (!node.children.has(parts[index])) {
        if (kind === 'delete') return;
        node.children.set(parts[index], { children: new Map() });
      }
      node = node.children.get(parts[index]);
    }
    const last = parts.at(-1);
    if (kind === 'delete') node.children.delete(last);
    else if (kind === 'file') node.children.set(last, { children: new Map(), revision });
    else if (node.children.has(last)) delete node.children.get(last).revision;
    else node.children.set(last, { children: new Map() });
  };
  Object.entries(initialFiles).forEach(([path, revision]) => upsert('file', path, revision));
  let cursor = initialCursor;
  // Flatten only the durable prefix. Failed-page mutations never enter the tree.
  const durableEntries = [];
  for (const page of pages) {
    if (!page.commit) break;
    durableEntries.push(...page.entries);
    cursor = page.cursor;
  }
  durableEntries.forEach(([kind, path, revision]) => upsert(kind, path, revision));
  const files = {};
  const visit = (node, prefix) => {
    if (Object.hasOwn(node, 'revision')) files[prefix] = node.revision;
    for (const [part, child] of node.children) visit(child, `${prefix}/${part}`);
  };
  visit(root, '');
  return { cursor, files };
}

function segmentationDP({ length, fallbackCost, matches }) {
  const ends = Array.from({ length: length + 1 }, () => []);
  for (const match of matches) ends[match.end].push(match);
  const dp = Array(length + 1).fill(Infinity);
  dp[0] = 0;
  for (let end = 1; end <= length; end += 1) {
    dp[end] = dp[end - 1] + fallbackCost;
    for (const match of ends[end]) dp[end] = Math.min(dp[end], dp[match.start] + match.cost);
  }
  return dp[length];
}

function segmentationExhaustiveReference({ length, fallbackCost, matches }) {
  // Enumerate every path in the coverage DAG, including duplicate transitions.
  // No memoization: this oracle intentionally differs from prefix DP.
  const search = (position) => {
    if (position === length) return 0;
    let best = fallbackCost + search(position + 1);
    for (const match of matches) {
      if (match.start === position) best = Math.min(best, match.cost + search(match.end));
    }
    return best;
  };
  return search(0);
}

const implementations = {
  'airbnb-point-in-time-window': [temporalSweep, temporalReference, same],
  'airbnb-diversity-greedy': [rerankCached, rerankReference, approximatelySame],
  'airbnb-mergeable-variance': [mergedVariance, varianceReference, approximatelySame],
  'stripe-v1-idempotency-cache': [idempotencyDeque, idempotencyReference, same],
  'stripe-webhook-one-shot-effect': [webhookSets, webhookHistoryReference, same],
  'stripe-currency-amount-parser': [currencyStrings, currencyRationalReference, same],
  'dropbox-streaming-content-hash': [streamingHash, materializedHashReference, same],
  'dropbox-cursor-file-replay': [replayMap, replayTrieReference, same],
  'dropbox-pattern-segmentation': [segmentationDP, segmentationExhaustiveReference, same],
};

for (const [id, [implementation, reference, compare]] of Object.entries(implementations)) {
  const question = byId.get(id);
  assert.ok(question, `Missing ${id}`);
  assert.equal(question.sourceKind, 'documentation-derived', id);
  assert.equal(question.checked, '2026-10-17', id);
  assert.ok(/not a published|does not identify this as|nor a .*hiring.question/i.test(question.sourceNote), id);
  assert.equal(new URL(question.url).protocol, 'https:', id);
  assert.ok(question.examples.length >= 4, id);
  for (const [index, example] of question.examples.entries()) {
    const label = `${id} example ${index + 1}`;
    compare(implementation(example.input), example.output, `${label}: implementation`);
    compare(reference(example.input), example.output, `${label}: independent reference`);
    workedExamples += 1;
  }
}

for (let test = 0; test < 1500; test += 1) {
  const input = {
    events: Array.from({ length: randomInt(18) }, () => ({
      user: ['u', 'v', 'w'][randomInt(3)], time: randomInt(14) - 6, value: randomInt(13) - 6,
    })),
    queries: Array.from({ length: randomInt(12) }, () => ({
      user: ['u', 'v', 'w', 'missing'][randomInt(4)], time: randomInt(18) - 8,
    })),
    window: 1 + randomInt(8),
  };
  same(temporalSweep(input), temporalReference(input), 'generated temporal join');
}

for (let test = 0; test < 700; test += 1) {
  const n = randomInt(7);
  const distances = Array.from({ length: n }, () => Array(n).fill(0));
  for (let a = 0; a < n; a += 1) {
    for (let b = a + 1; b < n; b += 1) distances[a][b] = distances[b][a] = randomInt(9) / 4;
  }
  const k = randomInt(n + 1);
  const input = {
    ids: Array.from({ length: n }, (_, index) => `id${index}`),
    probabilities: Array.from({ length: n }, () => randomInt(5) / 4),
    distances,
    discounts: Array.from({ length: k }, () => randomInt(5) / 4),
    lambda: randomInt(3) / 2,
    k,
  };
  approximatelySame(rerankCached(input), rerankReference(input), 'generated greedy rank');
}

const counterexample = byId.get('airbnb-diversity-greedy').examples[2].input;
let exhaustiveMaximum = -Infinity;
for (let first = 0; first < counterexample.ids.length; first += 1) {
  for (let second = 0; second < counterexample.ids.length; second += 1) {
    if (first === second) continue;
    const score = (1 - counterexample.lambda)
      * (counterexample.discounts[0] * counterexample.probabilities[first]
        + counterexample.discounts[1] * counterexample.probabilities[second])
      + counterexample.lambda * counterexample.distances[first][second] / 2;
    exhaustiveMaximum = Math.max(exhaustiveMaximum, score);
  }
}
approximatelySame(exhaustiveMaximum, 3.35, 'enumerated nonoptimal-greedy witness');
assert.ok(exhaustiveMaximum > rerankCached(counterexample).total);

for (let test = 0; test < 900; test += 1) {
  const input = { shards: Array.from({ length: randomInt(9) }, () => (
    Array.from({ length: randomInt(9) }, () => (randomInt(161) - 80) / 4)
  )) };
  approximatelySame(mergedVariance(input), varianceReference(input), 'generated merged variance');
  const reversed = { shards: input.shards.toReversed().map((shard) => shard.toReversed()) };
  approximatelySame(mergedVariance(reversed), varianceReference(input), 'variance merge-order check');
}

for (let test = 0; test < 1800; test += 1) {
  let at = 0;
  const events = Array.from({ length: randomInt(22) }, (_, index) => {
    at += [0, 1, 100, 86399, 86400][randomInt(5)];
    if (randomInt(4) === 0) return { at, op: 'prune' };
    const phase = ['validation', 'conflict', 'executed', 'executed'][randomInt(4)];
    return {
      at, op: 'request', key: `K${randomInt(4)}`, params: `P${randomInt(2)}`,
      result: { phase, status: [200, 201, 400, 409, 500][randomInt(5)], body: `r${index}` },
    };
  });
  const input = { events };
  same(idempotencyDeque(input), idempotencyReference(input), 'generated API v1 cache');
}

for (let test = 0; test < 1800; test += 1) {
  const pool = Array.from({ length: 8 }, (_, index) => ({
    id: `e${index}`, objectId: `in${randomInt(3)}`,
    type: randomInt(2) ? 'invoice.paid' : 'invoice.created',
  }));
  const input = { events: Array.from({ length: randomInt(25) }, () => ({
    ...pool[randomInt(pool.length)], commit: randomInt(3) !== 0,
  })) };
  same(webhookSets(input), webhookHistoryReference(input), 'generated webhook transaction history');
}

const numericStrings = ['', '.', '1.', '.1', ' 1', '1 ', '1\n', '1\r\n', '+1', '-0', '1e2', '１',
  '1.2.3', 'NaN', 'Infinity', '000', '00.000', '0001.2000', '9007199254740993.01',
  '99999999999999999999999999999999999999.0001'];
for (let whole = 0; whole <= 25; whole += 1) {
  for (let fraction = 0; fraction < 10000; fraction += 1379) {
    const digits = String(fraction).padStart(4, '0');
    for (let precision = 0; precision <= 5; precision += 1) {
      numericStrings.push(precision ? `${whole}.${digits.padEnd(5, '0').slice(0, precision)}` : `${whole}`);
    }
  }
}
for (const amount of numericStrings) {
  for (const currency of ['usd', 'jpy', 'isk', 'huf', 'twd']) {
    for (const operation of ['charge', 'manual-payout']) {
      const input = { rows: [{ amount, currency, operation }] };
      same(currencyStrings(input), currencyRationalReference(input), 'generated exact currency encoding');
    }
  }
}

// Published NASA example: verify the outer step using its three given digests.
// No image or other media is downloaded by this offline checker.
// https://docs.dropboxapi.com/dropbox-api/docs/technical-reference/content-hash
const publishedBlockDigests = [
  '2a846fa617c3361fc117e1c5c1e1838c336b6a5cef982c1a2d9bdf68f2f1992a',
  'c68469027410ea393eba6551b9fa1e26db775f00eae70a0c3c129a0011a39cf9',
  '7376192de020925ce6c5ef5a8a0405e931b0a9a8c75517aacd9ca24a8a56818b',
];
const publishedContentHash = '485291fa0ee50c016982abbfa943957bcd231aae0492ccbaa22c58e3997b35e0';
const publishedRawDigests = Buffer.concat(publishedBlockDigests.map((hex) => Buffer.from(hex, 'hex')));
assert.equal(publishedRawDigests.length, 96);
same(createHash('sha256').update(publishedRawDigests).digest('hex'), publishedContentHash,
  'published Dropbox binary-digest vector');
assert.notEqual(createHash('sha256').update(publishedBlockDigests.join(''), 'ascii').digest('hex'),
  publishedContentHash, 'hex text is not the binary-digest input');

for (let test = 0; test < 100; test += 1) {
  const input = { chunks: Array.from({ length: randomInt(12) }, () => ({
    hex: Buffer.from(Array.from({ length: randomInt(7) }, () => randomInt(256))).toString('hex'),
    repeat: randomInt(17),
  })) };
  same(streamingHash(input), materializedHashReference(input), 'generated streaming content hash');
}
for (const size of [BLOCK - 1, BLOCK, BLOCK + 1, 2 * BLOCK]) {
  const whole = { chunks: [{ hex: 'a5', repeat: size }] };
  const split = { chunks: [
    { hex: 'a5', repeat: 0 }, { hex: 'a5', repeat: 17 },
    { hex: 'a5', repeat: Math.min(size - 17, BLOCK - 19) },
    { hex: 'a5', repeat: size - 17 - Math.min(size - 17, BLOCK - 19) },
  ] };
  const expected = materializedHashReference(whole);
  same(streamingHash(whole), expected, 'fixed block boundary');
  same(streamingHash(split), expected, 'block-independent transport chunking');
}

for (let test = 0; test < 1200; test += 1) {
  const leaves = ['/a/x', '/a/y', '/ab/x', '/ab/y', '/d/x'];
  const pages = Array.from({ length: randomInt(7) }, (_, page) => ({
    cursor: `opaque-${randomInt(5)}`,
    entries: Array.from({ length: randomInt(6) }, (_, entry) => {
      const kind = ['file', 'folder', 'delete'][randomInt(3)];
      const path = kind === 'file' ? leaves[randomInt(leaves.length)]
        : [...leaves, '/a', '/ab', '/d', '/absent'][randomInt(leaves.length + 4)];
      return kind === 'file' ? [kind, path, `r${page}-${entry}`] : [kind, path];
    }),
    commit: randomInt(6) !== 0,
  }));
  const input = { initialCursor: 'initial', initialFiles: { '/a/x': 'old', '/ab/x': 'keep' }, pages };
  same(replayMap(input), replayTrieReference(input), 'generated cursor checkpoint and component trie');
}

for (let test = 0; test < 1600; test += 1) {
  const length = randomInt(9);
  const matches = length ? Array.from({ length: randomInt(10) }, () => {
    const start = randomInt(length);
    return { start, end: start + 1 + randomInt(length - start), cost: randomInt(16) };
  }) : [];
  const input = { length, fallbackCost: randomInt(7), matches };
  same(segmentationDP(input), segmentationExhaustiveReference(input), 'generated exhaustive segmentation');
}

console.log(JSON.stringify({ questions: questions.length, workedExamples, independentComparisons: comparisons }));
