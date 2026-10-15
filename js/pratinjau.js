(function(){
 const o=VS.order(),s=o.s,c=s.card,rp=VS.rp,rb=/^pita/i.test(s.ribbon.name)?s.ribbon.name:'Pita '+s.ribbon.name;
 VS.sub({'8 Tangkai Harmonis':o.stems+' Tangkai Harmonis','Wrapping Pink Floral Vintage':'Wrapping '+s.paper.name,'Pita Sutra Dusty Rose':rb,'Rp 126.000':rp(o.subtotal)});
 const first=VS.$t('Mawar Merah Velvet');
 if(first){const row=first.parentElement.parentElement,list=row.parentElement,tpl=row.cloneNode(true);list.innerHTML='';
  const add=(a,b,p)=>{const r=tpl.cloneNode(true),sp=r.querySelectorAll('span');sp[0].textContent=a;sp[1].textContent=b;sp[2].textContent=p;list.appendChild(r)};
  o.items.forEach(f=>add(f.name,f.qty+' tangkai × '+rp(f.price),rp(f.qty*f.price)));
  add('Kertas Pembungkus ('+s.paper.name+')','Waterproof matte paper + '+rb,rp(o.wrap));
  if(c.on)add('Kartu Ucapan Spesial','Letterpress Linen + Lilin Botani','Gratis');}
 const h=VS.$t('Pesan di Kartu Ucapan','h3'),box=h&&h.closest('div[class*="rounded"]');
 if(!c.on){if(box)box.style.display='none'}
 else{const set=(old,v)=>{const e=VS.$t(old,'span');if(e)e.textContent=v};
  set('Clara Vanesa',c.to||'-');set('Pengagum Rahasiamu',c.from||'Anonim');
  set('Linen Letterpress',{linen:'Linen Letterpress',sage:'Botanical Sage',blush:'Blush Pearl'}[c.material]||'Linen Letterpress');
  const q=[...document.querySelectorAll('p')].find(p=>p.textContent.includes('Selamat ulang tahun'));if(q)q.textContent='“'+(c.msg||'Tanpa pesan')+'”';}
 const wa=document.querySelector('a[href^="https://wa.me/?text"]');
 if(wa)wa.href='https://wa.me/?text='+encodeURIComponent('Halo, lihat rangkaian buket pesanan saya di Vellorist Atelier!\n'+o.items.map(f=>f.qty+'x '+f.name).join(', ')+'\nTotal: '+rp(o.subtotal));
 document.querySelectorAll('button').forEach(b=>{const t=b.textContent.trim();
  if(/Ubah Buket/.test(t))b.onclick=()=>{location.href='builder-bunga.html'};
  else if(b.id==='pesanSekarangBtn')b.onclick=()=>{VS.toast('Mengarahkan ke halaman checkout aman...');setTimeout(()=>{location.href='checkout.html'},500)};
  else if(b.id==='downloadBtn')b.onclick=()=>VS.toast('Unduh gambar belum aktif di prototype ini.')});
})();
