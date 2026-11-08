(()=>{
const {P}=FS,$=id=>document.getElementById(id),SZ=FS.S.sizes||['৮×১০ ইঞ্চি','১২×১৮ ইঞ্চি'];
let G=P.slice(),li=0,cat='';
const CS=[...new Set(P.map(p=>p.cat).filter(Boolean))];
function chips(){const c=$('cats');if(!CS.length){c.hidden=true;return}c.hidden=false;c.innerHTML=['',...CS].map(x=>'<button type="button" class="chip'+(x===cat?' on':'')+'" data-c="'+esc(x)+'" aria-pressed="'+(x===cat)+'">'+(x?esc(x):'সব')+'</button>').join('')}
function draw(){G=P.filter(p=>!cat||p.cat===cat);const m=$('sort').value;if(m==='lo')G.sort((a,b)=>a.prices[0]-b.prices[0]);if(m==='hi')G.sort((a,b)=>b.prices[0]-a.prices[0]);
 $('grid').innerHTML=G.map((p,i)=>'<button type="button" class="card" data-i="'+i+'" aria-label="'+esc(p.name)+' বিস্তারিত">'+thumb(p)+'<h3>'+esc(p.name)+'</h3><div class="p">'+tk(p.prices[0])+' থেকে</div><span class="btn sm">বিস্তারিত দেখুন</span></button>').join('')||'<p class="sub">শীঘ্রই নতুন ফ্রেম আসছে।</p>'}
$('sort').onchange=draw;$('cats').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;cat=b.dataset.c;chips();draw()});chips();draw();
const lb=$('lb'),box=$('lbbox');
function show(i){if(!G.length)return;li=(i+G.length)%G.length;const p=G[li];box.classList.remove('z');box.innerHTML=thumb(p);$('lbc').textContent=bn(li+1)+' / '+bn(G.length);
 $('lbinfo').innerHTML=(p.cat?'<small class="tagc">'+esc(p.cat)+'</small>':'')+'<h3>'+esc(p.name)+'</h3><p>'+esc(p.desc)+'</p><ul>'+SZ.map((s,k)=>'<li><span>'+esc(s)+'</span><b>'+tk(p.prices[k])+'</b></li>').join('')+'</ul><a class="btn fill" href="order.html?p='+esc(p.id)+'">এই ফ্রেম অর্ডার করুন</a><p class="lbhint">ছবিতে ট্যাপ করে জুম করুন · ‹ › দিয়ে অন্য ফ্রেম দেখুন</p>'}
const cl=()=>{lb.classList.remove('on');document.body.style.overflow=''};
$('grid').addEventListener('click',e=>{const c=e.target.closest('.card');if(!c)return;show(+c.dataset.i);lb.classList.add('on');document.body.style.overflow='hidden';$('lbx').focus()});
$('lbx').onclick=cl;$('lbp').onclick=()=>show(li-1);$('lbnx').onclick=()=>show(li+1);
lb.addEventListener('click',e=>{if(e.target===lb)cl()});
document.addEventListener('keydown',e=>{if(!lb.classList.contains('on'))return;if(e.key==='Escape')cl();if(e.key==='ArrowLeft')show(li-1);if(e.key==='ArrowRight')show(li+1)});
const org=e=>{const r=box.getBoundingClientRect();box.style.setProperty('--ox',((e.clientX-r.left)/r.width*100)+'%');box.style.setProperty('--oy',((e.clientY-r.top)/r.height*100)+'%')};
box.addEventListener('click',e=>{org(e);box.classList.toggle('z')});
box.addEventListener('pointermove',e=>{if(box.classList.contains('z'))org(e)});
let tx=null;box.addEventListener('touchstart',e=>{tx=e.touches[0].clientX},{passive:true});
box.addEventListener('touchend',e=>{if(tx==null||box.classList.contains('z'))return;const d=e.changedTouches[0].clientX-tx;tx=null;if(Math.abs(d)>60)show(li+(d<0?1:-1))});
})();
