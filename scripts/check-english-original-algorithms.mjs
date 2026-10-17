import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Standard-library, offline references for the English algorithm records.
// Direct models check published answers; bounded comparisons audit the risky
// efficient recurrences separately from those references.
const records = JSON.parse(readFileSync(new URL('../data/english/interviews-original.json', import.meta.url), 'utf8'));
const questions = records.filter(question => /^algo-\d\d$/.test(question.id));
assert.deepEqual(questions.map(question => question.id).sort(),
  Array.from({ length: 18 }, (_, i) => `algo-${String(i + 1).padStart(2, '0')}`));
const counts = {};
let workedExamples = 0;
function same(topic, actual, expected, label = topic) {
  assert.deepEqual(actual, expected, label);
  counts[topic] = (counts[topic] ?? 0) + 1;
}
function* sequences(alphabet, length, prefix = []) {
  if (!length) { yield prefix; return; }
  for (const value of alphabet) yield* sequences(alphabet, length - 1, [...prefix, value]);
}
const sum = values => values.reduce((total, value) => total + value, 0);
const positions = row => row.flatMap((value, index) => value ? [index] : []);

function encodeRuns(text) {
  return (text.match(/([a-z])\1*/g) ?? []).map(run => `${run.length}${run[0]}`).join('');
}
function robotExact(rows, robots) {
  if (!Number.isInteger(robots) || robots < 0 || !rows.length || !rows[0].length ||
      rows.some(row => row.length !== rows[0].length || row.some(x => x !== 0 && x !== 1) || sum(row) !== robots)) return false;
  for (let time = 1; time < rows.length; time++) {
    const old = positions(rows[time - 1]), next = positions(rows[time]);
    function assign(index, used) {
      if (index === next.length) return true;
      return old.some((value, j) => !used.has(j) && Math.abs(value - next[index]) <= 1 &&
        assign(index + 1, new Set([...used, j])));
    }
    if (!assign(0, new Set())) return false;
  }
  return true;
}
function robotOrdered(rows, robots) {
  if (!Number.isInteger(robots) || robots < 0 || !rows.length || !rows[0].length ||
      rows.some(row => row.length !== rows[0].length || row.some(x => x !== 0 && x !== 1) || sum(row) !== robots)) return false;
  for (let time = 1; time < rows.length; time++) {
    const old = positions(rows[time - 1]), next = positions(rows[time]);
    if (next.some((value, i) => Math.abs(value - old[i]) > 1)) return false;
  }
  return true;
}
function streamSorted(values, k) {
  return values.map((_, index) => index + 1 < k ? null :
    values.slice(0, index + 1).sort((a, b) => b - a)[k - 1]);
}
function wordDirect(words, pattern) {
  return words.some(word => word.length === pattern.length &&
    [...pattern].every((character, i) => character === '.' || character === word[i]));
}
function wordTrie(words, pattern) {
  const root = { children: new Map(), end: false };
  for (const word of words) {
    let node = root;
    for (const character of word) {
      if (!node.children.has(character)) node.children.set(character, { children: new Map(), end: false });
      node = node.children.get(character);
    }
    node.end = true;
  }
  function search(node, index) {
    if (index === pattern.length) return node.end;
    if (pattern[index] === '.') return [...node.children.values()].some(child => search(child, index + 1));
    return node.children.has(pattern[index]) && search(node.children.get(pattern[index]), index + 1);
  }
  return search(root, 0);
}
function distancesFloyd(vertices, edges, source) {
  const distance = Array.from({ length: vertices }, (_, i) =>
    Array.from({ length: vertices }, (_, j) => i === j ? 0 : Infinity));
  for (const [u, v, weight] of edges) distance[u][v] = Math.min(distance[u][v], weight);
  for (let k = 0; k < vertices; k++) for (let i = 0; i < vertices; i++) for (let j = 0; j < vertices; j++)
    distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
  return distance[source];
}
function distanceLabels(vertices, edges, source) {
  const distance = Array(vertices).fill(Infinity), settled = new Set();
  distance[source] = 0;
  while (settled.size < vertices) {
    let u = -1;
    for (let v = 0; v < vertices; v++) if (!settled.has(v) && (u < 0 || distance[v] < distance[u])) u = v;
    if (distance[u] === Infinity) break;
    settled.add(u);
    for (const [a, b, weight] of edges) if (a === u) distance[b] = Math.min(distance[b], distance[u] + weight);
  }
  return distance;
}
function networkDelay(vertices, edges, source) {
  const maximum = Math.max(...distancesFloyd(vertices, edges, source));
  return maximum === Infinity ? -1 : maximum;
}
function removedIntervals(intervals) {
  let retained = 0;
  for (let mask = 0; mask < 2 ** intervals.length; mask++) {
    const chosen = intervals.filter((_, i) => mask & 2 ** i).sort((a, b) => a[0] - b[0]);
    if (chosen.every((interval, i) => !i || chosen[i - 1][1] <= interval[0])) retained = Math.max(retained, chosen.length);
  }
  return intervals.length - retained;
}
function reachable(vertices, edges) {
  const seen = new Set([1]), queue = [1];
  for (const u of queue) for (const [a, b] of edges) {
    const v = a === u ? b : b === u ? a : null;
    if (v !== null && !seen.has(v)) { seen.add(v); queue.push(v); }
  }
  return seen.size === vertices;
}
function redundantExact(edges) {
  const vertices = new Set(edges.flat()).size;
  for (let i = edges.length - 1; i >= 0; i--)
    if (reachable(vertices, edges.filter((_, j) => j !== i))) return edges[i];
  return null;
}
function redundantDsu(edges) {
  const parent = new Map(), size = new Map();
  for (const vertex of edges.flat()) { parent.set(vertex, vertex); size.set(vertex, 1); }
  function find(vertex) {
    if (parent.get(vertex) !== vertex) parent.set(vertex, find(parent.get(vertex)));
    return parent.get(vertex);
  }
  for (const [u, v] of edges) {
    let a = find(u), b = find(v);
    if (a === b) return [u, v];
    if (size.get(a) < size.get(b)) [a, b] = [b, a];
    parent.set(b, a); size.set(a, size.get(a) + size.get(b));
  }
  return null;
}
function prefixNaive(pattern) {
  return [...pattern].map((_, end) => {
    let best = 0;
    for (let length = 1; length <= end; length++)
      if (pattern.slice(0, length) === pattern.slice(end + 1 - length, end + 1)) best = length;
    return best;
  });
}
function kmp(text, pattern) {
  if (!pattern.length) return { position: 0, prefix: [] };
  const prefix = Array(pattern.length).fill(0);
  for (let i = 1, matched = 0; i < pattern.length; i++) {
    while (matched && pattern[i] !== pattern[matched]) matched = prefix[matched - 1];
    if (pattern[i] === pattern[matched]) matched++;
    prefix[i] = matched;
  }
  for (let i = 0, matched = 0; i < text.length; i++) {
    while (matched && text[i] !== pattern[matched]) matched = prefix[matched - 1];
    if (text[i] === pattern[matched]) matched++;
    if (matched === pattern.length) return { position: i - matched + 1, prefix };
  }
  return { position: -1, prefix };
}
function rangeDirect(values, operations) {
  const current = [...values], output = [];
  for (const operation of operations) {
    if (operation[0] === 'update') current[operation[1]] = operation[2];
    else output.push(sum(current.slice(operation[1], operation[2] + 1)));
  }
  return output;
}
function coinsBreadthFirst(coins, amount) {
  const queue = [[0, 0]], seen = new Set([0]);
  for (const [value, used] of queue) {
    if (value === amount) return used;
    for (const coin of coins) if (value + coin <= amount && !seen.has(value + coin)) {
      seen.add(value + coin); queue.push([value + coin, used + 1]);
    }
  }
  return -1;
}
function neighbors(index, rows, columns) {
  const row = Math.floor(index / columns), column = index % columns;
  return [row > 0 ? index - columns : -1, row + 1 < rows ? index + columns : -1,
    column > 0 ? index - 1 : -1, column + 1 < columns ? index + 1 : -1].filter(value => value >= 0);
}
function effortThreshold(grid) {
  const rows = grid.length, columns = grid[0].length, values = grid.flat(), candidates = new Set([0]);
  for (let u = 0; u < values.length; u++) for (const v of neighbors(u, rows, columns)) candidates.add(Math.abs(values[u] - values[v]));
  for (const threshold of [...candidates].sort((a, b) => a - b)) {
    const seen = new Set([0]), queue = [0];
    for (const u of queue) for (const v of neighbors(u, rows, columns))
      if (!seen.has(v) && Math.abs(values[u] - values[v]) <= threshold) { seen.add(v); queue.push(v); }
    if (seen.has(values.length - 1)) return threshold;
  }
  throw new Error('A rectangular grid must be connected');
}
function effortLabels(grid) {
  const rows = grid.length, columns = grid[0].length, values = grid.flat();
  const distance = Array(values.length).fill(Infinity), settled = new Set();
  distance[0] = 0;
  while (settled.size < values.length) {
    let u = -1;
    for (let v = 0; v < values.length; v++) if (!settled.has(v) && (u < 0 || distance[v] < distance[u])) u = v;
    settled.add(u);
    for (const v of neighbors(u, rows, columns)) distance[v] = Math.min(distance[v], Math.max(distance[u], Math.abs(values[u] - values[v])));
  }
  return distance.at(-1);
}
function xorPairs(values) {
  let best = 0;
  for (let i = 0; i < values.length; i++) for (let j = i; j < values.length; j++) best = Math.max(best, values[i] ^ values[j]);
  return best;
}
function shortestDirect(values, target, missing) {
  let best = Infinity;
  for (let left = 0; left < values.length; left++) {
    let total = 0;
    for (let right = left; right < values.length; right++) {
      total += values[right];
      if (total >= target) best = Math.min(best, right - left + 1);
    }
  }
  return best === Infinity ? missing : best;
}
function shortestDeque(values, target) {
  const prefix = [0];
  for (const value of values) prefix.push(prefix.at(-1) + value);
  const deque = []; let head = 0, best = Infinity;
  for (let end = 0; end < prefix.length; end++) {
    while (head < deque.length && prefix[end] - prefix[deque[head]] >= target)
      best = Math.min(best, end - deque[head++]);
    while (head < deque.length && prefix[deque.at(-1)] >= prefix[end]) deque.pop();
    deque.push(end);
  }
  return best === Infinity ? -1 : best;
}
function serialize(tree) {
  if (tree === null) return '#';
  return `${tree.value},${serialize(tree.left)},${serialize(tree.right)}`;
}
function deserialize(encoded) {
  const tokens = encoded.split(','); let cursor = 0;
  function parse() {
    assert(cursor < tokens.length, 'truncated tree');
    const token = tokens[cursor++];
    if (token === '#') return null;
    assert(/^-?\d+$/.test(token), 'invalid value token');
    const value = Number(token);
    assert(Number.isSafeInteger(value), 'unsafe tree value');
    return { value, left: parse(), right: parse() };
  }
  const tree = parse();
  assert.equal(cursor, tokens.length, 'trailing tree tokens');
  return tree;
}
function smallerDirect(values) {
  return values.map((value, i) => values.slice(i + 1).filter(other => other < value).length);
}
function smallerCompressed(values) {
  const sorted = [...new Set(values)].sort((a, b) => a - b);
  const ranks = new Map(sorted.map((value, i) => [value, i + 1]));
  const tree = Array(sorted.length + 1).fill(0), output = Array(values.length);
  for (let i = values.length - 1; i >= 0; i--) {
    const rank = ranks.get(values[i]); let count = 0;
    for (let j = rank - 1; j > 0; j -= j & -j) count += tree[j];
    output[i] = count;
    for (let j = rank; j < tree.length; j += j & -j) tree[j]++;
  }
  return output;
}
function cooldownFormula(tasks, cooldown) {
  if (!tasks.length) return 0;
  const counts = new Map();
  for (const task of tasks) counts.set(task, (counts.get(task) ?? 0) + 1);
  const maximum = Math.max(...counts.values());
  const tied = [...counts.values()].filter(count => count === maximum).length;
  return Math.max(tasks.length, (maximum - 1) * (cooldown + 1) + tied);
}
function cooldownExact(tasks, cooldown) {
  const labels = [...new Set(tasks)];
  const initial = labels.map(label => tasks.filter(task => task === label).length), memo = new Map();
  function solve(remaining, waits) {
    if (!sum(remaining)) return 0;
    const key = `${remaining.join(',')}|${waits.join(',')}`;
    if (memo.has(key)) return memo.get(key);
    const nextWaits = waits.map(wait => Math.max(0, wait - 1));
    let best = Infinity;
    for (let i = 0; i < labels.length; i++) if (remaining[i] && !waits[i]) {
      const next = [...remaining], after = [...nextWaits];
      next[i]--; after[i] = cooldown;
      best = Math.min(best, 1 + solve(next, after));
    }
    // Include deliberate idle intervals, even if a task is eligible. An idle
    // when no timer is positive changes no state and can never help.
    if (waits.some(wait => wait > 0)) best = Math.min(best, 1 + solve(remaining, nextWaits));
    memo.set(key, best);
    return best;
  }
  return solve(initial, initial.map(() => 0));
}

// Published example adapters are kept explicit so changes in fixture semantics
// fail instead of silently falling back to a different field or convention.
const references = {
  'algo-01': input => encodeRuns(input.s),
  'algo-02': input => {
    assert(Number.isInteger(input.width) && input.width > 0, 'snapshot fixture width');
    const rows = input.positionsByRow.map(occupied => {
      assert.equal(new Set(occupied).size, occupied.length, 'duplicate occupied position');
      assert(occupied.every(index => Number.isInteger(index) && index >= 0 && index < input.width), 'occupied position out of range');
      return Array.from({ length: input.width }, (_, index) => occupied.includes(index) ? 1 : 0);
    });
    return robotExact(rows, input.robotCount);
  },
  'algo-03': input => streamSorted(input.stream, input.k),
  'algo-04': input => input.patterns.map(pattern => wordDirect(input.words, pattern)),
  'algo-05': input => networkDelay(input.vertices.length,
    input.edges.map(([u, v, weight]) => [input.vertices.indexOf(u), input.vertices.indexOf(v), weight]),
    input.vertices.indexOf(input.source)),
  'algo-06': input => input.lists.flat().sort((a, b) => a - b),
  'algo-07': input => removedIntervals(input.intervals),
  'algo-08': input => redundantExact(input.edges),
  'algo-09': input => {
    assert.equal(input.indexBase, 0, 'KMP example uses zero-based indices');
    return input.text.indexOf(input.pattern);
  },
  'algo-10': input => {
    assert.equal(input.indexBase, 0, 'range example uses zero-based indices');
    return rangeDirect(input.array, input.operations);
  },
  'algo-11': input => coinsBreadthFirst(input.coins, input.amount),
  'algo-12': input => effortThreshold(input.heights),
  'algo-13': input => xorPairs(input.nums),
  'algo-14': input => shortestDirect(input.array, input.target, 0),
  'algo-15': input => shortestDirect(input.array, input.k, -1),
  'algo-16': input => {
    const normalize = node => node === null ? null :
      ({ value: node.root, left: normalize(node.left), right: normalize(node.right) });
    const tree = normalize(input), encoded = serialize(tree);
    same('publishedTreeRoundTrip', deserialize(encoded), tree);
    return encoded;
  },
  'algo-17': input => smallerDirect(input.array),
  'algo-18': input => cooldownExact(input.tasks, input.cooldown),
};
for (const question of questions) {
  assert(question.examples.length > 0, `${question.id}: missing worked example`);
  for (const [index, example] of question.examples.entries()) {
    same('publishedExamples', references[question.id](example.input), example.output, `${question.id} example ${index + 1}`);
    workedExamples++;
  }
}

// One-dimensional bottleneck matching versus all distinct assignments.
for (let width = 1; width <= 6; width++) {
  const rows = [...sequences([0, 1], width)];
  for (const old of rows) for (const next of rows)
    same('robotMatching', robotOrdered([old, next], sum(old)), robotExact([old, next], sum(old)));
}
for (const [rows, robots] of [[[[0, 0], [0, 0]], 0], [[[1, 0], [0]], 1], [[[2]], 1], [[[1]], -1]])
  same('robotValidation', robotOrdered(rows, robots), robotExact(rows, robots));

const words = ['', 'a', 'ab', 'ba', 'baa', 'bbb'];
for (let length = 0; length <= 4; length++) for (const pattern of sequences(['a', 'b', '.'], length))
  same('wildcards', wordTrie(words, pattern.join('')), wordDirect(words, pattern.join('')));

// Enumerate absent/zero/unit directed edges, including cycles and disconnection.
const edgePairs = [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]];
for (const states of sequences([-1, 0, 1], edgePairs.length)) {
  const edges = edgePairs.flatMap(([u, v], i) => states[i] < 0 ? [] : [[u, v, states[i]]]);
  for (let source = 0; source < 3; source++)
    same('shortestPaths', distanceLabels(3, edges, source), distancesFloyd(3, edges, source));
}

const undirected = [[1, 2], [1, 3], [1, 4], [2, 3], [2, 4], [3, 4]];
for (let mask = 0; mask < 2 ** undirected.length; mask++) {
  const edges = undirected.filter((_, i) => mask & 2 ** i);
  if (edges.length !== 4 || !reachable(4, edges)) continue;
  function* permutations(items) {
    if (!items.length) { yield []; return; }
    for (let i = 0; i < items.length; i++) for (const tail of permutations(items.filter((_, j) => i !== j))) yield [items[i], ...tail];
  }
  for (const ordered of permutations(edges)) same('dsuTieRule', redundantDsu(ordered), redundantExact(ordered));
}

for (let length = 0; length <= 5; length++) for (const patternArray of sequences(['a', 'b'], length)) {
  const pattern = patternArray.join('');
  same('prefixFunction', kmp('', pattern).prefix, prefixNaive(pattern));
  for (let textLength = 0; textLength <= 5; textLength++) for (const text of sequences(['a', 'b'], textLength))
    same('kmpSearch', kmp(text.join(''), pattern).position, text.join('').indexOf(pattern));
}

for (const values of sequences([0, 1, 3], 4)) {
  const grid = [values.slice(0, 2), values.slice(2)];
  same('minimaxGrid', effortLabels(grid), effortThreshold(grid));
}
for (const grid of [[[5]], [[1, 1, 1]], [[1], [8], [2]]])
  same('minimaxGrid', effortLabels(grid), effortThreshold(grid));

for (let length = 0; length <= 6; length++) for (const values of sequences([-1, 0, 2], length)) {
  for (let target = 1; target <= 4; target++)
    same('signedSubarrays', shortestDeque(values, target), shortestDirect(values, target, -1));
  same('rankCompression', smallerCompressed(values), smallerDirect(values));
}

for (const frequencies of sequences([0, 1, 2, 3], 3)) {
  const tasks = frequencies.flatMap((count, i) => Array(count).fill(String.fromCharCode(65 + i)));
  for (let cooldown = 0; cooldown <= 3; cooldown++)
    same('cooldownFormula', cooldownFormula(tasks, cooldown), cooldownExact(tasks, cooldown));
}
for (const encoded of ['#', '4,2,#,#,#', '4,#,2,#,#', '-12,#,0,#,#'])
  same('treeRoundTrip', serialize(deserialize(encoded)), encoded);
for (const malformed of ['', '4,#', '4,#,#,#', '4,x,#,#,#', '#,#'])
  assert.throws(() => deserialize(malformed), `reject malformed tree ${malformed}`);
same('xorSingleton', xorPairs([7]), 0);
same('streamDuplicates', streamSorted([7, 7, 7], 2), [null, 7, 7]);
same('coinUnreachable', coinsBreadthFirst([2], 3), -1);
same('coinZero', coinsBreadthFirst([2], 0), 0);
same('compressionBoundary', encodeRuns('bb' + 'ba'), '3b1a');

console.log(JSON.stringify({ originalAlgorithmQuestions: questions.length, workedExamples,
  independentComparisons: sum(Object.values(counts)), checksByTopic: counts, networkRequests: 0 }));
