// Pure calculations shared by the offline reader and independent checks.
const frame=(message,view,rows=[])=>({message,view,rows});
const array=(values,active=[],labels=[])=>({kind:'array',values,active,labels});
const table=(headers,rows)=>({kind:'table',headers,rows});
const graphView=(edges,active=[],labels={})=>({kind:'graph',edges,active,labels,nodes:['A','B','C','D','E','F']});
const clone=x=>JSON.parse(JSON.stringify(x));
const fmt=x=>Number.isFinite(x)?Number(x.toFixed(5)):null;
export const demos=[
 {id:'hash',name:'哈希配对',example:'two-sum',variants:['[4,1,5,3]，目标 8','[3,3]，目标 6']},
 {id:'pointers',name:'容器双指针',example:'container',variants:['[2,7,4,6,3]','[1,1,1,1]']},
 {id:'window',name:'无重复字符窗口',example:'unique-window',variants:['abcaad','aaaa','abcde']},
 {id:'prefix',name:'前缀和计数',example:'prefix-count',variants:['[1,-1,1]，目标 1','[0,0,0]，目标 0']},
 {id:'stack',name:'每日温度单调栈',example:'temperatures',variants:['[20,24,22,27,21]','[20,20,21]']},
 {id:'bfs',name:'BFS 最短路',example:'bfs-path',variants:['从 A 出发','从孤立节点 F 出发']},
 {id:'topo',name:'拓扑排序与环',example:'topo-cycle',variants:['无环依赖','加入 E→C']},
 {id:'knapsack',name:'0/1 背包',example:'knapsack',variants:['[1,2,5]，容量 4','[1,2,3]，容量 4']},
 {id:'backtrack',name:'全排列回溯',example:'permutations',variants:['[1,2,3]','[1,2]']},
 {id:'binary',name:'Lower bound 二分',example:'lower-bound',variants:['[1,2,2,4,7]'],control:{label:'查找目标',min:0,max:8,step:1,value:2}},
 {id:'lru',name:'LRU 缓存',example:'lru-cache',variants:['容量 2','容量 3']},
 {id:'bce',name:'BCE 与预测置信度',example:'bce-confidence',variants:['真实标签 y=1','真实标签 y=0'],control:{label:'正类概率 p',min:.01,max:.99,step:.01,value:.49}},
 {id:'gd',name:'学习率与梯度下降',example:'learning-rate',variants:['初始 θ=4'],control:{label:'学习率 η',min:.05,max:2.3,step:.05,value:.1}},
 {id:'metrics',name:'阈值与混淆矩阵',example:'threshold-metrics',variants:['固定 8 个样本'],control:{label:'分类阈值（≥ 为正）',min:0,max:1,step:.05,value:.5}},
 {id:'attention',name:'缩放点积注意力',example:'attention',variants:['三个键均可见','屏蔽第三个键'],control:{label:'教学温度',min:.2,max:2,step:.1,value:1}},
 {id:'kmeans',name:'K-means 交替更新',example:'kmeans',variants:['初始中心都在左下','初始中心分居两侧']},
 {id:'rrf',name:'检索排名融合 RRF',example:'rrf',variants:['两路检索','只有关键词检索'],control:{label:'融合常数 k',min:1,max:80,step:1,value:60}},
 {id:'qlearning',name:'一次 Q-learning 更新',example:'q-update',variants:['非终止转移','真正终止状态'],control:{label:'步长 α',min:0,max:1,step:.05,value:.5}},
 {id:'world',name:'模型预测与位置反馈',example:'world-feedback',variants:['闭环比例反馈','固定动作 u=1'],control:{label:'每步外界扰动',min:-.8,max:.8,step:.1,value:-.3}},
 {id:'conv',name:'卷积核滑动',example:'convolution',variants:['对角核 [[1,0],[0,1]]','差分核 [[1,-1],[1,-1]]']}
];
export function runDemo(id,variant=0,value){
 const spec=demos.find(d=>d.id===id);if(!spec)throw new Error('Unknown demo '+id);
 if(!Number.isInteger(variant)||variant<0||variant>=spec.variants.length)variant=0;
 const p=spec.control?Math.min(spec.control.max,Math.max(spec.control.min,Number.isFinite(Number(value))?Number(value):spec.control.value)):0;
 const frames=[];let result;
 if(id==='hash'){
  const nums=variant?[3,3]:[4,1,5,3],target=variant?6:8,seen=new Map();result=null;
  for(let i=0;i<nums.length;i++){
   const need=target-nums[i],found=seen.has(need);
   frames.push(frame(`位置 ${i}：查询 ${need}，${found?'命中':'未命中'}；此时尚未写入当前位置。`,array(nums,[i,...(found?[seen.get(need)]:[])]),[['已见 值→下标',[...seen].map(([a,b])=>`${a}→${b}`).join('，')||'空']]));
   if(found){result=[seen.get(need),i];break}seen.set(nums[i],i);
  }
 }
 if(id==='pointers'){
  const nums=variant?[1,1,1,1]:[2,7,4,6,3];let l=0,r=nums.length-1,best=0;
  while(l<r){const area=(r-l)*Math.min(nums[l],nums[r]);best=Math.max(best,area);frames.push(frame(`端点 (${l},${r})；宽 ${r-l} × 短板 ${Math.min(nums[l],nums[r])} = ${area}。移动${nums[l]<=nums[r]?'左':'右'}侧。`,{kind:'bars',values:nums,active:[l,r],labels:nums.map((_,i)=>String(i))},[['历史最大',best]]));if(nums[l]<=nums[r])l++;else r--}result=best;
 }
 if(id==='window'){
  const chars=[...(variant===1?'aaaa':variant===2?'abcde':'abcaad')],seen=new Set();let l=0,best=0;
  for(let r=0;r<chars.length;r++){
   while(seen.has(chars[r])){const old=l;seen.delete(chars[l++]);frames.push(frame(`位置 ${r} 的 ${chars[r]} 重复，移走位置 ${old}；继续检查。`,array(chars,Array.from({length:r-l},(_,i)=>l+i)),[['待加入位置',r],['left',l],['历史最长',best]]))}
   seen.add(chars[r]);best=Math.max(best,r-l+1);frames.push(frame(`加入位置 ${r} 的 ${chars[r]}，当前窗口 ${l}…${r} 合法。`,array(chars,Array.from({length:r-l+1},(_,i)=>l+i)),[['当前长度',r-l+1],['历史最长',best]]));
  }result=best;
 }
 if(id==='prefix'){
  const nums=variant?[0,0,0]:[1,-1,1],target=variant?0:1,freq=new Map([[0,1]]);let s=0,count=0;
  frames.push(frame('空前缀 0 出现一次，尚未读取任何元素。',array(nums),[['历史前缀',JSON.stringify([...freq])],['累计区间数',0]]));
  for(let i=0;i<nums.length;i++){s+=nums[i];const hits=freq.get(s-target)||0;count+=hits;frames.push(frame(`前缀 ${s}，先查询 ${s-target}：找到 ${hits} 个，再记录当前前缀。`,array(nums,[i]),[['查询前频次表',JSON.stringify([...freq])],['累计区间数',count]]));freq.set(s,(freq.get(s)||0)+1)}result=count;
 }
 if(id==='stack'){
  const nums=variant?[20,20,21]:[20,24,22,27,21],stack=[],answer=nums.map(()=>0);
  for(let i=0;i<nums.length;i++){
   while(stack.length&&nums[i]>nums[stack.at(-1)]){const j=stack.pop();answer[j]=i-j;frames.push(frame(`位置 ${i} 更暖，弹出 ${j}，等待 ${i-j} 天。`,array(nums,[j,i]),[['栈（底→顶，下标）',stack.join(', ')||'空'],['答案',answer.join(', ')]]))}
   stack.push(i);frames.push(frame(`位置 ${i} 入栈，暂未找到其更暖日。`,array(nums,stack),[['栈（底→顶，下标）',stack.join(', ')],['答案',answer.join(', ')]]));
  }result=answer;
 }
 if(id==='bfs'){
  const edges=[['A','B'],['A','C'],['B','D'],['C','D'],['D','E']],start=variant?'F':'A',queue=[start],dist={[start]:0},parent={};
  frames.push(frame(`${start} 入队并标记，距离 0。`,graphView(edges,[start],dist),[['队列',queue.join(', ')]]));
  while(queue.length){const u=queue.shift();for(const [a,b]of edges)if(a===u&&dist[b]===undefined){dist[b]=dist[u]+1;parent[b]=u;queue.push(b)}frames.push(frame(`${u} 出队，尚未发现的邻居在入队时标记。`,graphView(edges,[u,...queue],dist),[['队列（头→尾）',queue.join(', ')||'空'],['父节点',JSON.stringify(parent)]]))}result={dist,parent};
 }
 if(id==='topo'){
  const edges=[['A','C'],['B','C'],['C','D'],['D','E'],...(variant?[['E','C']]:[])],degree=Object.fromEntries(['A','B','C','D','E','F'].map(n=>[n,0]));for(const [,b]of edges)degree[b]++;
  const queue=Object.keys(degree).filter(n=>degree[n]===0),order=[];
  frames.push(frame('统计全部节点入度，把所有零入度节点入队。',graphView(edges,queue,degree),[['队列',queue.join(', ')]]));
  while(queue.length){const u=queue.shift();order.push(u);for(const[a,b]of edges)if(a===u&&--degree[b]===0)queue.push(b);frames.push(frame(`处理 ${u}，减少其后继的入度；数字为剩余入度。`,graphView(edges,queue,degree),[['队列',queue.join(', ')||'空'],['输出顺序',order.join(' → ')]]))}
  frames.push(frame(order.length===6?'全部 6 个节点已输出。':'队列为空，仍有节点未输出：存在有向环。',graphView(edges,[],degree),[['处理数',order.length],['有环',order.length!==6?'是':'否']]));result={order,cycle:order.length!==6};
 }
 if(id==='knapsack'){
  const nums=variant?[1,2,3]:[1,2,5],dp=[true,false,false,false,false];
  frames.push(frame('只把容量 0 初始化为可达。',array(dp.map(x=>x?'可达':'—'),[],['0','1','2','3','4'])));
  for(const w of nums){if(w>4){frames.push(frame(`重量 ${w} 大于容量，跳过。`,array(dp.map(x=>x?'可达':'—'))));continue}for(let c=4;c>=w;c--){const before=dp[c];dp[c]=dp[c]||dp[c-w];frames.push(frame(`物品 ${w}，倒序更新容量 ${c}：读取容量 ${c-w}。`,array(dp.map(x=>x?'可达':'—'),[c],['0','1','2','3','4']),[['当前转移',`${before} 或 ${dp[c-w]} → ${dp[c]}`]]))}}result=dp[4];
 }
 if(id==='backtrack'){
  const nums=variant?[1,2]:[1,2,3],path=[],used=new Set(),answers=[];
  const snap=msg=>frames.push(frame(msg,array(nums,[...used]),[['路径',JSON.stringify(path)],['已完成排列',answers.map(a=>a.join('')).join('，')||'无']]));
  function dfs(){if(path.length===nums.length){answers.push([...path]);snap('保存当前路径的副本。');return}for(let i=0;i<nums.length;i++)if(!used.has(i)){used.add(i);path.push(nums[i]);snap(`选择 ${nums[i]}。`);dfs();path.pop();used.delete(i);snap(`撤销 ${nums[i]}，恢复兄弟分支的入口状态。`)}}snap('空路径开始。');dfs();result=answers;
 }
 if(id==='binary'){
  const nums=[1,2,2,4,7];let l=0,r=nums.length;
  while(l<r){const m=Math.floor((l+r)/2);frames.push(frame(`候选区间 [${l},${r})，mid=${m}，值 ${nums[m]} ${nums[m]<p?'<':'≥'} ${p}。`,array(nums,[m],nums.map((_,i)=>`${i}${i===l?' L':''}${i===r?' R':''}`)),[['本次更新',nums[m]<p?`left ← ${m+1}`:`right ← ${m}`]]));if(nums[m]<p)l=m+1;else r=m}
  frames.push(frame(`边界为 ${l}${l===nums.length?'，位于数组末尾之外':'，此处是第一个不小于目标的位置'}。`,array(nums,l<nums.length?[l]:[]),[['插入位置',l]]));result=l;
 }
 if(id==='lru'){
  const capacity=variant?3:2,list=[],ops=[['put',1],['put',2],['get',1],['put',3],['get',2],['put',4]];let hits=0,misses=0;
  for(const [op,key]of ops){const at=list.indexOf(key);let msg=`${op}(${key})：`;
   if(op==='get'&&at<0){misses++;msg+='未命中。'}else{if(op==='get'){hits++;msg+='命中并移到最前。'}if(at>=0)list.splice(at,1);list.unshift(key);if(list.length>capacity)msg+=`淘汰 ${list.pop()}。`}
   frames.push(frame(msg,array([...list],[0],list.map((_,i)=>i===0?'最近使用':i===list.length-1?'最久未用':'')),[['容量',capacity],['命中 / 未命中',`${hits} / ${misses}`]]));
  }result={list,hits,misses};
 }
 if(id==='bce'){
  const y=variant?0:1,loss=-(y*Math.log(p)+(1-y)*Math.log(1-p));frames.push(frame(`真实标签 ${y}；阈值 0.5 的预测为 ${p>=.5?1:0}。`,{kind:'bars',values:[p,1-p],labels:['正类概率','负类概率'],active:[y?0:1],max:1},[['单样本 BCE',fmt(loss)],['对应 logit',fmt(Math.log(p/(1-p)))],['给真实类别的概率',fmt(y?p:1-p)]]));result={loss,logit:Math.log(p/(1-p))};
 }
 if(id==='gd'){
  let theta=4;const values=[theta];frames.push(frame('初始参数 θ=4，目标 L=θ²/2。',array([theta],[],['θ']),[['损失',8]]));
  for(let t=1;t<=20;t++){const old=theta;theta=(1-p)*theta;values.push(theta);frames.push(frame(`第 ${t} 次更新：${fmt(old)} − ${p.toFixed(2)} × ${fmt(old)} = ${fmt(theta)}。`,{kind:'series',values:[...values],xLabel:'更新步数',yLabel:'参数 θ（无量纲）'},[['损失 L',fmt(theta*theta/2)],['更新系数 1−η',fmt(1-p)]]))}result={theta,values};
 }
 if(id==='metrics'){
  const scores=[.95,.8,.7,.6,.4,.3,.2,.05],labels=[1,0,1,0,1,0,0,0];let tp=0,fp=0,fn=0,tn=0;
  const rows=scores.map((s,i)=>{const pred=s>=p;if(pred&&labels[i])tp++;else if(pred)fp++;else if(labels[i])fn++;else tn++;return[i,s,labels[i],Number(pred)]});
  const precision=tp+fp?tp/(tp+fp):null,recall=tp/(tp+fn),f1=2*tp+fp+fn?2*tp/(2*tp+fp+fn):null;
  frames.push(frame(`分数 ≥ ${p.toFixed(2)} 判为正；只改变阈值，不改变分数。`,table(['样本','分数','真实','预测'],rows),[['TP / FP / FN / TN',`${tp} / ${fp} / ${fn} / ${tn}`],['Precision',precision===null?'未定义':fmt(precision)],['Recall / F1',`${fmt(recall)} / ${f1===null?'未定义':fmt(f1)}`],['Accuracy',fmt((tp+tn)/8)]]));result={tp,fp,fn,tn,precision,recall,f1};
 }
 if(id==='attention'){
  const logits=[1/Math.sqrt(2)/p,0,variant?-Infinity:1/Math.sqrt(2)/p],max=Math.max(...logits),exp=logits.map(x=>Math.exp(x-max)),sum=exp.reduce((a,b)=>a+b),weights=exp.map(x=>x/sum),values=[[2,0],[0,2],[1,1]],out=[0,0];for(let i=0;i<3;i++)for(let j=0;j<2;j++)out[j]+=weights[i]*values[i][j];
  frames.push(frame('q=[1,0]；分数除以 √2，再除以教学温度。',table(['键','缩放分数','Softmax 权重','值向量'],weights.map((w,i)=>[i+1,Number.isFinite(logits[i])?fmt(logits[i]):'屏蔽',fmt(w),JSON.stringify(values[i])])),[['权重总和',fmt(weights.reduce((a,b)=>a+b))],['加权输出',out.map(fmt).join(', ')]]));result={weights,out};
 }
 if(id==='kmeans'){
  const points=[[0,0],[0,2],[2,0],[7,7],[7,9],[9,7]];let centers=variant?[[0,0],[9,9]]:[[0,0],[2,0]],assignment=[];
  const distance=(a,b)=>(a[0]-b[0])**2+(a[1]-b[1])**2;
  const snap=msg=>{const sse=points.reduce((s,q,i)=>s+distance(q,centers[assignment[i]]),0);frames.push(frame(msg,{kind:'scatter',points:clone(points),centers:clone(centers),assignment:[...assignment],xLabel:'特征 x（无量纲）',yLabel:'特征 y（无量纲）'},[['簇内平方误差 SSE',fmt(sse)],['中心',JSON.stringify(centers.map(c=>c.map(fmt)))]]));return sse};
  for(let t=0;t<8;t++){const next=points.map(q=>distance(q,centers[0])<=distance(q,centers[1])?0:1),same=next.every((x,i)=>x===assignment[i]);assignment=next;snap(`第 ${t+1} 轮：分给最近的中心。`);if(same)break;centers=centers.map((old,k)=>{const members=points.filter((_,i)=>assignment[i]===k);return members.length?[0,1].map(j=>members.reduce((s,q)=>s+q[j],0)/members.length):old});snap(`第 ${t+1} 轮：中心移到各簇均值。`)}result={centers,assignment};
 }
 if(id==='rrf'){
  const lists=variant?[['A','B','C']]:[['A','B','C'],['C','B','D']],scores={};for(const list of lists)list.forEach((doc,i)=>scores[doc]=(scores[doc]||0)+1/(p+i+1));const ranked=Object.entries(scores).sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0]));
  frames.push(frame('关键词排名 A→B→C；'+(variant?'未使用向量列表。':'向量排名 C→B→D。'),{kind:'bars',labels:ranked.map(x=>x[0]),values:ranked.map(x=>x[1]),active:[0]},ranked.map(([doc,s])=>[doc+' 的融合分数',Number(s.toPrecision(8))])));result=ranked;
 }
 if(id==='qlearning'){
  const target=variant?1:1+.9*4,error=target-2,next=2+p*error;
  frames.push(frame(variant?'真正终止：目标只包含即时奖励。':'非终止：目标包含折扣后的下一状态最大价值。',table(['当前 Q','奖励 r','下一状态 max Q','γ'],[[2,1,4,.9]]),[['目标',target],['TD 误差',fmt(error)],['更新后 Q',fmt(next)]]));result={target,error,next};
 }
 if(id==='world'){
  let x=0;const values=[x];for(let t=1;t<=12;t++){const old=x,u=variant?1:Math.max(-1,Math.min(1,5-x)),pred=x+u;x=pred+p;values.push(x);frames.push(frame(`第 ${t} 步，从 ${fmt(old)} 出发；动作 ${fmt(u)}，模型忽略扰动。`,{kind:'series',values:[...values],reference:5,xLabel:'控制步数',yLabel:'位置（单位长度）'},[['预测下一位置',fmt(pred)],['实际下一位置',fmt(x)],['实际 − 预测',fmt(p)]]))}result={x,values};
 }
 if(id==='conv'){
  const input=[[1,2,3],[4,5,6],[7,8,9]],kernel=variant?[[1,-1],[1,-1]]:[[1,0],[0,1]],out=[[null,null],[null,null]];
  for(let r=0;r<2;r++)for(let c=0;c<2;c++){const terms=[];let sum=0;for(let i=0;i<2;i++)for(let j=0;j<2;j++){const v=input[r+i][c+j],k=kernel[i][j];sum+=v*k;terms.push(`${v}×${k}`)}out[r][c]=sum;frames.push(frame(`窗口 (${r},${c})：${terms.join(' + ')} = ${sum}。`,{kind:'matrix',input,kernel,output:clone(out),row:r,col:c},[['约定','不翻核的互相关；步长 1，无填充']]))}result=out;
 }
 if(!frames.length)throw new Error('Demo has no frames: '+id);
 return {id,variant,value:p,frames,result};
}
