(()=>{
const {P,R}=FS,$=id=>document.getElementById(id);
$('hframe').innerHTML=P[0]?thumb(P[0]):art(0,'','');
$('pg').innerHTML=P.slice(0,6).map(p=>'<a class="card" href="order.html?p='+esc(p.id)+'" aria-label="'+esc(p.name)+' অর্ডার করুন">'+thumb(p)+'<h3>'+esc(p.name)+'</h3><div class="p">'+tk(p.prices[0])+' থেকে</div><span class="btn fill"><svg class="ic" aria-hidden="true"><use href="#i-bag"/></svg>অর্ডার করুন</span></a>').join('')||'<p class="sub">শীঘ্রই নতুন ফ্রেম আসছে।</p>';
$('hrv').innerHTML=R.length?R.slice(0,3).map(FS.card).join(''):'<div class="empty">অনুমোদিত রিভিউ শীঘ্রই এখানে দেখা যাবে।<br>ফ্রেম নিয়ে থাকলে আপনার অভিজ্ঞতা জানান।<br><a class="btn sm fill" href="reviews.html#give">রিভিউ দিন</a></div>';
})();
