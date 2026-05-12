// --- Hayaa Luxe - Global Product Data ---
const defaultProducts = [
    // Abayas
    { id: 1, name: "Luxury Silk Abaya", category: "Abayas", subcategory: "Party Wear", price: 12500, image: "images/Luxury Silk Abaya.jpg", rating: 5, reviews: 12, desc: "Experience ultimate elegance with our Luxury Silk Abaya. Crafted from premium silk." },
    { id: 2, name: "Everyday Cotton Abaya", category: "Abayas", subcategory: "Casual", price: 4500, image: "images/Everyday Cotton Abaya.jpg", rating: 4, reviews: 8, desc: "A comfortable and breathable cotton abaya perfect for daily wear." },
    { id: 3, name: "Embroidered Abaya", category: "Abayas", subcategory: "Embroidered", price: 8999, image: "images/Embroidered Abaya.jpg", rating: 5, reviews: 15, desc: "Beautifully hand-embroidered abaya with intricate details." },
    { id: 4, name: "Velvet Winter Abaya", category: "Abayas", subcategory: "Party Wear", price: 10500, image: "images/Velvet Winter Abaya.jpg", rating: 4.5, reviews: 10, desc: "Warm and stylish velvet abaya for the winter season." },
    
    // Shoes (Heels/Flats)
    { id: 5, name: "Classic Stilettos", category: "Shoes", subcategory: "Heels", price: 4500, image: "images/heels1.jpg", rating: 4.5, reviews: 20, desc: "Elegant black stilettos for any formal occasion." },
    { id: 6, name: "Elegant Block Heels", category: "Shoes", subcategory: "Heels", price: 5200, image: "images/heels2.jpg", rating: 4, reviews: 10, desc: "Comfortable block heels with a modern design." },
    { id: 7, name: "Nude Pumps", category: "Shoes", subcategory: "Heels", price: 3800, image: "images/heels3.jpg", rating: 5, reviews: 5, desc: "Versatile nude pumps that match any outfit." },
    { id: 8, name: "Comfortable Flats", category: "Shoes", subcategory: "Flats", price: 2500, image: "images/heels4.jpg", rating: 4, reviews: 22, desc: "Everyday flats combining comfort and style." },
    
    // Bags
    { id: 9, name: "Leather Handbag", category: "Bags", subcategory: "Handbags", price: 6500, image: "images/bag1.jpg", rating: 5, reviews: 25, desc: "Premium quality leather handbag." },
    { id: 10, name: "Evening Clutch", category: "Bags", subcategory: "Clutches", price: 3200, image: "images/bag2.jpg", rating: 4.5, reviews: 18, desc: "Sparkling evening clutch for parties." },
    { id: 11, name: "Classic Zip Wallet", category: "Bags", subcategory: "Wallets", price: 1800, image: "images/bag3.jpg", rating: 4, reviews: 30, desc: "Compact and practical zip wallet." },
    
    // Hijabs
    { id: 12, name: "Floral Print Chiffon", category: "Hijab", subcategory: "Printed", price: 1200, image: "images/hijab1.jpg", rating: 4, reviews: 40, desc: "Lightweight chiffon hijab with beautiful floral prints." },
    { id: 13, name: "Premium Silk Hijab", category: "Hijab", subcategory: "Silk", price: 2500, image: "images/hijab2.jpg", rating: 5, reviews: 15, desc: "Luxurious silk hijab for special events." },
    
    // Watches
    { id: 14, name: "Rose Gold Watch", category: "Watches", subcategory: "Luxury", price: 8500, image: "images/watch1.jpg", rating: 5, reviews: 12, desc: "Elegant rose gold watch with crystal details." },
    { id: 15, name: "Silver Dial Watch", category: "Watches", subcategory: "Elegant", price: 5500, image: "images/watch2.jpg", rating: 4, reviews: 9, desc: "Classic silver watch perfect for professional wear." }
];

const defaultPageData = {
    home: {
        title: "Discover Your Inner Elegance.",
        subtitle: "New Collection 2026",
        desc: "Explore our latest premium collection of Abayas, Shoes, Bags, and Accessories crafted for the modern woman.",
        heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop"
    },
    about: {
        title: "Our Story",
        desc: "Hayaa Luxe was founded with a vision to provide modern women with fashion that respects tradition while embracing contemporary style. Our collections are carefully curated to ensure the highest quality and most elegant designs.",
        image: "images/Luxury Silk Abaya.jpg"
    },
    shop: {
        title: "Our Collection",
        desc: "Browse through our complete range of luxury products."
    },
    contact: {
        title: "Get in Touch",
        desc: "We would love to hear from you. Reach out to us for any queries."
    },
    categories: {
        title: "Curated Collections",
        desc: "Explore our wide range of premium fashion categories, from elegant abayas to luxury watches."
    }
};

let products = JSON.parse(localStorage.getItem('products')) || defaultProducts;
let pageData = JSON.parse(localStorage.getItem('pageData')) || defaultPageData;

function saveProducts() {
    localStorage.setItem('products', JSON.stringify(products));
}

function savePageData() {
    localStorage.setItem('pageData', JSON.stringify(pageData));
}

// Formatting helper for PKR
function formatPKR(price) {
    return 'Rs. ' + price.toLocaleString('en-PK');
}

// --- Cart System ---
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    
    // Show a small feedback alert or toast
    alert(`${product.name} added to cart successfully!`);
}

function updateCartBadge() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounts.forEach(el => el.textContent = totalItems);
}

// --- Render Helpers ---
function createProductCard(product) {
    return `
        <div class="product-card">
            <div class="product-img-wrap">
                <img src="${product.image}" class="product-img" onerror="this.src='https://via.placeholder.com/800?text=${product.name.replace(' ', '+')}'" alt="${product.name}">
                <div class="product-actions">
                    <a href="product-detail.html?id=${product.id}" class="btn btn-outline" style="background: white; padding: 0.5rem 1rem; font-size: 0.8rem; border: none;">View Details</a>
                    <button class="action-btn" style="background: white; border: none;" title="Add to Wishlist"><i class="fa-regular fa-heart"></i></button>
                </div>
            </div>
            <div class="product-info">
                <p class="product-category">${product.category} / ${product.subcategory}</p>
                <h4 class="product-title"><a href="product-detail.html?id=${product.id}">${product.name}</a></h4>
                <p class="product-price">${formatPKR(product.price)}</p>
                <button class="btn btn-primary" onclick="addToCart(${product.id})" style="width: 100%; margin-top: 1rem; padding: 0.7rem;">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `;
}

function renderProducts(containerId, filterFn = null) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let items = products;
    if (filterFn) {
        items = products.filter(filterFn);
    }
    
    if (items.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No products found.</p>';
        return;
    }

    container.innerHTML = items.map(createProductCard).join('');
}

// --- Page Specific Logic ---

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('nav-links');
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Sticky Navbar shadow
    window.addEventListener('scroll', () => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
            } else {
                navbar.style.boxShadow = '0 2px 15px rgba(0,0,0,0.03)';
            }
        }
    });

    // Update Page Content from pageData
    const pageId = document.body.dataset.page;
    if (pageId && pageData[pageId]) {
        const data = pageData[pageId];
        const titleEl = document.querySelector('.hero-title, .page-title');
        const subtitleEl = document.querySelector('.hero-subtitle');
        const descEl = document.querySelector('.hero-desc, .page-desc');
        const heroEl = document.querySelector('.hero');

        if (titleEl) titleEl.textContent = data.title;
        if (subtitleEl) subtitleEl.textContent = data.subtitle;
        if (descEl) descEl.textContent = data.desc;
        if (heroEl && data.heroImage) {
            heroEl.style.background = `url('${data.heroImage}') center/cover no-repeat`;
        }
    }

    // 1. Home Page / Category Pages (Specific container IDs)
    renderProducts('featured-products', p => [1, 5, 9, 14].includes(p.id)); // Feature 4 items
    renderProducts('shoes-products', p => p.category === 'Shoes');
    renderProducts('abayas-products', p => p.category === 'Abayas');
    renderProducts('bags-products', p => p.category === 'Bags');
    renderProducts('hijabs-products', p => p.category === 'Hijab');
    renderProducts('watches-products', p => p.category === 'Watches');

    // 2. Shop Page (All products + filtering)
    const shopContainer = document.getElementById('shop-products');
    if (shopContainer) {
        renderProducts('shop-products'); // Render all initially
        
        // Setup filter listeners
        const categoryCheckboxes = document.querySelectorAll('.filter-category');
        categoryCheckboxes.forEach(cb => {
            cb.addEventListener('change', () => {
                const selectedCategories = Array.from(categoryCheckboxes)
                    .filter(c => c.checked && c.value !== 'All')
                    .map(c => c.value);
                
                if (selectedCategories.length === 0 || document.querySelector('.filter-category[value="All"]').checked) {
                    renderProducts('shop-products');
                } else {
                    renderProducts('shop-products', p => selectedCategories.includes(p.category));
                }
            });
        });
    }

    // 3. Product Detail Page
    const detailContainer = document.getElementById('product-detail-container');
    if (detailContainer) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        const product = products.find(p => p.id === productId) || products[0]; // fallback to first

        document.getElementById('detail-image').src = product.image;
        document.getElementById('detail-image').onerror = function() { this.src = `https://via.placeholder.com/800?text=${product.name.replace(' ', '+')}` };
        document.getElementById('detail-title').textContent = product.name;
        document.getElementById('detail-price').textContent = formatPKR(product.price);
        document.getElementById('detail-category').textContent = `${product.category} / ${product.subcategory}`;
        document.getElementById('detail-desc').textContent = product.desc;
        
        const addToCartBtn = document.getElementById('detail-add-cart');
        addToCartBtn.onclick = () => {
            const qty = parseInt(document.getElementById('qty').value) || 1;
            for(let i=0; i<qty; i++){
                addToCart(product.id);
            }
        };
    }

    // 4. Cart Page
    const cartTableBody = document.getElementById('cart-table-body');
    if (cartTableBody) {
        renderCartPage();
    }
});

function renderCartPage() {
    const tbody = document.getElementById('cart-table-body');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 2rem;">Your cart is empty. <a href="products.html" style="color:var(--primary-color); text-decoration:underline;">Shop Now</a></td></tr>';
        subtotalEl.textContent = formatPKR(0);
        totalEl.textContent = formatPKR(0);
        document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = formatPKR(0); // Shipping 0 when empty
        return;
    }

    let html = '';
    let subtotal = 0;
    const shippingFee = 250; // PKR 250 Flat Shipping

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        html += `
            <tr>
                <td>
                    <div class="cart-product">
                        <img src="${item.image}" onerror="this.src='https://via.placeholder.com/200'" alt="${item.name}">
                        <div>
                            <h4 style="font-family: var(--font-body); font-weight: 500;">${item.name}</h4>
                            <p class="text-muted" style="font-size: 0.85rem;">Category: ${item.category}</p>
                        </div>
                    </div>
                </td>
                <td class="font-weight-bold">${formatPKR(item.price)}</td>
                <td>
                    <div class="quantity-control" style="width: fit-content;">
                        <button onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <input type="number" value="${item.quantity}" readonly>
                        <button onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </td>
                <td class="font-weight-bold" style="color: var(--primary-color);">${formatPKR(itemTotal)}</td>
                <td><button class="cart-remove" onclick="removeFromCart(${item.id})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>
        `;
    });

    tbody.innerHTML = html;
    subtotalEl.textContent = formatPKR(subtotal);
    // Flat shipping PKR 250
    document.querySelector('.summary-row:nth-child(3) span:last-child').textContent = formatPKR(shippingFee);
    totalEl.textContent = formatPKR(subtotal + shippingFee);
}

function updateCartQuantity(id, change) {
    const item = cart.find(i => i.id === id);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(id);
        } else {
            saveCart();
            renderCartPage();
        }
    }
}

function removeFromCart(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    renderCartPage();
}
