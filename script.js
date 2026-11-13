/**
 * MORNING MORING - Official JavaScript
 * Full External Logic for Catalog, Shopping Cart, WhatsApp Checkout,
 * Lightbox, FAQ Accordion, Carousel, and Micro-interactions.
 */

// ---------------------------------------------------------------------------
// 1. OFFICIAL CONFIGURATION & PRODUCT DATABASE
// ---------------------------------------------------------------------------
const WHATSAPP_NUMBER = "628886034589";

const PRODUCTS = [
  {
    id: "original-100",
    name: "Moring Original",
    flavor: "Original",
    size: "100g",
    price: 5000,
    image: "assets/images/original-100.png",
    description: "Camilan renyah bulat khas Garut dengan gurih asin rempah otentik dan aroma daun jeruk segar. Pas untuk porsi santai personal.",
    badge: "Favorit Personal"
  },
  {
    id: "original-250",
    name: "Moring Original",
    flavor: "Original",
    size: "250g",
    price: 12000,
    image: "assets/images/original-250.png",
    description: "Renyahnya bikin nagih! Porsi sedang pas untuk camilan belajar, nonton drakor, atau ngobrol bareng teman.",
    badge: "Paling Populer"
  },
  {
    id: "original-500",
    name: "Moring Original",
    flavor: "Original",
    size: "500g",
    price: 22000,
    image: "assets/images/original-500.png",
    description: "Porsi jumbo hemat untuk stok keluarga di rumah atau oleh-oleh khas Garut dengan kemasan zipper tahan renyah.",
    badge: "Paling Hemat"
  },
  {
    id: "pedas-100",
    name: "Moring Pedas",
    flavor: "Pedas",
    size: "100g",
    price: 5000,
    image: "assets/images/pedas-100.png",
    description: "Sensasi pedas cabai asli berpadu gurih rempah dan daun jeruk pilihan. Kriuknya nampol, pedesnya nagih!",
    badge: "Pedas Nampol"
  },
  {
    id: "pedas-250",
    name: "Moring Pedas",
    flavor: "Pedas",
    size: "250g",
    price: 12000,
    image: "assets/images/pedas-250.png",
    description: "Camilan pedas gurih andalan pecinta kriuk. Bumbu rempah tebal meresap sempurna di setiap irisan moring.",
    badge: "Best Seller 🔥"
  },
  {
    id: "pedas-500",
    name: "Moring Pedas",
    flavor: "Pedas",
    size: "500g",
    price: 22000,
    image: "assets/images/pedas-500.png",
    description: "Ukuran jumbo untuk penggila camilan pedas! Nikmati sensasi kriuk kress yang gak berhenti dari awal sampai habis.",
    badge: "Porsi Sultan 🔥"
  }
];

const CART_STORAGE_KEY = "morning_moring_cart_data";

// ---------------------------------------------------------------------------
// 1.1 BLOG ARTICLES DATABASE
// ---------------------------------------------------------------------------
const BLOG_ARTICLES = [
  {
    id: "rahasia-kerenyahan-moring-garut",
    title: "Rahasia Kerenyahan Moring Khas Garut yang Bikin Nagih",
    category: "Resep & Tips",
    date: "10 November 2026",
    readTime: "4 Menit Baca",
    image: "assets/images/blog-1.webp",
    excerpt: "Pernahkah kamu penasaran mengapa moring khas Garut bisa terasa sangat renyah tanpa keras di gigi? Temukan rahasia racikan tapioka dan teknik goreng turun-temurun di sini.",
    content: `
      <p class="text-base sm:text-lg leading-relaxed text-zinc-700 mb-6">
        Bagi masyarakat Jawa Barat, khususnya warga Garut, <strong>moring</strong> (singkatan dari <em>cimol kering</em>) bukanlah sekadar jajanan biasa. Camilan ini menyimpan kenangan masa kecil sekaligus mahakarya kuliner lokal yang renyah dan penuh kehangatan bumbu rempah.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-4">1. Pemilihan Tepung Tapioka Berkualitas Super</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Kunci utama kerenyahan moring yang empuk terletak pada kualitas pati singkong atau tapioka. Tepung dengan kadar air yang pas dan kehalusan tinggi akan menghasilkan adonan yang kalis elastis saat diuleni dengan air mendidih berkaldu rempah. Jika tepung kurang bagus, moring cenderung mengeras seperti batu saat digoreng.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-4">2. Teknik Pengukusan dan Pemadatan Khusus</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Sebelum digoreng, adonan moring dibentuk bulat memanjang lalu dikukus hingga matang transparan. Proses ini membuat pati tergelatinisasi sempurna. Setelah matang, adonan diinapkan semalaman di suhu sejuk agar teksturnya padat dan mudah diiris tipis tanpa hancur.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-4">3. Irisan Tipis Presisi & Suhu Minyak Stabil</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Ketebalan irisan adalah pembeda terbesar antara moring biasa dengan <strong>Morning Moring</strong>. Kami memotong dengan ketebalan presisi sub-milimeter, kemudian menggorengnya dalam minyak kelapa bersih pada suhu stabil. Hasilnya? Moring mengembang mekar dengan gelembung-gelembung mikro yang memberikan sensasi <em>"Kreeesss!"</em> ringan saat digigit.
      </p>

      <div class="my-8 p-6 rounded-2xl bg-amber-50 border-l-4 border-amber-500 text-amber-950">
        <h4 class="font-bold text-base mb-1 flex items-center gap-2">
          <i class="fa-solid fa-lightbulb text-amber-600"></i> Tips dari Chef Morning Moring:
        </h4>
        <p class="text-sm text-zinc-700">
          Untuk menikmati kerenyahan maksimal, hindari meletakkan wadah moring di dekat kompor panas atau terpapar sinar matahari langsung. Selalu pastikan zipper pouch tertutup rapat ya!
        </p>
      </div>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-4">4. Racikan Bumbu Rempah & Irisan Daun Jeruk Purut</h3>
      <p class="leading-relaxed text-zinc-700 mb-6">
        Setelah ditiriskan dari minyak, moring langsung ditaburi bumbu rempah bawang putih sangrai, garam kristal gurih, dan irisan daun jeruk purut yang telah dikeringkan secara alami. Daun jeruk inilah yang memberikan aroma segar khas Morning Moring dan menyeimbangkan rasa gurih sehingga tidak membuat enek.
      </p>
    `
  },
  {
    id: "5-cara-asik-menikmati-moring",
    title: "5 Cara Asik Menikmati Moring: Dari Teman Nonton Sampai Topping Bakso",
    category: "Ide Makan",
    date: "05 November 2026",
    readTime: "3 Menit Baca",
    image: "assets/images/blog-2.webp",
    excerpt: "Moring bukan cuma camilan biasa! Jadikan moring sebagai topping mie instan kuah, pelengkap seblak, hingga taburan nasi goreng yang bikin makan makin berselera.",
    content: `
      <p class="text-base sm:text-lg leading-relaxed text-zinc-700 mb-6">
        Siapa bilang moring cuma bisa dicemil langsung dari plastiknya? Teksturnya yang super renyah dan bumbunya yang medok membuat Morning Moring sangat fleksibel dipadukan dengan berbagai hidangan nusantara!
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">1. Topping Mie Kuah & Mie Goreng Pedas</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Taburkan segenggam Moring Pedas 100g di atas mangkuk mie kuah kari atau mie goreng favoritmu. Kontras antara mie yang kenyal lembut dengan moring yang kriuk kress berdaun jeruk menciptakan harmoni rasa yang luar biasa!
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">2. Sahabat Kuah Bakso Panas</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Daripada kerupuk biasa yang cepat lembek terkena kuah, celupkan Moring Original ke dalam kuah bakso sapi gurih sesaat sebelum disantap. Gurihnya bumbu moring akan menyatu dengan kaldu sapi yang hangat.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">3. Campuran Seblak Kering & Basah</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Pecinta pedas wajib coba trik ini: tambahkan moring di tahap akhir memasak seblak ceker atau kuah pedas kencur. Sensasi pedas daun jeruk dari varian pedas Morning Moring akan melipatgandakan kenikmatan seblakmu!
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">4. Taburan Nasi Hangat & Telur Ceplok</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Menu tanggal tua tapi rasa bintang lima: sepiring nasi putih hangat, telur ceplok setengah matang dengan kecap manis, lalu remukkan sedikit moring di atasnya. Simpel, hemat, dan nagih banget!
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">5. Teman Maraton Drakor & Main Game</h3>
      <p class="leading-relaxed text-zinc-700 mb-6">
        Ukuran 250g atau 500g sangat cocok ditaruh di mangkuk besar untuk menemani maraton episode drama korea atau mabar game bareng sahabat. Dijamin gak bakal terasa tiba-tiba habis!
      </p>
    `
  },
  {
    id: "tips-menyimpan-moring-tetap-kress",
    title: "Tips Menyimpan Camilan Moring Agar Tetap Kress Berminggu-minggu",
    category: "Tips Simpan",
    date: "28 Oktober 2026",
    readTime: "3 Menit Baca",
    image: "assets/images/blog-3.webp",
    excerpt: "Jangan biarkan camilan favoritmu melempem! Simak cara mudah merawat dan menyimpan moring kemasan zipper agar tetap kriuk garing seperti baru digoreng.",
    content: `
      <p class="text-base sm:text-lg leading-relaxed text-zinc-700 mb-6">
        Musuh terbesar dari camilan berbahan tapioka adalah udara lembab dan paparan panas. Simak beberapa panduan praktis berikut agar stok Morning Moring kamu tetap renyah hingga 3 bulan ke depan:
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">1. Manfaatkan Zipper Lock Kemasan dengan Benar</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Kemasan Morning Moring didesain dengan zipper lock tebal berkualitas food-grade. Sebelum menutup rapat zipper, tekan perlahan bagian pouch untuk mengeluarkan udara berlebih di dalam kemasan, lalu rapatkan dari ujung ke ujung hingga berbunyi 'klik'.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">2. Pindahkan ke Toples Kaca Kedap Udara Jika Perlu</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Bagi kamu yang membeli ukuran 500g, memindahkan sebagian moring ke toples kaca atau plastik bersegel karet (silicone ring) bisa menjadi pilihan tepat. Pastikan toples benar-benar kering tanpa sisa air sedikit pun.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">3. Simpan di Tempat Kering dan Sejuk</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Hindari menaruh kemasan di lantai langsung atau di tempat lembab. Letakkan di rak lemari makanan yang sejuk dan terlindung dari paparan sinar matahari langsung.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">4. Trik 'Menyelamatkan' Moring yang Terlanjur Melempem</h3>
      <p class="leading-relaxed text-zinc-700 mb-6">
        Jika kamu sempat lupa menutup rapat kemasan dan moring sedikit melempem, jangan dibuang! Masukkan moring ke dalam air fryer atau microwave selama 1-2 menit dengan suhu rendah (120°C). Biarkan mendingin beberapa saat, dan voila! Kerenyahannya akan kembali seperti semula.
      </p>
    `
  },
  {
    id: "kisah-di-balik-morning-moring",
    title: "Kisah di Balik Morning Moring: Dari Dapur Rumahan Garut ke Lidah Nusantara",
    category: "Cerita Garut",
    date: "15 Oktober 2026",
    readTime: "5 Menit Baca",
    image: "assets/images/blog-4.webp",
    excerpt: "Perjalanan merintis camilan lokal cimol kering menjadi produk modern berkualitas premium dengan cita rasa daun jeruk yang selalu dirindukan pelanggan.",
    content: `
      <p class="text-base sm:text-lg leading-relaxed text-zinc-700 mb-6">
        Garut dikenal dunia lewat keindahan alam pegunungannya yang dijuluki <em>Swiss van Java</em> serta kekayaan kulinernya yang melegenda seperti dodol, dorokdok, dan cimol kering. Di tengah pesona itu, Morning Moring memulai langkah perdananya.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">Sebuah Kegelisahan Sederhana</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Semuanya bermula dari obrolan santai di dapur keluarga. Kami sangat mencintai moring, namun seringkali kecewa saat membeli moring di pasaran yang terlalu keras hingga melukai gusi, atau bumbunya yang terasa seperti bubuk kimia yang membuat seret tenggorokan.
      </p>

      <p class="leading-relaxed text-zinc-700 mb-4">
        Dari sanalah tekad kami muncul: <em>"Kenapa kita tidak membuat moring yang benar-benar renyah kress, bumbu rempah alami yang melimpah, dan wangi daun jeruk yang elegan?"</em>
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">Eksperimen Ratusan Kali Hingga Menemukan Formula Sempurna</h3>
      <p class="leading-relaxed text-zinc-700 mb-4">
        Butuh waktu berbulan-bulan dan puluhan kali uji coba resep untuk mendapatkan perbandingan takaran tapioka, bawang putih lokal, serta teknik pemotongan yang pas. Kami ingin anak-anak, remaja, hingga orang tua dapat menikmati moring dengan nyaman dan gembira.
      </p>

      <h3 class="font-heading font-bold text-2xl text-amber-950 mt-8 mb-3">Melangkah Maju Bersama Pelanggan</h3>
      <p class="leading-relaxed text-zinc-700 mb-6">
        Kini, ribuan bungkus Morning Moring telah dikirimkan ke berbagai penjuru pulau di Indonesia, dari Aceh hingga Papua. Setiap review positif dan pesan repeat order yang masuk ke WhatsApp resmi kami menjadi bahan bakar semangat untuk terus menjaga mutu, kebersihan, dan keaslian cita rasa khas Garut. Terima kasih telah menjadi bagian dari keluarga besar Morning Moring!
      </p>
    `
  }
];


// ---------------------------------------------------------------------------
// 2. CURRENCY FORMATTER
// ---------------------------------------------------------------------------
function formatRupiah(price) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(price);
}

// ---------------------------------------------------------------------------
// 3. SHOPPING CART LOGIC (Vanilla JS + LocalStorage)
// ---------------------------------------------------------------------------
class CartManager {
  constructor() {
    this.cart = this.loadCart();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Gagal memuat keranjang dari localStorage:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
      this.updateBadges();
      this.renderCartDrawer();
    } catch (e) {
      console.error("Gagal menyimpan keranjang ke localStorage:", e);
    }
  }

  addToCart(productId, quantity = 1, triggerElement = null) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existingItem = this.cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cart.push({
        id: productId,
        quantity: quantity
      });
    }

    this.saveCart();

    // Trigger visual trajectory animation if trigger element exists
    if (triggerElement) {
      animateTrajectoryToCart(triggerElement);
    }

    showToast(`${product.name} (${product.size}) berhasil ditambahkan ke keranjang!`);
  }

  updateQuantity(productId, delta) {
    const item = this.cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.saveCart();
  }

  removeItem(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
    if (product) {
      showToast(`🗑️ ${product.name} (${product.size}) dihapus dari keranjang.`, "info");
    }
  }

  clearCart() {
    this.cart = [];
    this.saveCart();
    showToast("Keranjang belanja dikosongkan.", "info");
  }

  getTotalItems() {
    return this.cart.reduce((sum, item) => sum + item.quantity, 0);
  }

  getTotalPrice() {
    return this.cart.reduce((sum, item) => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);
  }

  getDetailedItems() {
    return this.cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id) || {
        name: "Produk",
        flavor: "-",
        size: "-",
        price: 0,
        image: ""
      };
      return {
        ...item,
        product,
        subtotal: product.price * item.quantity
      };
    });
  }

  updateBadges() {
    const total = this.getTotalItems();
    const badgeElements = document.querySelectorAll(".cart-count-badge");
    badgeElements.forEach(badge => {
      badge.textContent = total;
      if (total > 0) {
        badge.classList.remove("hidden");
        badge.classList.add("cart-badge-bounce");
        setTimeout(() => badge.classList.remove("cart-badge-bounce"), 400);
      } else {
        badge.classList.add("hidden");
      }
    });
  }

  renderCartDrawer() {
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartEmptyState = document.getElementById("cart-empty-state");
    const cartFooter = document.getElementById("cart-footer");
    const cartTotalPrice = document.getElementById("cart-total-price");
    const cartTotalCount = document.getElementById("cart-drawer-count");

    if (!cartItemsContainer) return;

    const items = this.getDetailedItems();
    const totalItems = this.getTotalItems();
    const totalPrice = this.getTotalPrice();

    if (cartTotalCount) {
      cartTotalCount.textContent = `${totalItems} item`;
    }

    if (items.length === 0) {
      if (cartEmptyState) cartEmptyState.classList.remove("hidden");
      if (cartFooter) cartFooter.classList.add("hidden");
      cartItemsContainer.innerHTML = "";
      return;
    }

    if (cartEmptyState) cartEmptyState.classList.add("hidden");
    if (cartFooter) cartFooter.classList.remove("hidden");

    let html = "";
    items.forEach(item => {
      html += `
        <div class="flex items-center gap-4 p-3 bg-amber-50/50 rounded-2xl border border-amber-100/80 hover:border-amber-200 transition-colors">
          <img src="${item.product.image}" alt="${item.product.name}" class="w-16 h-16 object-contain rounded-xl bg-white p-1 border border-amber-100 flex-shrink-0" />
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-1">
              <h4 class="font-bold text-amber-950 text-sm truncate">${item.product.name}</h4>
              <button type="button" class="text-zinc-400 hover:text-red-500 transition-colors p-1" data-action="remove-item" data-product-id="${item.id}" title="Hapus produk">
                <i class="fa-solid fa-trash-can text-xs"></i>
              </button>
            </div>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full ${item.product.flavor === 'Pedas' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-800'}">
                ${item.product.flavor} • ${item.product.size}
              </span>
              <span class="text-xs text-amber-900/70">${formatRupiah(item.product.price)}</span>
            </div>
            <div class="flex items-center justify-between mt-2">
              <!-- Quantity buttons -->
              <div class="flex items-center bg-white rounded-lg border border-amber-200 p-0.5 shadow-sm">
                <button type="button" class="w-6 h-6 flex items-center justify-center text-amber-900 hover:bg-amber-100 rounded text-xs font-bold transition-colors" data-action="qty-minus" data-product-id="${item.id}">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="w-8 text-center text-xs font-bold text-amber-950">${item.quantity}</span>
                <button type="button" class="w-6 h-6 flex items-center justify-center text-amber-900 hover:bg-amber-100 rounded text-xs font-bold transition-colors" data-action="qty-plus" data-product-id="${item.id}">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <span class="font-bold text-amber-600 text-sm font-heading">${formatRupiah(item.subtotal)}</span>
            </div>
          </div>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = html;

    if (cartTotalPrice) {
      cartTotalPrice.textContent = formatRupiah(totalPrice);
    }
  }
}

// Global cart instance
const cart = new CartManager();
if (typeof window !== "undefined") {
  window.cart = cart;
  window.PRODUCTS = PRODUCTS;
}

// ---------------------------------------------------------------------------
// 4. WHATSAPP CHECKOUT & DIRECT BUY
// ---------------------------------------------------------------------------

/**
 * Checkout via WhatsApp according to exact required specification
 */
function checkoutWhatsApp() {
  const items = cart.getDetailedItems();
  if (items.length === 0) {
    showToast("Keranjang Anda masih kosong. Silakan pilih produk terlebih dahulu!", "warning");
    return;
  }

  let orderList = "";
  items.forEach((item, index) => {
    orderList += `${index + 1}. ${item.product.name} (${item.product.size})\n   Jumlah: ${item.quantity} pcs\n   Harga: ${formatRupiah(item.product.price)}\n   Subtotal: ${formatRupiah(item.subtotal)}\n\n`;
  });

  const totalFormatted = formatRupiah(cart.getTotalPrice());

  const orderMessage = 
`Halo Morning Moring! 👋

Saya ingin memesan produk berikut:

${orderList.trim()}

------------------------
Total Belanja: ${totalFormatted}

Mohon informasi lebih lanjut mengenai pemesanan dan pembayaran.

Terima kasih! 😊`;

  const message = encodeURIComponent(orderMessage);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(whatsappURL, "_blank");
}

/**
 * Direct Buy button click - skips cart and opens WhatsApp directly with 1 unit
 */
function directBuy(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const directMessage = 
`Halo Morning Moring! 👋

Saya ingin membeli:

${product.name} (${product.size})
Jumlah: 1 pcs
Harga: ${formatRupiah(product.price)}

Mohon informasi untuk pemesanannya. Terima kasih!`;

  const message = encodeURIComponent(directMessage);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  window.open(whatsappURL, "_blank");
}

if (typeof window !== "undefined") {
  window.checkoutWhatsApp = checkoutWhatsApp;
  window.directBuy = directBuy;
  window.formatRupiah = formatRupiah;
}

// ---------------------------------------------------------------------------
// 5. TRAJECTORY ANIMATION TO CART
// ---------------------------------------------------------------------------
function animateTrajectoryToCart(sourceElement) {
  // Find which cart icon is currently active based on viewport
  let targetCartBtn = document.getElementById("desktop-cart-btn");
  if (window.innerWidth < 768) {
    targetCartBtn = document.getElementById("floating-cart-btn");
  } else if (window.innerWidth < 1024) {
    targetCartBtn = document.getElementById("tablet-cart-btn");
  }

  if (!sourceElement || !targetCartBtn) return;

  const sourceRect = sourceElement.getBoundingClientRect();
  const targetRect = targetCartBtn.getBoundingClientRect();

  const particle = document.createElement("div");
  particle.className = "flying-cart-particle";
  particle.innerHTML = '<i class="fa-solid fa-basket-shopping text-sm"></i>';

  const startX = sourceRect.left + sourceRect.width / 2;
  const startY = sourceRect.top + sourceRect.height / 2;
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;

  particle.style.left = `${startX}px`;
  particle.style.top = `${startY}px`;
  document.body.appendChild(particle);

  // Force reflow
  particle.getBoundingClientRect();

  requestAnimationFrame(() => {
    particle.classList.add("in-motion");
    particle.style.left = `${endX}px`;
    particle.style.top = `${endY}px`;
  });

  setTimeout(() => {
    if (particle && typeof particle.remove === "function") {
      particle.remove();
    } else if (particle && particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
    // Bounce cart icon
    targetCartBtn.classList.add("scale-110");
    setTimeout(() => targetCartBtn.classList.remove("scale-110"), 200);
  }, 750);
}

// ---------------------------------------------------------------------------
// 6. TOAST NOTIFICATIONS
// ---------------------------------------------------------------------------
function showToast(message, type = "success") {
  let toastContainer = document.getElementById("toast-container");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";
    toastContainer.className = "fixed top-5 right-5 z-[100] flex flex-col gap-2 max-w-sm w-full px-4 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  toast.className = `pointer-events-auto flex items-center gap-3 p-4 rounded-2xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-[-20px] opacity-0 ${
    type === "warning"
      ? "bg-amber-900/90 text-amber-50 border-amber-500/30"
      : type === "info"
      ? "bg-zinc-900/90 text-zinc-100 border-zinc-700/40"
      : "bg-amber-600/95 text-white border-amber-400/40 shadow-amber-500/20"
  }`;

  const icon = type === "warning" ? "fa-circle-exclamation text-amber-300" : type === "info" ? "fa-circle-info text-zinc-300" : "fa-circle-check text-amber-200";

  toast.innerHTML = `
    <i class="fa-solid ${icon} text-lg flex-shrink-0"></i>
    <div class="text-sm font-medium flex-1">${message}</div>
  `;

  toastContainer.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.classList.remove("translate-y-[-20px]", "opacity-0");
    toast.classList.add("translate-y-0", "opacity-100");
  });

  // Auto remove after 3.2s
  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-[-15px]", "opacity-0");
    setTimeout(() => {
      if (toast && typeof toast.remove === "function") {
        toast.remove();
      } else if (toast && toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3200);
}

// ---------------------------------------------------------------------------
// 7. CART DRAWER / MODAL CONTROLLERS
// ---------------------------------------------------------------------------
function openCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer || !overlay) return;

  drawer.classList.remove("translate-x-full");
  overlay.classList.remove("opacity-0", "pointer-events-none");
  document.body.classList.add("overflow-hidden");
}

function closeCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-overlay");
  if (!drawer || !overlay) return;

  drawer.classList.add("translate-x-full");
  overlay.classList.add("opacity-0", "pointer-events-none");
  document.body.classList.remove("overflow-hidden");
}

// ---------------------------------------------------------------------------
// 8. LIGHTBOX FOR REVIEW SCREENSHOTS
// ---------------------------------------------------------------------------
function openLightbox(imageSrc, caption = "Screenshot Ulasan WhatsApp Pelanggan Morning Moring") {
  const modal = document.getElementById("lightbox-modal");
  const img = document.getElementById("lightbox-image");
  const captionEl = document.getElementById("lightbox-caption");
  if (!modal || !img) return;

  img.src = imageSrc;
  if (captionEl) captionEl.textContent = caption;

  modal.classList.remove("opacity-0", "pointer-events-none");
  document.body.classList.add("overflow-hidden");
}

function closeLightbox() {
  const modal = document.getElementById("lightbox-modal");
  if (!modal) return;

  modal.classList.add("opacity-0", "pointer-events-none");
  document.body.classList.remove("overflow-hidden");
}

// ---------------------------------------------------------------------------
// 9. FAQ ACCORDION HANDLER
// ---------------------------------------------------------------------------
function setupFAQ() {
  const faqItems = document.querySelectorAll(".accordion-item");
  faqItems.forEach(item => {
    const trigger = item.querySelector(".accordion-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");
      
      // Close other open items for clean accordion effect
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove("is-open");
      });

      if (isOpen) {
        item.classList.remove("is-open");
      } else {
        item.classList.add("is-open");
      }
    });
  });
}

// ---------------------------------------------------------------------------
// 10. PRODUCT CATALOG FILTERING
// ---------------------------------------------------------------------------
function setupProductFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const productCards = document.querySelectorAll(".product-card-wrapper");

  filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const filterValue = btn.getAttribute("data-filter");

      filterButtons.forEach(b => {
        b.classList.remove("bg-amber-500", "text-white", "shadow-md");
        b.classList.add("bg-amber-100/70", "text-amber-900");
      });
      btn.classList.add("bg-amber-500", "text-white", "shadow-md");
      btn.classList.remove("bg-amber-100/70", "text-amber-900");

      productCards.forEach(card => {
        const cardFlavor = card.getAttribute("data-flavor");
        if (filterValue === "all" || cardFlavor === filterValue) {
          card.classList.remove("hidden");
          card.classList.add("fade-in");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
}

// ---------------------------------------------------------------------------
// 11. REVIEWS CAROUSEL SCROLLING
// ---------------------------------------------------------------------------
function setupReviewsCarousel() {
  const container = document.getElementById("reviews-carousel");
  const prevBtn = document.getElementById("reviews-prev");
  const nextBtn = document.getElementById("reviews-next");

  if (!container) return;

  const scrollAmount = 340;

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }
}

// ---------------------------------------------------------------------------
// 12. SCROLL REVEAL & ACTIVE NAV OBSERVER
// ---------------------------------------------------------------------------
function setupScrollObservers() {
  // Intersection Observer for scroll reveal animations
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    revealElements.forEach(el => el.classList.add("is-visible"));
  }

  // Active anchor link highlighting
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-anchor-link");

  if (sections.length > 0 && "IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach(link => {
            if (link.getAttribute("href") === `#${id}`) {
              link.classList.add("text-amber-600", "font-bold");
              link.classList.remove("text-zinc-600");
            } else {
              link.classList.remove("text-amber-600", "font-bold");
              link.classList.add("text-zinc-600");
            }
          });
        }
      });
    }, { rootMargin: "-40% 0px -55% 0px" });

    sections.forEach(sec => navObserver.observe(sec));
  }
}

// ---------------------------------------------------------------------------
// 13. MOBILE MENU TOGGLE
// ---------------------------------------------------------------------------
function setupMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileMenuBackdrop = document.getElementById("mobile-menu-backdrop");
  const closeMobileMenuBtn = document.getElementById("close-mobile-menu");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  function openMenu() {
    if (mobileMenu) mobileMenu.classList.remove("translate-x-full");
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.remove("opacity-0", "pointer-events-none");
    document.body.classList.add("overflow-hidden");
  }

  function closeMenu() {
    if (mobileMenu) mobileMenu.classList.add("translate-x-full");
    if (mobileMenuBackdrop) mobileMenuBackdrop.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener("click", openMenu);
  if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener("click", closeMenu);
  if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener("click", closeMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });
}

// ---------------------------------------------------------------------------
// 13.1 BLOG LIST & SEARCH / FILTER HANDLER
// ---------------------------------------------------------------------------
function setupBlogPage() {
  const blogGrid = document.getElementById("blog-grid");
  const searchInput = document.getElementById("blog-search-input");
  const filterBtns = document.querySelectorAll("[data-blog-filter]");

  if (!blogGrid) return;

  function renderArticles(filter = "all", searchQuery = "") {
    let filtered = BLOG_ARTICLES;

    if (filter !== "all") {
      filtered = filtered.filter(a => a.category.toLowerCase().includes(filter.toLowerCase()));
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(a => 
        a.title.toLowerCase().includes(q) || 
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      blogGrid.innerHTML = `
        <div class="col-span-full py-16 text-center space-y-3">
          <div class="w-16 h-16 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-2xl">
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
          <h3 class="font-heading font-bold text-xl text-amber-950">Artikel Tidak Ditemukan</h3>
          <p class="text-sm text-zinc-500">Coba gunakan kata kunci pencarian yang lain atau pilih kategori Semua.</p>
        </div>
      `;
      return;
    }

    let html = "";
    filtered.forEach(article => {
      html += `
        <article class="bg-white rounded-3xl overflow-hidden border border-amber-100/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between group">
          <div>
            <div class="relative aspect-[16/10] overflow-hidden bg-amber-50">
              <img src="${article.image}" alt="${article.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
              <span class="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-amber-900 font-bold text-xs px-3 py-1 rounded-full shadow-sm">
                ${article.category}
              </span>
            </div>
            <div class="p-6">
              <div class="flex items-center gap-3 text-xs text-zinc-400 mb-2 font-medium">
                <span><i class="fa-regular fa-calendar text-amber-500 mr-1"></i> ${article.date}</span>
                <span>•</span>
                <span><i class="fa-regular fa-clock text-amber-500 mr-1"></i> ${article.readTime}</span>
              </div>
              <h3 class="font-heading font-bold text-xl text-amber-950 group-hover:text-amber-600 transition-colors leading-snug">
                <a href="blog-detail.html?id=${article.id}">
                  ${article.title}
                </a>
              </h3>
              <p class="text-xs sm:text-sm text-zinc-500 mt-2.5 leading-relaxed line-clamp-3">
                ${article.excerpt}
              </p>
            </div>
          </div>
          <div class="px-6 pb-6 pt-2">
            <a href="blog-detail.html?id=${article.id}" class="inline-flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
              <span>Baca Selengkapnya</span>
              <i class="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform"></i>
            </a>
          </div>
        </article>
      `;
    });

    blogGrid.innerHTML = html;
  }

  // Initial render
  renderArticles();

  // Search input event
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const activeBtn = document.querySelector("[data-blog-filter].bg-amber-500");
      const currentFilter = activeBtn ? activeBtn.getAttribute("data-blog-filter") : "all";
      renderArticles(currentFilter, e.target.value);
    });
  }

  // Category filter buttons
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => {
        b.classList.remove("bg-amber-500", "text-white", "shadow-md");
        b.classList.add("bg-amber-100/70", "text-amber-900");
      });
      btn.classList.add("bg-amber-500", "text-white", "shadow-md");
      btn.classList.remove("bg-amber-100/70", "text-amber-900");

      const category = btn.getAttribute("data-blog-filter");
      const query = searchInput ? searchInput.value : "";
      renderArticles(category, query);
    });
  });
}

// ---------------------------------------------------------------------------
// 13.2 BLOG DETAIL PAGE HANDLER
// ---------------------------------------------------------------------------
function setupBlogDetailPage() {
  const detailContainer = document.getElementById("blog-detail-container");
  if (!detailContainer) return;

  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get("id") || "rahasia-kerenyahan-moring-garut";

  let article = BLOG_ARTICLES.find(a => a.id === articleId);
  if (!article) {
    article = BLOG_ARTICLES[0];
  }

  // Update Page Title
  document.title = `${article.title} — Blog Morning Moring`;

  // Inject metadata into elements
  const titleEl = document.getElementById("article-title");
  const breadcrumbEl = document.getElementById("article-breadcrumb-title");
  const categoryEl = document.getElementById("article-category");
  const dateEl = document.getElementById("article-date");
  const readTimeEl = document.getElementById("article-read-time");
  const imageEl = document.getElementById("article-image");
  const contentEl = document.getElementById("article-content");

  if (titleEl) titleEl.textContent = article.title;
  if (breadcrumbEl) breadcrumbEl.textContent = article.title;
  if (categoryEl) categoryEl.textContent = article.category;
  if (dateEl) dateEl.textContent = article.date;
  if (readTimeEl) readTimeEl.textContent = article.readTime;
  if (imageEl) {
    imageEl.src = article.image;
    imageEl.alt = article.title;
  }
  if (contentEl) contentEl.innerHTML = article.content;

  // Setup Share Buttons
  const shareWhatsAppBtn = document.getElementById("share-whatsapp-btn");
  const copyLinkBtn = document.getElementById("copy-link-btn");

  if (shareWhatsAppBtn) {
    shareWhatsAppBtn.addEventListener("click", () => {
      const shareUrl = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Yuk baca artikel menarik dari Morning Moring: "${article.title}"\n${window.location.href}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
    });
  }

  if (copyLinkBtn) {
    copyLinkBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast("🔗 Tautan artikel berhasil disalin ke clipboard!");
      }).catch(() => {
        showToast("Tautan artikel: " + window.location.href, "info");
      });
    });
  }

  // Render Related Articles
  const relatedContainer = document.getElementById("related-articles-container");
  if (relatedContainer) {
    const related = BLOG_ARTICLES.filter(a => a.id !== article.id).slice(0, 3);
    let rHtml = "";
    related.forEach(r => {
      rHtml += `
        <article class="bg-white rounded-2xl overflow-hidden border border-amber-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
          <div class="relative aspect-[16/10] overflow-hidden bg-amber-50">
            <img src="${r.image}" alt="${r.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
            <span class="absolute top-3 left-3 bg-white/95 text-[10px] font-bold text-amber-900 px-2 py-0.5 rounded-full">
              ${r.category}
            </span>
          </div>
          <div class="p-4 flex-1 flex flex-col justify-between">
            <h4 class="font-heading font-bold text-base text-amber-950 group-hover:text-amber-600 transition-colors line-clamp-2">
              <a href="blog-detail.html?id=${r.id}">
                ${r.title}
              </a>
            </h4>
            <div class="mt-3 flex items-center justify-between text-[11px] text-zinc-400">
              <span>${r.date}</span>
              <a href="blog-detail.html?id=${r.id}" class="font-bold text-amber-600 hover:text-amber-700">
                Baca →
              </a>
            </div>
          </div>
        </article>
      `;
    });
    relatedContainer.innerHTML = rHtml;
  }
}

// ---------------------------------------------------------------------------
// 14. GLOBAL EVENT DELEGATION & INITIALIZATION
// ---------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Update badges & drawer initially
  cart.updateBadges();
  cart.renderCartDrawer();

  // Dynamic copyright year
  const yearElements = document.querySelectorAll(".dynamic-year");
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => el.textContent = currentYear);

  // Setup UI components
  setupFAQ();
  setupProductFilters();
  setupReviewsCarousel();
  setupScrollObservers();
  setupMobileMenu();
  setupBlogPage();
  setupBlogDetailPage();


  // Cart open buttons (Desktop, Tablet, Mobile Floating)
  const cartButtons = [
    document.getElementById("desktop-cart-btn"),
    document.getElementById("tablet-cart-btn"),
    document.getElementById("floating-cart-btn")
  ];
  cartButtons.forEach(btn => {
    if (btn) btn.addEventListener("click", openCartDrawer);
  });

  // Cart close buttons & overlay
  const closeCartBtn = document.getElementById("close-cart-btn");
  const cartOverlay = document.getElementById("cart-overlay");
  const startShoppingBtn = document.getElementById("start-shopping-btn");

  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCartDrawer);
  if (cartOverlay) cartOverlay.addEventListener("click", closeCartDrawer);
  if (startShoppingBtn) startShoppingBtn.addEventListener("click", closeCartDrawer);

  // Checkout button in cart drawer
  const checkoutBtn = document.getElementById("checkout-whatsapp-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", checkoutWhatsApp);
  }

  // Clear cart button (optional)
  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      if (confirm("Apakah Anda yakin ingin mengosongkan keranjang belanja?")) {
        cart.clearCart();
      }
    });
  }

  // Lightbox close
  const closeLightboxBtn = document.getElementById("close-lightbox-btn");
  const lightboxModal = document.getElementById("lightbox-modal");
  if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener("click", (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }

  // Global click delegation for dynamically rendered items & product cards
  document.addEventListener("click", (e) => {
    // 1. Add to Cart button
    const addBtn = e.target.closest('[data-action="add-to-cart"]');
    if (addBtn) {
      e.preventDefault();
      const pId = addBtn.getAttribute("data-product-id");
      cart.addToCart(pId, 1, addBtn);
      return;
    }

    // 2. Direct Buy button (Beli Sekarang)
    const buyBtn = e.target.closest('[data-action="buy-now"]');
    if (buyBtn) {
      e.preventDefault();
      const pId = buyBtn.getAttribute("data-product-id");
      directBuy(pId);
      return;
    }

    // 3. Cart Quantity Plus
    const plusBtn = e.target.closest('[data-action="qty-plus"]');
    if (plusBtn) {
      const pId = plusBtn.getAttribute("data-product-id");
      cart.updateQuantity(pId, 1);
      return;
    }

    // 4. Cart Quantity Minus
    const minusBtn = e.target.closest('[data-action="qty-minus"]');
    if (minusBtn) {
      const pId = minusBtn.getAttribute("data-product-id");
      cart.updateQuantity(pId, -1);
      return;
    }

    // 5. Cart Remove Item
    const removeBtn = e.target.closest('[data-action="remove-item"]');
    if (removeBtn) {
      const pId = removeBtn.getAttribute("data-product-id");
      cart.removeItem(pId);
      return;
    }

    // 6. Review Lightbox Trigger
    const reviewCard = e.target.closest('[data-action="open-lightbox"]');
    if (reviewCard) {
      const imgSrc = reviewCard.getAttribute("data-image");
      const caption = reviewCard.getAttribute("data-caption");
      openLightbox(imgSrc, caption);
      return;
    }
  });

  // Keyboard shortcut: Escape key closes drawers and modals
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCartDrawer();
      closeLightbox();
      const mobileMenu = document.getElementById("mobile-menu");
      if (mobileMenu && !mobileMenu.classList.contains("translate-x-full")) {
        const closeBtn = document.getElementById("close-mobile-menu");
        if (closeBtn) closeBtn.click();
      }
    }
  });
});
