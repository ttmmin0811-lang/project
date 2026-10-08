// ==========================================================================
// AURA STUDIO - Modern E-Commerce Application Logic
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------------------------------
  // Application State
  // --------------------------------------------------------------------------
  const state = {
    cart: JSON.parse(localStorage.getItem('aura_cart') || '[]'),
    wishlist: JSON.parse(localStorage.getItem('aura_wishlist') || '[]'),
    theme: localStorage.getItem('aura_theme') || 'light',
    activeCategory: 'all',
    activeSort: 'featured',
    filters: {
      saleOnly: false,
      freeShippingOnly: false
    },
    searchQuery: '',
    appliedCoupon: null,
    selectedProduct: null, // For quick view modal
    selectedColor: null,
    selectedSize: null,
    selectedQty: 1
  };

  // --------------------------------------------------------------------------
  // DOM Elements
  // --------------------------------------------------------------------------
  const productGrid = document.getElementById('productGrid');
  const catalogCount = document.getElementById('catalogCount');
  const cartDrawer = document.getElementById('cartDrawer');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const cartBtn = document.getElementById('cartBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartBadge = document.getElementById('cartBadge');
  const wishlistBtn = document.getElementById('wishlistBtn');
  const wishlistBadge = document.getElementById('wishlistBadge');
  const quickViewModal = document.getElementById('quickViewModal');
  const qvCloseBtn = document.getElementById('qvCloseBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutCloseBtn = document.getElementById('checkoutCloseBtn');
  const wishlistModal = document.getElementById('wishlistModal');
  const wishlistCloseBtn = document.getElementById('wishlistCloseBtn');
  const themeToggle = document.getElementById('themeToggle');
  const searchInput = document.getElementById('searchInput');
  const sortSelect = document.getElementById('sortSelect');
  const filterSaleOnly = document.getElementById('filterSaleOnly');
  const filterFreeShip = document.getElementById('filterFreeShip');
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  const topBar = document.getElementById('topBar');
  const topBarClose = document.getElementById('topBarClose');

  // --------------------------------------------------------------------------
  // Formatters & Utilities
  // --------------------------------------------------------------------------
  const formatPrice = (val) => Number(val).toLocaleString('ko-KR') + '원';

  const saveToStorage = () => {
    localStorage.setItem('aura_cart', JSON.stringify(state.cart));
    localStorage.setItem('aura_wishlist', JSON.stringify(state.wishlist));
    localStorage.setItem('aura_theme', state.theme);
  };

  const showToast = (message, type = 'success') => {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    const iconSvg = type === 'success' 
      ? `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`
      : `<svg class="toast-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  };

  // --------------------------------------------------------------------------
  // Theme Handling
  // --------------------------------------------------------------------------
  const applyTheme = (theme) => {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    saveToStorage();
  };

  themeToggle?.addEventListener('click', () => {
    const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
    showToast(`${nextTheme === 'dark' ? '다크 모드' : '라이트 모드'}로 전환되었습니다.`);
  });

  applyTheme(state.theme);

  // --------------------------------------------------------------------------
  // Top Announcement Bar
  // --------------------------------------------------------------------------
  topBarClose?.addEventListener('click', () => {
    topBar.style.display = 'none';
  });

  // --------------------------------------------------------------------------
  // Hero Slider
  // --------------------------------------------------------------------------
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dots .dot');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;
  let slideInterval = null;

  const showSlide = (idx) => {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    currentSlide = idx;
  };

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  };

  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  };

  const startSlideTimer = () => {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  };

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startSlideTimer();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startSlideTimer();
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showSlide(idx);
      startSlideTimer();
    });
  });

  if (slides.length > 0) startSlideTimer();

  // --------------------------------------------------------------------------
  // Product Catalog Filtering & Sorting
  // --------------------------------------------------------------------------
  const getFilteredProducts = () => {
    return PRODUCTS.filter(item => {
      // Category match
      if (state.activeCategory !== 'all' && item.category !== state.activeCategory) {
        return false;
      }
      // Sale only
      if (state.filters.saleOnly && (!item.discountRate || item.discountRate <= 0)) {
        return false;
      }
      // Free shipping only
      if (state.filters.freeShippingOnly && item.price < STORE_CONFIG.freeShippingThreshold) {
        return false;
      }
      // Search query
      if (state.searchQuery) {
        const q = state.searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesEng = item.engName.toLowerCase().includes(q);
        const matchesSummary = item.summary.toLowerCase().includes(q);
        if (!matchesName && !matchesEng && !matchesSummary) return false;
      }
      return true;
    }).sort((a, b) => {
      switch (state.activeSort) {
        case 'new':
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'reviews':
          return b.reviewCount - a.reviewCount;
        case 'sale':
          return (b.discountRate || 0) - (a.discountRate || 0);
        case 'featured':
        default:
          return (b.isBest ? 1 : 0) - (a.isBest ? 1 : 0);
      }
    });
  };

  const renderProducts = () => {
    const list = getFilteredProducts();
    catalogCount.textContent = `총 ${list.length}개의 상품`;

    if (list.length === 0) {
      productGrid.innerHTML = `
        <div class="empty-catalog">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            <line x1="8" y1="11" x2="14" y2="11"></line>
          </svg>
          <h3>조건에 맞는 상품이 없습니다</h3>
          <p>검색어를 변경하거나 필터를 초기화해 보세요.</p>
          <button class="btn-primary" id="resetFiltersBtn">전체 상품 보기</button>
        </div>
      `;
      document.getElementById('resetFiltersBtn')?.addEventListener('click', resetAllFilters);
      return;
    }

    productGrid.innerHTML = list.map(item => {
      const isWish = state.wishlist.includes(item.id);
      const mainImg = item.images[0];
      const hoverImg = item.images[1] || item.images[0];

      return `
        <article class="product-card" data-id="${item.id}">
          <div class="product-thumb-wrap" onclick="window.app.openQuickView(${item.id})">
            <img class="product-img img-main" src="${mainImg}" alt="${item.name}" loading="lazy">
            <img class="product-img img-hover" src="${hoverImg}" alt="${item.name}" loading="lazy">
            
            <div class="card-badges">
              ${item.isNew ? '<span class="badge badge-new">NEW</span>' : ''}
              ${item.isBest ? '<span class="badge badge-best">BEST</span>' : ''}
              ${item.discountRate ? `<span class="badge badge-sale">-${item.discountRate}%</span>` : ''}
            </div>

            <button class="btn-wishlist ${isWish ? 'active' : ''}" 
                    aria-label="위시리스트 담기" 
                    onclick="event.stopPropagation(); window.app.toggleWishlist(${item.id})">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            <div class="card-quick-actions" onclick="event.stopPropagation()">
              <button class="btn-quick-view" onclick="window.app.openQuickView(${item.id})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                상세보기
              </button>
              <button class="btn-quick-add" onclick="window.app.quickAddToCart(${item.id})">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                담기
              </button>
            </div>
          </div>

          <div class="product-info">
            <span class="product-category">${item.categoryName}</span>
            <h3 class="product-title" onclick="window.app.openQuickView(${item.id})">${item.name}</h3>
            <span class="product-eng-name">${item.engName}</span>

            <div class="product-swatches">
              ${item.colors.map(c => `<span class="swatch-dot" style="background-color: ${c.code}" title="${c.name}"></span>`).join('')}
            </div>

            <div class="product-price-row">
              <span class="price-current">${formatPrice(item.price)}</span>
              ${item.originalPrice ? `<span class="price-original">${formatPrice(item.originalPrice)}</span>` : ''}
              ${item.discountRate ? `<span class="price-discount">${item.discountRate}%</span>` : ''}
            </div>

            <div class="product-rating">
              <svg class="star-icon" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
              <span>${item.rating}</span>
              <span>(${item.reviewCount})</span>
            </div>
          </div>
        </article>
      `;
    }).join('');
  };

  const resetAllFilters = () => {
    state.activeCategory = 'all';
    state.activeSort = 'featured';
    state.filters.saleOnly = false;
    state.filters.freeShippingOnly = false;
    state.searchQuery = '';
    
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'featured';
    if (filterSaleOnly) filterSaleOnly.checked = false;
    if (filterFreeShip) filterFreeShip.checked = false;

    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === 'all');
    });

    renderProducts();
  };

  // Category Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeCategory = btn.dataset.category;
      renderProducts();
    });
  });

  // Sort & Filter Changes
  sortSelect?.addEventListener('change', (e) => {
    state.activeSort = e.target.value;
    renderProducts();
  });

  filterSaleOnly?.addEventListener('change', (e) => {
    state.filters.saleOnly = e.target.checked;
    renderProducts();
  });

  filterFreeShip?.addEventListener('change', (e) => {
    state.filters.freeShippingOnly = e.target.checked;
    renderProducts();
  });

  // Search Input with Debounce
  let searchDebounce = null;
  searchInput?.addEventListener('input', (e) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(() => {
      state.searchQuery = e.target.value;
      renderProducts();
    }, 250);
  });

  // Keyword Chips click
  document.querySelectorAll('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const keyword = chip.dataset.keyword;
      if (searchInput) searchInput.value = keyword;
      state.searchQuery = keyword;
      renderProducts();
    });
  });

  // --------------------------------------------------------------------------
  // Wishlist Logic
  // --------------------------------------------------------------------------
  const updateWishlistBadge = () => {
    const count = state.wishlist.length;
    wishlistBadge.textContent = count;
    wishlistBadge.style.display = count > 0 ? 'flex' : 'none';
  };

  const toggleWishlist = (productId) => {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;

    const idx = state.wishlist.indexOf(productId);
    if (idx > -1) {
      state.wishlist.splice(idx, 1);
      showToast(`'${prod.name}' 위시리스트에서 삭제되었습니다.`);
    } else {
      state.wishlist.push(productId);
      showToast(`'${prod.name}' 위시리스트에 저장되었습니다.`);
      wishlistBadge.classList.add('bump');
      setTimeout(() => wishlistBadge.classList.remove('bump'), 300);
    }

    saveToStorage();
    updateWishlistBadge();
    renderProducts();
    if (wishlistModal.classList.contains('active')) {
      renderWishlistModal();
    }
  };

  const openWishlistModal = () => {
    renderWishlistModal();
    wishlistModal.classList.add('active');
    modalBackdrop.classList.add('active');
  };

  const closeWishlistModal = () => {
    wishlistModal.classList.remove('active');
    if (!quickViewModal.classList.contains('active') && !checkoutModal.classList.contains('active')) {
      modalBackdrop.classList.remove('active');
    }
  };

  const renderWishlistModal = () => {
    const container = document.getElementById('wishlistItemsContainer');
    const items = PRODUCTS.filter(p => state.wishlist.includes(p.id));

    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 12px;">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <p>아직 위시리스트에 담긴 상품이 없습니다.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = items.map(p => `
      <div class="wishlist-item">
        <div class="wishlist-item-img">
          <img src="${p.images[0]}" alt="${p.name}">
        </div>
        <div class="wishlist-item-info">
          <div class="wishlist-item-title">${p.name}</div>
          <div class="wishlist-item-price">${formatPrice(p.price)}</div>
        </div>
        <button class="btn-primary" style="padding: 8px 14px; font-size: 12px;" onclick="window.app.quickAddToCart(${p.id})">
          장바구니 담기
        </button>
        <button style="color: var(--text-muted); padding: 4px;" onclick="window.app.toggleWishlist(${p.id})">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');
  };

  wishlistBtn?.addEventListener('click', openWishlistModal);
  wishlistCloseBtn?.addEventListener('click', closeWishlistModal);

  // --------------------------------------------------------------------------
  // Cart Logic & Calculations
  // --------------------------------------------------------------------------
  const updateCartBadge = () => {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    cartBadge.textContent = totalQty;
    cartBadge.style.display = totalQty > 0 ? 'flex' : 'none';
  };

  const openCartDrawer = () => {
    renderCart();
    cartDrawer.classList.add('active');
    modalBackdrop.classList.add('active');
  };

  const closeCartDrawer = () => {
    cartDrawer.classList.remove('active');
    if (!quickViewModal.classList.contains('active') && 
        !checkoutModal.classList.contains('active') &&
        !wishlistModal.classList.contains('active')) {
      modalBackdrop.classList.remove('active');
    }
  };

  const addToCart = (product, color, size, qty = 1) => {
    const existing = state.cart.find(
      item => item.id === product.id && item.color === color && item.size === size
    );

    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: color,
        size: size,
        qty: qty
      });
    }

    saveToStorage();
    updateCartBadge();
    showToast(`'${product.name}' 장바구니에 담겼습니다.`);

    cartBadge.classList.add('bump');
    setTimeout(() => cartBadge.classList.remove('bump'), 300);

    openCartDrawer();
  };

  const quickAddToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes[0] || 'Free';
    addToCart(product, defaultColor, defaultSize, 1);
  };

  const updateCartQty = (idx, delta) => {
    if (!state.cart[idx]) return;
    state.cart[idx].qty += delta;
    if (state.cart[idx].qty <= 0) {
      state.cart.splice(idx, 1);
    }
    saveToStorage();
    updateCartBadge();
    renderCart();
  };

  const removeFromCart = (idx) => {
    if (!state.cart[idx]) return;
    state.cart.splice(idx, 1);
    saveToStorage();
    updateCartBadge();
    renderCart();
  };

  const getCartTotals = () => {
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const shipping = (subtotal >= STORE_CONFIG.freeShippingThreshold || subtotal === 0) ? 0 : STORE_CONFIG.defaultShippingFee;
    
    let discount = 0;
    if (state.appliedCoupon) {
      if (state.appliedCoupon.type === 'percent') {
        discount = Math.round(subtotal * (state.appliedCoupon.value / 100));
      } else if (state.appliedCoupon.type === 'fixed') {
        discount = Math.min(subtotal, state.appliedCoupon.value);
      }
    }

    const total = Math.max(0, subtotal + shipping - discount);
    return { subtotal, shipping, discount, total };
  };

  const renderCart = () => {
    const cartContainer = document.getElementById('cartItemsList');
    const totals = getCartTotals();

    // Free shipping gauge
    const shippingRemain = STORE_CONFIG.freeShippingThreshold - totals.subtotal;
    const progressFill = document.getElementById('shippingProgressFill');
    const shippingMsg = document.getElementById('shippingMessage');

    if (totals.subtotal === 0) {
      progressFill.style.width = '0%';
      shippingMsg.innerHTML = `<strong>${formatPrice(STORE_CONFIG.freeShippingThreshold)}</strong> 이상 구매 시 무료배송`;
    } else if (shippingRemain > 0) {
      const pct = Math.min(100, Math.round((totals.subtotal / STORE_CONFIG.freeShippingThreshold) * 100));
      progressFill.style.width = `${pct}%`;
      shippingMsg.innerHTML = `<strong>${formatPrice(shippingRemain)}</strong> 추가 구매 시 무료배송!`;
    } else {
      progressFill.style.width = '100%';
      shippingMsg.innerHTML = `축하합니다! <strong>무료배송</strong> 혜택이 적용되었습니다 🎉`;
    }

    // Cart list
    if (state.cart.length === 0) {
      cartContainer.innerHTML = `
        <div class="cart-empty">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p>장바구니가 비어 있습니다.</p>
          <button class="btn-primary" onclick="window.app.closeCartDrawer()">쇼핑 계속하기</button>
        </div>
      `;
    } else {
      cartContainer.innerHTML = state.cart.map((item, idx) => `
        <div class="cart-item">
          <div class="cart-item-img">
            <img src="${item.image}" alt="${item.name}">
          </div>
          <div class="cart-item-info">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-opt">${item.color} / ${item.size}</div>
            <div class="cart-item-bottom">
              <div class="qty-control">
                <button class="qty-btn" onclick="window.app.updateCartQty(${idx}, -1)">-</button>
                <span class="qty-val">${item.qty}</span>
                <button class="qty-btn" onclick="window.app.updateCartQty(${idx}, 1)">+</button>
              </div>
              <span class="cart-item-price">${formatPrice(item.price * item.qty)}</span>
              <button class="cart-item-remove" onclick="window.app.removeFromCart(${idx})" title="삭제">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Totals
    document.getElementById('summarySubtotal').textContent = formatPrice(totals.subtotal);
    document.getElementById('summaryShipping').textContent = totals.shipping === 0 ? '무료' : formatPrice(totals.shipping);
    document.getElementById('summaryDiscount').textContent = totals.discount > 0 ? `-${formatPrice(totals.discount)}` : '0원';
    document.getElementById('summaryTotal').textContent = formatPrice(totals.total);

    // Coupon UI
    const couponMsg = document.getElementById('couponAppliedMsg');
    if (state.appliedCoupon) {
      couponMsg.style.display = 'block';
      couponMsg.textContent = `✓ [${state.appliedCoupon.name}] 적용 완료 (-${formatPrice(totals.discount)})`;
    } else {
      couponMsg.style.display = 'none';
    }
  };

  // Coupon handling
  document.getElementById('applyCouponBtn')?.addEventListener('click', () => {
    const input = document.getElementById('couponInput');
    const code = input.value.trim().toUpperCase();

    if (!code) {
      showToast('쿠폰 코드를 입력해 주세요.', 'error');
      return;
    }

    const coupon = STORE_CONFIG.coupons[code];
    if (coupon) {
      state.appliedCoupon = coupon;
      showToast(`'${coupon.name}' 쿠폰이 적용되었습니다!`);
      renderCart();
    } else {
      showToast('유효하지 않은 쿠폰 번호입니다.', 'error');
    }
  });

  cartBtn?.addEventListener('click', openCartDrawer);
  cartCloseBtn?.addEventListener('click', closeCartDrawer);

  // --------------------------------------------------------------------------
  // Quick View Modal
  // --------------------------------------------------------------------------
  const openQuickView = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    state.selectedProduct = product;
    state.selectedColor = product.colors[0]?.name;
    state.selectedSize = product.sizes[0];
    state.selectedQty = 1;

    document.getElementById('qvCategory').textContent = product.categoryName;
    document.getElementById('qvTitle').textContent = product.name;
    document.getElementById('qvEngTitle').textContent = product.engName;
    document.getElementById('qvPrice').textContent = formatPrice(product.price);
    document.getElementById('qvOriginalPrice').textContent = product.originalPrice ? formatPrice(product.originalPrice) : '';
    document.getElementById('qvDiscount').textContent = product.discountRate ? `-${product.discountRate}%` : '';
    document.getElementById('qvSummary').textContent = product.summary;

    // Gallery
    const mainImgEl = document.getElementById('qvMainImg');
    mainImgEl.src = product.images[0];

    const thumbsContainer = document.getElementById('qvThumbsContainer');
    thumbsContainer.innerHTML = product.images.map((img, i) => `
      <div class="qv-thumb ${i === 0 ? 'active' : ''}" onclick="window.app.changeQvImage('${img}', this)">
        <img src="${img}" alt="${product.name}">
      </div>
    `).join('');

    // Colors
    const colorsContainer = document.getElementById('qvColorsContainer');
    colorsContainer.innerHTML = product.colors.map((c, i) => `
      <div class="color-chip ${i === 0 ? 'active' : ''}" onclick="window.app.selectQvColor('${c.name}', this)">
        <span class="swatch-dot" style="background-color: ${c.code}"></span>
        <span>${c.name}</span>
      </div>
    `).join('');

    // Sizes
    const sizesContainer = document.getElementById('qvSizesContainer');
    sizesContainer.innerHTML = product.sizes.map((s, i) => `
      <div class="size-chip ${i === 0 ? 'active' : ''}" onclick="window.app.selectQvSize('${s}', this)">
        ${s}
      </div>
    `).join('');

    // Qty
    document.getElementById('qvQtyVal').textContent = '1';

    // Bullets
    const bulletsContainer = document.getElementById('qvBulletsContainer');
    bulletsContainer.innerHTML = product.details.map(d => `<li>${d}</li>`).join('');

    quickViewModal.classList.add('active');
    modalBackdrop.classList.add('active');
  };

  const closeQuickView = () => {
    quickViewModal.classList.remove('active');
    if (!cartDrawer.classList.contains('active') && 
        !checkoutModal.classList.contains('active') &&
        !wishlistModal.classList.contains('active')) {
      modalBackdrop.classList.remove('active');
    }
  };

  qvCloseBtn?.addEventListener('click', closeQuickView);

  // Quick view helper functions
  const changeQvImage = (src, el) => {
    document.getElementById('qvMainImg').src = src;
    document.querySelectorAll('.qv-thumb').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
  };

  const selectQvColor = (colorName, el) => {
    state.selectedColor = colorName;
    document.querySelectorAll('.color-chip').forEach(c => c.classList.remove('active'));
    el.classList.add('active');
  };

  const selectQvSize = (sizeName, el) => {
    state.selectedSize = sizeName;
    document.querySelectorAll('.size-chip').forEach(s => s.classList.remove('active'));
    el.classList.add('active');
  };

  const changeQvQty = (delta) => {
    const next = state.selectedQty + delta;
    if (next >= 1 && next <= (state.selectedProduct?.stock || 99)) {
      state.selectedQty = next;
      document.getElementById('qvQtyVal').textContent = next;
    }
  };

  document.getElementById('qvAddCartBtn')?.addEventListener('click', () => {
    if (!state.selectedProduct) return;
    addToCart(state.selectedProduct, state.selectedColor, state.selectedSize, state.selectedQty);
    closeQuickView();
  });

  document.getElementById('qvBuyNowBtn')?.addEventListener('click', () => {
    if (!state.selectedProduct) return;
    addToCart(state.selectedProduct, state.selectedColor, state.selectedSize, state.selectedQty);
    closeQuickView();
    closeCartDrawer();
    openCheckoutModal();
  });

  // --------------------------------------------------------------------------
  // Checkout Modal & Flow
  // --------------------------------------------------------------------------
  const openCheckoutModal = () => {
    if (state.cart.length === 0) {
      showToast('장바구니가 비어 있습니다.', 'error');
      return;
    }

    const totals = getCartTotals();
    document.getElementById('checkoutSubtotal').textContent = formatPrice(totals.subtotal);
    document.getElementById('checkoutShipping').textContent = totals.shipping === 0 ? '무료' : formatPrice(totals.shipping);
    document.getElementById('checkoutDiscount').textContent = totals.discount > 0 ? `-${formatPrice(totals.discount)}` : '0원';
    document.getElementById('checkoutTotal').textContent = formatPrice(totals.total);

    // Reset view
    document.getElementById('checkoutFormSection').style.display = 'block';
    document.getElementById('checkoutSuccessSection').style.display = 'none';

    checkoutModal.classList.add('active');
    modalBackdrop.classList.add('active');
  };

  const closeCheckoutModal = () => {
    checkoutModal.classList.remove('active');
    modalBackdrop.classList.remove('active');
  };

  document.getElementById('startCheckoutBtn')?.addEventListener('click', () => {
    closeCartDrawer();
    openCheckoutModal();
  });

  checkoutCloseBtn?.addEventListener('click', closeCheckoutModal);

  // Payment method cards selection
  document.querySelectorAll('.pay-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
    });
  });

  // Submit Order Form
  document.getElementById('checkoutForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = document.getElementById('paySubmitBtn');
    btn.disabled = true;
    btn.innerHTML = `<span style="display:inline-block; animation: spin 1s infinite linear;">↻</span> 결제 승인 처리 중...`;

    setTimeout(() => {
      const orderNumber = 'AUR-' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-' + Math.floor(1000 + Math.random() * 9000);
      document.getElementById('orderNumberDisplay').textContent = orderNumber;

      // Clear cart
      state.cart = [];
      state.appliedCoupon = null;
      saveToStorage();
      updateCartBadge();

      // Show success
      document.getElementById('checkoutFormSection').style.display = 'none';
      document.getElementById('checkoutSuccessSection').style.display = 'block';

      btn.disabled = false;
      btn.textContent = '결제하기';
      showToast('주문 및 결제가 정상적으로 완료되었습니다! 🎉');
    }, 1200);
  });

  document.getElementById('continueShoppingBtn')?.addEventListener('click', () => {
    closeCheckoutModal();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // --------------------------------------------------------------------------
  // Global Backdrop & Keyboard Listeners
  // --------------------------------------------------------------------------
  modalBackdrop?.addEventListener('click', () => {
    closeCartDrawer();
    closeQuickView();
    closeCheckoutModal();
    closeWishlistModal();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeQuickView();
      closeCheckoutModal();
      closeWishlistModal();
    }
    // Press '/' to search
    if (e.key === '/' && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput?.focus();
    }
  });

  // Scroll to Top Button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn?.classList.add('visible');
    } else {
      scrollTopBtn?.classList.remove('visible');
    }
  });

  scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Newsletter Form
  document.getElementById('newsletterForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail')?.value;
    if (email) {
      showToast(`'${email}' 구독 신청이 완료되었습니다! 웰컴 10% 쿠폰이 발송되었습니다.`);
      document.getElementById('newsletterEmail').value = '';
    }
  });

  // --------------------------------------------------------------------------
  // Expose Global App API for inline HTML handlers
  // --------------------------------------------------------------------------
  window.app = {
    openQuickView,
    closeQuickView,
    changeQvImage,
    selectQvColor,
    selectQvSize,
    changeQvQty,
    quickAddToCart,
    addToCart,
    openCartDrawer,
    closeCartDrawer,
    updateCartQty,
    removeFromCart,
    toggleWishlist,
    openCheckoutModal,
    closeCheckoutModal
  };

  // --------------------------------------------------------------------------
  // Initial Render
  // --------------------------------------------------------------------------
  updateCartBadge();
  updateWishlistBadge();
  renderProducts();
});
