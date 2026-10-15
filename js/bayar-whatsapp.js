const o=VS.order(),k=VS.get().checkout||{},rp=VS.rp,no=k.no||VS.get().orderNo||'VEL-0000',total=k.total||o.subtotal,$=id=>document.getElementById(id);
$('no').textContent='#'+no;$('total').textContent=rp(total);
$('sum').innerHTML=VS.lines().concat(k.delivery===false?[]:[['Ongkir kurir',k.ship?rp(k.ship):rp(25000)]]).map(l=>'<li class="flex justify-between py-2"><span>'+l[0]+'</span><span class="font-semibold">'+l[1]+'</span></li>').join('');
$('meta').innerHTML=(k.delivery===false?'Ambil di studio':'Kirim ke: '+(k.recipient||'-')+', '+(k.address||'-'))+'<br>Jadwal: '+(k.date||'-')+' • '+(k.slot||'-');
const again=$('again');if(again)again.onclick=()=>{VS.reset();location.href='builder-bunga.html'};
const lines=['Halo Vellorist, saya ingin konfirmasi pesanan #'+no,'','Nama: '+(k.name||'-'),'Buket: '+o.items.map(f=>f.qty+'x '+f.name).join(', '),'Kertas: '+o.s.paper.name+' | '+o.s.ribbon.name,o.card.on?'Kartu: Untuk '+o.card.to+' — "'+o.card.msg+'"':'Tanpa kartu ucapan',k.delivery===false?'Ambil di studio':'Kirim ke: '+(k.recipient||'-')+', '+(k.address||'-'),'Jadwal: '+(k.date||'-')+' • '+(k.slot||'-'),'Total: '+rp(total)];
$('msg').textContent=lines.join('\n');$('wa').href='https://wa.me/6281234567890?text='+encodeURIComponent(lines.join('\n'));
