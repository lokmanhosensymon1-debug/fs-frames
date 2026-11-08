(()=>{
const {R,S}=FS,$=id=>document.getElementById(id);
if(R.length){const avg=R.reduce((a,r)=>a+r.r,0)/R.length;
 $('rsum').hidden=false;$('rsum').innerHTML='<b>'+bn(avg.toFixed(1))+'</b> / ৫ · '+bn(R.length)+'টি রিভিউ';
 $('rv').innerHTML=R.map(FS.card).join('')}
else $('rv').innerHTML='<div class="empty">এখনো কোনো অনুমোদিত রিভিউ প্রকাশ হয়নি।<br>আপনার রিভিউ হোক প্রথম!<br><a class="btn sm fill" href="#give">রিভিউ দিন</a></div>';
if(safe(S.gform)){const g=$('rgf');g.href=safe(S.gform);g.hidden=false}
['rn','rt'].forEach(k=>$(k).addEventListener('input',()=>$(k).classList.remove('bad')));
$('rwa').onclick=()=>{const m=$('rmsg'),n=$('rn').value.trim(),t=$('rt').value.trim(),r=+$('rr').value;
 const bad=(k,x)=>{m.textContent=x;$(k).classList.add('bad');$(k).focus()};
 if(!n)return bad('rn','দয়া করে আপনার নাম ও এলাকা লিখুন।');
 if(t.length<8)return bad('rt','রিভিউ কমপক্ষে কয়েকটি শব্দে লিখুন।');
 const txt='FS Frames – নতুন রিভিউ\nনাম/এলাকা: '+n+'\nরেটিং: '+'★'.repeat(r)+'☆'.repeat(5-r)+' ('+bn(r)+'/৫)\nরিভিউ: '+t+'\nছবি: থাকলে এই চ্যাটে পাঠাচ্ছি\nপ্রকাশের অনুমতি: হ্যাঁ';
 m.textContent='WhatsApp খুলছে… মেসেজটি পাঠান ও চাইলে ছবি যোগ করুন।';
 const a=document.createElement('a');a.href=FS.wa(txt);a.target='_blank';a.rel='noopener';document.body.appendChild(a);a.click();a.remove()};
})();
