import assert from 'node:assert/strict';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

// Small exhaustive oracles audit the published examples and the stated recurrences.
// They intentionally use different methods from the efficient teaching solutions.
const root = new URL('../data/english/', import.meta.url);
const read = name => JSON.parse(fs.readFileSync(new URL(name, root), 'utf8'));
const MOD = 1_000_000_007n;
const sum = values => values.reduce((a, b) => a + b, 0);
const sign = Math.sign;
const sequences = function* (alphabet, length, prefix = []) {
  if (!length) { yield prefix; return; }
  for (const value of alphabet) yield* sequences(alphabet, length - 1, [...prefix, value]);
};
const neighbors = (index, rows, columns) => {
  const r = Math.floor(index / columns), c = index % columns, result = [];
  if (r) result.push(index - columns);
  if (r + 1 < rows) result.push(index + columns);
  if (c) result.push(index - 1);
  if (c + 1 < columns) result.push(index + 1);
  return result;
};

function harvestExact(intervals, duration) {
  const needed = [...new Set(intervals.flatMap(([start, end]) =>
    Array.from({ length: end - start }, (_, i) => start + i)))].sort((a, b) => a - b);
  if (!needed.length) return 0;
  assert(needed.length < 22, 'small exhaustive coverage fixture');
  const full = (1 << needed.length) - 1, covers = [];
  for (let start = needed[0] - duration + 1; start <= needed.at(-1); start++) {
    covers.push(needed.reduce((mask, point, i) =>
      point >= start && point < start + duration ? mask | (1 << i) : mask, 0));
  }
  const memo = new Map([[full, 0]]);
  const search = mask => {
    if (memo.has(mask)) return memo.get(mask);
    const first = needed.findIndex((_, i) => !(mask & (1 << i)));
    const best = 1 + Math.min(...covers.filter(bits => bits & (1 << first)).map(bits => search(mask | bits)));
    memo.set(mask, best); return best;
  };
  return search(0);
}
function harvestGreedy(intervals, duration) {
  let until = 0, count = 0;
  for (const [start, end] of [...intervals].sort((a, b) => a[0] - b[0])) {
    const first = Math.max(start, until);
    if (first < end) { const add = Math.ceil((end - first) / duration); count += add; until = first + add * duration; }
  }
  return count;
}

function slidesMatrix(vertices, target) {
  const wanted = BigInt(target), maximum = 1n << BigInt(vertices - 2);
  if (wanted > maximum) return null;
  const matrix = Array.from({ length: vertices }, () => Array(vertices).fill(0));
  for (let i = 1; i < vertices; i++) for (let j = i + 1; j < vertices; j++) matrix[i][j] = 1;
  let remaining = wanted;
  for (let i = 1; i < vertices - 1; i++) {
    const paths = 1n << BigInt(vertices - i - 2);
    if (remaining >= paths) { matrix[0][i] = 1; remaining -= paths; }
  }
  if (remaining) matrix[0][vertices - 1] = 1;
  return matrix.map(row => row.join(''));
}
function pathsByEnumeration(matrix) {
  const visit = vertex => vertex === matrix.length - 1 ? 1n :
    [...matrix[vertex]].reduce((count, bit, next) => count + (bit === '1' ? visit(next) : 0n), 0n);
  return visit(0);
}
function validateSlides(input, output) {
  const { B, M } = input, maximum = 1n << BigInt(B - 2);
  assert.equal(output.possible, BigInt(M) <= maximum, 'Slides feasibility');
  if (!output.possible) return;
  assert.equal(output.adjacency.length, B);
  output.adjacency.forEach((row, i) => {
    assert.match(row, new RegExp(`^[01]{${B}}$`));
    for (let j = 0; j <= i; j++) assert.equal(row[j], '0', 'published construction is acyclic');
  });
  assert.equal(pathsByEnumeration(output.adjacency), BigInt(M), 'exact number of constructed routes');
}

function pianoExact(notes) {
  let best = notes.length;
  const search = (i, previous, cost) => {
    if (cost >= best) return;
    if (i === notes.length) { best = cost; return; }
    for (let key = 0; key < 4; key++) search(i + 1, key, cost +
      (i && sign(key - previous) !== sign(notes[i] - notes[i - 1]) ? 1 : 0));
  };
  search(0, 0, 0); return best;
}
function pianoDP(notes) {
  let state = [0, 0, 0, 0];
  for (let i = 1; i < notes.length; i++) state = state.map((_, key) =>
    Math.min(...state.map((cost, previous) => cost +
      (sign(key - previous) === sign(notes[i] - notes[i - 1]) ? 0 : 1))));
  return Math.min(...state);
}

function moonsExact({ X, Y, S }) {
  let best = Infinity;
  const search = (i, text) => {
    if (i === S.length) {
      let cost = 0;
      for (let j = 1; j < text.length; j++) if (text[j] !== text[j - 1]) cost += text[j - 1] === 'C' ? X : Y;
      best = Math.min(best, cost); return;
    }
    for (const letter of S[i] === '?' ? ['C', 'J'] : [S[i]]) search(i + 1, text + letter);
  };
  search(0, ''); return best;
}
function moonsDP({ X, Y, S }) {
  let c = S[0] === 'J' ? Infinity : 0, j = S[0] === 'C' ? Infinity : 0;
  for (const letter of S.slice(1)) [c, j] = [letter === 'J' ? Infinity : Math.min(c, j + Y),
    letter === 'C' ? Infinity : Math.min(j, c + X)];
  return Math.min(c, j);
}

function prefixLength(words) {
  let length = 0;
  while (words.every(word => length < word.length && word[length] === words[0][length])) length++;
  return length;
}
function bundlingExact(words, size) {
  const choose = function* (items, count, start = 0, picked = []) {
    if (!count) { yield picked; return; }
    for (let i = start; i <= items.length - count; i++) yield* choose(items, count - 1, i + 1, [...picked, items[i]]);
  };
  const search = indices => {
    if (!indices.length) return 0;
    let best = 0;
    for (const others of choose(indices.slice(1), size - 1)) {
      const group = [indices[0], ...others], selected = new Set(group);
      best = Math.max(best, prefixLength(group.map(i => words[i])) + search(indices.filter(i => !selected.has(i))));
    }
    return best;
  };
  return search(words.map((_, i) => i));
}
function bundlingTrie(words, size) {
  const trie = { end: 0, children: new Map() };
  for (const word of words) {
    let node = trie;
    for (const letter of word) {
      if (!node.children.has(letter)) node.children.set(letter, { end: 0, children: new Map() });
      node = node.children.get(letter);
    }
    node.end++;
  }
  let score = 0;
  const visit = (node, depth) => {
    let count = node.end;
    for (const child of node.children.values()) count += visit(child, depth + 1);
    score += depth * Math.floor(count / size); return count % size;
  };
  visit(trie, 0); return score;
}

function candiesDirect({ values, operations }) {
  const array = values.map(BigInt), queryScores = [];
  for (const [op, left, right] of operations) {
    if (op === 'U') array[left - 1] = BigInt(right);
    else queryScores.push(array.slice(left - 1, right).reduce((total, value, offset) =>
      total + (offset % 2 ? -1n : 1n) * value * BigInt(offset + 1), 0n));
  }
  return { queryScores, total: queryScores.reduce((a, b) => a + b, 0n) };
}
function candiesFenwick({ values, operations }) {
  const array = values.map(BigInt), n = array.length, base = Array(n + 1).fill(0n), weighted = Array(n + 1).fill(0n);
  const add = (tree, i, delta) => { for (; i <= n; i += i & -i) tree[i] += delta; };
  const prefix = (tree, i) => { let value = 0n; for (; i; i -= i & -i) value += tree[i]; return value; };
  const range = (tree, left, right) => prefix(tree, right) - prefix(tree, left - 1);
  const update = (i, delta) => { const signed = (i % 2 ? 1n : -1n) * delta; add(base, i, signed); add(weighted, i, BigInt(i) * signed); };
  array.forEach((value, i) => update(i + 1, value));
  const queryScores = [];
  for (const [op, left, right] of operations) {
    if (op === 'U') { update(left, BigInt(right) - array[left - 1]); array[left - 1] = BigInt(right); }
    else queryScores.push((left % 2 ? 1n : -1n) * (range(weighted, left, right) - BigInt(left - 1) * range(base, left, right)));
  }
  return { queryScores, total: queryScores.reduce((a, b) => a + b, 0n) };
}

function travelReachability(incoming, outgoing) {
  return [...incoming].map((_, start) => {
    const reachable = new Set([start]);
    for (const current of reachable) for (const next of [current - 1, current + 1]) {
      if (next >= 0 && next < incoming.length && outgoing[current] === 'Y' && incoming[next] === 'Y') reachable.add(next);
    }
    return [...incoming].map((_, i) => reachable.has(i) ? 'Y' : 'N').join('');
  });
}
function travelScan(incoming, outgoing) {
  return [...incoming].map((_, start) => {
    const row = Array(incoming.length).fill('N'); row[start] = 'Y';
    for (const direction of [-1, 1]) for (let p = start, next = p + direction;
      next >= 0 && next < incoming.length && outgoing[p] === 'Y' && incoming[next] === 'Y'; p = next, next += direction) row[next] = 'Y';
    return row.join('');
  });
}

function timberExact(trees) {
  const edges = trees.flatMap(([position, height], i) => [[position - height, position, i], [position, position + height, i]]);
  const walk = (at, used) => Math.max(0, ...edges.filter(([from, , i]) => from === at && !(used & (1 << i)))
    .map(([from, to, i]) => to - from + walk(to, used | (1 << i))));
  return Math.max(0, ...edges.map(([from]) => walk(from, 0)));
}
function timberDP(trees) {
  const ordered = [...trees].sort((a, b) => a[0] - b[0]), right = new Map(), left = new Map();
  for (const [position, height] of ordered) right.set(position + height,
    Math.max(right.get(position + height) || 0, (right.get(position) || 0) + height));
  for (const [position, height] of ordered.reverse()) left.set(position - height,
    Math.max(left.get(position - height) || 0, (left.get(position) || 0) + height));
  return Math.max(0, ...[...new Set([...right.keys(), ...left.keys()])]
    .map(x => (right.get(x) || 0) + (left.get(x) || 0)));
}

function consistencyBFS(text, rules) {
  const distances = new Map();
  for (const initial of new Set(text)) {
    const distance = new Map([[initial, 0]]);
    for (const [letter, cost] of distance) for (const rule of rules) if (rule[0] === letter && !distance.has(rule[1])) distance.set(rule[1], cost + 1);
    distances.set(initial, distance);
  }
  let best = Infinity;
  for (const target of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') best = Math.min(best,
    sum([...text].map(letter => distances.get(letter).get(target) ?? Infinity)));
  return Number.isFinite(best) ? best : -1;
}
function consistencyFloyd(text, rules) {
  const distance = Array.from({ length: 26 }, (_, i) => Array.from({ length: 26 }, (_, j) => i === j ? 0 : Infinity));
  const index = letter => letter.charCodeAt(0) - 65;
  for (const rule of rules) distance[index(rule[0])][index(rule[1])] = Math.min(distance[index(rule[0])][index(rule[1])], 1);
  for (let k = 0; k < 26; k++) for (let i = 0; i < 26; i++) for (let j = 0; j < 26; j++)
    distance[i][j] = Math.min(distance[i][j], distance[i][k] + distance[k][j]);
  const best = Math.min(...distance.map((_, target) => sum([...text].map(letter => distance[index(letter)][target]))));
  return Number.isFinite(best) ? best : -1;
}

function xsAndOsExact(board) {
  const n = board.length, flat = board.join(''), empty = [...flat].flatMap((v, i) => v === '.' ? [i] : []);
  let moves = Infinity, ways = 0;
  for (let mask = 0; mask < 1 << empty.length; mask++) {
    const count = empty.reduce((n, _, i) => n + ((mask >> i) & 1), 0);
    if (count > moves) continue;
    const filled = new Set(empty.filter((_, i) => mask & (1 << i)));
    const x = i => flat[i] === 'X' || filled.has(i);
    const won = Array.from({ length: n }, (_, line) =>
      Array.from({ length: n }, (_, i) => x(line * n + i)).every(Boolean) ||
      Array.from({ length: n }, (_, i) => x(i * n + line)).every(Boolean)).some(Boolean);
    if (won) { if (count < moves) { moves = count; ways = 0; } ways++; }
  }
  return Number.isFinite(moves) ? { moves, ways } : null;
}
function xsAndOsLines(board) {
  const n = board.length, lines = [];
  for (let i = 0; i < n; i++) lines.push(Array.from({ length: n }, (_, j) => [i, j]), Array.from({ length: n }, (_, j) => [j, i]));
  let moves = Infinity;
  const ways = new Set();
  for (const line of lines) {
    if (line.some(([r, c]) => board[r][c] === 'O')) continue;
    const cells = line.filter(([r, c]) => board[r][c] === '.').map(([r, c]) => r * n + c).sort((a, b) => a - b);
    if (cells.length < moves) { moves = cells.length; ways.clear(); }
    if (cells.length === moves) ways.add(cells.join(','));
  }
  return Number.isFinite(moves) ? { moves, ways: ways.size } : null;
}

function weakTypingExact(text) {
  let answer = 0n;
  for (let left = 0; left < text.length; left++) for (let right = left + 1; right <= text.length; right++) {
    const meaningful = [...text.slice(left, right)].filter(letter => letter !== 'F');
    for (let i = 1; i < meaningful.length; i++) if (meaningful[i] !== meaningful[i - 1]) answer++;
  }
  return Number(answer % MOD);
}
function weakTypingContribution(text) {
  let previous = -1, answer = 0n;
  for (let i = 0; i < text.length; i++) if (text[i] !== 'F') {
    if (previous >= 0 && text[previous] !== text[i]) answer += BigInt(previous + 1) * BigInt(text.length - i);
    previous = i;
  }
  return Number(answer % MOD);
}

function secondFriendExact(board) {
  const rows = board.length, columns = board[0].length, flat = board.join('');
  const allowed = [...flat].flatMap((letter, i) => letter !== '#' ? [i] : []), required = [...flat].flatMap((letter, i) => letter === '^' ? [i] : []);
  for (let mask = 0; mask < 1 << allowed.length; mask++) {
    const trees = new Set(allowed.filter((_, i) => mask & (1 << i)));
    if (required.every(i => trees.has(i)) && [...trees].every(i => neighbors(i, rows, columns).filter(j => trees.has(j)).length >= 2)) return true;
  }
  return false;
}
function secondFriendPeel(board) {
  const rows = board.length, columns = board[0].length, flat = board.join('');
  const live = [...flat].map(letter => letter !== '#'), degree = live.map((yes, i) => yes ? neighbors(i, rows, columns).filter(j => live[j]).length : 0);
  const queue = degree.flatMap((count, i) => live[i] && count < 2 ? [i] : []);
  for (let head = 0; head < queue.length; head++) {
    const i = queue[head]; if (!live[i]) continue; live[i] = false;
    for (const j of neighbors(i, rows, columns)) if (live[j] && --degree[j] < 2) queue.push(j);
  }
  return { possible: [...flat].every((letter, i) => letter !== '^' || live[i]), live };
}

function wateringDirect(trees, wells) {
  let total = 0n;
  for (const [x, y] of trees) for (const [u, v] of wells) total += (BigInt(x) - BigInt(u)) ** 2n + (BigInt(y) - BigInt(v)) ** 2n;
  return Number((total % MOD + MOD) % MOD);
}
function wateringMoments(trees, wells) {
  let x = 0n, y = 0n, square = 0n, total = 0n;
  for (const [u, v] of trees) { x += BigInt(u); y += BigInt(v); square += BigInt(u) ** 2n + BigInt(v) ** 2n; }
  for (const [u, v] of wells) total += square + BigInt(trees.length) * (BigInt(u) ** 2n + BigInt(v) ** 2n) - 2n * (BigInt(u) * x + BigInt(v) * y);
  return Number((total % MOD + MOD) % MOD);
}

function stoneGroups(board, color = 'W') {
  const rows = board.length, columns = board[0].length, flat = board.join(''), seen = new Set(), groups = [];
  for (let i = 0; i < flat.length; i++) if (flat[i] === color && !seen.has(i)) {
    const cells = new Set([i]), liberties = new Set();
    for (const current of cells) {
      seen.add(current);
      for (const next of neighbors(current, rows, columns)) {
        if (flat[next] === color) cells.add(next);
        else if (flat[next] === '.') liberties.add(next);
      }
    }
    groups.push({ cells, liberties });
  }
  return groups;
}
function readyGoExact(board) {
  const flat = board.join(''), columns = board[0].length;
  let best = 0;
  for (let i = 0; i < flat.length; i++) if (flat[i] === '.') {
    const changed = [...flat]; changed[i] = 'B';
    const rows = Array.from({ length: board.length }, (_, r) => changed.slice(r * columns, (r + 1) * columns).join(''));
    best = Math.max(best, stoneGroups(rows).filter(group => group.liberties.size === 0).reduce((count, group) => count + group.cells.size, 0));
  }
  return best;
}
function readyGoLiberties(board) {
  const scores = new Map();
  for (const group of stoneGroups(board)) if (group.liberties.size === 1) {
    const [cell] = group.liberties; scores.set(cell, (scores.get(cell) || 0) + group.cells.size);
  }
  return Math.max(0, ...scores.values());
}

export function auditAlgorithmQuestions() {
  const google = read('interviews-google-algorithms.json'), meta = read('interviews-meta-algorithms.json');
  assert.equal(google.length, 6, 'six reviewed Google algorithm additions');
  assert.equal(meta.length, 8, 'eight reviewed Meta algorithm additions');
  const questions = [...google, ...meta];
  const oracles = {
    'google-metal-harvest': input => harvestExact(input.intervals, input.K),
    'google-alien-piano': pianoExact,
    'google-moons-umbrellas': moonsExact,
    'google-bundling': input => bundlingExact(input.strings, input.K),
    'meta-travel-restrictions': input => travelReachability(input.incoming, input.outgoing),
    'meta-timber': input => timberExact(input.trees),
    'meta-consistency-two': input => consistencyBFS(input.S, input.rules),
    'meta-xs-and-os': input => xsAndOsExact(input.board) ?? 'Impossible',
    'meta-weak-typing-two': weakTypingExact,
    'meta-watering-well-one': input => wateringDirect(input.trees, input.wells),
    'meta-ready-go-two': input => readyGoExact(input.board)
  };
  let workedExamples = 0;
  for (const question of questions) {
    assert.equal(question.company, question.id.startsWith('google-') ? 'Google' : 'Meta');
    assert.equal(question.sourceKind, 'official-practice', 'public contests are practice, not claimed interview records');
    assert.match(question.url, question.company === 'Google' ?
      /^https:\/\/github\.com\/google\/coding-competitions-archive\/blob\/87385db7dbd81b281225412b8ad496334536d016\// :
      /^https:\/\/huggingface\.co\/datasets\/hackercupai\/hackercup\/blob\/209283d622e6ee41daa4a889d48f3cd67ebdab01\//,
    'pinned primary archive link');
    for (const example of question.examples) {
      const why = `${question.id} example ${workedExamples + 1}`;
      if (question.id === 'google-slides') validateSlides(example.input, example.output);
      else if (question.id === 'google-candies') assert.deepEqual(candiesDirect(example.input), {
        queryScores: example.output.queryScores.map(BigInt), total: BigInt(example.output.total)
      }, why);
      else if (question.id === 'meta-second-second-friend') {
        assert.equal(example.output.possible, secondFriendExact(example.input.board), why);
        if (example.output.possible) {
          const input = example.input.board, output = example.output.board, columns = input[0].length;
          assert.equal(output.length, input.length);
          output.forEach(row => assert.equal(row.length, columns));
          for (let r = 0; r < input.length; r++) for (let c = 0; c < columns; c++) {
            if (input[r][c] === '#') assert.equal(output[r][c], '#', 'preserve rocks');
            else assert.match(output[r][c], /^[.^]$/, 'only plant in non-rock cells');
            if (input[r][c] === '^') assert.equal(output[r][c], '^', 'preserve original trees');
            if (output[r][c] === '^') assert(neighbors(r * columns + c, input.length, columns)
              .filter(i => output[Math.floor(i / columns)][i % columns] === '^').length >= 2, 'two tree neighbors');
          }
        }
      } else {
        assert(oracles[question.id], 'every new question has an independent oracle: ' + question.id);
        assert.deepEqual(oracles[question.id](example.input), example.output, why);
      }
      workedExamples++;
    }
  }

  const counts = {};
  const compare = (name, actual, expected) => {
    assert.deepEqual(actual, expected, name + ' recurrence vs exhaustive oracle');
    counts[name] = (counts[name] || 0) + 1;
  };
  // Every subset of seven unit intervals, including separated runs and shared endpoints.
  for (let mask = 1; mask < 128; mask++) for (let duration = 1; duration <= 4; duration++) {
    const intervals = [];
    for (let i = 0; i < 7; i++) if (mask & (1 << i)) {
      if (intervals.at(-1)?.[1] === i + 1) intervals.at(-1)[1]++;
      else intervals.push([i + 1, i + 2]);
    }
    compare('metalHarvest', harvestGreedy(intervals.reverse(), duration), harvestExact(intervals, duration));
  }
  for (let vertices = 2; vertices <= 8; vertices++) {
    const maximum = 2 ** (vertices - 2);
    for (let target = 1; target <= maximum + 1; target++) {
      const matrix = slidesMatrix(vertices, target);
      compare('slides', matrix ? pathsByEnumeration(matrix) : null, target <= maximum ? BigInt(target) : null);
    }
  }
  for (let length = 1; length <= 4; length++) for (const notes of sequences([1, 2, 3], length))
    compare('alienPiano', pianoDP(notes), pianoExact(notes));
  for (let length = 1; length <= 9; length++) {
    const notes = Array.from({ length }, (_, i) => i + 1);
    compare('alienPiano', pianoDP(notes), pianoExact(notes));
  }
  for (let seed = 0; seed < 100; seed++) {
    const notes = Array.from({ length: 6 }, (_, i) => (seed * (i + 3) + i * i) % 11);
    compare('alienPiano', pianoDP(notes), pianoExact(notes));
  }
  for (let length = 1; length <= 5; length++) for (const chars of sequences(['C', 'J', '?'], length))
    for (const X of [-3, 0, 2]) for (const Y of [-3, 0, 2]) {
      const input = { X, Y, S: chars.join('') };
      compare('moonsUmbrellas', moonsDP(input), moonsExact(input));
    }
  for (const words of sequences(['A', 'AB', 'AC', 'B', 'BA', 'BB'], 4))
    compare('bundling', bundlingTrie(words, 2), bundlingExact(words, 2));
  for (let seed = 0; seed < 50; seed++) for (const size of [2, 3, 6]) {
    const choices = ['A', 'AB', 'ABA', 'ABB', 'B', 'BA', 'BB'];
    const words = Array.from({ length: 6 }, (_, i) => choices[(seed * (i + 1) + i * i) % choices.length]);
    compare('bundling', bundlingTrie(words, size), bundlingExact(words, size));
  }
  for (let length = 1; length <= 8; length++) for (let seed = 0; seed < 20; seed++) {
    const values = Array.from({ length }, (_, i) => (seed * (i + 3) + 11 * i) % 100 + 1), operations = [];
    for (let i = 0; i < 18; i++) {
      const a = (seed + i * 3) % length + 1, b = (seed * 3 + i * 5) % length + 1;
      operations.push(i % 3 === 0 ? ['U', a, (seed + i) % 100 + 1] : ['Q', Math.min(a, b), Math.max(a, b)]);
    }
    compare('candies', candiesFenwick({ values, operations }), candiesDirect({ values, operations }));
  }
  // At the original bounds, the query total can exceed Number's exact integer range.
  const pairs = 100_000n, singleScore = 198n * pairs * (pairs + 1n) / 2n - 100n * pairs;
  assert(singleScore * 100_000n > BigInt(Number.MAX_SAFE_INTEGER), 'Candies wide-total warning');

  for (let length = 2; length <= 4; length++) for (const incoming of sequences(['Y', 'N'], length))
    for (const outgoing of sequences(['Y', 'N'], length)) compare('travelRestrictions',
      travelScan(incoming.join(''), outgoing.join('')), travelReachability(incoming.join(''), outgoing.join('')));
  for (const heights of sequences([1, 2, 3, 4], 3)) {
    const trees = heights.map((height, i) => [[0, 2, 5][i], height]);
    compare('timber', timberDP(trees), timberExact(trees));
  }
  for (let seed = 0; seed < 150; seed++) {
    const trees = Array.from({ length: seed % 5 + 1 }, (_, i) => [i * 3 + (seed + i) % 2, (seed * (i + 1) + 3) % 7 + 1]);
    compare('timber', timberDP(trees), timberExact(trees));
  }
  const possibleRules = ['AB', 'AC', 'BA', 'BC', 'CA', 'CB'];
  for (let mask = 0; mask < 64; mask++) for (const text of ['A', 'ABC', 'AABC']) {
    const rules = possibleRules.filter((_, i) => mask & (1 << i));
    compare('consistency', consistencyFloyd(text, rules), consistencyBFS(text, rules));
  }
  for (const cells of sequences(['X', 'O', '.'], 4)) {
    const board = [cells.slice(0, 2).join(''), cells.slice(2).join('')];
    compare('xsAndOs', xsAndOsLines(board), xsAndOsExact(board));
  }
  for (let seed = 0; seed < 100; seed++) {
    const cells = Array.from({ length: 9 }, (_, i) => ['X', 'O', '.'][(seed * (i + 1) + i * i + Math.floor(seed / 3)) % 3]);
    const board = [0, 3, 6].map(i => cells.slice(i, i + 3).join(''));
    compare('xsAndOs', xsAndOsLines(board), xsAndOsExact(board));
  }
  for (let length = 1; length <= 6; length++) for (const chars of sequences(['X', 'O', 'F'], length)) {
    const text = chars.join(''); compare('weakTyping', weakTypingContribution(text), weakTypingExact(text));
  }
  for (const cells of sequences(['.', '^', '#'], 4)) {
    const board = [cells.slice(0, 2).join(''), cells.slice(2).join('')];
    compare('secondSecondFriend', secondFriendPeel(board).possible, secondFriendExact(board));
  }
  for (let length = 1; length <= 3; length++) for (const cells of sequences(['.', '^', '#'], length)) {
    const board = [cells.join('')]; compare('secondSecondFriend', secondFriendPeel(board).possible, secondFriendExact(board));
  }
  for (let seed = 0; seed < 60; seed++) {
    const cells = Array.from({ length: 9 }, (_, i) => ['.', '^', '#'][(seed * (i + 1) + i * i + Math.floor(seed / 3)) % 3]);
    const board = [0, 3, 6].map(i => cells.slice(i, i + 3).join(''));
    compare('secondSecondFriend', secondFriendPeel(board).possible, secondFriendExact(board));
  }
  for (let seed = 0; seed < 120; seed++) {
    const trees = Array.from({ length: seed % 5 + 1 }, (_, i) => [(seed + i * 3) % 3001, (seed * 7 + i) % 3001]);
    const wells = Array.from({ length: seed % 4 + 1 }, (_, i) => [(seed * 11 + i) % 3001, (seed + i * 5) % 3001]);
    compare('wateringWell', wateringMoments(trees, wells), wateringDirect(trees, wells));
  }
  for (const cells of sequences(['.', 'B', 'W'], 6)) {
    const board = [cells.slice(0, 3).join(''), cells.slice(3).join('')];
    if ([...stoneGroups(board), ...stoneGroups(board, 'B')].every(group => group.liberties.size))
      compare('readyGo', readyGoLiberties(board), readyGoExact(board));
  }
  assert.equal(Object.keys(counts).length, questions.length, 'all fourteen recurrences have independent checks');
  return { questions: questions.length, workedExamples, exhaustiveRecurrenceChecks: sum(Object.values(counts)), checksByAlgorithm: counts };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) console.log(JSON.stringify(auditAlgorithmQuestions(), null, 2));
