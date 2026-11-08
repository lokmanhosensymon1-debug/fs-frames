/* FS Frames – শেয়ার্ড স্ক্রিপ্ট: মেনু, WhatsApp/ফোন/সোশ্যাল লিংক, QR */
(()=>{
const D=window.FS_DATA||DEF,S=Object.assign({},DEF.settings,D.settings);{const s=S.ship||[],v=Math.max(0,+(s[1]||s[0])||0);S.ship=[v,v]}
window.FS={D,S,P:(D.products||[]).filter(p=>p.active!==false),R:(D.reviews||[]).filter(r=>!r.sample&&r.n&&r.t),
 wa:t=>'https://wa.me/'+S.wa+'?text='+encodeURIComponent(t),
 card:r=>{const im=r.imgData||r.img,st='★'.repeat(r.r)+'☆'.repeat(5-r.r),b='<div><div class="stars" role="img" aria-label="'+bn(r.r)+' স্টার">'+st+'</div><p>'+esc(r.t)+'</p><cite>— '+esc(r.n)+'</cite></div>';
  return im?'<blockquote class="rc photo"><img class="ph" src="'+esc(im)+'" alt="'+esc(r.n)+'-এর পাঠানো ছবি" loading="lazy">'+b+'</blockquote>':'<blockquote class="rc"><div class="av" aria-hidden="true">'+esc([...String(r.n)][0]||'?')+'</div>'+b+'</blockquote>'}};
const $=id=>document.getElementById(id),q=s=>document.querySelectorAll(s);
/* হ্যামবার্গার মেনু */
const hb=$('hb'),mn=$('menu');
const cm=()=>{mn.classList.remove('open');hb.setAttribute('aria-expanded','false');hb.setAttribute('aria-label','মেনু খুলুন')};
hb.addEventListener('click',e=>{e.stopPropagation();const o=mn.classList.toggle('open');hb.setAttribute('aria-expanded',o);hb.setAttribute('aria-label',o?'মেনু বন্ধ করুন':'মেনু খুলুন')});
document.addEventListener('click',e=>{if(!mn.contains(e.target))cm()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')cm()});
/* WhatsApp, ফোন, ট্যাগলাইন */
q('[data-wa]').forEach(a=>{a.href=FS.wa('আসসালামু আলাইকুম, ফ্রেম সম্পর্কে জানতে চাই।')});
q('[data-tel]').forEach(a=>{a.href='tel:'+String(S.phone).replace(/[^\d+]/g,'')});
q('[data-phone]').forEach(e=>{e.textContent=bn(S.phone)});
q('[data-tag]').forEach(e=>{e.textContent=S.tagline||''});
/* সোশ্যাল লিংক: সেটিংসে লিংক না থাকলে বোতাম লুকায় */
q('[data-s]').forEach(a=>{const u=safe(S[a.dataset.s]);if(u){a.href=u;a.hidden=false}else a.hidden=true});
const set=(i,t)=>{const e=$(i);if(e)e.textContent=t};
set('cwa',String(S.wa).replace(/^88/,''));set('cigh',handle(S.ig,1));set('cttk',handle(S.tt,1));
/* QR কোড */
const qg=$('qrg');
if(qg&&typeof FSQR!=='undefined'){
 const it=[['WhatsApp',waOk(S.wa)?'https://wa.me/'+S.wa:''],['Facebook',safe(S.fb)],['Instagram',safe(S.ig)],['TikTok',safe(S.tt)]].filter(x=>x[1]);
 const h=it.map(([n,u])=>{const v=FSQR.svg(u,{label:n+' QR কোড'});return v?'<a class="qrc" href="'+esc(u)+'" target="_blank" rel="noopener"><div class="qrt">'+v+'</div><b>'+n+'</b></a>':''}).join('');
 if(h){qg.innerHTML=h;qg.hidden=false;const b=$('qbox');if(b)b.hidden=false}
}
/* JSON-LD */
try{const l=document.querySelector('script[type="application/ld+json"]');if(l){const j=JSON.parse(l.textContent);j.telephone='+88'+String(S.phone).replace(/\D/g,'').replace(/^88/,'');j.sameAs=[S.fb,S.ig,S.tt].filter(safe);l.textContent=JSON.stringify(j)}}catch(e){}
})();
