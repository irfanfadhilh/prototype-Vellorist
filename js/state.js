(function(){
const K='vellorist-proto';
const FL=[[1,'Mawar Merah Velvet',18000],[2,'Peony Blush Bernhardt',45000],[3,'Tulip Putih Royal',22000],[4,"Baby's Breath Cloud",12000],[5,'Mawar Kuning Soleil',16000]];
const DEF={qty:{1:3,2:2,3:1,4:2,5:0},paper:{name:'Pink Floral Vintage',price:15000},ribbon:{name:'Pita Sutra Dusty Rose',price:0},
 card:{on:true,to:'Clara Vanesa',from:'Pengagum Rahasiamu',msg:'Selamat ulang tahun, Clara! Semoga tahun ini dipenuhi dengan kebahagiaan, mimpi yang bermekaran, dan senyuman secerah kelopak mawar. Love always.',material:'linen',font:'cursive'}};
const read=()=>{try{return JSON.parse(localStorage.getItem(K))||{}}catch(e){return{}}};
window.VS={
 rp:n=>'Rp '+Number(n).toLocaleString('id-ID'),
 get(){const s=read();return Object.assign({},DEF,s,{card:Object.assign({},DEF.card,s.card)})},
 set(p){try{localStorage.setItem(K,JSON.stringify(Object.assign(read(),p)))}catch(e){}},
 reset(){try{localStorage.removeItem(K)}catch(e){}},
 order(){const s=this.get(),items=FL.map(([id,name,price])=>({id,name,price,qty:+(s.qty[id]||0)})).filter(f=>f.qty>0),
  stems=items.reduce((a,f)=>a+f.qty,0),flowers=items.reduce((a,f)=>a+f.qty*f.price,0),wrap=s.paper.price+s.ribbon.price;
  return{s,items,stems,flowers,wrap,subtotal:flowers+wrap,card:s.card}},
 lines(){const o=this.order();return o.items.map(f=>[f.qty+'× '+f.name,this.rp(f.qty*f.price)]).concat([['Kertas '+o.s.paper.name,this.rp(o.s.paper.price)],[o.s.ribbon.name,o.s.ribbon.price?this.rp(o.s.ribbon.price):'Termasuk'],['Kartu ucapan',o.card.on?'Gratis':'—']])},
 $t(t,sel='span,p,h2,h3,h4,div'){return[...document.querySelectorAll(sel)].find(e=>!e.children.length&&e.textContent.replace(/\s+/g,' ').trim()===t)},
 sub(map){const re=new RegExp(Object.keys(map).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|'),'g'),w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;
  while(n=w.nextNode()){if(re.test(n.nodeValue)){re.lastIndex=0;n.nodeValue=n.nodeValue.replace(re,m=>map[m])}re.lastIndex=0}},
 toast(m){let t=document.getElementById('vs-toast');if(!t){t=document.createElement('div');t.id='vs-toast';t.className='fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-lg transition-opacity duration-300 opacity-0 pointer-events-none';document.body.appendChild(t)}
  t.textContent=m;t.classList.remove('opacity-0');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.add('opacity-0'),2800)}
};
document.addEventListener('DOMContentLoaded',()=>{const b=document.querySelector('a[aria-label="Keranjang Belanja"] span:last-child');if(b)b.textContent='1'});
})();
