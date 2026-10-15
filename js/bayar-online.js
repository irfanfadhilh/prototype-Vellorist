const o=VS.order(),k=VS.get().checkout||{},rp=VS.rp,no=k.no||VS.get().orderNo||'VEL-0000',total=k.total||o.subtotal,$=id=>document.getElementById(id);
$('no').textContent='#'+no;$('total').textContent=rp(total);
$('sum').innerHTML=VS.lines().concat(k.delivery===false?[]:[['Ongkir kurir',k.ship?rp(k.ship):rp(25000)]]).map(l=>'<li class="flex justify-between py-2"><span>'+l[0]+'</span><span class="font-semibold">'+l[1]+'</span></li>').join('');
$('meta').innerHTML=(k.delivery===false?'Ambil di studio':'Kirim ke: '+(k.recipient||'-')+', '+(k.address||'-'))+'<br>Jadwal: '+(k.date||'-')+' • '+(k.slot||'-');
const again=$('again');if(again)again.onclick=()=>{VS.reset();location.href='builder-bunga.html'};
const M=['QRIS','BCA VA','Mandiri VA','BRI VA','BNI VA'],PF={'BCA VA':'39201','Mandiri VA':'88608','BRI VA':'26215','BNI VA':'8277'};let cur=0;
const digits=((k.wa||'0').replace(/\D/g,'')+no.replace(/\D/g,'')).padStart(10,'0').slice(-10);
function qr(seed){let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;const r=()=>(h=(h*1664525+1013904223)>>>0)/4294967296,n=25;let d='';
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){let on;if((x<7||x>=n-7)&&(y<7||y>=n-7)&&!(x>=7&&x<n-7)&&!(y>=7&&y<n-7)){const lx=x<7?x:x-(n-7),ly=y<7?y:y-(n-7);on=lx===0||lx===6||ly===0||ly===6||(lx>1&&lx<5&&ly>1&&ly<5)}else on=r()>.52;if(on)d+='<rect x="'+x+'" y="'+y+'" width="1" height="1"/>'}
 return '<svg viewBox="-1 -1 27 27" class="w-48 h-48 mx-auto bg-white p-1 rounded" fill="#233329">'+d+'</svg>'}
function draw(){$('tabs').innerHTML=M.map((m,i)=>'<button type="button" data-i="'+i+'" class="px-4 py-2 rounded-full font-label-md text-label-md '+(i===cur?'bg-tertiary-container text-on-tertiary':'bg-surface-container text-primary')+'">'+m+'</button>').join('');
 $('panel').innerHTML=cur===0?qr(no)+'<p class="mt-3 font-body-sm text-body-sm text-on-surface-variant">Scan dengan GoPay, OVO, ShopeePay, atau Dana (simulasi).</p>':'<p class="font-label-md text-label-md uppercase text-on-surface-variant">Nomor Virtual Account '+M[cur].replace(' VA','')+'</p><p class="font-headline-md text-headline-md text-primary mt-1 tracking-wider">'+PF[M[cur]]+digits+'</p><button id="cp" type="button" class="mt-2 px-4 py-2 rounded-lg border border-primary/40 font-label-md text-label-md text-primary">Salin Nomor</button>';
 const cp=$('cp');if(cp)cp.onclick=()=>{navigator.clipboard&&navigator.clipboard.writeText(PF[M[cur]]+digits);VS.toast('Nomor VA disalin')}}
$('tabs').addEventListener('click',e=>{const b=e.target.closest('button');if(b){cur=+b.dataset.i;draw()}});draw();
let sec=86399;const iv=setInterval(()=>{sec--;const f=n=>String(n).padStart(2,'0');$('timer').textContent=f(sec/3600|0)+':'+f(sec%3600/60|0)+':'+f(sec%60);if(sec<=0)clearInterval(iv)},1000);
$('paid').onclick=()=>{clearInterval(iv);$('ok').classList.remove('hidden');$('panel').classList.add('hidden');$('tabs').classList.add('hidden');$('paid').classList.add('hidden')};
