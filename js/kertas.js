(function() {
      const BASE_FLOWER_PRICE = VS.order().flowers;
      let selectedPaperPrice = 15000;
      let selectedPaperName = 'Pink Floral Vintage';
      let additionalRibbonPrice = 0;

      const cards = document.querySelectorAll('.wrapping-card');
      const runningTotalText = document.getElementById('runningTotalText');
      const kertasBadgeText = document.getElementById('kertasBadgeText');

      function formatRupiah(num) {
        return 'Rp ' + num.toLocaleString('id-ID');
      }

      function updateTotal() {
    const rc=document.querySelector('input[name="ribbon-choice"]:checked');
    VS.set({paper:{name:selectedPaperName,price:selectedPaperPrice},ribbon:{name:rc?(rc.closest('label')||rc.parentElement).querySelector('.flex-col span').textContent.trim():'Pita Sutra Dusty Rose',price:additionalRibbonPrice}});
        const total = BASE_FLOWER_PRICE + selectedPaperPrice + additionalRibbonPrice;
        if (runningTotalText) {
          runningTotalText.textContent = formatRupiah(total);
        }
        if (kertasBadgeText) {
          const ribbonNote = additionalRibbonPrice > 0 ? ' + Pita' : '';
          kertasBadgeText.textContent = 'Kertas (' + selectedPaperName + ribbonNote + '): ' + formatRupiah(selectedPaperPrice + additionalRibbonPrice);
        }
      }

      // Card selection handler
      cards.forEach(card => {
        card.addEventListener('click', function() {
          cards.forEach(c => {
            const badge = c.querySelector('.selected-badge');
            const unselectedRadio = c.querySelector('.unselected-radio');
            const overlay = c.querySelector('.selected-overlay');
            const statusText = c.querySelector('.pt-2 span:last-child');

            if (badge) badge.classList.add('hidden');
            if (unselectedRadio) unselectedRadio.classList.remove('hidden');
            if (overlay) overlay.classList.remove('shadow-[inset_0_0_0_2px_#845147]');
            if (statusText) {
              statusText.textContent = 'Klik untuk pilih';
              statusText.classList.remove('text-secondary', 'font-medium');
              statusText.classList.add('text-outline');
            }
          });

          // Activate clicked card
          const badge = this.querySelector('.selected-badge');
          const unselectedRadio = this.querySelector('.unselected-radio');
          const overlay = this.querySelector('.selected-overlay');
          const statusText = this.querySelector('.pt-2 span:last-child');

          if (badge) badge.classList.remove('hidden');
          if (unselectedRadio) unselectedRadio.classList.add('hidden');
          if (overlay) overlay.classList.add('shadow-[inset_0_0_0_2px_#845147]');
          if (statusText) {
            statusText.textContent = 'Terpilih';
            statusText.classList.add('text-secondary', 'font-medium');
            statusText.classList.remove('text-outline');
          }

          selectedPaperPrice = parseInt(this.getAttribute('data-price') || '10000', 10);
          selectedPaperName = this.getAttribute('data-name') || 'Kertas Buket';
          updateTotal();
        });
      });

      // Ribbon selection handler
      const ribbonInputs = document.querySelectorAll('input[name="ribbon-choice"]');
      ribbonInputs.forEach(input => {
        input.addEventListener('change', function() {
          if (this.value === 'Forest Velvet' || this.value === 'Champagne Linen') {
            additionalRibbonPrice = 5000;
          } else {
            additionalRibbonPrice = 0;
          }
          updateTotal();
        });
      });

      // Category filter buttons
      const filterBtns = document.querySelectorAll('.category-btn');
      filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          filterBtns.forEach(b => {
            b.classList.remove('bg-primary', 'text-on-primary', 'shadow-sm');
            b.classList.add('bg-surface-container', 'text-on-surface-variant');
          });
          this.classList.add('bg-primary', 'text-on-primary', 'shadow-sm');
          this.classList.remove('bg-surface-container', 'text-on-surface-variant');

          const category = this.getAttribute('data-cat');
          const allGridCards = document.querySelectorAll('#wrappingGrid > div');
          allGridCards.forEach(gridCard => {
            if (category === 'all' || gridCard.getAttribute('data-cat') === category) {
              gridCard.classList.remove('hidden');
            } else {
              gridCard.classList.add('hidden');
            }
          });
        });
      });

      const sp=VS.get().paper;if(sp){const pc=[...cards].find(x=>x.getAttribute('data-name')===sp.name);if(pc)pc.click();}
    const sr=VS.get().ribbon;if(sr){const ri=[...ribbonInputs].find(x=>(x.closest('label')||x.parentElement).querySelector('.flex-col span').textContent.trim()===sr.name);if(ri){ri.checked=true;ri.dispatchEvent(new Event('change'));}}
    // Initial calculation call
      updateTotal();
    })();
  
(function(){const o=VS.order();
 VS.sub({'8 Tangkai':o.stems+' Tangkai','8 tangkai':o.stems+' tangkai','Rp 190.000':VS.rp(o.flowers)});
 const grid=[...document.querySelectorAll('div.grid')].find(g=>g.classList.contains('pt-1')&&g.querySelector('img'));
 if(!grid)return;
 const tpl=grid.firstElementChild.cloneNode(true),im=Object.assign({},[...grid.children].reduce((a,c,i)=>(a[i+1]=c.querySelector('img').src,a),{}),o.s.img||{});
 grid.innerHTML='';
 o.items.forEach(f=>{const c=tpl.cloneNode(true),img=c.querySelector('img');if(im[f.id])img.src=im[f.id];else img.remove();c.querySelector('span.absolute').textContent=f.qty+'x';const sp=c.querySelectorAll('.flex-col span');sp[0].textContent=f.name;sp[1].textContent=VS.rp(f.qty*f.price)+' ('+f.qty+' tangkai)';grid.appendChild(c)});
})();
