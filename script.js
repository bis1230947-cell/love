// Cart Management
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
  const cartCountElements = document.querySelectorAll('#cartCount');
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCountElements.forEach(el => {
    el.textContent = totalItems;
  });
}

// Add to cart
function addToCart(productId, size = null) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const selectedSize = size || product.sizes[0];
  const existingItem = cart.find(item => item.id === productId && item.size === selectedSize);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize,
      quantity: 1
    });
  }

  saveCart();
  showNotification('Product added to cart!');
}

// Remove from cart
function removeFromCart(productId, size) {
  cart = cart.filter(item => !(item.id === productId && item.size === size));
  saveCart();
  if (window.location.pathname.includes('cart.html')) {
    loadCartPage();
  }
}

// Update quantity
function updateQuantity(productId, size, change) {
  const item = cart.find(item => item.id === productId && item.size === size);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      saveCart();
      if (window.location.pathname.includes('cart.html')) {
        loadCartPage();
      }
    }
  }
}

// Show notification
function showNotification(message) {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: #27ae60;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.2);
    z-index: 10000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 2000);
}

// Create product card HTML
function createProductCard(product) {
  return `
    <div class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">$${product.price.toFixed(2)}</div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCart(${product.id})">Add to Cart</button>
          <a href="product-detail.html?id=${product.id}" class="btn-view-details">View</a>
        </div>
      </div>
    </div>
  `;
}

// Load featured products on homepage
function loadFeaturedProducts() {
  const container = document.getElementById('featuredProducts');
  if (!container) return;

  const featuredProducts = products.filter(p => p.featured);
  container.innerHTML = featuredProducts.map(createProductCard).join('');
}

// Load products page
function loadProductsPage() {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get('category');
  
  let filteredProducts = [...products];
  let currentCategory = 'all';
  let priceFilters = [];

  // Set initial category from URL
  if (categoryParam) {
    currentCategory = categoryParam;
    const categoryRadio = document.querySelector(`input[name="category"][value="${categoryParam}"]`);
    if (categoryRadio) categoryRadio.checked = true;
  }

  // Update page title
  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) {
    const titles = {
      'men': "Men's Collection",
      'women': "Women's Collection",
      'accessories': 'Accessories',
      'all': 'All Products'
    };
    pageTitle.textContent = titles[currentCategory] || 'All Products';
  }

  function applyFilters() {
    filteredProducts = [...products];

    // Category filter
    if (currentCategory !== 'all') {
      filteredProducts = filteredProducts.filter(p => p.category === currentCategory);
    }

    // Price filters
    if (priceFilters.length > 0) {
      filteredProducts = filteredProducts.filter(product => {
        return priceFilters.some(filter => {
          return product.price >= filter.min && product.price < filter.max;
        });
      });
    }

    renderProducts();
  }

  function renderProducts() {
    const sortValue = document.getElementById('sortSelect')?.value || 'default';
    let sortedProducts = [...filteredProducts];

    // Sorting
    switch (sortValue) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    // Update count
    const countElement = document.getElementById('productsCount');
    if (countElement) {
      countElement.textContent = `Showing ${sortedProducts.length} product${sortedProducts.length !== 1 ? 's' : ''}`;
    }

    // Render products
    const noProducts = document.getElementById('noProducts');
    if (sortedProducts.length === 0) {
      container.innerHTML = '';
      if (noProducts) noProducts.style.display = 'block';
    } else {
      if (noProducts) noProducts.style.display = 'none';
      container.innerHTML = sortedProducts.map(createProductCard).join('');
    }
  }

  // Category filter listeners
  document.querySelectorAll('input[name="category"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      currentCategory = e.target.value;
      applyFilters();
    });
  });

  // Price filter listeners
  document.querySelectorAll('.price-filter').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const min = parseFloat(e.target.dataset.min);
      const max = parseFloat(e.target.dataset.max);
      
      if (e.target.checked) {
        priceFilters.push({ min, max });
      } else {
        priceFilters = priceFilters.filter(f => !(f.min === min && f.max === max));
      }
      
      applyFilters();
    });
  });

  // Sort listener
  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', renderProducts);
  }

  // Clear filters
  const clearBtn = document.getElementById('clearFilters');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      currentCategory = 'all';
      priceFilters = [];
      document.querySelector('input[name="category"][value="all"]').checked = true;
      document.querySelectorAll('.price-filter').forEach(cb => cb.checked = false);
      applyFilters();
    });
  }

  applyFilters();
}

// Load product detail page
function loadProductDetail() {
  const container = document.getElementById('productDetailContent');
  if (!container) return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));
  const product = products.find(p => p.id === productId);

  if (!product) {
    container.innerHTML = '<p>Product not found</p>';
    return;
  }

  // Update breadcrumb
  const breadcrumb = document.getElementById('breadcrumbProduct');
  if (breadcrumb) breadcrumb.textContent = product.name;

  let selectedSize = product.sizes[0];

  container.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="product-detail-image">
    <div class="product-detail-info">
      <div class="product-detail-category">${product.category}</div>
      <h1 class="product-detail-name">${product.name}</h1>
      <div class="product-detail-price">$${product.price.toFixed(2)}</div>
      <p class="product-detail-description">${product.description}</p>
      
      <div class="size-selector">
        <div class="size-label">Select Size:</div>
        <div class="size-options" id="sizeOptions">
          ${product.sizes.map(size => `
            <div class="size-option ${size === selectedSize ? 'selected' : ''}" data-size="${size}">
              ${size}
            </div>
          `).join('')}
        </div>
      </div>
      
      <button class="btn btn-primary" onclick="addToCart(${product.id}, '${selectedSize}')" id="addToCartBtn">
        Add to Cart
      </button>
    </div>
  `;

  // Size selection
  document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', (e) => {
      document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('selected'));
      e.target.classList.add('selected');
      selectedSize = e.target.dataset.size;
      
      // Update button
      const btn = document.getElementById('addToCartBtn');
      btn.onclick = () => addToCart(product.id, selectedSize);
    });
  });

  // Load related products
  loadRelatedProducts(product.category, product.id);
}

// Load related products
function loadRelatedProducts(category, excludeId) {
  const container = document.getElementById('relatedProducts');
  if (!container) return;

  const relatedProducts = products
    .filter(p => p.category === category && p.id !== excludeId)
    .slice(0, 4);

  container.innerHTML = relatedProducts.map(createProductCard).join('');
}

// Load cart page
function loadCartPage() {
  const container = document.getElementById('cartItemsContainer');
  const emptyCart = document.getElementById('emptyCart');
  const summary = document.getElementById('cartSummary');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '';
    if (emptyCart) emptyCart.style.display = 'block';
    if (summary) summary.style.display = 'none';
    return;
  }

  if (emptyCart) emptyCart.style.display = 'none';
  if (summary) summary.style.display = 'block';

  container.innerHTML = cart.map(item => `
    <div class="cart-item">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-info">
        <h3 class="cart-item-name">${item.name}</h3>
        <div class="cart-item-size">Size: ${item.size}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', -1)">-</button>
          <span class="quantity-value">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${item.id}, '${item.size}', 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${item.id}, '${item.size}')">Remove</button>
      </div>
    </div>
  `).join('');

  updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const elements = {
    subtotal: document.getElementById('subtotal'),
    shipping: document.getElementById('shipping'),
    tax: document.getElementById('tax'),
    total: document.getElementById('total')
  };

  if (elements.subtotal) elements.subtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (elements.shipping) elements.shipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  if (elements.tax) elements.tax.textContent = `$${tax.toFixed(2)}`;
  if (elements.total) elements.total.textContent = `$${total.toFixed(2)}`;
}

// Load checkout page
function loadCheckoutPage() {
  const container = document.getElementById('checkoutItems');
  if (!container) return;

  if (cart.length === 0) {
    window.location.href = 'cart.html';
    return;
  }

  container.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <div class="checkout-item-info">
        <div class="checkout-item-name">${item.name}</div>
        <div class="checkout-item-details">Size: ${item.size} | Qty: ${item.quantity}</div>
      </div>
      <div class="checkout-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  `).join('');

  updateCheckoutSummary();

  // Form submission
  const form = document.getElementById('checkoutForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Clear cart
      cart = [];
      saveCart();
      
      // Show success modal
      const modal = document.getElementById('successModal');
      if (modal) {
        modal.classList.add('active');
      }
    });
  }
}

// Update checkout summary
function updateCheckoutSummary() {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  const elements = {
    subtotal: document.getElementById('checkoutSubtotal'),
    shipping: document.getElementById('checkoutShipping'),
    tax: document.getElementById('checkoutTax'),
    total: document.getElementById('checkoutTotal')
  };

  if (elements.subtotal) elements.subtotal.textContent = `$${subtotal.toFixed(2)}`;
  if (elements.shipping) elements.shipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
  if (elements.tax) elements.tax.textContent = `$${tax.toFixed(2)}`;
  if (elements.total) elements.total.textContent = `$${total.toFixed(2)}`;
}

// Search functionality
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    }
  });

  const searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query) {
        window.location.href = `products.html?search=${encodeURIComponent(query)}`;
      }
    });
  }

  // Handle search on products page
  const urlParams = new URLSearchParams(window.location.search);
  const searchQuery = urlParams.get('search');
  if (searchQuery && window.location.pathname.includes('products.html')) {
    searchInput.value = searchQuery;
    filterBySearch(searchQuery);
  }
}

// Filter products by search
function filterBySearch(query) {
  const container = document.getElementById('productsGrid');
  if (!container) return;

  const searchResults = products.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const pageTitle = document.getElementById('pageTitle');
  if (pageTitle) {
    pageTitle.textContent = `Search Results for "${query}"`;
  }

  const countElement = document.getElementById('productsCount');
  if (countElement) {
    countElement.textContent = `Found ${searchResults.length} product${searchResults.length !== 1 ? 's' : ''}`;
  }

  const noProducts = document.getElementById('noProducts');
  if (searchResults.length === 0) {
    container.innerHTML = '';
    if (noProducts) noProducts.style.display = 'block';
  } else {
    if (noProducts) noProducts.style.display = 'none';
    container.innerHTML = searchResults.map(createProductCard).join('');
  }
}

// Mobile menu toggle
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
    });
  }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  initSearch();
  initMobileMenu();

  const path = window.location.pathname;

  if (path.includes('index.html') || path === '/' || path.endsWith('/sandbox/')) {
    loadFeaturedProducts();
  } else if (path.includes('products.html')) {
    loadProductsPage();
  } else if (path.includes('product-detail.html')) {
    loadProductDetail();
  } else if (path.includes('cart.html')) {
    loadCartPage();
  } else if (path.includes('checkout.html')) {
    loadCheckoutPage();
  }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
