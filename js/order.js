(()=>{
const {P,S}=FS,$=id=>document.getElementById(id);
const SZ=S.sizes||['৮×১০ ইঞ্চি','১২×১৮ ইঞ্চি'],COL={'':'স্বয়ংক্রিয়','#f3d77a':'সোনালি','#ffffff':'সাদা','#111111':'কালো'};
let photo='';
$('design').innerHTML=P.map((p,i)=>'<option value="'+i+'">'+esc(p.name)+'</option>').join('');
$('sizes').innerHTML=SZ.map((s,i)=>'<div><input type="radio" name="size" id="s'+i+'" value="'+i+'"'+(i?'':' checked')+'><label for="s'+i+'">'+esc(s)+'<b id="p'+i+'"></b></label></div>').join('');
try{const id=new URLSearchParams(location.search).get('p'),k=P.findIndex(p=>p.id===id);if(k>=0)$('design').value=k}catch(e){}
try{const c=JSON.parse(localStorage.getItem('fs_cust')||'{}');['cn','ph','ad'].forEach(k=>{if(c[k])$(k).value=c[k]})}catch(e){}
const cur=()=>P[+$('design').value]||P[0];
function upd(){const p=cur();if(!p)return;const s=+document.querySelector('[name=size]:checked').value,q=+$('qty').value,z=+$('zone').value,nm=$('pname').value.trim();
 $('pv').innerHTML=(photo||nm)?'<div class="th">'+art(p.style,photo,nm,$('ncol').value)+'</div>':thumb(p);$('pvname').textContent=nm;
 SZ.forEach((_,i)=>{$('p'+i).textContent=tk(p.prices[i])});
 const sub=p.prices[s]*q;$('sub').textContent=tk(sub);$('dc').textContent=tk(S.ship[z]);$('tot').textContent=tk(sub+S.ship[z])}
document.querySelectorAll('#f select,#f input[name=size],#pname').forEach(e=>e.addEventListener('input',upd));
['cn','ph','ad'].forEach(k=>$(k).addEventListener('input',()=>$(k).classList.remove('bad')));
$('photo').addEventListener('change',e=>{const f=e.target.files[0];if(!f)return;if(f.size>15e6){$('msg').textContent='ছবিটি অনেক বড় (১৫ MB-এর বেশি)। ছোট ছবি বাছুন।';e.target.value='';return}const r=new FileReader();r.onload=()=>{photo=r.result;upd()};r.readAsDataURL(f)});
if(!P.length){$('msg').textContent='এখন কোনো ফ্রেম পাওয়া যাচ্ছে না।'}else upd();
function data(){const p=cur(),s=+document.querySelector('[name=size]:checked').value,q=+$('qty').value,z=+$('zone').value;
 return{d:p.name,sz:SZ[s],q,nm:$('pname').value.trim(),nc:COL[$('ncol').value],gift:$('gift').value.trim(),cn:$('cn').value.trim(),ph:en($('ph').value).replace(/[\s-]/g,''),ad:$('ad').value.trim(),zone:'সারাদেশে কুরিয়ার',sub:p.prices[s]*q,dc:S.ship[z],has:!!photo}}
function build(){const m=$('msg');['cn','ph','ad'].forEach(k=>$(k).classList.remove('bad'));
 const bad=(k,t)=>{m.textContent=t;$(k).classList.add('bad');$(k).focus();return null};
 if(!P.length){m.textContent='এখন কোনো ফ্রেম পাওয়া যাচ্ছে না।';return null}
 if(!waOk(S.wa)){m.textContent='দোকানের WhatsApp নম্বর সঠিকভাবে সেট করা নেই।';return null}
 const o=data();
 if(!o.cn)return bad('cn','দয়া করে আপনার নাম দিন।');
 if(!/^(?:\+?88)?01[3-9]\d{8}$/.test(o.ph))return bad('ph','সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (01XXXXXXXXX)।');
 if(o.ad.length<6)return bad('ad','সম্পূর্ণ ঠিকানা দিন (এলাকা, থানা, জেলাসহ)।');
 try{localStorage.setItem('fs_cust',JSON.stringify({cn:o.cn,ph:o.ph,ad:o.ad}))}catch(e){}
 const id='FS-'+Date.now().toString(36).toUpperCase().slice(-5);
 return 'FS Frames – নতুন অর্ডার\nঅর্ডার নং: '+id+'\nফ্রেম: '+o.d+'\nসাইজ: '+o.sz+'\nপরিমাণ: '+bn(o.q)+'\nফ্রেমে নাম: '+(o.nm||'নেই')+'\n'+(o.nm?'নামের রং: '+o.nc+'\n':'')+(o.gift?'উপহার বার্তা: '+o.gift+'\n':'')+'নিজের ছবি: '+(o.has?'আছে (এখনই পাঠাচ্ছি)':'নেই')+'\nনাম: '+o.cn+'\nমোবাইল: '+o.ph+'\nঠিকানা: '+o.ad+'\nডেলিভারি পদ্ধতি: '+o.zone+' (ক্যাশ অন ডেলিভারি)'+'\nমূল্য: '+tk(o.sub)+'\nডেলিভারি: '+tk(o.dc)+'\nমোট: '+tk(o.sub+o.dc)+'\nপেমেন্ট: ক্যাশ অন ডেলিভারি'}
$('wabtn').onclick=()=>{const t=build();if(!t)return;$('msg').textContent='WhatsApp খুলছে… মেসেজটি পাঠান। নিজের ছবি থাকলে চ্যাটে পাঠিয়ে দিন।';
 const a=document.createElement('a');a.href=FS.wa(t);a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()};
$('cpy').onclick=async()=>{const t=build();if(!t)return;try{await navigator.clipboard.writeText(t)}catch(e){const a=document.createElement('textarea');a.value=t;document.body.appendChild(a);a.select();document.execCommand('copy');a.remove()}$('msg').textContent='অর্ডার মেসেজ কপি হয়েছে। WhatsApp-এ পেস্ট করে পাঠান।'};
})();
