(function initBouquetCarousel() {
    const track = document.getElementById('bouquet-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');

    if (!track || !prevBtn || !nextBtn) return;

    const scrollAmount = 340;

    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    const updateButtonStates = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      prevBtn.disabled = track.scrollLeft <= 5;
      nextBtn.disabled = track.scrollLeft >= maxScroll - 5;
    };

    track.addEventListener('scroll', updateButtonStates, { passive: true });
    updateButtonStates();
  })();

(function(){const P=[{1:0,2:2,3:2,4:3,5:0},{1:3,2:3,3:0,4:0,5:1},{1:3,2:1,3:0,4:3,5:0},{1:2,2:2,3:1,4:0,5:2},{1:3,2:2,3:1,4:2,5:0}];
 const t=document.getElementById('bouquet-track');if(!t)return;
 t.querySelectorAll('a').forEach(a=>{const i=[...t.children].indexOf(a.closest('#bouquet-track > *'));a.addEventListener('click',()=>VS.set({qty:P[i]||P[4]}))});
})();
