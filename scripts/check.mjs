import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';
import {root, read, book, glossary, hot100} from './model.mjs';
import {graph} from './knowledge-map.mjs';
import {areas} from '../data/knowledge-map.mjs';
import {examples} from '../data/examples.mjs';
import './check-demos.mjs';
import './check-expansion.mjs';
import './check-english-interviews.mjs';
import './check-english-original-algorithms.mjs';
import './check-english-original-systems-ai.mjs';
import './check-english-algorithms.mjs';
import './check-english-company-practice.mjs';
import './check-english-apple-uber-netflix.mjs';
import './check-english-airbnb-stripe-dropbox.mjs';
import {advancedAlgorithms} from '../data/advanced-algorithms.mjs';
import {interviewQuestions} from '../data/interviews.mjs';

const build = spawnSync(process.execPath, ['scripts/build.mjs', '--check'], {cwd: root, encoding: 'utf8'});
process.stdout.write(build.stdout);
if (build.status !== 0) { process.stderr.write(build.stderr); process.exit(build.status || 1); }
assert.equal(book.chapters.length, 106);
assert.equal(book.stats.quiz_questions, 90);
assert.equal(book.stats.training_chapters, 10);
const hotSections = hot100.categories.reduce((sum,c)=>sum+c.sections.length+1,0);
assert.equal(book.stats.new_subsections, book.metadata.baseline.detailedSubsections + 6 + hotSections + examples.length + advancedAlgorithms.reduce((n,c)=>n+c.sections.length,0) + interviewQuestions.length);
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
  // Code examples and inline formulas do not contain Markdown links.
  const content=fs.readFileSync(file,'utf8')
    .replace(/^```[^\n]*\n[\s\S]*?^```[ \t]*$/gm,'')
    .replace(/`[^`\n]+`/g,'');
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

// Validate the editorial graph independently of its generated navigation.
assert.equal(graph.stats.areas,14);assert.equal(graph.stats.concepts,147);
assert.equal(graph.stats.chapters,106);assert.equal(graph.stats.problems,100);
assert.equal(graph.stats.interviews,36);
assert.deepEqual(areas.flatMap(a=>a.chapters).sort((a,b)=>a-b),Array.from({length:book.chapters.length},(_,i)=>i+1));
const graphNodes=new Map(graph.nodes.map(n=>[n.id,n]));
assert.equal(graphNodes.size,graph.nodes.length);
assert.equal(new Set(graph.nodes.map(n=>n.note.toLowerCase())).size,graph.nodes.length,'Note filenames must be unique on Windows');
const edgeKeys=new Set();
for(const e of graph.edges){
  assert(graphNodes.has(e.from)&&graphNodes.has(e.to),`Invalid graph edge ${e.id}`);
  assert(e.from!==e.to);assert(e.label.trim());assert(graph.metadata.semantics[e.type]);
  const key=JSON.stringify([e.from,e.to,e.type]);assert(!edgeKeys.has(key),`Duplicate edge ${key}`);edgeKeys.add(key);
}
const reached=new Set(['home']),queue=['home'];
for(let i=0;i<queue.length;i++)for(const e of graph.edges){
  const next=e.from===queue[i]?e.to:e.to===queue[i]?e.from:null;
  if(next&&!reached.has(next)){reached.add(next);queue.push(next)}
}
assert.equal(reached.size,graph.nodes.length,'Knowledge graph contains disconnected notes');
const visiting=new Set(),visited=new Set();
function visit(id){assert(!visiting.has(id),`Cyclic concept prerequisite at ${id}`);if(visited.has(id))return;visiting.add(id);for(const e of graph.edges.filter(e=>e.type==='prerequisite'&&e.from===id))visit(e.to);visiting.delete(id);visited.add(id)}
for(const n of graph.nodes)visit(n.id);
for(const n of graph.nodes.filter(n=>n.type==='problem')){
  assert(graph.edges.some(e=>e.type==='practice'&&e.from===n.id&&e.to.startsWith('concept:')));
  assert(graph.edges.some(e=>e.type==='practice'&&e.from===n.id&&e.to.startsWith('chapter:')));
}
const vaultRoot=path.join(root,'obsidian-vault');let wikiCount=0;
assert.equal(walk(vaultRoot).filter(p=>p.endsWith('.md')).length,graph.nodes.length,'Stale generated notes remain in the vault');
for(const file of walk(vaultRoot).filter(p=>p.endsWith('.md'))){
  const source=fs.readFileSync(file,'utf8');assert(source.startsWith('---\n'));
  for(const m of source.matchAll(/\[\[([^\]\n]+)\]\]/g)){
    wikiCount++;const target=m[1].split('|')[0],hash=target.indexOf('#');
    const name=hash<0?target:target.slice(0,hash),heading=hash<0?null:target.slice(hash+1);
    const resolved=path.resolve(vaultRoot,name+(path.extname(name)?'':'.md'));
    assert(resolved.startsWith(vaultRoot+path.sep)&&fs.existsSync(resolved),`Broken wikilink in ${file}: ${target}`);
    if(heading){const headings=[...fs.readFileSync(resolved,'utf8').matchAll(/^#{1,6} (.+)$/gm)].map(m=>m[1].trim());assert(headings.includes(heading),`Unknown wiki heading: ${target}`)}
  }
}
for(const n of graph.nodes)assert(fs.existsSync(path.join(vaultRoot,n.note)));
for(const file of walk(vaultRoot).filter(p=>p.endsWith('.canvas'))){
  const canvas=JSON.parse(fs.readFileSync(file,'utf8')),ids=new Set(canvas.nodes.map(n=>n.id));assert.equal(ids.size,canvas.nodes.length);
  for(const n of canvas.nodes){assert(['file','group','text','link'].includes(n.type));for(const key of ['x','y','width','height'])assert(Number.isInteger(n[key]));assert(n.width>0&&n.height>0);if(n.type==='file')assert(fs.existsSync(path.join(vaultRoot,n.file)))}
  for(const e of canvas.edges)assert(ids.has(e.fromNode)&&ids.has(e.toNode));
}
const mapHtml=read('docs/knowledge-map.html');
assert.deepEqual(JSON.parse(mapHtml.match(/<script id="graphData" type="application\/json">([\s\S]*?)<\/script>/)[1]),graph);
for(const script of mapHtml.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!script[1].includes('application/json'))new vm.Script(script[2]);
assert(!mapHtml.includes('__KNOWLEDGE_GRAPH__'));

// Independent arithmetic checks anchor the published worked examples.
assert(Math.abs(-Math.log(.49)-.71335)<.00001);
assert(Math.abs(-Math.log(.01)-4.60517)<.00001);
assert(Math.abs((2-.1*.4)-1.96)<1e-12);
assert.equal(60/(60+20),.75); assert.equal(60/(60+40),.6);
assert(Math.abs(120/(120+20+40)-2/3)<1e-12);
assert.equal(Math.ceil(10/4),3);
assert(read('text/chapters/77.txt').includes('请暂停，先尝试回答'));
console.log(`Passed: source structure, 90 questions, all 100 official Hot 100 IDs/groupings, routes, ${linkCount} local links, embedded content, script syntax and worked arithmetic.`);
console.log(`Knowledge map passed: ${graph.nodes.length} notes, ${graph.edges.length} typed edges, ${wikiCount} wikilinks, complete chapter coverage, acyclic prerequisites and two Canvas files.`);
