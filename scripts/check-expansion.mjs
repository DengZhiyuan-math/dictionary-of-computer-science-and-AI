import assert from 'node:assert/strict';
import {runDemo} from '../data/demo-engines.mjs';
import {advancedAlgorithms,advancedConcepts,algorithmSources} from '../data/advanced-algorithms.mjs';
import {interviewQuestions,interviewSources} from '../data/interviews.mjs';
import {book,read} from './model.mjs';
import {graph} from './knowledge-map.mjs';
assert.equal(advancedAlgorithms.length,8);assert.equal(advancedConcepts.length,16);
assert.equal(advancedAlgorithms.reduce((n,c)=>n+c.sections.length,0),32);
assert.deepEqual(advancedAlgorithms.map(c=>c.chapter),[98,99,100,101,102,103,104,105]);
for(const c of advancedAlgorithms){assert(c.sections.every(s=>s.paragraphs.length>=2&&s.paragraphs.every(p=>p.length>45)));assert(c.sources.every(k=>algorithmSources.some(s=>s.key===k)));assert(book.chapters[c.chapter-1].advanced)}
assert.equal(interviewQuestions.length,36);assert.equal(new Set(interviewQuestions.map(q=>q.id)).size,36);
assert.equal(new Set(interviewSources.map(s=>s.id)).size,interviewSources.length);
const concepts=new Set(graph.nodes.filter(n=>n.type==='concept').map(n=>n.key));
const kindCounts={'company-sample':0,'official-practice':0,'documentation-derived':0};
for(const q of interviewQuestions){
 const source=interviewSources.find(s=>s.id===q.sourceId);assert(source);assert.equal(q.sourceKind,source.kind);kindCounts[q.sourceKind]++;
 assert(source.evidence&&source.publisher&&source.checkedAt);assert.equal(new URL(source.url).protocol,'https:');
 assert(q.outline.length>=3&&q.example.steps.length>=2);assert(q.example.input&&q.example.output&&q.followup.question&&q.followup.answer&&q.pitfall);
 assert(q.chapters.every(n=>book.chapters[n-1]));assert(q.concepts.every(k=>concepts.has(k)));
 const node=graph.nodes.find(n=>n.id==='interview:'+q.id);assert(node);assert(graph.edges.some(e=>e.from===node.id&&e.to==='chapter:106'));
 assert(read('docs/INTERVIEW_QUESTIONS.md').includes(`id="question-${q.id}"`));
}
assert.deepEqual(kindCounts,{'company-sample':3,'official-practice':16,'documentation-derived':17});
assert.deepEqual(book.stats.interview_source_kinds,kindCounts);
assert.deepEqual(JSON.parse(read('data/interview-bank.json')).questions,interviewQuestions);
assert(read('docs/INTERVIEW_SOURCES.md').includes('未收录可核验的某次真实面试'));
assert.equal(book.chapters[105].toc.length,36);assert.equal(book.stats.quiz_questions,90);

// DSU against graph reachability rather than another parent-pointer implementation.
for(const v of [0,1]){
 const adjacency=Array.from({length:6},()=>[]);for(const[a,b]of [[0,1],[2,3],[1,2],v?[0,1]:[0,3],[4,5]]){adjacency[a].push(b);adjacency[b].push(a)}
 const seen=new Set();let count=0;for(let start=0;start<6;start++)if(!seen.has(start)){count++;const queue=[start];seen.add(start);for(const a of queue)for(const b of adjacency[a])if(!seen.has(b)){seen.add(b);queue.push(b)}}assert.equal(runDemo('dsu',v).result.count,count);
}
// Floyd-Warshall is an independent distance oracle for the Dijkstra trace.
const names=['A','B','C','D'],matrix=names.map((_,i)=>names.map((_,j)=>i===j?0:Infinity));
for(const[a,b,w]of [['A','B',5],['A','C',1],['C','B',1],['B','D',2],['C','D',7]])matrix[names.indexOf(a)][names.indexOf(b)]=w;
for(let k=0;k<4;k++)for(let i=0;i<4;i++)for(let j=0;j<4;j++)matrix[i][j]=Math.min(matrix[i][j],matrix[i][k]+matrix[k][j]);
for(const v of [0,1])for(let j=0;j<4;j++)assert.equal(runDemo('dijkstra',v).result.dist[names[j]]??Infinity,matrix[v?3:0][j]);
assert(runDemo('dijkstra').frames.some(f=>f.message.includes('过期')));
for(const v of [0,1])for(let delta=-3;delta<=3;delta++){
 const a=[2,1,3+delta,4,2],r=runDemo('fenwick',v,delta).result;assert.equal(r.sum,a.slice(0,v?4:5).reduce((s,x)=>s+x,0));
 for(let i=1;i<=5;i++)assert.equal(r.tree[i-1],a.slice(i-(i&-i),i).reduce((s,x)=>s+x,0));
}
for(const [v,pattern,text]of [[0,'ababaca','abababaca'],[1,'aaa','aaaaa']]){
 const r=runDemo('kmp',v).result,pi=[];for(let i=0;i<pattern.length;i++){let best=0;for(let len=1;len<=i;len++)if(pattern.slice(0,len)===pattern.slice(i-len+1,i+1))best=len;pi.push(best)}assert.deepEqual(r.pi,pi);
 const positions=[];for(let i=0;i+pattern.length<=text.length;i++)if(text.slice(i,i+pattern.length)===pattern)positions.push(i);assert.deepEqual(r.matches,positions);
}
for(const [v,a]of [[0,[3,1,2,2,5,4]],[1,[2,3,1]]]){
 let best=0;for(let mask=0;mask<1<<a.length;mask++){const sub=a.filter((_,i)=>mask>>i&1);if(sub.every((x,i)=>i===0||sub[i-1]<x))best=Math.max(best,sub.length)}assert.equal(runDemo('lis',v).result.length,best);
}
// Enumerate all cuts of a short array; do not reuse the greedy feasibility routine.
const tasks=[7,2,5,10,8];for(let k=1;k<=5;k++){
 let best=Infinity;for(let mask=0;mask<1<<(tasks.length-1);mask++){const groups=[[]];for(let i=0;i<tasks.length;i++){groups.at(-1).push(tasks[i]);if(i<tasks.length-1&&(mask>>i&1))groups.push([])}if(groups.length<=k)best=Math.min(best,Math.max(...groups.map(g=>g.reduce((s,x)=>s+x,0))))}assert.equal(runDemo('split-answer',0,k).result.limit,best);
}
// Independent arithmetic for new static cases and interview examples.
const jobs=[[1,3,5],[2,5,6],[3,6,5],[6,7,4]];let best=0;for(let mask=0;mask<16;mask++){const selected=jobs.filter((_,i)=>mask>>i&1);if(selected.every((x,i)=>i===0||selected[i-1][1]<=x[0]))best=Math.max(best,selected.reduce((s,x)=>s+x[2],0))}assert.equal(best,14);
const weights=[[0,2,9,10],[1,0,6,4],[15,7,0,8],[6,3,12,0]];let tsp=Infinity;for(const a of [1,2,3])for(const b of [1,2,3])for(const c of [1,2,3])if(new Set([a,b,c]).size===3)tsp=Math.min(tsp,weights[0][a]+weights[a][b]+weights[b][c]+weights[c][0]);assert.equal(tsp,21);
assert.equal(10*30*5+10*5*60,4500);assert.equal(30*5*60+10*30*60,27000);
assert.equal(1+2+4+8,15);assert.equal(9+15,24);assert.equal((5+985)/1000,.99);
assert(Math.abs(Math.log(1+Math.exp(-1)+Math.exp(-2))-.4076059644443804)<1e-12);
assert.equal((2*3+9)/3,5);assert.equal(2*2*1*2*4*8*2,512);assert.equal(100*3**3,2700);
console.log('Expansion passed: source classification, 36 complete interview records, 8 advanced chapters, DSU/shortest-path/Fenwick/KMP/LIS/answer-search oracles and static arithmetic.');
