(function initGreetingCardBuilder() {
      const recipientInput = document.getElementById('input-recipient');
      const senderInput = document.getElementById('input-sender');
      const messageInput = document.getElementById('textarea-message');
      const charCounter = document.getElementById('char-counter');

      const previewRecipient = document.getElementById('preview-recipient');
      const previewSender = document.getElementById('preview-sender');
      const previewMessage = document.getElementById('preview-message');
      const cardContainer = document.getElementById('card-preview-container');
      const waxSeal = document.getElementById('wax-seal-badge');

      const toggleCard = document.getElementById('toggle-card-active');
      const formControls = document.getElementById('card-form-controls');
      const recapCardName = document.getElementById('recap-card-name');
      const recapCardDesc = document.getElementById('recap-card-desc');

      // Live Text Syncing
      if (recipientInput && previewRecipient) {
        recipientInput.addEventListener('input', (e) => {
          previewRecipient.textContent = e.target.value.trim() || 'Penerima Istimewa';
        });
      }

      if (senderInput && previewSender) {
        senderInput.addEventListener('input', (e) => {
          previewSender.textContent = e.target.value.trim() || 'Anonim';
        });
      }

      if (messageInput && previewMessage && charCounter) {
        messageInput.addEventListener('input', (e) => {
          const val = e.target.value;
          previewMessage.textContent = val ? `“${val}”` : '“Tuliskan pesan berhargamu di sini...”';
          charCounter.textContent = `${val.length}/200 karakter`;
        });
      }

      // Quick Chips Click Handler
      document.querySelectorAll('.template-chip').forEach(button => {
        button.addEventListener('click', () => {
          const text = button.getAttribute('data-text');
          if (text && messageInput) {
            messageInput.value = text;
            previewMessage.textContent = `“${text}”`;
            charCounter.textContent = `${text.length}/200 karakter`;
          }
        });
      });

      // Material Swatches Selector
      const materialButtons = document.querySelectorAll('.material-option');
      materialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          materialButtons.forEach(b => {
            b.classList.remove('ring-2', 'ring-primary', 'bg-surface-container-high');
            b.classList.add('bg-surface-container-lowest');
            const check = b.querySelector('.checkmark-icon');
            if (check) check.classList.replace('text-primary', 'text-transparent');
          });

          btn.classList.add('ring-2', 'ring-primary');
          const activeCheck = btn.querySelector('.checkmark-icon');
          if (activeCheck) activeCheck.classList.replace('text-transparent', 'text-primary');

          const mat = btn.getAttribute('data-material');
          if (mat === 'linen') {
            cardContainer.style.backgroundColor = '#faf7f0';
            waxSeal.style.backgroundColor = '#a35343';
            if (recapCardName) recapCardName.textContent = 'Letterpress Linen Card';
            if (recapCardDesc) recapCardDesc.textContent = 'Ivory linen • Segel rose wax';
          } else if (mat === 'sage') {
            cardContainer.style.backgroundColor = '#f1f5f0';
            waxSeal.style.backgroundColor = '#49654d';
            if (recapCardName) recapCardName.textContent = 'Botanical Sage Card';
            if (recapCardDesc) recapCardDesc.textContent = 'Earthy sage paper • Segel olive wax';
          } else if (mat === 'blush') {
            cardContainer.style.backgroundColor = '#fcf2f0';
            waxSeal.style.backgroundColor = '#8c3d31';
            if (recapCardName) recapCardName.textContent = 'Blush Pearl Card';
            if (recapCardDesc) recapCardDesc.textContent = 'Soft coral paper • Segel dusty wax';
          }
        });
      });

      // Typography Style Selector
      const fontButtons = document.querySelectorAll('.font-style-btn');
      fontButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          fontButtons.forEach(b => {
            b.classList.remove('ring-2', 'ring-primary');
          });
          btn.classList.add('ring-2', 'ring-primary');

          const fontType = btn.getAttribute('data-font');
          if (previewMessage) {
            previewMessage.className = 'text-body-lg text-primary leading-relaxed antialiased transition-all';
            if (fontType === 'cursive') {
              previewMessage.classList.add('font-display-md', 'italic');
            } else if (fontType === 'serif') {
              previewMessage.classList.add('font-headline-sm', 'not-italic');
            } else if (fontType === 'sans') {
              previewMessage.classList.add('font-body-md', 'tracking-normal');
            }
          }
        });
      });

      // Toggle Card Presence (Enabled/Disabled state)
      if (toggleCard && formControls && cardContainer) {
        toggleCard.addEventListener('change', (e) => {
          if (e.target.checked) {
            formControls.classList.remove('opacity-40', 'pointer-events-none');
            cardContainer.classList.remove('opacity-30', 'grayscale');
            if (recapCardName) recapCardName.textContent = 'Letterpress Linen Card';
            if (recapCardDesc) recapCardDesc.textContent = 'Amplop segel botani & pesan personal tercetak';
          } else {
            formControls.classList.add('opacity-40', 'pointer-events-none');
            cardContainer.classList.add('opacity-30', 'grayscale');
            if (recapCardName) recapCardName.textContent = 'Tanpa Kartu Ucapan';
            if (recapCardDesc) recapCardDesc.textContent = 'Pengiriman buket tanpa kartu pesan personal';
          }
        });
      }
    })();
  
(function(){const o=VS.order(),s=o.s,rp=VS.rp,g=id=>document.getElementById(id);
 VS.sub({'8 Tangkai':o.stems+' Tangkai','8 tangkai':o.stems+' tangkai','Rp 190.000':rp(o.flowers),'Rp 15.000':rp(o.wrap),'Rp 205.000':rp(o.subtotal)});
 const ps=[...document.querySelectorAll('p')],p1=ps.find(p=>p.textContent.includes('Mawar Merah Velvet (3x)')),p2=ps.find(p=>p.textContent.includes('Pink Floral Vintage Wrapping'));
 if(p1)p1.textContent=o.items.map(f=>f.name+' ('+f.qty+'x)').join(', ');
 if(p2)p2.textContent=s.paper.name+' Wrapping & '+s.ribbon.name;
 const rec=g('input-recipient'),snd=g('input-sender'),msg=g('textarea-message'),tg=g('toggle-card-active'),c=s.card;
 let mat=c.material,font=c.font;
 rec.value=c.to;snd.value=c.from;msg.value=c.msg;[rec,snd,msg].forEach(e=>e.dispatchEvent(new Event('input')));
 const mb=document.querySelector('[data-material="'+mat+'"]'),fb=document.querySelector('[data-font="'+font+'"]');if(mb)mb.click();if(fb)fb.click();
 if(c.on===false){tg.checked=false;tg.dispatchEvent(new Event('change'))}
 const save=()=>VS.set({card:{on:tg.checked,to:rec.value,from:snd.value,msg:msg.value,material:mat,font:font}});
 document.addEventListener('input',save);
 document.addEventListener('change',save);
 document.addEventListener('click',e=>{const m=e.target.closest('[data-material]'),f=e.target.closest('[data-font]');if(m)mat=m.dataset.material;if(f)font=f.dataset.font;setTimeout(save,0)});
 save();
})();
