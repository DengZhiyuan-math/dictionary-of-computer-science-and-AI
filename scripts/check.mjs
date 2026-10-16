import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {root, read, book, glossary, hot100} from './model.mjs';

const build = spawnSync(process.execPath, ['scripts/build.mjs', '--check'], {cwd: root, encoding: 'utf8'});
process.stdout.write(build.stdout);
if (build.status !== 0) { process.stderr.write(build.stderr); process.exit(build.status || 1); }
assert.equal(book.chapters.length, 97);
assert.equal(book.stats.quiz_questions, 90);
assert.equal(book.stats.training_chapters, 10);
const hotSections = hot100.categories.reduce((sum,c)=>sum+c.sections.length+1,0);
assert.equal(book.stats.new_subsections, book.metadata.baseline.detailedSubsections + 6 + hotSections);
assert.equal(book.stats.hot100_chapters,17);
assert.equal(book.stats.hot100_problems,100);
const expectedGroups = [[1,49,128],[283,11,15,42],[3,438],[560,239,76],[53,56,189,238,41],[73,54,48,240],[160,206,234,141,142,21,2,19,24,25,138,148,23,146],[94,104,226,101,543,102,108,98,230,199,114,105,437,236,124],[200,994,207,208],[46,78,17,39,22,79,131,51],[35,74,34,33,153,4],[20,155,394,739,84],[215,347,295],[121,55,45,763],[70,118,198,279,322,139,300,152,416,32],[62,64,5,1143,72],[136,169,75,31,287]];
assert.deepEqual(hot100.categories.map(c=>c.problems.map(p=>p.id)),expectedGroups);
assert.equal(new Set(hot100.categories.flatMap(c=>c.problems.map(p=>p.id))).size,100);
assert.equal(new Set(hot100.categories.flatMap(c=>c.problems.map(p=>p.slug))).size,100);
for(const [i,c] of hot100.categories.entries()) {
  assert.equal(c.chapter,81+i);
  assert(c.sections.length>=3);
  assert(c.sections.every(s=>s.paragraphs.length&&s.paragraphs.every(t=>t.trim().length>50)));
  for(const p of c.problems) {
    assert(p.section>=1&&p.section<=c.sections.length);
    assert([p.title,p.slug,p.idea,p.time,p.space,p.pitfall].every(t=>typeof t==='string'&&t.trim()));
  }
}
assert.equal(new Set(book.sources.map(s => s.id)).size, book.sources.length);
assert.equal(new Set(book.microOrder).size, 10);
assert.deepEqual([...book.microOrder].sort((a,b)=>a-b), book.chapters.filter(c=>c.micro).map(c=>c.id));
for (const [i,c] of book.chapters.entries()) {
  assert.equal(c.id, i); assert.equal(c.num, String(i+1).padStart(2,'0'));
  assert(c.blocks.length); assert(c.source_ids.every(id=>book.sources.some(s=>s.id===id)));
  assert(c.blocks.every(b=>['heading','text'].includes(b.kind) && b.text.trim()));
}
for (const s of book.sources) assert.equal(new URL(s.url).protocol, 'https:');
for (const g of glossary) {
  assert.equal(g.length, 6); assert(book.chapters[g[2]-1]);
  assert(g.every(x=>typeof x==='number'||(typeof x==='string'&&x.trim())));
}

function walk(dir) {
  return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
    if (['.git','node_modules','dist','src'].includes(e.name)) return [];
    const p=path.join(dir,e.name); return e.isDirectory()?walk(p):[p];
  });
}
function anchors(text) {
  const result=new Set([...text.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]));
  const duplicate=new Map();
  for(const match of text.matchAll(/^#{1,6} (.+)$/gm)) {
    const base=match[1].toLowerCase().replace(/<[^>]+>/g,'').replace(/[^\p{L}\p{N}\p{M}_\- ]/gu,'').replace(/ /g,'-');
    const n=duplicate.get(base)||0; duplicate.set(base,n+1); result.add(base+(n?'-'+n:''));
  }
  return result;
}
const failures=[];
let linkCount=0;
for(const file of walk(root).filter(p=>p.endsWith('.md'))) {
  const content=fs.readFileSync(file,'utf8');
  for(const m of content.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href=m[1]; if(/^(?:https?:|mailto:)/.test(href)) continue;
    linkCount++;
    const [target,fragment]=href.split('#');
    const resolved=target?path.resolve(path.dirname(file),decodeURIComponent(target)):file;
    if(!resolved.startsWith(root)||!fs.existsSync(resolved)) { failures.push(`${path.relative(root,file)}: missing ${href}`); continue; }
    if(fragment&&!anchors(fs.readFileSync(resolved,'utf8')).has(decodeURIComponent(fragment))) failures.push(`${path.relative(root,file)}: unknown anchor ${href}`);
  }
}
assert.deepEqual(failures,[]);
const html=read('cs_ai_v2_audiobook.html');
const embedded=JSON.parse(html.match(/<script[^>]*id="bookData"[^>]*>([\s\S]*?)<\/script>/)[1]);
assert.deepEqual(embedded,book);
for(const script of html.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) if(!script[1].includes('application/json')) new vm.Script(script[2]);
assert(html.includes('function applyLocation('));
assert(html.includes("case'hot100':return c.hot100===true"));
assert(!html.includes('全部 80 讲'));
assert(!html.includes('__BOOK_DATA__'));

// Independent arithmetic checks anchor the published worked examples.
assert(Math.abs(-Math.log(.49)-.71335)<.00001);
assert(Math.abs(-Math.log(.01)-4.60517)<.00001);
assert(Math.abs((2-.1*.4)-1.96)<1e-12);
assert.equal(60/(60+20),.75); assert.equal(60/(60+40),.6);
assert(Math.abs(120/(120+20+40)-2/3)<1e-12);
assert.equal(Math.ceil(10/4),3);
assert(read('text/chapters/77.txt').includes('请暂停，先尝试回答'));
console.log(`Passed: source structure, 90 questions, all 100 official Hot 100 IDs/groupings, routes, ${linkCount} local links, embedded content, script syntax and worked arithmetic.`);
