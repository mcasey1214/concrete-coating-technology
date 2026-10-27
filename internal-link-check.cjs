const fs=require('node:fs');const path=require('node:path');const assert=require('node:assert/strict');
const root=path.join(__dirname,'cct-website','site');const files=[];
function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())walk(file);else if(entry.name.endsWith('.html'))files.push(file)}}walk(root);
let checked=0;const missing=[];
for(const file of files){const html=fs.readFileSync(file,'utf8');for(const match of html.matchAll(/href="(\/[^"#?]*)/g)){const href=match[1];const target=path.join(root,href.replace(/^\//,''));const exists=href==='/'?fs.existsSync(path.join(root,'index.html')):(fs.existsSync(path.join(target,'index.html'))||fs.existsSync(target));checked++;if(!exists)missing.push({file:path.relative(root,file),href})}}
assert.deepEqual(missing,[]);const report={htmlFiles:files.length,localAnchorsChecked:checked,missing:missing.length};fs.writeFileSync(path.join(__dirname,'cct-website','internal-link-check.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
