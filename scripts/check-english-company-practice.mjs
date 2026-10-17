import assert from 'node:assert/strict';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';
import { fileURLToPath } from 'node:url';

// Offline checks for the public company examples. No packets or HTTP requests are sent.
// Exhaustive, relational, or geometric oracles differ from the teaching solutions.
const root = new URL('../data/english/', import.meta.url);
const read = name => JSON.parse(fs.readFileSync(new URL(name, root), 'utf8'));
const sum = values => values.reduce((a, b) => a + b, 0);
const grid = (rows, columns, mask) => Array.from({ length: rows }, (_, r) =>
  Array.from({ length: columns }, (_, c) => (mask >> (r * columns + c)) & 1));
const sameMultiset = (a, b) => [...a].sort().join('') === [...b].sort().join('');
const sequences = function* (alphabet, length, prefix = []) {
  if (!length) { yield prefix; return; }
  for (const item of alphabet) yield* sequences(alphabet, length - 1, [...prefix, item]);
};

function hedgeOracle({ garden, years }) {
  const rows = garden.length, columns = garden[0].length;
  const cells = garden.flatMap((row, r) => row.map((_, c) => [r, c]));
  const adjacent = ([r, c], [s, t]) => Math.max(Math.abs(r - s), Math.abs(c - t)) === 1;
  const graph = cells.map(cell => cells.flatMap((other, i) => adjacent(cell, other) ? [i] : []));
  let state = garden.flat();
  for (let year = 0; year < years; year++) state = state.map((live, i) => {
    const count = graph[i].filter(j => state[j]).length;
    return live ? Number(count !== 8) : Number(count > 0);
  });
  let pairs = 0;
  for (let i = 0; i < rows * columns; i++) for (let j = i + 1; j < rows * columns; j++)
    if (state[i] && state[j] && adjacent(cells[i], cells[j])) pairs++;
  return pairs;
}
function hedgeStencil({ garden, years }) {
  const rows = garden.length, columns = garden[0].length;
  let state = garden.map(row => [...row]);
  for (let year = 0; year < years; year++) state = state.map((row, r) => row.map((live, c) => {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++)
      if (dr || dc) count += state[r + dr]?.[c + dc] || 0;
    return live ? Number(count !== 8) : Number(count > 0);
  }));
  let pairs = 0;
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) if (state[r][c])
    for (const [dr, dc] of [[0, 1], [1, -1], [1, 0], [1, 1]]) pairs += state[r + dr]?.[c + dc] || 0;
  return pairs;
}

function reorganizeExact(text) {
  const counts = new Map();
  for (const char of text) counts.set(char, (counts.get(char) || 0) + 1);
  const search = (last, remaining) => {
    if (!remaining) return true;
    for (const [char, count] of counts) if (count && char !== last) {
      counts.set(char, count - 1);
      const possible = search(char, remaining - 1);
      counts.set(char, count);
      if (possible) return true;
    }
    return false;
  };
  return search('', text.length);
}
function reorganizeSlots(text) {
  const counts = new Map();
  for (const char of text) counts.set(char, (counts.get(char) || 0) + 1);
  const largest = [...counts].reduce((best, item) => item[1] > best[1] ? item : best);
  if (largest[1] > Math.ceil(text.length / 2)) return '';
  const order = [largest, ...[...counts].filter(([char]) => char !== largest[0])];
  const result = Array(text.length);
  let index = 0;
  for (const [char, count] of order) for (let i = 0; i < count; i++) {
    if (index >= result.length) index = 1;
    result[index] = char; index += 2;
  }
  return result.join('');
}
function validateReorganized(input, output) {
  if (!output) { assert(!reorganizeExact(input), 'impossibility by exhaustive permutations'); return; }
  assert(sameMultiset(input, output), 'character multiplicities preserved');
  assert([...output].every((char, i) => !i || output[i - 1] !== char), 'unequal adjacent characters');
}

class MinHeap {
  constructor(items) {
    this.items = [...items];
    for (let i = Math.floor(items.length / 2) - 1; i >= 0; i--) this.down(i);
  }
  down(index) {
    const a = this.items;
    while (index * 2 + 1 < a.length) {
      let child = index * 2 + 1;
      if (child + 1 < a.length && a[child + 1][0] < a[child][0]) child++;
      if (a[index][0] <= a[child][0]) break;
      [a[index], a[child]] = [a[child], a[index]]; index = child;
    }
  }
  push(item) {
    const a = this.items; a.push(item);
    let i = a.length - 1;
    while (i && a[Math.floor((i - 1) / 2)][0] > a[i][0]) {
      const parent = Math.floor((i - 1) / 2);
      [a[i], a[parent]] = [a[parent], a[i]]; i = parent;
    }
  }
  pop() {
    const a = this.items, first = a[0], last = a.pop();
    if (a.length) { a[0] = last; this.down(0); }
    return first;
  }
}
function smallestPairsHeap({ A, B, k }) {
  const heap = new MinHeap(A.slice(0, k).map((value, i) => [value + B[0], i, 0])), result = [];
  while (result.length < k) {
    const [, i, j] = heap.pop(); result.push([A[i], B[j]]);
    if (j + 1 < B.length) heap.push([A[i] + B[j + 1], i, j + 1]);
  }
  return result;
}
function validateSmallestPairs({ A, B, k }, output) {
  const available = new Map(), all = [];
  for (const a of A) for (const b of B) {
    const key = JSON.stringify([a, b]); available.set(key, (available.get(key) || 0) + 1); all.push(a + b);
  }
  assert.equal(output.length, k);
  for (const pair of output) {
    const key = JSON.stringify(pair); assert(available.get(key) > 0, 'pair available with its multiplicity');
    available.set(key, available.get(key) - 1);
  }
  assert.deepEqual(output.map(([a, b]) => a + b).sort((a, b) => a - b),
    all.sort((a, b) => a - b).slice(0, k), 'Cartesian-product oracle with arbitrary ties');
}

class DenseSet {
  values = [];
  indices = new Map();
  insert(value) {
    if (this.indices.has(value)) return false;
    this.indices.set(value, this.values.length); this.values.push(value); return true;
  }
  remove(value) {
    if (!this.indices.has(value)) return false;
    const index = this.indices.get(value), last = this.values.at(-1);
    this.values[index] = last; this.indices.set(last, index);
    this.values.pop(); this.indices.delete(value); return true;
  }
}
function randomizedTrace(operations) {
  const actual = new DenseSet(), expected = new Set(), results = [];
  for (const [operation, value] of operations) {
    if (operation === 'getRandom') {
      assert.equal(expected.size, 1, 'published random examples deliberately have a deterministic singleton');
      results.push(actual.values[0]);
    } else {
      const changed = operation === 'insert' ? !expected.has(value) : expected.has(value);
      assert.equal(actual[operation](value), changed);
      expected[operation === 'insert' ? 'add' : 'delete'](value); results.push(changed);
    }
    assert.equal(actual.values.length, expected.size);
    assert.deepEqual([...actual.values].sort((a, b) => a - b), [...expected].sort((a, b) => a - b));
    assert.equal(actual.indices.size, expected.size);
    actual.values.forEach((item, index) => assert.equal(actual.indices.get(item), index, 'array/map invariant'));
    // Every possible uniform index names one distinct member: an exact probability argument, not a flaky sample.
    assert.equal(new Set(actual.values).size, actual.values.length);
  }
  return results;
}

function longestOracle({ movies }) {
  return movies.filter(movie => movies.every(other => movie[2] >= other[2])).sort((a, b) => a[0] - b[0]);
}
function actorsOracle({ movies, actors }) {
  const counts = movies.map(([id, title]) => [id, title, new Set(actors.filter(row => row[0] === id).map(row => row[1])).size]);
  return counts.filter(row => counts.every(other => row[2] >= other[2])).sort((a, b) => a[0] - b[0]);
}
function ratingsOracle({ movies }) {
  return [...new Set(movies.map(row => row[1]))].sort().map(rating => {
    const count = movies.filter(row => row[1] === rating).length;
    return [rating, count, 100 * count / movies.length];
  });
}
function sqlResult(db, kind, input) {
  db.exec('DROP TABLE IF EXISTS movies; DROP TABLE IF EXISTS actors;');
  if (kind === 'slack-longest-movie') {
    db.exec('CREATE TABLE movies(id INTEGER PRIMARY KEY, title TEXT NOT NULL, runtime INTEGER NOT NULL);');
    const insert = db.prepare('INSERT INTO movies VALUES(?,?,?)');
    input.movies.forEach(row => insert.run(...row));
    return db.prepare('SELECT id, title, runtime FROM movies WHERE runtime = (SELECT MAX(runtime) FROM movies) ORDER BY id').all().map(row => [row.id, row.title, row.runtime]);
  }
  if (kind === 'slack-most-actors') {
    db.exec('CREATE TABLE movies(id INTEGER PRIMARY KEY, title TEXT NOT NULL); CREATE TABLE actors(movie_id INTEGER, imdb_id TEXT NOT NULL);');
    const movie = db.prepare('INSERT INTO movies VALUES(?,?)'), actor = db.prepare('INSERT INTO actors VALUES(?,?)');
    input.movies.forEach(row => movie.run(...row)); input.actors.forEach(row => actor.run(...row));
    return db.prepare('WITH counts AS (SELECT m.id, m.title, COUNT(DISTINCT a.imdb_id) AS actor_count FROM movies AS m LEFT JOIN actors AS a ON a.movie_id = m.id GROUP BY m.id,m.title) SELECT id,title,actor_count FROM counts WHERE actor_count = (SELECT MAX(actor_count) FROM counts) ORDER BY id').all().map(row => [row.id, row.title, row.actor_count]);
  }
  db.exec('CREATE TABLE movies(id INTEGER PRIMARY KEY, rating TEXT NOT NULL);');
  const insert = db.prepare('INSERT INTO movies VALUES(?,?)'); input.movies.forEach(row => insert.run(...row));
  return db.prepare('SELECT rating,COUNT(*) AS movie_count,100.0*COUNT(*)/(SELECT COUNT(*) FROM movies) AS percentage FROM movies GROUP BY rating ORDER BY rating').all().map(row => [row.rating, row.movie_count, row.percentage]);
}

function routing(input) {
  const { variants, newClientDraws, returningCookie } = input;
  const result = { newClients: newClientDraws.map(u => variants[Math.floor(u * variants.length)]) };
  if (returningCookie !== undefined) {
    assert(variants.includes(returningCookie), 'published returning-cookie example has a valid assignment');
    result.returningClient = returningCookie;
  }
  return result;
}
function pingOracle({ sends, replies, deadlineMs, cutoffMs }) {
  const accepted = sends.flatMap(([id, sent]) => {
    const matching = replies.filter(([replyId, received]) => replyId === id && received >= sent &&
      received <= cutoffMs && received - sent < deadlineMs).sort((a, b) => a[1] - b[1]);
    return matching.length ? [[matching[0][1], matching[0][1] - sent]] : [];
  }).sort((a, b) => a[0] - b[0]);
  const rttMs = accepted.map(row => row[1]);
  return { received: accepted.length, lost: sends.length - accepted.length, rttMs,
    meanRttMs: rttMs.length ? sum(rttMs) / rttMs.length : null };
}
function pingStreaming({ sends, replies, deadlineMs, cutoffMs }) {
  const pending = new Map(sends), accepted = new Set(), rttMs = [];
  for (const [id, received] of replies) {
    if (received > cutoffMs || !pending.has(id) || accepted.has(id)) continue;
    const rtt = received - pending.get(id);
    if (rtt < 0 || rtt >= deadlineMs) continue;
    accepted.add(id); rttMs.push(rtt);
  }
  return { received: accepted.size, lost: sends.length - accepted.size, rttMs,
    meanRttMs: rttMs.length ? sum(rttMs) / rttMs.length : null };
}
function knightOracle({ square }) {
  const [file, rank] = square, x = file.charCodeAt(0) - 97, y = Number(rank) - 1, result = [];
  for (let a = 0; a < 8; a++) for (let b = 0; b < 8; b++)
    if (Math.abs(a - x) * Math.abs(b - y) === 2) result.push(String.fromCharCode(97 + a) + (b + 1));
  return result.sort();
}
function knightOffsets({ square }) {
  const x = square.charCodeAt(0) - 97, y = Number(square[1]) - 1;
  return [[1, 2], [1, -2], [-1, 2], [-1, -2], [2, 1], [2, -1], [-2, 1], [-2, -1]]
    .map(([a, b]) => [x + a, y + b]).filter(([a, b]) => a >= 0 && a < 8 && b >= 0 && b < 8)
    .map(([a, b]) => String.fromCharCode(97 + a) + (b + 1)).sort();
}
function ipv4Oracle({ address }) {
  return /^(?:0|[1-9][0-9]{0,2})(?:\.(?:0|[1-9][0-9]{0,2})){3}$/.test(address) && address.split('.').every(field => Number(field) <= 255);
}
function ipv4Scan({ address }) {
  let fields = 0, length = 0, value = 0, zero = false;
  for (let i = 0; i <= address.length; i++) {
    const char = address[i];
    if (i === address.length || char === '.') {
      if (!length || ++fields > 4) return false;
      length = 0; value = 0; zero = false;
    } else {
      if (char < '0' || char > '9' || length === 3 || (length && zero)) return false;
      if (!length) zero = char === '0';
      value = value * 10 + Number(char); length++;
      if (value > 255) return false;
    }
  }
  return fields === 4;
}
function relativesOracle({ records }) {
  const names = records.split(',');
  for (let j = 0; j < names.length; j++) for (let i = 0; i < j; i++)
    if (names[i].split(' ')[1] === names[j].split(' ')[1]) return [names[i], names[j]];
  return null;
}
function relativesHash({ records }) {
  const first = new Map();
  for (const name of records.split(',')) {
    const surname = name.split(' ')[1];
    if (first.has(surname)) return [first.get(surname), name];
    first.set(surname, name);
  }
  return null;
}
function lifeOracle({ size: [rows, columns], live }) {
  const result = [], alive = new Set(live.map(([r, c]) => r * columns + c));
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    let count = 0;
    for (const [s, t] of live) {
      const dr = Math.min(Math.abs(r - s), rows - Math.abs(r - s));
      const dc = Math.min(Math.abs(c - t), columns - Math.abs(c - t));
      if (Math.max(dr, dc) === 1) count++;
    }
    if (count === 3 || (count === 2 && alive.has(r * columns + c))) result.push([r, c]);
  }
  return result;
}
function lifeStencil({ size: [rows, columns], live }) {
  const alive = new Set(live.map(([r, c]) => r * columns + c)), result = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < columns; c++) {
    let count = 0;
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) if (dr || dc)
      count += Number(alive.has(((r + dr + rows) % rows) * columns + (c + dc + columns) % columns));
    if (count === 3 || (count === 2 && alive.has(r * columns + c))) result.push([r, c]);
  }
  return result;
}

export function auditCompanyPractice() {
  const samples = read('interviews-company-samples.json'), challenges = read('interviews-public-challenges.json');
  assert.equal(samples.length, 7); assert.equal(challenges.length, 6);
  const questions = [...samples, ...challenges], db = new DatabaseSync(':memory:');
  const counts = {}, compare = (name, actual, expected) => {
    assert.deepEqual(actual, expected, name + ' independent oracle'); counts[name] = (counts[name] || 0) + 1;
  };
  const oracles = {
    'asana-growing-hedges': hedgeOracle,
    'asana-randomized-set': randomizedTrace,
    'slack-longest-movie': longestOracle,
    'slack-most-actors': actorsOracle,
    'slack-rating-breakdown': ratingsOracle,
    'cloudflare-variant-routing': routing,
    'cloudflare-icmp-probes': pingOracle,
    'linkedin-knight-moves': knightOracle,
    'linkedin-ipv4-validation': ipv4Oracle,
    'linkedin-first-related-pair': relativesOracle,
    'linkedin-toroidal-life': lifeOracle
  };
  let workedExamples = 0;
  for (const question of questions) {
    const practice = question.id.startsWith('linkedin-') || ['asana-reorganize-string', 'asana-k-smallest-pairs', 'asana-randomized-set'].includes(question.id);
    assert.equal(question.sourceKind, practice ? 'official-practice' : 'company-sample', 'precise source class');
    assert.equal(question.checked, '2026-10-17');
    assert(question.sourceNote, 'source scope is explicit');
    if (question.id.startsWith('linkedin-')) {
      assert.equal(question.company, 'LinkedIn Learning');
      assert.match(question.sourceNote, /not [^.]*LinkedIn/, 'courses are not claimed hiring questions');
      assert.match(question.url, /^https:\/\/github.com\/LinkedInLearning\/cpp-code-challenges-3096958\/blob\/ac918634ae590f86aee7d9983df1eae2a591eeae\//);
    }
    if (question.id.startsWith('slack-')) assert.match(question.url, /^https:\/\/github.com\/slackhq\/backend-interview-prep-questions\/blob\/33a0b146af19bde1473123e5da0a6803d861c7d3\//);
    if (question.id.startsWith('cloudflare-')) {
      assert.match(question.sourceNote, /Historical/);
      assert.match(question.url, /^https:\/\/github.com\/cloudflare-internship-2020\/internship-application-(?:fullstack|systems)\/blob\/[0-9a-f]{40}\//);
    }
    if (practice && question.company === 'Asana') {
      assert(question.additionalSources.some(source => source.url.includes('1wVUna6BgzBm8l8iMgrbcKAToSNAUe2c6o65D8kR5i8U')), 'Asana recommendation link accompanies LC problem');
    }
    for (const example of question.examples) {
      if (question.id === 'asana-reorganize-string') validateReorganized(example.input, example.output);
      else if (question.id === 'asana-k-smallest-pairs') validateSmallestPairs(example.input, example.output);
      else {
        assert(oracles[question.id], 'every published example has an oracle');
        assert.deepEqual(oracles[question.id](example.input), example.output, question.id + ' published example');
      }
      if (question.id.startsWith('slack-')) compare(question.id, sqlResult(db, question.id, example.input), oracles[question.id](example.input));
      workedExamples++;
    }
  }

  for (const [rows, columns] of [[1, 1], [1, 4], [2, 3], [3, 3]])
    for (let mask = 0; mask < 1 << (rows * columns); mask++) for (let years = 0; years <= 3; years++) {
      const input = { garden: grid(rows, columns, mask), years };
      compare('hedges', hedgeStencil(input), hedgeOracle(input));
    }
  // Cover every multiset of three characters up to length eight, with distinct insertion orders.
  for (let a = 0; a <= 8; a++) for (let b = 0; b <= 8 - a; b++) for (let c = 0; c <= 8 - a - b; c++) {
    if (!a && !b && !c) continue;
    for (const order of [['a', a, 'b', b, 'c', c], ['c', c, 'a', a, 'b', b], ['b', b, 'c', c, 'a', a]]) {
      const input = order[0].repeat(order[1]) + order[2].repeat(order[3]) + order[4].repeat(order[5]);
      const output = reorganizeSlots(input); validateReorganized(input, output);
      compare('reorganize', Boolean(output), reorganizeExact(input));
    }
  }
  const arrays = [[-2], [0], [2], [-2, -2], [-2, 1], [0, 0], [0, 2], [-2, -2, 1], [-2, 0, 2], [1, 1, 1]];
  for (const A of arrays) for (const B of arrays) for (let k = 1; k <= A.length * B.length; k++) {
    validateSmallestPairs({ A, B, k }, smallestPairsHeap({ A, B, k }));
    counts.smallestPairs = (counts.smallestPairs || 0) + 1;
  }
  for (const operations of sequences([['insert', -1], ['insert', 2], ['remove', -1], ['remove', 2]], 6)) {
    randomizedTrace(operations); counts.randomizedSet = (counts.randomizedSet || 0) + 1;
  }
  for (let seed = 0; seed < 100; seed++) {
    const movies = Array.from({ length: seed % 6 }, (_, i) => [i + 1, i % 2 ? 'Same title' : 'Other', (seed * (i + 2) + i) % 4]);
    compare('longestSQL', sqlResult(db, 'slack-longest-movie', { movies }), longestOracle({ movies }));
    const credits = Array.from({ length: seed % 13 }, (_, i) => [i % 7 + 1, 'person' + (seed * (i + 1) % 3)]);
    const actorInput = { movies: movies.map(row => row.slice(0, 2)), actors: credits };
    compare('actorsSQL', sqlResult(db, 'slack-most-actors', actorInput), actorsOracle(actorInput));
    const ratingInput = { movies: movies.map(([id], i) => [id, ['N/A', 'PG', 'R'][(seed + i * 2) % 3]]) };
    compare('ratingsSQL', sqlResult(db, 'slack-rating-breakdown', ratingInput), ratingsOracle(ratingInput));
  }
  db.close();
  // Uniform index intervals have equal lengths. Boundary draws must enter the next interval.
  for (let variants = 1; variants <= 20; variants++) {
    const labels = Array.from({ length: variants }, (_, i) => 'v' + i), selections = [];
    for (let i = 0; i < variants; i++) selections.push(routing({ variants: labels, newClientDraws: [(i + 0.5) / variants] }).newClients[0]);
    compare('routing', selections, labels);
  }
  compare('routing', routing({ variants: ['A', 'B'], newClientDraws: [0, 0.5, 1 - Number.EPSILON] }).newClients, ['A', 'B', 'B']);
  for (let seed = 0; seed < 150; seed++) {
    const input = { sends: [[1, 0], [2, 10], [3, 20]], deadlineMs: seed % 4 * 10 + 10, cutoffMs: 75,
      replies: Array.from({ length: 8 }, (_, i) => [(seed + i * 3) % 5, (seed * (i + 1) + i * 13) % 100]).sort((a, b) => a[1] - b[1]) };
    compare('ping', pingStreaming(input), pingOracle(input));
  }
  compare('ping', pingStreaming({ sends: [[1, 0]], replies: [[1, -1], [9, 1], [1, 49], [1, 49.5]], deadlineMs: 50, cutoffMs: 100 }),
    { received: 1, lost: 0, rttMs: [49], meanRttMs: 49 });
  for (let file = 0; file < 8; file++) for (let rank = 1; rank <= 8; rank++) {
    const input = { square: String.fromCharCode(97 + file) + rank };
    compare('knight', knightOffsets(input), knightOracle(input));
  }
  const fields = ['', '0', '00', '01', '1', '9', '10', '99', '100', '255', '256', '999', '1000', '+1', '-1', ' 1', '1 ', '1x', '١'];
  for (let position = 0; position < 4; position++) for (const field of fields) {
    const octets = ['192', '0', '2', '7']; octets[position] = field;
    const input = { address: octets.join('.') }; compare('ipv4', ipv4Scan(input), ipv4Oracle(input));
  }
  for (const address of ['', '1', '1.2.3', '1.2.3.4.', '.1.2.3.4', '1.2.3.4\n', '1.2.3.4\u0000', '255.255.255.255', '0.0.0.0']) {
    const input = { address }; compare('ipv4', ipv4Scan(input), ipv4Oracle(input));
  }
  for (let length = 1; length <= 6; length++) for (const surnames of sequences(['Chen', 'Diaz', 'chen'], length)) {
    const records = surnames.map((surname, i) => 'Name' + i + ' ' + surname).join(',');
    compare('relatives', relativesHash({ records }), relativesOracle({ records }));
  }
  for (let mask = 0; mask < 512; mask++) {
    const live = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) if (mask & (1 << (r * 3 + c))) live.push([r === 2 ? 9 : r, c === 2 ? 9 : c]);
    const input = { size: [10, 10], live }; compare('life', lifeStencil(input), lifeOracle(input));
  }
  for (let seed = 0; seed < 60; seed++) {
    const live = [];
    for (let r = 0; r < 10; r++) for (let c = 0; c < 10; c++) if ((seed * (r + 3) + c * c + r * c) % 7 < 2) live.push([r, c]);
    const input = { size: [10, 10], live }; compare('life', lifeStencil(input), lifeOracle(input));
  }
  return { questions: questions.length, workedExamples, independentChecks: sum(Object.values(counts)), checksByTopic: counts, networkProbes: 0 };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(JSON.stringify(auditCompanyPractice(), null, 2));
