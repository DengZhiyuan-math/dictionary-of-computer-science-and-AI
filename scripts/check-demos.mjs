import assert from 'node:assert/strict';
import vm from 'node:vm';
import {examples} from '../data/examples.mjs';
import {demos,runDemo} from '../data/demo-engines.mjs';
import {book,read} from './model.mjs';
const close=(a,b)=>assert(Math.abs(a-b)<1e-9,`${a} != ${b}`);
assert.equal(examples.length,30);assert.equal(demos.length,20);
assert.equal(new Set(examples.map(x=>x.id)).size,30);
assert.equal(new Set(demos.map(x=>x.id)).size,20);
assert.equal(book.stats.worked_examples,30);assert.equal(book.stats.visual_demos,20);
for(const x of examples){
 assert(x.steps.length>=3);assert(x.scenario&&x.result&&x.pitfall&&x.question&&x.answer);
 for(const num of x.chapters)assert(book.chapters[num-1]);
 assert(book.chapters[x.chapters[0]-1].blocks.some(b=>b.example===x.id&&b.kind==='heading'));
 assert(!book.chapters[x.chapters[0]-1].quiz);
 if(x.demo)assert(demos.some(d=>d.id===x.demo&&d.example===x.id));
}
let runs=0;
for(const d of demos)for(let v=0;v<d.variants.length;v++)for(const p of d.control?[d.control.min,d.control.value,d.control.max]:[undefined]){
 const t=runDemo(d.id,v,p);runs++;assert(t.frames.length);assert(t.frames.every(f=>f.message&&f.view&&f.rows));
 function finite(x){if(typeof x==='number')assert(Number.isFinite(x));else if(x&&typeof x==='object')for(const v of Object.values(x))finite(v)}finite(t);
}
// Compare optimized state traces to deliberately simple, independent enumeration.
for(const v of [0,1]){
 const a=v?[3,3]:[4,1,5,3],target=v?6:8,answer=runDemo('hash',v).result;assert(answer[0]!==answer[1]);assert.equal(a[answer[0]]+a[answer[1]],target);
 const h=v?[1,1,1,1]:[2,7,4,6,3],areas=[];for(let i=0;i<h.length;i++)for(let j=i+1;j<h.length;j++)areas.push((j-i)*Math.min(h[i],h[j]));assert.equal(runDemo('pointers',v).result,Math.max(...areas));
 const nums=v?[0,0,0]:[1,-1,1],k=v?0:1;let count=0;for(let i=0;i<nums.length;i++)for(let j=i;j<nums.length;j++)if(nums.slice(i,j+1).reduce((a,b)=>a+b,0)===k)count++;assert.equal(runDemo('prefix',v).result,count);
 const temp=v?[20,20,21]:[20,24,22,27,21],waiting=temp.map((t,i)=>{const j=temp.findIndex((n,j)=>j>i&&n>t);return j<0?0:j-i});assert.deepEqual(runDemo('stack',v).result,waiting);
 const weights=v?[1,2,3]:[1,2,5];let possible=false;for(let mask=0;mask<1<<weights.length;mask++)if(weights.reduce((s,w,i)=>s+((mask>>i&1)?w:0),0)===4)possible=true;assert.equal(runDemo('knapsack',v).result,possible);
 const perms=runDemo('backtrack',v).result,n=v?2:3;assert.equal(perms.length,n===2?2:6);assert.equal(new Set(perms.map(p=>p.join(','))).size,perms.length);for(const p of perms)assert.deepEqual([...p].sort(),Array.from({length:n},(_,i)=>i+1));
}
for(const [v,s]of ['abcaad','aaaa','abcde'].entries()){
 let best=0;for(let i=0;i<s.length;i++)for(let j=i+1;j<=s.length;j++){const part=s.slice(i,j);if(new Set(part).size===part.length)best=Math.max(best,part.length)}assert.equal(runDemo('window',v).result,best);
}
for(let target=0;target<=8;target++){const a=[1,2,2,4,7],linear=a.findIndex(x=>x>=target);assert.equal(runDemo('binary',0,target).result,linear<0?a.length:linear)}
// Floyd-Warshall gives a separate oracle for BFS distances on the six-node graph.
const nodes=['A','B','C','D','E','F'],edges=[['A','B'],['A','C'],['B','D'],['C','D'],['D','E']];
const distance=nodes.map((_,i)=>nodes.map((_,j)=>i===j?0:Infinity));for(const[a,b]of edges)distance[nodes.indexOf(a)][nodes.indexOf(b)]=1;
for(let k=0;k<6;k++)for(let i=0;i<6;i++)for(let j=0;j<6;j++)distance[i][j]=Math.min(distance[i][j],distance[i][k]+distance[k][j]);
for(const v of [0,1]){const row=distance[v?5:0],answer=runDemo('bfs',v).result;for(let i=0;i<6;i++)assert.equal(answer.dist[nodes[i]]??Infinity,row[i])}
const topo=runDemo('topo').result;assert.equal(topo.cycle,false);assert.equal(new Set(topo.order).size,6);for(const[a,b]of [['A','C'],['B','C'],['C','D'],['D','E']])assert(topo.order.indexOf(a)<topo.order.indexOf(b));assert.equal(runDemo('topo',1).result.cycle,true);
assert.deepEqual(runDemo('lru').result,{list:[4,3],hits:1,misses:1});assert.deepEqual(runDemo('lru',1).result,{list:[4,2,3],hits:2,misses:0});
close(runDemo('bce',0,.49).result.loss,-Math.log(.49));close(runDemo('bce',1,.49).result.loss,-Math.log(.51));close(runDemo('bce',0,.5).result.loss,Math.log(2));assert(runDemo('bce',0,.01).result.loss>runDemo('bce',0,.49).result.loss);
for(const lr of [.1,.6,1.8,2,2.2]){const result=runDemo('gd',0,lr).result;close(result.theta,4*(1-lr)**20)}assert(Math.abs(runDemo('gd',0,2.2).result.theta)>4);assert(Math.abs(runDemo('gd',0,1.8).result.theta)<4);
const m=runDemo('metrics',0,.5).result;assert.deepEqual([m.tp,m.fp,m.fn,m.tn],[2,2,1,3]);close(m.precision,.5);close(m.recall,2/3);close(m.f1,4/7);assert.equal(runDemo('metrics',0,1).result.precision,null);
let previousRecall=1;for(let threshold=0;threshold<=1.0001;threshold+=.05){const r=runDemo('metrics',0,threshold).result;assert(r.recall<=previousRecall+1e-12);previousRecall=r.recall;assert.equal(r.tp+r.fp+r.fn+r.tn,8)}
for(const v of [0,1])for(const temperature of [.2,1,2]){const a=runDemo('attention',v,temperature).result;close(a.weights.reduce((a,b)=>a+b),1);if(v)close(a.weights[2],0);for(const z of a.out)assert(z>=0&&z<=2)}
const att=runDemo('attention').result;close(att.out[0]+att.out[1],2);close(att.weights[0],att.weights[2]);
for(const v of [0,1]){const t=runDemo('kmeans',v);let last=Infinity;for(const f of t.frames){const sse=Number(f.rows[0][1]);assert(sse<=last+1e-5);last=sse}close(t.result.centers[0][0],2/3);close(t.result.centers[1][1],23/3);assert(Math.abs(last-32/3)<1e-5)}
assert.deepEqual(runDemo('rrf').result.map(x=>x[0]),['C','B','A','D']);assert.deepEqual(runDemo('rrf',1).result.map(x=>x[0]),['A','B','C']);
close(runDemo('qlearning').result.next,3.3);close(runDemo('qlearning',1).result.next,1.5);close(runDemo('qlearning',0,0).result.next,2);close(runDemo('qlearning',0,1).result.next,4.6);
close(runDemo('world',0,-.3).result.x,4.7);close(runDemo('world',0,0).result.x,5);close(runDemo('world',1,0).result.x,12);
assert.deepEqual(runDemo('conv').result,[[6,8],[12,14]]);assert.deepEqual(runDemo('conv',1).result,[[-2,-2],[-2,-2]]);
const html=read('docs/visual-demos.html'),vault=read('obsidian-vault/Demos/交互演示.html');
for(const h of [html,vault]){
 const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,'Duplicate DOM IDs hide live values');
 assert(!h.includes('__DEMO_'));assert(!h.includes('__EXAMPLE_'));
 assert(!/<script[^>]+src=|<link[^>]+href=|\bfetch\(|\bXMLHttpRequest\b|\bWebSocket\b/.test(h),'Demos must work offline');
 assert.deepEqual(JSON.parse(h.match(/<script id="exampleData" type="application\/json">([\s\S]*?)<\/script>/)[1]),examples);
 for(const script of h.matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g))if(!script[1].includes('application/json'))new vm.Script(script[2]);
 for(const d of demos)assert(h.includes(`id="${d.id}"`));
}
assert(!vault.includes('href:`../chapters/'));assert(read('src/player.html').includes("case'examples':"));
console.log(`Examples passed: 30 worked cases, 20 offline demos, ${runs} scenario/parameter runs, independent enumeration and numerical invariants.`);
