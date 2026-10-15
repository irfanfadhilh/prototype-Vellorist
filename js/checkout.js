// Simple interactive micro-actions
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Toggle Collapsible Summary Banner
    const toggleBtn = document.getElementById('toggleSummaryBtn');
    const summaryDetails = document.getElementById('summaryDetails');
    const toggleIcon = document.getElementById('toggleIcon');
    const toggleText = document.getElementById('toggleText');

    if (toggleBtn && summaryDetails) {
      toggleBtn.addEventListener('click', () => {
        const isHidden = summaryDetails.classList.contains('hidden');
        if (isHidden) {
          summaryDetails.classList.remove('hidden');
          toggleIcon.style.transform = 'rotate(180deg)';
          toggleText.textContent = 'Tutup Rincian';
        } else {
          summaryDetails.classList.add('hidden');
          toggleIcon.style.transform = 'rotate(0deg)';
          toggleText.textContent = 'Lihat Rincian';
        }
      });
    }

    // 2. Delivery Option Switcher
    const tabPickup = document.getElementById('tabPickup');
    const tabDelivery = document.getElementById('tabDelivery');
    const deliveryAddressPanel = document.getElementById('deliveryAddressPanel');

    if (tabPickup && tabDelivery && deliveryAddressPanel) {
      tabPickup.addEventListener('click', () => {
        tabPickup.classList.add('bg-surface', 'shadow-sm', 'text-primary');
        tabPickup.classList.remove('bg-transparent', 'text-on-surface-variant');
        
        tabDelivery.classList.remove('bg-surface', 'shadow-sm', 'text-primary');
        tabDelivery.classList.add('bg-transparent', 'text-on-surface-variant');
        
        // Hide address panel gracefully
        deliveryAddressPanel.style.opacity = '0.4';
        deliveryAddressPanel.style.pointerEvents = 'none';
      });

      tabDelivery.addEventListener('click', () => {
        tabDelivery.classList.add('bg-surface', 'shadow-sm', 'text-primary');
        tabDelivery.classList.remove('bg-transparent', 'text-on-surface-variant');
        
        tabPickup.classList.remove('bg-surface', 'shadow-sm', 'text-primary');
        tabPickup.classList.add('bg-transparent', 'text-on-surface-variant');
        
        deliveryAddressPanel.style.opacity = '1';
        deliveryAddressPanel.style.pointerEvents = 'auto';
      });
    }

    // 3. Scroll to summary quick jump
    const scrollToSummaryBtn = document.getElementById('scrollToSummaryBtn');
    if (scrollToSummaryBtn) {
      scrollToSummaryBtn.addEventListener('click', () => {
        window.scrollTo({ top: 120, behavior: 'smooth' });
      });
    }
  });

(function(){
 const o=VS.order(),s=o.s,rp=VS.rp,$=id=>document.getElementById(id);
 let ship=25000,delivery=true,selDate=1,selSlot=1,custom=null;
 const no=VS.get().orderNo||('VEL-'+(1000+Math.floor(Math.random()*9000)));VS.set({orderNo:no});
 const rb=/^pita/i.test(s.ribbon.name)?s.ribbon.name:'Pita '+s.ribbon.name;
 const tot=[...document.querySelectorAll('span')].filter(e=>!e.children.length&&e.textContent.trim()==='Rp 151.000');
 const shipEl=VS.$t('Rp 25.000','span');
 VS.sub({'Rp 126.000':rp(o.subtotal),'8 TANGKAI':o.stems+' TANGKAI','#VEL-8942':'#'+no});
 const ce=[...document.querySelectorAll('p')].find(p=>p.textContent.includes('Komponen ('));
 if(ce)ce.textContent=(3+(s.card.on?1:0))+' Komponen ('+o.stems+' Tangkai Bunga + Wrapping '+s.paper.name+' + '+rb+(s.card.on?' + Kartu Linen':'')+')';
 const uls=document.querySelectorAll('#summaryDetails ul');
 const mk=(ul,rows)=>{if(!ul)return;const tpl=ul.firstElementChild;ul.innerHTML='';rows.forEach(r=>{const li=tpl.cloneNode(true),sp=li.querySelectorAll('span');sp[0].textContent=r[0];sp[1].textContent=r[1];ul.appendChild(li)})};
 mk(uls[0],o.items.map(f=>[f.qty+'× '+f.name,rp(f.qty*f.price)]));
 mk(uls[1],[[s.paper.name+' (kertas)',rp(s.paper.price)],[rb,s.ribbon.price?rp(s.ribbon.price):'Termasuk']].concat(s.card.on?[['Kartu Ucapan Linen + Segel Lilin','Gratis'],['"Untuk '+(s.card.to||'-')+'..."','(Disimpan)']]:[]));
 const upd=()=>{if(shipEl)shipEl.textContent=ship?rp(ship):'Gratis';tot.forEach(e=>e.textContent=rp(o.subtotal+ship))};upd();
 const tp=$('tabPickup'),td=$('tabDelivery');
 if(tp)tp.addEventListener('click',()=>{delivery=false;ship=0;upd()});
 if(td)td.addEventListener('click',()=>{delivery=true;ship=25000;upd()});
 // label alamat
 const chips=['Rumah','Kantor','Gedung Acara','Lainnya'].map(t=>[...document.querySelectorAll('button')].find(b=>b.textContent.trim()===t)).filter(Boolean);
 if(chips.length){const on=chips[0].className,off=chips[1].className;chips.forEach(b=>b.addEventListener('click',()=>chips.forEach(x=>x.className=x===b?on:off)))}
 // tanggal & slot (dirender ulang dengan tanggal asli)
 const cls=on=>'p-3 rounded-xl text-left transition-all '+(on?'bg-primary text-on-primary shadow-md':'bg-surface-container-low text-primary hover:bg-surface-container-high');
 const fmt=d=>d.toLocaleDateString('id-ID',{day:'numeric',month:'short'}),wd=d=>d.toLocaleDateString('id-ID',{weekday:'long'});
 const names=['Hari Ini','Besok','Lusa'],dates=[0,1,2].map(i=>{const d=new Date();d.setDate(d.getDate()+i);return d});
 const hi=VS.$t('Hari Ini','span'),dg=hi&&hi.closest('button').parentElement;
 if(dg){const pick=document.createElement('input');pick.type='date';pick.className='sr-only';pick.min=new Date().toISOString().slice(0,10);dg.parentElement.appendChild(pick);
  const rd=()=>{dg.innerHTML=dates.map((d,i)=>'<button type="button" data-d="'+i+'" class="'+cls(selDate===i)+'"><span class="block text-[11px] uppercase tracking-wider opacity-70">'+names[i]+'</span><span class="block font-headline-sm text-headline-sm">'+fmt(d)+'</span><span class="block text-[12px] opacity-80 capitalize">'+wd(d)+'</span></button>').join('')+'<button type="button" data-d="3" class="'+cls(selDate===3)+' flex flex-col items-center justify-center gap-1"><span class="material-symbols-outlined">calendar_month</span><span class="text-[11px] uppercase tracking-wider">'+(custom?fmt(custom):'Pilih Tanggal Lain')+'</span></button>'};
  rd();
  dg.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const i=+b.dataset.d;if(i===3){pick.showPicker?pick.showPicker():pick.click();return}selDate=i;rd()});
  pick.addEventListener('change',()=>{if(pick.value){custom=new Date(pick.value+'T00:00');selDate=3;rd()}});}
 const SL=[['Pagi','09:00 - 12:00','Kuntum baru mekar'],['Siang','13:00 - 15:00','Slot terpilih'],['Sore','16:00 - 18:00','Ideal untuk kado kerja'],['Malam','19:00 - 21:00','Makan malam / kejutan']];
 const pa=VS.$t('Pagi','span'),sg=pa&&pa.closest('button').parentElement;
 if(sg){const rs=()=>{sg.innerHTML=SL.map((x,i)=>'<button type="button" data-s="'+i+'" class="'+cls(selSlot===i)+'"><span class="block font-label-md text-label-md">'+x[0]+'</span><span class="block font-headline-sm text-headline-sm">'+x[1]+'</span><span class="block text-[12px] opacity-80">'+x[2]+'</span></button>').join('')};rs();
  sg.addEventListener('click',e=>{const b=e.target.closest('button');if(b){selSlot=+b.dataset.s;rs()}})}
 // kirim pesanan
 const submit=()=>{
  const need=[['ordererName','Nama pemesan'],['ordererWa','Nomor WhatsApp']].concat(delivery?[['recipientName','Nama penerima'],['recipientPhone','Telepon penerima'],['recipientAddress','Alamat lengkap']]:[]);
  for(const [id,l] of need){const e=$(id);if(!e||!e.value.trim()){if(e){e.focus();e.scrollIntoView({block:'center',behavior:'smooth'})}VS.toast(l+' wajib diisi');return}}
  const d=selDate===3?custom:dates[selDate],pay=document.querySelector('input[name="paymentOption"]:checked').value;
  VS.set({checkout:{no,name:$('ordererName').value,wa:$('ordererWa').value,notes:$('ordererNotes').value,delivery,recipient:$('recipientName').value,rphone:$('recipientPhone').value,address:$('recipientAddress').value,date:wd(d)+', '+fmt(d),slot:SL[selSlot][0]+' ('+SL[selSlot][1]+')',ship,total:o.subtotal+ship,pay}});
  location.href=pay==='whatsapp'?'bayar-whatsapp.html':'bayar-online.html'};
 document.querySelectorAll('button').forEach(b=>{if(b.textContent.includes('Pesan Sekarang'))b.addEventListener('click',submit)});
})();
