// Flower Data Registry
  const flowers = {
    1: {
      name: "Mawar Merah Velvet",
      latin: "Rosa Semi-Holland Velvet",
      category: "Semi-Holland Premium",
      price: 18000,
      qty: 3,
      desc: "Mawar merah premium berkelopak tebal beludru dengan gradasi merah anggur pekat. Ditanam di dataran tinggi beriklim sejuk, menghasilkan kuntum berdiameter besar dengan daya mekar kokoh berhari-hari.",
      philosophy: "Melambangkan cinta mendalam, ketulusan penuh komitmen, penghormatan abadi, serta rasa kagum tak berkesudahan.",
      tips: [
        "Potong batang miring 45 derajat setiap 2 hari dengan gunting tajam.",
        "Gunakan vas bersih dan ganti air dingin setiap pagi.",
        "Jauhkan dari sinar matahari langsung dan hembusan pendingin udara."
      ],
      imgPrompt: "Macro botanical photography of artisanal Rosa gallica red rose with deep velvety crimson petals, fine studio lighting emphasizing morning dew drops, artistic depth of field, luxury editorial aesthetic."
    },
    2: {
      name: "Peony Blush Bernhardt",
      latin: "Paeonia Lactiflora",
      category: "Import Dutch Flower",
      price: 45000,
      qty: 2,
      desc: "Bunga peony legendaris dengan susunan ratusan mahkota bunga halus berlapis warna pink pastel kemerahan yang menebarkan wangi mawar lembut.",
      philosophy: "Simbol kemakmuran, keberuntungan, pernikahan bahagia, serta keanggunan seorang wanita.",
      tips: [
        "Tempatkan di ruangan bersuhu sejuk 18-22 derajat Celsius.",
        "Buang kelopak terluar yang telah layu untuk merangsang kuncup terbuka penuh.",
        "Pastikan air vas selalu jernih dan tambahkan sedikit gula alami."
      ],
      imgPrompt: "Exquisite lush pink Peony Sarah Bernhardt flower in full soft layered bloom, delicate paper thin ruffled petals, captured on pure warm linen tabletop, gentle warm ambient sunlight."
    },
    3: {
      name: "Tulip Putih Royal",
      latin: "Tulipa Gesneriana",
      category: "Holland Special",
      price: 22000,
      qty: 1,
      desc: "Kuncup tulip klasik berwarna putih susu yang bertekstur lembut dengan batang lentur bergradasi hijau zamrud segar.",
      philosophy: "Mencerminkan kesucian hati, permohonan maaf tulus, kedamaian batin, dan awal cerita baru.",
      tips: [
        "Tulip terus tumbuh ke arah cahaya, putar vas secara berkala.",
        "Tambahkan batu es ke dalam air vas agar tangkai tetap tegak kokoh."
      ],
      imgPrompt: "Pristine pure white Dutch tulips with sculptural curving pale green stems, clean studio minimalist portrait, tender ivory petals catching light, serene quiet botanical aesthetic."
    },
    4: {
      name: "Baby's Breath Cloud",
      latin: "Gypsophila Paniculata",
      category: "Filler Botani",
      price: 12000,
      qty: 2,
      desc: "Rumpun mungil bunga putih mirip kepingan salju yang ringan. Berfungsi mempermanis dan memberikan volume lapang alami pada buket.",
      philosophy: "Melambangkan cinta murni abadi, kepolosan jiwa, dan harapan manis yang tak lekang waktu.",
      tips: [
        "Dapat dikeringkan menjadi dried flowers cantik yang tahan berbulan-bulan.",
        "Keringkan dengan menggantung terbalik di tempat teduh berventilasi."
      ],
      imgPrompt: "Cloud-like cluster of airy white Gypsophila baby breath blossoms, ethereal micro floral texture, delicate thin green branching stems, soft focus bokeh background."
    },
    5: {
      name: "Mawar Kuning Soleil",
      latin: "Rosa Lucida",
      category: "Lembang Highland",
      price: 16000,
      qty: 0,
      desc: "Mawar kuning cerah menyala laksana sinar mentari pagi. Membawa energi kehangatan dan keceriaan seketika.",
      philosophy: "Simbol persahabatan sejati, sukacita wisuda, optimisme masa depan, dan sambutan hangat.",
      tips: [
        "Potong daun bagian bawah yang terendam air agar air vas tidak mudah keruh.",
        "Semprot halus permukaan mahkota bunga dengan sprayer halus."
      ],
      imgPrompt: "Luminous vibrant golden yellow roses with radiant spiral petals, golden hour natural warmth, photographed on ceramic surface with organic leaf foliage."
    },
    6: {
      name: "Hydrangea Lavender Dusk",
      latin: "Hydrangea Macrophylla",
      category: "Stok Habis Musiman",
      price: 38000,
      qty: 0,
      desc: "Kubah bunga raksasa dengan warna lembayung lavender bernuansa vintage. Saat ini habis terjual menunggu musim panen berikutnya.",
      philosophy: "Melambangkan rasa syukur yang mendalam dan pemahaman yang tulus atas segala situasi hidup.",
      tips: [
        "Rendam kepala bunga di air dingin jika terlihat sedikit layu.",
        "Membutuhkan pasokan air yang banyak di dalam vas berleher lebar."
      ],
      imgPrompt: "Muted moody dusk lavender purple Hydrangea flower head with immense dome of delicate vintage four-petal florets, antique botanical illustration mood."
    }
  };

  (function(){const q=VS.get().qty,im={};Object.keys(flowers).forEach(k=>{if(+k!==6&&k in q)flowers[k].qty=q[k];const e=document.getElementById('qty-'+k);if(e)e.textContent=flowers[k].qty;const i=document.querySelector('[data-id="'+k+'"] img');if(i)im[k]=i.src});VS.set({img:im})})();
  let activeModalFlowerId = null;

  function updateQty(id, change) {
    if (!flowers[id] || id === 6) return; // 6 is sold out
    
    flowers[id].qty = Math.max(0, flowers[id].qty + change);
    const qtyElem = document.getElementById(`qty-${id}`);
    if (qtyElem) {
      qtyElem.textContent = flowers[id].qty;
    }

    recalculateSummary();
  }

  function recalculateSummary() {
    VS.set({qty:Object.fromEntries(Object.entries(flowers).filter(([k])=>+k!==6).map(([k,f])=>[k,f.qty]))});
    let totalStems = 0;
    let totalPrice = 0;
    const selectionList = document.getElementById('selectionList');
    if (selectionList) selectionList.innerHTML = '';

    Object.keys(flowers).forEach(key => {
      const f = flowers[key];
      if (f.qty > 0) {
        totalStems += f.qty;
        const itemTotal = f.qty * f.price;
        totalPrice += itemTotal;

        if (selectionList) {
          const row = document.createElement('div');
          row.className = "flex items-center justify-between py-2 px-3 bg-surface-container-lowest rounded-lg shadow-sm";
          row.innerHTML = `
            <div class="flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-secondary"></span>
              <span class="font-body-md text-body-md text-primary font-medium">${f.name}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="font-label-md text-label-md text-on-surface-variant">${f.qty}x</span>
              <span class="font-label-md text-label-md text-primary font-semibold">Rp ${itemTotal.toLocaleString('id-ID')}</span>
            </div>
          `;
          selectionList.appendChild(row);
        }
      }
    });

    if (totalStems === 0 && selectionList) {
      selectionList.innerHTML = `
        <div class="py-6 text-center text-on-surface-variant font-body-sm text-body-sm">
          Belum ada tangkai yang dipilih. Silakan tambahkan bunga di atas.
        </div>
      `;
    }

    // Update Text Elements
    const formattedPrice = `Rp ${totalPrice.toLocaleString('id-ID')}`;
    const formattedStems = `${totalStems} Tangkai`;

    const subtotalElem = document.getElementById('asideSubtotal');
    if (subtotalElem) subtotalElem.textContent = formattedPrice;

    const countBadge = document.getElementById('selectedCountBadge');
    if (countBadge) countBadge.textContent = formattedStems;

    const bottomPrice = document.getElementById('bottomTotalPrice');
    if (bottomPrice) bottomPrice.textContent = formattedPrice;

    const bottomStems = document.getElementById('bottomStemsSelected');
    if (bottomStems) {
      let desc = "Pilih bunga favorit Anda";
      if (totalStems > 0 && totalStems < 5) desc = `${totalStems} tangkai (Buket Mungil Petite)`;
      else if (totalStems >= 5 && totalStems <= 12) desc = `${totalStems} tangkai dipilih (Buket Rimbun Klasik)`;
      else if (totalStems > 12) desc = `${totalStems} tangkai dipilih (Buket Mewah Grand)`;
      bottomStems.textContent = desc;
    }

    // Update Header Live Visualizer Meter
    const meterStemCount = document.getElementById('meterStemCount');
    if (meterStemCount) meterStemCount.textContent = totalStems;

    const meterStatus = document.getElementById('meterStatus');
    if (meterStatus) {
      if (totalStems < 5) meterStatus.textContent = "Minimalis (Tambah Tangkai)";
      else if (totalStems <= 14) meterStatus.textContent = "Harmoni Sedang (Ideal)";
      else meterStatus.textContent = "Buket Sangat Megah";
    }

    const svgProgress = document.getElementById('svgProgress');
    if (svgProgress) {
      const pct = Math.min(100, Math.round((totalStems / 20) * 100));
      svgProgress.setAttribute('stroke-dasharray', `${pct}, 100`);
    }
  }

  // Modal Detail Functions
  function openDetailModal(id) {
    const f = flowers[id];
    if (!f) return;
    activeModalFlowerId = id;

    document.getElementById('modalFlowerTitle').textContent = f.name;
    document.getElementById('modalLatinName').textContent = f.latin;
    document.getElementById('modalCategoryBadge').textContent = f.category;
    document.getElementById('modalFlowerPrice').textContent = `Rp ${f.price.toLocaleString('id-ID')} / tangkai`;
    document.getElementById('modalFlowerDesc').textContent = f.desc;
    document.getElementById('modalPhilosophy').textContent = f.philosophy;

    const careList = document.getElementById('modalCareTips');
    careList.innerHTML = '';
    f.tips.forEach(tip => {
      const li = document.createElement('li');
      li.textContent = tip;
      careList.appendChild(li);
    });

    const actionBtn = document.getElementById('modalActionBtn');
    if (id === 6) {
      actionBtn.classList.add('opacity-50', 'pointer-events-none');
      actionBtn.textContent = 'Stok Telah Habis';
    } else {
      actionBtn.classList.remove('opacity-50', 'pointer-events-none');
      actionBtn.innerHTML = `
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        Tambahkan ke Buket
      `;
    }

    const modal = document.getElementById('flowerDetailModal');
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.firstElementChild.classList.remove('scale-95');
    modal.firstElementChild.classList.add('scale-100');
  }

  function closeDetailModal() {
    const modal = document.getElementById('flowerDetailModal');
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.firstElementChild.classList.add('scale-95');
    modal.firstElementChild.classList.remove('scale-100');
    activeModalFlowerId = null;
  }

  function addModalFlowerToBouquet() {
    if (activeModalFlowerId && activeModalFlowerId !== 6) {
      updateQty(activeModalFlowerId, 1);
      closeDetailModal();
    }
  }

  // Category Filtering Logic
  document.querySelectorAll('.filter-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-chip').forEach(b => {
        b.className = "filter-chip px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-all whitespace-nowrap";
      });
      btn.className = "filter-chip px-4 py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary transition-all whitespace-nowrap shadow-sm";

      const cat = btn.getAttribute('data-category');
      const cards = document.querySelectorAll('.flower-card');
      
      cards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (cat === 'semua' || cardCat.includes(cat)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Search filter
  const searchInput = document.getElementById('flowerSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.flower-card');
      cards.forEach(card => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        if (name.includes(q)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // Initial Calculation Run
  document.addEventListener('DOMContentLoaded', () => {
    recalculateSummary();
  });
