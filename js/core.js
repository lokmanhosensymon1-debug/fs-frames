const bn=n=>String(n).replace(/\d/g,x=>'০১২৩৪৫৬৭৮৯'[x]);
const en=s=>String(s).replace(/[০-৯]/g,x=>'০১২৩৪৫৬৭৮৯'.indexOf(x));
const tk=n=>'৳'+bn(Number(n||0).toLocaleString('en-IN'));
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DEF={settings:{wa:'8801875911584',phone:'01875911584',fb:'https://www.facebook.com/share/1DL19KpFXB/',ig:'https://www.instagram.com/fsframes1',tt:'https://www.tiktok.com/@sretir12',tagline:'আপনার স্মৃতি থাকুক প্রেমে বন্দি',ship:[120,120],sizes:['৮×১০ ইঞ্চি','১২×১৮ ইঞ্চি']},reviews:[],products:[{id:'p1',name:'রয়্যাল গোল্ড',desc:'ক্লাসিক গোল্ড বর্ডার।',prices:[850,1450],image:'',style:0,active:true},{id:'p2',name:'মডার্ন ব্ল্যাক',desc:'কালো ফ্রেম, সাদা ম্যাট।',prices:[850,1450],image:'',style:1,active:true}]};
async function loadData(){const d=window.FS_DATA||DEF;if(d&&d.settings){const s=d.settings.ship||[],v=Math.max(0,+(s[1]||s[0])||0);d.settings.ship=[v,v]}return d}
const safe=u=>/^https?:\/\//i.test(u||'')?u:'';
const PAL=[{f:['#f3d77a','#b8862b'],m:'#f6f3ec',a:['#2b1d0a','#7a5a1e']},{f:['#2a2a2a','#0b0b0b'],m:'#f6f3ec',a:['#1c1c1c','#666']},{f:['#e8c765','#8f6b1e'],m:'#101010',a:['#0e2a22','#1d6b55'],geo:1},{f:['#d9b35a','#7c5a17'],m:'#efe8d8',a:['#2d3b22','#7d8f4a'],leaf:1},{f:['#fff','#cfcfcf'],m:'#f6f3ec',a:['#3a2e1c','#c8a05a']},{f:['#f3d77a','#9a7220'],m:'#1a1408',a:['#4a1d1d','#b0403a'],dbl:1}];
let _n=0;
function art(st,photo,name,nc){
 const d=PAL[(st||0)%PAL.length],k='x'+(++_n),h=name?330:376;
 let s=`<svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ফ্রেম"><defs><linearGradient id="g${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${d.f[0]}"/><stop offset=".5" stop-color="${d.f[1]}"/><stop offset="1" stop-color="${d.f[0]}"/></linearGradient><linearGradient id="a${k}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${d.a[0]}"/><stop offset="1" stop-color="${d.a[1]}"/></linearGradient><clipPath id="c${k}"><rect x="62" y="62" width="276" height="${h}"/></clipPath></defs><rect width="400" height="500" fill="#050505"/><rect x="14" y="14" width="372" height="472" fill="url(#g${k})"/>`;
 if(d.dbl)s+=`<rect x="30" y="30" width="340" height="440" fill="none" stroke="#1a1305" stroke-width="3"/><rect x="38" y="38" width="324" height="424" fill="url(#g${k})"/>`;
 s+=`<rect x="46" y="46" width="308" height="408" fill="${d.m}"/><rect x="62" y="62" width="276" height="${h}" fill="url(#a${k})"/>`;
 if(photo)s+=`<image href="${photo}" x="62" y="62" width="276" height="${h}" preserveAspectRatio="xMidYMid slice" clip-path="url(#c${k})"/>`;
 else{s+=`<g clip-path="url(#c${k})" opacity=".85"><circle cx="200" cy="170" r="52" fill="rgba(255,255,255,.18)"/><path d="M62 400Q150 250 220 330T338 280V440H62Z" fill="rgba(0,0,0,.35)"/><path d="M62 430Q170 330 250 380T338 350V440H62Z" fill="rgba(0,0,0,.35)"/>`;
  if(d.geo)for(let i=0;i<5;i++)for(let j=0;j<6;j++)s+=`<path d="M${90+i*55} ${90+j*52}l12 12-12 12-12-12z" fill="none" stroke="#d4a843" stroke-opacity=".5"/>`;
  if(d.leaf)s+=`<path d="M120 400C150 300 200 250 270 130" stroke="#d4a843" stroke-width="3" fill="none"/>`+[0,1,2,3].map(q=>`<ellipse cx="${150+q*28}" cy="${340-q*55}" rx="26" ry="9" transform="rotate(-40 ${150+q*28} ${340-q*55})" fill="#d4a843" opacity=".8"/>`).join('');
  s+='</g>'}
 if(name&&nc)s+=`<rect x="64" y="402" width="272" height="42" rx="3" fill="${nc==='#111111'?'#f6f3ec':'#111'}" stroke="#d4a843" stroke-opacity=".6"/>`;
 if(name)s+=`<text x="200" y="432" text-anchor="middle" font-family="Inter,Noto Sans Bengali,sans-serif" font-size="${Math.max(14,Math.min(26,Math.floor(300/(String(name).length*.9))))}" font-weight="700" letter-spacing="${String(name).length>12?1.5:3}" fill="${nc||(d.m==='#101010'||d.m==='#1a1408'?'#f3d77a':'#8f6b1e')}">${esc(name)}</text>`;
 return s+'</svg>'}
function thumb(p){const u=p.imgData||p.image;return `<div class="th">${u?`<img src="${esc(u)}" alt="${esc(p.name)}" loading="lazy">`:art(p.style,'','')}</div>`}
/* সোশ্যাল লিংক থেকে হ্যান্ডেল বের করা (যেমন .../@sretir12 → @sretir12) */
const handle=(u,at)=>{try{const p=new URL(u).pathname.split('/').filter(Boolean),h=p.find(x=>x[0]==='@')||p[p.length-1]||'';return h?(at&&h[0]!=='@'?'@':'')+h:''}catch(e){return ''}};
const waOk=w=>/^8801[3-9]\d{8}$/.test(String(w||''));
