// One-time idempotent migration of the supplied standalone player template.
import fs from 'node:fs';
const file = new URL('../src/player.html', import.meta.url);
let html = fs.readFileSync(file, 'utf8');
if (html.includes('function applyLocation(')) { console.log('Player migration already applied.'); process.exit(0); }
html = html.replace('<title>CS 与 AI 通识有声书 · 扩充版</title>', '<title>dictionary of computer science and AI · 有声笔记</title>');
html = html.replace('CS / AI · AUDIO NOTES · V2', 'DICTIONARY OF COMPUTER SCIENCE AND AI');
html = html.replace('计算机科学与现代 AI 通识有声书', '计算机科学与 AI 知识词典');
html = html.replace('<button class="small" id="downloadBook">导出全书 TXT</button>', '<button class="small" id="downloadBook">导出全书 TXT</button><button class="small" id="copyLink">复制当前位置链接</button>');
html = html.replace('cs_ai_v2_full.txt 或 cs_ai_v2_full.md', 'text/cs_ai_v2_full.txt 或 cs_ai_v2_full.md');
html = html.replace("'80 讲 · 新增 52 讲<br>343 个细讲小节 · 90 道口述题'", "`${book.stats.chapters} 讲 · ${book.stats.glossary_entries} 个词条组<br>${book.stats.new_subsections} 个细讲小节 · ${book.stats.quiz_questions} 道口述题`");
html = html.replace("const c=chapters[current];c.blocks.forEach", "const c=chapters[current];c.blocks.forEach");
// Keep history location tied to a stable section ordinal, independent of paragraph count.
html = html.replace('function jumpBlock(bi,autoplay){', `function locationHash(bi){const c=chapters[current];const section=[...c.toc].reverse().find(s=>s.index<=bi);return '#'+(section?section.anchor:'chapter-'+c.num)}
function writeLocation(bi){try{history.replaceState(null,'',locationHash(bi))}catch(e){}}
function jumpBlock(bi,autoplay){writeLocation(bi);`);
const initialHash = "const hash=location.hash.match(/^#chapter-(\\d+)$/);if(hash){const id=Number(hash[1])-1;if(chapters[id]){if(id!==current)part=0;current=id}}";
if (!html.includes(initialHash)) throw new Error('Initial hash block not found');
html = html.replace(initialHash, `function applyLocation(initial=false){const match=location.hash.match(/^#chapter-(\\d+)(?:-section-(\\d+))?$/);if(!match)return;const id=Number(match[1])-1;if(!chapters[id])return;const section=match[2]?chapters[id].toc[Number(match[2])-1]:null;if(match[2]&&!section)return;if(initial){if(id!==current||section)part=0;current=id;return section?.index}else{selectChapter(id,false);if(section)jumpBlock(section.index,false)}}
const initialSection=applyLocation(true);`);
html = html.replace("renderFilters();renderChapter();populateVoices();if(synth)", "renderFilters();renderChapter();if(initialSection!==undefined)jumpBlock(initialSection,false);populateVoices();if(synth)");
html = html.replace('// Tiny inspection surface', `window.addEventListener('hashchange',()=>applyLocation(false));
$('copyLink').onclick=async()=>{const hash=locationHash(chunks[part]?.block??-1);writeLocation(chunks[part]?.block??-1);const url=location.href.split('#')[0]+hash;try{await navigator.clipboard.writeText(url);status(location.protocol==='file:'?'已复制本机文件位置；他人需下载资料后打开相同小节。':'已复制当前小节链接。')}catch(e){status('当前位置：'+hash+'；可从浏览器地址栏复制。')}};
// Tiny inspection surface`);
fs.writeFileSync(file, html);
console.log('Player section-link migration applied.');
