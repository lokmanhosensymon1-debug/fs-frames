/* FS Frames – ছোট QR কোড জেনারেটর (কোনো বাইরের লাইব্রেরি/API নেই)
   Byte mode, ভার্সন ১–১০, ECC লেভেল M। FSQR.svg(text) → SVG স্ট্রিং, না পারলে null। */
const FSQR=(()=>{
 const ECC=[0,10,16,26,18,24,16,18,22,22,26],BLK=[0,1,1,1,2,2,4,4,4,5,5];
 const mul=(x,y)=>{let z=0;for(let i=7;i>=0;i--){z=(z<<1)^((z>>>7)*0x11D);z^=((y>>>i)&1)*x}return z};
 const divisor=d=>{const r=Array(d-1).fill(0);r.push(1);let root=1;for(let i=0;i<d;i++){for(let j=0;j<r.length;j++){r[j]=mul(r[j],root);if(j+1<r.length)r[j]^=r[j+1]}root=mul(root,2)}return r};
 const remainder=(data,div)=>{const r=div.map(()=>0);for(const b of data){const f=b^r.shift();r.push(0);div.forEach((c,i)=>r[i]^=mul(c,f))}return r};
 const rawModules=v=>{let r=(16*v+128)*v+64;if(v>=2){const n=Math.floor(v/7)+2;r-=(25*n-10)*n-55;if(v>=7)r-=36}return r};
 const dataCap=v=>Math.floor(rawModules(v)/8)-ECC[v]*BLK[v];
 function make(text){
  const bytes=[...new TextEncoder().encode(text)];let ver=0;
  for(let v=1;v<=10;v++){if(bytes.length+(v>=10?3:2)<=dataCap(v)){ver=v;break}}
  if(!ver)return null;
  const size=ver*4+17,bits=[],put=(val,n)=>{for(let i=n-1;i>=0;i--)bits.push((val>>>i)&1)};
  put(4,4);put(bytes.length,ver>=10?16:8);bytes.forEach(b=>put(b,8));
  const cap=dataCap(ver)*8;put(0,Math.min(4,cap-bits.length));put(0,(8-bits.length%8)%8);
  for(let p=0xEC;bits.length<cap;p^=0xEC^0x11)put(p,8);
  const data=[];for(let i=0;i<bits.length;i+=8)data.push(parseInt(bits.slice(i,i+8).join(''),2));
  const nb=BLK[ver],el=ECC[ver],raw=Math.floor(rawModules(ver)/8),ns=nb-raw%nb,sl=Math.floor(raw/nb),div=divisor(el),blocks=[];
  for(let i=0,k=0;i<nb;i++){const d=data.slice(k,k+sl-el+(i<ns?0:1));k+=d.length;const e=remainder(d,div);if(i<ns)d.push(0);blocks.push(d.concat(e))}
  const all=[];for(let i=0;i<blocks[0].length;i++)blocks.forEach((b,j)=>{if(i!==sl-el||j>=ns)all.push(b[i])});
  const M=Array.from({length:size},()=>Array(size).fill(false)),F=Array.from({length:size},()=>Array(size).fill(false));
  const setFn=(x,y,d)=>{M[y][x]=d;F[y][x]=true},bit=(v,i)=>((v>>>i)&1)!==0;
  for(let i=0;i<size;i++){setFn(6,i,i%2===0);setFn(i,6,i%2===0)}
  const finder=(x,y)=>{for(let dy=-4;dy<=4;dy++)for(let dx=-4;dx<=4;dx++){const d=Math.max(Math.abs(dx),Math.abs(dy)),xx=x+dx,yy=y+dy;if(xx>=0&&xx<size&&yy>=0&&yy<size)setFn(xx,yy,d!==2&&d!==4)}};
  finder(3,3);finder(size-4,3);finder(3,size-4);
  const ap=[];if(ver>1){const n=Math.floor(ver/7)+2,st=Math.ceil((ver*4+4)/(n*2-2))*2;ap.push(6);for(let p=size-7;ap.length<n;p-=st)ap.splice(1,0,p)}
  ap.forEach((x,i)=>ap.forEach((y,j)=>{if((i===0&&j===0)||(i===0&&j===ap.length-1)||(i===ap.length-1&&j===0))return;for(let dy=-2;dy<=2;dy++)for(let dx=-2;dx<=2;dx++)setFn(x+dx,y+dy,Math.max(Math.abs(dx),Math.abs(dy))!==1)}));
  const fmt=mask=>{const d=(0<<3)|mask;let r=d;for(let i=0;i<10;i++)r=(r<<1)^((r>>>9)*0x537);const b=((d<<10)|r)^0x5412;
   for(let i=0;i<=5;i++)setFn(8,i,bit(b,i));setFn(8,7,bit(b,6));setFn(8,8,bit(b,7));setFn(7,8,bit(b,8));for(let i=9;i<15;i++)setFn(14-i,8,bit(b,i));
   for(let i=0;i<8;i++)setFn(size-1-i,8,bit(b,i));for(let i=8;i<15;i++)setFn(8,size-15+i,bit(b,i));setFn(8,size-8,true)};
  fmt(0);
  if(ver>=7){let r=ver;for(let i=0;i<12;i++)r=(r<<1)^((r>>>11)*0x1F25);const b=(ver<<12)|r;for(let i=0;i<18;i++){const a=size-11+i%3,c=Math.floor(i/3);setFn(a,c,bit(b,i));setFn(c,a,bit(b,i))}}
  let k=0;for(let right=size-1;right>=1;right-=2){if(right===6)right=5;for(let vert=0;vert<size;vert++)for(let j=0;j<2;j++){const x=right-j,up=((right+1)&2)===0,y=up?size-1-vert:vert;if(!F[y][x]&&k<all.length*8){M[y][x]=bit(all[k>>>3],7-(k&7));k++}}}
  const MK=[(x,y)=>(x+y)%2===0,(x,y)=>y%2===0,(x,y)=>x%3===0,(x,y)=>(x+y)%3===0,(x,y)=>(Math.floor(x/3)+Math.floor(y/2))%2===0,(x,y)=>x*y%2+x*y%3===0,(x,y)=>(x*y%2+x*y%3)%2===0,(x,y)=>((x+y)%2+x*y%3)%2===0];
  const apply=m=>{for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!F[y][x]&&MK[m](x,y))M[y][x]=!M[y][x]};
  const pen=()=>{let s=0;for(let t=0;t<2;t++){for(let a=0;a<size;a++){let run=1;for(let b=1;b<size;b++){const c=t?M[b][a]:M[a][b],p=t?M[b-1][a]:M[a][b-1];if(c===p){run++;if(run===5)s+=3;else if(run>5)s++}else run=1}}}
   for(let y=0;y<size-1;y++)for(let x=0;x<size-1;x++){const c=M[y][x];if(c===M[y][x+1]&&c===M[y+1][x]&&c===M[y+1][x+1])s+=3}
   const pat=[1,0,1,1,1,0,1,0,0,0,0],pat2=[...pat].reverse();for(let t=0;t<2;t++)for(let a=0;a<size;a++)for(let b=0;b+11<=size;b++){let m1=true,m2=true;for(let i=0;i<11;i++){const v=(t?M[b+i][a]:M[a][b+i])?1:0;if(v!==pat[i])m1=false;if(v!==pat2[i])m2=false}if(m1)s+=40;if(m2)s+=40}
   let dk=0;M.forEach(r=>r.forEach(v=>{if(v)dk++}));s+=Math.floor(Math.abs(dk*20-size*size*10)/(size*size))*10;return s};
  let best=0,bp=1e9;for(let m=0;m<8;m++){apply(m);fmt(m);const p=pen();if(p<bp){bp=p;best=m}apply(m)}
  apply(best);fmt(best);return M}
 function svg(text,o){o=o||{};const M=make(text);if(!M)return null;const q=o.margin==null?4:o.margin,n=M.length+q*2;let d='';
  M.forEach((r,y)=>r.forEach((v,x)=>{if(v)d+=`M${x+q} ${y+q}h1v1h-1z`}));
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${n} ${n}" shape-rendering="crispEdges" role="img" aria-label="${(o.label||'QR কোড').replace(/[&<>"]/g,'')}"><rect width="${n}" height="${n}" fill="#fff"/><path d="${d}" fill="#000"/></svg>`}
 return{make,svg}
})();
if(typeof module!=='undefined')module.exports=FSQR;
